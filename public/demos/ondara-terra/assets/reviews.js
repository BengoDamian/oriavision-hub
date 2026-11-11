/* Continuous center-enlarging carousel adapted from the user's Larregina site.
   Patient names, reviews, rating claims and external destinations are not copied. */
(() => {
  'use strict';
  const root=document.querySelector('[data-pool-reviews]');
  if(!root)return;
  const cards=[...root.querySelectorAll('[data-review-card]')];
  if(cards.length<2)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const status=document.querySelector('[data-review-status]');
  const modulo=(value,total)=>(value%total+total)%total;
  const maxScale=1.24;
  let phase=0,raf=0,last=0,width=0,cardWidth=0,step=1,inView=true;
  let pointer=null,hovered=false,focused=false,keyboardNavigation=false,manualPaused=false,resumeAfter=0;

  function render(){
    if(reduce.matches)return;
    cards.forEach((card,index)=>{
      const distance=(modulo(index-phase+cards.length/2,cards.length)-cards.length/2)*step;
      const near=Math.max(0,1-Math.abs(distance)/step);
      const scale=1+(maxScale-1)*(near*near*(3-2*near));
      const x=width/2-cardWidth/2+distance;
      card.style.transform=`translate3d(${x.toFixed(3)}px,-50%,0) scale(${scale.toFixed(4)})`;
      card.style.zIndex=String(Math.round(scale*100));
    });
  }
  function measure(){
    width=root.clientWidth;cardWidth=cards[0].offsetWidth;
    // Reserve the expanded card's half-width so the two neighbours stay visible.
    const spacing=reduce.matches?1:(1+maxScale)/2;
    step=cardWidth*spacing+(parseFloat(getComputedStyle(root).columnGap)||0);render();
  }
  function stop(){cancelAnimationFrame(raf);raf=0;last=0;}
  function canMove(){return !reduce.matches&&!document.hidden&&inView&&!pointer&&!hovered&&!focused&&!manualPaused&&document.documentElement.dataset.motion!=='paused';}
  function tick(now){
    raf=0;if(!canMove()){last=0;return;}
    if(last&&now>=resumeAfter){phase=modulo(phase+Math.min(now-last,48)/1000*20/step,cards.length);render();}
    last=now;raf=requestAnimationFrame(tick);
  }
  function start(){if(canMove()&&!raf)raf=requestAnimationFrame(tick);}
  function release(delay=800){
    const id=pointer?.id;pointer=null;delete root.dataset.dragging;
    if(id!==undefined&&root.hasPointerCapture(id))root.releasePointerCapture(id);
    resumeAfter=performance.now()+delay;start();
  }
  function mode(){
    stop();release(0);
    if(reduce.matches){delete root.dataset.enhanced;cards.forEach(card=>{card.style.removeProperty('transform');card.style.removeProperty('z-index');});}
    else{root.dataset.enhanced='true';root.scrollLeft=0;measure();start();}
  }
  root.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;stop();}});
  root.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){hovered=false;start();}});
  root.addEventListener('pointerdown',e=>{
    keyboardNavigation=false;focused=false;
    if(reduce.matches||pointer||(e.pointerType==='mouse'&&e.button!==0))return;
    pointer={id:e.pointerId,x:e.clientX,y:e.clientY,phase,dragged:false};stop();
  });
  window.addEventListener('pointermove',e=>{
    if(!pointer||pointer.id!==e.pointerId)return;
    const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;
    if(!pointer.dragged&&Math.abs(dy)>8&&Math.abs(dy)>Math.abs(dx)){release(200);return;}
    if(!pointer.dragged&&Math.abs(dx)<6)return;
    if(!pointer.dragged){pointer.dragged=true;root.dataset.dragging='true';root.setPointerCapture(e.pointerId);}
    phase=modulo(pointer.phase-dx/step,cards.length);render();
  });
  const pointerEnd=e=>{if(pointer?.id===e.pointerId)release();};
  window.addEventListener('pointerup',pointerEnd);
  window.addEventListener('pointercancel',pointerEnd);
  root.addEventListener('lostpointercapture',pointerEnd);
  window.addEventListener('keydown',e=>{if(e.key==='Tab')keyboardNavigation=true;});
  root.addEventListener('focusin',()=>{if(keyboardNavigation){focused=true;stop();}});
  root.addEventListener('focusout',e=>{if(!root.contains(e.relatedTarget)){focused=false;start();}});
  root.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
      e.preventDefault();const direction=e.key==='ArrowRight'?1:-1;
      if(reduce.matches)root.scrollBy({left:direction*step,behavior:'auto'});
      else{phase=modulo(Math.round(phase)+direction,cards.length);render();}
    }
    if(e.code==='Space'){
      e.preventDefault();manualPaused=!manualPaused;
      if(status)status.textContent=manualPaused?'Carrusel pausado.':'Carrusel en movimiento.';
      if(manualPaused)stop();else{focused=false;start();}
    }
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden){release(0);stop();}else{last=0;start();}});
  window.addEventListener('blur',()=>{release(0);stop();});
  window.addEventListener('focus',()=>{measure();start();});
  window.addEventListener('pagehide',stop);
  window.addEventListener('pageshow',()=>{measure();start();});
  document.addEventListener('pool:motionchange',()=>{if(document.documentElement.dataset.motion==='paused')stop();else start();});
  reduce.addEventListener('change',mode);
  if('ResizeObserver' in window)new ResizeObserver(measure).observe(root);
  else window.addEventListener('resize',measure,{passive:true});
  if('IntersectionObserver' in window)new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView)start();else stop();},{rootMargin:'70px'}).observe(root);
  measure();mode();
})();
