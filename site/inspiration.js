(() => {
  'use strict';
  const designs = [...document.querySelectorAll('.inspiration-design')];
  const select = document.querySelector('#inspiration-activity');
  const count = document.querySelector('#inspiration-count');
  const stack = document.querySelector('.inspiration-stack');
  const header = document.querySelector('.site-header');
  const navigation = document.querySelector('.inspiration-navigation');
  const previous = document.querySelector('#inspiration-previous');
  const following = document.querySelector('#inspiration-following');
  const position = document.querySelector('#inspiration-position');
  const view = document.querySelector('#inspiration-view');
  if (!select || !count || !stack || !navigation || !view) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let layoutHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
  let visible = designs, current = 0, list = false, frame = 0, touch = null, filterValue = select.value;
  let ignoreClickUntil = 0, lastWheel = 0, wheelAmount = 0, wheelConsumed = false, animation;
  function resetGesture() { lastWheel = 0; wheelAmount = 0; wheelConsumed = false; touch = null; }
  function stopMotion() {
    const running = animation;
    animation = null;
    running?.cancel();
    designs.forEach(section => section.classList.toggle('is-leaving', false));
    stack.classList.toggle('is-moving', false);
    stack.setAttribute('aria-busy', 'false');
  }
  function render() {
    const deck = !list && visible.length > 1;
    const step = Math.min(8, (window.innerWidth <= 600 ? 48 : 64) / Math.max(1, visible.length - 1));
    stack.style.setProperty('--inspiration-pile-depth', `${step * (visible.length - 1)}px`);
    stack.classList.toggle('is-deck', deck);
    stack.tabIndex = deck ? 0 : -1;
    designs.forEach(section => {
      const index = visible.indexOf(section);
      const active = !deck || section === visible[current];
      // These are the actual earlier sheets, retained below the current one.
      // Their colored top edges stay visible; future sheets stay out of view.
      section.classList.toggle('is-in-pile', deck && index >= 0 && index <= current);
      section.style.setProperty('--inspiration-sheet-offset', `${Math.max(0, index) * step}px`);
      section.style.setProperty('--inspiration-sheet-order', String(index + 1));
      section.classList.toggle('is-active', active);
      section.inert = section.hidden || !active;
      if (section.inert) section.setAttribute('aria-hidden', 'true');
      else section.removeAttribute('aria-hidden');
    });
    navigation.hidden = !deck;
    previous.disabled = current === 0;
    following.disabled = current === visible.length - 1;
    position.textContent = `${current + 1} de ${visible.length}`;
    position.setAttribute('aria-label', `${current + 1} de ${visible.length}: ${visible[current].querySelector('h2').textContent}`);
    view.hidden = visible.length < 2;
    view.textContent = list ? 'Ver por fichas' : 'Ver en lista';
    view.setAttribute('aria-pressed', String(list));
    stack.setAttribute('aria-label', deck ? 'Propuestas de diseño. Usá Anterior, Siguiente o deslizá una ficha por vez.' : 'Propuestas de diseño');
    measureSoon();
  }
  function move(direction, animate = true) {
    const next = current + direction;
    if (next < 0 || next >= visible.length || list) return false;
    const departing = visible[current];
    const restoreFocus = departing.contains(document.activeElement);
    stopMotion();
    current = next;
    render();
    if (restoreFocus) stack.focus({preventScroll:true});
    if (animate && !reducedMotion.matches && visible[current].animate) {
      const sheet = direction > 0 ? visible[current] : departing;
      const offset = parseFloat(sheet.style.getPropertyValue('--inspiration-sheet-offset')) || 0;
      const below = stack.clientHeight + 24;
      if (direction < 0) sheet.classList.toggle('is-leaving', true);
      stack.classList.toggle('is-moving', true);
      stack.setAttribute('aria-busy', 'true');
      const positions = direction > 0 ? [below, offset] : [offset, below];
      const running = sheet.animate(positions.map(y => ({transform:`translateY(${y}px)`})), {
        duration:360, easing:'cubic-bezier(.22,1,.36,1)'
      });
      animation = running;
      running.onfinish = running.oncancel = () => { if (animation === running) stopMotion(); };
    }
    return true;
  }
  function measure() {
    frame = 0;
    if (!stack.classList.contains('is-deck')) return;
    const mobile = window.innerWidth <= 800;
    const desired = mobile ? Math.min(240, stack.clientWidth * .60) : 380;
    stack.style.setProperty('--inspiration-preview-height', `${Math.floor(desired)}px`);
    const headerHeight = header?.getBoundingClientRect().height || 0;
    // Text is never shrunk or clipped to fit. Short viewports scroll normally.
    const available = layoutHeight - headerHeight - navigation.offsetHeight - 48;
    const overflow = Math.max(0, stack.offsetHeight - available);
    if (mobile && overflow) stack.style.setProperty('--inspiration-preview-height', `${Math.max(116, Math.floor(desired - overflow))}px`);
  }
  function measureSoon() { if (!frame) frame = requestAnimationFrame(measure); }
  function readyForGesture() {
    if (list || visible.length < 2 || document.querySelector('dialog[open]') || document.querySelector('.menu-toggle[aria-expanded="true"]')) return false;
    const rect = visible[current].getBoundingClientRect();
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    const bottom = window.visualViewport?.height || window.innerHeight;
    return rect.top >= headerBottom - 2 && rect.bottom <= bottom - 4;
  }
  const isControl = target => !!target.closest('button, input, select, textarea, label, a:not(.design-image-link)');
  // Only a completely visible deck captures a gesture. Never intercept the
  // whole page; once consumed, discard momentum until a genuinely new gesture.
  stack.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const now = performance.now();
    if (now - lastWheel > 240) { wheelAmount = 0; wheelConsumed = false; if (animation) stopMotion(); }
    // The incoming card is outside the viewport during part of its animation.
    // Consume the original gesture's momentum before checking its geometry.
    if (wheelConsumed) { lastWheel = now; event.preventDefault(); return; }
    if (isControl(event.target) || !readyForGesture()) return;
    lastWheel = now;
    const direction = Math.sign(event.deltaY);
    if (!direction || (direction < 0 && current === 0) || (direction > 0 && current === visible.length - 1)) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stack.clientHeight : 1;
    if (Math.sign(wheelAmount) !== direction) wheelAmount = 0;
    wheelAmount += event.deltaY * unit;
    event.preventDefault();
    if (Math.abs(wheelAmount) >= 48) wheelConsumed = move(direction);
  }, {passive:false});
  stack.addEventListener('touchstart', event => {
    touch = null;
    if (animation) stopMotion();
    if (event.touches.length !== 1 || isControl(event.target) || !readyForGesture()) return;
    touch = {x:event.touches[0].clientX, y:event.touches[0].clientY, direction:0, captured:false};
  }, {passive:true});
  stack.addEventListener('touchmove', event => {
    if (!touch) return;
    if (event.touches.length !== 1) { touch = null; return; }
    const dx = event.touches[0].clientX - touch.x, dy = touch.y - event.touches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) || dy === 0) {
      touch.direction = 0;
      if (touch.captured) event.preventDefault();
      return;
    }
    const direction = Math.sign(dy);
    if (!touch.captured && ((direction < 0 && current === 0) || (direction > 0 && current === visible.length - 1))) { touch = null; return; }
    touch.captured = true;
    touch.direction = Math.abs(dy) >= 48 ? direction : 0;
    event.preventDefault();
  }, {passive:false});
  stack.addEventListener('touchend', () => {
    if (touch?.captured) {
      ignoreClickUntil = performance.now() + 450;
      if (touch.direction) move(touch.direction);
    }
    touch = null;
  });
  stack.addEventListener('touchcancel', () => { touch = null; });
  stack.addEventListener('click', event => {
    if (performance.now() < ignoreClickUntil) { event.preventDefault(); event.stopPropagation(); }
  }, true);
  stack.addEventListener('keydown', event => {
    if (event.target !== stack || list || event.altKey || event.ctrlKey || event.metaKey) return;
    const direction = ['ArrowDown','ArrowRight','PageDown'].includes(event.key) ? 1 : ['ArrowUp','ArrowLeft','PageUp'].includes(event.key) ? -1 : 0;
    if (direction && move(direction, false)) event.preventDefault();
  });
  previous.addEventListener('click', event => { resetGesture(); move(-1, event.detail !== 0); });
  following.addEventListener('click', event => { resetGesture(); move(1, event.detail !== 0); });
  view.addEventListener('click', () => { list = !list; resetGesture(); stopMotion(); render(); });
  stack.addEventListener('focusin', () => { if (animation) stopMotion(); });
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
    resetGesture();
    stopMotion();
    const variants = visible.reduce((sum, section) => sum + section.querySelectorAll('input[type="radio"]').length, 0);
    count.textContent = `${visible.length} ${visible.length === 1 ? 'propuesta' : 'propuestas'} · ${variants} variantes de color`;
    render();
  }
  function revealHash() {
    const target = designs.find(section => '#' + section.id === location.hash);
    if (!target) return;
    select.value = 'all'; filter(); current = designs.indexOf(target); render();
  }
  designs.forEach(section => {
    section.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', () => applyPalette(section, input)));
    applyPalette(section, section.querySelector('input:checked'));
  });
  select.addEventListener('change', filter);
  let layoutWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (layoutWidth !== window.innerWidth) {
      layoutWidth = window.innerWidth;
      layoutHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
      resetGesture(); stopMotion(); render();
    }
  }, {passive:true});
  reducedMotion.addEventListener('change', stopMotion);
  document.fonts?.ready.then(measureSoon);
  window.addEventListener('hashchange', revealHash);
  window.addEventListener('pageshow', () => {
    stopMotion();
    designs.forEach(section => applyPalette(section, section.querySelector('input:checked')));
    if (select.value !== filterValue) filter();
    else render();
  });
  filter(); revealHash();
})();
