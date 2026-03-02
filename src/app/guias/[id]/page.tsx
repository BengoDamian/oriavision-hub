import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides } from "@/lib/guides";
import GuideBody from "@/components/GuideBody";
import Newsletter from "@/components/Newsletter";

const CALC_URL = "https://calculadoraml.oriavision.com.ar";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.oriavision.com.ar";

export const dynamic = "error";
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ id: g.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const item = guides.find((g) => g.id === params.id);

  if (!item) {
    return {
      title: "Guía no encontrada",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/guias/${item.id}/`;

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Oriavision",
      title: item.title,
      description: item.description,
      images: [
        {
          url: `${SITE_URL}/og/guia.png`,
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
      images: [`${SITE_URL}/og/guia.png`],
    },
  };
}

export default function GuiaDetailPage({ params }: { params: { id: string } }) {
  const item = guides.find((g) => g.id === params.id);
  if (!item) return notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-6">
          <Link
            href="/guias/"
            className="text-sm font-semibold text-textBody hover:text-brand-600 transition-colors"
          >
            ← Volver a Guías
          </Link>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
              {item.category}
            </div>

            <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              {item.title}
            </h1>

            <p className="mt-3 text-textBody font-medium leading-relaxed">
              {item.description}
            </p>
          </div>

          <GuideBody content={item.content} />
        </div>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">
            ¿Querés calcular precios sin perder margen?
          </h2>
          <p className="mt-2 text-textBody font-medium">
            Abrí la Calculadora ML y sacá el precio final en segundos (contado + cuotas).
          </p>

          <a
            href={CALC_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white text-sm font-extrabold rounded-full transition-colors"
          >
            Abrir Calculadora ML
          </a>
        </div>
      </div>

      {/* ✅ Newsletter también en detalle de guías */}
      <Newsletter />
    </main>
  );
}