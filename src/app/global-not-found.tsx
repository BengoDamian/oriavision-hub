import type { Metadata, Viewport } from "next";
import "./(agencia)/agencia.css";
import "./(agencia)/redesign-integration.css";
import { Header, Footer, WhatsAppBar } from "./(agencia)/site-components";

export const metadata: Metadata = {
  title: { absolute: "Página no encontrada · ORIAVISION" },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a4531",
};

export default function GlobalNotFound() {
  return (
    <html lang="es-AR">
      <body id="inicio">
        <Header />
        <main id="contenido">
          <section className="catalog-hero" aria-labelledby="error-title">
            <div className="container">
              <div className="eyebrow">Error 404</div>
              <h1 id="error-title">
                Esta página
                <br />
                <span>no existe.</span>
              </h1>
              <p className="catalog-description">Puede que el enlace haya cambiado o que la dirección tenga un error.</p>
              <nav className="error-actions" aria-label="Seguir navegando">
                <a className="button service-button service-button-green" href="/">Ir al inicio</a>
                <a className="button service-button service-button-gold" href="/proyectos/">Explorar diseños</a>
              </nav>
            </div>
          </section>
        </main>
        <Footer /><WhatsAppBar />
      </body>
    </html>
  );
}
