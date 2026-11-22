import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { load } from 'cheerio';
import postcss from 'postcss';

const source = readFileSync(new URL('../site/inspiration.js', import.meta.url), 'utf8');
const favoriteSource = readFileSync(new URL('../site/inspiration-favorites.js', import.meta.url), 'utf8');
// Handler regressions with explicit document geometry, plus real HTML/CSS
// integration checks. These do not replace rendered browser/touch verification.
function setup({height=820, cardCount=3, stageBase=410, reduced=false, stored='[]', storageFails=false}={}) {
  let document, nextFrame=0;
  const frames=new Map(), motions=[], memory=new Map([['oriavision:inspiration:favorites:v1',stored]]);
  class Element {
    constructor(extra={}) {
      this.listeners=new Map();this.attributes=new Map();this.children=[];this.nodes=new Map();
      const classes=new Set(),props=new Map();
      this.classList={toggle(n,b){if(b)classes.add(n);else classes.delete(n);},contains:n=>classes.has(n)};
      this.style={setProperty:(k,v)=>props.set(k,v),getPropertyValue:k=>props.get(k)||'',removeProperty:k=>props.delete(k)};
      this.hidden=false;this.dataset={};this.textContent='';Object.assign(this,extra);
    }
    addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,[]);this.listeners.get(type).push(fn);}
    fire(type,details={}){
      const event={target:this,detail:0,prevented:false,...details,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};
      for(const fn of this.listeners.get(type)||[])fn(event);return event;
    }
    setAttribute(k,v){this.attributes.set(k,v);}
    removeAttribute(k){this.attributes.delete(k);}
    getAttribute(k){return this.attributes.get(k);}
    querySelector(s){return s==='input:checked'?this.inputs?.find(i=>i.checked):this.nodes.get(s);}
    querySelectorAll(s){return s==='input[type="radio"]'?this.inputs:this.children.flatMap(c=>[...(s===c.tag?[c]:[]),...c.querySelectorAll(s)]);}
    contains(node){return node===this||[...this.nodes.values(),...(this.inputs||[])].includes(node);}
    focus(){document.activeElement=this;}
    append(...nodes){this.children.push(...nodes);}
    replaceChildren(...nodes){this.children=nodes;}
    getBoundingClientRect(){return this.rect||{top:90,bottom:790,height:700};}
    scrollIntoView(){this.scrolledIntoView=true;}
    animate(keyframes,options){
      const motion={element:this,keyframes,options,canceled:false,cancel(){this.canceled=true;this.oncancel?.();},finish(){this.onfinish?.();}};
      motions.push(motion);return motion;
    }
    showModal(){this.open=true;}
    close(){this.open=false;this.fire('close');}
  }
  const designs=Array.from({length:cardCount},(_,index)=>{
    const card=new Element({id:`design-${index}`});
    card.inputs=[0,1].map(variant=>new Element({checked:variant===0,dataset:{preview:`${index}-${variant}.webp`,alt:'Demo',title:`Demo ${index} ${variant}`,url:`/demos/${index}-${variant}/`,whatsapp:'https://wa.me/example'}}));
    for(const s of ['.inspiration-preview img','.design-image-link','figcaption','.design-link','.design-consult','.design-save'])card.nodes.set(s,new Element());
    card.nodes.set('h2',new Element({textContent:`Design ${index}`}));return card;
  });
  const window=new Element({innerWidth:390,innerHeight:height,scrollY:0});
  const root=new Element({clientHeight:height});
  const stack=new Element({clientWidth:370,clientHeight:580});
  const viewer=new Element(),stage=new Element();
  viewer.getBoundingClientRect=()=>({top:1000-window.scrollY,height:parseFloat(viewer.style.getPropertyValue('--inspiration-scroll-height'))||700});
  stage.getBoundingClientRect=()=>({height:stageBase+(parseFloat(stack.style.getPropertyValue('--inspiration-preview-height'))||240)});
  const select=new Element({value:'all'}),count=new Element(),position=new Element(),navigation=new Element();
  const previous=new Element(),following=new Element(),view=new Element(),motion=new Element({matches:reduced});
  const header=new Element({rect:{height:68,bottom:68}}),saved=new Element(),dialog=new Element(),items=new Element(),note=new Element();
  saved.nodes.set('span',new Element());dialog.nodes.set('.favorites-close',new Element());
  const nodes=new Map([['#inspiration-activity',select],['#inspiration-count',count],['.inspiration-viewer',viewer],['.inspiration-stage',stage],['.inspiration-stack',stack],['.site-header',header],['.inspiration-navigation',navigation],['#inspiration-previous',previous],['#inspiration-following',following],['#inspiration-position',position],['#inspiration-view',view],['#inspiration-saved',saved],['.inspiration-favorites',dialog],['#inspiration-favorites-items',items],['#inspiration-storage-note',note],['.inspiration-toast',new Element()]]);
  document={activeElement:null,documentElement:root,querySelector:s=>nodes.get(s),querySelectorAll:()=>designs,createElement:tag=>new Element({tag})};
  window.scrolls=[];
  window.scrollTo=options=>{window.scrolls.push(options);window.scrollY=options.top;window.fire('scroll');};
  const context={document,window,location:{hash:''},matchMedia:()=>motion,requestAnimationFrame(fn){frames.set(++nextFrame,fn);return nextFrame;},setTimeout:()=>1,clearTimeout(){},localStorage:{getItem(k){if(storageFails)throw Error('disabled');return memory.get(k);},setItem(k,v){if(storageFails)throw Error('disabled');memory.set(k,v);}}};
  vm.runInNewContext(source,context);vm.runInNewContext(favoriteSource,context);
  const frame=()=>{const batch=[...frames.values()];frames.clear();batch.forEach(f=>f());};frame();
  const scroll=y=>{window.scrollY=y;window.fire('scroll');frame();};
  const point=index=>1000+parseFloat(viewer.children[index].style.getPropertyValue('top'))-parseFloat(viewer.style.getPropertyValue('--inspiration-sticky-top'));
  return {designs,stack,viewer,stage,root,select,count,position,navigation,previous,following,view,motion,window,document,dialog,saved,items,note,memory,frame,motions,scroll,point,location:context.location};
}
function active(p){return p.designs.filter(d=>!d.hidden&&!d.inert);}

test('production markup gives the sticky stage a real scroll rail and native snap markers',()=>{
 const $=load(readFileSync(new URL('../site/servicios/diseno-web/inspiracion/index.html',import.meta.url),'utf8'));
 assert.equal($('.inspiration-viewer>.inspiration-stage>.inspiration-stack').length,1);
 assert.equal($('.inspiration-stage>.inspiration-navigation').length,1);
 assert.equal($('.inspiration-design').length,11);assert.equal($('.inspiration-design[hidden]').length,0);
 assert.match($('script[src*="inspiration.js"]').attr('src'),/scroll-nativo-v4/);
 const rules=new Map();postcss.parse(readFileSync(new URL('../site/inspiration.css',import.meta.url),'utf8')).walkRules(rule=>{
  if(!rules.has(rule.selector))rules.set(rule.selector,new Map());rule.walkDecls(d=>rules.get(rule.selector).set(d.prop,d.value));
 });
 assert.equal(rules.get('.is-scroll-stack>.inspiration-stage').get('position'),'sticky');
 assert.equal(rules.get('.inspiration-viewer.is-scroll-stack').get('height'),'var(--inspiration-scroll-height)');
 assert.equal(rules.get('.inspiration-scroll-stop').get('scroll-snap-stop'),'always');
 assert.equal(rules.get('html.inspiration-scroll-steps').get('scroll-snap-type'),'y proximity');
});
test('touch, wheel and clicks are left to the browser; document scrolling changes the sheet',()=>{
 const p=setup();
 for(const event of ['touchstart','touchmove','touchend','wheel','click']){
  assert.equal(p.stack.listeners.has(event),false);assert.equal(p.window.listeners.has(event),false);
 }
 p.scroll(p.point(1));assert.equal(p.position.textContent,'Ficha 2 de 3');assert.equal(active(p)[0].id,'design-1');
 assert.equal(p.designs[0].classList.contains('is-in-pile'),true);
 assert.equal(p.designs[2].classList.contains('is-in-pile'),false);
});
test('every sheet is reachable forwards and backwards through real document positions',()=>{
 const p=setup({cardCount:11});
 const railHeight=parseFloat(p.viewer.style.getPropertyValue('--inspiration-scroll-height'));
 assert.ok(railHeight>p.point(10)-p.point(0)+p.stage.getBoundingClientRect().height);
 for(const index of [...Array(11).keys(),...Array.from({length:11},(_,i)=>10-i)]){
  p.scroll(p.point(index));assert.equal(active(p)[0].id,`design-${index}`);
  assert.equal(p.position.textContent,`Ficha ${index+1} de 11`);
  p.motions.at(-1)?.finish();
 }
 assert.equal(p.previous.disabled,true);
});
test('a resting sheet stays complete between transitions; scrolling back reverses the pile',()=>{
 const p=setup();const step=p.point(1)-p.point(0);
 p.scroll(p.point(0)+step*.2);assert.equal(p.position.textContent,'Ficha 1 de 3');assert.equal(p.motions.length,0);
 p.scroll(p.point(0)+step*.6);assert.equal(p.position.textContent,'Ficha 2 de 3');
 const incoming=p.motions.at(-1);assert.equal(incoming.element,p.designs[1]);assert.equal(incoming.keyframes.at(-1).transform,'translateY(8px)');incoming.finish();
 p.scroll(p.point(1)+step*.2);assert.equal(p.motions.length,1);
 p.scroll(p.point(0));const outgoing=p.motions.at(-1);assert.equal(outgoing.element,p.designs[1]);assert.equal(outgoing.keyframes[0].transform,'translateY(8px)');outgoing.finish();
 assert.equal(p.designs[1].classList.contains('is-in-pile'),false);
});
test('Anterior, Siguiente and keyboard navigation move the page to the same stops',()=>{
 const p=setup();p.document.activeElement=p.designs[0].inputs[0];
 p.following.fire('click');assert.equal(p.window.scrollY,p.point(1));assert.equal(p.document.activeElement,p.stack);
 p.stack.fire('keydown',{key:'PageDown'});assert.equal(p.window.scrollY,p.point(2));assert.equal(p.following.disabled,true);
 assert.equal(p.stack.fire('keydown',{key:'PageDown'}).prevented,false);
 p.previous.fire('click');assert.equal(p.position.textContent,'Ficha 2 de 3');
 p.following.fire('click',{detail:1});p.frame();assert.equal(p.window.scrolls.at(-1).behavior,'smooth');
});
test('reduced motion changes the current sheet without an animated transition',()=>{
 const p=setup({reduced:true});p.scroll(p.point(1));assert.equal(p.motions.length,0);
 p.following.fire('click',{detail:1});assert.equal(p.window.scrolls.at(-1).behavior,'instant');assert.equal(p.position.textContent,'Ficha 3 de 3');
});
test('short viewports and large text fall back to a native stack with every card accessible',()=>{
 for(const options of [{height:480},{stageBase:1000}]){
  const p=setup(options);assert.equal(p.stack.classList.contains('is-deck'),false);assert.equal(p.stack.classList.contains('is-native-stack'),true);
  assert.equal(active(p).length,3);assert.equal(p.navigation.hidden,true);assert.equal(p.root.classList.contains('inspiration-scroll-steps'),false);
  assert.equal(p.viewer.style.getPropertyValue('--inspiration-scroll-height'),'');assert.ok(p.viewer.children.every(stop=>stop.hidden));
 }
});
test('filtering and list mode remove scroll height and inert state without losing any design',()=>{
 const p=setup();p.scroll(p.point(1));p.select.value='design-2';p.select.fire('change');
 assert.deepEqual(active(p).map(x=>x.id),['design-2']);assert.equal(p.navigation.hidden,true);assert.equal(p.viewer.classList.contains('is-scroll-stack'),false);
 p.select.value='all';p.select.fire('change');p.view.fire('click');assert.equal(active(p).length,3);assert.equal(p.root.classList.contains('inspiration-scroll-steps'),false);
 p.view.fire('click');assert.equal(active(p).length,1);assert.equal(p.root.classList.contains('inspiration-scroll-steps'),true);
});
test('page restoration keeps the scroll-selected card and chosen palette',()=>{
 const p=setup();p.scroll(p.point(1));const c=p.designs[1];c.inputs[0].checked=false;c.inputs[1].checked=true;c.inputs[1].fire('change');
 p.window.fire('pageshow');assert.equal(p.position.textContent,'Ficha 2 de 3');assert.equal(c.querySelector('.design-link').href,'/demos/1-1/');
 const before=p.viewer.style.getPropertyValue('--inspiration-scroll-height');p.window.innerHeight=760;p.window.fire('resize');assert.equal(p.viewer.style.getPropertyValue('--inspiration-scroll-height'),before);
});
test('rotation remeasures the rail and preserves the current sheet when it still fits',()=>{
 const p=setup();p.scroll(p.point(1));p.window.innerWidth=900;p.window.innerHeight=1000;p.root.clientHeight=1000;p.window.fire('resize');
 assert.equal(p.position.textContent,'Ficha 2 de 3');assert.equal(p.window.scrollY,p.point(1));
});
test('hash links navigate to their matching stop or to the native card on small screens',()=>{
 const p=setup();p.location.hash='#design-2';p.window.fire('hashchange');assert.equal(p.window.scrollY,p.point(2));assert.equal(active(p)[0].id,'design-2');
 const short=setup({height:480});short.location.hash='#design-2';short.window.fire('hashchange');assert.equal(short.designs[2].scrolledIntoView,true);
});
test('interrupted transitions cannot leave a moving sheet covering the active card',()=>{
 const p=setup();p.scroll(p.point(1));const first=p.motions.at(-1);p.scroll(p.point(2));assert.equal(first.canceled,true);
 p.scroll(p.point(1));const departing=p.motions.at(-1);p.view.fire('click');assert.equal(departing.canceled,true);departing.finish();
 assert.equal(p.stack.classList.contains('is-moving'),false);assert.equal(active(p).length,3);assert.ok(p.designs.every(card=>!card.classList.contains('is-leaving')));
});
test('favorites retain multiple palettes and ignore unrecognized stored URLs',()=>{
 const p=setup({stored:'["https://unrecognized.example/"]'});assert.equal(p.saved.querySelector('span').textContent,0);
 const c=p.designs[0];c.querySelector('.design-save').fire('click');c.inputs[0].checked=false;c.inputs[1].checked=true;c.fire('change');c.querySelector('.design-save').fire('click');
 assert.equal(p.saved.querySelector('span').textContent,2);
 const again=setup({stored:p.memory.get('oriavision:inspiration:favorites:v1')});again.saved.fire('click');assert.equal(again.items.children.length,2);assert.equal(again.dialog.open,true);
 again.dialog.querySelector('.favorites-close').fire('click');assert.equal(again.document.activeElement,again.saved);
});
test('unavailable local storage does not break saving or page-driven navigation',()=>{
 const p=setup({storageFails:true});p.designs[0].querySelector('.design-save').fire('click');assert.equal(p.saved.querySelector('span').textContent,1);assert.match(p.note.textContent,/no permite/);
 p.scroll(p.point(1));assert.equal(p.position.textContent,'Ficha 2 de 3');
});
