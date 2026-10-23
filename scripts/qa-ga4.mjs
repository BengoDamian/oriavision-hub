import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4186';
const measurementId = 'G-P7CCCZEQGN';
// Optional local copy of Google's actual tag for restricted test networks.
const tagSource = process.env.QA_GTAG_FILE && readFileSync(process.env.QA_GTAG_FILE, 'utf8');
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.QA_CHROMIUM_PATH,
  proxy: process.env.QA_PROXY ? { server: process.env.QA_PROXY } : undefined,
});
try {
  for (const width of [1440, 390, 360]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      serviceWorkers: 'block',
      ignoreHTTPSErrors: Boolean(process.env.QA_PROXY),
    });
    const views = [];
    const errors = [];
    let tagLoads = 0;
    await context.route('**/*', async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.hostname.endsWith('google-analytics.com')) {
        const bodyLines = (request.postData() || '').split('\n');
        for (const line of bodyLines) {
          const params = new URLSearchParams(url.search);
          new URLSearchParams(line).forEach((value, key) => params.set(key, value));
          if (params.get('en') === 'page_view') {
            assert.equal(params.get('tid'), measurementId);
            views.push({ location: params.get('dl'), title: params.get('dt') });
          }
        }
        // Inspect the real Google tag's requests without sending test visits to GA.
        return route.fulfill({ status: 204 });
      }
      if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtag/js') {
        tagLoads++;
        assert.equal(url.searchParams.get('id'), measurementId);
        if (tagSource) return route.fulfill({ status: 200, contentType: 'application/javascript', body: tagSource });
      }
      if (url.hostname === 'static.cloudflareinsights.com') return route.fulfill({ status: 200, body: '' });
      return route.continue();
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    async function checkViews(expected, pathname) {
      await expect.poll(() => views.length, { timeout: 15000 }).toBe(expected);
      await page.waitForTimeout(1800);
      assert.equal(views.length, expected, 'No duplicate page_view after settling');
      assert.equal(new URL(views.at(-1).location).pathname, pathname);
      await expect(page.locator('#oriavision-ga4-loader')).toHaveCount(1);
      await expect(page.locator('#oriavision-ga4-config')).toHaveCount(1);
      const configs = await page.evaluate(() => (window.dataLayer || []).filter(entry => entry[0] === 'config').map(entry => entry[1]));
      assert.deepEqual(configs, [measurementId]);
    }
    await page.goto(origin + '/');
    await checkViews(1, '/');
    // Real full-document navigation in the commercial layout.
    await page.locator('.footer-links a[href="/seo"]').click();
    await checkViews(2, '/seo/');
    // Crossing the two independent root layouts.
    await page.locator('.footer-resources a[href="/guias/"]').click();
    await checkViews(3, '/guias/');
    const loadsBeforeHistory = tagLoads;
    // Exercise the History API used by client-side navigation without reloading.
    await page.evaluate(() => history.pushState({}, '', '?ga4_qa=1'));
    await checkViews(4, '/guias/');
    assert.equal(new URL(views.at(-1).location).search, '?ga4_qa=1');
    await page.evaluate(() => history.back());
    await checkViews(5, '/guias/');
    assert.equal(new URL(views.at(-1).location).search, '');
    assert.equal(tagLoads, loadsBeforeHistory, 'History navigation must not reload the Google tag');
    assert.equal(await page.locator('.whatsapp-bar a, a[href*="wa.me/5491127575675"]').count() > 0, true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, pageViews: views.length, tagLoads, checks: 'initial, links, root layouts, pushState, back, no duplicates, WhatsApp, overflow, JS errors: PASS' }));
    await context.close();
  }
} finally {
  await browser.close();
}
