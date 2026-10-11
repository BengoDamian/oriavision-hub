import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';

const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4182';
const output = '.tool-cache/redesign-qa';
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const pages = ['/', '/diseno-web/', '/seo/', '/marketing-digital/', '/meta-ads/', '/google-ads/', '/trabajos-realizados/', '/proyectos/', '/guias/', '/prompts/', '/inbox/', '/legal/privacidad/', '/legal/terminos/'];
try {
  for (const width of [1440, 768, 390, 360]) {
    const context = await browser.newContext({ viewport: { width, height: width < 700 ? 740 : 960 }, isMobile: width < 700, hasTouch: width < 700 });
    await context.route('https://static.cloudflareinsights.com/**', route => route.fulfill({ status: 200, body: '' }));
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && new URL(r.url()).origin === new URL(origin).origin) errors.push(`${r.status()} ${r.url()}`); });
    for (const path of pages) {
      const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, path);
      await page.evaluate(async () => { document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; }); await document.fonts.ready; await Promise.all([...document.images].map(img => img.decode().catch(() => {}))); });
      await expect.poll(() => page.locator('img').evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
      assert.equal(await page.locator('h1').count(), 1, path);
      assert(!(await page.locator('body').textContent()).match(/Prueba uno|Mat[ií]as Ferlante/), path);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.oriavision.com.ar' + path, path);
      assert(!/noindex/.test(await page.locator('meta[name=robots]').getAttribute('content') || ''), path);
      const size = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert(size.scroll <= size.width, `${path} overflow ${width}: ${size.scroll}`);
      assert.equal(await page.locator('.site-header').count(), 1);
      assert.equal(await page.locator('.site-footer').count(), 1);
      for (const href of await page.locator('a[href^="https://wa.me/"]').evaluateAll(els => els.map(el => el.href))) assert.equal(new URL(href).pathname, '/5491127575675');
      if (path === '/' || path === '/proyectos/' || path === '/seo/') await page.screenshot({ path: `${output}/${path.replaceAll('/', '') || 'home'}-${width}.png`, fullPage: path === '/' });
      results.push({ width, path, rendered: true });
    }
    await page.goto(origin + '/proyectos/?rubro=abogados', { waitUntil: 'networkidle' });
    const cards = page.locator('.stack-card');
    await expect(cards).toHaveCount(1);
    const card = cards.first();
    const labels = card.locator('.palette-choice');
    await expect(labels).toHaveCount(5);
    const heights = [];
    for (let index = 0; index < 5; index++) {
      await labels.nth(index).scrollIntoViewIfNeeded();
      const before = await page.evaluate(() => scrollY);
      if (width < 700) await labels.nth(index).tap(); else await labels.nth(index).click();
      const after = await page.evaluate(() => scrollY);
      assert(Math.abs(before - after) < 2, `Palette scroll jump ${width}, ${index}: ${before}->${after}`);
      heights.push(await card.locator('.stack-panel').evaluate(el => el.offsetHeight));
      const href = await card.locator('.catalog-actions a').first().getAttribute('href');
      const message = new URL(await card.locator('.catalog-actions a').last().getAttribute('href')).searchParams.get('text');
      assert(message.includes(href) && message.includes('Martín Fiotto'));
      const [first, second] = await card.locator('.catalog-actions a').evaluateAll(els => els.map(el => { const r = el.getBoundingClientRect(); return { width: r.width, height: r.height, y: r.y }; }));
      assert(Math.abs(first.y - second.y) < 1 && Math.abs(first.width - second.width) < 1 && first.height >= 46 && second.height >= 46);
    }
    assert(Math.max(...heights) - Math.min(...heights) <= 1, `Palette height jump ${width}: ${heights}`);
    await page.locator('#rubro-filter').selectOption('todos');
    await expect(cards).toHaveCount(9);
    await expect(page.locator('.catalog-stack')).toHaveAttribute('data-stack-active', 'true');
    assert.equal(await cards.first().evaluate(el => getComputedStyle(el).position), 'sticky');
    const target = await cards.nth(1).evaluate(el => el.getBoundingClientRect().top + scrollY);
    await page.evaluate(y => scrollTo({ top: y - 280, behavior: 'instant' }), target);
    await expect.poll(() => cards.first().locator('.stack-panel').evaluate(el => getComputedStyle(el).transform)).not.toBe('matrix(1, 0, 0, 1, 0, 0)');
    await page.screenshot({ path: `${output}/stack-${width}.png` });
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    if (width < 1001) {
      await page.getByRole('button', { name: 'Abrir menú' }).click();
      await expect(page.locator('#main-navigation')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('.catalog-stack')).toHaveAttribute('data-stack-active', 'false');
    assert.equal(await cards.first().evaluate(el => getComputedStyle(el).position), 'relative');
    assert.deepEqual(errors, [], `${width}px console/resources`);
    console.log(`${width}px: 13 páginas, recursos, SEO, contactos, paletas, filtro y animación OK`);
    await context.close();
  }
  writeFileSync(`${output}/results.json`, JSON.stringify(results, null, 2));
} finally { await browser.close(); }
