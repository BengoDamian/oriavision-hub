(() => {
  const cards = document.querySelectorAll('[data-process-step]');
  // The diagrams and their text remain complete without JavaScript or motion.
  if (!cards.length || !('IntersectionObserver' in window) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.intersectionRatio < .25) return;
      entry.target.classList.add('is-in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: .25 });
  cards.forEach(card => observer.observe(card));
})();
