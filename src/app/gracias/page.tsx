import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Suscripción confirmada",
  description: "Listo. Ya estás adentro.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-xl px-5 py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">Listo ✅</h1>
          <p className="mt-3 font-semibold text-textBody">
            Te sumamos al contenido semanal. Revisá tu mail.
          </p>

          <div className="mt-8 grid gap-3">
            <a
              href="/go/calculadora"
              className="rounded-full bg-brand-600 px-8 py-3 font-extrabold text-white transition-colors hover:bg-brand-700"
            >
              Abrir Calculadora ML
            </a>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/prompts/"
                className="rounded-full border-2 border-slate-200 px-6 py-3 font-extrabold text-slate-900 transition-colors hover:border-brand-600 hover:text-brand-600"
              >
                Ver Prompts
              </Link>
              <Link
                href="/guias/"
                className="rounded-full border-2 border-slate-200 px-6 py-3 font-extrabold text-slate-900 transition-colors hover:border-brand-600 hover:text-brand-600"
              >
                Ver Guías
              </Link>
            </div>
          </div>

          <p className="mt-6 text-xs font-semibold text-slate-500">
            Si no te llega, revisá Promociones/Spam y marcá “No es spam”.
          </p>
        </div>
      </div>
    </main>
  );
}