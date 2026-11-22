import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { load } from 'cheerio';
import postcss from 'postcss';

const source=readFileSync(new URL('../site/inspiration.js',import.meta.url),'utf8');
const reference=readFileSync(new URL('./fixtures/nubrexa-stack-reference.js',import.meta.url),'utf8');
const favoriteSource=readFileSync(new URL('../site/inspiration-favorites.js',import.meta.url),'utf8');
// Compare against the unmodified calculation retrieved from the user's reference.
// Geometry is supplied explicitly; this is not rendered browser/touch verification.
function setup({width=390,height=820,cardCount=11,headerHeight=68,scrollPadding=100,reduced=false,chrome=270,preview=210,stored='[]',storageFails=false,referenceOnly=false}={}) {
  let document,nextFrame=0;
  const frames=new Map(),memory=new Map([['oriavision:inspiration:favorites:v1',stored]]);
  class Element {
    constructor(extra={}){
      this.listeners=new Map();this.attributes=new Map();this.children=[];this.nodes=new Map();
      const classes=new Set(),props=new Map();
      this.classList={toggle(n,b){if(b)classes.add(n);else classes.delete(n);},remove:n=>classes.delete(n),contains:n=>classes.has(n)};
      this.style={setProperty:(k,v)=>props.set(k,v),getPropertyValue:k=>props.get(k)||'',removeProperty:k=>props.delete(k)};
      Object.defineProperty(this.style,'scrollMarginTop',{get:()=>props.get('scroll-margin-top')||'',set:v=>props.set('scroll-margin-top',v)});
      this.hidden=false;this.inert=false;this.dataset={};this.textContent='';Object.assign(this,extra);
    }
    addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,[]);this.listeners.get(type).push(fn);}
    fire(type,details={}){
      const event={target:this,prevented:false,...details,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};
      for(const fn of this.listeners.get(type)||[])fn(event);return event;
    }
    setAttribute(k,v){this.attributes.set(k,v);}
    removeAttribute(k){this.attributes.delete(k);}
    getAttribute(k){return this.attributes.get(k);}
    querySelector(s){return s==='input:checked'?this.inputs?.find(i=>i.checked):this.nodes.get(s);}
    querySelectorAll(s){return s==='input[type="radio"]'?this.inputs:this.children.flatMap(c=>[...(s===c.tag?[c]:[]),...c.querySelectorAll(s)]);}
    closest(s){return s==='.inspiration-design'?this.card:null;}
    focus(){document.activeElement=this;}
    append(...nodes){this.children.push(...nodes);}
    replaceChildren(...nodes){this.children=nodes;}
    getBoundingClientRect(){return this.rect||{top:0,bottom:headerHeight,height:headerHeight};}
    scrollIntoView(options){this.scrollRequest=options;}
    showModal(){this.open=true;}
    close(){this.open=false;this.fire('close');}
  }
  const mobileStack=new Element({matches:width<=600}),motion=new Element({matches:reduced});
  const viewport=new Element({height}),window=new Element({innerWidth:width,innerHeight:height,visualViewport:viewport});
  const root=new Element(),grid=new Element(),collection=new Element();
  const enabled=()=>grid.dataset.stack==='true'&&mobileStack.matches&&!motion.matches;
  const cards=Array.from({length:cardCount},(_,index)=>{
    const card=new Element({id:`design-${index}`});card.card=card;
    const picture=new Element();
    picture.getBoundingClientRect=()=>({height:enabled()&&grid.style.getPropertyValue('--stack-preview-height')?parseFloat(grid.style.getPropertyValue('--stack-preview-height')):preview+(index%3)*9});
    card.getBoundingClientRect=()=>card.rect||{top:100+index*600,bottom:100+index*600+chrome+(index%4)*12+picture.getBoundingClientRect().height,height:enabled()&&grid.style.getPropertyValue('--stack-card-height')?parseFloat(grid.style.getPropertyValue('--stack-card-height')):chrome+(index%4)*12+picture.getBoundingClientRect().height};
    card.nodes.set('.inspiration-preview',picture);card.nodes.set('.project-preview',picture);
    card.inputs=[0,1].map(variant=>new Element({card,checked:variant===0,dataset:{preview:`${index}-${variant}.webp`,alt:'Demo',title:`Demo ${index} ${variant}`,url:`/demos/${index}-${variant}/`,whatsapp:'https://wa.me/example'}}));
    for(const selector of ['.inspiration-preview img','.design-image-link','figcaption','.design-link','.design-consult','.design-save'])card.nodes.set(selector,new Element({card}));
    return card;
  });
  const select=new Element({value:'all'}),count=new Element(),header=new Element();
  const saved=new Element(),dialog=new Element(),items=new Element(),note=new Element();
  saved.nodes.set('span',new Element());dialog.nodes.set('.favorites-close',new Element());
  const nodes=new Map([['#inspiration-activity',select],['#inspiration-count',count],['.inspiration-viewer',collection],['.inspiration-stack',grid],['.site-header',header],['#inspiration-saved',saved],['.inspiration-favorites',dialog],['#inspiration-favorites-items',items],['#inspiration-storage-note',note],['.inspiration-toast',new Element()]]);
  document={activeElement:null,documentElement:root,querySelector:s=>nodes.get(s),querySelectorAll:()=>cards,createElement:tag=>new Element({tag})};
  const context={document,window,innerHeight:height,location:{hash:''},matchMedia:q=>q.includes('max-width')?mobileStack:motion,getComputedStyle:()=>({scrollPaddingTop:`${scrollPadding}px`}),requestAnimationFrame(fn){frames.set(++nextFrame,fn);return nextFrame;},setTimeout:()=>1,clearTimeout(){},localStorage:{getItem(k){if(storageFails)throw Error('disabled');return memory.get(k);},setItem(k,v){if(storageFails)throw Error('disabled');memory.set(k,v);}}};
  if(referenceOnly){
    Object.assign(context,{cards,grid,collection,mobileStack,reduced:motion,stackFrame:0,$:(s,r=document)=>r.querySelector(s)});
    vm.runInNewContext(reference+'\nupdateStack();',context);
  }else{
    vm.runInNewContext(source,context);vm.runInNewContext(favoriteSource,context);
  }
  const frame=()=>{const batch=[...frames.values()];frames.clear();batch.forEach(fn=>fn());};frame();
  const snapshot=()=>({stack:grid.dataset.stack,collection:collection.classList.contains('is-stacked'),height:grid.style.getPropertyValue('--stack-card-height'),preview:grid.style.getPropertyValue('--stack-preview-height'),tail:grid.style.getPropertyValue('--stack-tail'),cards:cards.map(card=>({top:card.style.getPropertyValue('--stack-top'),order:card.style.getPropertyValue('--stack-order'),margin:card.style.scrollMarginTop}))});
  return {cards,grid,collection,select,count,root,window,viewport,mobileStack,motion,document,saved,dialog,items,note,memory,frame,snapshot,location:context.location};
}

test('stack measurements match the actual Nubrexa calculation across viewport/content sizes',()=>{
 const cases=[{}, {width:320,height:568}, {width:600,height:900}, {width:601,height:900}, {width:1440,height:900}, {height:360}, {height:700,chrome:390}, {height:760,headerHeight:82,scrollPadding:84}, {cardCount:1}, {cardCount:4}, {reduced:true}];
 for(const options of cases){
  const actual=setup(options),expected=setup({...options,referenceOnly:true});
  assert.deepEqual(actual.snapshot(),expected.snapshot(),JSON.stringify(options));
 }
});
test('all eleven cards stay in the document and interactive; their edges rise progressively',()=>{
 const p=setup();assert.equal(p.grid.dataset.stack,'true');
 for(let i=0;i<p.cards.length;i++){
  const card=p.cards[i];assert.equal(card.hidden,false);assert.equal(card.inert,false);assert.equal(card.getAttribute('aria-hidden'),undefined);
  assert.equal(card.style.getPropertyValue('--stack-order'),String(i+1));
  if(i)assert.ok(parseFloat(card.style.getPropertyValue('--stack-top'))>parseFloat(p.cards[i-1].style.getPropertyValue('--stack-top')));
 }
 const lastTop=parseFloat(p.cards.at(-1).style.getPropertyValue('--stack-top'));
 assert.ok(lastTop+parseFloat(p.grid.style.getPropertyValue('--stack-card-height'))<=p.viewport.height-18);
});
test('page gestures and scroll position have no JS interception or synthetic active-card counter',()=>{
 const p=setup();
 for(const event of ['touchstart','touchmove','touchend','wheel','scroll','click','keydown']){
  assert.equal(p.grid.listeners.has(event),false);assert.equal(p.window.listeners.has(event),false);
 }
 assert.equal(p.grid.children.length,0);
});
test('short screens and reduced motion use the same unclipped fallback as Nubrexa',()=>{
 const p=setup({height:360});assert.equal(p.grid.dataset.stack,'false');assert.equal(p.grid.style.getPropertyValue('--stack-card-height'),'');
 assert.ok(p.cards.every(card=>!card.hidden&&!card.inert));
 const normal=setup();normal.motion.matches=true;normal.motion.fire('change');normal.frame();assert.equal(normal.grid.dataset.stack,'false');
 normal.motion.matches=false;normal.motion.fire('change');normal.frame();assert.equal(normal.grid.dataset.stack,'true');
});
test('viewport height and responsive breakpoint changes remeasure without hiding cards',()=>{
 const p=setup();p.viewport.height=600;p.viewport.fire('resize');p.frame();
 assert.deepEqual(p.snapshot(),setup({height:600,referenceOnly:true}).snapshot());
 p.mobileStack.matches=false;p.mobileStack.fire('change');p.frame();assert.equal(p.grid.dataset.stack,'false');
 assert.ok(p.cards.every(card=>!card.hidden&&!card.inert));
});
test('filtering to one design removes the stack sizing and restoring all recomputes it',()=>{
 const p=setup();p.select.value='design-2';p.select.fire('change');
 assert.equal(p.grid.dataset.stack,'false');assert.equal(p.grid.style.getPropertyValue('--stack-tail'),'');
 assert.deepEqual(p.cards.filter(card=>!card.hidden).map(card=>card.id),['design-2']);assert.equal(p.count.textContent,'1 propuesta · 2 variantes de color');
 p.select.value='all';p.select.fire('change');assert.equal(p.grid.dataset.stack,'true');assert.ok(p.cards.every(card=>!card.hidden&&!card.inert));
});
test('keyboard focus reveals covered controls using the reference scroll-margin adjustment',()=>{
 const p=setup(),card=p.cards[0];card.rect={top:80,bottom:614,height:534};p.cards[1].rect={top:90,bottom:624,height:534};
 p.grid.fire('focusin',{target:card.inputs[0]});assert.equal(card.scrollRequest.behavior,'instant');assert.equal(card.style.scrollMarginTop,'-20px');
});
test('palette changes, page restoration and fragment links preserve links and visibility',()=>{
 const p=setup(),card=p.cards[2];card.inputs[0].checked=false;card.inputs[1].checked=true;card.inputs[1].fire('change');
 p.window.fire('pageshow');assert.equal(card.querySelector('.design-link').href,'/demos/2-1/');
 p.select.value='design-0';p.select.fire('change');p.location.hash='#design-2';p.window.fire('hashchange');
 assert.equal(p.select.value,'all');assert.equal(card.scrollRequest.block,'start');assert.equal(card.hidden,false);
});
test('real HTML/CSS uses the reference sticky layout and removes all staged-navigation remnants',()=>{
 const html=readFileSync(new URL('../site/servicios/diseno-web/inspiracion/index.html',import.meta.url),'utf8');
 const $=load(html);assert.equal($('.inspiration-viewer>.inspiration-stack').length,1);assert.equal($('.inspiration-design').length,11);
 assert.equal($('.inspiration-design[hidden],.inspiration-design[inert]').length,0);
 assert.equal($('.inspiration-stage,.inspiration-navigation,#inspiration-view,.inspiration-scroll-stop').length,0);
 assert.match($('script[src*="inspiration.js"]').attr('src'),/nubrexa-v5/);
 const css=readFileSync(new URL('../site/inspiration.css',import.meta.url),'utf8');
 assert.doesNotMatch(css,/scroll-snap|is-deck|inspiration-scroll-height|is-native-stack/);
 const rules=new Map();postcss.parse(css).walkRules(rule=>{
  if(!rules.has(rule.selector))rules.set(rule.selector,new Map());rule.walkDecls(d=>rules.get(rule.selector).set(d.prop,d.value));
 });
 const card=rules.get('.inspiration-stack[data-stack=true]>.inspiration-design');
 for(const [key,value] of Object.entries({position:'sticky',top:'var(--stack-top,82px)','z-index':'var(--stack-order,1)',height:'var(--stack-card-height,auto)','margin-bottom':'24px',opacity:'1',transform:'none',transition:'none'}))assert.equal(card.get(key),value);
 assert.equal(rules.get('.inspiration-stack[data-stack=true]::after').get('height'),'var(--stack-tail,0px)');
 assert.equal(rules.get('.inspiration-design-layout,.inspiration-options').get('display'),'contents');
 assert.equal(rules.get('.palette-list').get('grid-template-columns'),'repeat(2,minmax(0,1fr))');
});
test('favorites retain multiple palettes and ignore unrecognized stored URLs',()=>{
 const p=setup({stored:'["https://unrecognized.example/"]'});assert.equal(p.saved.querySelector('span').textContent,0);
 const c=p.cards[0];c.querySelector('.design-save').fire('click');c.inputs[0].checked=false;c.inputs[1].checked=true;c.fire('change');c.querySelector('.design-save').fire('click');
 assert.equal(p.saved.querySelector('span').textContent,2);
 const again=setup({stored:p.memory.get('oriavision:inspiration:favorites:v1')});again.saved.fire('click');assert.equal(again.items.children.length,2);assert.equal(again.dialog.open,true);
 again.dialog.querySelector('.favorites-close').fire('click');assert.equal(again.document.activeElement,again.saved);
});
test('unavailable storage keeps saving usable and does not affect the stack',()=>{
 const p=setup({storageFails:true});p.cards[0].querySelector('.design-save').fire('click');assert.equal(p.saved.querySelector('span').textContent,1);assert.match(p.note.textContent,/no permite/);assert.equal(p.grid.dataset.stack,'true');
});
