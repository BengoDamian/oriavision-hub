import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prompts } from "@/lib/prompts";
import CopyPromptButton from "@/components/CopyPromptButton";

const calcHref = "https://calculadoraml.oriavision.com.ar";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://oriavision-hub.pages.dev";

export const dynamic = "error";
export const dynamicParams = false;

export async function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const item = prompts.find((p) => p.id === params.id);

  if (!item) {
    return {
      title: "Prompt no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/prompts/${item.id}`;

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: item.title,
      description: item.description,
      siteName: "Oriavision",
      images: [
        {
          url: "/og/prompt.png",
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
      images: ["/og/prompt.png"],
    },
  };
}

export default function PromptDetailPage({ params }: { params: { id: string } }) {
  const item = prompts.find((p) => p.id === params.id);
  if (!item) notFound();

  return (
    <main className="min-h-screen">
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/prompts"
            className="inline-flex font-extrabold text-sm text-slate-600 hover:text-brand-600 transition-colors"
          >
            ← Volver a Prompts
          </Link>

          <div className="mt-8">
            <div className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
              {item.category}
            </div>

            <h1 className="mt-3 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {item.title}
            </h1>

            <p className="mt-4 text-textBody font-medium leading-relaxed">
              {item.description}
            </p>

            {item.tags?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Prompt box */}
          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm font-extrabold text-slate-900">
                Prompt completo
              </div>
              <CopyPromptButton text={item.prompt} />
            </div>

            <pre className="mt-5 whitespace-pre-wrap text-[14px] leading-relaxed text-slate-900 font-medium">
              {item.prompt}
            </pre>
          </div>

          {/* Promo calculadora */}
          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8">
            <div className="text-sm font-extrabold text-brand-600 uppercase tracking-widest">
              Calculadora ML
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              Terminaste el prompt. Ahora cerrá el número.
            </div>
            <p className="mt-2 text-textBody font-medium">
              Calculá costo, comisiones e impuestos y publicá con rentabilidad real.
            </p>

            <div className="mt-6">
              <a
                href={calcHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3 text-white font-extrabold hover:bg-brand-700 transition-colors"
              >
                Abrir Calculadora ML
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}