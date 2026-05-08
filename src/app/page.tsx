import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Calculator,
  CheckCircle2,
  Database,
  FileText,
  Globe2,
  LayoutTemplate,
  MessageCircle,
  MonitorSmartphone,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";
import LeadMagnet from "@/components/LeadMagnet";
import TrackLink from "@/components/TrackLink";
import ResourceSearch from "@/components/ResourceSearch";
import { getAllPromptsMerged, getAllGuidesMerged } from "@/lib/content";

const SITE_URL = "https://www.oriavision.com.ar";
const CALC_URL = "https://calculadoraml.oriavision.com.ar";
const ORIENTADOR_URL = "https://www.orientadordepreciosml.oriavision.com.ar/";

export const metadata: Metadata = {
  title: "Oriavision | Soluciones digitales para vender mejor online",
  description:
    "Herramientas para MercadoLibre, recursos gratuitos y desarrollo de páginas web profesionales para negocios que quieren vender mejor online.",
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: "Oriavision | Soluciones digitales para vender mejor online",
    description:
      "Herramientas, recursos y páginas web pensadas desde la experiencia real de venta online.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Oriavision",
      },
    ],
  },
  twitter: {
    title: "Oriavision | Soluciones digitales para vender mejor online",
    description:
      "Herramientas, recursos y páginas web pensadas desde la experiencia real de venta online.",
    images: ["/og/home.png"],
  },
};

const TEAM = [
  {
    name: "Edgardo A. Díaz",
    role: "E-commerce & MercadoLibre",
    bio: "18 años vendiendo online. Oriavision nace de problemas reales: precios, procesos, páginas y decisiones comerciales.",
    img: "/team/persona-1.jpg",
  },
  {
    name: "Analía L. Rodriguez",
    role: "Operaciones & Customer Success",
    bio: "Procesos simples, seguimiento claro y soporte humano para que cada solución se pueda usar sin fricción.",
    img: "/team/persona-2.jpg",
  },
  {
    name: "Damián E. Bengochea",
    role: "Desarrollo & Producto",
    bio: "Convierte ideas en herramientas rápidas, estables y fáciles de mantener, desde landings hasta sistemas con lógica propia.",
    img: "/team/persona-3.jpg",
  },
];

const STATS = [
  { value: "18+", label: "años vendiendo online" },
  { value: "3", label: "tiendas MercadoLibre" },
  { value: "100%", label: "experiencia real" },
];

const HOME_BLOCKS = [
  {
    icon: Calculator,
    title: "Herramientas ML",
    text: "Calculadoras, orientadores y soluciones prácticas para decidir precios y operar con más claridad.",
    href: "#herramientas",
    label: "Ver herramientas",
  },
  {
    icon: LayoutTemplate,
    title: "Desarrollo web",
    text: "Landing pages, sistemas simples, branding visual y páginas profesionales para convertir mejor.",
    href: "#servicios",
    label: "Ver servicios",
  },
];

const SERVICES = [
  {
    icon: LayoutTemplate,
    title: "Landing pages",
    text: "Una página enfocada en una oferta concreta: presentar, explicar, captar leads y llevar a WhatsApp o formulario.",
  },
  {
    icon: Globe2,
    title: "Webs profesionales",
    text: "Sitios claros, modernos y rápidos para negocios que necesitan una carta de presentación sólida y confiable.",
  },
  {
    icon: Database,
    title: "Sistemas web simples",
    text: "Soluciones con formularios, login, paneles, base de datos o automatizaciones cuando una web común queda corta.",
  },
];

const PORTFOLIO = [
  {
    title: "Siempre de Guardia",
    tag: "Servicios locales",
    text: "Rediseño orientado a claridad, confianza y captación por especialidad.",
    img: "/portfolio/siempredeguardia.png",
  },
  {
    title: "Quirvo",
    tag: "Producto digital",
    text: "Landing para explicar un sistema QR de acceso simple, moderno y sin fricción.",
    img: "/portfolio/quirvo.png",
  },
  {
    title: "Calculadora ML",
    tag: "Herramienta SaaS",
    text: "Producto propio para estimar precios de MercadoLibre contemplando costos reales.",
    img: "/portfolio/calculadora-landing.png",
  },
];

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Oriavision",
  url: SITE_URL,
  description:
    "Herramientas para MercadoLibre, recursos gratuitos y páginas web profesionales para vender mejor online.",
  inLanguage: "es-AR",
};

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <Reveal>
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-brand-700">
          {eyebrow}
        </span>

        <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
          {title}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
          {text}
        </p>
      </div>
    </Reveal>
  );
}

export default function Home() {
  const whatsappHref =
    "https://wa.me/5491127575675?text=Hola%20Oriavision%21%20Vi%20la%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n.%20%C2%BFMe%20ayudan%3F";

  const prompts = getAllPromptsMerged();
  const guides = getAllGuidesMerged();

  const previewPrompts = (
    prompts.filter((p) => p.featured).length
      ? prompts.filter((p) => p.featured)
      : prompts
  ).slice(0, 2);

  const previewGuides = (
    guides.filter((g) => g.featured).length
      ? guides.filter((g) => g.featured)
      : guides
  ).slice(0, 2);

  const searchItems = [
    ...prompts.map((p) => ({
      type: "Prompt" as const,
      title: p.title,
      description: p.description,
      category: p.category,
      href: `/prompts/${p.id}/`,
    })),
    ...guides.map((g) => ({
      type: "Guía" as const,
      title: g.title,
      description: g.description,
      category: g.category,
      href: `/guias/${g.id}/`,
    })),
  ];

  return (
    <div className="flex min-h-screen flex-col overflow-hidden pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />

      <TrackLink
        href={CALC_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir Calculadora ML"
        event="click_calc"
        place="floating_home"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] left-4 z-[70] inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 font-extrabold text-white shadow-2xl shadow-brand-900/20 transition hover:-translate-y-0.5 hover:bg-brand-700 sm:left-6 sm:bottom-[calc(env(safe-area-inset-bottom)+24px)]"
      >
        <Calculator className="h-5 w-5" />
        <span className="hidden sm:inline">Calculadora ML</span>
      </TrackLink>

      <TrackLink
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        event="click_whatsapp"
        place="floating_home"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] p-4 font-extrabold text-white shadow-2xl shadow-emerald-900/20 transition hover:-translate-y-0.5 sm:right-6 sm:bottom-[calc(env(safe-area-inset-bottom)+24px)] sm:px-5 sm:py-3"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </TrackLink>

      <section className="hero-grid relative bg-slate-950 px-4 pb-20 pt-12 text-white md:pb-28 md:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.35),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.22),transparent_26%),linear-gradient(180deg,rgba(15,23,42,0),rgba(2,6,23,0.92))]" />
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal delay={0.03}>
              <div className="mb-7 max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-4">
                <ResourceSearch items={searchItems} />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-white text-balance md:text-7xl">
                Soluciones digitales para vender mejor online.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 md:text-2xl">
                Creamos herramientas, recursos y páginas web para negocios que
                necesitan verse profesionales, calcular mejor y convertir con
                más claridad.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="#herramientas"
                  className="premium-button inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-950/30 transition hover:-translate-y-0.5"
                >
                  Explorar herramientas <ArrowRight className="h-5 w-5" />
                </a>

                <Link
                  href="/web/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Diseño web profesional
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
                  >
                    <div className="text-2xl font-black text-white">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-cyan-400/10 blur-2xl" />

            <div className="relative rounded-[2.2rem] border border-white/12 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-xl md:p-5">
              <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-white">
                      Panel Oriavision
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                      claridad para vender mejor
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="grid gap-4">
                  <a
                    href="#herramientas"
                    className="group block rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5 transition hover:-translate-y-0.5 hover:bg-cyan-300/15"
                  >
                    <div className="flex items-center gap-3">
                      <Calculator className="h-6 w-6 text-cyan-200" />
                      <div className="font-black text-white">
                        Precio ML estimado
                      </div>
                    </div>

                    <div className="mt-4 text-2xl font-black leading-tight text-white">
                      Calculadora y orientador de precios
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-3 text-sm font-semibold text-cyan-100">
                      <span>
                        Margen, comisión, impuestos y envío contemplados.
                      </span>
                      <ArrowRight className="h-4 w-4 flex-none transition group-hover:translate-x-1" />
                    </div>
                  </a>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <a
                      href="#herramientas"
                      className="group block rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                    >
                      <BarChart3 className="mb-4 h-6 w-6 text-emerald-300" />
                      <div className="text-2xl font-black leading-tight text-white">
                        Operar mejor
                      </div>

                      <div className="mt-1 flex items-center justify-between gap-3 text-sm font-semibold text-slate-400">
                        <span>calculadora y orientador</span>
                        <ArrowRight className="h-4 w-4 flex-none transition group-hover:translate-x-1" />
                      </div>
                    </a>

                    <a
                      href="#servicios"
                      className="group block rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                    >
                      <LayoutTemplate className="mb-4 h-6 w-6 text-cyan-200" />
                      <div className="text-2xl font-black leading-tight text-white">
                        Servicios
                      </div>

                      <div className="mt-1 flex items-center justify-between gap-3 text-sm font-semibold text-slate-400">
                        <span>páginas web y sistemas</span>
                        <ArrowRight className="h-4 w-4 flex-none transition group-hover:translate-x-1" />
                      </div>
                    </a>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                    <div className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">
                      Creado desde experiencia real
                    </div>

                    {[
                      "Venta online desde 2006",
                      "Uso diario de MercadoLibre",
                      "Herramientas pensadas para operar mejor",
                    ].map((item) => (
                      <div
                        key={item}
                        className="mb-3 flex items-center gap-3 last:mb-0"
                      >
                        <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                        <span className="text-sm font-bold text-slate-200">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 pt-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-2">
            {HOME_BLOCKS.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={0.04 + index * 0.04}>
                  <a
                    href={item.href}
                    className="group block h-full rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-100/70"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h2 className="text-2xl font-black text-slate-950">
                      {item.title}
                    </h2>

                    <p className="mt-3 font-medium leading-relaxed text-slate-600">
                      {item.text}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 font-black text-brand-700">
                      {item.label}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="herramientas" className="scroll-mt-24 bg-slate-50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Herramientas"
            title="Números claros antes de publicar."
            text="Dos productos propios pensados para vendedores de MercadoLibre: uno para calcular fino y otro para orientarte rápido con listas y oportunidades."
          />

          <div className="grid gap-7 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="group relative h-full overflow-hidden rounded-[2.4rem] border border-brand-100 bg-white p-8 shadow-xl shadow-brand-100/60 transition hover:-translate-y-1 md:p-10">
                <div className="absolute right-0 top-0 rounded-bl-3xl bg-brand-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
                  Principal
                </div>

                <Calculator className="h-12 w-12 text-brand-700" />

                <h3 className="mt-7 text-3xl font-black text-slate-950">
                  Calculadora ML
                </h3>

                <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">
                  Para calcular un precio de publicación contemplando costo,
                  IVA, margen, comisión, IIBB, envío y cuotas.
                </p>

                <ul className="mt-7 space-y-3">
                  {[
                    "Cálculo más preciso producto por producto",
                    "Desglose fácil de entender",
                    "Pensada para vendedores argentinos",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-bold text-slate-700"
                    >
                      <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>

                <TrackLink
                  href={CALC_URL}
                  target="_blank"
                  rel="noreferrer"
                  event="click_calc"
                  place="calculator_card_home"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-black text-white transition hover:bg-brand-700 sm:w-auto"
                >
                  Abrir calculadora <ArrowRight className="h-5 w-5" />
                </TrackLink>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="group relative h-full overflow-hidden rounded-[2.4rem] border border-brand-100 bg-white p-8 shadow-xl shadow-brand-100/60 transition hover:-translate-y-1 md:p-10">
                <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-cyan-200/30 blur-2xl" />

                <MonitorSmartphone className="relative h-12 w-12 text-brand-700" />

                <h3 className="relative mt-7 text-3xl font-black text-slate-950">
                  Orientador de precios ML
                </h3>

                <p className="relative mt-4 text-lg font-medium leading-relaxed text-slate-600">
                  Para trabajar con listas, mirar rápido si hay margen y
                  detectar productos que merecen análisis más profundo.
                </p>

                <ul className="relative mt-7 space-y-3">
                  {[
                    "Ideal para mirar muchos productos",
                    "Enfoque estimativo y práctico",
                    "Complementa a la Calculadora ML",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-bold text-slate-700"
                    >
                      <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>

                <TrackLink
                  href={ORIENTADOR_URL}
                  target="_blank"
                  rel="noreferrer"
                  event="click_orientador"
                  place="orientador_card_home"
                  className="relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white px-6 py-4 font-black text-brand-700 transition hover:bg-brand-50 sm:w-auto"
                >
                  Ver orientador <ArrowRight className="h-5 w-5" />
                </TrackLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="recursos-gratuitos" className="scroll-mt-24 bg-white px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Recursos gratuitos"
            title="Contenido útil para aplicar hoy."
            text="Prompts y guías creadas desde problemas reales de venta online, no desde teoría genérica."
          />

          <div className="grid gap-7 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="h-full rounded-[2.4rem] border border-slate-200 bg-slate-50 p-8 md:p-10">
                <FileText className="h-10 w-10 text-brand-700" />

                <h3 className="mt-5 text-3xl font-black text-slate-950">
                  Prompts
                </h3>

                <p className="mt-3 font-medium leading-relaxed text-slate-600">
                  Listos para copiar, adaptar y usar en análisis de productos,
                  publicaciones y decisiones de MercadoLibre.
                </p>

                <div className="mt-7 space-y-4">
                  {previewPrompts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/prompts/${p.id}/`}
                      className="group block rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <span className="text-xs font-black uppercase tracking-widest text-brand-700">
                        {p.category}
                      </span>

                      <h4 className="mt-2 text-lg font-black text-slate-950 group-hover:text-brand-700">
                        {p.title}
                      </h4>

                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                        {p.description}
                      </p>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/prompts/"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white transition hover:bg-brand-700"
                >
                  Ver todos los prompts <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-[2.4rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                <BookOpen className="h-10 w-10 text-brand-700" />

                <h3 className="mt-5 text-3xl font-black text-slate-950">
                  Guías
                </h3>

                <p className="mt-3 font-medium leading-relaxed text-slate-600">
                  Artículos simples, directos y accionables para tomar mejores
                  decisiones en e-commerce.
                </p>

                <div className="mt-7 space-y-4">
                  {previewGuides.map((g) => (
                    <Link
                      key={g.id}
                      href={`/guias/${g.id}/`}
                      className="group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      <span className="text-xs font-black uppercase tracking-widest text-brand-700">
                        {g.category}
                      </span>

                      <h4 className="mt-2 text-lg font-black text-slate-950 group-hover:text-brand-700">
                        {g.title}
                      </h4>

                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                        {g.description}
                      </p>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/guias/"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-6 py-3 font-black text-brand-700 transition hover:bg-brand-600 hover:text-white"
                >
                  Ver todas las guías <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="mt-10">
              <LeadMagnet />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="servicios" className="scroll-mt-24 bg-slate-950 px-4 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
                Servicios web
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight md:text-5xl">
                No hacemos “una web más”. Armamos una presencia digital que se
                entienda y convierta.
              </h2>

              <p className="mt-5 text-lg font-medium leading-relaxed text-slate-300">
                Diseño, copy, estructura, SEO base y criterio comercial. La web
                tiene que verse bien, pero también tiene que explicar, ordenar y
                vender.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.title} delay={0.05 + index * 0.05}>
                  <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]">
                    <Icon className="h-10 w-10 text-cyan-200" />

                    <h3 className="mt-5 text-2xl font-black text-white">
                      {service.title}
                    </h3>

                    <p className="mt-3 font-medium leading-relaxed text-slate-300">
                      {service.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.16}>
            <Link
              href="/web/"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              Ver servicios web <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="portfolio" className="scroll-mt-24 bg-white px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Portfolio"
            title="Proyectos que muestran criterio real."
            text="Casos propios y trabajos donde lo importante no es solo verse moderno: es que el mensaje sea claro y funcional."
          />

          <div className="grid gap-7 md:grid-cols-3">
            {PORTFOLIO.map((project, index) => (
              <Reveal key={project.title} delay={0.05 + index * 0.05}>
                <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-black uppercase tracking-widest text-brand-700">
                      {project.tag}
                    </span>

                    <h3 className="mt-2 text-2xl font-black text-slate-950">
                      {project.title}
                    </h3>

                    <p className="mt-3 font-medium leading-relaxed text-slate-600">
                      {project.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="scroll-mt-24 bg-slate-50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div className="sticky top-28 rounded-[2.4rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                <span className="text-sm font-black uppercase tracking-[0.22em] text-brand-700">
                  Sobre Oriavision
                </span>

                <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                  Vendemos online. Por eso diseñamos distinto.
                </h2>

                <p className="mt-5 text-lg font-medium leading-relaxed text-slate-600">
                  La diferencia no está solo en saber diseñar o programar. Está
                  en entender qué necesita ver una persona para confiar,
                  consultar, comprar o tomar una decisión.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Experiencia real en MercadoLibre y e-commerce",
                    "Diseño con foco comercial, no decorativo",
                    "Soluciones simples, rápidas y mantenibles",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 font-bold text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-brand-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
              {TEAM.map((person, index) => (
                <Reveal key={person.name} delay={0.05 + index * 0.05}>
                  <article className="flex h-full flex-col gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
                    <div className="relative h-24 w-24 flex-none overflow-hidden rounded-3xl bg-slate-100">
                      <Image
                        src={person.img}
                        alt={person.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-950">
                        {person.name}
                      </h3>

                      <div className="mt-1 text-sm font-black uppercase tracking-wide text-brand-700">
                        {person.role}
                      </div>

                      <p className="mt-2 font-medium leading-relaxed text-slate-600">
                        {person.bio}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-600 px-4 py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              ¿Querés que tu negocio se vea más profesional y funcione mejor?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-blue-50">
              Podemos empezar por una landing, mejorar tu sitio actual o pensar
              una herramienta simple que te ahorre tiempo.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/web/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-brand-700 transition hover:-translate-y-0.5"
              >
                Ver servicios <ArrowRight className="h-5 w-5" />
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Newsletter />
    </div>
  );
}