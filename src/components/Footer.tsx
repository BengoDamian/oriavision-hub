import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="container grid gap-8 md:grid-cols-4 mb-10">
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-black text-xl text-brand-600 mb-4">ORIAVISION</h4>

          <p className="text-textBody max-w-sm font-semibold leading-relaxed">
            Herramientas simples para problemas complejos. Optimizá tu rentabilidad en
            MercadoLibre, Tiendanube y e-commerce.
          </p>
        </div>

        <div>
          <h5 className="font-extrabold uppercase mb-4 text-sm tracking-wider text-textStrong">
            Herramientas
          </h5>
          <ul className="space-y-2 text-textBody text-sm font-semibold">
            <li>
              <a
                href="https://calculadoraml.oriavision.com.ar"
                target="_blank"
                rel="noreferrer"
                className="text-textBody hover:text-brand-600 transition-colors"
              >
                Calculadora ML
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-extrabold uppercase mb-4 text-sm tracking-wider text-textStrong">
            Legal
          </h5>
          <ul className="space-y-2 text-textBody text-sm font-semibold">
            <li>
              <Link
                href="/legal/privacidad"
                className="text-textBody hover:text-brand-600 transition-colors"
              >
                Privacidad
              </Link>
            </li>
            <li>
              <Link
                href="/legal/terminos"
                className="text-textBody hover:text-brand-600 transition-colors"
              >
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container border-t border-slate-200 pt-8 text-center text-textBody text-xs font-extrabold uppercase tracking-widest">
        © {new Date().getFullYear()} Oriavision. Todos los derechos reservados.
      </div>
    </footer>
  );
}