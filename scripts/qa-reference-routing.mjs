import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import ts from 'typescript';
import { legacyRoutes } from './site-config.mjs';

// Run the real Cloudflare middleware, not a second implementation of routing.
const source = await readFile('functions/_middleware.ts','utf8');
const code = ts.transpileModule(source, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText
  .replace('../scripts/site-config.mjs',pathToFileURL(resolve('scripts/site-config.mjs')).href);
const { onRequest } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const context = path => ({request:new Request('https://www.oriavision.com.ar'+path), next:async()=>new Response('passed through'), env:{ASSETS:{fetch:async()=>{throw new Error('Unexpected demo asset request');}}}});
for (const [from,to] of Object.entries(legacyRoutes)) {
  for (const path of [from,from.slice(0,-1)]) {
    const response = await onRequest(context(path+'?utm_source=regression'));
    assert.equal(response.status,301,path);
    const destination = new URL(to,'https://www.oriavision.com.ar');
    destination.search = '?utm_source=regression';
    assert.equal(response.headers.get('location'),destination.href,path);
  }
}
for (const path of ['/', '/servicios/ecommerce/', '/guias/', '/api/subscribe', '/inbox/']) {
  const response = await onRequest(context(path));
  assert.equal(await response.text(),'passed through',path);
}
const deep = await onRequest(context('/web/antiguo/'));
assert.equal(deep.headers.get('location'),'https://www.oriavision.com.ar/servicios/diseno-web/');
let demoRequest;
const demo = await onRequest({request:new Request('https://abogados-espresso.oriavision.com.ar/demo.css'),next:async()=>{throw new Error('Demo leaked into main site');},env:{ASSETS:{fetch:async request=>{demoRequest=request.url;return new Response('demo css',{headers:{'Content-Type':'text/css'}});}}}});
assert.equal(demoRequest,'https://abogados-espresso.oriavision.com.ar/demos/abogados-espresso/demo.css');
assert.equal(await demo.text(),'demo css');
console.log('PASS: Cloudflare 301s with/without trailing slash preserve query strings; current routes and isolated demo hosts remain reachable.');
