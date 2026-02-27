import WebRequestForm from "@/components/WebRequestForm";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Pedí tu landing",
  description: "Pedí una landing como Oriavision: simple, rápida y enfocada a conversión.",
};

export default function WebPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-24 pb-20 md:pt-28 md:pb-24 px-4">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <WebRequestForm />
          </Reveal>

          <div className="mt-8 text-center text-sm font-semibold text-slate-500">
            Preferís escribir directo?{" "}
            <a
              href="mailto:soporte@oriavision.com.ar"
              className="text-brand-600 hover:text-brand-700 font-extrabold"
            >
              soporte@oriavision.com.ar
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}