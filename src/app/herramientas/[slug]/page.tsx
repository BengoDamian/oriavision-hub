import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default function ToolDetail({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.slug === params.slug);
  
  if (!tool) notFound();

  return (
    <div className="container py-24 max-w-4xl px-4 text-center min-h-[60vh]">
      <Link href="/herramientas" className="inline-block mb-8 text-gray-400 font-bold uppercase text-xs tracking-widest hover:text-primary transition">
        ← Volver al catálogo
      </Link>
      
      <div className="mb-6 flex justify-center">
         <span className="bg-blue-50 text-primary px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase">
          {tool.badge}
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter text-gray-900">{tool.title}</h1>
      <p className="text-xl text-gray-500 mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
        {tool.fullDescription || tool.shortDescription}
      </p>

      {tool.externalUrl ? (
        <div className="bg-white p-10 md:p-14 rounded-[2.5rem] border-2 border-gray-100 shadow-xl inline-block max-w-lg w-full">
            <h3 className="font-black mb-8 uppercase text-lg">Acceso a Herramienta</h3>
            <a href={tool.externalUrl} target="_blank" rel="noreferrer" className="btn-primary w-full block mb-4">
                ABRIR CALCULADORA
            </a>
            <p className="text-gray-400 text-xs mt-4 font-medium">
              Se abrirá en una nueva pestaña segura (SSL).
            </p>
        </div>
      ) : (
        <div className="bg-gray-50 p-20 rounded-[2.5rem] border-2 border-dashed border-gray-200">
            <h3 className="text-2xl font-black text-gray-300 uppercase mb-4">En construcción</h3>
            <p className="text-gray-400 font-medium">Estamos terminando los últimos detalles de esta herramienta.</p>
        </div>
      )}
    </div>
  );
}
