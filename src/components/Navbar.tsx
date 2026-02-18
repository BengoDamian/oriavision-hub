import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-brand-600">
          ORIAVISION
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#herramientas"
            className="text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors uppercase tracking-wide"
          >
            Herramientas
          </Link>
          <Link
            href="/#nosotros"
            className="text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors uppercase tracking-wide"
          >
            Quiénes Somos
          </Link>

          <a
            href="https://calculadoraml.oriavision.com.ar"
            target="_blank"
            rel="noreferrer"
            className="bg-brand-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-200 hover:bg-brand-700 transition-all hover:scale-105"
          >
            CALCULADORA ML
          </a>
        </div>

        <button className="md:hidden text-slate-800" aria-label="Abrir menú">
          <Menu className="w-8 h-8" />
        </button>
      </div>
    </nav>
  );
}
