import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto de Oriavision.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Contacto() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container py-24 text-center">
        <h1 className="mb-4 text-4xl font-black text-slate-900">Hablemos</h1>
        <p className="mb-8 text-textBody font-medium">
          Envianos tus dudas o sugerencias.
        </p>
        <a
          href="mailto:soporte@oriavision.com.ar"
          className="text-2xl font-bold text-brand-600 underline"
        >
          soporte@oriavision.com.ar
        </a>
      </div>
    </main>
  );
}