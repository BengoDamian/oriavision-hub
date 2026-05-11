import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Braces,
  Building2,
  Check,
  Database,
  Gauge,
  Layers3,
  LockKeyhole,
  MousePointerClick,
  PanelsTopLeft,
  Rocket,
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
    "Landing pages, sitios web profesionales, sistemas web y automatizaciones para negocios que necesitan una presencia digital más premium y funcional.",
  alternates: { canonical: "/web/" },
  openGraph: {
    url: PAGE_URL,
    title: "Diseño web profesional, landings y automatizaciones | Oriavision",
    description:
      "Landing pages, sitios web profesionales, sistemas web y automatizaciones para negocios que necesitan una presencia digital más premium y funcional.",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Oriavision Web Studio" }],
  },
  twitter: {
    title: "Diseño web profesional, landings y automatizaciones | Oriavision",
    description:
      "Landing pages, sitios web profesionales, sistemas web y automatizaciones para negocios que necesitan una presencia digital más premium y funcional.",
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

type Project = {
  title: string;
  kind: string;
  href: string;
  description: string;
  image?: string;
  metrics: string[];
};

const services = [
  {
    title: "Landing pages",
    subtitle: "Para campañas y consultas",
    text: "Una página enfocada en explicar la oferta, generar confianza y llevar al visitante a consultar.",
    icon: MousePointerClick,
    bullets: ["Mensaje claro", "CTA fuerte", "Formulario / WhatsApp"],
  },
  {
    title: "Webs profesionales",
    subtitle: "Para marca y autoridad",
    text: "Sitios con estética sólida, estructura comercial y una presencia digital que no parece improvisada.",
    icon: Layers3,
    bullets: ["Diseño premium", "SEO base", "Mobile first"],
  },
  {
    title: "Sistemas web",
    subtitle: "Para ordenar procesos",
    text: "Herramientas internas, paneles, usuarios, bases de datos y automatizaciones conectadas al negocio.",
    icon: Workflow,
    bullets: ["Login", "Panel admin", "Automatizaciones"],
  },
];

const capabilities = [
  { label: "Diseño UI", icon: Sparkles },
  { label: "Desarrollo web", icon: Braces },
  { label: "Paneles", icon: PanelsTopLeft },
  { label: "Usuarios", icon: LockKeyhole },
  { label: "Datos", icon: Database },
  { label: "Automatización", icon: Bot },
  { label: "Performance", icon: Gauge },
  { label: "Escalabilidad", icon: Rocket },
];

const projects: Project[] = [
  {
    title: "Siempre de Guardia",
    kind: "Plataforma web",
    href: "https://siempredeguardia.com.ar/",
    image: "/portfolio/siempredeguardia.png",
    description:
      "Una experiencia orientada a encontrar servicios rápidamente, con categorías claras y lógica de plataforma.",
    metrics: ["Directorio", "Usuarios", "Servicios"],
  },
  {
    title: "Quirvo",
    kind: "Landing de producto",
    href: "https://www.quirvo.com.ar/",
    image: "/portfolio/quirvo.png",
    description:
      "Una propuesta técnica transformada en una historia simple: portero QR sin instalación, sin cables y con privacidad.",
    metrics: ["Producto", "Storytelling", "Conversión"],
  },
  {
    title: "Calculadora ML",
    kind: "Landing SaaS",
    href: "https://calculadoraml.oriavision.com.ar/",
    image: "/portfolio/calculadora-landing.png",
    description:
      "Landing para vender una herramienta digital, explicar valor rápido y empujar al usuario hacia la acción.",
    metrics: ["SaaS", "CTA", "MercadoLibre"],
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.07] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-cyan-100">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,.9)]" />
      {children}
    </span>
  );
}

function StudioVisual() {
  return (
    <div className="relative min-h-[520px] lg:min-h-[640px]">
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute right-0 top-12 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

      <div className="absolute left-2 top-6 w-[76%] rotate-[-7deg] overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/[0.075] p-4 shadow-[0_45px_120px_rgba(0,0,0,.48)] backdrop-blur-xl md:left-0 md:w-[70%]">
        <div className="rounded-[1.6rem] border border-white/10 bg-[#051120] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-300" /></div>
            <span className="text-[10px] font-black uppercase tracking-[.24em] text-cyan-100/70">Brand system</span>
          </div>
          <div className="h-32 rounded-[1.4rem] bg-[radial-gradient(circle_at_20%_20%,rgba(8,217,255,.35),transparent_26%),linear-gradient(135deg,#12213b,#040816)] p-5">
            <p className="max-w-[12rem] text-2xl font-extrabold leading-none text-white [font-family:var(--font-space-grotesk)]">Diseño con dirección, no relleno visual.</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <span className="h-16 rounded-2xl bg-cyan-300/12" />
            <span className="h-16 rounded-2xl bg-white/10" />
            <span className="h-16 rounded-2xl bg-red-400/12" />
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-32 w-[72%] rotate-[5deg] rounded-[2.2rem] border border-white/12 bg-[#07101f]/90 p-4 shadow-[0_55px_140px_rgba(0,0,0,.6)] backdrop-blur-xl md:w-[62%]">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-[.2em] text-slate-400">Dashboard</span>
            <span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-bold text-emerald-100">online</span>
          </div>
          <div className="space-y-3">
            {["Lead recibido", "Email automático", "Tarea interna", "Seguimiento"].map((item, i) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-3">
                <span className="text-sm font-bold text-white">{item}</span>
                <span className="text-xs font-black text-cyan-100">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-8 w-[78%] rotate-[2deg] rounded-[2rem] border border-white/12 bg-white/[0.08] p-5 shadow-[0_45px_120px_rgba(0,0,0,.48)] backdrop-blur-xl md:left-20 md:w-[64%]">
        <p className="text-xs font-black uppercase tracking-[.24em] text-cyan-100/70">Conversion layer</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            ["+ claridad", "Mensaje"],
            ["+ confianza", "Marca"],
            ["+ consultas", "CTA"],
            ["+ orden", "Sistema"],
          ].map(([a, b]) => (
            <div key={b} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <p className="text-xl font-black text-white [font-family:var(--font-space-grotesk)]">{a}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceStrip() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {services.map((item, index) => {
        const Icon = item.icon;
        return (
          <article key={item.title} className="group relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#07101d]/80 p-7 shadow-[0_35px_120px_rgba(0,0,0,.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300/0 via-cyan-200/55 to-red-300/0 opacity-0 transition group-hover:opacity-100" />
            <div className="flex items-start justify-between gap-5">
              <span className="text-sm font-black text-slate-500">0{index + 1}</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan-100"><Icon className="h-6 w-6" /></div>
            </div>
            <p className="mt-10 text-xs font-black uppercase tracking-[.24em] text-cyan-100/65">{item.subtitle}</p>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-white [font-family:var(--font-space-grotesk)]">{item.title}</h3>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-300">{item.text}</p>
            <div className="mt-8 space-y-3">
              {item.bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 text-sm font-bold text-slate-200"><Check className="h-4 w-4 text-cyan-200" />{bullet}</div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`grid gap-8 rounded-[2.8rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_35px_110px_rgba(0,0,0,.24)] backdrop-blur-xl md:p-6 lg:grid-cols-2 ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
      <a href={project.href} target="_blank" rel="noreferrer" className="group relative block min-h-[330px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-slate-950">
        {project.image ? (
          <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover object-top opacity-86 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100" />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(2,6,23,.95))]" />
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-3 backdrop-blur">
          <span className="text-sm font-black uppercase tracking-[.18em] text-cyan-100">Ver online</span>
          <ArrowRight className="h-5 w-5 text-white" />
        </div>
      </a>
      <div className="flex flex-col justify-center p-3 md:p-6">
        <span className="w-fit rounded-full border border-cyan-200/15 bg-cyan-200/[0.07] px-4 py-2 text-[11px] font-black uppercase tracking-[.22em] text-cyan-100">{project.kind}</span>
        <h3 className="mt-6 text-4xl font-extrabold tracking-tight text-white [font-family:var(--font-space-grotesk)] md:text-5xl">{project.title}</h3>
        <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-slate-300">{project.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.metrics.map((m) => <span key={m} className="rounded-full border border-white/10 bg-slate-950/55 px-4 py-2 text-sm font-bold text-slate-200">{m}</span>)}
        </div>
      </div>
    </article>
  );
}

export default function WebPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02050d] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="relative px-4 pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(8,217,255,.18),transparent_28%),radial-gradient(circle_at_80%_16%,rgba(160,24,40,.20),transparent_28%),linear-gradient(180deg,#02050d_0%,#061324_52%,#02050d_100%)]" />
        <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <Eyebrow>Oriavision Web Studio</Eyebrow>
              <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-[0.92] tracking-[-0.06em] text-white [font-family:var(--font-space-grotesk)] md:text-7xl lg:text-8xl">
                Diseño web con presencia de marca y lógica de negocio.
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 md:text-xl">
                Landings, webs profesionales y sistemas a medida para negocios que no quieren parecer una plantilla más.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#formulario" className="premium-button inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-extrabold text-slate-950 shadow-[0_24px_90px_rgba(8,217,255,.22)] transition hover:-translate-y-0.5 hover:bg-cyan-50">
                  Quiero una web profesional <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#trabajos" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.055] px-8 py-4 text-base font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200/35 hover:bg-white/[0.09]">
                  Ver proyectos
                </a>
              </div>
              <div className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                {[
                  ["01", "Diseño"],
                  ["02", "Desarrollo"],
                  ["03", "Automatización"],
                ].map(([n, t]) => (
                  <div key={n} className="bg-[#060c18]/80 p-5">
                    <p className="text-xs font-black text-cyan-100">{n}</p>
                    <p className="mt-2 text-sm font-extrabold text-white md:text-base">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal><StudioVisual /></Reveal>
        </div>
      </section>

      <section className="relative px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <Eyebrow>Servicios</Eyebrow>
                <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.05em] text-white [font-family:var(--font-space-grotesk)] md:text-6xl">No vendemos “una web”. Construimos una experiencia digital.</h2>
              </div>
              <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-300 lg:ml-auto">
                La diferencia está en la dirección: qué decir, cómo mostrarlo, dónde llevar al usuario y qué proceso puede quedar automatizado detrás.
              </p>
            </div>
            <div className="mt-12"><ServiceStrip /></div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,217,255,.10),rgba(255,255,255,.035)_38%,rgba(120,22,38,.12))] p-8 shadow-[0_45px_140px_rgba(0,0,0,.32)] md:p-12">
              <div className="absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <Eyebrow>Lo que suma valor</Eyebrow>
                  <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.05em] text-white [font-family:var(--font-space-grotesk)] md:text-6xl">Visual premium, pero con base funcional.</h2>
                  <p className="mt-6 text-lg font-medium leading-relaxed text-slate-300">
                    La web tiene que verse bien, pero también captar consultas, ordenar información y ahorrar trabajo operativo cuando el negocio lo necesita.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {capabilities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-[1.6rem] border border-white/10 bg-[#030814]/70 p-5 text-center backdrop-blur">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-200/[0.08] text-cyan-100"><Icon className="h-5 w-5" /></div>
                        <p className="mt-4 text-sm font-extrabold text-white">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="trabajos" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow>Portfolio</Eyebrow>
              <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.05em] text-white [font-family:var(--font-space-grotesk)] md:text-6xl">Proyectos que parecen productos, no simples páginas armadas en serie.</h2>
            </div>
            <div className="mt-12 space-y-8">
              {projects.map((project, index) => <ProjectFeature key={project.title} project={project} index={index} />)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.045] shadow-[0_45px_140px_rgba(0,0,0,.28)] backdrop-blur-xl lg:grid-cols-[1.05fr_.95fr]">
              <div className="p-8 md:p-12">
                <Eyebrow>Proceso</Eyebrow>
                <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.05em] text-white [font-family:var(--font-space-grotesk)] md:text-6xl">Primero estrategia. Después diseño. Después desarrollo.</h2>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-300">
                  Así evitamos que la página sea solo estética. Cada bloque tiene una intención: presentar, convencer, derivar o automatizar.
                </p>
              </div>
              <div className="grid gap-px bg-white/10 lg:grid-cols-1">
                {[
                  ["01", "Dirección", "Objetivo, público, oferta y camino de conversión."],
                  ["02", "Diseño", "Sistema visual, secciones, jerarquía y experiencia mobile."],
                  ["03", "Implementación", "Desarrollo, formularios, performance y publicación."],
                  ["04", "Evolución", "Ajustes, automatizaciones o nuevas funcionalidades."],
                ].map(([n, title, text]) => (
                  <div key={n} className="bg-[#06101d] p-6 md:p-8">
                    <p className="text-xs font-black text-cyan-100">{n}</p>
                    <h3 className="mt-3 text-2xl font-extrabold text-white [font-family:var(--font-space-grotesk)]">{title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="formulario" className="px-4 pb-24 pt-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal><WebRequestForm /></Reveal>
          <div className="mt-8 text-center text-sm font-semibold text-slate-400">
            También podés escribir a <a href="mailto:soporte@oriavision.com.ar" className="font-extrabold text-cyan-100 hover:text-white">soporte@oriavision.com.ar</a>
          </div>
        </div>
      </section>
    </main>
  );
}
