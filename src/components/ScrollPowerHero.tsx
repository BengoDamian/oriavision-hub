"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, Sparkles } from "lucide-react";

const CALC_URL = "https://calculadoraml.oriavision.com.ar";
const clamp = (n: number) => Math.min(Math.max(n, 0), 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp(t);
const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const STATS = [
  { value: "18+", label: "años vendiendo online" },
  { value: "3", label: "tiendas MercadoLibre" },
  { value: "100%", label: "experiencia real" },
];

export default function ScrollPowerHero() {
  const stageRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const raw = total <= 0 ? 0 : Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(raw);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const p = progress;
  const introOut = clamp(map(p, 0.08, 0.31, 1, 0));
  const zoom = clamp(map(p, 0.14, 0.54, 0, 1));
  const cards = clamp(map(p, 0.38, 0.70, 0, 1));
  const finale = clamp(map(p, 0.68, 1, 0, 1));

  return (
    <section ref={stageRef} className="osp-stage" aria-label="Oriavision hero animado">
      <div className="osp-sticky">
        <div className="osp-frame">
          <div className="osp-noise" />
          <div className="osp-grid" />
          <div className="osp-left-light" style={{ transform: `translateX(${lerp(0, -8, zoom)}%)` }} />
          <div className="osp-dark-shape" style={{ transform: `translateX(${lerp(0, -10, zoom)}%)` }} />
          <div className="osp-pattern" style={{ transform: `translateX(${lerp(0, -10, zoom)}%)` }} />

          <div className="osp-copy" style={{ opacity: introOut, transform: `translateX(${lerp(0, -95, zoom)}px) scale(${lerp(1, 0.94, zoom)})` }}>
            <div className="osp-pill"><Sparkles className="h-4 w-4" />E-commerce · Web · Herramientas</div>
            <h1>Soluciones digitales para vender mejor.</h1>
            <p>Creamos herramientas, recursos y páginas web para negocios que necesitan verse profesionales, calcular mejor y convertir con más claridad.</p>
            <div className="osp-actions">
              <a href="#herramientas">Ver herramientas <ArrowRight className="h-5 w-5" /></a>
              <Link href="/web/">Quiero una web profesional</Link>
            </div>
            <div className="osp-stats">
              {STATS.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
            </div>
          </div>

          <div className="osp-scene">
            <div className="osp-glow" style={{ opacity: lerp(0.68, 1, zoom), transform: `scale(${lerp(1, 1.5, zoom)}) translate(${lerp(0, -80, zoom)}px, ${lerp(0, 18, zoom)}px)` }} />
            <img className="osp-lines" src="/scroll-power/lines.svg" alt="" style={{ opacity: lerp(0.36, 1, zoom), transform: `translate(${lerp(0, -170, zoom)}px, ${lerp(0, 70, zoom)}px) scale(${lerp(1, 1.36, zoom)})` }} />
            <img className="osp-laptop" src="/scroll-power/laptop.svg" alt="Panel visual Oriavision" style={{ transform: `translate(${lerp(0, -250, zoom)}px, ${lerp(0, -42, zoom)}px) scale(${lerp(0.86, 1.58, zoom)}) rotate(${lerp(0, -4, zoom)}deg)` }} />
            <img className="osp-phone" src="/scroll-power/phone.svg" alt="" style={{ opacity: clamp(map(p, 0.02, 0.35, 1, 0)), transform: `translate(${lerp(0, -150, zoom)}px, ${lerp(0, 88, zoom)}px) rotate(${lerp(-10, -26, zoom)}deg)` }} />

            <div className="osp-data-card osp-card-one" style={{ opacity: cards, transform: `translate(${lerp(170, 0, cards)}px, ${lerp(-36, 0, cards)}px) scale(${lerp(0.76, 1, cards)})` }}>
              <span>Precio ML estimado</span><strong>$ 48.920</strong><div className="osp-bars"><i /><i /><i /><i /><i /></div>
            </div>
            <div className="osp-data-card osp-card-two" style={{ opacity: cards, transform: `translate(${lerp(-160, 0, cards)}px, ${lerp(72, 0, cards)}px) scale(${lerp(0.76, 1, cards)})` }}>
              <span>Margen</span><strong>+22%</strong>
            </div>
            <div className="osp-cube" style={{ opacity: cards, transform: `translate(${lerp(120, 0, cards)}px, ${lerp(120, 0, cards)}px) rotate(${lerp(28, 0, cards)}deg) scale(${lerp(0.45, 1, cards)})` }}><i /></div>
          </div>

          <div className="osp-final" style={{ opacity: finale, transform: `translateY(${lerp(80, 0, finale)}px)` }}>
            <span>Panel Oriavision</span>
            <h2>Claridad para vender mejor.</h2>
            <p>Precio, margen, recursos y presencia digital en un mismo ecosistema: simple, visual y pensado desde la experiencia real.</p>
            <div className="osp-final-list">
              {["Venta online desde 2006", "Uso diario de MercadoLibre", "Herramientas pensadas para operar mejor"].map((item) => <div key={item}><CheckCircle2 className="h-5 w-5" />{item}</div>)}
            </div>
            <a href={CALC_URL} target="_blank" rel="noreferrer">Abrir Calculadora ML <ArrowRight className="h-5 w-5" /></a>
          </div>

          <div className="osp-progress" aria-hidden="true"><i style={{ height: `${p * 100}%` }} /></div>
        </div>
      </div>
    </section>
  );
}
