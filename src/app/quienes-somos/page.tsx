import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Oriavision",
  description: "Información general sobre Oriavision.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function QuienesSomos() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container max-w-3xl py-24 text-center">
        <h1 className="mb-8 text-4xl font-black text-brand-600">
          Sobre Oriavision
        </h1>

        <p className="text-xl leading-relaxed text-textBody font-medium">
          Somos un equipo que vende, prueba y construye herramientas para
          trabajar mejor. Oriavision nace desde problemas reales de operación,
          números y venta online, con foco en soluciones simples, claras y
          útiles.
        </p>
      </div>
    </main>
  );
}