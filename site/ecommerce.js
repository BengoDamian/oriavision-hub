(() => {
  const demo = document.querySelector('.commerce-tools-demo');
  if (!demo) return;
  const switcher = demo.querySelector('.commerce-tool-switch');
  const buttons = [...switcher.querySelectorAll('button')];
  const panels = [...demo.querySelectorAll('.commerce-tool-panel')];
  function select(button) {
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    panels.forEach(panel => panel.hidden = panel.id !== button.getAttribute('aria-controls'));
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button)));
  select(buttons[0]);
  switcher.hidden = false;

  // Short entrance animations only: no video download or perpetual distraction.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, {threshold:0.15});
  document.querySelectorAll('[data-commerce-reveal]').forEach(el => observer.observe(el));
})();
