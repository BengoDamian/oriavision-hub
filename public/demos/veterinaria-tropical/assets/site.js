(() => {
  const menu = document.querySelector('#mobile-menu');
  const menuButton = document.querySelector('.menu-toggle');
  const closeMenu = () => { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); };
  menuButton.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); });
  document.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('.site-header')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); } });
  matchMedia('(min-width:1051px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  const hero = document.querySelector('#hero');
  const bar = document.querySelector('#whatsapp-bar');
  const updateBar = () => { const visible = hero.getBoundingClientRect().bottom <= 0; bar.classList.toggle('visible', visible); bar.inert = !visible; bar.setAttribute('aria-hidden', String(!visible)); };
  if ('IntersectionObserver' in window) new IntersectionObserver(updateBar, { threshold: [0, 0.01] }).observe(hero);
  else window.addEventListener('scroll', updateBar, { passive: true });
  window.addEventListener('pageshow', updateBar);
  window.addEventListener('resize', updateBar, { passive: true });
  updateBar();

  const agenda = document.querySelector('#agenda-demo');
  if (agenda) {
    const form = agenda.querySelector('form');
    const date = form.elements.date;
    const now = new Date();
    date.min = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
    let opener;
    document.querySelectorAll('a[href="#agenda-demo"]').forEach(a => {
      a.removeAttribute('target');
      a.setAttribute('aria-haspopup','dialog');
      a.addEventListener('click', e => { e.preventDefault(); opener=a; agenda.showModal(); });
    });
    const close = () => agenda.close();
    agenda.querySelector('.dialog-close').addEventListener('click',close);
    agenda.addEventListener('close',()=>opener?.focus());
    agenda.addEventListener('click',e=>{if(e.target===agenda){const r=agenda.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (date.value < date.min) { date.setCustomValidity('Elegí una fecha de hoy en adelante.'); date.reportValidity(); return; }
      const d=new FormData(form);
      const message='Hola, ORIAVISION. Quiero consultar por una web como Clínica Veterinaria, variante Tropical. Vi este diseño: https://www.oriavision.com.ar/demos/veterinaria-tropical/. Simulación de agenda (no es una reserva real): '+d.get('service')+', '+d.get('date')+', '+d.get('time')+'.';
      window.open('https://wa.me/5491127575675?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
    });
    date.addEventListener('input',()=>date.setCustomValidity(''));
  }

  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.slide')];
  const dots = [...carousel.querySelectorAll('[data-goto]')];
  const pause = carousel.querySelector('.carousel-pause');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer, transitionTimer, paused = motion.matches, hovered = false, focused = false, inView = true;
  const updatePauseUI = () => {
    pause.setAttribute('aria-label', paused ? 'Reproducir carrusel' : 'Pausar carrusel');
    pause.setAttribute('aria-pressed', String(paused));
    pause.innerHTML = paused ? '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m8 4 12 8-12 8Z"/></svg>' : '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
  };
  function schedule() {
    clearTimeout(timer);
    const stopped = paused || hovered || focused || !inView || document.hidden;
    carousel.classList.toggle('is-paused', stopped);
    if (!stopped) timer = setTimeout(() => goTo(current + 1), 7000);
  }
  function goTo(index) {
    const next = (index + slides.length) % slides.length;
    if (next === current) { schedule(); return; }
    clearTimeout(transitionTimer);
    slides.forEach(s => s.classList.remove('leaving'));
    const previous = slides[current];
    previous.classList.add('leaving');
    previous.classList.remove('active');
    previous.inert = true;
    previous.setAttribute('aria-hidden', 'true');
    slides[next].classList.add('active');
    slides[next].inert = false;
    slides[next].setAttribute('aria-hidden', 'false');
    dots.forEach((dot, i) => { dot.classList.toggle('selected', i === next); dot.setAttribute('aria-pressed', String(i === next)); });
    current = next;
    transitionTimer = setTimeout(() => slides.forEach(s => s.classList.remove('leaving')), motion.matches ? 0 : 1600);
    schedule();
  }
  dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.goto))));
  pause.addEventListener('click', () => { paused = !paused; updatePauseUI(); schedule(); });
  carousel.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hovered = true; schedule(); } });
  carousel.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', () => { setTimeout(() => { focused = carousel.contains(document.activeElement); schedule(); }, 0); });
  carousel.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); goTo(current + (e.key === 'ArrowRight' ? 1 : -1)); } });
  let touch;
  carousel.addEventListener('touchstart', e => { if (!e.target.closest('button,a')) touch = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }; }, { passive: true });
  carousel.addEventListener('touchend', e => { if (!touch) return; const dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y; if (Math.abs(dx) > 60 && Math.abs(dy) < 65) goTo(current + (dx < 0 ? 1 : -1)); touch = null; }, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', e => { if (e.matches) paused = true; updatePauseUI(); schedule(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, { threshold: 0 }).observe(carousel);
  updatePauseUI(); schedule();
})();
