const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu?.setAttribute('aria-expanded','false');nav?.classList.remove('open')}});
const slides=[...document.querySelectorAll('.slide')];let current=0;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
if(slides.length>1)setInterval(()=>{if(document.hidden||reduced.matches||document.querySelector('.hero')?.contains(document.activeElement))return;slides[current].classList.remove('active');slides[current].setAttribute('aria-hidden','true');current=(current+1)%slides.length;slides[current].classList.add('active');slides[current].setAttribute('aria-hidden','false')},7500);
const bar=document.querySelector('.whatsapp-bar'),anchor=document.querySelector('.hero-actions')||document.querySelector('.detail-copy .btn')||document.querySelector('.page-heading');
if(bar&&anchor)new IntersectionObserver(entries=>{const e=entries[0],visible=!e.isIntersecting&&e.boundingClientRect.bottom<0;bar.classList.toggle('visible',visible);bar.setAttribute('aria-hidden',String(!visible));bar.tabIndex=visible?0:-1},{threshold:0}).observe(anchor);
