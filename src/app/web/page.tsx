import type { Metadata } from "next";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  DatabaseZap,
  Fingerprint,
  Gauge,
  Layers3,
  Mail,
  MousePointer2,
  PanelTop,
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
};

const cases = [
  {
    name: "Siempre de Guardia",
    type: "Plataforma de servicios",
    url: "https://siempredeguardia.com.ar/",
    img: "/portfolio/siempredeguardia.png",
    text: "Un directorio preparado para crecer: categorías, contacto directo y estructura clara para usuarios reales.",
  },
  {
    name: "Quirvo",
    type: "Producto digital / QR access",
    url: "https://www.quirvo.com.ar/",
    img: "/portfolio/quirvo.png",
    text: "Una solución técnica convertida en una experiencia simple, visual y fácil de entender desde el primer scroll.",
  },
  {
    name: "Calculadora ML",
    type: "Herramienta SaaS",
    url: "https://calculadoraml.oriavision.com.ar/",
    img: "/portfolio/calculadora-landing.png",
    text: "Una herramienta compleja explicada con foco comercial: promesa clara, demo visual y llamado a probar.",
  },
  {
    name: "DBengoTech",
    type: "Sistema + estrategia e-commerce",
    url: "https://www.dbengotech.com.ar/",
    img: "/portfolio/dbengotech.png",
    text: "Web con enfoque consultivo para explicar problemas, soluciones y procesos sin parecer una plantilla más.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Diseño web profesional, landing pages y automatizaciones",
  provider: { "@type": "Organization", name: "Oriavision", url: SITE_URL },
  areaServed: "AR",
  url: PAGE_URL,
};

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="web-kicker inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.32em] text-[#8bdcff]">
      <span className="h-px w-10 bg-[#8bdcff]/70" />
      {children}
    </span>
  );
}

function VisualStage() {
  return (
    <div className="web-visual-stage-v11" aria-label="Mockups animados de trabajos reales de Oriavision">
      <div className="web-stage-grid" />
      <div className="web-orbit web-orbit-a" />
      <div className="web-orbit web-orbit-b" />

      <div className="web-laptop web-float-main">
        <div className="web-device-bar"><span /><span /><span /><b>SIEMPRE DE GUARDIA</b></div>
        <img src="/portfolio/siempredeguardia.png" alt="Mockup de Siempre de Guardia" />
      </div>

      <div className="web-tablet web-float-secondary">
        <div className="web-device-bar"><span /><span /><span /><b>QUIRVO</b></div>
        <img src="/portfolio/quirvo.png" alt="Mockup de Quirvo" />
      </div>

      <div className="web-phone web-float-tertiary">
        <div className="web-device-bar"><span /><span /><b>DBENGOTECH</b></div>
        <img src="/portfolio/dbengotech.png" alt="Mockup de DBengoTech" />
      </div>

      <div className="web-card web-card-a">
        <Sparkles className="h-5 w-5" />
        <div><strong>Imagen propia</strong><small>No parece plantilla</small></div>
      </div>
      <div className="web-card web-card-b">
        <Workflow className="h-5 w-5" />
        <div><strong>Procesos conectados</strong><small>Formularios, mails y datos</small></div>
      </div>
      <div className="web-card web-card-c">
        <Gauge className="h-5 w-5" />
        <div><strong>Diseño que vende</strong><small>Claridad antes que ruido</small></div>
      </div>
    </div>
  );
}

function PortfolioWall() {
  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {cases.map((item, index) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className={`web-case-card group ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
        >
          <div className="web-case-screen">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="relative z-10 mt-6">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#8bdcff]">{item.type}</p>
            <h3 className="mt-3 flex items-center justify-between gap-4 text-2xl font-black tracking-[-0.04em] text-white [font-family:var(--font-space-grotesk)]">
              {item.name}<ArrowUpRight className="h-5 w-5 opacity-55 transition group-hover:opacity-100" />
            </h3>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300">{item.text}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

function AutomationMap() {
  const nodes = [
    ["Formulario", "nuevo lead", "left-[4%] top-[18%]"],
    ["Clasificar", "tipo de consulta", "left-[28%] top-[7%]"],
    ["Enviar mail", "respuesta automática", "left-[56%] top-[18%]"],
    ["Guardar dato", "Sheets / base de datos", "left-[35%] top-[55%]"],
    ["Avisar equipo", "Slack / WhatsApp", "left-[66%] top-[58%]"],
    ["Sí", "enviar info extra", "right-[4%] top-[24%]"],
  ];
  return (
    <div className="web-automation-map">
      <svg viewBox="0 0 1000 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M170 155 C290 80 365 92 440 105 C525 118 560 138 640 160" />
        <path d="M640 170 C695 230 730 280 760 340" />
        <path d="M250 185 C300 270 360 325 450 330" />
        <path d="M450 330 C570 324 640 350 760 360" />
        <path d="M760 340 C840 285 870 230 920 210" />
      </svg>
      {nodes.map(([title, text, pos]) => (
        <div key={title} className={`web-flow-node absolute ${pos}`}>
          <span />
          <div><strong>{title}</strong><small>{text}</small></div>
        </div>
      ))}
    </div>
  );
}

export default function WebPage() {
  return (
    <main className="web-page-shell min-h-screen overflow-hidden bg-[#02050d] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="web-hero relative isolate px-5 pb-20 pt-24 md:px-8 md:pb-28 md:pt-32">
        <div className="web-bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-[1520px] items-center gap-12 xl:grid-cols-[0.55fr_0.95fr]">
          <Reveal>
            <div className="relative z-20 max-w-2xl">
              <Kicker>Oriavision web atelier</Kicker>
              <h1 className="mt-7 text-[clamp(4rem,8.5vw,8.8rem)] font-black leading-[0.78] tracking-[-0.105em] text-white [font-family:var(--font-space-grotesk)]">
                Webs que se sienten propias.
              </h1>
              <p className="mt-8 max-w-xl text-xl font-medium leading-relaxed text-slate-300 md:text-2xl">
                Diseño web, landings, sistemas y automatizaciones con dirección visual, criterio comercial y mockups reales de producto.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#formulario" className="web-btn-primary">Quiero una web así <ArrowUpRight className="h-5 w-5" /></a>
                <a href="#casos" className="web-btn-secondary">Ver trabajos</a>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <VisualStage />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="web-panel-big">
              <Kicker>no hacemos vitrinas genéricas</Kicker>
              <h2 className="mt-6 text-5xl font-black leading-[.86] tracking-[-0.08em] md:text-7xl [font-family:var(--font-space-grotesk)]">
                Una web tiene que explicar, impactar y trabajar.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [Fingerprint, "Identidad", "Una estética reconocible, alineada al negocio y no a una plantilla."],
                [MousePointer2, "Conversión", "Jerarquía visual para guiar al usuario hacia la consulta."],
                [DatabaseZap, "Sistemas", "Login, paneles, datos, bases y herramientas internas."],
                [Bot, "Automatización", "Formularios, mails, seguimientos y procesos conectados."],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof Sparkles;
                return (
                  <div key={title as string} className="web-feature-card">
                    <I className="h-7 w-7 text-[#8bdcff]" />
                    <h3>{title as string}</h3>
                    <p>{text as string}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="casos" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1520px]">
          <Reveal>
            <div className="mb-10 max-w-4xl">
              <Kicker>portfolio real</Kicker>
              <h2 className="mt-6 text-5xl font-black leading-[.86] tracking-[-0.08em] md:text-7xl [font-family:var(--font-space-grotesk)]">
                Proyectos con presencia visual, no capturas pegadas.
              </h2>
            </div>
          </Reveal>
          <Reveal><PortfolioWall /></Reveal>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <Reveal>
            <div>
              <Kicker>automatizaciones</Kicker>
              <h2 className="mt-6 text-5xl font-black leading-[.86] tracking-[-0.08em] md:text-7xl [font-family:var(--font-space-grotesk)]">
                La web también puede trabajar por vos.
              </h2>
              <p className="mt-7 max-w-xl text-lg font-medium leading-relaxed text-slate-300">
                Una landing puede captar, clasificar, responder, guardar datos y avisar al equipo. No tiene que ser solo una vidriera.
              </p>
            </div>
          </Reveal>
          <Reveal><AutomationMap /></Reveal>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1380px]">
          <Reveal>
            <div className="web-process">
              {[
                [Layers3, "Descubrir", "Ordenamos objetivo, público, propuesta y diferencial."],
                [PanelTop, "Diseñar", "Creamos una dirección visual propia antes de llenar de secciones."],
                [Workflow, "Conectar", "Sumamos formularios, CRM, planillas, mails o paneles cuando aporta valor."],
                [ShieldCheck, "Lanzar", "Dejamos una base prolija, rápida y preparada para crecer."],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof Sparkles;
                return (
                  <div key={title as string}>
                    <I className="h-8 w-8 text-[#8bdcff]" />
                    <h3>{title as string}</h3>
                    <p>{text as string}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="formulario" className="px-5 pb-24 pt-8 md:px-8 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="web-form-wrap">
              <div className="mb-8 max-w-3xl">
                <Kicker>hablemos</Kicker>
                <h2 className="mt-6 text-5xl font-black leading-[.86] tracking-[-0.08em] md:text-7xl [font-family:var(--font-space-grotesk)]">
                  Contame qué querés lograr y vemos cómo hacerlo distinto.
                </h2>
              </div>
              <WebRequestForm />
              <p className="mt-7 text-center text-sm font-semibold text-slate-400">
                También podés escribir a <a href="mailto:soporte@oriavision.com.ar" className="font-extrabold text-[#8bdcff] hover:text-white">soporte@oriavision.com.ar</a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
