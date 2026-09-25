"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLogo, waLink } from "./shared";

export default function AgencyHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia("(min-width:1051px)");
    const onChange = (event: MediaQueryListEvent) => event.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="nav wrap">
        <a className="brand" href="/" aria-label="ORIAVISION, inicio">
          <BrandLogo />
        </a>
        <nav
          className={open ? "nav-links open" : "nav-links"}
          id="navegacion"
          aria-label="Navegación principal"
        >
          <a href="/#servicios" onClick={close}>
            Servicios
          </a>
          <a href="/proyectos/" onClick={close}>
            Proyectos
          </a>
          <a href="/inspiracion/" onClick={close}>
            Inspiración
          </a>
          <a href="/rubros/" onClick={close}>
            Rubros
          </a>
        </nav>
        <div className="header-actions">
          <a
            className="btn header-contact"
            aria-label="Contactanos por WhatsApp"
            href={waLink("Hola, Oriavision. Quiero consultar por una web para mi negocio.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 11.5a9 9 0 0 1-13.3 7.9L2 21l1.6-5.2a9 9 0 1 1 16.9-4.3Z" />
              <path d="m8 7-1 2c1 4 3 6 7 7l2-1-2-3-2 1-2-2 1-2-3-2Z" />
            </svg>
            <span>Contactanos</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-controls="navegacion"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
