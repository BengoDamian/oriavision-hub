import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../globals.css";
import "./reference-resources.css";
import { ReferenceHeader, ReferenceFooter, ReferenceWhatsApp } from "@/components/ReferenceChrome";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  themeColor: "#13183c",
};

const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

  return (
    <html lang="es-AR">
      <head>
        <link rel="stylesheet" href="/experience.css" />
        <link rel="stylesheet" href="/buttons.css" />
        {token ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token, spa: true })}
          />
        ) : null}
      </head>

      <body className="resource-page"><a className="skip" href="#contenido">Saltar al contenido</a><ReferenceHeader /><main id="contenido" className="legacy-content">{children}</main><ReferenceFooter /><ReferenceWhatsApp /><GoogleAnalytics /><Script src="/experience.js" strategy="afterInteractive" /></body>
    </html>
  );
}
