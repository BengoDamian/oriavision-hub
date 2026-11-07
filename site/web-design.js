(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');
  const closeMenu = () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
  };
  menuButton?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.web-design-page .signal-hero');
  if (hero) {
    const slides = [...hero.querySelectorAll('[data-slide]')];
    const choices = [...hero.querySelectorAll('[data-hero-select]')];
    const pause = hero.querySelector('[data-hero-pause]');
    let index = 0, timer = null, visible = true, pageActive = true;
    let manualPause = false, remaining = 2000, deadline = 0;
    const paused = () => manualPause || motion.matches || document.hidden || !visible || !pageActive;
    function stop() {
      if (timer === null) return;
      remaining = Math.max(0, deadline - performance.now());
      clearTimeout(timer);
      timer = null;
    }
    function show(next) {
      index = next;
      hero.dataset.active = String(index);
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        slide.inert = !active;
        slide.setAttribute('aria-hidden', String(!active));
      });
      choices.forEach((choice, i) => choice.setAttribute('aria-pressed', String(i === index)));
    }
    function schedule() {
      hero.dataset.effectsPaused = String(paused());
      if (paused()) { stop(); return; }
      if (timer !== null) return;
      deadline = performance.now() + remaining;
      timer = setTimeout(() => {
        timer = null;
        if (paused()) { remaining = 0; schedule(); return; }
        show((index + 1) % slides.length);
        remaining = 3000;
        schedule();
      }, remaining);
    }
    function updatePause() {
      const isPaused = manualPause || motion.matches;
      pause.hidden = motion.matches;
      pause.setAttribute('aria-pressed', String(isPaused));
      pause.querySelector('[data-pause-label]').textContent = isPaused ? 'Reanudar' : 'Pausar';
      pause.setAttribute('aria-label', isPaused ? 'Reanudar el semáforo' : 'Pausar el semáforo');
      schedule();
    }
    choices.forEach((choice, i) => choice.addEventListener('click', () => {
      stop();
      show(i);
      manualPause = true;
      remaining = 3000;
      updatePause();
    }));
    pause.addEventListener('click', () => { manualPause = !manualPause; updatePause(); });
    const refreshVisibility = () => {
      const bounds = hero.getBoundingClientRect();
      visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
    };
    document.addEventListener('visibilitychange', () => { refreshVisibility(); schedule(); });
    window.addEventListener('pagehide', () => { pageActive = false; schedule(); });
    window.addEventListener('pageshow', () => { pageActive = true; refreshVisibility(); schedule(); });
    motion.addEventListener('change', updatePause);
    if ('IntersectionObserver' in window) {
      refreshVisibility();
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(hero);
    }
    updatePause();
  }

  const video = document.querySelector('[data-web-film]');
  const videoButton = document.querySelector('[data-film-control]');
  if (video && videoButton) {
    let visible = false, loaded = false, userPaused = false, userStarted = false;
    let pageActive = true, revision = 0;
    video.muted = true;
    const shouldPlay = () => visible && !document.hidden && pageActive && !userPaused && (!motion.matches || userStarted);
    const updateLabel = () => {
      videoButton.textContent = video.paused ? 'Reproducir animación' : 'Pausar animación';
      videoButton.setAttribute('aria-pressed', String(!video.paused));
    };
    function sync() {
      const run = ++revision;
      if (!shouldPlay()) { video.pause(); updateLabel(); return; }
      if (!loaded) {
        video.src = video.dataset.src;
        loaded = true;
        video.load();
      }
      const attempt = video.play();
      if (attempt) attempt.then(() => {
        if (run !== revision && !shouldPlay()) video.pause();
        updateLabel();
      }).catch(updateLabel);
    }
    videoButton.addEventListener('click', () => {
      userPaused = !video.paused;
      if (!userPaused) userStarted = true;
      sync();
    });
    video.addEventListener('play', updateLabel);
    video.addEventListener('pause', updateLabel);
    video.addEventListener('error', () => {
      videoButton.textContent = 'Volver a cargar la animación';
      loaded = false;
    });
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pagehide', () => { pageActive = false; sync(); });
    window.addEventListener('pageshow', () => { pageActive = true; sync(); });
    motion.addEventListener('change', () => { userStarted = false; sync(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: .15 }).observe(video);
    } else { visible = true; sync(); }
  }
})();
