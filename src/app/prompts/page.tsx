import Link from "next/link";
import { prompts } from "@/lib/prompts";

const calcHref = "https://calculadoraml.oriavision.com.ar";

export default function PromptsPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Prompts
            </h1>
            <p className="mt-3 text-textBody font-medium max-w-2xl">
              Entrá a un prompt para verlo completo y copiarlo en un click.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prompts.map((p) => (
              <Link
                key={p.id}
                href={`/prompts/${p.id}`}
                className="group block bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
                    {p.category}
                  </div>
                  {p.featured && (
                    <div className="text-[10px] font-black px-3 py-1 rounded-full bg-blue-100 text-brand-600 uppercase tracking-widest">
                      Destacado
                    </div>
                  )}
                </div>

                <h3 className="mt-4 text-2xl font-black text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-textBody font-medium leading-relaxed">
                  {p.description}
                </p>

                {p.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 font-extrabold text-brand-600 group-hover:text-brand-700">
                  Ver prompt →
                </div>
              </Link>
            ))}
          </div>

          {/* Promo calculadora (sutil) */}
          <div className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-sm font-extrabold text-brand-600 uppercase tracking-widest">
                Calculadora ML
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900">
                ¿Querés cerrar el precio final?
              </div>
              <p className="mt-2 text-textBody font-medium">
                Calculá costo, comisiones e impuestos en segundos.
              </p>
            </div>

            <a
              href={calcHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3 text-white font-extrabold hover:bg-brand-700 transition-colors"
            >
              Abrir Calculadora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}