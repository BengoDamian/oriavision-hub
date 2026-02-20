import Image from "next/image";
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
import Reveal from "@/components/Reveal";
import Blob from "@/components/Blob";

const TEAM = [
  {
    name: "Edgardo A. Díaz",
    role: "Experto en MercadoLibre y Comercio Electrónico",
    bio: "Vendedor con 18 años de experiencia. Socio Fundador de ERCAS, AVTECNO y VDS.",
    img: "/team/persona-1.jpg",
  },
  {
    name: "Analía L. Rodriguez",
    role: "Operaciones & Customer Success",
    bio: "Procesos, soporte y calidad. Enfoque total en experiencia simple y sin fricción.",
    img: "/team/persona-2.jpg",
  },
  {
    name: "Damián E. Bengochea",
    role: "Desarrollo & Producto (Full-stack)",
    bio: "Construye herramientas web rápidas y confiables, con obsesión por UX y performance.",
    img: "/team/persona-3.jpg",
  },
];

export default function Home() {
  const whatsappHref =
    "https://wa.me/5491127575675?text=Hola%20OriaVisi%C3%B3n%21%20Vi%20el%20Hub%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20herramientas.%20%C2%BFMe%20ayudan%3F";

  const calcHref = "https://calculadoraml.oriavision.com.ar";

  return (
    <main className="flex flex-col min-h-screen pb-28">
      {/* Floating Calculadora ML (abajo izquierda) */}
      <a
        href={calcHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir Calculadora ML"
        className="fixed left-4 sm:left-6 z-[70] pointer-events-auto inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-white font-extrabold shadow-2xl opacity-90 hover:opacity-100 active:opacity-100 transition-opacity bottom-[calc(env(safe-area-inset-bottom)+16px)] sm:bottom-[calc(env(safe-area-inset-bottom)+24px)]"
      >
        <Calculator className="w-5 h-5" />
        <span className="hidden sm:inline">Calculadora ML</span>
      </a>

      {/* Floating WhatsApp (abajo derecha) */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed right-4 sm:right-6 z-[70] pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#25D366] p-4 sm:px-5 sm:py-3 text-white font-extrabold shadow-2xl opacity-95 hover:opacity-100 active:opacity-100 transition-opacity bottom-[calc(env(safe-area-inset-bottom)+16px)] sm:bottom-[calc(env(safe-area-inset-bottom)+24px)]"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* HERO */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-white">
        <Blob />

        <div className="mx-auto max-w-6xl px-4 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-blue-100">
              <span className="w-2 h-2 bg-brand-600 rounded-full animate-pulse" />
              Hub de Herramientas v1.0
            </div>
          </Reveal>

          <Reveal delay={0.05}>
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
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-3xl mx-auto font-medium leading-relaxed text-balance">
              En Oriavision creamos soluciones simples para problemas complejos de Mercado Libre. Menos planillas de Excel,
              más rentabilidad.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
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
          </Reveal>

          <Reveal delay={0.2}>
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
          </Reveal>
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section id="herramientas" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Herramientas</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Seleccioná una para empezar a trabajar.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Calculadora */}
            <Reveal delay={0.05}>
              <div className="group bg-white rounded-[2rem] p-8 border-2 border-blue-100 hover:border-brand-600 transition-all duration-300 shadow-lg shadow-blue-50 relative overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">
                  MÁS USADA
                </div>

                <div className="w-14 h-14 bg-blue-100 text-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-[1.06] transition-transform">
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
            </Reveal>

            {/* Analizador */}
            <Reveal delay={0.1}>
              <div className="group bg-white rounded-[2rem] p-8 border-2 border-slate-100 hover:border-slate-300 transition-all duration-300 flex flex-col opacity-90 hover:opacity-100 hover:-translate-y-1 hover:shadow-xl">
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
            </Reveal>

            {/* Auditor */}
            <Reveal delay={0.15}>
              <div className="group bg-white rounded-[2rem] p-8 border-2 border-slate-100 hover:border-slate-300 transition-all duration-300 flex flex-col opacity-90 hover:opacity-100 hover:-translate-y-1 hover:shadow-xl">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section id="recursos" className="py-24 bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Recursos</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Guías, plantillas y checklists para vender mejor (todo en un solo lugar).
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Reveal delay={0.05}>
              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all">
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
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all">
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
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section id="prompts" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Prompts listos para usar
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Copiá, pegá y reemplazá los campos. Hechos para Mercado Libre y contenido.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prompts.map((p, i) => (
              <Reveal key={p.id} delay={0.03 * Math.min(i, 6)}>
                <PromptCard item={p} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
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
          </Reveal>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="nosotros" className="py-24 bg-white overflow-hidden scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <Reveal>
                <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block">
                  Sobre Oriavision
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                  Vendedores desarrollando para <span className="text-brand-600">vendedores.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
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
              </Reveal>

              <Reveal delay={0.15}>
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
              </Reveal>
            </div>

            <Reveal className="flex-1 relative" delay={0.08}>
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
            </Reveal>
          </div>

          {/* Equipo (3 personas) */}
          <div className="mt-16">
            <Reveal>
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900">Quiénes somos</h3>
                <p className="text-slate-500 mt-3 font-medium">
                  Un equipo chico, obsesionado con vender mejor y con menos errores.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-3">
              {TEAM.map((p, i) => (
                <Reveal key={p.name} delay={0.05 + i * 0.06}>
                  <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-28 h-28">
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-600/25 to-slate-200/60" />
                        <div className="relative w-28 h-28 rounded-full bg-white p-1 shadow-lg">
                          <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white">
                            <Image src={p.img} alt={p.name} fill sizes="112px" className="object-cover" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="text-xl font-black text-slate-900">{p.name}</div>
                        <div className="text-sm font-extrabold text-brand-600 uppercase tracking-wide mt-1">
                          {p.role}
                        </div>
                        <p className="text-slate-500 font-medium mt-3 leading-relaxed">{p.bio}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-brand-50 border-t border-brand-100 text-center px-4">
        <Reveal>
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
        </Reveal>
      </section>
    </main>
  );
}