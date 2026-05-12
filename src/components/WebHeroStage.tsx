"use client";

import { Gauge, Sparkles, Workflow } from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
import { useRef } from "react";

export default function WebHeroStage() {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--mx", `${x * 28}px`);
    el.style.setProperty("--my", `${y * 22}px`);
    el.style.setProperty("--rx", `${-y * 4}deg`);
    el.style.setProperty("--ry", `${x * 6}deg`);
  };

  const resetMove = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", `0px`);
    el.style.setProperty("--my", `0px`);
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      className="web-visual-stage-v14"
      aria-label="Mockups animados de trabajos reales de Oriavision"
      onMouseMove={handleMove}
      onMouseLeave={resetMove}
      style={{ "--mx": "0px", "--my": "0px", "--rx": "0deg", "--ry": "0deg" } as CSSProperties}
    >
      <div className="web-stage-grid" />
      <div className="web-stage-glow web-stage-glow-a" />
      <div className="web-stage-glow web-stage-glow-b" />
      <div className="web-orbit web-orbit-a" />
      <div className="web-orbit web-orbit-b" />
      <div className="web-orbit web-orbit-c" />
      <div className="web-stage-lines" />
      <div className="web-stage-spotlight" />

      <div className="web-laptop web-float-main web-parallax-main">
        <div className="web-device-bar"><span /><span /><span /><b>SIEMPRE DE GUARDIA</b></div>
        <img src="/portfolio/siempredeguardia.png" alt="Mockup de Siempre de Guardia" />
        <div className="web-screen-sheen" />
      </div>

      <div className="web-tablet web-float-secondary web-parallax-secondary">
        <div className="web-device-bar"><span /><span /><span /><b>QUIRVO</b></div>
        <img src="/portfolio/quirvo.png" alt="Mockup de Quirvo" />
        <div className="web-screen-sheen" />
      </div>

      <div className="web-ops-mini web-float-tertiary web-parallax-tertiary" aria-label="Flujo de automatización web">
        <div className="web-ops-mini-head">WEB + OPERACIÓN</div>
        <div className="web-ops-row"><span />Lead captado</div>
        <div className="web-ops-line" />
        <div className="web-ops-row"><span />Mail automático</div>
        <div className="web-ops-line web-ops-line-alt" />
        <div className="web-ops-row"><span />Dato guardado</div>
        <strong>La página también trabaja.</strong>
      </div>

      <div className="web-card web-card-a web-card-float-a">
        <Sparkles className="h-5 w-5" />
        <div><strong>Dirección visual</strong><small>Piezas con identidad propia</small></div>
      </div>
      <div className="web-card web-card-b web-card-float-b">
        <Workflow className="h-5 w-5" />
        <div><strong>Web + operación</strong><small>Lead → mail → dato → equipo</small></div>
      </div>
      <div className="web-card web-card-c web-card-float-c">
        <Gauge className="h-5 w-5" />
        <div><strong>Conversión</strong><small>Mensaje claro, CTA y proceso</small></div>
      </div>
    </div>
  );
}
