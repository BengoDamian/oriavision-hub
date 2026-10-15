import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';
import { load } from 'cheerio';

const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4185';
const publicOrigin = 'https://www.oriavision.com.ar';
const slug = 'que-preparar-antes-de-crear-tu-pagina-web';
const articlePath = `/guias/${slug}/`;
const googleSlug = 'como-crear-un-perfil-de-empresa-de-google-y-conseguir-resenas-sin-infringir-las-politicas';
const activeSlugs = [slug, googleSlug];
const guide = matter(readFileSync(`content/guides/${slug}.md`, 'utf8'));
const output = process.env.QA_OUTPUT || '.tool-cache/guides-editorial-qa';
const oldSlugs = [
  'logistica-flex-principiantes', 'promociones-publicidad-politica-precios',
  'tienda-oficial-mercadolibre-empeza-por-esto', 'courier-argentina-2026-guia',
  'como-crear-un-perfil-de-empresa-de-google-y-conseguir-resenas-sin-infringir-las-politicas',
  'mercadolibre-cambia-como-mide-la-experiencia-de-compra-desde-abril-de-2026',
];
const archivedSlugs = oldSlugs.filter(id => id !== googleSlug);
const isArchived = path => archivedSlugs.some(id => path === `/guias/${id}/`);
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const width of [1440, 1280, 1152, 1024, 768, 390, 360]) {
    const context = await browser.newContext({ viewport: { width, height: 850 }, isMobile: width < 700, hasTouch: width < 700, permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && new URL(r.url()).origin === origin) errors.push(`${r.status()} ${r.url()}`); });
    const paths = ['/guias/', articlePath];
    if ([1440, 390, 360].includes(width)) paths.push(...oldSlugs.map(id => `/guias/${id}/`));
    for (const path of paths) {
      const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, path);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toHaveCount(1);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), publicOrigin + path);
      const robotsMeta = await page.locator('meta[name=robots]').getAttribute('content');
      assert.equal(/noindex/.test(robotsMeta), isArchived(path));
      assert(!/nofollow/.test(robotsMeta));
      if (isArchived(path)) {
        await expect(page.locator('.guide-archive-notice')).toBeVisible();
        await expect(page.locator('.guide-archive-notice')).toContainText('Contenido archivado');
        await expect(page.locator('.guide-contact-block')).toHaveCount(0);
      } else {
        await expect(page.locator('.guide-archive-notice')).toHaveCount(0);
      }
      assert((await page.locator('meta[name=description]').getAttribute('content')).length > 40);
      assert(!(await page.title()).includes('ORIAVISION | ORIAVISION'));
      assert.equal(await page.locator('.site-header a[href="/guias/"]').textContent(), 'Guías');
      await expect(page.locator('.site-footer a[href="/guias/"]')).toHaveCount(1);
      await expect(page.locator('.guides-breadcrumb')).toBeVisible();
      const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert(dimensions.scroll <= width, `Horizontal overflow ${path} at ${width}: ${dimensions.scroll}`);
      const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(els => els.map(el => JSON.parse(el.textContent)));
      assert(schemas.some(s => s['@type'] === 'BreadcrumbList'));
      if (path === '/guias/') {
        await expect(page.locator('.guide-card')).toHaveCount(2);
        await expect(page.locator('.guide-card-featured h2')).toHaveText(guide.data.title);
        const links = await page.locator('.guide-card>.guides-text-link').evaluateAll(els => els.map(el => el.getAttribute('href')));
        for (const id of activeSlugs) assert(links.includes(`/guias/${id}/`));
        for (const id of archivedSlugs) await expect(page.locator(`a[href="/guias/${id}/"]`)).toHaveCount(0);
        assert.equal(await page.locator('.guide-card').first().evaluate(el => getComputedStyle(el).position), 'static');
      } else {
        assert(schemas.some(s => s['@type'] === 'Article'));
        await expect(page.getByRole('link', { name: 'Volver a todas las guías' })).toHaveAttribute('href', '/guias/');
        if (path === `/guias/${googleSlug}/`) {
          await expect(page.getByRole('link', { name: 'Abrir Calculadora ML' })).toHaveCount(0);
          await expect(page.getByRole('link', { name: 'Consultar con ORIAVISION', exact: true })).toHaveCount(1);
          await expect(page.locator('.guide-article-header')).toContainText('Actualizada el');
          await expect(page.locator('.guide-body a[href^="https://support.google.com/"]')).toHaveCount(9);
        }
      }
      if (path === articlePath) {
        const article = schemas.find(s => s['@type'] === 'Article');
        assert.equal(article.author['@type'], 'Organization');
        assert.equal(article.author.name, 'ORIAVISION');
        assert.equal(article.datePublished, '2026-10-15');
        await expect(page.locator('.guide-body h2')).toHaveCount(8);
        await expect(page.locator('.guide-body h3, .guide-body h4')).toHaveCount(0);
        const bodyTop = await page.locator('.guide-body').evaluate(el => el.getBoundingClientRect().top);
        assert(bodyTop < 700, `Article starts too low: ${bodyTop}`);
        const whatsapp = new URL(await page.getByRole('link', { name: 'Consultar con ORIAVISION', exact: true }).getAttribute('href'));
        assert.equal(whatsapp.pathname, '/5491127575675');
        assert.equal(whatsapp.searchParams.get('text'), guide.data.contactMessage);
        await expect(page.getByRole('link', { name: 'Explorar rubros' })).toHaveAttribute('href', '/proyectos/');
        await expect(page.getByRole('link', { name: 'guía oficial de Google' })).toHaveCount(1);
      }
      if ([1440, 390, 360].includes(width) && (paths.indexOf(path) < 2 || path === `/guias/${googleSlug}/` || path === `/guias/${archivedSlugs[0]}/`)) {
        const label = path === articlePath ? 'article' : path === '/guias/' ? 'index' : isArchived(path) ? 'archive' : 'google';
        await page.screenshot({ path: `${output}/${label}-${width}.png`, fullPage: false });
      }
      results.push({ width, path, status: 'passed' });
    }
    await page.goto(origin + articlePath, { waitUntil: 'networkidle' });
    if (width <= 1150) {
      await page.getByRole('button', { name: 'Abrir menú' }).click();
      await expect(page.locator('#main-navigation')).toBeVisible();
      await page.locator('#main-navigation').getByRole('link', { name: 'Guías', exact: true }).click();
      await expect(page).toHaveURL(origin + '/guias/');
      await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
      await page.getByRole('button', { name: 'Abrir menú' }).click();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
      await page.goto(origin + articlePath, { waitUntil: 'networkidle' });
    } else {
      const nav = await page.locator('#main-navigation').boundingBox();
      assert(nav.x + nav.width <= width, `Navigation overflow at ${width}`);
    }
    const template = await page.getByRole('textbox', { name: 'Ficha del negocio para copiar' }).inputValue();
    assert.equal(template.split('\n').length, 9);
    await page.getByRole('button', { name: 'Copiar ficha' }).click();
    await expect(page.getByRole('status')).toContainText('Ficha copiada');
    assert.equal((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n'), template);
    if ([1440, 390, 360].includes(width)) {
      await page.locator('.guide-template').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${output}/template-${width}.png` });
      await page.locator('.guide-contact-block').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${output}/contact-${width}.png` });
    }
    await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { value: () => Promise.reject(new Error('Clipboard denied')), configurable: true }); });
    await page.getByRole('button', { name: 'Copiar ficha' }).click();
    await expect(page.getByRole('status')).toContainText('Seleccionamos la ficha');
    assert.equal(await page.locator('.guide-template textarea').evaluate(el => el.selectionEnd - el.selectionStart), template.length);
    assert.deepEqual(errors, [], `${width}px console/resources`);
    console.log(`${width}px: guides, SEO, navigation, responsive layout and clipboard OK`);
    await context.close();
  }

  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 850 } });
  const page = await context.newPage();
  await page.goto(origin + articlePath);
  await expect(page.locator('.guide-body h2')).toHaveCount(8);
  await expect(page.locator('.guide-template textarea')).toContainText('Mi negocio ofrece:');
  await context.close();

  const interaction = await browser.newContext();
  const testPage = await interaction.newPage();
  let subscription;
  await testPage.route('**/api/subscribe', route => {
    subscription = route.request().postDataJSON();
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await testPage.goto(origin + '/guias/');
  await testPage.getByPlaceholder('Tu email').fill('qa@example.com');
  await testPage.getByRole('button', { name: 'Suscribirme', exact: true }).click();
  await expect(testPage).toHaveURL(/\/gracias\/?\?src=newsletter$/);
  assert.equal(subscription.email, 'qa@example.com');
  await expect(testPage.locator('a[href="/guias/"]').first()).toBeAttached();
  await interaction.close();

  const sitemap = await (await fetch(origin + '/sitemap.xml')).text();
  for (const path of ['/guias/', ...activeSlugs.map(id => `/guias/${id}/`)]) assert(sitemap.includes(publicOrigin + path));
  for (const id of archivedSlugs) assert(!sitemap.includes(publicOrigin + `/guias/${id}/`));
  const robots = await (await fetch(origin + '/robots.txt')).text();
  assert(!robots.includes('Disallow: /guias'));
  for (const demo of ['abogados-bordo-oro', 'abogados-espresso-editorial']) {
    const html = await (await fetch(`${origin}/demos/${demo}/`)).text();
    assert(/noindex/.test(html), demo);
  }
  const protectedPaths = ['src/components/Newsletter.tsx', 'functions/api/subscribe.ts', 'functions/_middleware.ts', 'public/_redirects', 'src/app/robots.txt', 'public/demos', 'demos', 'demo-sources'];
  assert.equal(execFileSync('git', ['-c', 'core.safecrlf=false', 'diff', '--name-only', '--', ...protectedPaths], { encoding: 'utf8' }).trim(), '');

  // Inspect the response HTML before JavaScript runs, including production headers.
  const httpResults = [];
  const titles = new Set();
  const descriptions = new Set();
  assert(!/^disallow:\s*\/(?:\s*$|guias)/im.test(robots), 'Guides must be crawlable');
  for (const path of ['/guias/', ...activeSlugs.map(id => `/guias/${id}/`), ...archivedSlugs.map(id => `/guias/${id}/`)]) {
    const response = await fetch(origin + path, { redirect: 'manual' });
    assert.equal(response.status, 200, path);
    const html = load(await response.text());
    assert.equal(html('h1').length, 1);
    assert.equal(html('link[rel=canonical]').attr('href'), publicOrigin + path);
    const directives = [html('meta[name=robots]').attr('content'), html('meta[name=googlebot]').attr('content'), response.headers.get('x-robots-tag')].filter(Boolean).join(',');
    assert.equal(/noindex/.test(directives), isArchived(path), path);
    assert(!/nofollow/.test(directives), path);
    const title = html('title').text();
    const description = html('meta[name=description]').attr('content');
    assert(title && description && !titles.has(title) && !descriptions.has(description));
    titles.add(title); descriptions.add(description);
    if (path === '/guias/') {
      assert.equal(html('.guide-card').length, 2);
    } else {
      assert(html('.guide-body').text().trim().length > 500, `Missing initial HTML content: ${path}`);
      const schemas = html('script[type="application/ld+json"]').map((_, el) => JSON.parse(html(el).text())).get();
      const article = schemas.find(s => s['@type'] === 'Article');
      assert.equal(article.headline, html('h1').text());
      assert.equal(article.description, html('.guide-article-description').text());
      assert.equal(article.url, publicOrigin + path);
      assert.equal(schemas.find(s => s['@type'] === 'BreadcrumbList').itemListElement.at(-1).item, publicOrigin + path);
      if (path === articlePath) {
        assert.equal(article.datePublished, '2026-10-15');
        assert.equal(article.dateModified, '2026-10-15');
      } else if (path === `/guias/${googleSlug}/`) {
        assert.equal(article.datePublished, undefined, 'Do not invent an original publication date');
        assert.equal(article.dateModified, '2026-10-15');
        assert.equal(html('.guide-byline time').attr('datetime'), article.dateModified);
      }
    }
    httpResults.push({ path, status: response.status, directives, canonical: html('link[rel=canonical]').attr('href'), inSitemap: sitemap.includes(publicOrigin + path), htmlContent: true });
  }
  for (const path of ['/gracias/', '/go/calculadora/', '/go/whatsapp/', '/admin/']) {
    const response = await fetch(origin + path);
    const html = load(await response.text());
    assert(/noindex/.test(html('meta[name=robots]').attr('content') || ''), `Preserve private/utility noindex: ${path}`);
  }
  writeFileSync(`${output}/results.json`, JSON.stringify({ origin, results, httpResults, newsletter: 'mocked API; no real subscription', javascriptDisabled: 'readable', sitemap: 'passed', preservedSources: protectedPaths }, null, 2));
  console.log('Two current guides, five crawlable noindex archives, raw HTML, metadata, sitemap, newsletter and protected pages OK');
} finally {
  await browser.close();
}
