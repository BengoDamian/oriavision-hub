import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Bot,
  Database,
  Gauge,
  LayoutTemplate,
  MousePointerClick,
  PanelTop,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import WebRequestForm from "@/components/WebRequestForm";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/web/`;

export const metadata: Metadata = {
  title: "Diseño web profesional, landings y sistemas a medida | Oriavision",
  description:
    "Diseñamos landing pages, páginas web profesionales, sistemas web y automatizaciones para negocios que quieren verse mejor, captar consultas y ordenar procesos.",
  alternates: {
    canonical: "/web/",
  },
  openGraph: {
    url: PAGE_URL,
    title: "Diseño web profesional, landings y sistemas a medida | Oriavision",
    description:
      "Diseñamos landing pages, páginas web profesionales, sistemas web y automatizaciones para negocios que quieren verse mejor, captar consultas y ordenar procesos.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Servicios web de Oriavision",
      },
    ],
  },
  twitter: {
    title: "Diseño web profesional, landings y sistemas a medida | Oriavision",
    description:
      "Diseñamos landing pages, páginas web profesionales, sistemas web y automatizaciones para negocios que quieren verse mejor, captar consultas y ordenar procesos.",
    images: ["/og/home.png"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Servicios web",
      item: PAGE_URL,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Diseño web, desarrollo web y automatizaciones",
  name: "Diseño web profesional, landing pages, sistemas web y automatizaciones",
  provider: {
    "@type": "Organization",
    name: "Oriavision",
    url: SITE_URL,
  },
  areaServed: "AR",
  url: PAGE_URL,
  description:
    "Diseñamos landing pages, páginas web profesionales, sistemas web con usuarios, base de datos, login, panel admin, formularios, automatizaciones y secuencias de email.",
};

type Project = {
  title: string;
  kind: string;
  href: string;
  domain: string;
  description: string;
  stack?: string[];
  image?: string;
};

type ServiceCard = {
  title: string;
  kicker: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  bullets: string[];
};

const services: ServiceCard[] = [
  {
    title: "Landing pages de conversión",
    kicker: "Campañas y captación",
    text: "Páginas enfocadas en explicar rápido, generar confianza y convertir visitas en consultas reales.",
    icon: MousePointerClick,
    bullets: ["CTA claro", "Copy comercial", "Formulario o WhatsApp"],
  },
  {
    title: "Webs profesionales",
    kicker: "Marca y presencia digital",
    text: "Sitios modernos para empresas, profesionales y servicios que necesitan verse más sólidos desde el primer segundo.",
    icon: LayoutTemplate,
    bullets: ["Diseño premium", "SEO base", "Estructura escalable"],
  },
  {
    title: "Sistemas y automatizaciones",
    kicker: "Procesos digitales",
    text: "Desarrollos con login, base de datos, paneles, formularios, automatizaciones y flujos a medida.",
    icon: Workflow,
    bullets: ["Usuarios y panel admin", "Base de datos", "Emails automáticos"],
  },
];

const capabilities = [
  { label: "Diseño UI premium", icon: Sparkles },
  { label: "Landing pages", icon: Rocket },
  { label: "Panel admin", icon: PanelTop },
  { label: "Usuarios y login", icon: ShieldCheck },
  { label: "Base de datos", icon: Database },
  { label: "Automatizaciones", icon: Bot },
  { label: "Formularios", icon: Blocks },
  { label: "Optimización", icon: Gauge },
];

const audiences = [
  "Empresas de servicios",
  "Inmobiliarias y estudios",
  "E-commerce y vendedores ML",
  "Marcas personales",
  "Profesionales independientes",
  "Proyectos que necesitan sistema propio",
];

const process = [
  {
    step: "01",
    title: "Estrategia",
    text: "Definimos objetivo, público, oferta y qué tipo de web conviene construir.",
  },
  {
    step: "02",
    title: "Diseño",
    text: "Armamos una estética alineada a tu marca, con jerarquía clara y foco comercial.",
  },
  {
    step: "03",
    title: "Desarrollo",
    text: "Construimos la web, landing o sistema con una base técnica prolija y escalable.",
  },
  {
    step: "04",
    title: "Automatización",
    text: "Integramos formularios, emails, paneles o flujos internos cuando el proyecto lo necesita.",
  },
];

const projects: Project[] = [
  {
    title: "Siempre de Guardia",
    kind: "Plataforma web",
    href: "https://siempredeguardia.com.ar/",
    domain: "siempredeguardia.com.ar",
    description:
      "Directorio digital orientado a encontrar servicios disponibles de forma rápida, con categorías claras, usuarios y experiencia pensada para la acción.",
    stack: ["Directorio", "Usuarios", "Servicios"],
    image: "/portfolio/siempredeguardia.png",
  },
  {
    title: "Quirvo",
    kind: "Landing de producto",
    href: "https://www.quirvo.com.ar/",
    domain: "www.quirvo.com.ar",
    description:
      "Landing moderna para presentar un portero QR, explicar su propuesta de valor y convertir una solución técnica en una idea simple de entender.",
    stack: ["Producto", "Landing", "Conversión"],
    image: "/portfolio/quirvo.png",
  },
  {
    title: "Calculadora ML — Landing",
    kind: "Landing SaaS",
    href: "https://calculadoraml.oriavision.com.ar/",
    domain: "calculadoraml.oriavision.com.ar",
    description:
      "Página de venta para una herramienta digital, con foco en beneficios, explicación simple, CTA y derivación al producto.",
    stack: ["SaaS", "Marketing", "CTA"],
    image: "/portfolio/calculadora-landing.png",
  },
  {
    title: "dbengotech",
    kind: "Web de servicios",
    href: "https://dbengotech.com.ar/",
    domain: "dbengotech.com.ar",
    description:
      "Sitio profesional para comunicar servicios, propuesta de valor y enfoque de trabajo con una presencia digital más clara.",
    stack: ["Servicios", "Marca", "Web"],
    image: "/portfolio/dbengotech.png",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_40px_rgba(8,217,255,0.08)] backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
      {children}
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto mt-12 max-w-5xl lg:mt-0">
      <div className="absolute -left-8 top-10 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-8 bottom-4 h-52 w-52 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950/80 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-300/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
          <span className="ml-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-slate-300">
            oriavision / web-studio
          </span>
        </div>

        <div className="grid gap-3 p-3 md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-brand-900 via-slate-950 to-slate-950 p-6">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:34px_34px]" />
            <div className="relative">
              <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-cyan-100">
                Landing activa
              </div>
              <h3 className="mt-5 max-w-sm text-3xl font-black leading-tight tracking-tight text-white md:text-4xl [font-family:var(--font-space-grotesk)]">
                Presencia digital con estética de producto premium.
              </h3>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Propuesta clara", "CTA visible", "Carga rápida", "SEO base"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-bold text-slate-100">
                    <BadgeCheck className="mb-3 h-5 w-5 text-cyan-200" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Automatización</p>
                  <p className="mt-2 text-lg font-black text-white [font-family:var(--font-space-grotesk)]">Consulta → Mail → Gestión</p>
                </div>
                <Workflow className="h-8 w-8 text-cyan-200" />
              </div>
              <div className="mt-5 space-y-3">
                {["Formulario", "Respuesta automática", "Seguimiento interno"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm font-bold text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Sistema</p>
                <p className="mt-3 text-3xl font-black text-white [font-family:var(--font-space-grotesk)]">Admin</p>
                <p className="mt-2 text-sm font-semibold text-slate-400">Paneles y datos</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Foco</p>
                <p className="mt-3 text-3xl font-black text-white [font-family:var(--font-space-grotesk)]">Leads</p>
                <p className="mt-2 text-sm font-semibold text-slate-400">Más consultas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ item }: { item: ServiceCard }) {
  const Icon = item.icon;
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[0.075]">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-300/15" />
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-100">
          <Icon className="h-6 w-6" />
        </div>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-cyan-100/75">{item.kicker}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-white [font-family:var(--font-space-grotesk)]">
          {item.title}
        </h2>
        <p className="mt-4 text-base font-medium leading-relaxed text-slate-300">{item.text}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {item.bullets.map((bullet) => (
            <span key={bullet} className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5 text-xs font-bold text-slate-200">
              {bullet}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-slate-950 shadow-[0_22px_70px_rgba(0,0,0,0.32)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-300/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
        <div className="ml-2 truncate rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-300">
          {project.domain}
        </div>
      </div>

      {project.image ? (
        <div className="relative h-64 overflow-hidden md:h-72">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-top opacity-90 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>
      ) : null}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-[2.1rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[0.075] md:p-5">
      <ProjectPreview project={project} />

      <div className="mt-6 px-1 pb-1">
        <span className="rounded-full border border-cyan-200/15 bg-cyan-300/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-100">
          {project.kind}
        </span>

        <h3 className="mt-4 text-2xl font-black tracking-tight text-white [font-family:var(--font-space-grotesk)]">
          {project.title}
        </h3>

        <p className="mt-3 text-base font-medium leading-relaxed text-slate-300">
          {project.description}
        </p>

        {project.stack?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5 text-xs font-bold text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-50"
          >
            Ver online
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#formulario"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-extrabold text-white transition hover:border-cyan-200/30 hover:bg-white/[0.1]"
          >
            Quiero algo así
          </a>
        </div>
      </div>
    </div>
  );
}

export default function WebPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="hero-grid relative overflow-hidden px-4 pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.32),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(153,27,27,0.22),transparent_30%),linear-gradient(180deg,#020617_0%,#071329_56%,#020617_100%)]" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div>
              <Eyebrow>Diseño web profesional</Eyebrow>

              <h1 className="mt-7 text-4xl font-black leading-[0.96] tracking-tight text-white md:text-6xl lg:text-7xl [font-family:var(--font-space-grotesk)]">
                Webs, landings y sistemas que hacen ver más sólido tu negocio.
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 md:text-xl">
                Diseñamos presencia digital con estética premium, enfoque comercial y funciones reales: formularios, paneles, automatizaciones, usuarios, base de datos y flujos a medida.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#formulario"
                  className="premium-button inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-extrabold text-slate-950 shadow-[0_18px_70px_rgba(8,217,255,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-50"
                >
                  Quiero una web profesional
                  <ArrowRight className="h-5 w-5" />
                </a>

                <a
                  href="#trabajos"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-base font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200/30 hover:bg-white/[0.1]"
                >
                  Ver trabajos
                </a>
              </div>

              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
                {["Landing pages", "Webs a medida", "Automatizaciones", "Panel admin", "Login", "Base de datos"].map((item) => (
                  <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-center text-sm font-bold text-slate-200 backdrop-blur">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      <section className="relative px-4 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(8,217,255,0.09),transparent_34%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Servicios</Eyebrow>
              <h2 className="mt-6 text-3xl font-black tracking-tight text-white md:text-5xl [font-family:var(--font-space-grotesk)]">
                Tres líneas de trabajo para cubrir desde una campaña hasta una plataforma completa.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {services.map((item) => (
                <ServiceCard key={item.title} item={item} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur md:p-10">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />

              <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                <div>
                  <Eyebrow>Qué hacemos</Eyebrow>
                  <h2 className="mt-6 text-3xl font-black tracking-tight text-white md:text-5xl [font-family:var(--font-space-grotesk)]">
                    No es solo diseño: es claridad, confianza y una web que puede trabajar por tu negocio.
                  </h2>
                  <p className="mt-5 text-lg font-medium leading-relaxed text-slate-300">
                    La estética importa, pero también importa que la página explique bien, ordene la propuesta, capte consultas y, si hace falta, automatice procesos que hoy te consumen tiempo.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {capabilities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-100">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-extrabold text-slate-100">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="trabajos" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Trabajos destacados</Eyebrow>
              <h2 className="mt-6 text-3xl font-black tracking-tight text-white md:text-5xl [font-family:var(--font-space-grotesk)]">
                Proyectos reales con estética de marca, producto y sistema.
              </h2>
              <p className="mt-5 text-lg font-medium leading-relaxed text-slate-300">
                Una selección para mostrar distintos niveles de trabajo: landing pages, webs de servicios, plataformas y herramientas digitales.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-8 backdrop-blur md:p-10">
              <Eyebrow>Ideal para</Eyebrow>
              <h2 className="mt-6 text-3xl font-black tracking-tight text-white md:text-4xl [font-family:var(--font-space-grotesk)]">
                Negocios que necesitan verse mejor y convertir mejor.
              </h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-slate-300">
                La página puede ser institucional, comercial o funcional. Lo importante es que tenga una intención clara y acompañe el objetivo del negocio.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {audiences.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-5 text-base font-extrabold text-slate-100 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.85)]" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/55 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.25)] md:p-10">
              <div className="max-w-2xl">
                <Eyebrow>Proceso</Eyebrow>
                <h2 className="mt-6 text-3xl font-black tracking-tight text-white md:text-5xl [font-family:var(--font-space-grotesk)]">
                  Un método simple para avanzar sin perder el foco.
                </h2>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {process.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6"
                  >
                    <div className="text-sm font-black text-cyan-100">{item.step}</div>
                    <h3 className="mt-4 text-xl font-black text-white [font-family:var(--font-space-grotesk)]">{item.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-300">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="formulario" className="px-4 pb-20 pt-16 md:pb-28 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <WebRequestForm />
          </Reveal>

          <div className="mt-8 text-center text-sm font-semibold text-slate-400">
            Preferís escribir directo?{" "}
            <a
              href="mailto:soporte@oriavision.com.ar"
              className="font-extrabold text-cyan-100 hover:text-white"
            >
              soporte@oriavision.com.ar
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
