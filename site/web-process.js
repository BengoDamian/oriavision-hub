(() => {
  const studio = document.querySelector('[data-process-studio]');
  if (!studio) return;
  const phases = ['idea', 'wire', 'design', 'online'];
  const steps = [...studio.querySelectorAll('[data-studio-step]')];
  const captions = [...studio.querySelectorAll('[data-studio-caption]')];
  const toggle = studio.querySelector('[data-studio-pause]');
  const status = studio.querySelector('[data-studio-status]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 6500;
  let current = motion.matches ? 2 : 0;
  let paused = motion.matches;
  let visible = !('IntersectionObserver' in window);
  let pageActive = true;
  let timer = null;
  let deadline = 0;
  let remaining = duration;

  function stop() {
    if (timer !== null) {
      clearTimeout(timer);
      remaining = Math.max(0, deadline - performance.now());
      timer = null;
    }
  }

  function sync() {
    const running = !paused && visible && pageActive && !document.hidden;
    studio.classList.toggle('is-running', running);
    toggle.setAttribute('aria-label', paused ? 'Reproducir animación' : 'Pausar animación');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.querySelector('[data-studio-play-icon]').toggleAttribute('hidden', !paused);
    toggle.querySelector('[data-studio-pause-icon]').toggleAttribute('hidden', paused);
    if (!running) {
      stop();
    } else if (timer === null) {
      deadline = performance.now() + remaining;
      timer = setTimeout(() => {
        timer = null;
        show((current + 1) % phases.length);
      }, remaining);
    }
  }

  function show(index, manual = false) {
    stop();
    remaining = duration;
    current = index;
    studio.dataset.phase = phases[index];
    captions.forEach((caption, i) => {
      caption.classList.toggle('is-active', i === index);
      caption.setAttribute('aria-hidden', String(i !== index));
      caption.inert = i !== index;
    });
    steps.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    if (manual) {
      paused = true;
      status.textContent = `Etapa ${index + 1} de 4: ${captions[index].querySelector('h3').textContent.trim()}`;
    }
    sync();
  }

  steps.forEach((button, index) => {
    button.disabled = false;
    button.addEventListener('click', () => show(index, true));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % steps.length;
      if (event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = steps.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      steps[next].focus();
      show(next, true);
    });
  });
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    paused = !paused;
    sync();
  });
  studio.querySelector('.studio-steps').addEventListener('focusin', () => {
    paused = true;
    sync();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .25;
      sync();
    }, { threshold: [0, .25] });
    observer.observe(studio.querySelector('.studio-canvas'));
  }
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => { pageActive = false; sync(); });
  window.addEventListener('pageshow', () => { pageActive = true; sync(); });
  motion.addEventListener('change', () => {
    paused = true;
    sync();
  });
  studio.classList.add('studio-ready');
  show(current);
})();
