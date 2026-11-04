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
    const eye=hero.querySelector('.oria-eye');
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const slideDelay=3000;
    const closeDelay=180,openDelay=240;
    let blink='idle';
    let index=0,timer=null,visible=true,pageActive=true,remaining=2000,deadline=0;
    const paused=()=>slides.length<2||motion.matches||document.hidden||!visible||!pageActive;
    function stop(){
      if(timer===null)return;
      remaining=Math.max(0,deadline-performance.now());
      clearTimeout(timer);
      timer=null;
    }
    function schedule(){
      const isPaused=paused();
      hero.dataset.effectsPaused=String(isPaused);
      if(isPaused){stop();return;}
      // Repeated observer/lifecycle events must not postpone the next slide.
      if(timer!==null)return;
      deadline=performance.now()+remaining;
      timer=setTimeout(()=>{
        timer=null;
        if(paused()){remaining=0;schedule();return;}
        if(eye&&blink==='idle'){
          blink='closing';
          hero.dataset.blink=blink;
          remaining=closeDelay;
        }else if(eye&&blink==='closing'){
          // Replace both the logo and the copy only while the eyelid is closed.
          show((index+1)%slides.length);
          blink='opening';
          hero.dataset.blink=blink;
          remaining=openDelay;
        }else if(eye){
          blink='idle';
          hero.dataset.blink=blink;
          remaining=slideDelay-closeDelay-openDelay;
        }else{
          show((index+1)%slides.length);
          remaining=slideDelay;
        }
        schedule();
      },remaining);
    }
    function show(next){
      index=next;
      hero.dataset.active=String(index);
      slides.forEach((slide,i)=>{const active=i===index;slide.classList.toggle('is-active',active);slide.inert=!active;slide.setAttribute('aria-hidden',String(!active));});
    }
    function refreshVisibility(){
      const bounds=hero.getBoundingClientRect();
      visible=bounds.bottom>0&&bounds.top<window.innerHeight;
    }
    // The rotating slides contain only copy; hovering or focusing the fixed
    // action links must not freeze the text and the visual indefinitely.
    document.addEventListener('visibilitychange',()=>{
      if(!document.hidden)refreshVisibility();
      schedule();
    });
    window.addEventListener('pagehide',()=>{pageActive=false;schedule();});
    window.addEventListener('pageshow',()=>{
      pageActive=true;
      refreshVisibility();
      schedule();
    });
    motion.addEventListener('change',()=>{
      if(motion.matches&&eye&&blink!=='idle'){
        stop();
        blink='idle';
        hero.dataset.blink=blink;
        remaining=slideDelay;
      }
      schedule();
    });
    if('IntersectionObserver' in window){
      refreshVisibility();
      new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:0}).observe(hero);
    }
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
