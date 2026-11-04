const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#menu');
function closeMenu(){if(!menu||!menuButton)return;menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú');}
if(menuButton&&menu){menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const messages={crear:'Hola, Oriavision. Quiero consultar por la creación de mi tienda en Tiendanube.',mejorar:'Hola, Oriavision. Ya tengo una tienda en Tiendanube y quiero consultar por mejoras.',orientacion:'Hola, Oriavision. Necesito orientación para mi proyecto de tienda online.'};
function choose(value){document.querySelectorAll('[data-choice]').forEach(b=>{const active=b.dataset.choice===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});const contact=document.querySelector('#contact-wa');if(contact)contact.href='https://wa.me/5491127575675?text='+encodeURIComponent(messages[value]);}
document.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.choice)));
document.querySelectorAll('[data-select]').forEach(a=>a.addEventListener('click',()=>choose(a.dataset.select)));
const dialog=document.querySelector('#notes');
if(dialog){document.querySelector('#open-notes')?.addEventListener('click',()=>dialog.showModal());document.querySelector('#close-notes')?.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});}

const carousel=document.querySelector('.carousel-hero');
if(carousel){
 const slogans=[...carousel.querySelectorAll('[data-slogan]')];
 const pictures=[...carousel.querySelectorAll('[data-image]')];
 const pauseButton=carousel.querySelector('#carousel-pause');
 const count=carousel.querySelector('.carousel-count');
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,timer=null,cleanup=null,paused=false,hovered=false,focused=false,visible=true;
 const delay=6500;
 function stop(){clearTimeout(timer);timer=null;}
 function schedule(){stop();if(!paused&&!hovered&&!focused&&!document.hidden&&visible&&!reducedMotion.matches)timer=setTimeout(next,delay);}
 function show(index){
  clearTimeout(cleanup);
  [...slogans,...pictures].forEach(el=>el.classList.remove('is-leaving'));
  const previous=current;current=(index+pictures.length)%pictures.length;
  slogans[previous].classList.remove('is-active');slogans[previous].classList.add('is-leaving');slogans[previous].setAttribute('aria-hidden','true');
  pictures[previous].classList.remove('is-active');pictures[previous].classList.add('is-leaving');pictures[previous].setAttribute('aria-hidden','true');pictures[previous].tabIndex=-1;pictures[previous].inert=true;
  slogans[current].classList.add('is-active');slogans[current].removeAttribute('aria-hidden');
  pictures[current].classList.add('is-active');pictures[current].removeAttribute('aria-hidden');pictures[current].removeAttribute('tabindex');pictures[current].inert=false;
  count.textContent=String(current+1).padStart(2,'0')+' / '+String(pictures.length).padStart(2,'0');
  carousel.querySelector('.carousel-project').textContent=pictures[current].dataset.client;
  carousel.querySelector('.carousel-kind').textContent=pictures[current].dataset.kind||'PROYECTO';
  cleanup=setTimeout(()=>{slogans[previous].classList.remove('is-leaving');pictures[previous].classList.remove('is-leaving');},900);
  schedule();
 }
 function next(){show(current+1);}
 pauseButton.addEventListener('click',()=>{paused=!paused;pauseButton.setAttribute('aria-pressed',String(paused));pauseButton.setAttribute('aria-label',paused?'Reanudar carrusel':'Pausar carrusel');pauseButton.querySelector('.pause-label').textContent=paused?'Reanudar':'Pausar';pauseButton.querySelector('.pause-symbol').textContent=paused?'▷':'Ⅱ';schedule();});
 carousel.querySelector('.carousel-next').addEventListener('click',next);
 carousel.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;stop();}});
 carousel.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){hovered=false;schedule();}});
 carousel.addEventListener('focusin',e=>{if(e.target!==pauseButton){focused=true;stop();}});
 carousel.addEventListener('focusout',()=>{setTimeout(()=>{focused=carousel.contains(document.activeElement)&&document.activeElement!==pauseButton;schedule();},0);});
 document.addEventListener('visibilitychange',schedule);
 reducedMotion.addEventListener('change',schedule);
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.12}).observe(carousel);
 schedule();
}
