import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { extname, join, relative, resolve, sep } from 'node:path';
import { load } from 'cheerio';
import { SITE_URL, legacyRoutes } from './site-config.mjs';

const root = resolve('out');
const source = resolve('site');
const errors = [];
const checked = new Set();
const documents = new Map();
const assets = new Set();
const walk = async directory => (await Promise.all((await readdir(directory, {withFileTypes:true})).map(entry => entry.isDirectory() ? walk(join(directory,entry.name)) : join(directory,entry.name)))).flat();
const fileFor = pathname => join(root, decodeURIComponent(pathname), extname(pathname) ? '' : 'index.html');
const documentFor = async pathname => {
  const file = fileFor(pathname);
  if (!documents.has(file)) documents.set(file, load(await readFile(file, 'utf8')));
  return documents.get(file);
};
const hash = buffer => createHash('sha256').update(buffer).digest('hex');

async function checkURL(value, from, { anchor = false, asset = false } = {}) {
  if (!value || /^(data:|mailto:|tel:|javascript:|blob:)/i.test(value)) return;
  const url = new URL(value, SITE_URL + from);
  if (![new URL(SITE_URL).hostname, 'oriavision.com.ar'].includes(url.hostname)) return;
  if (url.pathname.startsWith('/api/')) return; // Cloudflare Functions, not static documents.
  const target = legacyRoutes[url.pathname] || legacyRoutes[url.pathname + '/'];
  if (target) return checkURL(target, from, { anchor, asset });
  const file = fileFor(url.pathname);
  if (file !== root && !file.startsWith(root + sep)) {
    errors.push(`${from}: path escapes output (${value})`);
    return;
  }
  try {
    assert((await stat(file)).isFile());
    checked.add(url.pathname);
    if (asset) assets.add(file);
  } catch {
    errors.push(`${from}: missing ${value}`);
    return;
  }
  if (anchor && url.hash && (!extname(url.pathname) || url.pathname.endsWith('.html'))) {
    const $ = await documentFor(url.pathname);
    const id = decodeURIComponent(url.hash.slice(1));
    if (!$('[id],a[name]').toArray().some(node => $(node).attr('id') === id || $(node).attr('name') === id)) errors.push(`${from}: missing anchor ${value}`);
  }
}

const sources = await walk(source);
const pages = sources.filter(file => file.endsWith('.html')).map(file => '/' + relative(source,file).replaceAll('\\','/').replace(/index\.html$/, ''));
const retainedPages = (await Promise.all(['guias','prompts','inbox','go','gracias'].map(directory => walk(join(root,directory))))).flat()
  .filter(file => file.endsWith('.html')).map(file => '/' + relative(root,file).replaceAll('\\','/').replace(/index\.html$/, ''));
const sitemap = load(await readFile(join(root,'sitemap.xml'),'utf8'), {xml:true});
const sitemapPaths = sitemap('loc').toArray().map(node => new URL(sitemap(node).text()).pathname);
assert.equal(new Set(sitemapPaths).size, sitemapPaths.length, 'Duplicate sitemap entries');
for (const pathname of sitemapPaths) {
  await checkURL(pathname, '/sitemap.xml');
  if (legacyRoutes[pathname]) errors.push(`Sitemap contains old redirect: ${pathname}`);
  const $ = await documentFor(pathname);
  if (($('meta[name="robots"]').attr('content') || '').includes('noindex')) errors.push(`Sitemap includes noindex page: ${pathname}`);
  if ($('link[rel="canonical"]').attr('href') !== SITE_URL + pathname) errors.push(`Incorrect canonical: ${pathname}`);
}

for (const pathname of new Set([...pages, ...sitemapPaths, ...retainedPages])) {
  await checkURL(pathname, '/');
  const $ = await documentFor(pathname);
  if ($('h1').length !== 1 && pages.includes(pathname) && !pathname.startsWith('/pruebas/')) errors.push(`${pathname}: expected one h1`);
  if (pages.includes(pathname) && !pathname.startsWith('/pruebas/') && !sitemapPaths.includes(pathname)) errors.push(`Public page missing from sitemap: ${pathname}`);
  const tasks = [];
  $('a[href],area[href]').each((_,node) => tasks.push(checkURL($(node).attr('href'),pathname,{anchor:true})));
  $('link[href]').each((_,node) => {
    if (['stylesheet','icon','preload'].includes($(node).attr('rel'))) tasks.push(checkURL($(node).attr('href'),pathname,{asset:true}));
  });
  $('[src],[poster],[data-src],[data-preview],[data-url],[data-project-url]').each((_,node) => {
    for (const attribute of ['src','poster','data-src','data-preview','data-url','data-project-url']) if ($(node).attr(attribute)) tasks.push(checkURL($(node).attr(attribute),pathname,{asset:true}));
  });
  $('image[href],use[href]').each((_,node) => tasks.push(checkURL($(node).attr('href'),pathname,{asset:true})));
  $('[srcset]').each((_,node) => {
    for (const item of $(node).attr('srcset').split(',')) tasks.push(checkURL(item.trim().split(/\s+/)[0],pathname,{asset:true}));
  });
  await Promise.all(tasks);
}

// Check CSS dependencies as well, including fonts and nested stylesheets.
const visitedCSS = new Set();
while ([...assets].some(file => file.endsWith('.css') && !visitedCSS.has(file))) {
  for (const file of [...assets].filter(file => file.endsWith('.css') && !visitedCSS.has(file))) {
    visitedCSS.add(file);
    const css = await readFile(file,'utf8');
    for (const match of css.matchAll(/url\(\s*['"]?([^)'"\s]+)/g)) {
      if (match[1].startsWith('#') || match[1].startsWith('%23')) continue;
      await checkURL(match[1], '/' + relative(root,file).replaceAll('\\','/'), {asset:true});
    }
  }
}

// Exact static asset bytes, and identical body markup after localizing links
// and removing the existing production analytics bootstrap.
for (const file of sources) {
  if (file.endsWith('source-version.json')) continue;
  const outputFile = join(root, relative(source,file));
  if (!file.endsWith('.html')) {
    assert.equal(hash(await readFile(file)), hash(await readFile(outputFile)), `Asset changed: ${file}`);
  } else {
    const original = load((await readFile(file,'utf8')).replace(/((?:href|src|data-src|data-preview|data-url|data-project-url)=")https:\/\/(?:www\.)?oriavision\.com\.ar(?=\/)/g,'$1'));
    const exported = load(await readFile(outputFile,'utf8'));
    exported('script[src="/site-analytics.js"]').remove();
    assert.equal(exported('body').prop('outerHTML'),original('body').prop('outerHTML'),`Reference body changed: ${file}`);
  }
}

const redirects = await readFile(join(root,'_redirects'),'utf8');
for (const [from,to] of Object.entries(legacyRoutes)) {
  assert(redirects.includes(`${from} ${to} 301`), `Missing 301 for ${from}`);
  assert(redirects.includes(`${from.slice(0,-1)} ${to} 301`), `Missing slashless 301 for ${from}`);
  assert(!legacyRoutes[to], `Redirect chain: ${from}`);
  await checkURL(to,from,{anchor:true});
}
assert((await readFile(join(root,'robots.txt'),'utf8')).includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
const urlIndex = process.argv.indexOf('--url');
if (urlIndex !== -1) {
  const base = process.argv[urlIndex + 1];
  assert(base, '--url requires the local preview origin');
  const urls = [...new Set([...checked, '/robots.txt', '/sitemap.xml'])];
  for (let i = 0; i < urls.length; i += 12) {
    await Promise.all(urls.slice(i, i + 12).map(async pathname => {
      const response = await fetch(new URL(pathname, base), {method:'HEAD',signal:AbortSignal.timeout(10000)});
      if (response.status !== 200) errors.push(`HTTP ${response.status}: ${pathname}`);
    }));
  }
  for (const [from,to] of Object.entries(legacyRoutes)) {
    for (const pathname of [from,from.slice(0,-1)]) {
      const response = await fetch(new URL(pathname + '?utm_source=qa',base), {redirect:'manual'});
      const expected = new URL(to,base);
      expected.search = '?utm_source=qa';
      assert.equal(response.status,301,pathname);
      assert.equal(new URL(response.headers.get('location'),base).href,expected.href,pathname);
    }
  }
  const unknown = await fetch(new URL('/esta-ruta-no-existe-qa/',base));
  assert.equal(unknown.status,404,'Unknown URLs must not become soft 404s');
  assert((await unknown.text()).includes('Página no encontrada'));
  const video = await fetch(new URL('/assets/marketing-motion-v2/oria-marketing-v22.mp4',base),{headers:{Range:'bytes=0-99'}});
  assert.equal(video.status,206,'Video byte-range support');
  assert.equal(video.headers.get('content-type'),'video/mp4');
  assert.equal((await video.arrayBuffer()).byteLength,100);
  console.log(`HTTP: ${urls.length} successful routes/assets, 30 legacy 301 responses, video playback range, and genuine 404 for an unknown URL.`);
}
if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exitCode = 1;
} else console.log(`PASS: ${pages.length} reference pages, ${sitemapPaths.length} sitemap entries, ${checked.size} internal URLs, ${assets.size} assets; exact v53 body/style preservation and ${Object.keys(legacyRoutes).length} permanent redirects.`);
