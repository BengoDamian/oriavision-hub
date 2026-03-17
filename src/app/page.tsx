// src/app/page.tsx

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
import Blob from "@/components/Blob";
import Newsletter from "@/components/Newsletter";
import LeadMagnet from "@/components/LeadMagnet";
import TrackLink from "@/components/TrackLink";
import { getAllPromptsMerged, getAllGuidesMerged } from "@/lib/content";

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

export default function Home() {
  const whatsappHref =
    "https://wa.me/5491127575675?text=Hola%20OriaVisi%C3%B3n%21%20Vi%20la%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20y%20recursos.%20%C2%BFMe%20ayudan%3F";

  const calcHref = "https://calculadoraml.oriavision.com.ar";

  const prompts = getAllPromptsMerged();
  const guides = getAllGuidesMerged();

  const featuredPrompts = prompts.filter((p) => p.featured);
  const previewPrompts = (featuredPrompts.length ? featuredPrompts : prompts).slice(0, 3);

  const featuredGuides = guides.filter((g) => g.featured);
  const previewGuides = (featuredGuides.length ? featuredGuides : guides).slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col pb-28">
      {/* Floating Calculadora ML (abajo izquierda) */}
      <TrackLink
        href={calcHref}
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

      {/* Floating WhatsApp (abajo derecha) */}
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

      {/* HERO */}
      <section className="relative overflow-hidden bg-white pb-20 pt-24 md:pb-32 md:pt-32">
        <Blob />

        <div className="mx-auto max-w-6xl px-4 text-center">
          <Reveal delay={0.05}>
            <h1 className="mb-8 text-5xl font-black leading-[1.1] tracking-tight text-slate-900 text-balance md:text-7xl">
              Somos vendedores que <br className="hidden md:block" />
              <span className="relative inline-block text-brand-600">
                Creamos soluciones.
                <svg
                  className="absolute -bottom-1 left-0 -z-10 h-3 w-full text-yellow-300"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mb-10 max-w-3xl text-xl font-medium leading-relaxed text-textBody text-balance md:text-2xl">
              Construimos lo que necesitábamos para vender mejor. Herramientas, landing pages, páginas web a medida y
              recursos reales para problemas que vivimos todos los días.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <a
                href={calcHref}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-blue-200 transition-all hover:bg-brand-700 sm:w-auto"
              >
                ABRIR CALCULADORA ML
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="#servicios"
                className="w-full rounded-full border-2 border-slate-200 bg-white px-10 py-4 text-lg font-bold text-textBody transition-all hover:border-brand-600 hover:text-brand-600 sm:w-auto"
              >
                VER SERVICIOS
              </a>

              <a
                href="#recursos-gratuitos"
                className="w-full rounded-full border-2 border-slate-200 bg-white px-10 py-4 text-lg font-bold text-textBody transition-all hover:border-brand-600 hover:text-brand-600 sm:w-auto"
              >
                VER RECURSOS GRATUITOS
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <LeadMagnet />
          </Reveal>
        </div>
      </section>

      {/* CALCULADORA ML */}
      <section id="calculadora-ml" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                Calculadora ML
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-textBody">
                Nuestra herramienta principal para calcular precios, costos, comisiones, impuestos y rentabilidad real.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border-2 border-blue-100 bg-white p-8 shadow-lg shadow-blue-50 transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-xl">
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
                  href={calcHref}
                  target="_blank"
                  rel="noreferrer"
                  event="click_calc"
                  place="calculator_card_home"
                  className="mt-auto block w-full rounded-xl border-2 border-brand-600 py-3 text-center text-sm font-bold uppercase text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  Abrir calculadora
                </TrackLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="scroll-mt-24 bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                Servicios
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-textBody">
                También desarrollamos páginas orientadas a vender mejor: desde una landing simple hasta una web completa
                con lógica, login y base de datos.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
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
              <div className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
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

      {/* RECURSOS GRATUITOS */}
      <section id="recursos-gratuitos" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                Recursos gratuitos
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-textBody">
                Contenido listo para leer, copiar y aplicar. Sin vueltas y sin humo.
              </p>
            </div>
          </Reveal>

          <div className="space-y-20">
            {/* PROMPTS */}
            <div>
              <Reveal>
                <div className="mb-10 text-center">
                  <h3 className="text-2xl font-black text-slate-900 md:text-3xl">Prompts</h3>
                  <p className="mt-3 font-medium text-textBody">
                    Entrás, leés el prompt completo y lo copiás con un botón. Listo para usar.
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {previewPrompts.map((p, i) => (
                  <Reveal key={p.id} delay={0.05 + i * 0.05}>
                    <Link
                      href={`/prompts/${p.id}/`}
                      className="group block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                        {p.category}
                      </div>

                      <h3 className="mt-4 text-2xl font-black text-slate-900 transition-colors group-hover:text-brand-700">
                        {p.title}
                      </h3>

                      <p className="mt-3 font-medium leading-relaxed text-textBody">{p.description}</p>

                      <div className="mt-6 inline-flex items-center gap-2 font-extrabold text-brand-600">
                        Ver prompt <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.18}>
                <div className="mt-12 text-center">
                  <Link
                    href="/prompts/"
                    className="inline-flex items-center justify-center rounded-full bg-brand-600 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-blue-200 transition-all hover:bg-brand-700"
                  >
                    Ver todos los prompts
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* GUÍAS */}
            <div>
              <Reveal>
                <div className="mb-10 text-center">
                  <h3 className="text-2xl font-black text-slate-900 md:text-3xl">Guías</h3>
                  <p className="mt-3 font-medium text-textBody">
                    Guías claras y accionables. Entrás, leés y lo aplicás al toque.
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {previewGuides.map((g, i) => (
                  <Reveal key={g.id} delay={0.05 + i * 0.05}>
                    <Link
                      href={`/guias/${g.id}/`}
                      className="group block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                        {g.category}
                      </div>

                      <h3 className="mt-4 text-2xl font-black text-slate-900 transition-colors group-hover:text-brand-700">
                        {g.title}
                      </h3>

                      <p className="mt-3 font-medium leading-relaxed text-textBody">{g.description}</p>

                      <div className="mt-6 inline-flex items-center gap-2 font-extrabold text-brand-600">
                        Ver guía <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.18}>
                <div className="mt-12 text-center">
                  <Link
                    href="/guias/"
                    className="inline-flex items-center justify-center rounded-full bg-brand-600 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-blue-200 transition-all hover:bg-brand-700"
                  >
                    Ver todas las guías
                  </Link>

                  <div className="mt-4 text-sm font-semibold text-textBody">
                    Y cuando quieras cerrar bien el número, abrí{" "}
                    <TrackLink
                      href={calcHref}
                      target="_blank"
                      rel="noreferrer"
                      event="click_calc"
                      place="resources_home"
                      className="font-extrabold text-brand-600 hover:text-brand-700"
                    >
                      Calculadora ML →
                    </TrackLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
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
                  "Vendemos todos los días. Sabemos que sin números claros, se pierde plata. Por eso creamos herramientas
                  que eliminan el error humano y te muestran la realidad."
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
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
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

      {/* CTA FINAL */}
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
              className="inline-block rounded-full border-2 border-slate-200 bg-white px-8 py-3 font-bold text-slate-900 transition-colors hover:border-brand-600"
            >
              VER SERVICIO WEB
            </Link>
          </div>
        </Reveal>
      </section>

      {/* LINK SUTIL (al final) */}
      <section className="border-t border-slate-200 bg-white px-4 py-10">
        <Reveal>
          <div className="mx-auto flex max-w-6xl items-center justify-center">
            <Link href="/web/" className="text-sm font-extrabold text-slate-600 transition-colors hover:text-brand-600">
              ¿Te gustó la página? Pedí una landing o una web a medida →
            </Link>
          </div>
        </Reveal>
      </section>

      <Newsletter />
    </main>
  );
}