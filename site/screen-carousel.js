(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const returnKey = 'oria:mockup-return';
  const params = new URLSearchParams(location.search);
  const requestedProject = params.get('volver');
  const savedReturn = (() => {
    try {
      const value = JSON.parse(sessionStorage.getItem(returnKey));
      return value && Date.now() - value.savedAt < 30 * 60 * 1000 ? value : null;
    } catch { return null; }
  })();
  const navigation = performance.getEntriesByType('navigation')[0];
  const returningFromProject = document.referrer.startsWith(location.origin + '/trabajos/');
  const restoreSaved = navigation?.type === 'back_forward' || returningFromProject;

  document.querySelectorAll('[data-screen-carousel]').forEach(screen => {
    const captures = [...screen.querySelectorAll('.screen-captures > img')];
    const name = screen.querySelector('[data-screen-name]');
    const family = screen.dataset.screenCarousel;
    if (captures.length < 2) return;

    let index = 0;
    let timer;
    let visible = !('IntersectionObserver' in window);
    let hovered = false;
    let keyboardFocused = false;
    let pointerHeld = false;
    let initializing = true;
    let revision = 0;
    let interactionVersion = 0;
    const failed = new Set();
    const pending = new Map();
    const paused = () => initializing || !visible || document.hidden || motion.matches || hovered || keyboardFocused || pointerHeld;

    function prepare(image) {
      if (!pending.has(image)) {
        if (image.dataset.src) {
          image.src = image.dataset.src;
          delete image.dataset.src;
        }
        pending.set(image, image.decode().then(() => true).catch(() => {
          failed.add(image);
          return false;
        }));
      }
      return pending.get(image);
    }

    function show(next) {
      index = next;
      captures.forEach((image, i) => image.classList.toggle('is-active', i === index));
      const current = captures[index];
      name.textContent = current.dataset.project;
      screen.href = current.dataset.projectUrl;
      screen.setAttribute('aria-label', 'Conocer el proyecto ' + current.dataset.project);
    }

    function stop() {
      clearTimeout(timer);
      ++revision;
    }

    function schedule() {
      stop();
      const run = revision;
      screen.dataset.rotationPaused = String(paused());
      if (paused()) return;
      let next = (index + 1) % captures.length;
      while (next !== index && failed.has(captures[next])) next = (next + 1) % captures.length;
      if (next === index) return;
      const ready = prepare(captures[next]);
      timer = setTimeout(async () => {
        const loaded = await ready;
        if (run !== revision || paused()) return;
        if (loaded) show(next);
        schedule();
      }, 5200);
    }

    function updateKeyboardFocus() {
      keyboardFocused = document.activeElement === screen && screen.matches(':focus-visible');
      schedule();
    }
    screen.addEventListener('focusin', () => queueMicrotask(updateKeyboardFocus));
    screen.addEventListener('focusout', () => queueMicrotask(updateKeyboardFocus));
    screen.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') { hovered = true; schedule(); }
    });
    screen.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') { hovered = false; schedule(); }
    });
    screen.addEventListener('pointerdown', () => {
      // Freeze the visible project for the whole tap, including a pending decode.
      pointerHeld = true;
      ++interactionVersion;
      keyboardFocused = false;
      schedule();
    });
    function releasePointer() {
      if (pointerHeld) { pointerHeld = false; schedule(); }
    }
    window.addEventListener('pointerup', releasePointer);
    window.addEventListener('pointercancel', releasePointer);
    screen.addEventListener('keydown', event => {
      if (event.key === 'Enter') ++interactionVersion;
    });
    screen.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      try {
        sessionStorage.setItem(returnKey, JSON.stringify({family, project: captures[index].dataset.projectId, savedAt: Date.now()}));
      } catch { /* Links and rotation still work when storage is unavailable. */ }
    });
    window.addEventListener('pagehide', stop);
    window.addEventListener('pageshow', () => {
      // BFCache can restore a touch-focused link or stale hover state.
      hovered = false;
      keyboardFocused = false;
      pointerHeld = false;
      schedule();
    });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) { hovered = false; keyboardFocused = false; pointerHeld = false; }
      schedule();
    });
    motion.addEventListener('change', schedule);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.25;
        schedule();
      }, { threshold: 0.25 }).observe(screen);
    }

    async function initialize() {
      const wanted = requestedProject || (restoreSaved && savedReturn?.family === family ? savedReturn.project : null);
      const restoredIndex = captures.findIndex(image => image.dataset.projectId === wanted);
      const initialInteraction = interactionVersion;
      const restored = restoredIndex >= 0 && await prepare(captures[restoredIndex]) && initialInteraction === interactionVersion;
      if (restored) show(restoredIndex);
      else show(0);
      if (restored) {
        try { sessionStorage.removeItem(returnKey); } catch { /* Optional return state. */ }
        if (requestedProject) {
          const url = new URL(location.href);
          url.searchParams.delete('volver');
          history.replaceState(history.state, '', url);
        }
      }
      initializing = false;
      schedule();
    }
    initialize();
  });
})();
