import { pageMetadata } from "./seo-metadata";
export const metadata = pageMetadata({ path: "/", title: "ORIAVISIÓN | Sitios web y posicionamiento SEO", description: "Creamos tu sitio y te ayudamos a mejorar tu presencia en Google. Diseño web y SEO para comercios y profesionales." });
import { Monitor, Search, Wrench, FileText, Compass, Megaphone } from "lucide-react";
import { Contact } from "./site-components";
import { PortfolioGateways } from "./portfolio-gateways";
import { HeroCarousel } from "./hero-carousel";
import { SearchJourney } from "./service-visuals";

export default function Home() {
  return <main id="contenido">
    <section className="hero home-hero">
      <div className="hero-photo" aria-hidden="true"><img src="/images/original-office-hero.webp" alt="" width="1672" height="941" fetchPriority="high" /></div>
      <div className="hero-photo-overlay" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Sitios web y posicionamiento SEO</p>
          <h1>Para que te<br />encuentren<br /><span className="hero-signature">y te elijan.</span></h1>
          <p className="hero-description">Creamos tu sitio y te ayudamos a mejorar tu presencia en Google. Trabajamos con comercios y profesionales.</p>
          <div className="hero-actions"><a className="button button-light" href="/#contacto"><span className="button-label">Consultar mi proyecto</span></a><a className="button button-outline" href="/trabajos-realizados"><span className="button-label">Ver trabajos realizados</span></a></div>
        </div>
      </div>
    </section>
    <HeroCarousel />
    <section className="services-section visual-services" id="servicios" aria-labelledby="services-title">
      <div className="container services-intro"><p className="eyebrow">Diseño web + presencia digital</p><h2 id="services-title">Tu sitio es el comienzo.<br /><span>Que te encuentren, el siguiente paso.</span></h2></div>
      <article className="container service-web-summary">
        <div><h3 className="service-name"><Monitor size={25} aria-hidden="true" /><span>Diseño y desarrollo web</span></h3><p className="service-explanation">Tu sitio para presentar lo que hacés.</p></div>
        <div className="service-web-details"><p>Un sitio para presentar tus servicios, recibir consultas o vender online. Definimos el contenido y las funciones que necesitás, con una buena experiencia en celular y escritorio.</p><a className="button service-button service-button-gold" href="/diseno-web">Cómo creamos tu sitio</a></div>
      </article>
      <article className="service-feature service-feature-seo" id="seo">
        <div className="service-feature-media"><SearchJourney /></div>
        <div className="service-feature-copy"><h3 className="service-name"><Search size={25} aria-hidden="true" /><span>Posicionamiento SEO</span></h3><p className="service-explanation">Más visibilidad en Google, sin pagar por cada clic.</p><p>Mejoramos la estructura y el contenido de tu web para facilitar que aparezca en búsquedas relacionadas con tu actividad. Revisamos qué visitas y consultas genera.</p><a className="button service-button service-button-green" href="/seo">Qué es el SEO</a></div>
      </article>
      <div className="container seo-note-wrap"><p className="seo-note">El SEO requiere trabajo y seguimiento. Los plazos y resultados dependen del sitio, la competencia y las búsquedas que quieras trabajar.</p></div>
    </section>
    <section className="marketing-section visual-marketing" id="marketing" aria-labelledby="marketing-title">
      <div className="container marketing-intro"><div><h2 id="marketing-title" className="service-name"><Compass size={25} aria-hidden="true" /><span>Marketing digital</span></h2><p className="service-explanation">Una estrategia para tus acciones online.</p></div><div className="marketing-summary"><p>Antes de elegir dónde invertir, definimos a quién querés llegar, qué ofrecerle y cómo evaluar cada acción.</p><a className="button service-button service-button-gold" href="/marketing-digital">Cómo definimos tu estrategia</a></div></div>
      <div className="campaign-grid">
        <article className="campaign-service campaign-meta" id="meta-ads"><h3 className="service-name"><Megaphone size={25} aria-hidden="true" /><span>Meta Ads</span></h3><p className="service-explanation">Publicidad en Instagram y Facebook.</p><p>Anuncios en Instagram y Facebook para presentar tu negocio y abrir nuevas conversaciones.</p><a className="button service-button service-button-green" href="/meta-ads">Publicidad en Instagram y Facebook</a></article>
        <article className="campaign-service campaign-google" id="google-ads"><h3 className="service-name"><Search size={25} aria-hidden="true" /><span>Google Ads</span></h3><p className="service-explanation">Publicidad en las búsquedas de Google.</p><p>Campañas de búsqueda para mostrar tus servicios a personas que buscan lo que ofrecés.</p><a className="button service-button service-button-dark" href="/google-ads">Publicidad en Google</a></article>
      </div>
      <div className="container"><p className="campaign-note">Los honorarios de gestión y la inversión publicitaria se definen por separado. Las campañas complementan el trabajo de tu web y su posicionamiento orgánico.</p></div>
    </section>
    <PortfolioGateways />
    <section className="continuity section-pad"><div className="container continuity-layout">
      <div><p className="eyebrow">Después de publicar</p><h2>Una web <br />que sigue <br /><span>evolucionando.</span></h2></div>
      <div className="continuity-list"><article><Wrench size={24} strokeWidth={1.5} aria-hidden="true" /><div><h3>Mantenimiento y mejoras</h3><p>Actualizaciones, revisión del funcionamiento y nuevas funciones cuando tu negocio las necesite.</p></div></article><article><FileText size={24} strokeWidth={1.5} aria-hidden="true" /><div><h3>Contenido con continuidad</h3><p>Textos e imágenes para mantener tu propuesta al día y acompañar el trabajo de posicionamiento.</p></div></article></div>
    </div></section><Contact />
  </main>;
}
