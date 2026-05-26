"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type WebProjectCarouselItem = {
  title: string;
  tag: string;
  text: string;
  img: string;
  href: string;
};

export default function WebProjectsCarousel({
  projects,
}: {
  projects: WebProjectCarouselItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (projects.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [projects.length]);

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
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width: 980px) 100vw, 620px"
                  className={project.title === "Ercas" ? "object-contain object-center p-2" : "object-cover object-top"}
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
