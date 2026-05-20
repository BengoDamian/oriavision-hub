import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#02050d] py-12">
      <div className="container mb-10 grid gap-8 md:grid-cols-6">
        <div className="col-span-1 md:col-span-2">
          <h4 className="mb-4 text-xl font-black text-cyan-100">Oriavision</h4>

          <p className="max-w-sm font-semibold leading-relaxed text-slate-400">
            Servicios y recursos gratuitos para vender mejor en MercadoLibre, Tiendanube y e-commerce.
          </p>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-slate-100">
            Calculadora ML
          </h5>
          <ul className="space-y-2 text-sm font-semibold text-slate-400">
            <li>
              <a
                href="https://calculadoraml.oriavision.com.ar"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-cyan-100"
              >
                Abrir calculadora
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-slate-100">
            Servicios
          </h5>
          <ul className="space-y-2 text-sm font-semibold text-slate-400">
            <li>
              <Link
                href="/web/"
                className="text-slate-400 transition-colors hover:text-cyan-100"
              >
                Landing pages
              </Link>
            </li>
            <li>
              <Link
                href="/web/"
                className="text-slate-400 transition-colors hover:text-cyan-100"
              >
                Páginas web a medida
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-slate-100">
            Recursos gratuitos
          </h5>
          <ul className="space-y-2 text-sm font-semibold text-slate-400">
            <li>
              <Link
                href="/prompts/"
                className="text-slate-400 transition-colors hover:text-cyan-100"
              >
                Prompts <span className="text-[#FF3333]">gratis</span>
              </Link>
            </li>
            <li>
              <Link
                href="/guias/"
                className="text-slate-400 transition-colors hover:text-cyan-100"
              >
                Guías <span className="text-[#FF3333]">gratuitas</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-slate-100">
            Legal
          </h5>
          <ul className="space-y-2 text-sm font-semibold text-slate-400">
            <li>
              <Link
                href="/legal/privacidad"
                className="text-slate-400 transition-colors hover:text-cyan-100"
              >
                Privacidad
              </Link>
            </li>
            <li>
              <Link
                href="/legal/terminos"
                className="text-slate-400 transition-colors hover:text-cyan-100"
              >
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container border-t border-white/10 pt-8 text-center text-xs font-extrabold uppercase tracking-widest text-slate-500">
        © {new Date().getFullYear()} Oriavision. Todos los derechos reservados.
      </div>
    </footer>
  );
}