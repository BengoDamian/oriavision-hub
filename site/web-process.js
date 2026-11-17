(() => {
  const studio = document.querySelector('[data-process-studio]');
  if (!studio) return;
  const phases = ['idea', 'wire', 'design', 'online'];
  const steps = [...studio.querySelectorAll('[data-studio-step]')];
  const captions = [...studio.querySelectorAll('[data-studio-caption]')];
  const boards = [...studio.querySelectorAll('[data-studio-board]')];
  const projects = [...studio.querySelectorAll('[data-studio-project]')];
  const toggle = studio.querySelector('[data-studio-pause]');
  const status = studio.querySelector('[data-studio-status]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const durations = [3000, 4000, 5500, 4500];
  let current = motion.matches ? 2 : 0;
  let currentProject = 0;
  let paused = motion.matches;
  let visible = !('IntersectionObserver' in window);
  let pageActive = true;
  let timer = null;
  let deadline = 0;
  let remaining = durations[current];

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
    toggle.setAttribute('aria-label', paused ? 'Reproducir etapas' : 'Pausar etapas');
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
    remaining = durations[index];
    current = index;
    studio.dataset.phase = phases[index];
    studio.dataset.project = boards[currentProject].dataset.projectId;
    captions.forEach((caption, i) => {
      caption.querySelector('p').textContent = boards[currentProject].dataset[`${phases[i]}Copy`];
      caption.classList.toggle('is-active', i === index);
      caption.setAttribute('aria-hidden', String(i !== index));
      caption.inert = i !== index;
    });
    boards.forEach((board, i) => {
      const selected = i === currentProject;
      board.classList.toggle('is-active', selected);
      board.setAttribute('aria-hidden', String(!selected));
      board.inert = !selected;
      board.querySelectorAll('[data-board-panel]').forEach(panel => {
        const active = selected && panel.dataset.boardPanel.split(' ').includes(phases[index]);
        panel.classList.toggle('is-active', active);
        panel.setAttribute('aria-hidden', String(!active));
        panel.inert = !active;
      });
      board.querySelector('[data-board-caption]').textContent = [
        'Síntesis ilustrativa del contenido.',
        'Esquema ilustrativo del contenido.',
        'Captura real del sitio.',
        `Publicado · ${board.dataset.domain}`
      ][index];
    });
    projects.forEach((button, i) => button.setAttribute('aria-pressed', String(i === currentProject)));
    steps.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    // Restart the progress indicator even when a new project starts on the same stage.
    steps[index].getAnimations().forEach(animation => { animation.currentTime = 0; });
    if (manual) {
      paused = true;
      status.textContent = `${boards[currentProject].dataset.projectName}. Etapa ${index + 1} de 4: ${captions[index].querySelector('h3').textContent.trim()}`;
    } else {
      status.textContent = '';
    }
    sync();
  }

  function selectProject(index) {
    if (index === currentProject) return;
    currentProject = index;
    paused = motion.matches;
    show(0);
    status.textContent = `${boards[index].dataset.projectName}. Etapa 1 de 4: Conocer.${paused ? '' : ' Reproduciendo etapas.'}`;
  }

  projects.forEach((button, index) => {
    button.disabled = false;
    button.addEventListener('click', () => selectProject(index));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % projects.length;
      if (event.key === 'ArrowLeft') next = (index + projects.length - 1) % projects.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = projects.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      projects[next].focus();
      selectProject(next);
    });
  });

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
  function pauseForInteraction() {
    paused = true;
    sync();
  }
  studio.querySelector('.studio-steps').addEventListener('focusin', pauseForInteraction);
  studio.querySelector('.studio-canvas').addEventListener('focusin', pauseForInteraction);
  boards.forEach(board => board.querySelector('a').addEventListener('pointerenter', pauseForInteraction));
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
