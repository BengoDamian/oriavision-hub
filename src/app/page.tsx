import {
  ArrowRight,
  Calculator,
  BarChart3,
  Users,
  CheckCircle2,
  MessageCircle,
  FileText,
  ClipboardList,
  BookOpen,
} from "lucide-react";
import PromptCard from "@/components/PromptCard";
import { prompts } from "@/lib/prompts";

export default function Home() {
  const whatsappHref =
    "https://wa.me/5491127575675?text=Hola%20OriaVisi%C3%B3n%21%20Vi%20el%20Hub%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20herramientas.%20%C2%BFMe%20ayudan%3F";

  const calcHref = "https://calculadoraml.oriavision.com.ar";

  return (
    <main className="flex flex-col min-h-screen pb-24">
      {/* Floating Calculadora ML button (abajo izquierda) */}
      <a
        href={calcHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir Calculadora ML"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[60] inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-white font-extrabold shadow-2xl hover:scale-[1.03] active:scale-[0.99] transition-transform"
      >
        <Calculator className="w-5 h-5" />
        <span className="hidden sm:inline">Calculadora ML</span>
      </a>

      {/* Floating WhatsApp button (abajo derecha) */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] inline-flex items-center gap-2 rounded-full bg-[#25D366] p-4 sm:px-5 sm:py-3 text-white font-extrabold shadow-2xl hover:scale-[1.03] active:scale-[0.99] transition-transform"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* HERO */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-blue-100">
            <span className="w-2 h-2 bg-brand-600 rounded-full animate-pulse" />
            Hub de Herramientas v1.0
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 text-balance">
            Todo lo que necesitás para <br className="hidden md:block" />
            <span className="text-brand-600 relative inline-block">
              escalar tu E-commerce.
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-3xl mx-auto font-medium leading-relaxed text-balance">
            En Oriavision creamos soluciones simples para problemas complejos de Mercado Libre. Menos planillas de Excel,
            más rentabilidad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#herramientas"
              className="w-full sm:w-auto px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold rounded-full transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
            >
              VER HERRAMIENTAS
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#recursos"
              className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600 text-lg font-bold rounded-full transition-all"
            >
              RECURSOS
            </a>

            <a
              href="#prompts"
              className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600 text-lg font-bold rounded-full transition-all"
            >
              PROMPTS
            </a>
          </div>

          {/* Atajo sutil a la calculadora (no invasivo) */}
          <div className="mt-6 text-sm text-slate-500 font-semibold">
            ¿Querés ir directo al número?{" "}
            <a
              href={calcHref}
              target="_blank"
              rel="noreferrer"
              className="text-brand-600 hover:text-brand-700 font-extrabold"
            >
              Abrir Calculadora ML →
            </a>
          </div>
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section id="herramientas" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Herramientas</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Seleccioná una para empezar a trabajar.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Calculadora destacada */}
            <div className="group bg-white rounded-[2rem] p-8 border-2 border-blue-100 hover:border-brand-600 transition-all duration-300 shadow-lg shadow-blue-50 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">
                MÁS USADA
              </div>

              <div className="w-14 h-14 bg-blue-100 text-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">Calculadora ML</h3>
              <p className="text-slate-500 mb-8 font-medium leading-relaxed flex-grow">
                Calculá costos, comisiones e impuestos exactos (IIBB, Ganancias) para publicar con precio correcto.
              </p>

              <a
                href={calcHref}
                target="_blank"
                rel="noreferrer"
                className="mt-auto w-full py-3 rounded-xl border-2 border-brand-600 text-brand-600 font-bold uppercase text-sm hover:bg-brand-600 hover:text-white transition-colors text-center block"
              >
                Abrir herramienta
              </a>
            </div>

            {/* Analizador */}
            <div className="group bg-white rounded-[2rem] p-8 border-2 border-slate-100 hover:border-slate-300 transition-all duration-300 flex flex-col opacity-80 hover:opacity-100">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Analizador de Stock</h3>
              <p className="text-slate-500 mb-8 font-medium leading-relaxed flex-grow">
                Predicciones de quiebre de stock basadas en tu historial de ventas real. Evitá pausar publicaciones.
              </p>
              <button
                disabled
                className="mt-auto w-full py-3 rounded-xl bg-slate-100 text-slate-400 font-bold uppercase text-sm cursor-not-allowed"
              >
                Próximamente
              </button>
            </div>

            {/* Auditor */}
            <div className="group bg-white rounded-[2rem] p-8 border-2 border-slate-100 hover:border-slate-300 transition-all duration-300 flex flex-col opacity-80 hover:opacity-100">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Auditor de Competencia</h3>
              <p className="text-slate-500 mb-8 font-medium leading-relaxed flex-grow">
                Espiá legalmente a tus competidores. Descubrí qué títulos y fotos usan los que más venden.
              </p>
              <button
                disabled
                className="mt-auto w-full py-3 rounded-xl bg-slate-100 text-slate-400 font-bold uppercase text-sm cursor-not-allowed"
              >
                En desarrollo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section id="recursos" className="py-24 bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Recursos</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Guías, plantillas y checklists para vender mejor (todo en un solo lugar).
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 flex flex-col">
              <div className="w-14 h-14 bg-blue-100 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Checklists</h3>
              <p className="text-slate-500 font-medium leading-relaxed flex-grow">
                Listas rápidas para auditar publicaciones, títulos, fotos y conversiones.
              </p>
              <button
                disabled
                className="mt-8 w-full py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-400 font-bold uppercase text-sm cursor-not-allowed"
              >
                Próximamente
              </button>
            </div>

            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 flex flex-col">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Plantillas</h3>
              <p className="text-slate-500 font-medium leading-relaxed flex-grow">
                Plantillas para descripciones, preguntas frecuentes y mensajes automáticos.
              </p>
              <button
                disabled
                className="mt-8 w-full py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-400 font-bold uppercase text-sm cursor-not-allowed"
              >
                Próximamente
              </button>
            </div>

            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 flex flex-col">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Guías</h3>
              <p className="text-slate-500 font-medium leading-relaxed flex-grow">
                Guías simples y accionables (rentabilidad, estrategia, contenido).
              </p>
              <button
                disabled
                className="mt-8 w-full py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-400 font-bold uppercase text-sm cursor-not-allowed"
              >
                Próximamente
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section id="prompts" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Prompts listos para usar
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Copiá, pegá y reemplazá los campos. Hechos para Mercado Libre y contenido.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prompts.map((p) => (
              <PromptCard key={p.id} item={p} />
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-slate-500 font-semibold">
            Tip: después de armar tu publicación, podés{" "}
            <a
              href={calcHref}
              target="_blank"
              rel="noreferrer"
              className="text-brand-600 hover:text-brand-700 font-extrabold"
            >
              calcular el precio final en la Calculadora ML →
            </a>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="nosotros" className="py-24 bg-white overflow-hidden scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block">
                Sobre Oriavision
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Vendedores desarrollando para <span className="text-brand-600">vendedores.</span>
              </h2>

              <div className="space-y-6 text-lg text-slate-500 font-medium leading-relaxed">
                <p>
                  No somos una agencia de marketing tradicional. Somos un equipo que nació vendiendo en Mercado Libre y
                  entendió que <strong>sin datos claros, se pierde dinero.</strong>
                </p>
                <p>
                  Oriavision es nuestro Hub de herramientas internas que decidimos abrir al público. Nuestro objetivo es
                  simple: democratizar la inteligencia de datos para el e-commerce.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                {["Datos precisos en tiempo real", "Enfoque en rentabilidad neta", "Soporte local en Argentina"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="text-brand-600 w-6 h-6" />
                      <span className="font-bold text-slate-800">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-brand-600 rounded-[3rem] rotate-3 opacity-10" />
              <div className="relative bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl">
                <div className="text-6xl font-black mb-2 text-brand-400">100%</div>
                <div className="text-2xl font-bold mb-8">Enfoque Analítico</div>
                <p className="text-slate-300 leading-relaxed mb-8">
                  "Lo que no se mide, no se puede mejorar. Nuestras herramientas eliminan la intuición y ponen números
                  reales sobre la mesa."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-full" />
                  <div>
                    <div className="font-bold">Equipo Oriavision</div>
                    <div className="text-sm text-slate-400">Buenos Aires, AR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-brand-50 border-t border-brand-100 text-center px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black mb-6 text-slate-900">¿Tenés una idea para una herramienta?</h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            Siempre estamos buscando nuevas formas de ayudar a los vendedores. Escribinos y contanos qué necesitás.
          </p>

          <a
            href="mailto:contacto@oriavision.com"
            className="inline-block px-8 py-3 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-full hover:border-brand-600 transition-colors"
          >
            CONTACTAR SOPORTE
          </a>
        </div>
      </section>
    </main>
  );
}