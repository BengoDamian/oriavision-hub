(() => {
  const designs = [...document.querySelectorAll('.inspiration-design')];
  const select = document.querySelector('#inspiration-activity');
  const count = document.querySelector('#inspiration-count');
  if (!select || !count) return;
  const stack = document.querySelector('.inspiration-stack');
  const header = document.querySelector('.site-header');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let stackFrame = 0;

  function updateStack() {
    stackFrame = 0;
    if (!stack || !header) return;
    const visible = designs.filter(section => !section.hidden);
    const headerTop = Math.ceil(header.getBoundingClientRect().height) + 12;
    const step = visible.length > 1 ? Math.min(3, 24 / (visible.length - 1)) : 0;
    visible.forEach((section, index) => {
      // Tall mobile sheets scroll through their content before their bottom sticks.
      // This keeps every palette and action reachable without nested scrolling.
      const top = Math.min(headerTop, window.innerHeight - section.offsetHeight - 48);
      section.style.setProperty('--inspiration-stack-top', `${top + step * index}px`);
      section.style.setProperty('--inspiration-stack-order', String(index + 1));
    });
    stack.style.setProperty('--inspiration-header-offset', `${headerTop}px`);
    stack.classList.toggle('is-stacked', visible.length > 1 && !reducedMotion.matches);
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
  reducedMotion.addEventListener('change', scheduleStack);
  document.fonts?.ready.then(scheduleStack);
  window.addEventListener('pageshow', () => {
    designs.forEach(section => applyPalette(section, section.querySelector('input:checked')));
    filter();
  });
  filter();
})();
