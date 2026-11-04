(() => {
  let fromHome = false;
  try {
    const previous = new URL(document.referrer);
    fromHome = previous.origin === location.origin && previous.pathname === '/';
  } catch { /* Direct visits use the explicit return link. */ }
  document.querySelectorAll('.project-return').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (fromHome && history.length > 1) {
        event.preventDefault();
        history.back();
      }
    });
  });
})();
