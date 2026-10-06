import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const variants=JSON.parse(readFileSync('demo-sources/abogados/variants.json','utf8'));
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:4182';
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
mkdirSync('.tool-cache/law-qa',{recursive:true});
try {
  for(const width of [1365,360,390]){
    const context=await browser.newContext({viewport:{width,height:width===1365?1000:844},isMobile:width<640,hasTouch:width<640,reducedMotion:'reduce'});
    await context.route('https://static.cloudflareinsights.com/**',route=>route.fulfill({status:200,body:''}));
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+m.location().url);});
    await page.goto(`${origin}/rubros/?rubro=abogados`,{waitUntil:'networkidle'});
    const cards=page.locator('.demo-card-palette');
    assert.equal(await cards.count(),1);
    assert.equal(await page.locator('#rubro-filter').inputValue(),'abogados');
    const card=cards.first();
    const buttons=card.locator('.palette-option');
    assert.equal(await buttons.count(),5);
    await buttons.first().scrollIntoViewIfNeeded();
    const heights=[];
    for(let index=0;index<5;index++){
      await buttons.nth(index).scrollIntoViewIfNeeded();
      const before=await page.evaluate(()=>scrollY);
      if(width<640)await buttons.nth(index).tap();else await buttons.nth(index).click();
      const after=await page.evaluate(()=>scrollY);
      assert(Math.abs(before-after)<=1,`scroll jump ${width} ${variants[index].id}: ${before}->${after}`);
      const box=await card.boundingBox();heights.push(box.height);
      assert.equal(await card.locator('.palette-preview .is-active').getAttribute('src'),`/catalog/abogados-${variants[index].id}.webp`);
      assert.equal(await card.locator('h2').innerText(),`Estudio jurídico · ${variants[index].name}`);
      const link=card.getByRole('link',{name:'Ver diseño'});
      assert.equal(await link.getAttribute('href'),`https://www.oriavision.com.ar/demos/abogados-${variants[index].id}/`);
      const whatsapp=new URL(await card.getByRole('link',{name:'Quiero uno así'}).getAttribute('href'));
      assert.equal(whatsapp.pathname,'/5491127575675');
      assert(whatsapp.searchParams.get('text').includes(variants[index].name));
      assert(whatsapp.searchParams.get('text').includes(await link.getAttribute('href')));
      const a=await link.boundingBox(),b=await card.getByRole('link',{name:'Quiero uno así'}).boundingBox();
      assert(a.height>=46&&b.height>=46&&Math.abs(a.y-b.y)<1&&Math.abs(a.width-b.width)<1);
    }
    assert(Math.max(...heights)-Math.min(...heights)<1,`height jump ${width}: ${heights}`);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if(width<640){
      const boxes=await buttons.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,right:r.right};}));
      assert(boxes[0].y===boxes[1].y&&boxes[2].y===boxes[3].y&&boxes[4].y>boxes[3].y);
      assert(boxes.every(b=>b.right<=width));
    }
    await card.scrollIntoViewIfNeeded();
    await page.screenshot({path:`.tool-cache/law-qa/catalog-${width}.png`,fullPage:true});
    await page.locator('#rubro-filter').selectOption('todos');
    assert.equal(await cards.count(),9);
    await cards.first().locator('.palette-option').nth(1).scrollIntoViewIfNeeded();
    if(width<640){
      await cards.first().locator('.palette-option').nth(1).tap();
      assert.notEqual(await cards.first().evaluate(el=>getComputedStyle(el).zIndex),'20');
    }
    await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));
    await page.evaluate(()=>scrollTo(0,0));
    await page.setViewportSize({width,height:560});
    assert(['relative','static'].includes(await cards.first().evaluate(el=>getComputedStyle(el).position)));
    await page.goBack({waitUntil:'networkidle'});
    assert.equal(await page.locator('#rubro-filter').inputValue(),'abogados');
    assert.equal(await cards.count(),1);
    assert.deepEqual(errors,[],`${width}px console`);
    results.push({width,variants:5,height:heights[0],scrollStable:true,actionsEqual:true,touchStack:true,shortViewport:true});
    console.log(`${width}px: filtro, cinco paletas, captura/enlaces/WhatsApp, altura/scroll, botones y apilado OK`);
    await context.close();
  }
  writeFileSync('.tool-cache/law-qa/catalog-results.json',JSON.stringify(results,null,2));
} finally {await browser.close();}
