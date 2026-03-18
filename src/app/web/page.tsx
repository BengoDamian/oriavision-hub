import type { Metadata } from "next";
import WebRequestForm from "@/components/WebRequestForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Landing pages y páginas web a medida",
  description:
    "Pedí una landing o una página web a medida para tu proyecto. Simple, rápida y enfocada a conversión.",
};

// trigger deploy
export default function WebPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 pb-20 pt-24 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <WebRequestForm />
          </Reveal>

          <div className="mt-8 text-center text-sm font-semibold text-slate-500">
            Preferís escribir directo?{" "}
            <a
              href="mailto:soporte@oriavision.com.ar"
              className="font-extrabold text-brand-600 hover:text-brand-700"
            >
              soporte@oriavision.com.ar
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}