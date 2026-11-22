(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const cards = [...document.querySelectorAll('.inspiration-design')];
  const select = $('#inspiration-activity');
  const count = $('#inspiration-count');
  const grid = $('.inspiration-stack');
  const collection = $('.inspiration-viewer');
  if (!cards.length || !select || !count || !grid || !collection) return;
  const mobileStack = matchMedia('(max-width:600px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let stackFrame = 0;
  // Port of the published Nubrexa catalogue's updateStack calculation.
  // Cards remain in normal document order; CSS sticky does all the scrolling.
  function updateStack(){
    stackFrame=0;if(!grid)return;
    const visible=cards.filter(card=>!card.hidden);
    const enabled=mobileStack.matches&&!reduced.matches&&visible.length>1;
    collection.classList.toggle('is-stacked',enabled);
    grid.dataset.stack=String(enabled);
    ['--stack-card-height','--stack-preview-height','--stack-tail'].forEach(name=>grid.style.removeProperty(name));
    if(!enabled){cards.forEach(card=>card.style.removeProperty('scroll-margin-top'));return;}
    // Keep the whole active card reachable before the next one covers it.
    const viewport=window.visualViewport?.height||window.innerHeight;
    const base=$('.site-header').getBoundingClientRect().height+12;
    const naturalPreview=Math.max(...visible.map(card=>$('.inspiration-preview',card).getBoundingClientRect().height));
    const chrome=Math.ceil(Math.max(...visible.map(card=>card.getBoundingClientRect().height-$('.inspiration-preview',card).getBoundingClientRect().height)));
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

  function applyPalette(card, input) {
    if (!input) return;
    const image = $('.inspiration-preview img', card);
    image.src = input.dataset.preview;
    image.alt = input.dataset.alt;
    $('figcaption', card).textContent = input.dataset.title;
    const link = $('.design-image-link', card);
    link.href = input.dataset.url;
    link.setAttribute('aria-label', `Recorrer ${input.dataset.title} (se abre en otra pestaña)`);
    $('.design-link', card).href = input.dataset.url;
    $('.design-consult', card).href = input.dataset.whatsapp;
  }
  function filter() {
    cards.forEach(card => card.hidden = select.value !== 'all' && card.id !== select.value);
    const visible = cards.filter(card => !card.hidden);
    const variants = visible.reduce((sum, card) => sum + card.querySelectorAll('input[type="radio"]').length, 0);
    count.textContent = `${visible.length} ${visible.length === 1 ? 'propuesta' : 'propuestas'} · ${variants} variantes de color`;
    updateStack();
  }
  function revealHash() {
    const card = cards.find(card => '#' + card.id === location.hash);
    if (!card) return;
    if (card.hidden) { select.value = 'all'; filter(); }
    card.scrollIntoView({block:'start', behavior:'instant'});
  }
  cards.forEach(card => {
    card.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', () => applyPalette(card, input)));
    applyPalette(card, $('input:checked', card));
  });
  select.addEventListener('change', filter);
  window.addEventListener('resize', scheduleStack, {passive:true});
  window.visualViewport?.addEventListener('resize', scheduleStack, {passive:true});
  mobileStack.addEventListener('change', scheduleStack);
  reduced.addEventListener('change', scheduleStack);
  document.fonts?.ready.then(scheduleStack);
  // Nubrexa also reveals a covered card when its controls receive keyboard focus.
  grid.addEventListener('focusin', event => {
    const card = event.target.closest('.inspiration-design');
    if (!card || grid.dataset.stack !== 'true') return;
    const index = cards.indexOf(card);
    const next = cards.slice(index + 1).find(card => !card.hidden);
    if (next && next.getBoundingClientRect().top < card.getBoundingClientRect().bottom) {
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      card.style.scrollMarginTop = (parseFloat(card.style.getPropertyValue('--stack-top')) - padding) + 'px';
      card.scrollIntoView({block:'start', behavior:'instant'});
    }
  });
  window.addEventListener('hashchange', revealHash);
  window.addEventListener('pageshow', () => {
    cards.forEach(card => applyPalette(card, $('input:checked', card)));
    filter();
  });
  filter();
  revealHash();
})();
