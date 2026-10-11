import type { Metadata, Viewport } from "next";
import "../globals.css";
import "../(agencia)/agencia.css";
import "../(agencia)/redesign-integration.css";
import { Header, Footer, WhatsAppBar } from "../(agencia)/site-components";

const SITE_URL = "https://www.oriavision.com.ar";
const SITE_NAME = "ORIAVISION";
const DEFAULT_DESCRIPTION =
  "Diseño web con identidad propia. Sitios personalizados, presencia en Google, marketing digital y mantenimiento para negocios y profesionales.";

// Sin canonical por defecto: cada página declara el suyo, así ninguna hereda por error el de la portada.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: "%s | ORIAVISION",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: SITE_NAME,
    images: [
      {
        url: "/og/oriavision-agencia.png",
        width: 1200,
        height: 630,
        alt: "ORIAVISION · Tu marca. Otra dimensión.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/oriavision-agencia.png"],
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
  themeColor: "#0a4531",
};

const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

  return (
    <html lang="es-AR">
      <head>
        {token ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token, spa: true })}
          />
        ) : null}
      </head>

      <body><a className="skip-link" href="#contenido">Saltar al contenido</a><Header /><main id="contenido" className="legacy-content">{children}</main><Footer /><WhatsAppBar /></body>
    </html>
  );
}
