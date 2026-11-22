// Reference from the user-supplied Nubrexa catalogue, retrieved 2026-11-22.
// https://nubrexa-factoria-web.ercasa.chatgpt.site/site.ab9748e06648.js
// SHA-256: ab9748e066486071349358cb9096746ec846a88b21ea010e6df7d97630692e7c
  function updateStack(){
    stackFrame=0;if(!grid)return;
    const visible=cards.filter(card=>!card.hidden);
    const enabled=mobileStack.matches&&!reduced.matches&&visible.length>1;
    collection.classList.toggle('is-stacked',enabled);
    grid.dataset.stack=String(enabled);
    ['--stack-card-height','--stack-preview-height','--stack-tail'].forEach(name=>grid.style.removeProperty(name));
    if(!enabled){cards.forEach(card=>card.style.removeProperty('scroll-margin-top'));return;}
    // Keep the whole active card reachable before the next one covers it.
    // On phones the filter scrolls away; the fixed “Rubros” link returns to it.
    const viewport=window.visualViewport?.height||innerHeight;
    const base=$('.site-header').getBoundingClientRect().height+12;
    const naturalPreview=Math.max(...visible.map(card=>$('.project-preview',card).getBoundingClientRect().height));
    const chrome=Math.ceil(Math.max(...visible.map(card=>card.getBoundingClientRect().height-$('.project-preview',card).getBoundingClientRect().height)));
    const edgeCount=visible.length-1;
    const step=Math.max(5,Math.min(12,Math.floor((viewport-base-chrome-naturalPreview-18)/edgeCount)));
    const depth=step*edgeCount;
    const preview=Math.floor(Math.min(naturalPreview,viewport-base-depth-chrome-18));
    // A short landscape window or large text needs normal scrolling, not clipped controls.
    if(preview<96){collection.classList.remove('is-stacked');grid.dataset.stack='false';return;}
    const height=chrome+preview;
    grid.style.setProperty('--stack-card-height',height+'px');
    grid.style.setProperty('--stack-preview-height',preview+'px');
    grid.style.setProperty('--stack-tail',(depth+Math.round(viewport*.2)+24)+'px');
    const scrollPadding=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0;
    visible.forEach((card,index)=>{
      card.style.setProperty('--stack-top',(base+index*step)+'px');
      card.style.setProperty('--stack-order',String(index+1));
      card.style.scrollMarginTop=Math.max(0,base+index*step-scrollPadding)+'px';
    });
  }
  function scheduleStack(){if(grid&&!stackFrame)stackFrame=requestAnimationFrame(updateStack);}
