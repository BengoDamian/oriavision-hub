(() => {
  const designs = [...document.querySelectorAll('.inspiration-design')];
  const select = document.querySelector('#inspiration-activity');
  const count = document.querySelector('#inspiration-count');
  if (!select || !count) return;
  const stack = document.querySelector('.inspiration-stack');
  const header = document.querySelector('.site-header');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let stackFrame = 0;
  let paintFrame = 0;
  let sheets = [];

  function paintStack() {
    paintFrame = 0;
    // A tall sheet can scroll through its body, but its heading and colored rim
    // stay below the navigation. Clip its background at that same rim so it
    // cannot paint over the edges of earlier sheets.
    const clips = sheets.map(({section, rim}) =>
      Math.max(0, rim - section.getBoundingClientRect().top));
    sheets.forEach(({section}, index) => {
      section.style.setProperty('--inspiration-clip-top', `${clips[index]}px`);
    });
  }
  function schedulePaint() {
    if (!paintFrame && sheets.length) paintFrame = requestAnimationFrame(paintStack);
  }

  function updateStack() {
    stackFrame = 0;
    if (!stack || !header) return;
    const visible = designs.filter(section => !section.hidden);
    const headerTop = Math.ceil(header.getBoundingClientRect().height) + 12;
    const maxDepth = window.innerWidth <= 600 ? 48 : 64;
    const step = visible.length > 1 ? Math.min(8, maxDepth / (visible.length - 1)) : 0;
    const enabled = visible.length > 1 && !reducedMotion.matches;
    sheets = [];
    visible.forEach((section, index) => {
      const rim = headerTop + step * index;
      // Keep natural document scrolling for content taller than the viewport.
      // The inner heading uses the positive rim offset instead of this body offset.
      const top = Math.min(rim, window.innerHeight - section.offsetHeight - 24);
      section.style.setProperty('--inspiration-stack-top', `${top}px`);
      section.style.setProperty('--inspiration-sheet-top', `${rim}px`);
      section.style.setProperty('--inspiration-stack-order', String(index + 1));
      section.style.removeProperty('--inspiration-clip-top');
      if (enabled) sheets.push({section, rim});
    });
    stack.style.setProperty('--inspiration-header-offset', `${headerTop}px`);
    stack.classList.toggle('is-stacked', enabled);
    schedulePaint();
  }
  function scheduleStack() {
    if (!stackFrame) stackFrame = requestAnimationFrame(updateStack);
  }
  function applyPalette(section, input) {
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
    designs.forEach(section => section.hidden = select.value !== 'all' && section.id !== select.value);
    const visible = designs.filter(section => !section.hidden);
    const variants = visible.reduce((sum, section) => sum + section.querySelectorAll('input[type="radio"]').length, 0);
    count.textContent = `${visible.length} ${visible.length === 1 ? 'propuesta' : 'propuestas'} · ${variants} variantes de color`;
    scheduleStack();
  }
  designs.forEach(section => {
    section.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', () => applyPalette(section, input)));
    applyPalette(section, section.querySelector('input:checked'));
  });
  select.addEventListener('change', filter);
  if (stack && header && 'ResizeObserver' in window) {
    const resize = new ResizeObserver(scheduleStack);
    resize.observe(header);
    designs.forEach(section => resize.observe(section));
  }
  window.addEventListener('resize', scheduleStack, {passive:true});
  window.addEventListener('scroll', schedulePaint, {passive:true});
  window.visualViewport?.addEventListener('resize', scheduleStack, {passive:true});
  reducedMotion.addEventListener('change', scheduleStack);
  document.fonts?.ready.then(scheduleStack);
  window.addEventListener('pageshow', () => {
    designs.forEach(section => applyPalette(section, section.querySelector('input:checked')));
    filter();
  });
  filter();
})();
