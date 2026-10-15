"use client";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { contactLinks } from "./contact-links";

function WhatsAppMark() {
  return <span className="whatsapp-mark" aria-hidden="true"><MessageCircle size={28} strokeWidth={1.8} /><Phone size={13} strokeWidth={2} /></span>;
}

export function WhatsAppBar() {
  return <aside className="whatsapp-bar" aria-label="Contacto directo">
    <a href={contactLinks.general} target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp, abre en otra pestaña">
      <WhatsAppMark /><span>Consultar por WhatsApp</span><span className="whatsapp-bar-detail">Diseño web · SEO · Marketing digital</span>
    </a>
  </aside>;
}

export function Brand() {
  const filterId=useId();
  return <a href="/" className="brand" aria-label="ORIAVISIÓN, inicio"><svg className="brand-logo" viewBox="185 215 1208 255" aria-hidden="true"><defs><filter id={filterId} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1 -1 -1 0 2.75" /></filter></defs><image href="/images/oriavision-logo-original.jpg" width="1536" height="699" filter={`url(#${filterId})`} /></svg></a>;
}
export function Header() {
  const pathname=usePathname() ?? "";const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const overHero=pathname==="/"||pathname.startsWith("/diseno-web");
  useEffect(()=>{const update=()=>setScrolled(window.scrollY>24);update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update)},[]);
  useEffect(()=>{setOpen(false)},[pathname]);
  useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close)},[]);
  return <header className={`site-header${overHero?" header-over-hero":""}${scrolled||open?" header-solid":""}`}><div className="container header-inner"><Brand /><button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open?"Cerrar menú":"Abrir menú"} onClick={()=>setOpen(!open)}>{open?<X size={25}/>:<Menu size={25}/>}</button><nav id="main-navigation" aria-label="Navegación principal" className={`main-nav${open?" is-open":""}`}><a href="/diseno-web" aria-current={pathname.startsWith("/diseno-web")?"page":undefined} onClick={()=>setOpen(false)}>Diseño web</a><a href="/seo" aria-current={pathname.startsWith("/seo")?"page":undefined} onClick={()=>setOpen(false)}>SEO</a><a href="/marketing-digital" aria-current={pathname.startsWith("/marketing-digital")?"page":undefined} onClick={()=>setOpen(false)}>Marketing</a><a href="/trabajos-realizados" aria-current={pathname.startsWith("/trabajos-realizados")?"page":undefined} onClick={()=>setOpen(false)}>Trabajos</a><a href="/proyectos" aria-current={pathname.startsWith("/proyectos")?"page":undefined} onClick={()=>setOpen(false)}>Diseños para tu web</a><a href="/guias/" aria-current={pathname.startsWith("/guias")?"page":undefined} onClick={()=>setOpen(false)}>Guías</a><a className="nav-contact" href="/#contacto" onClick={()=>setOpen(false)}>Hablemos de tu proyecto</a></nav></div></header>;
}
export function Contact(){return <section className="contact-section section-pad" id="contacto"><div className="container contact-layout"><div><p className="eyebrow">Tu próximo paso</p><h2>Hablemos<br/>de tu <span>proyecto.</span></h2></div><div className="contact-copy"><p>Contanos qué hacés, si ya tenés una web y qué te gustaría mejorar. Con esa información podemos definir una propuesta y su alcance.</p><a className="button button-dark whatsapp-button" href={contactLinks.general} target="_blank" rel="noopener noreferrer"><WhatsAppMark/>Consultar por WhatsApp</a><p className="contact-note">Diseño web · SEO orgánico · Marketing digital · Meta Ads · Google Ads.</p></div></div></section>}
export function Footer(){return <footer className="site-footer"><div className="container footer-main"><Brand/><p>Diseño web y posicionamiento SEO<br/>para comercios y profesionales.</p><div className="footer-links"><a href="/diseno-web">Diseño web</a><a href="/seo">SEO</a><a href="/marketing-digital">Marketing</a><a href="/meta-ads">Meta Ads</a><a href="/google-ads">Google Ads</a><a href="/trabajos-realizados">Trabajos</a><a href="/proyectos">Diseños para tu web</a><a href="/#contacto">Contacto</a></div></div><nav className="container footer-resources" aria-label="Recursos y legales"><a href="/guias/">Guías</a><a href="/prompts/">Prompts</a><a href="/inbox/">Inbox</a><a href="/legal/privacidad/">Privacidad</a><a href="/legal/terminos/">Términos</a></nav><div className="container footer-bottom"><span>© {new Date().getFullYear()} ORIAVISIÓN</span><span>Buenos Aires, Argentina</span></div></footer>}
