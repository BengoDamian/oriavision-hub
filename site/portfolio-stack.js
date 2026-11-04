(() => {
  const list = document.querySelector('.all-projects');
  const header = document.querySelector('.site-header');
  if (!list || !header) return;
  const cards = [...list.querySelectorAll('.project-card')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  function update() {
    frame = 0;
    const visible = cards.filter(card => !card.hidden);
    const top = Math.ceil(header.getBoundingClientRect().height) + 12;
    const step = visible.length > 1 ? Math.min(3, 24 / (visible.length - 1)) : 0;
    const largest = Math.max(0, ...visible.map(card => card.getBoundingClientRect().height));
    // On short screens or at large text zoom, use a normal list rather than hide content.
    const fits = largest + top + step * (visible.length - 1) + 28 <= window.innerHeight;
    visible.forEach((card, index) => {
      card.style.setProperty('--stack-top', `${top + step * index}px`);
      card.style.setProperty('--stack-order', String(index + 1));
    });
    list.classList.toggle('is-stacked', visible.length > 1 && fits && !reducedMotion.matches);
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  // Filtering does not replace or wrap cards, so existing links and browser Back keep working.
  new MutationObserver(schedule).observe(list, {subtree:true, attributes:true, attributeFilter:['hidden']});
  if ('ResizeObserver' in window) {
    const resize = new ResizeObserver(schedule);
    resize.observe(header);
    cards.forEach(card => resize.observe(card));
  }
  window.addEventListener('resize', schedule, {passive:true});
  window.addEventListener('pageshow', schedule);
  reducedMotion.addEventListener('change', schedule);
  document.fonts?.ready.then(schedule);
  update();
})();
