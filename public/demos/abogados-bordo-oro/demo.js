// Local interactions only. No API, persistence, analytics or form submissions.
(() => {
  const menu = document.querySelector('.oria-menu');
  const trigger = document.querySelector('.menu-toggle');
  trigger?.addEventListener('click', () => {
    menu.showModal();
    trigger.setAttribute('aria-expanded', 'true');
  });
  menu?.querySelector('.oria-menu-close').addEventListener('click', () => menu.close());
  menu?.addEventListener('close', () => trigger.setAttribute('aria-expanded', 'false'));
  menu?.addEventListener('click', event => { if (event.target === menu) menu.close(); });

  document.querySelectorAll('[data-slot="accordion-trigger"]').forEach(button => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      const group = button.closest('[data-slot="accordion"]');
      group.querySelectorAll('[data-slot="accordion-trigger"]').forEach(other => {
        const expanded = other === button && open;
        other.setAttribute('aria-expanded', String(expanded));
        other.dataset.state = expanded ? 'open' : 'closed';
        const panel = document.getElementById(other.getAttribute('aria-controls'));
        panel.hidden = !expanded;
        panel.dataset.state = expanded ? 'open' : 'closed';
      });
    });
  });

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const posts = [...document.querySelectorAll('.post-card')];
  tabs.forEach((tab, index) => {
    function select() {
      const category = tab.textContent.trim();
      tabs.forEach(other => {
        other.dataset.state = other === tab ? 'active' : 'inactive';
        other.setAttribute('aria-selected', String(other === tab));
        other.tabIndex = other === tab ? 0 : -1;
      });
      // All public posts live in the first panel; filtering never fetches data.
      const panel = document.querySelector('[role="tabpanel"]');
      if (panel) {
        panel.setAttribute('aria-labelledby', tab.id);
        tabs.forEach(t => t.setAttribute('aria-controls', panel.id));
      }
      posts.forEach(post => { post.hidden = category !== 'Todas' && !post.querySelector('.post-category').textContent.startsWith(category); });
    }
    tab.addEventListener('click', select);
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); tabs[next].focus(); tabs[next].click(); }
    });
  });

  const reviewList = document.querySelector('.reviews-list');
  if (reviewList) {
    const reviews = [...reviewList.children];
    const buttons = [...document.querySelectorAll('.review-filters button')];
    const sort = document.querySelector('.review-sort select');
    let rating = 'all';
    const score = review => Number(review.querySelector('.review-stars').getAttribute('aria-label').split(' ')[0]);
    const date = review => review.querySelector('time').dateTime;
    function update() {
      const sorted = reviews.slice().sort((a,b) => {
        const scoreOrder = sort.value === 'highest' ? score(b)-score(a) : sort.value === 'lowest' ? score(a)-score(b) : 0;
        return scoreOrder || date(b).localeCompare(date(a));
      });
      for (const review of sorted) {
        review.hidden = rating !== 'all' && score(review) !== Number(rating);
        reviewList.append(review);
      }
      const count = sorted.filter(r => !r.hidden).length;
      document.querySelector('.review-result-count').textContent = `${count} ${count === 1 ? 'opinión de ejemplo' : 'opiniones de ejemplo'}`;
    }
    buttons.forEach((button,index) => button.addEventListener('click', () => {
      rating = index === 0 ? 'all' : button.textContent.trim().charAt(0);
      buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      update();
    }));
    sort.addEventListener('change', update);
  }

  const bar = document.querySelector('.whatsapp-bar');
  const inline = [...document.querySelectorAll('[data-whatsapp-inline]')];
  function updateBar() {
    if (!bar) return;
    const hidden = menu?.open || inline.some(el => {
      const rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < innerHeight;
    });
    bar.classList.toggle('is-hidden', Boolean(hidden));
    bar.setAttribute('aria-hidden', String(Boolean(hidden)));
    bar.tabIndex = hidden ? -1 : 0;
  }
  new IntersectionObserver(updateBar).observe(document.querySelector('main'));
  inline.forEach(el => new IntersectionObserver(updateBar).observe(el));
  new MutationObserver(updateBar).observe(menu, {attributes:true,attributeFilter:['open']});
  updateBar();

  const viewport = document.querySelector('.reviews-viewport');
  const track = document.querySelector('.reviews-track');
  const group = document.querySelector('.reviews-loop-group');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (viewport && track && group) {
    let animation, visible = false;
    const update = () => {
      animation?.cancel();
      if (!reduced.matches) {
        const width = group.getBoundingClientRect().width;
        animation = track.animate([{transform:'translateX(0)'},{transform:`translateX(-${width}px)`}],{duration:width/26*1000,iterations:Infinity,easing:'linear'});
        if (!visible) animation.pause();
      }
    };
    const resume = () => { if (visible && !document.hidden && !viewport.matches(':hover,:focus-within')) animation?.play(); };
    new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; visible?resume():animation?.pause(); }).observe(viewport);
    new ResizeObserver(update).observe(group);
    viewport.addEventListener('pointerenter', () => animation?.pause());
    viewport.addEventListener('pointerleave', resume);
    viewport.addEventListener('pointerdown', () => animation?.pause(), {passive:true});
    viewport.addEventListener('focusin', event => {
      animation?.pause();
      const slide = event.target.closest('.review-slide');
      if (slide && event.target.matches(':focus-visible') && animation) animation.currentTime=slide.offsetLeft/26*1000;
    });
    viewport.addEventListener('focusout', resume);
    window.addEventListener('pointerup', resume, {passive:true});
    document.addEventListener('visibilitychange', () => document.hidden?animation?.pause():resume());
    reduced.addEventListener('change', update);
  }
  document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => event.preventDefault()));
})();
