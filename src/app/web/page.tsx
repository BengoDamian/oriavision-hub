import type { Metadata } from "next";
import WebRequestForm from "@/components/WebRequestForm";
import Reveal from "@/components/Reveal";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/web/`;

export const metadata: Metadata = {
  title: "Landing pages y páginas web a medida",
  description:
    "Pedí una landing page o una página web a medida para tu proyecto. Simple, rápida y enfocada a conversión.",
  alternates: {
    canonical: "/web/",
  },
  openGraph: {
    url: PAGE_URL,
    title: "Landing pages y páginas web a medida | Oriavision",
    description:
      "Pedí una landing page o una página web a medida para tu proyecto. Simple, rápida y enfocada a conversión.",
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
    title: "Landing pages y páginas web a medida | Oriavision",
    description:
      "Pedí una landing page o una página web a medida para tu proyecto. Simple, rápida y enfocada a conversión.",
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

export default function WebPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <section className="px-4 pb-20 pt-24 md:pb-24 md:pt-28">
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