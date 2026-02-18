import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-primary">
          ORIAVISION
        </Link>
        
        {/* Menú Desktop */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wide text-gray-500">
          <Link href="/herramientas" className="hover:text-primary transition-colors">Herramientas</Link>
          <Link href="/quienes-somos" className="hover:text-primary transition-colors">Nosotros</Link>
          <Link href="/contacto" className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-primary transition-colors">
            Soporte
          </Link>
        </div>
      </div>
    </nav>
  );
}
