import type { Metadata, Viewport } from "next";
import "../globals.css";
import "./chrome.css";
import AgencyHeader from "../(agencia)/AgencyHeader";
import { BrandLogo } from "../(agencia)/shared";

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

      <body className="min-h-screen flex flex-col bg-white font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-700">
        <div className="ovc ovc-header">
          <AgencyHeader />
        </div>
        <main className="flex-grow">{children}</main>
        <div className="ovc ovc-footer">
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
              <nav className="footer-resources" aria-label="Recursos y legales">
                <a href="/guias/">Guías</a>
                <a href="/prompts/">Prompts</a>
                <a href="/legal/privacidad/">Privacidad</a>
                <a href="/legal/terminos/">Términos</a>
              </nav>
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
        </div>
      </body>
    </html>
  );
}
