(() => {
  'use strict';
  const header = document.querySelector('.header');
  const sticky = document.querySelector('.sticky-contact');
  const heroWhatsApp = document.querySelector('[data-hero-whatsapp]');
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.mobile-menu');
  const setMenu = (open) => {
    menuButton?.setAttribute('aria-expanded', String(open));
    menu?.classList.toggle('is-open', open);
    if(menu) menu.inert = !open;
    document.body.classList.toggle('locked', open);
    if(open) menu.querySelector('a')?.focus();
    else menuButton?.focus({preventScroll:true});
  };
  if(menu) menu.inert = true;
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('keydown', (e) => {
    if(e.key === 'Tab') {
      const items = [menuButton, ...menu.querySelectorAll('a')];
      if(e.shiftKey && document.activeElement === menuButton) {e.preventDefault();items.at(-1).focus();}
      else if(!e.shiftKey && document.activeElement === items.at(-1)) {e.preventDefault();menuButton.focus();}
    }
  });
  menuButton?.addEventListener('keydown',(e)=>{
    if(e.key==='Tab' && e.shiftKey && menuButton.getAttribute('aria-expanded')==='true'){
      e.preventDefault();menu.querySelector('a:last-of-type')?.focus();
    }
  });
  document.addEventListener('keydown', e => {if(e.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') setMenu(false);});
  let ticking = false;
  const onScroll = () => {
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header?.classList.toggle('is-fixed', window.scrollY > 160);
      const hero = document.querySelector('.hero, .contact-hero, .projects-intro');
      const headerBottom = header?.classList.contains('is-fixed') ? header.getBoundingClientRect().bottom : 0;
      const showContact = heroWhatsApp
        ? window.scrollY > 0 && heroWhatsApp.getBoundingClientRect().bottom <= headerBottom
        : window.scrollY > (hero?.offsetHeight || 650) * .78;
      if(sticky){sticky.classList.toggle('show', showContact);sticky.inert=!showContact;}
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  window.addEventListener('resize',onScroll,{passive:true});
  window.addEventListener('pageshow',onScroll);
  const whatsappDialog=document.querySelector('#whatsapp-dialog');
  document.querySelector('[data-whatsapp-pending]')?.addEventListener('click',()=>{
    if(!whatsappDialog)return;
    whatsappDialog.showModal();document.body.classList.add('locked');
  });
  whatsappDialog?.addEventListener('close',()=>{
    document.body.classList.remove('locked');sticky?.focus({preventScroll:true});
  });
  whatsappDialog?.addEventListener('click',event=>{
    if(event.target!==whatsappDialog)return;
    const box=whatsappDialog.getBoundingClientRect();
    if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)whatsappDialog.close();
  });
  const mobileMedia = matchMedia('(max-width:760px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const bg = document.querySelector('[data-background-video]');
  let inView = true;
  const motionPaused = () => reduce.matches;
  const loadVideo = () => {
    if(!bg) return;
    const next = mobileMedia.matches ? '/demos/ondara-terra/assets/piscina-mobile.mp4' : '/demos/ondara-terra/assets/piscina-desktop.mp4';
    bg.poster = mobileMedia.matches ? '/demos/ondara-terra/assets/piscina-poster-mobile.jpg' : '/demos/ondara-terra/assets/piscina-poster.jpg';
    if(bg.getAttribute('src') !== next) {bg.src = next;bg.load();}
    bg.muted = true;
  };
  const playBg = () => {
    if(!bg || !bg.getAttribute('src') || motionPaused() || !inView || document.hidden || document.querySelector('dialog[open]')) return;
    bg.play().catch(() => {});
  };
  const syncMotion = () => {
    const paused = motionPaused();
    document.documentElement.dataset.motion = paused ? 'paused' : 'running';
    if(paused) bg?.pause();
    else if(bg && !navigator.connection?.saveData) {loadVideo();playBg();}
    document.dispatchEvent(new CustomEvent('pool:motionchange', {detail:{paused}}));
  };
  reduce.addEventListener('change', syncMotion);
  if(bg) {
    bg.addEventListener('playing', () => bg.classList.add('is-playing'));
    bg.addEventListener('error', () => bg.classList.remove('is-playing'));
    if('IntersectionObserver' in window) new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if(inView) playBg(); else bg.pause();
    },{threshold:.05}).observe(bg.closest('.hero'));
    document.addEventListener('visibilitychange', () => document.hidden ? bg.pause() : playBg());
    mobileMedia.addEventListener('change', () => {
      if(bg.getAttribute('src') && !motionPaused()) {loadVideo();playBg();}
    });
  }
  syncMotion();
  const dialog = document.querySelector('#media-dialog');
  let lastFocus = null, bgWasPlaying = false;
  const closeDialog = () => {
    if(!dialog?.open) return;
    dialog.querySelector('video')?.pause(); dialog.close();
    dialog.querySelector('.dialog-media').replaceChildren();
    dialog.classList.remove('is-film');
    document.body.classList.remove('locked');
    if(bgWasPlaying) playBg();
    lastFocus?.focus({preventScroll:true});
  };
  document.querySelectorAll('[data-lightbox], [data-open-film]').forEach(trigger => trigger.addEventListener('click', () => {
    if(!dialog) return;
    lastFocus = trigger; bgWasPlaying = !!bg && !bg.paused;bg?.pause();
    const holder = dialog.querySelector('.dialog-media'); holder.replaceChildren();
    dialog.classList.toggle('is-film', trigger.hasAttribute('data-open-film'));
    let media;
    if(trigger.hasAttribute('data-open-film')) {
      media = document.createElement('video');
      media.src = '/demos/ondara-terra/assets/piscina-mobile.mp4';media.controls=true;media.muted=true;media.playsInline=true;
      media.poster='/demos/ondara-terra/assets/piscina-poster-mobile.jpg';media.setAttribute('aria-label','Recorrido por la piscina con cascada');
    } else {
      media = document.createElement('img');media.src=trigger.dataset.lightbox;media.alt=trigger.querySelector('img')?.alt || '';
    }
    holder.append(media);
    dialog.querySelector('.dialog-caption').textContent=trigger.dataset.caption || 'El agua, el paisaje y tu manera de disfrutar.';
    dialog.showModal();document.body.classList.add('locked');dialog.querySelector('.dialog-close').focus();
    dialog.scrollTop=0;
    if(media.tagName==='VIDEO')media.play().catch(()=>{});
  }));
  dialog?.querySelector('.dialog-close').addEventListener('click',closeDialog);
  dialog?.addEventListener('cancel',e=>{e.preventDefault();closeDialog();});
  dialog?.addEventListener('click',e=>{if(e.target===dialog || e.target.classList.contains('dialog-body'))closeDialog();});
  const gallery = document.querySelector('.gallery');
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const filter = button.dataset.filter;let count=0;
    gallery?.classList.toggle('filtered',filter!=='all');
    document.querySelectorAll('.gallery figure').forEach(item=>{item.hidden=filter!=='all' && !item.dataset.category.split(' ').includes(filter);if(!item.hidden) count++;});
    const status=document.querySelector('#gallery-status');if(status)status.textContent=`${count} imágenes en esta selección`;
  }));
  mobileMedia.addEventListener('change',()=>{if(!mobileMedia.matches && menu?.classList.contains('is-open')) setMenu(false);});
})();
