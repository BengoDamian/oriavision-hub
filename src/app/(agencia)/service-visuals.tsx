import { Search, Monitor, MessageCircle, Compass, Users, Megaphone, MousePointer2, Check } from "lucide-react";

export type ServiceKind = "web" | "seo" | "marketing" | "meta" | "google";

export function SearchJourney({ paid = false }: { paid?: boolean }) {
  return <figure className={`search-journey${paid ? " journey-paid" : ""}`}>
    <figcaption>{paid ? "De la búsqueda al contacto" : "De una búsqueda a tu negocio"}</figcaption>
    <p className="journey-note">Un ejemplo de recorrido</p>
    <ol>
      <li><span className="journey-icon"><Search size={23} aria-hidden="true" /></span><div><span>Alguien busca</span><strong>{paid ? "Electricista en mi zona" : "Veterinaria en mi zona"}</strong></div></li>
      <li><span className="journey-icon"><Monitor size={23} aria-hidden="true" /></span><div><span>{paid ? "Tu anuncio lleva a una página" : "Tu web responde a su necesidad"}</span><strong>{paid ? "El servicio que necesita" : "Servicios, ubicación y atención"}</strong></div></li>
      <li><span className="journey-icon"><MessageCircle size={23} aria-hidden="true" /></span><div><span>Encuentra cómo contactarte</span><strong>Puede hacer una consulta</strong></div></li>
    </ol>
    <p className="journey-footnote">La propuesta y la atención también cuentan.</p>
  </figure>;
}

export function StrategyVisual() {
  return <figure className="strategy-visual"><img src="/images/original-office-hero.webp" alt="Espacio de trabajo con una web abierta en una notebook y un monitor" width="1672" height="941" loading="lazy" /><figcaption><Compass size={24} aria-hidden="true" /><div><span>Primero, una dirección.</span><strong>Después, las acciones.</strong></div></figcaption></figure>;
}

export function MetaJourney() {
  return <figure className="meta-journey"><figcaption>Una propuesta que abre una conversación.</figcaption><ol>
    <li><Users size={23} aria-hidden="true" /><div><strong>Te descubre</strong><span>El anuncio presenta tu negocio.</span></div></li>
    <li><Megaphone size={23} aria-hidden="true" /><div><strong>Entiende qué ofrecés</strong><span>Un mensaje concreto despierta interés.</span></div></li>
    <li><MessageCircle size={23} aria-hidden="true" /><div><strong>Da el siguiente paso</strong><span>Visita tu web o inicia una consulta.</span></div></li>
  </ol><p>Instagram · Facebook</p></figure>;
}

export function GuideVisual({ kind }: { kind: ServiceKind }) {
  if (kind === "marketing") return <StrategyVisual />;
  if (kind === "meta") return <MetaJourney />;
  return <SearchJourney paid={kind === "google"} />;
}

const explainers = {
  web: { title: "El objetivo define el tipo de web.", items: [
    ["Presentarte", "Sitio institucional", "Tu actividad, tus servicios y tus trabajos, organizados en un lugar."],
    ["Enfocar una propuesta", "Landing page", "Una página centrada en un servicio, una campaña o una consulta."],
    ["Vender productos", "Tienda online", "Un catálogo con compra, pagos y una operación de entregas definida."],
  ] },
  seo: { title: "Dos caminos para llegar desde Google.", items: [
    ["SEO orgánico", "Trabajar tu presencia", "Mejoras en el sitio y su contenido. Google no cobra por el clic orgánico."],
    ["Google Ads", "Invertir en anuncios", "Campañas con presupuesto publicitario, configuración y seguimiento."],
  ] },
  marketing: { title: "Una estrategia conecta estas decisiones.", items: [
    ["Objetivo", "Qué querés conseguir", "Una necesidad concreta de tu negocio."],
    ["Público y mensaje", "A quién le hablás", "Qué necesita saber para elegirte."],
    ["Acción y medición", "Qué vas a hacer", "Dónde comunicar y qué observar después."],
  ] },
  meta: { title: "Llegar, interesar, conversar.", items: [
    ["El anuncio", "Una propuesta clara", "Qué ofrecés y para quién puede ser útil."],
    ["El destino", "Un próximo paso", "Una página, un formulario o una conversación, según el objetivo."],
    ["La respuesta", "Atender el interés", "Resolver dudas y revisar qué sucede con las consultas."],
  ] },
  google: { title: "El clic es una parte del recorrido.", items: [
    ["Búsqueda", "Una necesidad", "Las palabras que usa alguien para encontrar un servicio."],
    ["Página de destino", "Una respuesta", "La información que el anuncio prometió."],
    ["Contacto", "Una oportunidad", "Una consulta que después hay que atender y evaluar."],
  ] },
};

export function GuideExplainer({ kind }: { kind: ServiceKind }) {
  const content = explainers[kind];
  return <aside className={`guide-explainer explainer-${kind}`} aria-label={content.title}>
    <p className="explainer-kicker"><MousePointer2 size={17} aria-hidden="true" />Una idea para llevarte</p>
    <h3>{content.title}</h3>
    <dl>{content.items.map(([label, title, text]) => <div key={label}><dt><span>{label}</span><strong>{title}</strong></dt><dd>{text}</dd></div>)}</dl>
    {kind === "seo" && <p className="explainer-bottom"><Check size={17} aria-hidden="true" />Pueden complementarse. Pagar anuncios no mejora por sí solo el SEO.</p>}
  </aside>;
}
