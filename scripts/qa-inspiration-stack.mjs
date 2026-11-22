import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../site/inspiration.js', import.meta.url), 'utf8');
const favoriteSource = readFileSync(new URL('../site/inspiration-favorites.js', import.meta.url), 'utf8');
// Exercise the real page handlers. Geometry is explicit; this does not pretend
// to replace visual/touch QA in a browser.
function setup({height = 820, cardTop = 90, cardBottom = 670, reduced = false, stored = '[]', storageFails = false} = {}) {
  let document, now = 1000, nextFrame = 0, animations = 0;
  const frames = new Map(), motions = [], memory = new Map([['oriavision:inspiration:favorites:v1',stored]]);
  class Element {
    constructor(extra = {}) {
      this.listeners = new Map(); this.attributes = new Map(); this.children = []; this.nodes = new Map();
      const classes = new Set(), props = new Map();
      this.classList = {toggle(n,b) { if (b) classes.add(n); else classes.delete(n); }, contains:n=>classes.has(n)};
      this.style = {setProperty:(k,v)=>props.set(k,v), getPropertyValue:k=>props.get(k)||'', removeProperty:k=>props.delete(k)};
      this.hidden = false; this.dataset = {}; this.textContent = ''; Object.assign(this, extra);
    }
    addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, []); this.listeners.get(type).push(fn); }
    fire(type, details = {}) {
      const event = {target:this, detail:0, prevented:false, ...details, preventDefault() { this.prevented=true; }, stopPropagation() { this.stopped=true; }};
      for (const fn of this.listeners.get(type)||[]) fn(event); return event;
    }
    setAttribute(k,v) { this.attributes.set(k,v); }
    removeAttribute(k) { this.attributes.delete(k); }
    getAttribute(k) { return this.attributes.get(k); }
    querySelector(s) { return s==='input:checked' ? this.inputs?.find(i=>i.checked) : this.nodes.get(s); }
    querySelectorAll(s) { return s==='input[type="radio"]' ? this.inputs : this.children.flatMap(c=>[...(s===c.tag?[c]:[]),...c.querySelectorAll(s)]); }
    closest(selector) {
      if (selector.includes('textarea') && !selector.includes('button')) return this.editable ? this : null;
      return this.control ? this : null;
    }
    contains(node) { return node===this || [...this.nodes.values(),...(this.inputs||[])].includes(node); }
    focus() { document.activeElement=this; }
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren(...nodes) { this.children=nodes; }
    getBoundingClientRect() { return this.rect || {top:cardTop,bottom:cardBottom,height:cardBottom-cardTop}; }
    animate(keyframes, options) {
      animations++;
      const motion = {element:this, keyframes, options, canceled:false, cancel(){this.canceled=true;this.oncancel?.();}, finish(){this.onfinish?.();}};
      motions.push(motion); return motion;
    }
    showModal() { this.open=true; }
    close() { this.open=false; this.fire('close'); }
  }
  const designs = [0,1,2].map(index=> {
    const card = new Element({id:`design-${index}`});
    card.inputs = [0,1].map(variant=>new Element({checked:variant===0, control:true, dataset:{preview:`${index}-${variant}.webp`,alt:'Demo',title:`Demo ${index} ${variant}`,url:`/demos/${index}-${variant}/`,whatsapp:'https://wa.me/example'}}));
    for (const s of ['.inspiration-preview img','.design-image-link','figcaption','.design-link','.design-consult','.design-save']) card.nodes.set(s,new Element());
    card.nodes.set('h2',new Element({textContent:`Design ${index}`})); return card;
  });
  const stack = new Element({clientWidth:370,clientHeight:580,offsetHeight:580,rect:{top:90,bottom:cardBottom,height:580}});
  const select = new Element({value:'all'}), count = new Element(), position = new Element(), navigation = new Element({offsetHeight:74});
  const previous = new Element(), following = new Element(), view = new Element();
  const motion = new Element({matches:reduced}), window = new Element({innerWidth:390,innerHeight:height,visualViewport:{height}});
  window.scrolls = [];
  window.scrollBy = options => window.scrolls.push(options);
  const header = new Element({rect:{height:68,bottom:68}}), saved = new Element(), dialog = new Element(), items = new Element(), note = new Element();
  saved.nodes.set('span',new Element()); dialog.nodes.set('.favorites-close',new Element());
  const nodes = new Map([['#inspiration-activity',select],['#inspiration-count',count],['.inspiration-stack',stack],['.site-header',header],['.inspiration-navigation',navigation],['#inspiration-previous',previous],['#inspiration-following',following],['#inspiration-position',position],['#inspiration-view',view],['#inspiration-saved',saved],['.inspiration-favorites',dialog],['#inspiration-favorites-items',items],['#inspiration-storage-note',note],['.inspiration-toast',new Element()]]);
  document = {activeElement:null,documentElement:{clientHeight:height},querySelector:s=>s==='dialog[open]'?(dialog.open?dialog:null):nodes.get(s),querySelectorAll:()=>designs,createElement:tag=>new Element({tag})};
  const context = {document,window,location:{hash:''},matchMedia:()=>motion,performance:{now:()=>now},requestAnimationFrame(fn) { frames.set(++nextFrame,fn); return nextFrame; },setTimeout:()=>1,clearTimeout(){},localStorage:{getItem(k){if(storageFails)throw Error('disabled');return memory.get(k);},setItem(k,v){if(storageFails)throw Error('disabled');memory.set(k,v);}}};
  vm.runInNewContext(source,context); vm.runInNewContext(favoriteSource,context);
  const frame = ()=>{const batch=[...frames.values()];frames.clear();batch.forEach(f=>f());}; frame();
  const wheel = (dy=100,extra={})=>stack.fire('wheel',{deltaY:dy,deltaX:0,deltaMode:0,...extra});
  return {designs,stack,select,count,position,navigation,previous,following,view,motion,window,document,dialog,saved,items,note,memory,wheel,frame,motions,location:context.location,advance(ms=300){now+=ms;},animations:()=>animations};
}
function active(page) { return page.designs.filter(d=>!d.hidden&&!d.inert); }

test('only the current card is interactive and its index changes by exactly one',()=>{
 const p=setup(); assert.deepEqual(active(p).map(x=>x.id),['design-0']); assert.equal(p.previous.disabled,true);
 p.following.fire('click'); assert.deepEqual(active(p).map(x=>x.id),['design-1']); assert.equal(p.position.textContent,'2 de 3');
 p.previous.fire('click'); assert.equal(p.position.textContent,'1 de 3');
});
test('a long wheel gesture and its momentum cannot skip cards; a fresh gesture can',()=>{
 const p=setup(); for(const delta of [90,160,70,30,12,6]){p.advance(30);assert.equal(p.wheel(delta).prevented,true);}
 assert.equal(p.position.textContent,'2 de 3'); p.advance();p.wheel();assert.equal(p.position.textContent,'3 de 3');
 p.advance();assert.equal(p.wheel().prevented,false);p.advance();p.wheel(-80);assert.equal(p.position.textContent,'2 de 3');
});
test('the first/last boundaries, zoom and unread card content leave page scrolling alone',()=>{
 const p=setup();assert.equal(p.wheel(-80).prevented,false);assert.equal(p.wheel(90,{ctrlKey:true}).prevented,false);
 const short=setup({height:480,cardBottom:700});assert.equal(short.wheel().prevented,false);short.following.fire('click');assert.equal(short.position.textContent,'2 de 3');
});
test('a tall card advances once its bottom is visible, even with its heading above the screen',()=>{
 const p=setup({height:640,cardTop:-180,cardBottom:620});
 assert.equal(p.wheel().prevented,true);assert.equal(p.position.textContent,'2 de 3');
 assert.ok(p.window.scrolls.some(scroll=>scroll.top<0),'the new card is brought back below the header');
});
test('backward navigation works at the top of an oversized card without requiring its bottom',()=>{
 const p=setup({height:480,cardBottom:900});p.following.fire('click');p.advance();
 assert.equal(p.wheel(-100).prevented,true);assert.equal(p.position.textContent,'1 de 3');
});
test('a touch may start on palettes, save buttons or links; taps keep their normal action',()=>{
 const p=setup();const control=p.designs[0].inputs[0];
 p.stack.fire('touchstart',{target:control,touches:[{clientX:50,clientY:400}]});
 p.stack.fire('touchend');assert.equal(p.position.textContent,'1 de 3');assert.equal(p.stack.fire('click',{target:control}).prevented,false);
 p.stack.fire('touchstart',{target:control,touches:[{clientX:50,clientY:400}]});
 assert.equal(p.stack.fire('touchmove',{target:control,touches:[{clientX:50,clientY:300}]}).prevented,true);
 p.stack.fire('touchend');assert.equal(p.position.textContent,'2 de 3');assert.equal(p.stack.fire('click',{target:control}).prevented,true);
 p.advance(500);assert.equal(p.stack.fire('click',{target:control}).prevented,false);
});
test('a tall card can be read first and advanced with the next swipe at its bottom',()=>{
 const p=setup({height:640,cardBottom:1000});
 p.stack.fire('touchstart',{touches:[{clientX:50,clientY:400}]});
 assert.equal(p.stack.fire('touchmove',{touches:[{clientX:50,clientY:300}]}).prevented,false);
 p.stack.fire('touchend');assert.equal(p.position.textContent,'1 de 3');
 p.designs[0].rect={top:-290,bottom:620,height:910};
 p.stack.fire('touchstart',{touches:[{clientX:50,clientY:400}]});
 assert.equal(p.stack.fire('touchmove',{touches:[{clientX:50,clientY:280}]}).prevented,true);
 p.stack.fire('touchend');assert.equal(p.position.textContent,'2 de 3');
});
test('wheel scrolling over palette controls can advance the card',()=>{
 const p=setup();assert.equal(p.wheel(100,{target:p.designs[0].inputs[0]}).prevented,true);assert.equal(p.position.textContent,'2 de 3');
});
test('touch changes cards on release, once, and suppresses click-through to a sample',()=>{
 const p=setup();p.stack.fire('touchstart',{touches:[{clientX:50,clientY:400}]});
 for(const y of [360,300,200])p.stack.fire('touchmove',{touches:[{clientX:50,clientY:y}]});
 assert.equal(p.position.textContent,'1 de 3');p.stack.fire('touchend');assert.equal(p.position.textContent,'2 de 3');
 assert.equal(p.stack.fire('click').prevented,true);p.advance(500);assert.equal(p.stack.fire('click').prevented,false);
});
test('pinch zoom, canceled touches and short taps do not advance cards',()=>{
 const p=setup();p.stack.fire('touchstart',{touches:[{clientX:10,clientY:300}]});
 assert.equal(p.stack.fire('touchmove',{touches:[{clientX:10,clientY:200},{clientX:40,clientY:240}]}).prevented,false);
 p.stack.fire('touchend');assert.equal(p.position.textContent,'1 de 3');
 p.stack.fire('touchstart',{touches:[{clientX:10,clientY:300}]});p.stack.fire('touchmove',{touches:[{clientX:10,clientY:200}]});p.stack.fire('touchcancel');p.stack.fire('touchend');assert.equal(p.position.textContent,'1 de 3');
});
test('filters and list mode leave every visible item accessible, with no inert leftovers',()=>{
 const p=setup();p.select.value='design-2';p.select.fire('change');assert.equal(p.navigation.hidden,true);assert.deepEqual(active(p).map(x=>x.id),['design-2']);
 p.select.value='all';p.select.fire('change');p.view.fire('click');assert.equal(active(p).length,3);assert.equal(p.wheel().prevented,false);
 p.view.fire('click');assert.equal(active(p).length,1);assert.equal(p.navigation.hidden,false);
});
test('keyboard navigation is immediate, preserves focus, and respects reduced motion',()=>{
 const p=setup();p.document.activeElement=p.designs[0].inputs[0];p.following.fire('click');assert.equal(p.document.activeElement,p.stack);
 p.stack.fire('keydown',{key:'ArrowRight'});assert.equal(p.position.textContent,'3 de 3');assert.equal(p.animations(),0);
 const reduced=setup({reduced:true});reduced.wheel();assert.equal(reduced.position.textContent,'2 de 3');assert.equal(reduced.animations(),0);
});
test('palette selection and the current card survive page restoration and toolbar resizing',()=>{
 const p=setup();p.following.fire('click');const c=p.designs[1];c.inputs[0].checked=false;c.inputs[1].checked=true;c.inputs[1].fire('change');
 assert.equal(c.querySelector('.design-link').href,'/demos/1-1/');p.window.fire('pageshow');assert.equal(p.position.textContent,'2 de 3');assert.equal(c.querySelector('.design-link').href,'/demos/1-1/');
 const before=p.stack.style.getPropertyValue('--inspiration-preview-height');p.window.innerHeight=700;p.window.fire('resize');p.frame();assert.equal(p.stack.style.getPropertyValue('--inspiration-preview-height'),before);
});
test('hash links reveal the referenced design without losing access to the rest',()=>{
 const p=setup();p.location.hash='#design-2';p.window.fire('hashchange');assert.equal(p.position.textContent,'3 de 3');assert.deepEqual(active(p).map(x=>x.id),['design-2']);
});
test('favorites retain multiple palettes, survive reload, and ignore unrecognized stored URLs',()=>{
 const p=setup({stored:'["https://unrecognized.example/"]'});assert.equal(p.saved.querySelector('span').textContent,0);
 const c=p.designs[0];c.querySelector('.design-save').fire('click');c.inputs[0].checked=false;c.inputs[1].checked=true;c.fire('change');c.querySelector('.design-save').fire('click');
 assert.equal(p.saved.querySelector('span').textContent,2);const data=p.memory.get('oriavision:inspiration:favorites:v1');
 const again=setup({stored:data});assert.equal(again.saved.querySelector('span').textContent,2);again.saved.fire('click');assert.equal(again.items.children.length,2);assert.equal(again.dialog.open,true);
 again.dialog.querySelector('.favorites-close').fire('click');assert.equal(again.document.activeElement,again.saved);
});
test('unavailable storage does not break saving or navigation and explains the limit',()=>{
 const p=setup({storageFails:true});p.designs[0].querySelector('.design-save').fire('click');assert.equal(p.saved.querySelector('span').textContent,1);assert.match(p.note.textContent,/no permite/);p.following.fire('click');assert.equal(p.position.textContent,'2 de 3');
});

test('a pointer step slides the actual new sheet over the retained previous sheet',()=>{
 const p=setup();p.following.fire('click',{detail:1});
 assert.equal(p.motions.length,1);const move=p.motions[0];
 assert.equal(move.element,p.designs[1]);
 assert.ok(parseFloat(move.keyframes[0].transform.match(/[\d.]+/)[0])>=p.stack.clientHeight);
 assert.equal(move.keyframes[1].transform,'translateY(8px)');
 assert.equal(p.designs[0].classList.contains('is-in-pile'),true);
 assert.equal(p.designs[1].classList.contains('is-in-pile'),true);
 assert.equal(p.designs[2].classList.contains('is-in-pile'),false);
 assert.equal(p.designs[0].inert,true);assert.equal(p.designs[1].inert,false);
 assert.ok(+p.designs[1].style.getPropertyValue('--inspiration-sheet-order')>+p.designs[0].style.getPropertyValue('--inspiration-sheet-order'));
 move.finish();assert.equal(p.stack.classList.contains('is-moving'),false);
 assert.equal(p.designs[0].classList.contains('is-in-pile'),true);
 assert.equal(p.designs[2].classList.contains('is-in-pile'),false);
});
test('going backwards lowers the top sheet and reveals the existing sheet below it',()=>{
 const p=setup();p.following.fire('click',{detail:1});p.motions.at(-1).finish();
 p.previous.fire('click',{detail:1});const move=p.motions.at(-1);
 assert.equal(move.element,p.designs[1]);assert.equal(move.keyframes[0].transform,'translateY(8px)');
 assert.equal(p.designs[1].classList.contains('is-leaving'),true);
 assert.equal(p.designs[0].classList.contains('is-in-pile'),true);
 move.finish();assert.equal(p.designs[1].classList.contains('is-leaving'),false);
 assert.equal(p.designs[1].classList.contains('is-in-pile'),false);
 assert.equal(p.stack.getAttribute('aria-busy'),'false');
});
test('wheel momentum is consumed while the animated sheet is still below the viewport',()=>{
 const p=setup();p.wheel();p.designs[1].rect={top:900,bottom:1480,height:580};
 p.advance(40);assert.equal(p.wheel().prevented,true);assert.equal(p.position.textContent,'2 de 3');
});
test('interrupted animations cannot leave an extra sheet covering the active controls',()=>{
 const p=setup();p.following.fire('click',{detail:1});p.motions.at(-1).finish();
 p.previous.fire('click',{detail:1});const departing=p.motions.at(-1);
 p.select.value='design-2';p.select.fire('change');
 assert.equal(departing.canceled,true);assert.equal(p.designs[1].classList.contains('is-leaving'),false);
 assert.equal(p.stack.classList.contains('is-moving'),false);assert.deepEqual(active(p).map(x=>x.id),['design-2']);
 departing.finish();assert.equal(p.designs[2].inert,false);
});
