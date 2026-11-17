(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-work-showcase]').forEach(root => {
    const slides = [...root.querySelectorAll('[data-work-slide]')];
    if (slides.length < 2) return;
    const viewport = root.querySelector('[data-work-swipe]');
    const controls = root.querySelector('[data-work-controls]');
    const toggle = root.querySelector('[data-work-toggle]');
    const count = root.querySelector('[data-work-current]');
    const status = root.querySelector('[data-work-status]');
    const pending = new Map();
    let index = 0, requested = 0, revision = 0, generation = 0, timer;
    let visible = !('IntersectionObserver' in window), pageActive = true;
    let userPaused = motion.matches, hovering = false, focused = false, gesture = null;
    let suppressClickUntil = 0;
    const paused = () => userPaused || !visible || !pageActive || document.hidden || hovering || focused || gesture !== null;

    function prepare(slide) {
      const image = slide.querySelector('img');
      if (!pending.has(slide)) {
        if (image.dataset.src) { image.src = image.dataset.src; delete image.dataset.src; }
        pending.set(slide, image.decode().then(() => true).catch(() => {
          // Allow a failed request to be retried on the next deliberate visit.
          pending.delete(slide);
          return false;
        }));
      }
      return pending.get(slide);
    }

    function stop() { clearTimeout(timer); ++generation; }
    function schedule() {
      stop();
      root.dataset.rotation = paused() ? 'paused' : 'running';
      if (paused()) return;
      const currentGeneration = generation;
      // Only the next capture is fetched ahead of time, when this section is visible.
      prepare(slides[(index + 1) % slides.length]);
      timer = setTimeout(() => change((index + 1) % slides.length, false, currentGeneration), 8000);
    }
    function updateToggle() {
      toggle.setAttribute('aria-label', userPaused ? 'Reproducir carrusel' : 'Pausar carrusel');
      toggle.setAttribute('aria-pressed', String(userPaused));
      toggle.querySelector('[data-work-play]').toggleAttribute('hidden', !userPaused);
      toggle.querySelector('[data-work-pause]').toggleAttribute('hidden', userPaused);
    }
    async function change(next, manual, autoGeneration) {
      const request = ++revision;
      const target = (next + slides.length) % slides.length;
      if (manual) requested = target;
      if (manual) { userPaused = true; updateToggle(); stop(); }
      const ready = await prepare(slides[target]);
      if (request !== revision || (!manual && (paused() || autoGeneration !== generation))) return;
      if (!ready) {
        requested = index;
        if (manual) status.textContent = 'No se pudo cargar esta captura. Podés volver a intentar o ver todos los trabajos.';
        schedule();
        return;
      }
      index = target;
      requested = target;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
        slide.inert = i !== index;
        slide.setAttribute('aria-hidden', String(i !== index));
      });
      count.textContent = String(index + 1).padStart(2, '0');
      root.dataset.activeProject = slides[index].dataset.project;
      if (manual) status.textContent = `${slides[index].dataset.name}. Proyecto ${index + 1} de ${slides.length}.`;
      schedule();
    }
    root.querySelector('[data-work-prev]').addEventListener('click', () => change(requested - 1, true));
    root.querySelector('[data-work-next]').addEventListener('click', () => change(requested + 1, true));
    toggle.addEventListener('click', () => {
      userPaused = !userPaused;
      // Explicit play resumes even while the pointer/focus remains on this control.
      if (!userPaused) { hovering = false; focused = false; }
      updateToggle(); schedule();
    });
    root.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target.closest('input,textarea,select,[contenteditable]')) return;
      event.preventDefault();
      // Focus stays on a stable control, never on a link in a slide becoming inert.
      const button = root.querySelector(event.key === 'ArrowRight' ? '[data-work-next]' : '[data-work-prev]');
      button.focus({ preventScroll: true });
      change(requested + (event.key === 'ArrowRight' ? 1 : -1), true);
    });
    root.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') { hovering = true; schedule(); }
    });
    root.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') { hovering = false; schedule(); }
    });
    root.addEventListener('focusin', event => {
      if (event.target !== toggle) { focused = true; schedule(); }
    });
    root.addEventListener('focusout', event => {
      if (!root.contains(event.relatedTarget)) { focused = false; schedule(); }
    });
    viewport.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button > 0) return;
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
      schedule();
    });
    window.addEventListener('pointerup', event => {
      if (!gesture || event.pointerId !== gesture.id) return;
      const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
      gesture = null;
      if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        suppressClickUntil = performance.now() + 400;
        change(requested + (dx < 0 ? 1 : -1), true);
      } else schedule();
    });
    window.addEventListener('pointercancel', () => { gesture = null; schedule(); });
    viewport.addEventListener('dragstart', event => event.preventDefault());
    viewport.addEventListener('click', event => {
      if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
    }, true);
    document.addEventListener('visibilitychange', schedule);
    window.addEventListener('pagehide', () => { pageActive = false; ++revision; requested = index; stop(); });
    window.addEventListener('pageshow', () => { pageActive = true; hovering = false; focused = false; gesture = null; schedule(); });
    motion.addEventListener('change', () => {
      if (motion.matches) userPaused = true;
      updateToggle(); schedule();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .2;
        schedule();
      }, { threshold: .2 }).observe(root);
    }
    controls.hidden = false;
    root.dataset.activeProject = slides[index].dataset.project;
    updateToggle(); schedule();
  });
})();
