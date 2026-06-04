"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  Zap,
} from "lucide-react";

export type HomeSearchItem = {
  type: "Herramienta" | "Prompt" | "Guía" | "Servicio";
  title: string;
  description: string;
  category: string;
  href: string;
  external?: boolean;
};

const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

const map = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp(t);

const STATS = [
  { value: "18+", label: "Años vendiendo online" },
  { value: "3", label: "Tiendas MercadoLibre" },
  { value: "100%", label: "Experiencia real" },
];

const PROOF_ITEMS = [
  "Venta online desde 2006",
  "Uso diario de MercadoLibre",
  "Herramientas pensadas para operar mejor",
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function score(item: HomeSearchItem, query: string) {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(item.title);
  const category = normalize(item.category);
  const description = normalize(item.description);
  const type = normalize(item.type);
  const full = `${type} ${title} ${category} ${description}`;

  let points = 0;

  if (title === q) points += 300;
  if (title.startsWith(q)) points += 160;
  if (title.includes(q)) points += 120;
  if (category.includes(q)) points += 50;
  if (type.includes(q)) points += 45;
  if (description.includes(q)) points += 20;

  for (const token of q.split(" ").filter(Boolean)) {
    if (title.includes(token)) points += 45;
    else if (full.includes(token)) points += 20;
  }

  return points;
}

export default function OriavisionScrollHero({
  items,
  calcUrl,
}: {
  items: HomeSearchItem[];
  calcUrl: string;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = stageRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
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

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-ov-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.16 }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const results = useMemo(() => {
    const clean = query.trim();

    if (!clean) {
      return items.slice(0, 5);
    }

    return items
      .map((item) => ({ item, score: score(item, clean) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((entry) => entry.item);
  }, [items, query]);

  const showResults = isFocused || query.trim().length > 0;

  const p = progress;

  const primaryFade = clamp(map(p, 0.22, 0.48, 0, 1));
  const primaryOpacity = 1 - primaryFade;

  const secondaryIn = clamp(map(p, 0.34, 0.56, 0, 1));
  const secondaryOpacity = secondaryIn;

  const panelIntro = clamp(map(p, 0.04, 0.24, 0, 1));
  const priceReveal = clamp(map(p, 0.08, 0.20, 0, 1));
  const orderReveal = clamp(map(p, 0.22, 0.34, 0, 1));
  const speedReveal = clamp(map(p, 0.32, 0.44, 0, 1));
  const proofReveal = clamp(map(p, 0.46, 0.60, 0, 1));

  const statOneReveal = clamp(map(p, 0.74, 0.91, 0, 1));
  const statTwoReveal = clamp(map(p, 0.80, 0.96, 0, 1));
  const statThreeReveal = clamp(map(p, 0.86, 1.0, 0, 1));

  const statsReveal = Math.max(statOneReveal, statTwoReveal, statThreeReveal);
  const statRevealValues = [statOneReveal, statTwoReveal, statThreeReveal];

  const revealStyle = (t: number, xOffset = 0): CSSProperties => ({
    opacity: t,
    visibility: t < 0.02 ? "hidden" : "visible",
    transform: `translate(${lerp(xOffset, 0, t)}px, ${lerp(22, 0, t)}px)`,
    pointerEvents: t > 0.35 ? "auto" : "none",
  });

  const statCardStyle = (t: number): CSSProperties => ({
    opacity: t,
    visibility: t < 0.02 ? "hidden" : "visible",
    transform: `translateY(${lerp(36, 0, t)}px) scale(${lerp(0.94, 1, t)})`,
    filter: `blur(${lerp(7, 0, t)}px)`,
  });

  return (
    <section ref={stageRef} className="ov-hero-stage">
      <div className="ov-hero-sticky">
        <div className="ov-hero-bg">
          <div className="ov-mesh ov-mesh-a" />
          <div className="ov-mesh ov-mesh-b" />
          <div className="ov-grid-bg" />
        </div>

        <div className="ov-hero-layout">
          <div className="ov-left-stack">
            <div
              className="ov-hero-copy"
              style={{
                opacity: primaryOpacity,
                visibility: primaryOpacity < 0.03 ? "hidden" : "visible",
                transform: `translateY(${lerp(0, -34, primaryFade)}px) scale(${lerp(
                  1,
                  0.98,
                  primaryFade
                )})`,
                filter: `blur(${lerp(0, 5, primaryFade)}px)`,
                pointerEvents: primaryOpacity < 0.08 ? "none" : "auto",
              }}
            >
              <span className="ov-tag">Oriavision Hub</span>

              <div className="ov-hero-search">
                <label>Buscar rápido</label>

                <div className="ov-hero-search-box">
                  <input
                    type="text"
                    value={query}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      setTimeout(() => setIsFocused(false), 140);
                    }}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscá calculadora, prompts, guías o páginas web..."
                  />

                  <button type="button">Buscar</button>
                </div>

                {showResults ? (
                  <div className="ov-hero-results" aria-live="polite">
                    {results.length ? (
                      results.map((item) => (
                        <a
                          key={`${item.type}-${item.href}-${item.title}`}
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noreferrer" : undefined}
                        >
                          <span>
                            {item.type} · {item.category}
                          </span>
                          <strong>{item.title}</strong>
                        </a>
                      ))
                    ) : (
                      <div className="ov-empty-result">
                        No encontré nada con esa búsqueda. Probá con “prompts”,
                        “guías”, “calculadora” o “web”.
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              <h1>Soluciones digitales para vender mejor.</h1>

              <p>
                Creamos herramientas, recursos y páginas web para negocios que
                necesitan verse profesionales, calcular mejor y convertir con más claridad.
              </p>

              <div className="ov-hero-actions">
                <a href="#herramientas">
                  Explorar herramientas <ArrowRight className="h-5 w-5" />
                </a>

                <a href="/web/">Diseño web profesional</a>
              </div>
            </div>

            <div
              className="ov-left-secondary"
              style={{
                opacity: secondaryOpacity,
                visibility: secondaryOpacity < 0.03 ? "hidden" : "visible",
                transform: `translateY(${lerp(24, 0, secondaryIn)}px)`,
                pointerEvents: secondaryOpacity > 0.35 ? "auto" : "none",
              }}
            >
              <div className="ov-left-secondary-card">
                <span className="ov-left-secondary-kicker">
                  Un ecosistema más claro
                </span>

                <h2>Todo conectado para vender con más orden y más velocidad.</h2>

                <p>
                  Calculadora, recursos gratuitos y páginas web en un mismo hub
                  para ayudarte a vender mejor, con más claridad y una imagen más profesional.
                </p>

                <div className="ov-left-secondary-list">
                  <div>
                    <Calculator className="h-4 w-4" />
                    <span>Precio estimado con más contexto</span>
                  </div>

                  <div>
                    <BarChart3 className="h-4 w-4" />
                    <span>Recursos gratuitos para ordenar mejor</span>
                  </div>

                  <div>
                    <Zap className="h-4 w-4" />
                    <span>Web y sistemas para avanzar más rápido</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="ov-dashboard-preview"
            style={{
              opacity: lerp(0.22, 1, panelIntro),
              transform: `translate(${lerp(84, 0, panelIntro)}px, ${lerp(
                10,
                0,
                panelIntro
              )}px) scale(${lerp(0.95, 1, panelIntro)})`,
            }}
            aria-label="Panel visual Oriavision"
          >
            <div className="ov-dashboard-border">
              <div className="ov-dashboard-inner">
                <div className="ov-dashboard-head">
                  <div>
                    <span>Panel Oriavision</span>
                    <small>claridad para vender mejor</small>
                  </div>

                  <div className="ov-dashboard-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <a
                  className="ov-dashboard-price"
                  href={calcUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={revealStyle(priceReveal)}
                >
                  <div className="ov-dashboard-title">
                    <Calculator className="h-5 w-5" />
                    <span>Precio ML estimado</span>
                  </div>

                  <strong>$ 48.920</strong>

                  <div className="ov-dashboard-subline">
                    <span>Margen, comisión, impuestos y envío contemplados.</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </a>

                <div className="ov-dashboard-grid">
                  <a
                    className="ov-dashboard-mini"
                    href="#recursos-gratuitos"
                    style={revealStyle(orderReveal, -16)}
                  >
                    <BarChart3 className="h-5 w-5 text-emerald-300" />
                    <strong>+ orden</strong>
                    <span>recursos gratuitos</span>
                    <ArrowRight className="ov-dashboard-arrow h-4 w-4" />
                  </a>

                  <a
                    className="ov-dashboard-mini"
                    href="/web/"
                    style={revealStyle(speedReveal, 16)}
                  >
                    <Zap className="h-5 w-5 text-yellow-300" />
                    <strong>+ velocidad</strong>
                    <span>páginas web y sistemas</span>
                    <ArrowRight className="ov-dashboard-arrow h-4 w-4" />
                  </a>
                </div>

                <div className="ov-dashboard-proof" style={revealStyle(proofReveal)}>
                  <div className="ov-dashboard-proof-title">
                    Creado desde experiencia real
                  </div>

                  <div className="ov-dashboard-proof-list">
                    {PROOF_ITEMS.map((item) => (
                      <div key={item}>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="ov-hero-stats"
            style={{
              visibility: statsReveal < 0.02 ? "hidden" : "visible",
              pointerEvents: statsReveal > 0.35 ? "auto" : "none",
            }}
            aria-label="Experiencia Oriavision"
          >
            {STATS.map((stat, index) => (
              <div key={stat.label} style={statCardStyle(statRevealValues[index])}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ov-scroll-progress" aria-hidden="true">
          <i style={{ height: `${p * 100}%` }} />
        </div>
      </div>
    </section>
  );
}