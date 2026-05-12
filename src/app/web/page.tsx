import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Blocks,
  Bot,
  Braces,
  CheckCircle2,
  DatabaseZap,
  Fingerprint,
  Gauge,
  Layers3,
  LineChart,
  MousePointer2,
  PanelsTopLeft,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import WebRequestForm from "@/components/WebRequestForm";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/web/`;

export const metadata: Metadata = {
  title: "Diseño web profesional, landings y automatizaciones | Oriavision",
  description:
    "Diseño web profesional, landing pages, sistemas web y automatizaciones para negocios que necesitan una presencia digital premium, clara y funcional.",
  alternates: { canonical: "/web/" },
  openGraph: {
    url: PAGE_URL,
    title: "Diseño web profesional, landings y automatizaciones | Oriavision",
    description:
      "Diseño web profesional, landing pages, sistemas web y automatizaciones para negocios que necesitan una presencia digital premium, clara y funcional.",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Oriavision Web Studio" }],
  },
  twitter: {
    title: "Diseño web profesional, landings y automatizaciones | Oriavision",
    description:
      "Diseño web profesional, landing pages, sistemas web y automatizaciones para negocios que necesitan una presencia digital premium, clara y funcional.",
    images: ["/og/home.png"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Servicios web", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Diseño web, desarrollo web y automatizaciones",
  name: "Diseño web profesional, landing pages, sistemas web y automatizaciones",
  provider: { "@type": "Organization", name: "Oriavision", url: SITE_URL },
  areaServed: "AR",
  url: PAGE_URL,
  description:
    "Diseño de landing pages, sitios web profesionales, sistemas web con login, paneles, base de datos, formularios y automatizaciones.",
};

type CaseStudy = {
  name: string;
  label: string;
  href: string;
  image: string;
  line: string;
  chips: string[];
  number: string;
};

const caseStudies: CaseStudy[] = [
  {
    name: "Siempre de Guardia",
    label: "Plataforma de servicios",
    href: "https://siempredeguardia.com.ar/",
    image: "/portfolio/siempredeguardia.png",
    line: "Un sitio que no se siente folleto: organiza categorías, da contexto y se prepara para escalar como plataforma.",
    chips: ["arquitectura", "servicios", "producto"],
    number: "01",
  },
  {
    name: "Quirvo",
    label: "Producto digital",
    href: "https://www.quirvo.com.ar/",
    image: "/portfolio/quirvo.png",
    line: "Una idea técnica convertida en una propuesta simple: portero QR, privacidad y uso real sin fricción.",
    chips: ["storytelling", "landing", "conversión"],
    number: "02",
  },
  {
    name: "Calculadora ML",
    label: "SaaS / herramienta",
    href: "https://calculadoraml.oriavision.com.ar/",
    image: "/portfolio/calculadora-landing.png",
    line: "Una herramienta compleja explicada en minutos, con CTA claro, visual de producto y foco en decisión.",
    chips: ["SaaS", "pricing", "mercadolibre"],
    number: "03",
  },
];

const studioPillars: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Fingerprint, title: "Identidad", text: "No armamos una web genérica. Diseñamos un sistema visual reconocible para tu negocio." },
  { icon: MousePointer2, title: "Conversión", text: "Cada sección tiene una función: explicar, dar confianza, filtrar o llevar a consulta." },
  { icon: Workflow, title: "Automatización", text: "Cuando corresponde, conectamos formularios, mails, paneles, datos y procesos internos." },
  { icon: Gauge, title: "Performance", text: "Diseño visual fuerte, pero liviano, claro y preparado para mobile desde el inicio." },
];

const deliverables: [string, string][] = [
  ["Landing de campaña", "Para vender una oferta concreta sin distraer al visitante."],
  ["Web institucional premium", "Para que la marca se vea seria, actual y confiable."],
  ["Sistema con usuarios", "Login, panel admin, base de datos y flujos internos."],
  ["Automatizaciones", "Consultas, mails, seguimientos y datos conectados."],
];

function MiniLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#8bdcff]">
      <span className="h-px w-8 bg-[#8bdcff]/60" />
      {children}
    </span>
  );
}

const visualSlides = [
  {
    eyebrow: "LANDING DE CONVERSIÓN",
    title: "Quirvo",
    image: "/portfolio/quirvo.png",
    color: "from-cyan-300/35 via-white/10 to-red-500/30",
    metric: "+ claridad",
    note: "producto técnico explicado como experiencia simple",
  },
  {
    eyebrow: "PLATAFORMA WEB",
    title: "Siempre de Guardia",
    image: "/portfolio/siempredeguardia.png",
    color: "from-blue-400/30 via-white/10 to-emerald-300/25",
    metric: "sistema",
    note: "estructura para servicios, usuarios y crecimiento",
  },
  {
    eyebrow: "HERRAMIENTA DIGITAL",
    title: "Calculadora ML",
    image: "/portfolio/calculadora-webapp.png",
    color: "from-sky-300/35 via-white/10 to-violet-400/25",
    metric: "SaaS",
    note: "números complejos convertidos en decisión visual",
  },
];

function ImpactMachine() {
  return (
    <div className="ov-impact-machine relative min-h-[620px] overflow-hidden rounded-[3.2rem] border border-white/10 bg-[#030711] shadow-[0_70px_220px_rgba(0,0,0,.62)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(139,220,255,.22),transparent_28%),radial-gradient(circle_at_84%_22%,rgba(190,24,93,.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.015))]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:54px_54px]" />

      <div className="absolute left-6 right-6 top-6 z-20 flex items-center justify-between rounded-full border border-white/10 bg-black/28 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e23b4b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e7c86f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#66f0b6]" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/48">visual engine</span>
      </div>

      <div className="ov-orbit absolute inset-0 z-0">
        <span className="absolute left-[10%] top-[22%] h-24 w-24 rounded-full border border-[#8bdcff]/25" />
        <span className="absolute right-[12%] top-[16%] h-36 w-36 rounded-full border border-[#ff4968]/18" />
        <span className="absolute bottom-[12%] left-[18%] h-44 w-44 rounded-full border border-white/10" />
      </div>

      <div className="absolute inset-x-0 top-[88px] z-10 flex gap-6 px-6 ov-hero-carousel">
        {[...visualSlides, ...visualSlides].map((slide, index) => (
          <div key={`${slide.title}-${index}`} className="ov-slide relative h-[410px] min-w-[82%] overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/[0.055] shadow-[0_38px_140px_rgba(0,0,0,.52)] md:min-w-[72%]">
            <img src={slide.image} alt={slide.title} className="absolute inset-0 h-full w-full object-cover object-top opacity-88 saturate-[.95]" />
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color}`} />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,13,.98),rgba(2,5,13,.34)_48%,rgba(2,5,13,.82)),linear-gradient(180deg,transparent_44%,rgba(2,5,13,.95))]" />
            <div className="absolute left-7 right-7 top-7 flex items-start justify-between gap-5">
              <span className="rounded-full border border-white/14 bg-black/38 px-4 py-2 text-[10px] font-black uppercase tracking-[.24em] text-white/72 backdrop-blur">{slide.eyebrow}</span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#030711]">{slide.metric}</span>
            </div>
            <div className="absolute bottom-7 left-7 right-7">
              <h3 className="text-5xl font-black leading-[.82] tracking-[-0.08em] text-white md:text-7xl [font-family:var(--font-space-grotesk)]">{slide.title}</h3>
              <p className="mt-4 max-w-lg text-base font-semibold leading-relaxed text-white/72">{slide.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-20 grid gap-3 md:grid-cols-3">
        {[
          ["dirección", "visual propia"],
          ["contenido", "pensado para convertir"],
          ["motor", "animación + interacción"],
        ].map(([a, b]) => (
          <div key={a} className="rounded-[1.55rem] border border-white/10 bg-black/38 p-4 backdrop-blur-xl">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#8bdcff]">{a}</p>
            <p className="mt-2 text-sm font-black text-white">{b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceBlueprint() {
  return (
    <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#050914] p-6 shadow-[0_40px_140px_rgba(0,0,0,.35)] md:p-10">
      <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(139,220,255,.38)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,.38)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative grid gap-4 lg:grid-cols-12">
        <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.055] p-7 lg:col-span-5 lg:row-span-2">
          <MiniLabel>área web</MiniLabel>
          <h2 className="mt-6 text-4xl font-black leading-[.9] tracking-[-0.07em] text-white md:text-6xl [font-family:var(--font-space-grotesk)]">
            Diseño, desarrollo y operación digital en una misma pieza.
          </h2>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-300">
            La idea no es decorar una página. Es convertir tu servicio en una experiencia digital que se entienda, genere confianza y pueda trabajar por vos.
          </p>
        </div>

        {deliverables.map(([title, text], index) => {
          const Icon = [Layers3, PanelsTopLeft, DatabaseZap, Bot][index];
          return (
            <div key={title} className={`group rounded-[2rem] border border-white/10 bg-[#08101d]/86 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#8bdcff]/35 ${index === 0 ? "lg:col-span-4" : "lg:col-span-3"} ${index === 3 ? "lg:col-span-7" : ""}`}>
              <div className="flex items-start justify-between gap-6">
                <Icon className="h-7 w-7 text-[#8bdcff]" />
                <span className="text-xs font-black text-white/28">0{index + 1}</span>
              </div>
              <h3 className="mt-10 text-2xl font-black tracking-[-0.04em] text-white [font-family:var(--font-space-grotesk)]">{title}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Pillar({ icon: Icon, title, text }: (typeof studioPillars)[number]) {
  return (
    <div className="group relative border-t border-white/10 py-8 md:py-10">
      <div className="absolute left-0 top-0 h-px w-0 bg-[#8bdcff] transition-all duration-500 group-hover:w-full" />
      <div className="grid gap-5 md:grid-cols-[120px_1fr] md:items-start">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] text-[#8bdcff]">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-3xl font-black tracking-[-0.05em] text-white [font-family:var(--font-space-grotesk)]">{title}</h3>
          <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-slate-300">{text}</p>
        </div>
      </div>
    </div>
  );
}

function CasePanel({ item, flip }: { item: CaseStudy; flip?: boolean }) {
  return (
    <article className={`grid gap-0 overflow-hidden border-y border-white/10 lg:grid-cols-2 ${flip ? "lg:[&>a]:order-2" : ""}`}>
      <a href={item.href} target="_blank" rel="noreferrer" className="group relative min-h-[360px] overflow-hidden bg-[#060b15] md:min-h-[520px]">
        <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover object-top opacity-78 saturate-[.92] transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,13,.92),transparent_45%,rgba(2,5,13,.25)),linear-gradient(180deg,transparent_40%,rgba(2,5,13,.96))]" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-full border border-white/10 bg-black/42 px-5 py-4 backdrop-blur-xl">
          <span className="text-xs font-black uppercase tracking-[.22em] text-white">abrir proyecto</span>
          <ArrowUpRight className="h-5 w-5 text-[#8bdcff]" />
        </div>
      </a>
      <div className="flex min-h-[430px] flex-col justify-between bg-[#030711] p-8 md:p-12 lg:p-14">
        <div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-sm font-black text-[#8bdcff]">{item.number}</span>
            <span className="text-[11px] font-black uppercase tracking-[.26em] text-white/35">{item.label}</span>
          </div>
          <h3 className="mt-10 text-5xl font-black leading-[.9] tracking-[-0.08em] text-white md:text-7xl [font-family:var(--font-space-grotesk)]">{item.name}</h3>
          <p className="mt-8 max-w-xl text-xl font-medium leading-relaxed text-slate-300">{item.line}</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {item.chips.map((chip) => (
            <span key={chip} className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-black text-white/82">{chip}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProcessRibbon() {
  const steps: [string, string, string][] = [
    ["01", "Detectar", "Qué vendés, qué necesita entender el cliente y qué frena la consulta."],
    ["02", "Diseñar", "Una dirección visual propia: no plantilla, no relleno, no efectos porque sí."],
    ["03", "Construir", "Web, landing o sistema con base técnica, mobile, velocidad y formularios."],
    ["04", "Conectar", "Mails, leads, paneles, bases de datos o automatizaciones cuando suman valor."],
  ];
  return (
    <div className="grid border border-white/10 md:grid-cols-4">
      {steps.map(([n, title, text]) => (
        <div key={n} className="min-h-[310px] border-b border-white/10 bg-[#050914] p-7 md:border-b-0 md:border-r md:last:border-r-0">
          <span className="text-xs font-black text-[#8bdcff]">{n}</span>
          <h3 className="mt-16 text-3xl font-black tracking-[-0.05em] text-white [font-family:var(--font-space-grotesk)]">{title}</h3>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300">{text}</p>
        </div>
      ))}
    </div>
  );
}

export default function WebPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02050d] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="relative isolate px-4 pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,.22),transparent_28%),radial-gradient(circle_at_84%_0%,rgba(120,20,36,.28),transparent_31%),linear-gradient(180deg,#02050d,#06101d_48%,#02050d)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:88px_88px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div>
              <MiniLabel>Oriavision web atelier</MiniLabel>
              <h1 className="mt-8 max-w-5xl text-[clamp(3.7rem,9vw,8.6rem)] font-black leading-[0.82] tracking-[-0.09em] text-white [font-family:var(--font-space-grotesk)]">
                Webs que no parecen de catálogo.
              </h1>
              <p className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-slate-300 md:text-2xl">
                Diseño web, landings y automatizaciones con dirección visual propia. Para que tu marca se vea seria antes de que el cliente te escriba.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#formulario" className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-black text-[#02050d] shadow-[0_24px_90px_rgba(139,220,255,.18)] transition hover:-translate-y-0.5 hover:bg-[#e9fbff]">
                  Quiero algo así <ArrowUpRight className="h-5 w-5" />
                </a>
                <a href="#casos" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.055] px-8 py-4 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-[#8bdcff]/40">
                  Ver trabajos
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <ImpactMachine />
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <ServiceBlueprint />
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div className="sticky top-28 h-fit">
              <MiniLabel>diferencial</MiniLabel>
              <h2 className="mt-6 text-5xl font-black leading-[.88] tracking-[-0.08em] text-white md:text-7xl [font-family:var(--font-space-grotesk)]">
                No es más decoración. Es mejor criterio.
              </h2>
              <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-slate-300">
                La estética premium aparece cuando hay una decisión detrás: qué mostrar, qué quitar, qué priorizar y cómo llevar al visitante a la acción.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div>
              {studioPillars.map((pillar) => (
                <Pillar key={pillar.title} {...pillar} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="casos" className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-4">
          <Reveal>
            <div className="mb-12 max-w-5xl px-0 md:px-8">
              <MiniLabel>casos reales</MiniLabel>
              <h2 className="mt-6 text-5xl font-black leading-[.88] tracking-[-0.08em] text-white md:text-7xl [font-family:var(--font-space-grotesk)]">
                Cada proyecto tiene una lógica distinta. Por eso no deberían verse iguales.
              </h2>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto max-w-[1500px] border-t border-white/10">
          {caseStudies.map((item, index) => (
            <Reveal key={item.name}>
              <CasePanel item={item} flip={index % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-10 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
              <div>
                <MiniLabel>método</MiniLabel>
                <h2 className="mt-6 text-5xl font-black leading-[.88] tracking-[-0.08em] text-white md:text-7xl [font-family:var(--font-space-grotesk)]">
                  Así evitamos la web genérica.
                </h2>
              </div>
              <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-300 md:ml-auto">
                Antes de diseñar, ordenamos el mensaje. Antes de automatizar, entendemos el proceso. Así la web no solo se ve mejor: trabaja mejor.
              </p>
            </div>
            <ProcessRibbon />
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[3.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(139,220,255,.12),rgba(255,255,255,.035)_40%,rgba(120,20,36,.18))] p-8 md:p-12">
              <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[#8bdcff]/12 blur-3xl" />
              <div className="relative grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
                <div>
                  <MiniLabel>para qué sirve</MiniLabel>
                  <h2 className="mt-6 text-5xl font-black leading-[.88] tracking-[-0.08em] text-white md:text-7xl [font-family:var(--font-space-grotesk)]">
                    Una buena web no grita. Hace que todo parezca más claro.
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: Sparkles, text: "Más percepción de marca" },
                    { icon: ShieldCheck, text: "Más confianza inicial" },
                    { icon: LineChart, text: "Más foco en consultas" },
                    { icon: Blocks, text: "Más orden operativo" },
                    { icon: Braces, text: "Código a medida" },
                    { icon: CheckCircle2, text: "Entrega prolija" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#02050d]/55 p-4">
                      <Icon className="h-5 w-5 text-[#8bdcff]" />
                      <span className="text-sm font-black text-white">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="formulario" className="px-4 pb-24 pt-8 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <WebRequestForm />
          </Reveal>
          <div className="mt-8 text-center text-sm font-semibold text-slate-400">
            También podés escribir a <a href="mailto:soporte@oriavision.com.ar" className="font-extrabold text-[#8bdcff] hover:text-white">soporte@oriavision.com.ar</a>
          </div>
        </div>
      </section>
    </main>
  );
}
