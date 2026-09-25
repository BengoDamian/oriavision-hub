import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import GuideBody from "@/components/GuideBody";
import Newsletter from "@/components/Newsletter";
import { getGuideByIdMerged, getGuideIdsMerged } from "@/lib/content";

const CALC_URL = "https://calculadoraml.oriavision.com.ar";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.oriavision.com.ar";

export const dynamic = "error";
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams(): { id: string }[] {
  return getGuideIdsMerged().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getGuideByIdMerged(id);

  if (!item) {
    return {
      title: "Guía no encontrada",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/guias/${item.id}/`;
  const title = item.seoTitle || item.title;
  const description = item.seoDescription || item.description;

  return {
    title,
    description,
    robots: item.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    alternates: { canonical: `/guias/${item.id}/` },
    openGraph: {
      type: "article",
      url,
      siteName: "Oriavision",
      title,
      description,
      images: [
        {
          url: item.image || `${SITE_URL}/og/guia.png`,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [item.image || `${SITE_URL}/og/guia.png`],
    },
  };
}

export default async function GuiaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = getGuideByIdMerged(id);

  if (!item) notFound();

  const url = `${SITE_URL}/guias/${item.id}/`;

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
        item: `${SITE_URL}/guias/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.title,
        item: url,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.description,
    mainEntityOfPage: url,
    url,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt || item.publishedAt,
    author: {
      "@type": item.author ? "Person" : "Organization",
      name: item.author || "Oriavision",
    },
    publisher: {
      "@type": "Organization",
      name: "Oriavision",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: [item.image || `${SITE_URL}/og/guia.png`],
    inLanguage: "es-AR",
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <div className="mb-6">
          <Link
            href="/guias/"
            className="text-sm font-semibold text-textBody transition-colors hover:text-brand-600"
          >
            ← Volver a Guías
          </Link>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
              {item.category}
            </div>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              {item.title}
            </h1>

            <p className="mt-4 max-w-4xl text-base font-medium leading-7 text-textBody md:text-lg md:leading-8">
              {item.description}
            </p>
          </div>

          <GuideBody content={item.content} />
        </div>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-lg font-extrabold text-slate-900">
            ¿Querés calcular precios sin perder margen?
          </h2>
          <p className="mt-2 text-base font-medium leading-7 text-textBody">
            Abrí la Calculadora ML y sacá el precio final en segundos
            (contado + cuotas).
          </p>

          <a
            href={CALC_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3 text-sm font-extrabold text-white transition-colors hover:bg-brand-700"
          >
            Abrir Calculadora ML
          </a>
        </div>
      </div>

      <Newsletter />
    </main>
  );
}