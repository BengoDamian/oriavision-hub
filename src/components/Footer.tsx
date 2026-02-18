import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="container grid md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-black text-xl text-primary mb-4">ORIAVISION</h4>
          <p className="text-gray-500 max-w-sm">
            Creamos herramientas simples para vendedores complejos. Optimizá tu rentabilidad en Mercado Libre y e-commerce.
          </p>
        </div>
        <div>
          <h5 className="font-bold uppercase mb-4 text-sm tracking-wider">Herramientas</h5>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li><Link href="/herramientas/calculadora-ml">Calculadora ML</Link></li>
            <li><Link href="/herramientas">Ver todas</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold uppercase mb-4 text-sm tracking-wider">Legal</h5>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li><Link href="/legal/privacidad">Privacidad</Link></li>
            <li><Link href="/legal/terminos">Términos y condiciones</Link></li>
          </ul>
        </div>
      </div>
      <div className="container border-t pt-8 text-center text-gray-400 text-xs font-medium uppercase tracking-widest">
        © {new Date().getFullYear()} Oriavision. Todos los derechos reservados.
      </div>
    </footer>
  );
}
