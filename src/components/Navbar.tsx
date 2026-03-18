"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Recursos gratuitos",
    items: [
      { label: "Prompts", href: "/prompts/" },
      { label: "Guías", href: "/guias/" },
    ],
  },
  {
    label: "Servicios",
    items: [
      { label: "Landing pages", href: "/web/" },
      { label: "Páginas web a medida", href: "/web/" },
    ],
  },
];

const PRIMARY_CTA = {
  label: "Calculadora ML",
  href: "https://calculadoraml.oriavision.com.ar",
};

function NavItemLink({
  item,
  onClick,
  className,
}: {
  item: NavItem;
  onClick?: () => void;
  className?: string;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={className}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} onClick={onClick} className={className}>
      {item.label}
    </Link>
  );
}

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
      <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Oriavisión">
            <Image
              src="/logo.png"
              alt="Oriavisión"
              width={220}
              height={60}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-extrabold uppercase tracking-wide text-slate-600 transition-colors hover:text-brand-600"
                >
                  <span>{group.label}</span>
                  <ChevronDown className="h-4 w-4 text-slate-500 transition-colors group-hover:text-brand-600" />
                </button>

                <div className="pointer-events-none absolute left-0 top-full z-50 translate-y-1 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="min-w-[260px] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                    {group.items.map((item) => (
                      <NavItemLink
                        key={item.href + item.label}
                        item={item}
                        className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-brand-600/20 bg-brand-50 px-5 py-2.5 text-sm font-extrabold text-brand-700 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
            >
              {PRIMARY_CTA.label}
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-brand-600/20 bg-brand-50 px-3 py-2 text-[11px] font-extrabold text-brand-700 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
            >
              {PRIMARY_CTA.label}
            </a>

            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition active:scale-95"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <button
            aria-label="Cerrar menú"
            onClick={close}
            className="absolute inset-0 bg-black/30"
          />

          <div className="absolute right-0 top-0 flex h-full w-[85vw] max-w-sm flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={close} className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Oriavisión"
                  width={180}
                  height={50}
                  className="h-10 w-auto"
                />
              </Link>
              <button
                onClick={close}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 space-y-8">
              {NAV_GROUPS.map((group) => (
                <div key={group.label}>
                  <div className="block text-sm font-extrabold uppercase tracking-wide text-slate-500">
                    {group.label}
                  </div>

                  <div className="mt-3 flex flex-col gap-3 pl-1">
                    {group.items.map((item) => (
                      <NavItemLink
                        key={item.href + item.label}
                        item={item}
                        onClick={close}
                        className="text-base font-extrabold text-slate-800"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={PRIMARY_CTA.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-brand-600/20 bg-brand-50 px-6 py-3 text-sm font-extrabold text-brand-700 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
                onClick={close}
              >
                {PRIMARY_CTA.label}
              </a>
            </div>

            <div className="mt-auto pt-6 text-xs text-slate-400">
              © {new Date().getFullYear()} Oriavisión
            </div>
          </div>
        </div>
      )}
    </>
  );
}