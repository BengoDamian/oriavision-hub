import type { Metadata, Viewport } from "next";
import "./(agencia)/agencia.css";
import AgencyHeader from "./(agencia)/AgencyHeader";

export const metadata: Metadata = {
  title: { absolute: "Página no encontrada · ORIAVISION" },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#164c3f",
};

export default function GlobalNotFound() {
  return (
    <html lang="es-AR">
      <body id="inicio">
        <AgencyHeader base="/" />
        <main id="contenido">
          <section className="hero" aria-labelledby="error-title">
            <div className="hero-grid-light" aria-hidden="true" />
            <div className="wrap hero-inner">
              <div className="eyebrow">Error 404</div>
              <h1 id="error-title">
                Esta página
                <br />
                <span>no existe.</span>
              </h1>
              <div className="hero-bottom">
                <p className="lead">Puede que el enlace haya cambiado o que la dirección tenga un error.</p>
              </div>
            </div>
          </section>
          <div className="hero-action-band">
            <nav className="wrap hero-actions" aria-label="Seguir navegando">
              <a className="btn" href="/">
                <span>Ir al inicio</span>
              </a>
              <a className="btn btn-dark" href="/#contacto">
                <span>Contactanos</span>
              </a>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
