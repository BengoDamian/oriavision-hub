import { completedWorks } from "./catalog-data";

export function PortfolioGateways() {
  return <section className="portfolio-gateways" aria-label="Trabajos realizados y diseños para tu web">
    <article className="portfolio-gateway gateway-works" id="trabajos" aria-labelledby="works-gateway-title">
      <div className="gateway-heading">
        <img src={completedWorks[0].image} alt="Vista del sitio realizado para Edgardo A. Díaz" width="1333" height="926" loading="lazy" />
        <h2 id="works-gateway-title">Trabajos realizados</h2>
      </div>
      <p>Sitios que desarrollamos y que podés visitar. Conocé cómo resolvimos necesidades concretas.</p>
      <a className="button service-button service-button-green" href="/trabajos-realizados">Ver todos los trabajos</a>
    </article>
    <article className="portfolio-gateway gateway-designs" id="proyectos" aria-labelledby="designs-gateway-title">
      <div className="gateway-heading">
        <img src="/images/catalog/veterinaria-tropical.webp" alt="Vista de un diseño de muestra para una clínica veterinaria" width="1440" height="960" loading="lazy" />
        <h2 id="designs-gateway-title">Diseños para tu web</h2>
      </div>
      <p>Modelos de muestra por actividad. Explorá estilos y paletas que podemos adaptar a tu negocio.</p>
      <a className="button service-button service-button-gold" href="/proyectos">Explorar diseños</a>
    </article>
  </section>;
}
