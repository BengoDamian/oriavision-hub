import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="container mb-10 grid gap-8 md:grid-cols-6">
        <div className="col-span-1 md:col-span-2">
          <h4 className="mb-4 text-xl font-black text-brand-600">Oriavision</h4>

          <p className="max-w-sm font-semibold leading-relaxed text-textBody">
            Calculadora ML, recursos gratuitos y páginas web pensadas para vender mejor en MercadoLibre y e-commerce.
          </p>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-textStrong">
            Calculadora ML
          </h5>
          <ul className="space-y-2 text-sm font-semibold text-textBody">
            <li>
              <a
                href="https://calculadoraml.oriavision.com.ar"
                target="_blank"
                rel="noreferrer"
                className="text-textBody transition-colors hover:text-brand-600"
              >
                Abrir calculadora
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-textStrong">
            Servicios
          </h5>
          <ul className="space-y-2 text-sm font-semibold text-textBody">
            <li>
              <Link
                href="/web/"
                className="text-textBody transition-colors hover:text-brand-600"
              >
                Landing pages
              </Link>
            </li>
            <li>
              <Link
                href="/web/"
                className="text-textBody transition-colors hover:text-brand-600"
              >
                Páginas web a medida
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-textStrong">
            Recursos gratuitos
          </h5>
          <ul className="space-y-2 text-sm font-semibold text-textBody">
            <li>
              <Link
                href="/prompts/"
                className="text-textBody transition-colors hover:text-brand-600"
              >
                Prompts
              </Link>
            </li>
            <li>
              <Link
                href="/guias/"
                className="text-textBody transition-colors hover:text-brand-600"
              >
                Guías
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-textStrong">
            Legal
          </h5>
          <ul className="space-y-2 text-sm font-semibold text-textBody">
            <li>
              <Link
                href="/legal/privacidad"
                className="text-textBody transition-colors hover:text-brand-600"
              >
                Privacidad
              </Link>
            </li>
            <li>
              <Link
                href="/legal/terminos"
                className="text-textBody transition-colors hover:text-brand-600"
              >
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container border-t border-slate-200 pt-8 text-center text-xs font-extrabold uppercase tracking-widest text-textBody">
        © {new Date().getFullYear()} Oriavision. Todos los derechos reservados.
      </div>
    </footer>
  );
}