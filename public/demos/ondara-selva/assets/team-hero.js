/* Begin the approach only when the selected responsive photograph is decoded
   and on screen. Re-entering the hero offers another short approach. */
(() => {
  const hero = document.querySelector('.team-hero');
  const photo = hero?.querySelector('.hero-media img');
  if (!photo) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let ready = false, visible = !('IntersectionObserver' in window), loadId = 0;
  const sync = () => hero.classList.toggle('is-approaching', ready && visible && !reduced.matches && !document.hidden);
  const onLoad = async () => {
    const currentLoad = ++loadId;
    ready = false;
    sync();
    try { await photo.decode(); } catch { /* Keep the loaded photograph usable. */ }
    if (currentLoad !== loadId || !photo.naturalWidth) return;
    ready = true;
    requestAnimationFrame(() => requestAnimationFrame(sync));
  };
  photo.addEventListener('load', onLoad);
  photo.addEventListener('error', () => { ++loadId; ready = false; sync(); });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      const entry = entries[0];
      if (!entry.isIntersecting) visible = false;
      else if (entry.intersectionRatio >= .3) visible = true;
      sync();
    }, {threshold:[0,.3]}).observe(hero);
  }
  if (photo.complete && photo.naturalWidth) onLoad();
})();
