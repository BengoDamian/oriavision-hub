import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyPromptButton from "@/components/CopyPromptButton";
import Newsletter from "@/components/Newsletter";
import { getPromptByIdMerged, getPromptIdsMerged } from "@/lib/content";

const calcHref = "https://calculadoraml.oriavision.com.ar";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.oriavision.com.ar";

export const dynamic = "error";
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams(): { id: string }[] {
  return getPromptIdsMerged().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getPromptByIdMerged(id);

  if (!item) {
    return {
      title: "Prompt no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/prompts/${item.id}/`;

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/prompts/${item.id}/` },
    openGraph: {
      type: "article",
      url,
      siteName: "Oriavision",
      title: item.title,
      description: item.description,
      images: [
        {
          url: `${SITE_URL}/og/prompt.png`,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [`${SITE_URL}/og/prompt.png`],
    },
  };
}

export default async function PromptDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = getPromptByIdMerged(id);

  if (!item) notFound();

  const url = `${SITE_URL}/prompts/${item.id}/`;

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
        item: `${SITE_URL}/prompts/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.title,
        item: url,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/prompts/"
            className="inline-flex text-sm font-extrabold text-slate-600 transition-colors hover:text-brand-600"
          >
            ← Volver a Prompts
          </Link>

          <div className="mt-8">
            <div className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
              {item.category}
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              {item.title}
            </h1>

            <p className="mt-4 font-medium leading-relaxed text-textBody">
              {item.description}
            </p>

            {item.tags?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-extrabold text-slate-900">
                Prompt completo
              </div>
              <CopyPromptButton text={item.prompt} />
            </div>

            <pre className="mt-5 whitespace-pre-wrap text-[14px] font-medium leading-relaxed text-slate-900">
              {item.prompt}
            </pre>
          </div>

          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8">
            <div className="text-sm font-extrabold uppercase tracking-widest text-brand-600">
              Calculadora ML
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              Terminaste el prompt. Ahora cerrá el número.
            </div>
            <p className="mt-2 font-medium text-textBody">
              Calculá costo, comisiones e impuestos y publicá con rentabilidad
              real.
            </p>

            <div className="mt-6">
              <a
                href={calcHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3 font-extrabold text-white transition-colors hover:bg-brand-700"
              >
                Abrir Calculadora ML
              </a>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}