import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';

const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4182';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
mkdirSync('.tool-cache/catalog-stack', { recursive: true });

async function scroll(page, top) {
  await page.evaluate(async y => {
    window.scrollTo({ top: y, behavior: 'instant' });
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }, top);
}

try {
  for (const [width, height] of [[1365, 768], [390, 844], [390, 740], [360, 740], [390, 700], [360, 700], [768, 1024], [390, 560]]) {
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: width < 640, isMobile: width < 640, reducedMotion: 'no-preference' });
    await context.route('https://static.cloudflareinsights.com/**', route => route.fulfill({ status: 200, body: '' }));
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${origin}/rubros/`, { waitUntil: 'networkidle' });
    const cards = page.locator('.demo-card-palette');
    assert.equal(await cards.count(), 9);
    const layout = await cards.evaluateAll(elements => elements.map(el => {
      const style = getComputedStyle(el), box = el.getBoundingClientRect();
      return { height: box.height, naturalTop: box.top + scrollY, top: parseFloat(style.top), position: style.position, fits: el.dataset.stackable === 'true' };
    }));
    const header = await page.locator('.site-header').evaluate(el => el.getBoundingClientRect().height);
    for (const [index, card] of layout.entries()) {
      const shouldFit = height > 640 && card.height <= height - Math.ceil(header + 12) - 24;
      assert.equal(card.fits, shouldFit, `${width}x${height} card ${index}: fit`);
      assert.equal(card.position === 'sticky', shouldFit, `${width}x${height} card ${index}: stacking`);
      if (shouldFit) assert(card.top + card.height <= height - 24 + 1, 'Pinned card must fit without clipping');
    }
    if (height > 640) {
      assert(layout[0].fits, 'Existing collections must retain their animation');
      for (const distance of [100, 220, 100]) {
        await scroll(page, layout[1].naturalTop - layout[1].top + distance);
        const first = await cards.nth(0).boundingBox(), second = await cards.nth(1).boundingBox();
        assert(Math.abs(first.y - layout[0].top) < 1 && Math.abs(second.y - layout[1].top) < 1, 'Cards stay pinned when scrolling down and back up');
      }
      if (width === 390 && height === 740) {
        await scroll(page, layout[1].naturalTop - height / 2);
        await page.screenshot({ path: '.tool-cache/catalog-stack/mobile-overlap.png' });
      }
      await scroll(page, layout[0].naturalTop - layout[0].top);
      const palette = cards.first().locator('.palette-option').nth(1);
      if (width < 640) await palette.tap(); else await palette.click();
      if (width < 640) assert.notEqual(await cards.first().evaluate(el => getComputedStyle(el).zIndex), '20');
      await scroll(page, layout[1].naturalTop - layout[1].top + 100);
      assert(Math.abs((await cards.first().boundingBox()).y - layout[0].top) < 1);
      // A single oversized card must not turn off every other card.
      await cards.last().evaluate(el => { el.style.minHeight = `${innerHeight + 200}px`; });
      await page.waitForFunction(() => document.querySelector('.demo-card-palette:last-child').dataset.stackable === 'false');
      assert.equal(await cards.first().evaluate(el => getComputedStyle(el).position), 'sticky');
      await cards.last().evaluate(el => { el.style.minHeight = ''; });
    }
    await page.locator('#rubro-filter').selectOption('abogados');
    assert.equal(await cards.count(), 1);
    assert.notEqual(await cards.first().evaluate(el => getComputedStyle(el).position), 'sticky');
    await page.locator('#rubro-filter').selectOption('todos');
    await page.waitForFunction(() => document.querySelectorAll('.demo-card-palette').length === 9);
    if (height > 640) await page.waitForFunction(() => getComputedStyle(document.querySelector('.demo-card-palette')).position === 'sticky');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    results.push({ width, height, stickyCards: layout.filter(card => card.fits).length, total: layout.length });
    console.log(`${width}x${height}: ${results.at(-1).stickyCards}/9 apiladas; scroll, ajuste individual, filtro y foco OK`);
    await context.close();
  }
  writeFileSync('.tool-cache/catalog-stack/results.json', JSON.stringify(results, null, 2));
} finally { await browser.close(); }
