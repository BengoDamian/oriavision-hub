(() => {
  const player = document.querySelector('[data-process-player]');
  if (!player) return;
  const phases = ['idea', 'wire', 'design', 'online'];
  const durations = [5200, 5200, 5600, 5400];
  const steps = [...player.querySelectorAll('[data-process-step]')];
  const descriptions = [...player.querySelectorAll('[data-process-description]')];
  const playback = player.querySelector('[data-process-playback]');
  const label = player.querySelector('[data-process-play-label]');
  const playIcon = player.querySelector('[data-process-play-icon]');
  const pauseIcon = player.querySelector('[data-process-pause-icon]');
  const announcement = player.querySelector('[data-process-announcement]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = motion.matches ? 3 : 0;
  let paused = motion.matches;
  let visible = !('IntersectionObserver' in window);
  let pageActive = true;
  let timer = null;
  let deadline = 0;
  let remaining = durations[current];

  function stop() {
    if (timer === null) return;
    clearTimeout(timer);
    timer = null;
    remaining = Math.max(0, deadline - performance.now());
  }

  function sync() {
    const running = !paused && visible && pageActive && !document.hidden;
    player.classList.toggle('is-running', running);
    label.textContent = paused ? 'Reproducir recorrido' : 'Pausar recorrido';
    playback.setAttribute('aria-pressed', String(paused));
    playIcon.toggleAttribute('hidden', !paused);
    pauseIcon.toggleAttribute('hidden', paused);
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
    current = index;
    remaining = durations[index];
    if (manual) paused = true;
    player.dataset.phase = phases[index];
    player.dataset.manual = String(manual || motion.matches);
    player.style.setProperty('--process-duration', `${remaining}ms`);
    steps.forEach((step, i) => step.setAttribute('aria-pressed', String(i === index)));
    descriptions.forEach((description, i) => {
      const active = i === index;
      description.classList.toggle('is-active', active);
      description.setAttribute('aria-hidden', String(!active));
      description.inert = !active;
    });
    // A replay starts the drawing and its progress line together.
    player.getAnimations({ subtree: true }).forEach(animation => {
      if (animation.animationName) animation.currentTime = 0;
    });
    announcement.textContent = manual
      ? `Paso ${index + 1} de 4. ${steps[index].querySelector('strong').textContent}. ${descriptions[index].textContent}`
      : '';
    sync();
  }

  steps.forEach((step, index) => {
    step.disabled = false;
    step.addEventListener('click', () => show(index, true));
    step.addEventListener('keydown', event => {
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
  player.querySelector('.process-timeline').addEventListener('focusin', () => {
    paused = true;
    sync();
  });
  playback.hidden = false;
  playback.addEventListener('click', () => {
    paused = !paused;
    if (!paused && player.dataset.manual === 'true') show(current);
    else sync();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .3;
      sync();
    }, { threshold: [0, .3] });
    observer.observe(player.querySelector('.process-scene'));
  }
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => { pageActive = false; sync(); });
  window.addEventListener('pageshow', () => { pageActive = true; sync(); });
  motion.addEventListener('change', () => {
    paused = true;
    show(current, true);
  });
  player.classList.add('process-enhanced');
  show(current);
})();
