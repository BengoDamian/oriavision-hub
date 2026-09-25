import type { Metadata } from "next";
import AgencyHeader from "./AgencyHeader";
import { BrandLogo, waLink } from "./shared";

export const SITE_URL = "https://www.oriavision.com.ar";
export const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;

const OG_IMAGE = {
  url: "/og/oriavision-agencia.png",
  width: 1200,
  height: 630,
  alt: "ORIAVISION · Tu marca. Otra dimensión.",
};

/** Metadatos de cada página de la agencia: título absoluto, canonical y Open Graph propios. */
export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: `${SITE_URL}${path}`,
      siteName: "ORIAVISION",
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

export function Arrow() {
  return (
    <svg aria-hidden="true">
      <use href="#arrow" />
    </svg>
  );
}

export function External() {
  return (
    <svg aria-hidden="true">
      <use href="#external" />
    </svg>
  );
}

function IconSprite() {
  return (
    <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <symbol id="arrow" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="external" viewBox="0 0 24 24">
          <path d="M6 18 18 6M6 6h12v12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="web" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h4M7 16h7" />
        </symbol>
        <symbol id="search" viewBox="0 0 24 24">
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 6 6M7 10h6M10 7v6" />
        </symbol>
        <symbol id="chart" viewBox="0 0 24 24">
          <path d="M4 4v16h17M8 16v-4M13 16V9M18 16V5" />
        </symbol>
        <symbol id="image" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8" cy="8" r="1.5" />
          <path d="m3 17 5-5 4 4 4-6 5 7" />
        </symbol>
        <symbol id="tools" viewBox="0 0 24 24">
          <path d="m14 6 4 4M4 20l3-7L18 2l4 4-11 11-7 3ZM5 13l6 4" />
        </symbol>
        <symbol id="code" viewBox="0 0 24 24">
          <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18" />
        </symbol>
        <symbol id="whatsapp" viewBox="0 0 24 24">
          <path d="M20.5 11.5a9 9 0 0 1-13.3 7.9L2 21l1.6-5.2a9 9 0 1 1 16.9-4.3Z" />
          <path d="m8 7-1 2c1 4 3 6 7 7l2-1-2-3-2 1-2-2 1-2-3-2Z" />
        </symbol>
      </defs>
    </svg>
  );
}

function ContactSection() {
  return (
    <section className="contact" id="contacto">
      <div className="wrap">
        <div>
          <div className="eyebrow">Demos el primer paso</div>
          <h2>
            Hagamos lugar
            <br />a tu próxima idea.
          </h2>
          <p>Contanos qué hacés y qué te gustaría lograr. Te ayudamos a encontrar una propuesta para tu negocio.</p>
        </div>
        <div className="contact-action">
          <a className="btn btn-dark" href={waLink("Hola, Oriavision. Quiero conversar sobre una web para mi negocio.")} {...EXT}>
            <span>Hablemos por WhatsApp</span> <Arrow />
          </a>
          <span>Directo. Simple. Con personas.</span>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a href="/" className="brand" aria-label="ORIAVISION, volver al inicio">
              <BrandLogo />
            </a>
            <p>Diseño web con una mirada propia.</p>
          </div>
          <nav className="footer-nav" aria-label="Navegación del pie">
            <a href="/#servicios">Servicios</a>
            <a href="/proyectos/">Proyectos</a>
            <a href="/inspiracion/">Inspiración</a>
            <a href="/rubros/">Rubros</a>
            <a href="/#contacto">Contacto</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ORIAVISION · Buenos Aires, Argentina</span>
          <span>
            ¿Buscás asesoría y herramientas de MercadoLibre?{" "}
            <a href="https://edgardoadiaz.com.ar/" {...EXT}>
              Edgardo A. Díaz ↗
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/** Estructura común: sprite de íconos, salto al contenido, header, contenido, contacto y pie. */
export function AgencyPage({ children, home = false }: { children: React.ReactNode; home?: boolean }) {
  return (
    // En la referencia la portada lleva body.agency-home; sus reglas son descendentes, así que alcanza un contenedor.
    <div className={home ? "agency-home" : undefined}>
      <IconSprite />
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <AgencyHeader />
      <main id="contenido">
        {children}
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

/** Encabezado verde de las páginas internas (Proyectos, Inspiración, Rubros). */
export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-intro">
      <div className="wrap">
        <a className="back-link" href="/">
          ← Volver al inicio
        </a>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
