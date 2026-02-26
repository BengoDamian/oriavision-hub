"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Herramientas", href: "/#herramientas" },
  { label: "Prompts", href: "/prompts" },
  { label: "Guías", href: "/guias" },
];

const PRIMARY_CTA = {
  label: "Calculadora ML",
  href: "https://calculadoraml.oriavision.com.ar",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Oriavisión">
            <Image src="/logo.png" alt="Oriavisión" width={220} height={60} priority className="h-10 sm:h-12 w-auto" />
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-extrabold text-slate-600 hover:text-brand-600 transition-colors uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}

            {/* CTA (sutil, siempre visible) */}
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-brand-600/20 bg-brand-50 px-5 py-2.5 text-sm font-extrabold text-brand-700 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-colors"
            >
              {PRIMARY_CTA.label}
            </a>
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-brand-600/20 bg-brand-50 px-3 py-2 text-[11px] font-extrabold text-brand-700 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-colors"
            >
              {PRIMARY_CTA.label}
            </a>

            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200 text-slate-800 active:scale-95 transition"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          <button aria-label="Cerrar menú" onClick={close} className="absolute inset-0 bg-black/30" />

          <div className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={close} className="flex items-center gap-3">
                <Image src="/logo.png" alt="Oriavisión" width={180} height={50} className="h-10 w-auto" />
              </Link>
              <button
                onClick={close}
                className="w-10 h-10 rounded-xl border border-slate-200 inline-flex items-center justify-center"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} onClick={close} className="text-base font-extrabold text-slate-800">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={PRIMARY_CTA.href}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center rounded-full border border-brand-600/20 bg-brand-50 px-6 py-3 text-sm font-extrabold text-brand-700 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-colors"
                onClick={close}
              >
                {PRIMARY_CTA.label}
              </a>
            </div>

            <div className="mt-auto pt-6 text-xs text-slate-400">© {new Date().getFullYear()} Oriavisión</div>
          </div>
        </div>
      )}
    </>
  );
}