// Import only public pages/assets. Never visits editorial, API or account routes.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { load } from 'cheerio';

const variants = ['bordo-oro', 'esmeralda-oro', 'azul-oro', 'espresso', 'espresso-imagen'];
const root = resolve('.tool-cache/law-references');
const blocked = /^\/(?:administracion|admin|api|panel|login|cdn-cgi)(?:\/|$)/;
async function fetchVariant(variant) {
  const origin = `https://matias-ferlante-${variant}.edgardoad06.chatgpt.site`;
  const queue = ['/'];
  const seen = new Set();
  const pages = [];
  function enqueue(value, from) {
    if (!value || /^(?:#|data:|mailto:|tel:|javascript:)/.test(value)) return;
    const url = new URL(value, from);
    if (url.origin !== origin || blocked.test(url.pathname)) return;
    const path = url.pathname.replace(/\/$/, '') || '/';
    if (!seen.has(path) && !queue.includes(path)) queue.push(path);
  }
  while (queue.length) {
    const batch = queue.splice(0, 6);
    await Promise.all(batch.map(async path => {
      if (seen.has(path)) return;
      seen.add(path);
      const url = origin + path;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${response.status}: ${url}`);
      const type = response.headers.get('content-type') || '';
      const isPage = type.includes('text/html');
      const output = resolve(root, variant, isPage ? `pages/${path === '/' ? 'index' : path.slice(1)}/index.html` : `assets/${path.slice(1)}`);
      mkdirSync(dirname(output), { recursive: true });
      if (isPage || /css|javascript|json/.test(type)) {
        const content = await response.text();
        writeFileSync(output, content);
        if (isPage) {
          pages.push(path);
          const $ = load(content);
          $('a[href],link[href],img[src],script[src],source[src]').each((_, el) => enqueue($(el).attr('href') || $(el).attr('src'), url));
        }
        for (const match of content.matchAll(/url\(\s*['"]?([^'"\s)]+)|(?:from|import)\s*['"]((?:\.\.?\/|\/)[^'"\s]+\.js)['"]/g)) enqueue(match[1] || match[2], url);
      } else writeFileSync(output, Buffer.from(await response.arrayBuffer()));
    }));
  }
  writeFileSync(resolve(root, variant, 'manifest.json'), JSON.stringify({origin, pages: pages.sort(), resources: [...seen].filter(p => !pages.includes(p)).sort()}, null, 2));
  console.log(`${variant}: ${pages.length} páginas públicas, ${seen.size - pages.length} recursos`);
}
await Promise.all(variants.map(fetchVariant));
