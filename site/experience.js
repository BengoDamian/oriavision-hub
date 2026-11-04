(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');
  function closeMenu(){menu?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Abrir menú');}
  menuButton?.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

  const hero=document.querySelector('.signal-hero');
  if(hero){
    const slides=[...hero.querySelectorAll('[data-slide]')];
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const slideDelay=3000;
    const firstDelay=2000;
    let index=0,timer=null,focused=false,hovered=false,visible=true,firstTransition=true;
    function stop(){clearTimeout(timer);timer=null;}
    function schedule(){
      const paused=motion.matches||focused||hovered||document.hidden||!visible;
      hero.dataset.effectsPaused=String(paused);
      stop();
      if(!paused)timer=setTimeout(()=>{
        firstTransition=false;
        show((index+1)%slides.length);
      },firstTransition?firstDelay:slideDelay);
    }
    function show(next){
      index=next;
      hero.dataset.active=String(index);
      slides.forEach((slide,i)=>{const active=i===index;slide.classList.toggle('is-active',active);slide.inert=!active;slide.setAttribute('aria-hidden',String(!active));});
      schedule();
    }
    hero.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;schedule();}});
    hero.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){hovered=false;schedule();}});
    hero.addEventListener('focusin',()=>{focused=true;schedule();});
    hero.addEventListener('focusout',()=>{setTimeout(()=>{focused=hero.contains(document.activeElement);schedule();},0);});
    document.addEventListener('visibilitychange',schedule);
    motion.addEventListener('change',schedule);
    if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.15}).observe(hero);
    schedule();
  }

  const filters=[...document.querySelectorAll('[data-filter]')];
  if(filters.length){
    const projects=[...document.querySelectorAll('.all-projects .project-card')];
    const count=document.querySelector('#project-count');
    const allowed=filters.map(b=>b.dataset.filter);
    function filter(type,update=false){
      type=allowed.includes(type)?type:'all';
      filters.forEach(button=>{const active=button.dataset.filter===type;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
      projects.forEach(card=>card.hidden=type!=='all'&&card.dataset.category!==type);
      const total=projects.filter(p=>!p.hidden).length;
      count.textContent=total+' '+(total===1?'proyecto':'proyectos');
      if(update){const url=new URL(location.href);url.hash='';if(type==='all')url.searchParams.delete('tipo');else url.searchParams.set('tipo',type);history.replaceState(null,'',url);}
    }
    filters.forEach(button=>button.addEventListener('click',()=>filter(button.dataset.filter,true)));
    const target=projects.find(p=>'#'+p.id===location.hash);
    filter(target?'all':new URLSearchParams(location.search).get('tipo'));
    window.addEventListener('hashchange',()=>{const card=projects.find(p=>'#'+p.id===location.hash);if(card){filter('all');card.scrollIntoView();}});
  }
})();
