"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type WebProjectCarouselItem = {
  title: string;
  tag: string;
  text: string;
  img: string;
  mobileImg?: string;
  href: string;
};

export default function WebProjectsCarousel({
  projects,
}: {
  projects: WebProjectCarouselItem[];
}) {
  // Quirvo queda como segunda slide: arrancamos en la slide anterior a Quirvo
  // para que la primera visible sea otro proyecto y Quirvo aparezca segundo.
  // Además permanece un poco más de tiempo en pantalla que el resto.
  const quirvoIndex = projects.findIndex((p) => p.title === "Quirvo");
  const startIndex =
    quirvoIndex >= 1
      ? quirvoIndex - 1
      : quirvoIndex === 0
        ? projects.length - 1
        : 0;

  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(media.matches);

    sync();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", sync);
      return () => media.removeEventListener("change", sync);
    }

    media.addListener(sync);
    return () => media.removeListener(sync);
  }, []);

  // Al entrar a la sección arrancamos en la slide previa a Quirvo, para que
  // Quirvo sea la segunda slide en aparecer.
  useEffect(() => {
    setActiveIndex(startIndex);
  }, [startIndex]);

  // Autoplay solo en desktop. Duración por slide: Quirvo permanece más tiempo
  // (10 s) para que se llegue a leer y reconocer; el resto usa 8 s.
  useEffect(() => {
    if (projects.length <= 1) return;
    if (isMobile) return;

    const isQuirvo = projects[activeIndex]?.title === "Quirvo";
    const dwell = isQuirvo ? 10000 : 8000;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, dwell);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isMobile, projects]);

  return (
    <div className="ov-project-carousel" aria-label="Portfolio destacado de Oriavision">
      <div className="ov-project-carousel-viewport">
        <div
          className="ov-project-carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={`ov-project-slide ${project.title === "Ercas" ? "is-ercas" : ""}`}
            >
              <div className="ov-project-slide-media">
                <Image
                  src={isMobile && project.mobileImg ? project.mobileImg : project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width: 980px) 100vw, 620px"
                  className={isMobile
                    ? "object-cover object-center"
                    : project.title === "Ercas"
                      ? "object-contain object-center p-2"
                      : project.title === "Quirvo"
                        ? "object-contain object-center"
                        : "object-cover object-top"}
                />
              </div>

              <div className="ov-project-slide-copy">
                <span className="ov-tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <span className="ov-project-slide-link">Tocar para abrir</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="ov-project-carousel-dots" role="tablist" aria-label="Seleccionar proyecto">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            className={`ov-project-carousel-dot ${index === activeIndex ? "is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver ${project.title}`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
