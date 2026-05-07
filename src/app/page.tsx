import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  FileText,
  LibraryBig,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import Newsletter from "@/components/Newsletter";
import TrackLink from "@/components/TrackLink";
import OriavisionScrollHero, {
  type HomeSearchItem,
} from "@/components/OriavisionScrollHero";
import { getAllPromptsMerged, getAllGuidesMerged } from "@/lib/content";

const SITE_URL = "https://www.oriavision.com.ar";
const CALC_URL = "https://calculadoraml.oriavision.com.ar";
const ORIENTADOR_URL = "https://www.orientadordepreciosml.oriavision.com.ar/";

export const metadata: Metadata = {
  title: "Oriavision | Herramientas, recursos y diseño web para vender mejor online",
  description:
    "Herramientas para MercadoLibre, recursos gratuitos y diseño web profesional para negocios que quieren vender mejor online.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: SITE_URL,
    title: "Oriavision | Herramientas, recursos y diseño web",
    description:
      "Herramientas para MercadoLibre, recursos gratuitos y diseño web profesional para vender mejor online.",
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
    title: "Oriavision | Herramientas, recursos y diseño web",
    description:
      "Herramientas para MercadoLibre, recursos gratuitos y diseño web profesional para vender mejor online.",
    images: ["/og/home.png"],
  },
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Oriavision",
  url: SITE_URL,
  description:
    "Herramientas para MercadoLibre, recursos gratuitos y diseño web profesional para vender mejor online.",
  inLanguage: "es-AR",
};

function buildSearchItems(
  prompts: ReturnType<typeof getAllPromptsMerged>,
  guides: ReturnType<typeof getAllGuidesMerged>
): HomeSearchItem[] {
  return [
    {
      type: "Herramienta",
      title: "Calculadora ML",
      description:
        "Calculá precios contemplando margen, comisión, impuestos y envío.",
      category: "Precio y margen",
      href: CALC_URL,
      external: true,
    },
    {
      type: "Herramienta",
      title: "Orientador de precios ML",
      description:
        "Revisá productos por lote y tomá decisiones rápidas sin perder criterio comercial.",
      category: "Precio por lote",
      href: ORIENTADOR_URL,
      external: true,
    },
    {
      type: "Servicio",
      title: "Diseño web profesional",
      description:
        "Landing pages, páginas web y sistemas simples para mostrar mejor y convertir más.",
      category: "Web",
      href: "/web/",
    },
    ...prompts.map((prompt) => ({
      type: "Prompt" as const,
      title: prompt.title,
      description: prompt.description,
      category: prompt.category,
      href: `/prompts/${prompt.id}/`,
    })),
    ...guides.map((guide) => ({
      type: "Guía" as const,
      title: guide.title,
      description: guide.description,
      category: guide.category,
      href: `/guias/${guide.id}/`,
    })),
  ];
}

export default function Home() {
  const whatsappHref =
    "https://wa.me/5491127575675?text=Hola%20Oriavision%21%20Vi%20la%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n.%20%C2%BFMe%20ayudan%3F";

  const prompts = getAllPromptsMerged();
  const guides = getAllGuidesMerged();

  const featuredPrompts = prompts.filter((prompt) => prompt.featured);
  const previewPrompts = (featuredPrompts.length ? featuredPrompts : prompts).slice(0, 3);

  const featuredGuides = guides.filter((guide) => guide.featured);
  const previewGuides = (featuredGuides.length ? featuredGuides : guides).slice(0, 3);

  const searchItems = buildSearchItems(prompts, guides);

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
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
        className="pointer-events-auto fixed right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 font-extrabold text-white opacity-95 shadow-2xl transition-opacity hover:opacity-100 sm:right-6 bottom-[calc(env(safe-area-inset-bottom)+16px)] sm:bottom-[calc(env(safe-area-inset-bottom)+24px)]"
      >
        <span>WhatsApp</span>
      </TrackLink>

      <OriavisionScrollHero items={searchItems} calcUrl={CALC_URL} />

      <section id="ecosistema" className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <div className="max-w-3xl" data-ov-reveal>
          <span className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-cyan-800">
            Ecosistema Oriavision
          </span>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Tres caminos, un mismo objetivo: vender mejor online.
          </h2>

          <p className="mt-5 text-lg font-semibold leading-relaxed text-slate-700">
            Primero entendés qué hacemos. Después explorás herramientas, recursos y servicios sin perder el foco.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Calculator,
              title: "Herramientas ML",
              text: "Calculadoras, orientadores y soluciones prácticas para decidir precios y operar con más claridad.",
              href: "#herramientas",
              label: "Ver herramientas",
              tone: "from-cyan-50 to-white text-cyan-700",
            },
            {
              icon: FileText,
              title: "Recursos gratuitos",
              text: "Prompts, guías y contenido útil para atraer tráfico, generar autoridad y ordenar ideas.",
              href: "#recursos-gratuitos",
              label: "Ver recursos",
              tone: "from-white to-slate-50 text-slate-800",
            },
            {
              icon: MonitorSmartphone,
              title: "Diseño web profesional",
              text: "Landing pages, sitios profesionales y sistemas simples para mostrar mejor y convertir consultas.",
              href: "#servicios",
              label: "Ver servicios",
              tone: "from-blue-50 to-white text-brand-700",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              data-ov-reveal
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone}`}>
                <item.icon className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-black tracking-tight text-slate-950">
                {item.title}
              </h3>

              <p className="mt-3 font-medium leading-relaxed text-slate-700">
                {item.text}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-700">
                {item.label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>

              <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-200/20 blur-2xl transition duration-300 group-hover:bg-cyan-300/30" />
            </Link>
          ))}
        </div>
      </section>

      <section id="herramientas" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl" data-ov-reveal>
            <span className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-cyan-800">
              Herramientas
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Números claros antes de publicar.
            </h2>

            <p className="mt-5 text-lg font-semibold leading-relaxed text-slate-700">
              Herramientas simples para decidir precios con más criterio antes de vender.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article
              className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-cyan-50 p-8 shadow-sm"
              data-ov-reveal
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <Calculator className="h-6 w-6" />
              </div>

              <h3 className="text-2xl font-black tracking-tight text-slate-950">
                Calculadora ML
              </h3>

              <p className="mt-3 font-medium leading-relaxed text-slate-700">
                Calculá precio de venta contemplando margen, comisión, impuestos y envío antes de publicar.
              </p>

              <a
                href={CALC_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-extrabold text-white"
              >
                Abrir calculadora <ArrowRight className="h-4 w-4" />
              </a>
            </article>

            <article
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              data-ov-reveal
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
                <MonitorSmartphone className="h-6 w-6" />
              </div>

              <h3 className="text-2xl font-black tracking-tight text-slate-950">
                Orientador de precios ML
              </h3>

              <p className="mt-3 font-medium leading-relaxed text-slate-700">
                Revisá productos por lote y tomá decisiones rápidas sin perder criterio comercial.
              </p>

              <a
                href={ORIENTADOR_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-extrabold text-slate-800"
              >
                Ver orientador <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="recursos-gratuitos" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl" data-ov-reveal>
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-brand-700">
              Recursos gratuitos
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Contenido útil para vender con más criterio.
            </h2>

            <p className="mt-5 text-lg font-semibold leading-relaxed text-slate-700">
              Prompts y guías para atraer tráfico, ordenar ideas y generar autoridad.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <section
              id="prompts"
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
              data-ov-reveal
            >
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-800">
                    Prompts
                  </span>

                  <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                    Prompts listos para usar
                  </h3>

                  <p className="mt-3 font-medium leading-relaxed text-slate-700">
                    Para mejorar publicaciones, analizar competencia, crear contenido y ordenar decisiones.
                  </p>
                </div>

                <Sparkles className="h-8 w-8 shrink-0 text-cyan-500" />
              </div>

              <div className="space-y-4">
                {previewPrompts.length ? (
                  previewPrompts.map((prompt) => (
                    <Link
                      key={prompt.id}
                      href={`/prompts/${prompt.id}/`}
                      className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-brand-200 hover:bg-white hover:shadow-sm"
                    >
                      <div className="text-[11px] font-black uppercase tracking-wide text-brand-700">
                        {prompt.category}
                      </div>

                      <h4 className="mt-2 text-lg font-black leading-tight text-slate-950">
                        {prompt.title}
                      </h4>

                      <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-slate-700">
                        {prompt.description}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-sm font-semibold text-slate-600">
                    Todavía no hay prompts publicados. Agregalos desde el admin.
                  </div>
                )}
              </div>

              <Link
                href="/prompts/"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-extrabold text-white"
              >
                Ver todos los prompts <ArrowRight className="h-4 w-4" />
              </Link>
            </section>

            <section
              id="guias"
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
              data-ov-reveal
            >
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                    Guías
                  </span>

                  <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                    Guías simples y prácticas
                  </h3>

                  <p className="mt-3 font-medium leading-relaxed text-slate-700">
                    Contenido claro para entender margen, publicaciones, herramientas y presencia digital.
                  </p>
                </div>

                <LibraryBig className="h-8 w-8 shrink-0 text-brand-600" />
              </div>

              <div className="space-y-4">
                {previewGuides.length ? (
                  previewGuides.map((guide) => (
                    <Link
                      key={guide.id}
                      href={`/guias/${guide.id}/`}
                      className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-brand-200 hover:bg-white hover:shadow-sm"
                    >
                      <div className="text-[11px] font-black uppercase tracking-wide text-brand-700">
                        {guide.category}
                      </div>

                      <h4 className="mt-2 text-lg font-black leading-tight text-slate-950">
                        {guide.title}
                      </h4>

                      <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-slate-700">
                        {guide.description}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-sm font-semibold text-slate-600">
                    Todavía no hay guías publicadas. Agregalas desde el admin.
                  </div>
                )}
              </div>

              <Link
                href="/guias/"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-extrabold text-slate-800"
              >
                Ver todas las guías <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div data-ov-reveal>
              <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-cyan-100">
                Servicios
              </span>

              <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
                No hacemos una web más. Armamos una presencia digital que se entiende y convierte.
              </h2>

              <p className="mt-5 text-lg font-semibold leading-relaxed text-slate-300">
                Diseño, estructura y claridad para que tu negocio se vea profesional y lleve a la acción.
              </p>

              <Link
                href="/web/"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-slate-950"
              >
                Diseño web profesional <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4" data-ov-reveal>
              {[
                ["Landing pages", "Una página clara para explicar una oferta y captar consultas."],
                ["Web profesional", "Un sitio ordenado para mostrar servicios, recursos, portfolio y contacto."],
                ["Sistemas simples", "Herramientas internas, formularios y flujos para resolver tareas repetitivas."],
              ].map(([title, text], index) => (
                <article
                  key={title}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-7"
                >
                  <div className="text-sm font-black uppercase tracking-wide text-cyan-200">
                    0{index + 1}
                  </div>

                  <h3 className="mt-4 text-2xl font-black tracking-tight">
                    {title}
                  </h3>

                  <p className="mt-3 font-medium leading-relaxed text-slate-300">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-ov-reveal>
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-brand-700">
              Sobre Oriavision
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Vendemos online. Por eso diseñamos distinto.
            </h2>
          </div>

          <div
            className="text-lg font-semibold leading-relaxed text-slate-700"
            data-ov-reveal
          >
            <p>
              Oriavision nace desde experiencia real vendiendo online: márgenes, publicaciones,
              herramientas, logística, sistemas y clientes. La idea no es hacer diseño vacío, sino
              soluciones digitales que ayuden a vender con más claridad.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Experiencia real en MercadoLibre",
                "Prompts y guías editables desde admin",
                "Diseño simple, claro y orientado a conversión",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-24">
        <div
          className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-brand-600 to-slate-950 p-10 text-center text-white shadow-2xl"
          data-ov-reveal
        >
          <span className="text-sm font-black uppercase tracking-wide text-cyan-100">
            Próximo paso
          </span>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            ¿Querés que tu negocio se vea más profesional y funcione mejor?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-blue-50">
            Podemos ayudarte con una web, una landing o una herramienta simple para ordenar tu operación.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/web/"
              className="rounded-full bg-white px-6 py-3 font-extrabold text-slate-950"
            >
              Diseño web profesional
            </Link>

            <a
              href={CALC_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 font-extrabold text-white"
            >
              Explorar herramientas
            </a>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}