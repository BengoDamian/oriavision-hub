"use client";

import { useEffect, useRef } from "react";
import "./globals.css";

export default function Page() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const layers = hero.querySelectorAll<HTMLElement>("[data-depth]");

    function onMove(e: MouseEvent) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0);
        layer.style.setProperty("--mx", `${x * depth}px`);
        layer.style.setProperty("--my", `${y * depth}px`);
      });
    }

    function onLeave() {
      layers.forEach((layer) => {
        layer.style.setProperty("--mx", "0px");
        layer.style.setProperty("--my", "0px");
      });
    }

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <main className="ov-page">
      <section ref={heroRef} className="ov-hero">
        <div className="ov-white-panel" />
        <div className="ov-dark-panel" />
        <div className="ov-dark-pattern" />

        <header className="ov-nav ov-reveal-top">
          <div className="ov-logo">
            <span />
          </div>

          <nav className="ov-links">
            <a href="#">Recursos</a>
            <a href="#">Servicios</a>
            <a href="#">Herramientas</a>
          </nav>

          <div className="ov-actions">
            <a href="#" className="ov-login">Ingresar</a>
            <a href="#" className="ov-contact">Contactar</a>
          </div>
        </header>

        <div className="ov-copy">
          <div className="ov-kicker ov-reveal-left ov-delay-1">
            <i />
            <span>ORIAVISION</span>
          </div>

          <h1 className="ov-title ov-reveal-left ov-delay-2">
            VENDÉ
            <br />
            MEJOR EN
            <br />
            MERCADOLIBRE
          </h1>

          <p className="ov-subtitle ov-reveal-left ov-delay-3">
            Herramientas simples para calcular precios, cuidar el margen y tomar mejores decisiones.
          </p>

          <div className="ov-buttons ov-reveal-left ov-delay-4">
            <a href="#" className="ov-btn-link">Ver recursos →</a>
            <a href="#" className="ov-btn-main">Abrir Calculadora</a>
          </div>
        </div>

        <div className="ov-scene">
          <img src="/oriavision-anim/glow-big.svg" alt="" className="ov-layer ov-glow-big ov-pop ov-delay-2" data-depth="18" />
          <img src="/oriavision-anim/lines.svg" alt="" className="ov-layer ov-lines ov-sweep ov-delay-2" data-depth="32" />
          <img src="/oriavision-anim/laptop.svg" alt="" className="ov-layer ov-laptop ov-main-enter" data-depth="20" />
          <img src="/oriavision-anim/phone.svg" alt="" className="ov-layer ov-phone ov-card-enter ov-delay-4" data-depth="42" />
          <img src="/oriavision-anim/chart-panel.svg" alt="" className="ov-layer ov-chart ov-card-enter ov-delay-5" data-depth="55" />
          <img src="/oriavision-anim/card-panel.svg" alt="" className="ov-layer ov-card ov-card-enter ov-delay-6" data-depth="46" />
          <img src="/oriavision-anim/cube.svg" alt="" className="ov-layer ov-cube ov-card-enter ov-delay-7" data-depth="70" />
          <img src="/oriavision-anim/particles.svg" alt="" className="ov-layer ov-particles ov-pulse" data-depth="65" />
        </div>

        <div className="ov-floating-note ov-note-1 ov-card-enter ov-delay-7" data-depth="35">
          <strong>Margen</strong>
          <span>+22%</span>
        </div>

        <div className="ov-floating-note ov-note-2 ov-card-enter ov-delay-8" data-depth="48">
          <strong>Precio ML</strong>
          <span>$38.900</span>
        </div>
      </section>
    </main>
  );
}
