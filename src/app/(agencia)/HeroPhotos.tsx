"use client";

import { useEffect, useRef, useState } from "react";

const PHOTOS = ["/assets/hero-web.webp", "/assets/hero-estrategia.webp", "/assets/hero-diseno.webp"];

/** Fondo decorativo de la portada: fundido lento entre fotos. Se detiene si la portada
 *  no se ve, si la pestaña está oculta, si hay movimiento reducido o si se pausa. */
export default function HeroPhotos({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const activeRef = useRef(0);

  useEffect(() => {
    const hero = imgs.current[0]?.closest(".photo-hero");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    let visible = true;
    let advancing = false;
    let cancelled = false;

    const canPlay = () => !paused && visible && !document.hidden && !reducedMotion.matches;
    const schedule = () => {
      window.clearTimeout(timer);
      if (canPlay() && !advancing) timer = window.setTimeout(advance, 7000);
    };
    const advance = async () => {
      if (!canPlay()) return;
      advancing = true;
      const next = (activeRef.current + 1) % PHOTOS.length;
      try {
        await imgs.current[next]?.decode();
        if (canPlay() && !cancelled) {
          activeRef.current = next;
          setActive(next);
        }
      } catch {
        // Si la próxima imagen no carga, se mantiene la actual.
      }
      advancing = false;
      if (!cancelled) schedule();
    };

    const observer =
      hero && "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            visible = entries[0].isIntersecting;
            schedule();
          })
        : null;
    if (observer && hero) observer.observe(hero);
    reducedMotion.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    schedule();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      observer?.disconnect();
      reducedMotion.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [paused]);

  return (
    <>
      <div className="hero-photos" aria-hidden="true">
        {PHOTOS.map((src, i) => (
          <img
            key={src}
            ref={(el) => {
              imgs.current[i] = el;
            }}
            className={i === active ? "hero-photo active" : "hero-photo"}
            src={src}
            width={1672}
            height={941}
            alt=""
            {...(i === 0 ? { fetchPriority: "high" as const } : { decoding: "async" as const })}
          />
        ))}
      </div>
      {children}
      <button
        className="carousel-access"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? "Reanudar imágenes de fondo" : "Pausar imágenes de fondo"}
      </button>
    </>
  );
}
