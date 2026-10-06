// Exercises the real local Cloudflare Pages runtime with each intended Host.
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
import assert from 'node:assert/strict';
import {get} from 'node:http';
const variants=JSON.parse(readFileSync('demo-sources/abogados/variants.json','utf8'));
const endpoint='http://127.0.0.1:4183';
// Node's fetch reserves Host; use HTTP directly to exercise actual host routing.
const fetch=(url,{headers}={})=>new Promise((resolve,reject)=>{
  get(url,{headers},response=>{
    const chunks=[];
    response.on('data',chunk=>chunks.push(chunk));
    response.on('end',()=>resolve(new Response(Buffer.concat(chunks),{status:response.statusCode,headers:response.headers})));
  }).on('error',reject);
});
for(const variant of variants){
  const host=`abogados-${variant.id}.oriavision.com.ar`;
  const root=`https://${host}/`;
  const manifest=JSON.parse(readFileSync(`demo-sources/abogados/${variant.id}/manifest.json`,'utf8'));
  const resources=new Set();
  for(const route of manifest.pages){
    const path=route==='/'?'/':route+'/';
    const response=await fetch(endpoint+path,{headers:{Host:host},redirect:'manual'});
    assert.equal(response.status,200,`${host}${path}`);
    assert.equal(response.headers.get('x-robots-tag'),'noindex, nofollow');
    const $=load(await response.text());
    assert($('.brand-name').first().text().includes('Martín Fiotto'));
    assert(!/Mat[ií]as\s+Ferlante/i.test($('body').text()));
    assert.equal($('link[rel="canonical"]').attr('href'),root+path.slice(1));
    $('[data-oria-contact]').each((_,el)=>{
      const href=$(el).attr('href');
      assert(href.startsWith('https://wa.me/5491127575675?'));
      assert(new URL(href).searchParams.get('text').includes(root));
      assert(!href.includes(encodeURIComponent('www.oriavision.com.ar/demos/')));
    });
    $('a[href],link[href],img[src],script[src]').each((_,el)=>{
      const reference=$(el).attr('src')||$(el).attr('href');
      if(reference.startsWith('/'))resources.add(reference.split('#')[0]);
    });
  }
  for(const path of resources){
    const response=await fetch(endpoint+path,{headers:{Host:host},redirect:'manual'});
    assert.equal(response.status,200,`${host} resource ${path}`);
    if(path.endsWith('.css')){
      const css=await response.text();
      for(const [,font] of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)){
        if(font.startsWith('/'))assert.equal((await fetch(endpoint+font,{headers:{Host:host}})).status,200,font);
      }
    }
  }
  for(const path of ['/api/track','/administracion','/demos/barberia-verde/'])assert.equal((await fetch(endpoint+path,{headers:{Host:host}})).status,404);
  console.log(`${host}: 17 páginas, canonical, WhatsApp, rutas y recursos OK (emulación local; DNS pendiente)`);
}
assert.equal((await fetch(endpoint+'/rubros/',{headers:{Host:'www.oriavision.com.ar'}})).status,200);
assert.equal((await fetch(endpoint+'/demos/barberia-verde/',{headers:{Host:'www.oriavision.com.ar'}})).status,200);
for(const path of ['', '/', '/contacto/', '/areas/laboral/']){
  const response=await fetch(endpoint+'/demos/abogados-espresso-imagen'+path,{headers:{Host:'www.oriavision.com.ar'}});
  assert.equal(response.status,301);
  assert.equal(new URL(response.headers.get('location'),endpoint).pathname,'/demos/abogados-espresso-editorial'+(path||'/'));
}
console.log('Las URLs anteriores redirigen con 301 conservando la página interna.');
assert(!readFileSync('out/sitemap.xml','utf8').includes('/demos/'));
