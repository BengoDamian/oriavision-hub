"use client";

import { ArrowUpRight, BadgeCheck, Layers3, Sparkles, Workflow } from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
import { useRef } from "react";

const slides = [
  {
    src: "/web-visuals/concept-profesionalismo.png",
    alt: "Escena conceptual de diseño web profesional con notebook, interfaces premium y luz azul",
  },
  {
    src: "/web-visuals/concept-diseno.png",
    alt: "Workspace digital premium con paneles de diseño, tipografía, paleta de color y estructura visual",
  },
  {
    src: "/web-visuals/concept-automatizacion.png",
    alt: "Dashboard oscuro con automatizaciones, flujos, métricas y pantallas conectadas",
  },
  {
    src: "/web-visuals/concept-experiencia.png",
    alt: "Interfaz de diseño futurista con dispositivos, experiencia de usuario y composición premium",
  },
];

export default function WebHeroStage() {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--mx", `${x * 26}px`);
    el.style.setProperty("--my", `${y * 20}px`);
  };

  const resetMove = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  return (
    <div
      ref={ref}
      className="web-visual-stage-v16"
      aria-label="Escena visual conceptual sobre diseño web profesional, experiencia y automatización"
      onMouseMove={handleMove}
      onMouseLeave={resetMove}
      style={{ "--mx": "0px", "--my": "0px" } as CSSProperties}
    >
      <div className="web-v16-grid" />
      <div className="web-v16-glow web-v16-glow-a" />
      <div className="web-v16-glow web-v16-glow-b" />
      <div className="web-v16-orbit web-v16-orbit-a" />
      <div className="web-v16-orbit web-v16-orbit-b" />
      <div className="web-v16-line web-v16-line-a" />
      <div className="web-v16-line web-v16-line-b" />

      <div className="web-v16-main-frame">
        <div className="web-v16-frame-bar">
          <span />
          <span />
          <span />
          <b>DESIGN SYSTEM / EXPERIENCE</b>
        </div>
        <div className="web-v16-slider" aria-hidden="true">
          {slides.map((slide, index) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={`web-v16-slide web-v16-slide-${index + 1}`}
            />
          ))}
        </div>
        <div className="web-v16-sheen" />
      </div>

      <div className="web-v16-panel web-v16-panel-left">
        <Sparkles className="h-5 w-5" />
        <div>
          <strong>Diseño premium</strong>
          <small>Imagen visual con criterio, no plantilla.</small>
        </div>
      </div>

      <div className="web-v16-panel web-v16-panel-right">
        <Workflow className="h-5 w-5" />
        <div>
          <strong>Automatización</strong>
          <small>La web también puede trabajar por vos.</small>
        </div>
      </div>

      <div className="web-v16-mini-card web-v16-mini-card-a">
        <Layers3 className="h-4 w-4" />
        <span>UX + estructura</span>
      </div>
      <div className="web-v16-mini-card web-v16-mini-card-b">
        <BadgeCheck className="h-4 w-4" />
        <span>Experiencia sólida</span>
      </div>
      <div className="web-v16-mini-card web-v16-mini-card-c">
        <ArrowUpRight className="h-4 w-4" />
        <span>Conversión clara</span>
      </div>
    </div>
  );
}
