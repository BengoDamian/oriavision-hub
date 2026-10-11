import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4182';
const source = readFileSync('src/app/(agencia)/project-collections.ts', 'utf8');
const collections = JSON.parse(source.slice(source.indexOf(' = ') + 3).trim().replace(/;$/, ''));
const filters = ['veterinarias', 'abogados', 'unas', 'barberias', 'cafeterias', 'bienestar', 'tatuajes', 'arquitectura', 'parrillas-herreria'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 740 }, isMobile: true, hasTouch: true });
  await context.route('https://static.cloudflareinsights.com/**', route => route.fulfill({ status: 200, body: '' }));
  const page = await context.newPage();
  await page.goto(origin + '/', { waitUntil: 'networkidle' });
  await page.locator('.carousel-viewport').scrollIntoViewIfNeeded();
  const start = await page.locator('.carousel-viewport').evaluate(el => el.scrollLeft);
  await expect.poll(() => page.locator('.carousel-viewport').evaluate(el => el.scrollLeft)).toBeGreaterThan(start + 10);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  const paused = await page.locator('.carousel-viewport').evaluate(el => el.scrollLeft);
  await page.waitForTimeout(300);
  assert.equal(await page.locator('.carousel-viewport').evaluate(el => el.scrollLeft), paused);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  console.log('Carrusel: avance automático y respeto por movimiento reducido OK.');
  await page.goto(origin + '/proyectos/', { waitUntil: 'networkidle' });
  let count = 0;
  for (let index = 0; index < collections.length; index++) {
    const collection = collections[index];
    await page.locator('#rubro-filter').selectOption(filters[index]);
    const card = page.locator('.stack-card');
    await expect(card).toHaveCount(1);
    const heights = [];
    for (const variant of collection.variants) {
      const radio = card.getByRole('radio', { name: variant.name, exact: true });
      await radio.locator('..').tap();
      await expect(radio).toBeChecked();
      await expect(card.locator('.stack-media img')).toHaveAttribute('src', variant.image);
      await expect(card.locator('.catalog-actions a').first()).toHaveAttribute('href', variant.href);
      const whatsapp = new URL(await card.locator('.catalog-actions a').last().getAttribute('href'));
      assert.equal(whatsapp.pathname, '/5491127575675');
      assert(whatsapp.searchParams.get('text').includes(variant.href));
      heights.push(await card.locator('.stack-panel').evaluate(el => el.offsetHeight));
      count++;
    }
    assert(Math.max(...heights) - Math.min(...heights) <= 1, `${collection.id}: height jump ${heights}`);
    const selected = card.locator('input:checked');
    const value = await selected.inputValue();
    await selected.focus();
    await page.keyboard.press('ArrowRight');
    assert.notEqual(await card.locator('input:checked').inputValue(), value);
    // When pinned, actions remain above the persistent WhatsApp bar.
    const pin = await card.evaluate(el => el.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(el).top) + 50);
    await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), pin);
    const buttons = await card.locator('.catalog-actions').boundingBox();
    const bar = await page.locator('.whatsapp-bar').boundingBox();
    assert(buttons.y + buttons.height <= bar.y + 1, `${collection.id}: actions hidden by contact bar`);
  }
  console.log(`${count} variantes: selección táctil, imagen, enlace, WhatsApp, teclado y acciones visibles OK.`);
  await page.goto(origin + '/guias/', { waitUntil: 'networkidle' });
  const guide = page.locator('a[href^="/guias/"]').first();
  const href = await guide.getAttribute('href');
  await guide.click();
  await expect(page).toHaveURL(origin + href);
  assert.equal(await page.locator('h1').count(), 1);
  console.log('Navegación de recursos conservada: apertura de guía OK.');
} finally { await browser.close(); }
