import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";
import { getAllPromptsMerged } from "@/lib/content";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/prompts/`;

export const metadata: Metadata = {
  title: "Prompts para MercadoLibre y e-commerce",
  description:
    "Prompts listos para leer, copiar y usar. Recursos gratuitos de Oriavision para vender mejor en MercadoLibre y e-commerce.",
  alternates: {
    canonical: "/prompts/",
  },
  openGraph: {
    url: PAGE_URL,
    title: "Prompts para MercadoLibre y e-commerce | Oriavision",
    description:
      "Prompts listos para leer, copiar y usar. Recursos gratuitos de Oriavision para vender mejor en MercadoLibre y e-commerce.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Prompts de Oriavision",
      },
    ],
  },
  twitter: {
    title: "Prompts para MercadoLibre y e-commerce | Oriavision",
    description:
      "Prompts listos para leer, copiar y usar. Recursos gratuitos de Oriavision para vender mejor en MercadoLibre y e-commerce.",
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
      name: "Prompts",
      item: PAGE_URL,
    },
  ],
};

export default function PromptsPage() {
  const prompts = getAllPromptsMerged();

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
                Prompts
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-textBody md:text-xl">
                Prompts listos para leer, copiar y usar. Sin vueltas y sin humo.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {prompts.map((p, i) => (
              <Reveal key={p.id} delay={0.05 + i * 0.04}>
                <Link
                  href={`/prompts/${p.id}/`}
                  className="group block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                    {p.category}
                  </div>

                  <h2 className="mt-4 text-2xl font-black text-slate-900 transition-colors group-hover:text-brand-700">
                    {p.title}
                  </h2>

                  <p className="mt-3 font-medium leading-relaxed text-textBody">
                    {p.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 font-extrabold text-brand-600">
                    Ver prompt <ArrowRight className="h-4 w-4" />
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