"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";

const clamp = (n: number) => Math.min(Math.max(n, 0), 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp(t);
const map = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  ((v - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export default function OriavisionScrollPower() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = stageRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const raw = Math.min(Math.max(-rect.top / total, 0), 1);
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
  const introOut = clamp(map(p, 0.06, 0.26, 1, 0));
  const zoom = clamp(map(p, 0.14, 0.48, 0, 1));
  const cards = clamp(map(p, 0.42, 0.72, 0, 1));
  const finale = clamp(map(p, 0.72, 1, 0, 1));

  return (
    <section id="experiencia-scroll" className="osp-shell" aria-label="Experiencia visual Oriavision">
      <div ref={stageRef} className="osp-stage">
        <div className="osp-sticky">
          <div className="osp-frame">
            <div className="osp-left" style={{ transform: `translateX(${lerp(0, -18, zoom)}%)` }} />
            <div className="osp-right" style={{ transform: `translateX(${lerp(0, -12, zoom)}%)` }} />
            <div className="osp-pattern" style={{ transform: `translateX(${lerp(0, -12, zoom)}%)` }} />

            <div className="osp-topbar">
              <div className="osp-logo">O</div>
              <div className="osp-toplinks" aria-hidden="true">
                <span>Recursos</span>
                <span>Herramientas</span>
                <span>Servicios</span>
              </div>
              <Link href="/web/" className="osp-pill">Quiero una web</Link>
            </div>

            <div
              className="osp-copy"
              style={{
                opacity: introOut,
                transform: `translateX(${lerp(0, -130, zoom)}px) scale(${lerp(1, 0.92, zoom)})`,
              }}
            >
              <div className="osp-kicker"><span /> ORIAVISION</div>
              <h2>
                TU WEB
                <br />
                TAMBIÉN PUEDE
                <br />
                VENDER MEJOR
              </h2>
              <p>
                Una experiencia visual con scroll, capas y datos para explicar lo que hacés sin que parezca una plantilla más.
              </p>
              <div className="osp-actions">
                <a href="#herramientas">Ver herramientas →</a>
                <Link href="/web/">Diseñar mi página</Link>
              </div>
            </div>

            <div className="osp-scene" aria-hidden="true">
              <div
                className="osp-glow"
                style={{
                  opacity: lerp(0.65, 1, zoom),
                  transform: `scale(${lerp(1, 1.45, zoom)}) translate(${lerp(0, -80, zoom)}px, ${lerp(0, 10, zoom)}px)`,
                }}
              />

              <img
                src="/scroll-power/lines.svg"
                alt=""
                className="osp-lines"
                style={{
                  opacity: lerp(0.35, 1, zoom),
                  transform: `translate(${lerp(0, -180, zoom)}px, ${lerp(0, 60, zoom)}px) scale(${lerp(1, 1.35, zoom)})`,
                }}
              />

              <img
                src="/scroll-power/laptop.svg"
                alt=""
                className="osp-laptop"
                style={{
                  transform: `translate(${lerp(0, -270, zoom)}px, ${lerp(0, -40, zoom)}px) scale(${lerp(0.82, 1.62, zoom)}) rotate(${lerp(0, -4, zoom)}deg)`,
                }}
              />

              <img
                src="/scroll-power/phone.svg"
                alt=""
                className="osp-phone"
                style={{
                  opacity: clamp(map(p, 0, 0.34, 1, 0)),
                  transform: `translate(${lerp(0, -160, zoom)}px, ${lerp(0, 90, zoom)}px) rotate(${lerp(-10, -28, zoom)}deg)`,
                }}
              />

              <div
                className="osp-data osp-data-one"
                style={{
                  opacity: cards,
                  transform: `translate(${lerp(180, 0, cards)}px, ${lerp(-40, 0, cards)}px) scale(${lerp(0.72, 1, cards)})`,
                }}
              >
                <span>PRECIO ESTIMADO</span>
                <strong>$48.920</strong>
                <div className="osp-bars"><i /><i /><i /><i /><i /></div>
              </div>

              <div
                className="osp-data osp-data-two"
                style={{
                  opacity: cards,
                  transform: `translate(${lerp(-180, 0, cards)}px, ${lerp(80, 0, cards)}px) scale(${lerp(0.72, 1, cards)})`,
                }}
              >
                <span>MARGEN</span>
                <strong>+22%</strong>
              </div>

              <div
                className="osp-cube"
                style={{
                  opacity: cards,
                  transform: `translate(${lerp(120, 0, cards)}px, ${lerp(120, 0, cards)}px) rotate(${lerp(28, 0, cards)}deg) scale(${lerp(0.45, 1, cards)})`,
                }}
              >
                <i />
              </div>
            </div>

            <div
              className="osp-final"
              style={{
                opacity: finale,
                transform: `translateY(${lerp(80, 0, finale)}px)`,
              }}
            >
              <span><Sparkles className="h-4 w-4" /> ESCENA FINAL</span>
              <h3>Una web que cuenta tu propuesta mientras el usuario avanza.</h3>
              <p>
                No es solo decoración: sirve para explicar productos, servicios, herramientas y diferenciales con más impacto.
              </p>
              <div className="osp-final-actions">
                <Link href="/web/">
                  Quiero algo así <ArrowRight className="h-5 w-5" />
                </Link>
                <a href="#herramientas">
                  <Calculator className="h-5 w-5" /> Ver herramientas
                </a>
              </div>
            </div>

            <div className="osp-progress"><i style={{ height: `${p * 100}%` }} /></div>
          </div>
        </div>

        <div className="osp-steps" aria-hidden="true">
          <strong>SCROLL</strong>
          <span>01 Intro</span>
          <span>02 Zoom</span>
          <span>03 Datos</span>
          <span>04 Cierre</span>
        </div>
      </div>
    </section>
  );
}
