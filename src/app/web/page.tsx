import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WebRequestForm from "@/components/WebRequestForm";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/web/`;

export const metadata: Metadata = {
  title: "Landing pages, webs a medida y sistemas web | Oriavision",
  description:
    "Desarrollamos landing pages, páginas web a medida y sistemas web con usuarios, base de datos, login, panel admin, automatizaciones y funcionalidades personalizadas.",
  alternates: {
    canonical: "/web/",
  },
  openGraph: {
    url: PAGE_URL,
    title: "Landing pages, webs a medida y sistemas web | Oriavision",
    description:
      "Desarrollamos landing pages, páginas web a medida y sistemas web con usuarios, base de datos, login, panel admin, automatizaciones y funcionalidades personalizadas.",
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
    title: "Landing pages, webs a medida y sistemas web | Oriavision",
    description:
      "Desarrollamos landing pages, páginas web a medida y sistemas web con usuarios, base de datos, login, panel admin, automatizaciones y funcionalidades personalizadas.",
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
  serviceType: "Diseño y desarrollo web",
  name: "Landing pages, páginas web a medida y sistemas web",
  provider: {
    "@type": "Organization",
    name: "Oriavision",
    url: SITE_URL,
  },
  areaServed: "AR",
  url: PAGE_URL,
  description:
    "Desarrollamos landing pages, páginas web a medida y sistemas web con usuarios, base de datos, login, panel admin, automatizaciones, newsletters y paneles de gestión.",
};

type Project = {
  title: string;
  kind: string;
  status?: string;
  href: string;
  domain: string;
  description: string;
  stack?: string[];
  image?: string;
};

const services = [
  {
    title: "Landing pages",
    text: "Ideales para campañas, servicios, link en bio o presentar una propuesta de forma clara y profesional.",
  },
  {
    title: "Páginas web a medida",
    text: "Para negocios que necesitan mejor estructura, más secciones, formularios, contenido y una presencia digital más sólida.",
  },
  {
    title: "Sistemas y automatizaciones",
    text: "También desarrollamos soluciones con usuarios, login, base de datos, panel admin, newsletters, secuencias automáticas y funciones específicas.",
  },
];

const process = [
  {
    step: "01",
    title: "Nos contás qué necesitás",
    text: "Completás el formulario con tu idea, rubro y objetivo principal.",
  },
  {
    step: "02",
    title: "Definimos el enfoque",
    text: "Vemos si conviene una landing, una web a medida o un sistema más completo.",
  },
  {
    step: "03",
    title: "Diseño y desarrollo",
    text: "Armamos una propuesta clara, moderna y alineada a tu negocio.",
  },
  {
    step: "04",
    title: "Entrega y evolución",
    text: "Dejamos todo listo para salir online y seguir mejorándolo si hace falta.",
  },
];

const projects: Project[] = [
  {
    title: "Siempre de Guardia",
    kind: "Directorio / plataforma",
    href: "https://siempredeguardia.com.ar/",
    domain: "siempredeguardia.com.ar",
    description:
      "Plataforma orientada a encontrar servicios disponibles de forma rápida, con categorías claras, acceso de usuarios y una navegación práctica.",
    stack: ["Directorio", "Servicios", "Login"],
    image: "/portfolio/siempredeguardia.png",
  },
  {
    title: "Quirvo",
    kind: "Landing de producto",
    href: "https://www.quirvo.com.ar/",
    domain: "www.quirvo.com.ar",
    description:
      "Landing orientada a presentar el producto, explicar su propuesta de valor y comunicar una solución clara y moderna.",
    stack: ["Producto", "Presentación", "Landing"],
    image: "/portfolio/quirvo.png",
  },
  {
    title: "Calculadora ML — Landing",
    kind: "Landing page",
    href: "https://calculadoraml.oriavision.com.ar/",
    domain: "calculadoraml.oriavision.com.ar",
    description:
      "Landing enfocada en presentar la propuesta, explicar beneficios y derivar a la herramienta principal.",
    stack: ["Marketing", "Conversión", "CTA clara"],
    image: "/portfolio/calculadora-landing.png",
  },
  {
    title: "dbengotech",
    kind: "Web de servicios",
    href: "https://dbengotech.com.ar/",
    domain: "dbengotech.com.ar",
    description:
      "Sitio orientado a comunicar servicios, propuesta de valor y enfoque de trabajo de forma más profesional.",
    stack: ["Servicios", "Presentación", "Marca"],
    image: "/portfolio/dbengotech.png",
  },
];

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-300" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-300" />
        <div className="ml-2 truncate rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-500">
          {project.domain}
        </div>
      </div>

      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="h-64 w-full object-cover object-top md:h-72"
        />
      ) : (
        <div className="relative flex h-64 w-full items-end overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-brand-600 p-6 md:h-72">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />
          <div className="relative z-10 max-w-sm">
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white/90 backdrop-blur">
              {project.kind}
            </div>
            <div className="mt-4 text-2xl font-black leading-tight tracking-tight text-white">
              {project.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:p-5">
      <ProjectPreview project={project} />

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-brand-700">
            {project.kind}
          </span>

          {project.status ? (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-amber-700">
              {project.status}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
          {project.title}
        </h3>

        <p className="mt-3 text-base font-medium leading-relaxed text-slate-600">
          {project.description}
        </p>

        {project.stack?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-100 transition hover:bg-brand-700"
          >
            Ver online
          </a>

          <a
            href="#formulario"
            className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:border-brand-200 hover:text-brand-700"
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
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="relative overflow-hidden px-4 pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),transparent_36%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                Servicios web
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                Landing pages, webs a medida y sistemas web para mostrar mejor tu negocio
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-600 md:text-xl">
                Desarrollamos desde páginas simples hasta sistemas más completos con usuarios,
                base de datos, login, panel admin, automatizaciones y funciones a medida.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#trabajos"
                  className="inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-blue-200 transition hover:bg-brand-700"
                >
                  Ver trabajos
                </a>

                <a
                  href="#formulario"
                  className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-base font-extrabold text-slate-800 transition hover:border-brand-200 hover:text-brand-700"
                >
                  Enviar info
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-500">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Landing pages
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Webs a medida
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Usuarios y login
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Base de datos
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Panel admin
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Automatización de emails
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Newsletters y secuencias
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <h2 className="text-xl font-black tracking-tight text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-base font-medium leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="rounded-[2.5rem] border border-slate-200 bg-slate-50 p-8 md:p-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                  Qué hacemos
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  No solo hacemos páginas lindas: buscamos que expliquen bien y funcionen
                </h2>

                <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">
                  Una buena web tiene que transmitir confianza, ordenar la propuesta y facilitar
                  la acción. Y cuando hace falta, también puede sumar lógica, usuarios, paneles,
                  automatizaciones, newsletters, secuencias automáticas y herramientas propias.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900">Ideal para</h3>
                  <ul className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-600">
                    <li>• Negocios que todavía no tienen una web sólida</li>
                    <li>• Marcas que necesitan una landing para campañas o redes</li>
                    <li>• Servicios que quieren recibir más consultas</li>
                    <li>• Proyectos que necesitan verse mejor y comunicar con claridad</li>
                    <li>• Empresas que necesitan un sistema interno o una herramienta web</li>
                  </ul>
                </div>

                <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900">Podemos ayudarte con</h3>
                  <ul className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-600">
                    <li>• Sitios de servicios e institucionales</li>
                    <li>• Landing pages para campañas</li>
                    <li>• Formularios de contacto o consulta</li>
                    <li>• Registro e ingreso de usuarios</li>
                    <li>• Base de datos y panel administrador</li>
                    <li>• Automatización de emails y respuestas</li>
                    <li>• Newsletters y secuencias automáticas</li>
                    <li>• Paneles para cargar productos, propiedades o servicios</li>
                    <li>• Gestión de proveedores o catálogos internos</li>
                    <li>• Herramientas y funciones a medida</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="trabajos" className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                Trabajos destacados
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Algunos trabajos destacados hechos por nosotros
              </h2>

              <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">
                Acá mostramos una selección de proyectos para que puedas ver distintos tipos de trabajo:
                landing pages, sitios de servicios, directorios y desarrollos más completos.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                  Cómo trabajamos
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Un proceso simple para avanzar más rápido
                </h2>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {process.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
                  >
                    <div className="text-sm font-black text-brand-700">{item.step}</div>
                    <h3 className="mt-3 text-lg font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="formulario" className="px-4 pb-20 pt-10 md:pb-24 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <WebRequestForm />
          </Reveal>

          <div className="mt-8 text-center text-sm font-semibold text-slate-500">
            Preferís escribir directo?{" "}
            <a
              href="mailto:soporte@oriavision.com.ar"
              className="font-extrabold text-brand-600 hover:text-brand-700"
            >
              soporte@oriavision.com.ar
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}