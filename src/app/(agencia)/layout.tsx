import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "./agencia.css";
import { WHATSAPP_NUMBER } from "./shared";

const SITE_URL = "https://www.oriavision.com.ar";
const DESCRIPTION =
  "Diseño web con identidad propia. Sitios personalizados, posicionamiento SEO, campañas en Meta y Google Ads para negocios y profesionales.";
const OG_IMAGE = {
  url: "/og/oriavision-agencia.png",
  width: 1200,
  height: 630,
  alt: "ORIAVISION · Tu marca. Otra dimensión.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "ORIAVISION",
  // Título, descripción, canonical y Open Graph los define cada página con pageMetadata().
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a4531",
};

const SERVICES = [
  ["Diseño web", "Sitios que presentan tu negocio con claridad, funcionan bien en el celular y hacen más simple recibir consultas."],
  ["Posicionamiento SEO", "Trabajamos la estructura, el contenido y los aspectos técnicos de tu sitio para mejorar su presencia en los buscadores."],
  ["Campañas en Meta", "Planificamos anuncios en Instagram y Facebook para acercar tu propuesta a las personas que pueden interesarse en ella."],
  ["Campañas en Google Ads", "Conectamos tu negocio con búsquedas relacionadas con tus productos o servicios, con anuncios y páginas de destino alineados."],
  ["Contenido e identidad", "Textos, imágenes y piezas digitales que explican lo que hacés y mantienen una identidad consistente en tu web y tus campañas."],
  ["Evolución de tu sitio", "Actualizamos contenidos, revisamos mejoras y sumamos las funciones que tu negocio necesita: reservas, formularios e integraciones."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "ORIAVISION",
      alternateName: "oriavision.com.ar",
      url: `${SITE_URL}/`,
      inLanguage: "es-AR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: "ORIAVISION",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/assets/oriavision-logo-original.jpg`,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      description: DESCRIPTION,
      slogan: "Tu marca. Otra dimensión.",
      telephone: `+${WHATSAPP_NUMBER}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Buenos Aires",
        addressCountry: "AR",
      },
      areaServed: { "@type": "Country", name: "Argentina" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de diseño web y presencia digital",
        itemListElement: SERVICES.map(([name, description]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, description },
        })),
      },
    },
  ],
};

export default function AgenciaLayout({ children }: { children: React.ReactNode }) {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;
  preload("/assets/ethnocentric.otf", { as: "font", type: "font/otf", crossOrigin: "" });

  return (
    <html lang="es-AR">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {token ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token, spa: true })}
          />
        ) : null}
      </head>
      <body id="inicio">{children}</body>
    </html>
  );
}
