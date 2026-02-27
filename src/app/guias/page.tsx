import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guides } from "@/lib/guides";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Guías",
  description: "Guías claras, accionables y sin humo para vender mejor.",
};

export const dynamic = "error";
export const dynamicParams = false;

export default function GuiasPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="text-center mb-14">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                Guías
              </h1>
              <p className="mt-4 text-lg md:text-xl text-textBody font-medium max-w-2xl mx-auto">
                Guías cortas, accionables y sin humo. Entrás, leés y lo aplicás al toque.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((g, i) => (
              <Reveal key={g.id} delay={0.05 + i * 0.04}>
                <Link
                  href={`/guias/${g.id}/`}
                  className="group block bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                    {g.category}
                  </div>

                  <h2 className="mt-4 text-2xl font-black text-slate-900 group-hover:text-brand-700 transition-colors">
                    {g.title}
                  </h2>

                  <p className="mt-3 text-textBody font-medium leading-relaxed">
                    {g.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-brand-600 font-extrabold">
                    Ver guía <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}