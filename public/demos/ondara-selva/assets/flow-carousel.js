/* Complete cards, automatic looping and native swiping. No visible controls. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-flow]').forEach(root => {
    const viewport = root.querySelector('.showcase-viewport');
    const originals = Array.from(viewport.querySelectorAll('[data-showcase-card]'));
    const status = root.querySelector('[data-showcase-status]');
    if (originals.length < 2) return;
    const dwell = 3800, duration = 1150;
    let slides = originals, index = 0, enabled = false, visible = false;
    let hovered = false, focused = false, touching = false, paused = false;
    let timer = 0, frame = 0, settle = 0, cooldown = 0, moving = false;
    let width = 0, layout = '', ignoreScrollUntil = 0;
    const position = slide => slide.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
    const stop = () => {
      clearTimeout(timer); cancelAnimationFrame(frame);
      timer = frame = 0; moving = false;
      root.dataset.flowState = 'paused';
    };
    const jump = left => {
      ignoreScrollUntil = performance.now() + 100;
      viewport.scrollTo({left, behavior:'instant'});
    };
    const canRun = () => enabled && visible && !document.hidden && !reduced.matches && !paused && !hovered && !focused && !touching;
    const schedule = (delay = dwell) => {
      clearTimeout(timer); timer = 0;
      if (!moving && canRun()) {
        root.dataset.flowState = 'waiting';
        timer = setTimeout(() => go(index + 1, false), Math.max(delay, cooldown - performance.now()));
      }
    };
    const nearest = () => slides.reduce((best, card) => Math.abs(position(card) - viewport.scrollLeft) < Math.abs(position(best) - viewport.scrollLeft) ? card : best, slides[0]);
    const normalise = () => {
      const card = nearest();
      index = Number(card.dataset.flowIndex);
      if (card.hasAttribute('data-flow-clone')) jump(position(originals[index]));
    };
    const announce = () => {
      status.textContent = `${index + 1} de ${originals.length}: ${originals[index].querySelector('h3')?.textContent || 'Ver detalle'}`;
    };
    const go = (target, user = true, instant = false) => {
      stop();
      const logical = (target + originals.length) % originals.length;
      let card = originals[logical];
      if (enabled && target === originals.length) card = slides[slides.length - 1];
      if (enabled && target === -1) card = slides[0];
      const from = viewport.scrollLeft, to = position(card);
      const finish = () => {
        moving = false; frame = 0; index = logical;
        jump(position(originals[index]));
        if (user) announce();
        schedule();
      };
      if (instant || reduced.matches || Math.abs(to - from) < .5) { finish(); return; }
      moving = true; root.dataset.flowState = 'moving';
      let start;
      const tick = now => {
        start ??= now;
        const progress = Math.min(1, (now - start) / (user ? 430 : duration));
        const eased = progress * progress * (3 - 2 * progress);
        jump(from + (to - from) * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    };
    const clone = card => {
      const copy = card.cloneNode(true);
      copy.setAttribute('data-flow-clone', '');
      copy.setAttribute('aria-hidden', 'true');
      copy.tabIndex = -1;
      copy.removeAttribute('id');
      copy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
      copy.querySelectorAll('a,button,[tabindex]').forEach(node => node.tabIndex = -1);
      // Clones retain working native links but are not repeated for assistive tech.
      return copy;
    };
    originals.forEach((card, i) => card.dataset.flowIndex = i);
    const resize = () => {
      const nextWidth = viewport.clientWidth, nextLayout = getComputedStyle(viewport).display;
      if (nextWidth === width && nextLayout === layout) return;
      stop(); width = nextWidth; layout = nextLayout;
      viewport.querySelectorAll('[data-flow-clone]').forEach(card => card.remove());
      enabled = layout !== 'grid' && viewport.scrollWidth > width + 2;
      if (enabled) {
        viewport.prepend(clone(originals[originals.length - 1]));
        viewport.append(clone(originals[0]));
      }
      slides = Array.from(viewport.querySelectorAll('[data-showcase-card]'));
      root.classList.toggle('is-flow-ready', enabled);
      if (enabled) jump(position(originals[index]));
      schedule(1400);
    };
    const sync = () => {
      if (!canRun()) stop();
      else schedule();
    };
    const interact = () => {
      stop(); cooldown = performance.now() + 2600;
    };
    viewport.addEventListener('pointerdown', () => { touching = true; interact(); }, {passive:true});
    const release = () => {
      if (!touching) return;
      touching = false; cooldown = performance.now() + 2600; schedule();
      clearTimeout(settle);
      settle = setTimeout(() => { if (!touching && enabled) { normalise(); go(index, false); } }, 180);
    };
    window.addEventListener('pointerup', release, {passive:true});
    window.addEventListener('pointercancel', release, {passive:true});
    viewport.addEventListener('wheel', () => { interact(); schedule(); }, {passive:true});
    viewport.addEventListener('scroll', () => {
      if (moving || performance.now() < ignoreScrollUntil || !enabled) return;
      interact(); clearTimeout(settle);
      settle = setTimeout(() => { if (!touching) { normalise(); go(index, false); } }, 180);
    }, {passive:true});
    root.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; sync(); } });
    root.addEventListener('pointerleave', () => { hovered = false; sync(); });
    root.addEventListener('focusin', event => {
      // A touch focus is transient; keyboard focus must stay still while reading.
      focused = event.target.matches(':focus-visible');
      if (!focused) return;
      stop();
      const card = event.target.closest('[data-showcase-card]');
      if (card && enabled) go(Number(card.dataset.flowIndex), false, true);
    });
    root.addEventListener('focusout', event => { focused = root.contains(event.relatedTarget); sync(); });
    viewport.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey || !enabled) return;
      if (event.key === ' ') {
        event.preventDefault(); paused = !paused;
        if (!paused) focused = false;
        status.textContent = paused ? 'Movimiento pausado.' : 'Movimiento automático activado.';
        sync(); return;
      }
      const next = {ArrowRight:index+1, ArrowLeft:index-1, Home:0, End:originals.length-1}[event.key];
      if (next === undefined) return;
      event.preventDefault(); focused = true; go(next, true, true);
      originals[index].focus({preventScroll:true});
    });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', () => { stop(); if (enabled) go(index, false, true); sync(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .25;
        if (!visible) stop(); else schedule(1400);
      }, {threshold:[0,.25]}).observe(viewport);
    } else visible = true;
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(viewport);
    else window.addEventListener('resize', resize, {passive:true});
    resize();
  });
})();
