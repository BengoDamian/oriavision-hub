(() => {
  'use strict';
  const designs = [...document.querySelectorAll('.inspiration-design')];
  const select = document.querySelector('#inspiration-activity');
  const count = document.querySelector('#inspiration-count');
  const viewer = document.querySelector('.inspiration-viewer');
  const stage = document.querySelector('.inspiration-stage');
  const stack = document.querySelector('.inspiration-stack');
  const header = document.querySelector('.site-header');
  const navigation = document.querySelector('.inspiration-navigation');
  const previous = document.querySelector('#inspiration-previous');
  const following = document.querySelector('#inspiration-following');
  const position = document.querySelector('#inspiration-position');
  const view = document.querySelector('#inspiration-view');
  if (!designs.length || !select || !count || !viewer || !stage || !stack || !navigation || !view) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const stops = designs.map(() => {
    const stop = document.createElement('span');
    stop.className = 'inspiration-scroll-stop';
    stop.setAttribute('aria-hidden', 'true');
    viewer.append(stop);
    return stop;
  });
  let visible = designs, current = 0, list = false, stepped = false;
  let stepDistance = 600, stickyTop = 80, frame = 0, animation;
  let layoutWidth = window.innerWidth;
  let layoutHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
  let filterValue = select.value;

  function stopMotion() {
    const running = animation;
    animation = null;
    running?.cancel();
    designs.forEach(section => section.classList.toggle('is-leaving', false));
    stack.classList.toggle('is-moving', false);
    stack.setAttribute('aria-busy', 'false');
  }
  function renderCards() {
    designs.forEach(section => {
      const index = visible.indexOf(section);
      const active = !stepped || index === current;
      section.classList.toggle('is-in-pile', stepped && index >= 0 && index <= current);
      section.classList.toggle('is-active', active);
      section.inert = section.hidden || !active;
      if (section.inert) section.setAttribute('aria-hidden', 'true');
      else section.removeAttribute('aria-hidden');
    });
    previous.disabled = current === 0;
    following.disabled = current === visible.length - 1;
    position.textContent = `Ficha ${current + 1} de ${visible.length}`;
    position.setAttribute('aria-label', `${current + 1} de ${visible.length}: ${visible[current].querySelector('h2').textContent}`);
  }
  function show(index, animate = true) {
    if (index === current) return;
    const departing = visible[current];
    const direction = Math.sign(index - current);
    const restoreFocus = departing.contains(document.activeElement);
    stopMotion();
    current = index;
    renderCards();
    if (restoreFocus) stack.focus({preventScroll:true});
    if (!animate || reducedMotion.matches || !visible[current].animate) return;
    const sheet = direction > 0 ? visible[current] : departing;
    const offset = parseFloat(sheet.style.getPropertyValue('--inspiration-sheet-offset')) || 0;
    const below = stack.clientHeight + 24;
    if (direction < 0) sheet.classList.toggle('is-leaving', true);
    stack.classList.toggle('is-moving', true);
    stack.setAttribute('aria-busy', 'true');
    const positions = direction > 0 ? [below, offset] : [offset, below];
    const running = sheet.animate(positions.map(y => ({transform:`translateY(${y}px)`})), {
      duration:320, easing:'cubic-bezier(.22,1,.36,1)'
    });
    animation = running;
    running.onfinish = running.oncancel = () => { if (animation === running) stopMotion(); };
  }
  // This is the page's real scroll position, not a synthetic swipe counter.
  // The sticky stage has enough document height to visit every sheet. Static
  // snap markers let the browser stop at each sheet, including on Android.
  function startPosition() {
    return window.scrollY + viewer.getBoundingClientRect().top + 12 - stickyTop;
  }
  function syncScroll(animate = true) {
    frame = 0;
    if (!stepped) return;
    const progress = (window.scrollY - startPosition()) / stepDistance;
    const index = Math.max(0, Math.min(visible.length - 1, Math.round(progress)));
    show(index, animate);
  }
  function onScroll() {
    if (stepped && !frame) frame = requestAnimationFrame(() => syncScroll());
  }
  function goTo(index, smooth = true) {
    if (!stepped || index < 0 || index >= visible.length) return false;
    window.scrollTo({top:startPosition() + index * stepDistance, behavior:smooth && !reducedMotion.matches ? 'smooth' : 'instant'});
    if (!smooth || reducedMotion.matches) syncScroll(false);
    return true;
  }
  function configure() {
    stopMotion();
    const wantsStack = !list && visible.length > 1;
    const step = Math.min(8, (window.innerWidth <= 600 ? 40 : 56) / Math.max(1, visible.length - 1));
    stickyTop = (header?.getBoundingClientRect().height || 0) + 12;
    const available = layoutHeight - stickyTop - 12;
    stack.style.setProperty('--inspiration-pile-depth', `${step * (visible.length - 1)}px`);
    viewer.style.setProperty('--inspiration-sticky-top', `${stickyTop}px`);
    stack.classList.toggle('is-native-stack', false);
    stack.classList.toggle('is-deck', wantsStack);
    navigation.hidden = !wantsStack;
    designs.forEach(section => {
      const index = visible.indexOf(section);
      section.style.setProperty('--inspiration-sheet-offset', `${Math.max(0, index) * step}px`);
      section.style.setProperty('--inspiration-sheet-order', String(index + 1));
    });
    if (wantsStack) {
      const desired = window.innerWidth <= 800 ? Math.min(240, stack.clientWidth * .60) : 380;
      stack.style.setProperty('--inspiration-preview-height', `${Math.floor(desired)}px`);
      const overflow = Math.max(0, stage.getBoundingClientRect().height - available);
      if (overflow) stack.style.setProperty('--inspiration-preview-height', `${Math.max(80, Math.floor(desired - overflow))}px`);
    }
    stepped = wantsStack && stage.getBoundingClientRect().height <= available + 1;
    stack.classList.toggle('is-deck', stepped);
    stack.classList.toggle('is-native-stack', wantsStack && !stepped);
    viewer.classList.toggle('is-scroll-stack', stepped);
    document.documentElement.classList.toggle('inspiration-scroll-steps', stepped);
    navigation.hidden = !stepped;
    stack.tabIndex = stepped ? 0 : -1;
    if (stepped) {
      stepDistance = Math.max(360, Math.round(layoutHeight * .8));
      const height = stage.getBoundingClientRect().height + stepDistance * (visible.length - 1) + 184;
      viewer.style.setProperty('--inspiration-scroll-height', `${Math.ceil(height)}px`);
    } else {
      viewer.style.removeProperty('--inspiration-scroll-height');
      // Very short windows or large text keep a real, naturally scrolling
      // sticky stack. No content is hidden merely because it cannot fit.
      visible.forEach((section, index) => {
        const top = Math.min(stickyTop + index * step, layoutHeight - section.getBoundingClientRect().height - 12);
        section.style.setProperty('--inspiration-native-top', `${Math.floor(top)}px`);
      });
    }
    stops.forEach((stop, index) => {
      stop.hidden = !stepped || index >= visible.length;
      stop.style.setProperty('top', `${12 + index * stepDistance}px`);
    });
    view.hidden = visible.length < 2;
    view.textContent = list ? 'Ver fichas apilables' : 'Ver en lista';
    view.setAttribute('aria-pressed', String(list));
    stack.setAttribute('aria-label', stepped ? 'Propuestas de diseño. Desplazá la página o usá Anterior y Siguiente.' : 'Propuestas de diseño');
    renderCards();
    syncScroll(false);
  }
  function applyPalette(section, input) {
    if (!input) return;
    const image = section.querySelector('.inspiration-preview img');
    const imageLink = section.querySelector('.design-image-link');
    image.src = input.dataset.preview;
    image.alt = input.dataset.alt;
    section.querySelector('figcaption').textContent = input.dataset.title;
    imageLink.href = input.dataset.url;
    imageLink.setAttribute('aria-label', `Recorrer ${input.dataset.title} (se abre en otra pestaña)`);
    section.querySelector('.design-link').href = input.dataset.url;
    section.querySelector('.design-consult').href = input.dataset.whatsapp;
  }
  function filter() {
    filterValue = select.value;
    designs.forEach(section => section.hidden = select.value !== 'all' && section.id !== select.value);
    visible = designs.filter(section => !section.hidden);
    current = 0;
    const variants = visible.reduce((sum, section) => sum + section.querySelectorAll('input[type="radio"]').length, 0);
    count.textContent = `${visible.length} ${visible.length === 1 ? 'propuesta' : 'propuestas'} · ${variants} variantes de color`;
    configure();
  }
  function revealHash() {
    const index = designs.findIndex(section => '#' + section.id === location.hash);
    if (index < 0) return;
    select.value = 'all';
    filter();
    if (stepped) goTo(index, false);
    else designs[index].scrollIntoView({block:'start', behavior:'instant'});
  }
  // Touch, wheel, pinch, links and palette controls keep native browser input.
  // Only explicit navigation keys on the focused region override their default.
  window.addEventListener('scroll', onScroll, {passive:true});
  stack.addEventListener('keydown', event => {
    if (event.target !== stack || !stepped || event.altKey || event.ctrlKey || event.metaKey) return;
    const direction = ['ArrowDown','ArrowRight','PageDown'].includes(event.key) ? 1 : ['ArrowUp','ArrowLeft','PageUp'].includes(event.key) ? -1 : 0;
    if (direction && goTo(current + direction, false)) event.preventDefault();
  });
  previous.addEventListener('click', event => goTo(current - 1, event.detail !== 0));
  following.addEventListener('click', event => goTo(current + 1, event.detail !== 0));
  view.addEventListener('click', () => { list = !list; configure(); });
  stack.addEventListener('focusin', () => { if (animation) stopMotion(); });
  select.addEventListener('change', filter);
  designs.forEach(section => {
    section.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', () => applyPalette(section, input)));
    applyPalette(section, section.querySelector('input:checked'));
  });
  window.addEventListener('resize', () => {
    if (layoutWidth !== window.innerWidth || Math.abs(window.innerHeight - layoutHeight) > 160) {
      const preserve = stepped && window.scrollY >= startPosition() && window.scrollY <= startPosition() + (visible.length - 1) * stepDistance;
      const index = current;
      layoutWidth = window.innerWidth;
      layoutHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
      configure();
      if (preserve && stepped) goTo(index, false);
    }
  }, {passive:true});
  reducedMotion.addEventListener('change', stopMotion);
  document.fonts?.ready.then(configure);
  window.addEventListener('hashchange', revealHash);
  window.addEventListener('pageshow', () => {
    designs.forEach(section => applyPalette(section, section.querySelector('input:checked')));
    if (select.value !== filterValue) filter();
    else configure();
  });
  filter();
  revealHash();
})();
