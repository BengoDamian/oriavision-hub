/* Native horizontal touch scrolling. No wheel/touch interception or carousel clones. */
(() => {
  const desktop = matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-showcase]').forEach(root => {
    if (root.hasAttribute('data-flow')) return;
    const viewport = root.querySelector('.showcase-viewport');
    const cards = Array.from(root.querySelectorAll('[data-showcase-card]'));
    const tools = root.querySelector('.showcase-tools');
    const toggle = root.querySelector('[data-showcase-toggle]');
    const count = root.querySelector('[data-showcase-count]');
    const status = root.querySelector('[data-showcase-status]');
    if (!viewport || cards.length < 2) return;
    let index = 0, timer = null, settled = null, visible = false;
    let hovered = false, focused = false, paused = false;
    const autoMode = () => root.dataset.autoplay === 'true' && desktop.matches && !reduced.matches;
    const overflowing = () => viewport.scrollWidth > viewport.clientWidth + 2;
    const position = card => card.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
    const nearest = () => cards.reduce((best, card, i) => Math.abs(position(card) - viewport.scrollLeft) < Math.abs(position(cards[best]) - viewport.scrollLeft) ? i : best, 0);
    const sync = () => {
      clearTimeout(timer);
      toggle.hidden = !autoMode() || !overflowing();
      toggle.setAttribute('aria-label', paused ? 'Reanudar avance automático' : 'Pausar avance automático');
      toggle.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
      tools.hidden = !overflowing();
      if (autoMode() && overflowing() && visible && !document.hidden && !paused && !hovered && !focused) {
        timer = setTimeout(() => goTo((index + 1) % cards.length, false), 6500);
      }
    };
    const goTo = (next, user = true, instant = false) => {
      const destination = (next + cards.length) % cards.length;
      const wraps = Math.abs(destination - index) > 1;
      index = destination;
      if (user) paused = true;
      viewport.scrollTo({left:position(cards[index]), behavior:instant || wraps || reduced.matches ? 'instant' : 'smooth'});
      count.textContent = String(index + 1);
      if (user) {
        const label = cards[index].dataset.slideLabel || cards[index].querySelector('h3')?.textContent || 'Fotografía';
        status.textContent = `${index + 1} de ${cards.length}: ${label}`;
      }
      sync();
    };
    root.querySelector('[data-showcase-prev]').addEventListener('click', () => goTo(index - 1));
    root.querySelector('[data-showcase-next]').addEventListener('click', () => goTo(index + 1));
    toggle.addEventListener('click', () => { paused = !paused; sync(); });
    viewport.addEventListener('pointerdown', () => { paused = true; sync(); }, {passive:true});
    viewport.addEventListener('scroll', () => {
      clearTimeout(timer); clearTimeout(settled);
      settled = setTimeout(() => { index = nearest(); count.textContent = String(index + 1); sync(); }, 160);
    }, {passive:true});
    root.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hovered = true; sync(); } });
    root.addEventListener('pointerleave', () => { hovered = false; sync(); });
    root.addEventListener('focusin', e => {
      focused = true; sync();
      const card = e.target.closest('[data-showcase-card]');
      if (card && overflowing()) goTo(cards.indexOf(card), true, true);
    });
    root.addEventListener('focusout', e => { focused = root.contains(e.relatedTarget); sync(); });
    viewport.addEventListener('keydown', e => {
      if (e.altKey || e.ctrlKey || e.metaKey || !overflowing()) return;
      let next;
      if (e.key === 'ArrowRight') next = index + 1;
      else if (e.key === 'ArrowLeft') next = index - 1;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = cards.length - 1;
      else return;
      e.preventDefault();
      goTo(next);
      cards[index].focus({preventScroll:true});
    });
    desktop.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .35; sync(); }, {threshold:.35}).observe(viewport);
    }
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => { if (overflowing()) goTo(index, false, true); else sync(); }).observe(viewport);
    } else window.addEventListener('resize', sync, {passive:true});
    sync();
  });
})();
