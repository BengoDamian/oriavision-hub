import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WebRequestForm from "@/components/WebRequestForm";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/web/`;

export const metadata: Metadata = {
  title: "Landing pages, webs a medida y sistemas web | Oriavision",
  description:
    "Desarrollamos desde landing pages simples hasta webs y sistemas a medida con usuarios, base de datos, login, panel admin y automatizaciones.",
  alternates: {
    canonical: "/web/",
  },
  openGraph: {
    url: PAGE_URL,
    title: "Landing pages, webs a medida y sistemas web | Oriavision",
    description:
      "Desarrollamos desde landing pages simples hasta webs y sistemas a medida con usuarios, base de datos, login, panel admin y automatizaciones.",
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
      "Desarrollamos desde landing pages simples hasta webs y sistemas a medida con usuarios, base de datos, login, panel admin y automatizaciones.",
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
    "Desarrollamos desde landing pages simples hasta sistemas web a medida con usuarios, base de datos, login, panel administrador y automatizaciones.",
};

const solutions = [
  {
    title: "Landing pages",
    text: "Ideales para campañas, servicios, link en bio o presentar una propuesta de forma clara y profesional.",
  },
  {
    title: "Páginas web a medida",
    text: "Para negocios que necesitan más secciones, mejor estructura, formularios, contenido, recursos o páginas internas.",
  },
  {
    title: "Sistemas web con usuarios",
    text: "También desarrollamos soluciones más completas con base de datos, registro de usuarios, login, panel admin y funcionalidades a medida.",
  },
];

const process = [
  {
    step: "01",
    title: "Nos contás qué necesitás",
    text: "Completás el formulario con tu idea, tu rubro y el objetivo principal del proyecto.",
  },
  {
    step: "02",
    title: "Definimos el enfoque",
    text: "Vemos si conviene una landing simple, una web más completa o un sistema web con lógica propia.",
  },
  {
    step: "03",
    title: "Diseño y desarrollo",
    text: "Armamos una propuesta clara, moderna y alineada a tu negocio y a lo que necesitás resolver.",
  },
  {
    step: "04",
    title: "Entrega y ajustes",
    text: "Revisamos el resultado final y dejamos todo listo para salir online o continuar evolucionándolo.",
  },
];

const portfolioItems = [
  {
    title: "Oriavision Hub",
    badge: "Sitio institucional + contenido",
    text: "Hub principal de marca con recursos, servicios, SEO y estructura pensada para captar visitas y derivarlas a herramientas y servicios.",
    href: "https://www.oriavision.com.ar/",
    cta: "Ver proyecto",
  },
  {
    title: "Calculadora ML",
    badge: "Herramienta web",
    text: "Aplicación web enfocada en resolver cálculos reales de rentabilidad, comisiones, impuestos y precio de venta para MercadoLibre.",
    href: "https://calculadoraml.oriavision.com.ar/",
    cta: "Ver proyecto",
  },

  // Cuando quieras sumar más ejemplos públicos, duplicá este bloque:
  // {
  //   title: "Quirvo",
  //   badge: "Web app / producto",
  //   text: "Breve descripción del proyecto.",
  //   href: "https://tu-dominio.com/",
  //   cta: "Ver proyecto",
  // },
  // {
  //   title: "Siempre de Guardia",
  //   badge: "Marketplace / plataforma",
  //   text: "Breve descripción del proyecto.",
  //   href: "https://tu-dominio.com/",
  //   cta: "Ver proyecto",
  // },
];

export default function WebPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
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
                Creamos desde landing pages simples hasta webs y sistemas a medida con formularios,
                base de datos, usuarios, panel admin y funcionalidades pensadas para tu negocio.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#pedido-web"
                  className="inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-blue-200 transition hover:bg-brand-700"
                >
                  Pedir mi página web
                </a>

                <a
                  href="#proyectos"
                  className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-base font-extrabold text-slate-800 transition hover:border-brand-200 hover:text-brand-700"
                >
                  Ver proyectos
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
                  Automatizaciones
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
              {solutions.map((item) => (
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
                  Qué resolvemos
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Una web no es solo diseño: tiene que explicar bien, transmitir confianza y funcionar
                </h2>

                <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">
                  Muchas veces el problema no es el producto o el servicio, sino cómo se presenta.
                  Una buena web ordena tu propuesta, transmite confianza y hace más fácil que te contacten.
                  Y cuando hace falta, también puede sumar usuarios, base de datos, paneles y automatizaciones.
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
                    <li>• Empresas que necesitan un sistema interno o una web con usuarios</li>
                  </ul>
                </div>

                <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900">Podemos ayudarte con</h3>
                  <ul className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-600">
                    <li>• Presentación de servicios</li>
                    <li>• Formularios de contacto o pedido</li>
                    <li>• Landing pages para campañas</li>
                    <li>• Sitios con múltiples secciones</li>
                    <li>• Registro e ingreso de usuarios</li>
                    <li>• Base de datos y panel administrador</li>
                    <li>• Funcionalidades e integraciones a medida</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="proyectos" className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                Proyectos destacados
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Algunas páginas y herramientas que ya desarrollamos
              </h2>

              <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">
                Mostrar ejemplos reales genera mucha más confianza que solo describir servicios.
                Acá podés dejar visibles tus proyectos para que la gente vea el nivel y el estilo de trabajo.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {portfolioItems.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-600">
                    {item.badge}
                  </div>

                  <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base font-medium leading-relaxed text-slate-600">
                    {item.text}
                  </p>

                  <div className="mt-6">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-100 transition hover:bg-brand-700"
                    >
                      {item.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm font-semibold leading-relaxed text-slate-600">
              Consejo: tratá de mostrar 3 a 5 proyectos públicos como máximo. Mejor pocos y buenos que una lista larga.
              Si querés, en el próximo paso te lo dejo con capturas, rubro, tipo de proyecto y botón “Ver online”.
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

      <section id="pedido-web" className="px-4 pb-20 pt-10 md:pb-24 md:pt-14">
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