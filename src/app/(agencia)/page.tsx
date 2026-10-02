import HeroPhotos from "./HeroPhotos";
import { AgencyPage, Arrow, EXT, pageMetadata } from "./chrome";
import { FEATURED_PROJECT, SUCCESS_CASES } from "./projects";
import { RUBROS, SAMPLES } from "./samples";
import { waLink } from "./shared";

export const metadata = pageMetadata({
  path: "/",
  title: "ORIAVISION · Diseño web y presencia digital",
  description:
    "Diseño web con identidad propia. Sitios personalizados, posicionamiento SEO, campañas en Meta y Google Ads para negocios y profesionales.",
});

// Los seis servicios se presentan en tres franjas de dos (verde, blanca y negra), como en la referencia.
const SERVICE_BANDS = [
  {
    band: "band-green",
    label: "Diseño web y posicionamiento",
    services: [
      {
        id: "diseno-web",
        icon: "web",
        title: "Diseño web",
        text: "Sitios que presentan tu negocio con claridad, funcionan bien en el celular y hacen más simple recibir consultas.",
        detail: "Sitios institucionales · Landing pages · Rediseño",
      },
      {
        id: "seo",
        icon: "search",
        title: "Posicionamiento SEO",
        text: "Trabajamos la estructura, el contenido y los aspectos técnicos de tu sitio para mejorar su presencia en los buscadores.",
        detail: "SEO técnico · Contenidos · Presencia local en Google",
      },
    ],
  },
  {
    band: "band-white",
    label: "Campañas publicitarias",
    services: [
      {
        id: "meta",
        icon: "chart",
        title: "Campañas en Meta",
        text: "Planificamos anuncios en Instagram y Facebook para acercar tu propuesta a las personas que pueden interesarse en ella.",
        detail: "Estrategia · Creatividades · Medición de consultas",
      },
      {
        id: "google-ads",
        icon: "search",
        title: "Campañas en Google Ads",
        text: "Conectamos tu negocio con búsquedas relacionadas con tus productos o servicios, con anuncios y páginas de destino alineados.",
        detail: "Búsqueda · Páginas para campañas · Conversiones",
      },
    ],
  },
  {
    band: "band-black",
    label: "Contenido y evolución de tu sitio",
    services: [
      {
        id: "contenido-marca",
        icon: "image",
        title: "Contenido e identidad",
        text: "Textos, imágenes y piezas digitales que explican lo que hacés y mantienen una identidad consistente en tu web y tus campañas.",
        detail: "Textos web · Edición de imágenes · Piezas digitales",
      },
      {
        id: "mantenimiento",
        icon: "tools",
        title: "Evolución de tu sitio",
        text: "Actualizamos contenidos, revisamos mejoras y sumamos las funciones que tu negocio necesita: reservas, formularios e integraciones.",
        detail: "Mantenimiento · Auditorías · Funciones a medida",
      },
    ],
  },
];

const HOME_PROJECTS = [
  {
    title: SUCCESS_CASES[0].title,
    category: SUCCESS_CASES[0].category,
    href: SUCCESS_CASES[0].href,
    img: SUCCESS_CASES[0].img,
    alt: SUCCESS_CASES[0].alt,
  },
  {
    title: "Quirvo",
    category: "Portero QR · Desarrollo propio",
    href: "https://quirvo.com.ar/",
    img: "/assets/quirvo.webp",
    alt: "Quirvo, sistema de portero QR",
  },
  {
    title: FEATURED_PROJECT.name,
    category: FEATURED_PROJECT.category,
    href: FEATURED_PROJECT.href,
    img: FEATURED_PROJECT.img,
    alt: FEATURED_PROJECT.alt,
  },
];

const RUBRO_SUMMARY = RUBROS.map((rubro) => ({
  ...rubro,
  count: SAMPLES.filter((sample) => sample.rubro === rubro.id).length,
}));

const STEPS = [
  ["01 / CONVERSAMOS", "Tu punto de partida", "Nos contás qué hacés, a quién querés llegar y qué necesitás de tu sitio."],
  ["02 / PROPONEMOS", "Una dirección clara", "Definimos el estilo, las funciones, el alcance y el presupuesto."],
  ["03 / DISEÑAMOS", "Tu marca toma forma", "Preparamos la web y la revisamos con vos para ajustar los detalles."],
  ["04 / PUBLICAMOS", "Listo para compartir", "Ponemos tu sitio online y acordamos las mejoras o el mantenimiento que necesites."],
];

const FAQ = [
  [
    "¿Puedo elegir un sitio de ejemplo y adaptarlo a mi marca?",
    "Sí. Podemos tomar una propuesta como punto de partida y personalizar el logo, los colores, las fuentes, las imágenes, los textos y las funciones. El alcance se define antes de comenzar.",
  ],
  [
    "¿También pueden mejorar mi página actual?",
    "Sí. Revisamos tu sitio, su contenido y lo que querés lograr. A partir de eso proponemos mejoras puntuales o un rediseño, según lo que tenga más sentido para tu negocio.",
  ],
  [
    "¿Puedo sumar WhatsApp, formularios o reservas?",
    "Sí. Definimos con vos las funciones necesarias: contacto por WhatsApp, formularios, agenda de turnos, galerías, mapas y otras integraciones. Cada función queda contemplada en la propuesta.",
  ],
  [
    "¿Me ayudan con el dominio y la presencia en Google?",
    "Podemos acompañarte con la conexión de tu dominio y correo profesional, la configuración de Search Console, la preparación para la indexación y el Perfil de Empresa de Google, cuando corresponda a tu actividad.",
  ],
  [
    "¿Cómo se define el presupuesto?",
    "Según las páginas, el contenido, la personalización y las funciones que necesites. Primero conversamos y después recibís una propuesta con el alcance, el plazo y el precio, antes de avanzar.",
  ],
  [
    "¿Pueden gestionar campañas en Meta y Google?",
    "Sí. Definimos el objetivo, preparamos los anuncios y la página de destino, configuramos la medición y revisamos los resultados. El presupuesto publicitario se acuerda por separado de la gestión.",
  ],
];

export default function Home() {
  return (
    <AgencyPage home>
      <section className="hero photo-hero" aria-labelledby="hero-title">
        <HeroPhotos>
          <div className="wrap hero-inner">
            <div className="eyebrow">Diseño web &amp; marketing digital</div>
            <h1 id="hero-title">
              Tu marca.
              <br />
              <span>Otra dimensión.</span>
            </h1>
            <p className="lead">
              Una web que te represente.
              <br />
              Una estrategia para que te encuentren.
            </p>
            <div className="hero-actions">
              <a
                className="btn"
                aria-label="Hablemos de tu proyecto"
                href={waLink("Hola, Oriavision. Quiero conversar sobre mi proyecto web.")}
                {...EXT}
              >
                <span className="hero-cta-long">Hablemos de tu proyecto</span>
                <span className="hero-cta-short" aria-hidden="true">
                  Hablemos
                </span>
                <Arrow />
              </a>
              <a className="btn btn-outline" href="#servicios">
                <span>Qué hacemos</span>
                <Arrow />
              </a>
            </div>
          </div>
        </HeroPhotos>
      </section>

      <nav className="intro-strip" aria-label="Áreas de trabajo">
        <div className="wrap">
          <a href="#diseno-web">Diseño web</a>
          <a href="#seo">Posicionamiento SEO</a>
          <a href="#meta">Meta Ads</a>
          <a href="#google-ads">Google Ads</a>
        </div>
      </nav>

      <section className="agency-intro" id="servicios">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Una mirada integral</div>
              <h2>
                Diseñamos tu web.
                <br />
                Impulsamos tu presencia.
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                Somos una agencia especializada en diseño web, posicionamiento SEO y marketing digital para negocios y
                profesionales.
              </p>
              <p>
                Unimos diseño, tecnología y criterio comercial para que tu sitio comunique lo que hacés y tus campañas
                tengan un destino pensado para convertir el interés en consultas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {SERVICE_BANDS.map(({ band, label, services }, b) => (
        <section className={`service-band ${band}`} aria-label={label} key={band}>
          <div className="wrap">
            <div className="services-grid">
              {services.map((s, i) => (
                <article className="service" id={s.id} key={s.id}>
                  <div className="service-num">
                    {String(b * 2 + i + 1).padStart(2, "0")}
                    <svg fill="none" strokeWidth="1.4" aria-hidden="true">
                      <use href={`#${s.icon}`} />
                    </svg>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="service-detail">{s.detail}</span>
                </article>
              ))}
            </div>
            {band === "band-black" ? (
              <div className="service-cta">
                <div>
                  <h3>¿Por dónde conviene empezar?</h3>
                  <p>Contanos en qué etapa está tu negocio. Definimos juntos el próximo paso.</p>
                </div>
                <a className="btn" href={waLink("Quiero saber qué servicios necesita mi negocio.")} {...EXT}>
                  <span>Consultanos</span>
                  <Arrow />
                </a>
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <section className="home-projects" id="explorar">
        <div className="wrap">
          <div className="section-head compact-section-head">
            <div>
              <div className="eyebrow">Una selección de nuestro trabajo</div>
              <h2>Proyectos con objetivos distintos.</h2>
            </div>
            <a className="btn btn-dark" href="/proyectos/">
              <span>Ver todos los proyectos</span>
              <Arrow />
            </a>
          </div>
          <div className="home-project-grid">
            {HOME_PROJECTS.map((project) => (
              <article className="home-project-card" key={project.href}>
                <a className="home-project-preview" href={project.href} {...EXT} aria-label={`Visitar ${project.title}`}>
                  <img src={project.img} alt={project.alt} loading="lazy" decoding="async" />
                </a>
                <div className="home-project-copy">
                  <div>
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <a href={project.href} {...EXT} aria-label={`Visitar ${project.title}`}>
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-rubros" aria-labelledby="home-rubros-title">
        <div className="wrap">
          <div className="section-head compact-section-head">
            <div>
              <div className="eyebrow">Diseños por rubro</div>
              <h2 id="home-rubros-title">Un punto de partida para tu actividad.</h2>
            </div>
            <a className="btn" href="/rubros/">
              <span>Explorar rubros</span>
              <Arrow />
            </a>
          </div>
          <nav className="home-rubro-grid" aria-label="Resumen de rubros disponibles">
            {RUBRO_SUMMARY.map((rubro, index) => (
              <a href={`/rubros/?rubro=${rubro.id}`} key={rubro.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{rubro.name}</strong>
                <small>
                  {rubro.count} {rubro.count === 1 ? "diseño" : "diseños"}
                </small>
                <Arrow />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="idea-band">
        <div className="wrap">
          <div>
            <h2>
              Tu idea merece
              <br />
              una web propia.
            </h2>
            <p>Podemos adaptar una propuesta o diseñar desde cero. Tu identidad y tus objetivos definen el camino.</p>
          </div>
          <a className="btn" href={waLink("Hola, Oriavision. Quiero una propuesta para mi sitio.")} {...EXT}>
            <span>Quiero mi sitio</span>
            <Arrow />
          </a>
        </div>
      </section>

      <section className="process" id="proceso">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Cómo trabajamos</div>
              <h2>
                Una buena web empieza
                <br />
                por escucharte.
              </h2>
            </div>
            <p>Avanzamos por etapas, con una propuesta clara y espacio para revisar cada decisión.</p>
          </div>
          <div className="steps">
            {STEPS.map(([label, title, text]) => (
              <article className="step" key={label}>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq" id="preguntas">
        <div className="wrap faq-grid">
          <div className="faq-head">
            <div className="eyebrow">Antes de empezar</div>
            <h2>Hablemos claro.</h2>
            <p>Algunas respuestas para que puedas imaginar tu próximo sitio.</p>
          </div>
          <div className="questions">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </AgencyPage>
  );
}
