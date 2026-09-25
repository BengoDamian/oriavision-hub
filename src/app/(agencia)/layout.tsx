import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "./agencia.css";
import { WHATSAPP_NUMBER } from "./shared";

const SITE_URL = "https://www.oriavision.com.ar";
const TITLE = "ORIAVISION · Diseño web y presencia digital";
const DESCRIPTION =
  "Diseño web con identidad propia. Sitios personalizados, presencia en Google, marketing digital y mantenimiento para negocios y profesionales.";
const OG_IMAGE = {
  url: "/og/oriavision-agencia.png",
  width: 1200,
  height: 630,
  alt: "ORIAVISION · Tu marca. Otra dimensión.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "ORIAVISION",
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: `${SITE_URL}/`,
    siteName: "ORIAVISION",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
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
  themeColor: "#164c3f",
};

const SERVICES = [
  ["Diseño web", "Landing pages y sitios profesionales que presentan tus servicios con claridad y facilitan las consultas."],
  ["Presencia en Google", "Preparamos tu sitio para que Google pueda encontrarlo y trabajamos la información de tu negocio en búsquedas y mapas."],
  ["Marketing y medición", "Conectamos tu propuesta, tus campañas y tu web. Medimos visitas y consultas para entender qué mejorar."],
  ["Contenido e imagen", "Textos, imágenes y piezas para comunicar mejor lo que hacés, con una identidad consistente en cada punto de contacto."],
  ["Mantenimiento", "Actualizaciones de contenido, nuevas secciones y mejoras para que tu sitio acompañe la evolución de tu negocio."],
  ["Funciones a medida", "Cuando necesitás algo más: reservas, paneles, formularios especiales e integraciones que simplifican tu trabajo."],
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
