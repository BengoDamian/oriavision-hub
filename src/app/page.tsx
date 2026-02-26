import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, MessageCircle } from "lucide-react";
import { prompts } from "@/lib/prompts";
import { guides } from "@/lib/guides";
import Reveal from "@/components/Reveal";
import Blob from "@/components/Blob";
import Newsletter from "@/components/Newsletter";

const TEAM = [
  {
    name: "Edgardo A. Díaz",
    role: "Experto en MercadoLibre y Comercio Electrónico",
    bio: "18 años vendiendo en MercadoLibre. Fundador de ERCAS, AVTECNO y VDS. Creó Oriavision porque le faltaban herramientas que no existían.",
    img: "/team/persona-1.jpg",
  },
  {
    name: "Analía L. Rodriguez",
    role: "Operaciones & Customer Success Manager (CSM)",
    bio: "Se encarga de que todo funcione sin complicaciones. Procesos simples, soporte rápido y cero fricción.",
    img: "/team/persona-2.jpg",
  },
  {
    name: "Damián E. Bengochea",
    role: "Desarrollo & Producto (Full-stack)",
    bio: "Convierte ideas en herramientas que funcionan. Obsesionado con que sean rápidas, simples y confiables.",
    img: "/team/persona-3.jpg",
  },
];

export default function Home() {
  const whatsappHref =
    "https://wa.me/5491127575675?text=Hola%20OriaVisi%C3%B3n%21%20Vi%20el%20Hub%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20herramientas.%20%C2%BFMe%20ayudan%3F";

  const calcHref = "https://calculadoraml.oriavision.com.ar";

  // Preview Prompts: solo destacados (o los primeros 3 si no hay)
  const featuredPrompts = prompts.filter((p) => p.featured);
  const previewPrompts = (featuredPrompts.length ? featuredPrompts : prompts).slice(0, 3);

  // Preview Guías: solo destacadas (o las primeras 3 si no hay)
  const featuredGuides = guides.filter((g) => g.featured);
  const previewGuides = (featuredGuides.length ? featuredGuides : guides).slice(0, 3);

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
          <Reveal delay={0.05}>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 text-balance">
              Somos Vendedores que <br className="hidden md:block" />
              <span className="text-brand-600 relative inline-block">
                Creamos Herramientas.
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
            <p className="text-xl md:text-2xl text-textBody mb-10 max-w-3xl mx-auto font-medium leading-relaxed text-balance">
              Construimos lo que necesitábamos para vender mejor. Herramientas reales para problemas que vivimos todos los
              días. Ahora las compartimos con otros vendedores.
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

              <Link
                href="/prompts"
                className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 text-textBody hover:border-brand-600 hover:text-brand-600 text-lg font-bold rounded-full transition-all"
              >
                VER PROMPTS
              </Link>

              <Link
                href="/guias"
                className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 text-textBody hover:border-brand-600 hover:text-brand-600 text-lg font-bold rounded-full transition-all"
              >
                VER GUÍAS
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 text-sm text-textBody font-semibold">
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
              <p className="text-lg text-textBody max-w-2xl mx-auto">Nuestra herramienta principal.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Reveal delay={0.05}>
              <div className="group bg-white rounded-[2rem] p-8 border-2 border-blue-100 hover:border-brand-600 transition-all duration-300 shadow-lg shadow-blue-50 relative overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">
                  MÁS USADA
                </div>

                <div className="w-14 h-14 bg-blue-100 text-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-[1.06] transition-transform">
                  <Calculator className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">Calculadora ML</h3>
                <p className="text-textBody mb-8 font-medium leading-relaxed flex-grow">
                  Calculá tu precio exacto en segundos. Incluye costos, comisiones de plataforma, impuestos (IIBB,
                  Ganancias) y opciones de cuotas.
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
          </div>
        </div>
      </section>

      {/* PROMPTS (preview) */}
      <section id="prompts-preview" className="py-24 bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Prompts</h2>
              <p className="text-lg text-textBody max-w-2xl mx-auto">
                Entrás, leés el prompt completo y lo copiás con un botón. Listo para usar.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previewPrompts.map((p, i) => (
              <Reveal key={p.id} delay={0.05 + i * 0.05}>
                <Link
                  href={`/prompts/${p.id}`}
                  className="group block bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                    {p.category}
                  </div>

                  <h3 className="mt-4 text-2xl font-black text-slate-900 group-hover:text-brand-700 transition-colors">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-textBody font-medium leading-relaxed">{p.description}</p>

                  <div className="mt-6 inline-flex items-center gap-2 text-brand-600 font-extrabold">
                    Ver prompt <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <div className="mt-12 text-center">
              <Link
                href="/prompts"
                className="inline-flex items-center justify-center px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold rounded-full transition-all shadow-xl shadow-blue-200"
              >
                Ver todos los prompts
              </Link>

              <div className="mt-4 text-sm text-textBody font-semibold">
                Después, cerrá el número en{" "}
                <a
                  href={calcHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-600 hover:text-brand-700 font-extrabold"
                >
                  Calculadora ML →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GUIAS (preview) */}
      <section id="guias-preview" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Guías</h2>
              <p className="text-lg text-textBody max-w-2xl mx-auto">
                Guías claras y accionables. Entrás, leés y lo aplicás al toque.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previewGuides.map((g, i) => (
              <Reveal key={g.id} delay={0.05 + i * 0.05}>
                <Link
                  href={`/guias/${g.id}`}
                  className="group block bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                    {g.category}
                  </div>

                  <h3 className="mt-4 text-2xl font-black text-slate-900 group-hover:text-brand-700 transition-colors">
                    {g.title}
                  </h3>

                  <p className="mt-3 text-textBody font-medium leading-relaxed">{g.description}</p>

                  <div className="mt-6 inline-flex items-center gap-2 text-brand-600 font-extrabold">
                    Ver guía <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <div className="mt-12 text-center">
              <Link
                href="/guias"
                className="inline-flex items-center justify-center px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold rounded-full transition-all shadow-xl shadow-blue-200"
              >
                Ver todas las guías
              </Link>
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
                  Vendedores Desde 2006. Herramientas Desde <span className="text-brand-600">2024.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-6 text-lg text-textBody font-medium leading-relaxed">
                  <p>
                    No somos una agencia ni consultores de marketing. Somos un equipo que lleva 18 años vendiendo en
                    MercadoLibre y Tiendanube. Después de perder tiempo con Excel y otros programas, construimos las
                    herramientas que nos faltaban.
                  </p>
                  <p>Funcionaron tan bien que decidimos compartirlas. Simple.</p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10 space-y-4">
                  {[
                    { title: "Datos que no mienten", subtitle: "Cálculos precisos con tarifas actualizadas" },
                    { title: "Ganancia real, no vanity metrics", subtitle: "Rentabilidad neta, no ventas brutas" },
                    { title: "Soporte que entiende", subtitle: "Equipo local que vende como vos" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 block">{item.title}</span>
                        <span className="text-textBody text-sm">{item.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="flex-1 relative" delay={0.08}>
              <div className="absolute -inset-4 bg-brand-600 rounded-[3rem] rotate-3 opacity-10" />
              <div className="relative bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl">
                <div className="text-6xl font-black mb-2 text-brand-400">100%</div>
                <div className="text-2xl font-bold mb-8">Enfoque Analítico</div>
                <p className="text-slate-200 leading-relaxed mb-8">
                  "Vendemos todos los días. Sabemos que sin números claros, se pierde plata. Por eso creamos herramientas
                  que eliminan el error humano y te muestran la realidad."
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white ring-2 ring-slate-700/40 shadow-sm">
                    <Image src="/logo.png" alt="Oriavision" fill sizes="48px" className="object-contain p-1" />
                  </div>
                  <div>
                    <div className="font-bold">Equipo Oriavision</div>
                    <div className="text-sm text-slate-300">Buenos Aires, AR</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900">Quiénes somos</h3>
                <p className="text-textBody mt-3 font-medium">
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
                        <p className="text-textBody font-medium mt-3 leading-relaxed">{p.bio}</p>
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
            <h2 className="text-3xl font-black mb-6 text-slate-900">¿Necesitás Otra Herramienta?</h2>
            <p className="text-textBody mb-8 max-w-xl mx-auto">
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

      {/* NEWSLETTER (al final) */}
      <Newsletter />
    </main>
  );
}