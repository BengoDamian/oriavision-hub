// Exercise real loaders and sitemap with an isolated content directory.
// Fixtures never enter content/guides or the production build.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = process.cwd();
const cacheRoot = path.join(root, '.tool-cache');
fs.mkdirSync(cacheRoot, { recursive: true });
const fixtureRoot = fs.mkdtempSync(path.join(cacheRoot, 'guide-content-test-'));
const moduleCache = new Map();
function loadModule(file) {
  const absolute = path.resolve(root, file);
  if (moduleCache.has(absolute)) return moduleCache.get(absolute).exports;
  const mod = { exports: {} };
  moduleCache.set(absolute, mod);
  const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const localRequire = id => {
    if (id === 'server-only') return {};
    if (!id.startsWith('@/') && !id.startsWith('.')) return require(id);
    let target = id.startsWith('@/') ? path.join(root, 'src', id.slice(2)) : path.resolve(path.dirname(absolute), id);
    target = fs.existsSync(`${target}.ts`) ? `${target}.ts` : path.join(target, 'index.ts');
    return loadModule(target);
  };
  new Function('exports', 'module', 'require', 'process', code)(mod.exports, mod, localRequire, { cwd: () => fixtureRoot });
  return mod.exports;
}

try {
  const dir = path.join(fixtureRoot, 'content', 'guides');
  fs.mkdirSync(dir, { recursive: true });
  const writeGuide = (id, fields) => fs.writeFileSync(path.join(dir, `${id}.md`), `---\ntitle: Página de ejemplo\ndescription: Resumen único\ncategory: Categoría especial\ntags: [Etiqueta exclusiva]\npublishedAt: "2024-02-10"\n${fields}\n---\nContenido íntegro.\n`);
  writeGuide('new-published', 'editorialStatus: published\nupdatedAt: "2025-03-11"');
  writeGuide('draft', 'editorialStatus: published\ndraft: true');
  writeGuide('archive', 'editorialStatus: archived');
  writeGuide('private', 'editorialStatus: published\nnoindex: true');
  const content = loadModule('src/lib/content/index.ts');
  assert.deepEqual(content.getPublishedGuides().map(g => g.id), ['new-published']);
  assert.deepEqual(content.getGuideIdsMerged().sort(), ['archive', 'new-published', 'private']);
  assert.equal(content.getGuideByIdMerged('draft'), null);
  const sitemap = loadModule('src/app/sitemap.ts').default;
  const urls = sitemap().filter(entry => entry.url.includes('/guias/'));
  assert.equal(urls.length, 2); // Index + new guide, without updating any list.
  assert(urls.some(entry => entry.url.endsWith('/guias/new-published/')));
  assert(urls.every(entry => entry.lastModified.toISOString().startsWith('2025-03-11')));
  assert.deepEqual(sitemap(), sitemap(), 'Dates must not depend on build time');
  const search = loadModule('src/lib/guide-search.ts');
  const guide = content.getPublishedGuides()[0];
  const text = search.makeGuideSearchText(guide);
  for (const query of ['PAGINA', 'resumen unico', 'categoria especial', 'etiqueta exclusiva', 'contenido integro', '', '   ']) {
    assert(search.matchesGuideSearch(text, query), `Search field: ${query}`);
  }
  assert(!search.matchesGuideSearch(text, 'sin coincidencia'));
  const parser = loadModule('src/lib/guide-content.ts');
  const headings = parser.parseGuideContent('## Sección\n\nUno.\n\n## Sección\n\nDos.').filter(block => block.type === 'heading');
  assert.deepEqual(headings.map(block => block.id), ['seccion-seccion', 'seccion-seccion-2']);
  assert.throws(() => { writeGuide('invalid', 'editorialStatus: unknown'); content.getPublishedGuides(); }, /editorialStatus/);
  console.log('Automatic discovery, editorial states, stable dates, all search fields and unique anchors OK');
} finally {
  if (path.dirname(fixtureRoot) !== cacheRoot || !path.basename(fixtureRoot).startsWith('guide-content-test-')) throw new Error('Unexpected fixture directory');
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
