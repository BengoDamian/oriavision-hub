import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4181';
const variants=JSON.parse(readFileSync('demo-sources/abogados/variants.json','utf8')).filter(v=>!process.argv[2]||v.id===process.argv[2]);
const output='.tool-cache/law-qa';
mkdirSync(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
try {
  for(const variant of variants){
    const manifest=JSON.parse(readFileSync(`demo-sources/abogados/${variant.id}/manifest.json`,'utf8'));
    const base=`/demos/abogados-${variant.id}`;
    const canonical=`https://www.oriavision.com.ar${base}`;
    const context=await browser.newContext({viewport:{width:1365,height:1000},reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error')errors.push(`${message.text()} ${message.location().url}`);});
    page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
    page.on('request',request=>{if(new URL(request.url()).origin!==new URL(origin).origin)errors.push(`external rendering request: ${request.url()}`);});
    for(const route of manifest.pages){
      const path=base+(route==='/'?'/':route+'/');
      await page.goto(origin+path,{waitUntil:'networkidle'});
      await page.reload({waitUntil:'networkidle'});
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),canonical+(route==='/'?'/':route+'/'));
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex,nofollow');
      assert.equal(await page.locator('iframe,form[action],a[href*="chatgpt.site"],a[href*="administracion"]').count(),0);
      for(const href of await page.locator('[data-oria-contact]').evaluateAll(els=>els.map(el=>el.href))){
        assert(href.startsWith('https://wa.me/5491127575675?'));
        const message=new URL(href).searchParams.get('text');
        assert(message.includes('Estudio jurídico')&&message.includes(variant.name)&&message.includes(canonical+'/'));
      }
      assert(!/contacto@ferlante|\+34 600|Carrer de Mallorca/.test(await page.locator('body').innerText()));
      assert(await page.locator('.footer-bottom').innerText().then(t=>t.includes('Sitio de demostración. Consultas sobre este diseño a ORIAVISION')));
      assert(await page.locator('img').evaluateAll(els=>els.every(img=>img.complete&&img.naturalWidth>0)));
      for(const width of [1365,360,390]){
        await page.setViewportSize({width,height:width===1365?1000:844});
        await page.evaluate(()=>document.fonts.ready);
        const sizes=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
        assert(sizes.scroll<=sizes.width,`${variant.id} ${route} overflow ${width}: ${sizes.scroll}`);
      }
      if(route.startsWith('/areas/')){
        const faq=page.locator('[data-slot="accordion-trigger"]').first();
        await faq.click();
        assert.equal(await faq.getAttribute('aria-expanded'),'true');
        assert((await page.locator('[data-slot="accordion-content"]:visible').innerText()).length>20);
      }
      if(route==='/publicaciones'){
        await page.getByRole('tab',{name:'Jurisprudencia',exact:true}).click();
        assert.equal(await page.locator('.post-card:visible').count(),1);
        await page.getByRole('tab',{name:'Notas',exact:true}).click();
        assert.equal(await page.locator('.post-card:visible').count(),2);
      }
      if(route==='/opiniones'){
        await page.getByRole('button',{name:'4 estrellas · 3',exact:true}).click();
        assert.equal(await page.locator('.review-item:visible').count(),3);
        await page.locator('.review-sort select').selectOption('lowest');
      }
      if(route==='/'){
        await page.getByRole('button',{name:'Abrir menú',exact:true}).click();
        assert(await page.locator('.oria-menu').isVisible());
        await page.keyboard.press('Escape');
        for(const width of [360,390]){
          await page.setViewportSize({width,height:844});
          await page.screenshot({path:`${output}/${variant.id}-${width}.png`,fullPage:true});
        }
        await page.setViewportSize({width:1365,height:1000});
        // Show the distinctive photographed section in this variant's real capture.
        if(variant.id==='espresso-imagen')await page.evaluate(()=>scrollTo(0,document.querySelector('.practice-intro').getBoundingClientRect().top+scrollY-250));
        await page.screenshot({path:`${output}/${variant.id}-desktop.png`});
        await sharp(`${output}/${variant.id}-desktop.png`).resize(1200,879).webp({quality:82,effort:5}).toFile(`public/catalog/abogados-${variant.id}.webp`);
      }
      results.push({variant:variant.id,route,widths:[1365,360,390],direct:true,reload:true});
    }
    assert.deepEqual(errors,[],variant.id);
    console.log(`${variant.id}: 17 rutas, escritorio/360/390, recursos, contactos e interacciones OK`);
    await context.close();
  }
  writeFileSync(`${output}/results${process.argv[2]?'-'+process.argv[2]:''}.json`,JSON.stringify(results,null,2));
}finally{await browser.close();}
