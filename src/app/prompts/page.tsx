import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prompts } from "@/lib/prompts";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Prompts",
  description: "Prompts listos para copiar y usar para vender mejor.",
};

export const dynamic = "error";
export const dynamicParams = false;

export default function PromptsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="text-center mb-14">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                Prompts
              </h1>
              <p className="mt-4 text-lg md:text-xl text-textBody font-medium max-w-2xl mx-auto">
                Entrás, leés el prompt completo y lo copiás con un botón. Listo para usar.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prompts.map((p, i) => (
              <Reveal key={p.id} delay={0.05 + i * 0.04}>
                <Link
                  href={`/prompts/${p.id}/`}
                  className="group block bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                    {p.category}
                  </div>

                  <h2 className="mt-4 text-2xl font-black text-slate-900 group-hover:text-brand-700 transition-colors">
                    {p.title}
                  </h2>

                  <p className="mt-3 text-textBody font-medium leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-brand-600 font-extrabold">
                    Ver prompt <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Newsletter también en listado de prompts */}
      <Newsletter />
    </main>
  );
}