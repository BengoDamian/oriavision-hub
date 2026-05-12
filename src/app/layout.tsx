import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://www.oriavision.com.ar";
const SITE_NAME = "Oriavision";
const DEFAULT_TITLE = "Oriavision";
const DEFAULT_DESCRIPTION =
  "Calculadora ML, prompts, guías y páginas web para vender mejor en MercadoLibre y e-commerce.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Oriavision",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon" }],
    apple: [{ url: "/apple-icon" }],
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Oriavision | Calculadora ML, prompts, guías y páginas web",
    description:
      "Calculadora ML, recursos gratuitos y páginas web a medida para vender mejor en MercadoLibre y e-commerce.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Oriavision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oriavision | Calculadora ML, prompts, guías y páginas web",
    description:
      "Calculadora ML, recursos gratuitos y páginas web a medida para vender mejor en MercadoLibre y e-commerce.",
    images: ["/og/home.png"],
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "oriavision.com.ar",
  url: SITE_URL,
  inLanguage: "es-AR",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "oriavision.com.ar",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

  return (
    <html lang="es-AR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        {token ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token,
              spa: true,
            })}
          />
        ) : null}
      </head>

      <body
        className="min-h-screen flex flex-col bg-white font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-700"
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}