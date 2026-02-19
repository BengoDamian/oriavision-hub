"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  // Cerrar con ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center" onClick={close}>
          <Image
            src="/logo.png"
            alt="Oriavisión"
            width={220}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#herramientas"
            className="text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors uppercase tracking-wide"
          >
            Herramientas
          </Link>

          <Link
            href="/#nosotros"
            className="text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors uppercase tracking-wide"
          >
            Quiénes Somos
          </Link>

          <a
            href="https://calculadoraml.oriavision.com.ar"
            target="_blank"
            rel="noreferrer"
            className="bg-brand-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-200 hover:bg-brand-700 transition-all hover:scale-105"
          >
            CALCULADORA ML
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-800 p-2 rounded-xl border border-slate-200 bg-white"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={toggle}
        >
          {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <>
          {/* Overlay para cerrar tocando afuera */}
          <button
            className="md:hidden fixed inset-0 z-40 bg-black/30"
            aria-label="Cerrar menú"
            onClick={close}
          />

          {/* Panel */}
          <div
            id="mobile-menu"
            className="md:hidden fixed top-20 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link
                href="/#herramientas"
                onClick={close}
                className="text-base font-bold text-slate-800"
              >
                Herramientas
              </Link>

              <Link
                href="/#nosotros"
                onClick={close}
                className="text-base font-bold text-slate-800"
              >
                Quiénes Somos
              </Link>

              <a
                href="https://calculadoraml.oriavision.com.ar"
                target="_blank"
                rel="noreferrer"
                onClick={close}
                className="mt-2 w-full text-center bg-brand-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-brand-700 transition-colors"
              >
                CALCULADORA ML
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
