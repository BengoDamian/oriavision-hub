import Link from 'next/link';
import { tools } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import TestimonialCard from '@/components/TestimonialCard';

export default function Home() {
  const steps = [
    { id: "1", title: "Elegí tu\nHerramienta", desc: "Seleccioná la calculadora o solución que necesitás." },
    { id: "2", title: "Cargá los\nDatos", desc: "Ingresá precio, costos y condiciones de venta." },
    { id: "3", title: "Obtené el\nResultado", desc: "Visualizá tu ganancia neta real al instante." },
    { id: "4", title: "Tomá la\nDecisión", desc: "Publicá con la tranquilidad de saber cuánto ganás." }
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-24 pb-12 text-center container px-4">
        <div className="inline-block bg-blue-50 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-8">
          Versión Hub 2.0
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-gray-900 max-w-5xl mx-auto">
          PRECIO EXACTO EN <br className="hidden md:block"/>
          <span className="text-primary underline decoration-4 decoration-blue-200 underline-offset-4">5 SEGUNDOS.</span>
        </h1>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Dejá de perder dinero por errores de cálculo. Usá nuestras herramientas profesionales para vendedores de Mercado Libre.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/herramientas/calculadora-ml" className="btn-primary">
            CALCULAR GRATIS
          </Link>
          <Link href="/herramientas" className="btn-secondary">
            VER TODO EL CATÁLOGO
          </Link>
        </div>
      </section>

      {/* --- TOOLS GRID --- */}
      <section className="container px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-gray-900">Nuestras Herramientas</h2>
          <Link href="/herramientas" className="text-primary font-bold hover:underline">Ver todas &rarr;</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* --- CÓMO FUNCIONA (4 PASOS) --- */}
      <section className="bg-bgLight py-24 rounded-[3rem] container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-16 text-center">CÓMO FUNCIONA ORIAVISION</h2>
          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Línea conectora visual (solo desktop) */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gray-200 -z-10" />
            
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center bg-bgLight">
                <div className="w-16 h-16 bg-white border-4 border-primary text-primary rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-md z-10">
                  {step.id}
                </div>
                <h3 className="font-black text-xl mb-3 whitespace-pre-line leading-tight">{step.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIOS --- */}
      <section className="container px-4">
        <h2 className="text-3xl md:text-4xl font-black mb-16 text-center">OPINIONES DE USUARIOS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard initial="MC" name="Marcos C." role="MercadoLíder Platinum" quote="Antes perdía plata en cada venta por no calcular bien el IIBB. Esta calculadora me salvó el negocio." />
          <TestimonialCard initial="JR" name="Julieta R." role="Vendedora de Moda" quote="Simple, rápida y sin vueltas. Lo mejor es que es gratis y súper precisa." />
          <TestimonialCard initial="LS" name="Lucas S." role="Consultor E-commerce" quote="Recomiendo Oriavision a todos mis clientes. Es el estándar para calcular costos hoy." />
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="container px-4 mb-12">
        <div className="bg-gray-900 text-white rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight">
              ¿Listo para vender con rentabilidad real?
            </h2>
            <Link href="/herramientas/calculadora-ml" className="bg-primary text-white px-10 py-5 rounded-xl font-black text-xl uppercase inline-block hover:scale-105 transition-transform shadow-lg shadow-blue-900/50">
              EMPEZAR AHORA
            </Link>
          </div>
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl -ml-20 -mb-20"></div>
        </div>
      </section>

    </div>
  );
}
