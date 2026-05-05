import Link from 'next/link';
import { Tool } from '@/lib/tools';
import { ArrowRight, Lock } from 'lucide-react'; // Si no instalaste lucide, borrá los iconos

export default function ToolCard({ tool }: { tool: Tool }) {
  const isActive = tool.status === 'active';

  return (
    <div className={`card-animated hover-lift group flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 h-full ${
      tool.featured 
        ? 'border-primary/20 bg-blue-50/30 hover:border-primary hover:shadow-xl hover:shadow-blue-500/10' 
        : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-lg'
    }`}>
      <div className="mb-6 flex justify-between items-start">
        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
          isActive ? 'bg-blue-100 text-primary' : 'bg-gray-100 text-gray-400'
        }`}>
          {tool.badge}
        </span>
      </div>

      <h3 className="text-2xl font-black mb-3 text-gray-900 leading-tight">{tool.title}</h3>
      <p className="text-gray-500 mb-8 font-medium leading-relaxed flex-grow">
        {tool.shortDescription}
      </p>
      
      <div className="mt-auto">
        {isActive ? (
          <Link href={tool.href} className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all uppercase text-sm tracking-wider">
            Usar Herramienta <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <div className="flex items-center gap-2 font-bold text-gray-400 uppercase text-sm tracking-wider cursor-not-allowed">
            Próximamente <Lock className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}
