import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";
import { getAllGuidesMerged } from "@/lib/content";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/guias/`;

export const metadata: Metadata = {
  title: "Guías gratuitas de MercadoLibre y e-commerce | Oriavision",
  description:
    "Guías gratuitas, claras, accionables y sin humo para vender mejor. Recursos gratis de Oriavision sobre MercadoLibre y e-commerce.",
  alternates: {
    canonical: "/guias/",
  },
  openGraph: {
    url: PAGE_URL,
    title: "Guías gratuitas de MercadoLibre y e-commerce | Oriavision",
    description:
      "Guías gratuitas, claras, accionables y sin humo para vender mejor. Recursos gratis de Oriavision sobre MercadoLibre y e-commerce.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Guías de Oriavision",
      },
    ],
  },
  twitter: {
    title: "Guías gratuitas de MercadoLibre y e-commerce | Oriavision",
    description:
      "Guías gratuitas, claras, accionables y sin humo para vender mejor. Recursos gratis de Oriavision sobre MercadoLibre y e-commerce.",
    images: ["/og/home.png"],
  },
};

export const dynamic = "error";
export const dynamicParams = false;

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
      name: "Guías",
      item: PAGE_URL,
    },
  ],
};

export default function GuiasPage() {
  const guides = getAllGuidesMerged();

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-brand-700">
                Recursos gratuitos
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                Guías gratuitas
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-textBody md:text-xl">
                Guías cortas, accionables y sin humo. Entrás, leés y lo aplicás al toque.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <Reveal key={g.id} delay={0.05 + i * 0.04}>
                <Link
                  href={`/guias/${g.id}/`}
                  className="group block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                    {g.category}
                  </div>

                  <h2 className="mt-4 text-2xl font-black text-slate-900 transition-colors group-hover:text-brand-700">
                    {g.title}
                  </h2>

                  <p className="mt-3 font-medium leading-relaxed text-textBody">
                    {g.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 font-extrabold text-brand-600">
                    Ver guía <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}