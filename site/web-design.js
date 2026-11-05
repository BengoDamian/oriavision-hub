(() => {
  const page = document.querySelector('.web-design-page');
  if (!page) return;

  // Enhance the static project links. Without JS, every example stays available.
  page.querySelectorAll('[data-web-switcher]').forEach(group => {
    const controls = group.querySelector('[data-web-controls]');
    const buttons = [...group.querySelectorAll('[data-web-target]')];
    const panels = [...group.querySelectorAll('[data-web-panel]')];
    const status = group.querySelector('[data-web-status]');
    if (!controls || !buttons.length || buttons.length !== panels.length) return;
    if (buttons.some(button => !panels.some(panel => panel.id === button.dataset.webTarget))) return;

    function select(id, announce = false) {
      const selected = panels.find(panel => panel.id === id);
      if (!selected) return;
      panels.forEach(panel => { panel.hidden = panel !== selected; });
      buttons.forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.webTarget === id));
      });
      if (announce && status) status.textContent = selected.getAttribute('aria-label');
    }
    buttons.forEach(button => {
      button.addEventListener('click', () => select(button.dataset.webTarget, true));
    });
    const selectFromHash = () => {
      const id = location.hash.slice(1);
      if (panels.some(panel => panel.id === id)) {
        select(id);
        // An incoming link may target an example previously hidden by the switcher.
        document.getElementById(id).scrollIntoView({ behavior: 'instant', block: 'nearest' });
      }
    };
    select(panels.some(panel => '#' + panel.id === location.hash) ? location.hash.slice(1) : panels[0].id);
    controls.setAttribute('role', 'group');
    controls.hidden = false;
    group.classList.add('is-enhanced');
    window.addEventListener('hashchange', selectFromHash);
  });

  // One entrance per section, with no scroll interception or hidden fallback content.
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!motion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    page.querySelectorAll('.web-reveal').forEach(element => observer.observe(element));
  }
})();
