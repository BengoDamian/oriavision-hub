import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';
import { load } from 'cheerio';
import { SITE_URL } from './site-config.mjs';
import { normalizeDemoMetadataLengths } from './demo-rsc-metadata.mjs';

const root = resolve('out');
const catalog = readFileSync(join(root, 'servicios/diseno-web/inspiracion/index.html'), 'utf8');
const $ = load(catalog);
const variants = $('.palette-choice input[data-url]').toArray();
const sitemap = load(readFileSync(join(root, 'sitemap.xml'), 'utf8'), { xml: true });
const sitemapPaths = new Set(sitemap('loc').toArray().map(node => new URL(sitemap(node).text()).pathname));
const demoPaths = new Set();

function localFile(pathname) {
  const file = resolve(root, '.' + decodeURIComponent(pathname));
  assert(file === root || file.startsWith(root + sep), `Path outside export: ${pathname}`);
  if (existsSync(file) && statSync(file).isFile()) return file;
  const index = join(file, 'index.html');
  assert(existsSync(index), `Missing demo page or resource: ${pathname}`);
  return index;
}

function demoURL(value) {
  const url = new URL(value, SITE_URL);
  assert.equal(url.origin, SITE_URL, `External demo URL: ${value}`);
  assert.match(url.pathname, /^\/demos\/[a-z0-9-]+\/$/, `Invalid demo URL: ${value}`);
  return url;
}

assert(variants.length > 0, 'No demo variants found');
assert(!/chatgpt\.site/i.test(catalog), 'Catalog still references ChatGPT Sites');
for (const node of variants) {
  const input = $(node);
  const url = demoURL(input.attr('data-url'));
  assert(!demoPaths.has(url.pathname), `Duplicate variant: ${url.pathname}`);
  demoPaths.add(url.pathname);
  const page = load(readFileSync(localFile(url.pathname), 'utf8'));
  assert.match(page('meta[name="robots"]').attr('content') || '', /noindex/, `${url.pathname}: missing noindex`);
  assert(!sitemapPaths.has(url.pathname), `${url.pathname}: demo in commercial sitemap`);
  const consultation = new URL(input.attr('data-whatsapp'));
  assert.equal(consultation.hostname, 'wa.me');
  assert.equal(consultation.pathname, '/5491127575675');
  assert(consultation.searchParams.get('text')?.includes(url.href), `Wrong consultation URL: ${url.pathname}`);
}
$('.inspiration-design').each((_, section) => {
  const card = $(section);
  const selected = demoURL(card.find('input[data-url]:checked').attr('data-url'));
  for (const selector of ['.design-image-link', '.design-link']) {
    assert.equal(new URL(card.find(selector).attr('href'), SITE_URL).href, selected.href, `Wrong default ${selector}`);
  }
});
for (const pathname of sitemapPaths) assert(!pathname.startsWith('/demos/'), `Demo in sitemap: ${pathname}`);

// Validate the complete newly migrated sites, including deep pages and their
// CSS/module dependencies. This catches valid-looking catalog links with
// missing exports, fonts or dynamically imported chunks.
const migrated = ['clinica-dental-original', 'clinica-dental-azul', 'clinica-dental-salvia', 'clinica-dental-terracota', 'buen-rato-cafe-turquesa-naranja', 'ondara-original', 'ondara-noche', 'ondara-selva', 'ondara-terra'];
let pages = 0;
let assets = 0;
function checkReference(value, from) {
  if (!value || /^(?:data:|blob:|javascript:|mailto:|tel:|#)/i.test(value)) return;
  const url = new URL(value, SITE_URL + from);
  if (url.origin === SITE_URL) localFile(url.pathname);
  assert(!url.hostname.endsWith('.chatgpt.site'), `External demo dependency: ${value}`);
}
function inspect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) { inspect(file); continue; }
    const extension = extname(file);
    const pathname = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
    if (!['.html', '.js', '.css', '.mjs'].includes(extension)) { assets++; continue; }
    const text = readFileSync(file, 'utf8');
    assert(!/\.chatgpt\.site/i.test(text), `External host left in ${pathname}`);
    if (extension === '.html') {
      pages++;
      assert.equal(normalizeDemoMetadataLengths(text), text, `Invalid streamed metadata byte length: ${pathname}`);
      const page = load(text);
      assert.match(page('meta[name="robots"]').attr('content') || '', /noindex/, pathname);
      assert.equal(page('link[rel="canonical"]').attr('href'), SITE_URL + pathname, pathname);
      assert(text.includes('/demos/demo-host.js'), `Missing demo navigation adapter: ${pathname}`);
      page('[href],[src],[poster],[action]').each((_, node) => {
        for (const attribute of ['href', 'src', 'poster', 'action']) checkReference(page(node).attr(attribute), pathname);
      });
      page('[srcset]').each((_, node) => {
        for (const item of page(node).attr('srcset').split(',')) checkReference(item.trim().split(/\s+/)[0], pathname);
      });
    } else {
      assets++;
      if (extension === '.css') for (const match of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) checkReference(match[1], pathname);
      if (extension === '.js' || extension === '.mjs') {
        for (const match of text.matchAll(/\b(?:from\s*|import\s*(?:\(\s*)?)["']([^"']+)["']/g)) {
          if (/^(?:\.{1,2}\/|\/)/.test(match[1])) checkReference(match[1], pathname);
        }
      }
    }
  }
}
for (const slug of migrated) inspect(join(root, 'demos', slug));
console.log(`PASS: ${variants.length} local demo variants and consultation URLs; ${pages} migrated pages, ${assets} assets; noindex and sitemap exclusion.`);
