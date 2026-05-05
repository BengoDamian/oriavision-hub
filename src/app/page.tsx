import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Database,
  MessageCircle,
  MonitorSmartphone,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";
import LeadMagnet from "@/components/LeadMagnet";
import TrackLink from "@/components/TrackLink";
import ResourceSearch from "@/components/ResourceSearch";
import TechDemoPanel from "@/components/TechDemoPanel";
import { getAllPromptsMerged, getAllGuidesMerged } from "@/lib/content";

const SITE_URL = "https://www.oriavision.com.ar";
const CALC_URL = "https://calculadoraml.oriavision.com.ar";
const ORIENTADOR_URL = "https://www.orientadordepreciosml.oriavision.com.ar/";

export const metadata: Metadata = {
  title: "Oriavision | Calculadora ML, prompts, guías y páginas web",
  description:
    "Calculadora ML, prompts, guías y páginas web a medida para vender mejor en MercadoLibre y e-commerce. Herramientas y recursos prácticos creados desde la experiencia real de venta.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: SITE_URL,
    title: "Oriavision | Calculadora ML, prompts, guías y páginas web",
    description:
      "Calculadora ML, prompts, guías y páginas web a medida para vender mejor en MercadoLibre y e-commerce.",
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
    title: "Oriavision | Calculadora ML, prompts, guías y páginas web",
    description:
      "Calculadora ML, prompts, guías y páginas web a medida para vender mejor en MercadoLibre y e-commerce.",
    images: ["/og/home.png"],
  },
};

const TEAM = [
  {
    name: "Edgardo A. Díaz",
    role: "Experto en MercadoLibre y Comercio Electrónico",
    bio: "18 años vendiendo en MercadoLibre. Fundador de ERCAS, AVTECNO y VDS. Creó Oriavision porque le faltaban herramientas que no existían.",
    img: "/team/persona-1.jpg",
  },
  {
    name: "Analía L. Rodriguez",
    role: "Operaciones & Customer Success Manager (CSM)",
    bio: "Se encarga de que todo funcione sin complicaciones. Procesos simples, soporte rápido y cero fricción.",
    img: "/team/persona-2.jpg",
  },
  {
    name: "Damián E. Bengochea",
    role: "Desarrollo & Producto (Full-stack)",
    bio: "Convierte ideas en herramientas que funcionan. Obsesionado con que sean rápidas, simples y confiables.",
    img: "/team/persona-3.jpg",
  },
];

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Oriavision",
  url: SITE_URL,
  description:
    "Calculadora ML, prompts, guías y páginas web a medida para vender mejor en MercadoLibre y e-commerce.",
  inLanguage: "es-AR",
};

export default function Home() {
  const whatsappHref =
    "https://wa.me/5491127575675?text=Hola%20Oriavision%21%20Vi%20la%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20y%20recursos.%20%C2%BFMe%20ayudan%3F";

  const prompts = getAllPromptsMerged();
  const guides = getAllGuidesMerged();

  const featuredPrompts = prompts.filter((p) => p.featured);
  const previewPrompts = (featuredPrompts.length ? featuredPrompts : prompts).slice(0, 3);

  const featuredGuides = guides.filter((g) => g.featured);
  const previewGuides = (featuredGuides.length ? featuredGuides : guides).slice(0, 3);

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
    <div className="flex min-h-screen flex-col overflow-x-clip pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageJsonLd),
        }}
      />

      <TrackLink
        href={CALC_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir Calculadora ML"
        event="click_calc"
        place="floating_home"
        className="pointer-events-auto fixed left-4 z-[70] inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 font-extrabold text-white opacity-90 shadow-2xl transition-opacity hover:opacity-100 active:opacity-100 sm:left-6 bottom-[calc(env(safe-area-inset-bottom)+16px)] sm:bottom-[calc(env(safe-area-inset-bottom)+24px)]"
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
        className="pointer-events-auto fixed right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] p-4 font-extrabold text-white opacity-95 shadow-2xl transition-opacity hover:opacity-100 active:opacity-100 sm:right-6 sm:px-5 sm:py-3 bottom-[calc(env(safe-area-inset-bottom)+16px)] sm:bottom-[calc(env(safe-area-inset-bottom)+24px)]"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </TrackLink>

      <section className="relative isolate overflow-hidden bg-[#041A3D] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-20rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute bottom-[-18rem] right-[-12rem] h-[38rem] w-[38rem] rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-[minmax(0,1.03fr)_minmax(340px,0.97fr)]">
          <div className="text-center md:text-left">
            <Reveal delay={0.03}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-sky-100 backdrop-blur">
                Hub tecnológico para vendedores reales
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 text-5xl font-black leading-[1.04] tracking-tight text-white text-balance md:text-7xl">
                Somos vendedores que <br className="hidden md:block" />
                <span className="relative inline-block text-sky-200">
                  crean soluciones.
                  <svg
                    className="absolute -bottom-2 left-0 h-3 w-full text-sky-300/65"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="7" fill="none" />
                  </svg>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-7 max-w-3xl text-xl font-medium leading-relaxed text-slate-200 text-balance md:mx-0 md:text-2xl">
                Construimos herramientas, landing pages, páginas web a medida y recursos prácticos para resolver problemas
                que vivimos todos los días vendiendo online.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap md:items-start">
                <a
                  href={CALC_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="premium-button flex w-full items-center justify-center gap-2 rounded-full bg-sky-300 px-9 py-4 text-base font-black uppercase tracking-wide text-brand-900 transition-all sm:w-auto"
                >
                  Abrir Calculadora ML
                  <ArrowRight className="h-5 w-5" />
                </a>

                <a
                  href="#herramientas"
                  className="premium-button-outline w-full rounded-full border border-white/15 bg-white/8 px-9 py-4 text-center text-base font-black uppercase tracking-wide text-white transition-all hover:border-sky-200/70 hover:bg-white/12 sm:w-auto"
                >
                  Ver herramientas
                </a>

                <a
                  href="#recursos-gratuitos"
                  className="premium-button-outline w-full rounded-full border border-white/15 bg-white/8 px-9 py-4 text-center text-base font-black uppercase tracking-wide text-white transition-all hover:border-sky-200/70 hover:bg-white/12 sm:w-auto"
                >
                  Recursos gratis
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 grid gap-3 text-left sm:grid-cols-3">
                {[
                  "Animaciones suaves",
                  "Rápido en celulares",
                  "Sin humo ni fricción",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
                    <CheckCircle2 className="mb-2 h-5 w-5 text-emerald-300" />
                    <span className="text-sm font-extrabold text-slate-100">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} y={20} className="md:justify-self-end">
            <TechDemoPanel />
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-4 md:mt-14">
          <Reveal delay={0.2}>
            <div className="mx-auto max-w-3xl">
              <ResourceSearch items={searchItems} />
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <LeadMagnet />
          </Reveal>
        </div>
      </section>

      <section id="herramientas" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-brand-700 shadow-sm">
                Herramientas Oriavision
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                Calculá mejor. Decidí más rápido.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-textBody">
                Herramientas creadas para ayudarte a vender mejor, calcular más rápido y tomar decisiones con más claridad.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="tech-section-card card-hover-premium group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-8 shadow-lg shadow-blue-50 transition-all duration-300">
                <div className="relative z-10">
                  <div className="absolute right-0 top-0 rounded-bl-2xl bg-brand-600 px-4 py-2 text-xs font-bold text-white">
                    MÁS USADA
                  </div>

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-brand-600 transition-transform group-hover:scale-[1.06]">
                    <Calculator className="h-8 w-8" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-slate-900">Calculadora ML</h3>
                  <p className="mb-8 flex-grow font-medium leading-relaxed text-textBody">
                    Calculá tu precio exacto en segundos. Incluye costos, comisiones de plataforma, impuestos y opciones
                    de cuotas para ver tu ganancia real.
                  </p>

                  <TrackLink
                    href={CALC_URL}
                    target="_blank"
                    rel="noreferrer"
                    event="click_calc"
                    place="calculator_card_home"
                    className="premium-button mt-auto block w-full rounded-xl bg-brand-600 py-3 text-center text-sm font-bold uppercase text-white transition-all hover:bg-brand-700"
                  >
                    Abrir calculadora
                  </TrackLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="tech-section-card card-hover-premium group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-violet-100 bg-white p-8 shadow-lg shadow-violet-50 transition-all duration-300">
                <div className="relative z-10">
                  <div className="absolute right-0 top-0 rounded-bl-2xl bg-violet-600 px-4 py-2 text-xs font-bold text-white">
                    NUEVA
                  </div>

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition-transform group-hover:scale-[1.06]">
                    <MonitorSmartphone className="h-8 w-8" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-slate-900">Orientador de precios ML</h3>
                  <p className="mb-8 flex-grow font-medium leading-relaxed text-textBody">
                    Una herramienta pensada para orientarte rápidamente con tus precios de venta en MercadoLibre y detectar
                    oportunidades de forma más simple.
                  </p>

                  <TrackLink
                    href={ORIENTADOR_URL}
                    target="_blank"
                    rel="noreferrer"
                    event="click_orientador"
                    place="orientador_card_home"
                    className="premium-button mt-auto block w-full rounded-xl bg-violet-600 py-3 text-center text-sm font-bold uppercase text-white transition-all hover:bg-violet-700"
                  >
                    Ver orientador
                  </TrackLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="recursos-gratuitos" className="scroll-mt-24 border-y border-slate-200 bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-brand-700">
                Biblioteca gratuita
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                Recursos gratuitos
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-textBody">
                Contenido listo para leer, copiar y aplicar. Sin vueltas y sin humo.
              </p>
            </div>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={0.04}>
              <div className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm md:p-10">
                <div className="mx-auto max-w-3xl text-center">
                  <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-brand-700">
                    Recursos para copiar y usar
                  </span>

                  <h3 className="mt-5 text-2xl font-black text-slate-900 md:text-3xl">Prompts</h3>

                  <p className="mt-3 font-medium text-textBody">
                    Entrás, leés el prompt completo y lo copiás con un botón. Listo para usar.
                  </p>
                </div>

                {previewPrompts.length > 0 && (
                  <div className="mt-10">
                    <div className="mx-auto max-w-4xl">
                      <Link
                        href={`/prompts/${previewPrompts[0].id}/`}
                        className="card-hover-premium group block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all md:p-10"
                      >
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                          {previewPrompts[0].category}
                        </div>

                        <h4 className="mt-5 max-w-2xl text-2xl font-black leading-tight text-slate-900 transition-colors group-hover:text-brand-700 md:text-3xl">
                          {previewPrompts[0].title}
                        </h4>

                        <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-textBody md:text-lg">
                          {previewPrompts[0].description}
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 font-extrabold text-brand-600">
                          Ver prompt <ArrowRight className="h-4 w-4" />
                        </div>
                      </Link>
                    </div>

                    {previewPrompts.length > 1 && (
                      <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {previewPrompts.slice(1, 3).map((p, i) => (
                          <Reveal key={p.id} delay={0.06 + i * 0.04}>
                            <Link
                              href={`/prompts/${p.id}/`}
                              className="card-hover-premium group block rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all"
                            >
                              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-brand-700">
                                {p.category}
                              </div>

                              <h5 className="mt-4 text-xl font-black leading-tight text-slate-900 transition-colors group-hover:text-brand-700">
                                {p.title}
                              </h5>

                              <p className="mt-3 font-medium leading-relaxed text-textBody">{p.description}</p>

                              <div className="mt-5 inline-flex items-center gap-2 font-extrabold text-brand-600">
                                Ver prompt <ArrowRight className="h-4 w-4" />
                              </div>
                            </Link>
                          </Reveal>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-10 text-center">
                  <Link
                    href="/prompts/"
                    className="premium-button inline-flex items-center justify-center rounded-full bg-brand-600 px-10 py-4 text-lg font-bold text-white transition-all hover:bg-brand-700"
                  >
                    Ver todos los prompts
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-8 shadow-sm md:p-10">
                <div className="mx-auto max-w-3xl text-center">
                  <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-brand-700">
                    Recursos para aplicar al toque
                  </span>

                  <h3 className="mt-5 text-2xl font-black text-slate-900 md:text-3xl">Guías</h3>

                  <p className="mt-3 font-medium text-textBody">
                    Guías claras y accionables. Entrás, leés y lo aplicás al toque.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-6">
                  {previewGuides.map((g, i) => (
                    <Reveal key={g.id} delay={0.05 + i * 0.05} className="w-full md:max-w-[320px]">
                      <Link
                        href={`/guias/${g.id}/`}
                        className="card-hover-premium group block h-full rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all"
                      >
                        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-brand-700">
                          {g.category}
                        </div>

                        <h4 className="mt-4 text-xl font-black leading-tight text-slate-900 transition-colors group-hover:text-brand-700">
                          {g.title}
                        </h4>

                        <p className="mt-3 font-medium leading-relaxed text-textBody">{g.description}</p>

                        <div className="mt-5 inline-flex items-center gap-2 font-extrabold text-brand-600">
                          Ver guía <ArrowRight className="h-4 w-4" />
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <Link
                    href="/guias/"
                    className="premium-button inline-flex items-center justify-center rounded-full bg-brand-600 px-10 py-4 text-lg font-bold text-white transition-all hover:bg-brand-700"
                  >
                    Ver todas las guías
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="servicios" className="scroll-mt-24 bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-brand-700 shadow-sm">
                Servicios web
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                Páginas pensadas para vender
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-textBody">
                También desarrollamos páginas orientadas a vender mejor: desde una landing simple hasta una web completa
                con lógica, login y base de datos.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="card-hover-premium flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-brand-600">
                  <MonitorSmartphone className="h-8 w-8" />
                </div>

                <h3 className="mb-3 text-2xl font-black text-slate-900">Landing pages</h3>
                <p className="mb-8 flex-grow font-medium leading-relaxed text-textBody">
                  Páginas simples, rápidas y enfocadas en conversión. Ideales para presentar un servicio, captar leads
                  o dirigir a WhatsApp, formulario o checkout.
                </p>

                <Link
                  href="/web/"
                  className="mt-auto inline-flex items-center justify-center rounded-xl border-2 border-brand-600 py-3 text-center text-sm font-bold uppercase text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  Ver servicio
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card-hover-premium flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-brand-600">
                  <Database className="h-8 w-8" />
                </div>

                <h3 className="mb-3 text-2xl font-black text-slate-900">Páginas web a medida</h3>
                <p className="mb-8 flex-grow font-medium leading-relaxed text-textBody">
                  Sitios y aplicaciones más completos, con registro, login, paneles, base de datos y funcionalidades
                  específicas según lo que necesite tu proyecto.
                </p>

                <Link
                  href="/web/"
                  className="mt-auto inline-flex items-center justify-center rounded-xl border-2 border-brand-600 py-3 text-center text-sm font-bold uppercase text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  Ver servicio
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="nosotros" className="scroll-mt-24 overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="flex-1">
              <Reveal>
                <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-brand-600">
                  Sobre Oriavision
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="mb-8 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
                  Vendedores Desde 2006. Herramientas Desde <span className="text-brand-600">2024.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-6 text-lg font-medium leading-relaxed text-textBody">
                  <p>
                    No somos una agencia ni consultores de marketing. Somos un equipo que lleva 18 años vendiendo en
                    MercadoLibre y Tiendanube. Después de perder tiempo con Excel y otros programas, construimos las
                    herramientas que nos faltaban.
                  </p>
                  <p>Funcionaron tan bien que decidimos compartirlas. Simple.</p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10 space-y-4">
                  {[
                    { title: "Datos que no mienten", subtitle: "Cálculos precisos con tarifas actualizadas" },
                    { title: "Ganancia real, no vanity metrics", subtitle: "Rentabilidad neta, no ventas brutas" },
                    { title: "Soporte que entiende", subtitle: "Equipo local que vende como vos" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-brand-600" />
                      <div>
                        <span className="block font-bold text-slate-900">{item.title}</span>
                        <span className="text-sm text-textBody">{item.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="relative flex-1" delay={0.08}>
              <div className="absolute -inset-4 rotate-3 rounded-[3rem] bg-brand-600 opacity-10" />
              <div className="relative rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl md:p-14">
                <div className="mb-2 text-6xl font-black text-brand-400">100%</div>
                <div className="mb-8 text-2xl font-bold">Enfoque Analítico</div>
                <p className="mb-8 leading-relaxed text-slate-200">
                  &quot;Vendemos todos los días. Sabemos que sin números claros, se pierde plata. Por eso creamos herramientas
                  que eliminan el error humano y te muestran la realidad.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white ring-2 ring-slate-700/40 shadow-sm">
                    <Image src="/logo.png" alt="Oriavision" fill sizes="48px" className="object-contain p-1" />
                  </div>
                  <div>
                    <div className="font-bold">Equipo Oriavision</div>
                    <div className="text-sm text-slate-300">Buenos Aires, AR</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <div className="mb-10 text-center">
                <h3 className="text-2xl font-black text-slate-900 md:text-3xl">Quiénes somos</h3>
                <p className="mt-3 font-medium text-textBody">
                  Un equipo chico, obsesionado con vender mejor y con menos errores.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {TEAM.map((p, i) => (
                <Reveal key={p.name} delay={0.05 + i * 0.06}>
                  <div className="card-hover-premium rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative h-28 w-28">
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-600/25 to-slate-200/60" />
                        <div className="relative h-28 w-28 rounded-full bg-white p-1 shadow-lg">
                          <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white">
                            <Image src={p.img} alt={p.name} fill sizes="112px" className="object-cover" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="text-xl font-black text-slate-900">{p.name}</div>
                        <div className="mt-1 text-sm font-extrabold uppercase tracking-wide text-brand-600">
                          {p.role}
                        </div>
                        <p className="mt-3 font-medium leading-relaxed text-textBody">{p.bio}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-brand-50 px-4 py-20 text-center">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-black text-slate-900">
              ¿Necesitás una landing o una web a medida?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-textBody">
              Si querés una página clara, rápida y pensada para vender, escribinos y vemos qué formato te conviene.
            </p>

            <Link
              href="/web/"
              className="premium-button inline-block rounded-full bg-white px-8 py-3 font-bold text-slate-900 transition-all hover:text-brand-700"
            >
              VER SERVICIO WEB
            </Link>
          </div>
        </Reveal>
      </section>

      <Newsletter />
    </div>
  );
}
