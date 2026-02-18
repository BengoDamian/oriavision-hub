import { tools } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';

export default function HerramientasPage() {
  return (
    <div className="container py-20 px-4">
      <div className="max-w-2xl mb-16">
        <h1 className="text-5xl font-black mb-6 tracking-tight">CATÁLOGO DE <br/><span className="text-primary">HERRAMIENTAS.</span></h1>
        <p className="text-xl text-gray-500 font-medium">Todas las soluciones que desarrollamos para potenciar tu e-commerce.</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
