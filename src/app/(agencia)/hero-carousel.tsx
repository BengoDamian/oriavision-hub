"use client";

import { useEffect, useRef, useState } from "react";
import { completedWorks } from "./catalog-data";
import { projectCollections } from "./project-collections";

type CarouselSite = { title: string; image: string; href: string; kind: string; position?: string };

const work = (title: string, position?: string): CarouselSite => {
  const entry = completedWorks.find(item => item.title === title)!;
  return { ...entry, kind: "Trabajo realizado", position };
};
const sample = (id: string, title?: string): CarouselSite => {
  const collection = projectCollections.find(item => item.id === id)!;
  const variant = collection.variants.find(item => item.name === collection.initialVariant) || collection.variants[0];
  return { title: title || collection.title, image: variant.image, href: variant.href, kind: "Diseño de muestra", position: "center 34%" };
};

const sites: CarouselSite[] = [
  work("Edgardo A. Díaz", "center 63%"),
  sample("clinica-veterinaria"),
  work("Bot de Telegram", "center 38%"),
  sample("buen-rato"),
  work("Calculadora ML", "center 40%"),
  sample("estudio-juridico", "Martín Fiotto"),
  sample("ink-house"),
  sample("aluna"),
];

export function HeroCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const pointerDown = useRef(false);
  const resumeAt = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Native swiping and its momentum get time to settle, then autoplay resumes.
    // Listen on window so lifting a finger outside the strip cannot leave it paused.
    const release = () => {
      if (!pointerDown.current) return;
      pointerDown.current = false;
      resumeAt.current = performance.now() + 1800;
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group || hovered || focused || reducedMotion || !visible) return;
    let frame: number;
    let previous: number | undefined;
    let position = viewport.scrollLeft;
    const move = (time: number) => {
      if (pointerDown.current || performance.now() < resumeAt.current) {
        position = viewport.scrollLeft;
      } else if (previous !== undefined && !document.hidden) {
        position += Math.min(time - previous, 64) * 0.024;
        const loopWidth = group.getBoundingClientRect().width;
        if (loopWidth > 0 && position >= loopWidth) position %= loopWidth;
        viewport.scrollLeft = position;
      }
      previous = time;
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [hovered, focused, reducedMotion, visible]);

  const tiles = (duplicate: boolean) => sites.map(site => <a
    className="carousel-site"
    href={site.href}
    key={site.title}
    target="_blank"
    rel="noopener noreferrer"
    tabIndex={duplicate ? -1 : 0}
    aria-label={`${site.title}, ${site.kind.toLowerCase()}, abre en otra pestaña`}
  >
    <img src={site.image} alt="" width="660" height="290" style={{ objectPosition: site.position }} decoding="async" draggable={false} />
    <span className="carousel-site-copy"><span className="carousel-site-name">{site.title}</span><span className="carousel-site-kind">{site.kind}</span></span>
  </a>);

  return <section className="hero-carousel" aria-label="Selección de trabajos y diseños de muestra">
    <div className="container carousel-intro"><p>Trabajos y diseños para explorar</p></div>
    <div
      className="carousel-viewport"
      id="hero-sites-carousel"
      ref={viewportRef}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={event => {
        setFocused(false);
        if (event.pointerType === "touch" || event.pointerType === "pen") pointerDown.current = true;
      }}
      onWheel={() => { resumeAt.current = performance.now() + 1800; }}
      onScroll={() => {
        if (pointerDown.current || performance.now() < resumeAt.current) resumeAt.current = performance.now() + 1800;
      }}
      onFocusCapture={event => setFocused(event.target.matches(":focus-visible"))}
      onKeyDown={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div className="carousel-track"><div className="carousel-group" ref={groupRef}>{tiles(false)}</div><div className="carousel-group" aria-hidden="true" inert={reducedMotion ? true : undefined}>{tiles(true)}</div></div>
    </div>
  </section>;
}
