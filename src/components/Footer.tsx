import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-12">
      <div className="container grid md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-black text-xl text-brand-600 mb-4">ORIAVISION</h4>

          <p className="text-textBody max-w-sm font-medium leading-relaxed">
            Herramientas simples para problemas complejos. Optimizá tu rentabilidad en
            MercadoLibre, Tiendanube y e-commerce.
          </p>
        </div>

        <div>
          <h5 className="font-extrabold uppercase mb-4 text-sm tracking-wider text-textStrong">
            Herramientas
          </h5>
          <ul className="space-y-2 text-textBody text-sm font-medium">
            <li>
              <Link
                href="/herramientas/calculadora-ml"
                className="hover:text-brand-600 transition-colors"
              >
                Calculadora ML
              </Link>
            </li>
            <li>
              <Link
                href="/herramientas"
                className="hover:text-brand-600 transition-colors"
              >
                Ver todas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-extrabold uppercase mb-4 text-sm tracking-wider text-textStrong">
            Legal
          </h5>
          <ul className="space-y-2 text-textBody text-sm font-medium">
            <li>
              <Link
                href="/legal/privacidad"
                className="hover:text-brand-600 transition-colors"
              >
                Privacidad
              </Link>
            </li>
            <li>
              <Link
                href="/legal/terminos"
                className="hover:text-brand-600 transition-colors"
              >
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container border-t border-slate-100 pt-8 text-center text-textMuted text-xs font-extrabold uppercase tracking-widest">
        © {new Date().getFullYear()} Oriavision. Todos los derechos reservados.
      </div>
    </footer>
  );
}