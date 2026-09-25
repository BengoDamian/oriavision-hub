import AgencyHeader from "./AgencyHeader";
import { BrandLogo, waLink } from "./shared";

const SERVICES = [
  {
    icon: "web",
    title: "Diseño web",
    text: "Landing pages y sitios profesionales que presentan tus servicios con claridad y facilitan las consultas.",
    detail: "Sitios nuevos · Rediseño · Personalización",
  },
  {
    icon: "search",
    title: "Presencia en Google",
    text: "Preparamos tu sitio para que Google pueda encontrarlo y trabajamos la información de tu negocio en búsquedas y mapas.",
    detail: "SEO inicial · Search Console · Perfil de Empresa",
  },
  {
    icon: "chart",
    title: "Marketing y medición",
    text: "Conectamos tu propuesta, tus campañas y tu web. Medimos visitas y consultas para entender qué mejorar.",
    detail: "Páginas para campañas · Analytics · Conversiones",
  },
  {
    icon: "image",
    title: "Contenido e imagen",
    text: "Textos, imágenes y piezas para comunicar mejor lo que hacés, con una identidad consistente en cada punto de contacto.",
    detail: "Edición de imágenes · Textos web · Piezas digitales",
  },
  {
    icon: "tools",
    title: "Mantenimiento",
    text: "Actualizaciones de contenido, nuevas secciones y mejoras para que tu sitio acompañe la evolución de tu negocio.",
    detail: "Cambios puntuales · Seguimiento · Auditorías web",
  },
  {
    icon: "code",
    title: "Funciones a medida",
    text: "Cuando necesitás algo más: reservas, paneles, formularios especiales e integraciones que simplifican tu trabajo.",
    detail: "Turnos · Sistemas web · Automatizaciones",
  },
];

type SuccessCase = {
  id: string;
  href: string;
  img: string;
  width: number;
  height: number;
  alt: string;
  imageClass?: string;
  category: string;
  title: string;
  headline: string;
  text: string;
  facts?: [string, string][];
  cta: string;
};

const SUCCESS_CASES: SuccessCase[] = [
  {
    id: "caso-calculadora",
    href: "https://calculadora.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-calculadora-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Calculadora ML de Edgardo A. Díaz",
    category: "Precios · Producto por producto",
    title: "Calculadora ML",
    headline: "Del costo al precio de publicación.",
    text: "Nació de una necesidad de nuestra operación: contemplar los costos de vender en Mercado Libre antes de definir un precio.",
    facts: [
      ["La propuesta", "Reúne costo neto, IVA, margen, comisión, IIBB, envío y cuotas en un mismo cálculo."],
      ["Qué permite", "Revisar el precio de un producto y comparar escenarios al contado y en cuotas."],
    ],
    cta: "Conocé la calculadora",
  },
  {
    id: "caso-orientador",
    href: "https://orientador.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-orientador-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Orientador de precios ML de Edgardo A. Díaz",
    category: "Precios · Listas de mayoristas",
    title: "Orientador de precios ML",
    headline: "Una lista completa. Una primera orientación.",
    text: "Para analizar muchos productos en conjunto y elegir cuáles merecen una revisión más detallada.",
    facts: [
      ["La propuesta", "Cargás la planilla de tu mayorista, configurás las variables y obtenés referencias al contado y en cuotas."],
      ["Qué permite", "Descargar un Excel para filtrar, comparar y evaluar oportunidades de compra."],
    ],
    cta: "Conocé el orientador",
  },
  {
    id: "caso-programa",
    href: "https://programa.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-programa-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Programa de Transformación de Edgardo A. Díaz",
    category: "Formación · Producto digital",
    title: "Programa de Transformación",
    headline: "Una forma de pensar Mercado Libre.",
    text: "Capacitación práctica en PDF de Edgardo A. Díaz para revisar publicaciones, ordenar la cuenta y aplicar inteligencia artificial al trabajo diario.",
    facts: [
      ["La propuesta", "Una página que presenta el contenido del programa, su alcance y el acceso a la compra."],
      ["Qué permite", "Conocer la propuesta y trabajar el material a tu ritmo. No incluye asesoría personalizada."],
    ],
    cta: "Conocé el programa",
  },
  {
    id: "caso-asesoria",
    href: "https://asesoria.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-asesoria-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Asesoría personalizada de Edgardo A. Díaz",
    category: "Servicios · Acompañamiento profesional",
    title: "Asesoría personalizada",
    headline: "Una segunda mirada para tu operación.",
    text: "La propuesta de Edgardo A. Díaz para trabajar sobre consultas, problemas y decisiones concretas de una cuenta de Mercado Libre.",
    facts: [
      ["La propuesta", "Una presentación clara de la modalidad: 30 días, tres reuniones individuales y consultas puntuales por WhatsApp con su equipo."],
      ["Qué permite", "Entender el alcance del servicio y consultar cómo empezar a trabajar sobre tu negocio."],
    ],
    cta: "Conocé la asesoría",
  },
  {
    id: "caso-bot",
    href: "https://bot.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-bot-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Bot de Telegram para Mercado Libre de Edgardo A. Díaz",
    category: "Integración · Atención y seguimiento",
    title: "Bot de Telegram para Mercado Libre",
    headline: "Tu cuenta, más cerca.",
    text: "Preguntas, mensajes, reclamos y alertas de tus cuentas en Telegram para acompañar la atención cotidiana.",
    facts: [
      ["La propuesta", "Una herramienta que reúne avisos de la operación y permite preparar respuestas a las preguntas de compradores."],
      ["Qué permite", "Revisar la respuesta y confirmar antes de enviarla. Vos mantenés el control."],
    ],
    cta: "Conocé el bot",
  },
  {
    id: "caso-quirvo",
    href: "https://quirvo.com.ar/",
    img: "/assets/quirvo.webp",
    width: 1200,
    height: 900,
    alt: "Quirvo, sistema de portero QR",
    imageClass: "quirvo-image",
    category: "Portero QR · Desarrollo propio",
    title: "Quirvo",
    headline: "De una necesidad cotidiana a una solución.",
    text: "Un portero QR que conecta a visitantes y residentes desde el celular. Identidad, presentación web y tecnología reunidas en un producto propio.",
    cta: "Conocé Quirvo",
  },
];

const REAL_PROJECTS = [
  {
    href: "https://www.myriamrodriguez.com.ar/",
    name: "Myriam Rodríguez Inmuebles",
    img: "/assets/myriam-rodriguez.jpg",
    width: 1100,
    height: 990,
    alt: "Presentación del sitio Myriam Rodríguez Inmuebles en el portfolio de Oriavision",
    category: "Web inmobiliaria",
    text: "Propiedades, tasaciones y servicios jurídicos en una web con buscador y canales de consulta.",
    cta: "Visitá el sitio",
  },
  {
    href: "https://web-siempredeguardia.vercel.app/",
    name: "Siempre de Guardia",
    img: "/assets/siempre-de-guardia.webp",
    width: 1200,
    height: 1180,
    alt: "Presentación del directorio Siempre de Guardia en el portfolio de Oriavision",
    category: "Sistema web",
    text: "Directorio de prestadores de servicios, organizado por rubros, con registro de usuarios y contacto directo.",
    cta: "Explorá el directorio",
  },
  {
    href: "https://dbengotech.com.ar/",
    name: "dbengotech",
    img: "/assets/dbengotech.webp",
    width: 1200,
    height: 1180,
    alt: "Presentación del sitio profesional dbengotech en el portfolio de Oriavision",
    category: "Web profesional",
    text: "Una presentación de servicios tecnológicos para e-commerce, con propuesta de trabajo, portfolio y contacto.",
    cta: "Visitá el sitio",
  },
];

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
];

const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;

function Arrow() {
  return (
    <svg aria-hidden="true">
      <use href="#arrow" />
    </svg>
  );
}

function IconSprite() {
  return (
    <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <symbol id="arrow" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="external" viewBox="0 0 24 24">
          <path d="M6 18 18 6M6 6h12v12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="web" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h4M7 16h7" />
        </symbol>
        <symbol id="search" viewBox="0 0 24 24">
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 6 6M7 10h6M10 7v6" />
        </symbol>
        <symbol id="chart" viewBox="0 0 24 24">
          <path d="M4 4v16h17M8 16v-4M13 16V9M18 16V5" />
        </symbol>
        <symbol id="image" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8" cy="8" r="1.5" />
          <path d="m3 17 5-5 4 4 4-6 5 7" />
        </symbol>
        <symbol id="tools" viewBox="0 0 24 24">
          <path d="m14 6 4 4M4 20l3-7L18 2l4 4-11 11-7 3ZM5 13l6 4" />
        </symbol>
        <symbol id="code" viewBox="0 0 24 24">
          <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18" />
        </symbol>
        <symbol id="whatsapp" viewBox="0 0 24 24">
          <path d="M20.5 11.5a9 9 0 0 1-13.3 7.9L2 21l1.6-5.2a9 9 0 1 1 16.9-4.3Z" />
          <path d="m8 7-1 2c1 4 3 6 7 7l2-1-2-3-2 1-2-2 1-2-3-2Z" />
        </symbol>
      </defs>
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <IconSprite />
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <AgencyHeader />
      <main id="contenido">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid-light" aria-hidden="true" />
          <div className="wrap hero-inner">
            <div className="eyebrow">Diseño web &amp; presencia digital</div>
            <h1 id="hero-title">
              Tu marca.
              <br />
              <span>Otra dimensión.</span>
            </h1>
            <div className="hero-bottom">
              <p className="lead">
                Sitios con identidad, hechos para tu negocio.
                <br />
                Diseño, tecnología y una mirada comercial.
              </p>
            </div>
          </div>
        </section>

        <div className="hero-action-band">
          <nav className="wrap hero-actions" aria-label="Explorar nuestros proyectos">
            <a className="btn" href="#proyectos">
              <span>Casos de éxito</span>
              <Arrow />
            </a>
            <a className="btn btn-dark" href="#sitios">
              <span>Inspiración</span>
              <Arrow />
            </a>
          </nav>
        </div>

        <div className="intro-strip">
          <div className="wrap">
            <span>Diseño web</span>
            <span>Identidad digital</span>
            <span>Presencia en Google</span>
            <span>Marketing</span>
          </div>
        </div>

        <section id="sitios">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">Inspiración · Sitios de ejemplo</div>
                <h2>
                  Una web que
                  <br />
                  hable de vos.
                </h2>
              </div>
              <p>
                Explorá distintas propuestas. Si una te gusta, la adaptamos a tu identidad, tu actividad y lo que
                necesitás resolver.
              </p>
            </div>
            <div className="portfolio-grid">
              <article className="project-card">
                <a
                  className="project-visual warm"
                  href="https://peluqueria.oriavision.com.ar"
                  {...EXT}
                  aria-label="Explorar Próceres, ejemplo para barberías"
                >
                  <div className="portfolio-sample barber-sample">
                    <div className="sample-nav">
                      <strong>PRÓCERES</strong>
                      <span>BARBERÍA PORTEÑA</span>
                    </div>
                    <div className="barber-layout">
                      <div>
                        <small>EL ARTE DEL BUEN CORTE</small>
                        <strong>
                          El buen corte
                          <br />
                          no pasa
                          <br />
                          de <em>moda.</em>
                        </strong>
                        <span className="barber-cta">Descubrí el estilo ↗</span>
                      </div>
                      <img
                        src="/assets/proceres.webp"
                        alt="Propuesta visual de Próceres, barbería de estética clásica"
                        width={1254}
                        height={1254}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </a>
                <div className="project-info">
                  <div>
                    <h3>Próceres</h3>
                    <p>Barbería · Servicios y reservas online</p>
                  </div>
                  <a
                    className="project-link"
                    href="https://peluqueria.oriavision.com.ar"
                    {...EXT}
                    aria-label="Abrir sitio de ejemplo Próceres"
                  >
                    <svg aria-hidden="true">
                      <use href="#external" />
                    </svg>
                  </a>
                </div>
              </article>
              <article className="project-card">
                <a
                  className="project-visual"
                  href="https://pilates.oriavision.com.ar"
                  {...EXT}
                  aria-label="Explorar Aluna, ejemplo para estudios de Pilates"
                >
                  <div className="portfolio-sample aluna-sample">
                    <img
                      src="/assets/pilates.webp"
                      alt="Propuesta visual de Aluna Pilates con estética natural y luminosa"
                      width={1536}
                      height={1024}
                      loading="lazy"
                    />
                    <div className="sample-overlay">
                      <span className="sample-brand">
                        aluna<span>PILATES &amp; MOVIMIENTO</span>
                      </span>
                      <span className="sample-title">
                        Volvé a<br />
                        tu centro.
                      </span>
                      <span className="sample-cta">Conocé el estudio ↗</span>
                    </div>
                  </div>
                </a>
                <div className="project-info">
                  <div>
                    <h3>Aluna Pilates</h3>
                    <p>Bienestar · Clases y agenda de turnos</p>
                  </div>
                  <a
                    className="project-link"
                    href="https://pilates.oriavision.com.ar"
                    {...EXT}
                    aria-label="Abrir sitio de ejemplo Aluna Pilates"
                  >
                    <svg aria-hidden="true">
                      <use href="#external" />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
            <div className="portfolio-foot">
              <p>
                Son propuestas de diseño para explorar posibilidades. Tu sitio lleva tu nombre, tu contenido y las
                funciones de tu negocio.
              </p>
              <a
                className="text-link"
                href={waLink("Mi actividad es diferente de los ejemplos. Quiero consultar por una web para mi negocio.")}
                {...EXT}
              >
                ¿Tu actividad es otra? Conversemos ↗
              </a>
            </div>
          </div>
        </section>

        <section className="personalize" id="personalizacion">
          <div className="wrap">
            <div>
              <div className="eyebrow">Hecho para tu negocio</div>
              <h2>
                Elegís una dirección.
                <br />
                <span>La hacemos tuya.</span>
              </h2>
              <p>
                Podemos partir de un sitio que te guste o diseñar una propuesta desde cero. Lo importante es que tu
                web se sienta tuya y sea útil para tus clientes.
              </p>
              <a className="btn btn-glow" href={waLink("Quiero personalizar un sitio para mi marca.")} {...EXT}>
                <span>Personalizá tu sitio</span> <Arrow />
              </a>
            </div>
            <div className="custom-list">
              <div className="custom-item">
                <span className="custom-number">01</span>
                <div>
                  <h3>Tu identidad, en cada detalle</h3>
                  <p>Logo, colores, tipografías, fotos y textos que representan a tu negocio.</p>
                </div>
              </div>
              <div className="custom-item">
                <span className="custom-number">02</span>
                <div>
                  <h3>Las funciones que te hacen falta</h3>
                  <p>WhatsApp, formularios, turnos, mapas, galerías, promociones e integración con tus redes.</p>
                </div>
              </div>
              <div className="custom-item">
                <span className="custom-number">03</span>
                <div>
                  <h3>Tu lugar, con nombre propio</h3>
                  <p>Dominio, correo profesional y una experiencia cuidada en celulares y computadoras.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">Cómo podemos ayudarte</div>
                <h2>
                  Tu web es el comienzo.
                  <br />
                  Hagamos que funcione.
                </h2>
              </div>
              <p>
                Desde una primera página hasta una presencia digital más completa. Definimos los servicios según la
                etapa de tu negocio.
              </p>
            </div>
            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <article className="service" key={s.title}>
                  <div className="service-num">
                    {String(i + 1).padStart(2, "0")}
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
          </div>
        </section>

        <section className="case-section success-section" id="proyectos" aria-labelledby="proyectos-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">Casos de éxito</div>
                <h2 id="proyectos-title">
                  Proyectos reales.
                  <br />
                  Soluciones en marcha.
                </h2>
              </div>
              <p>
                Herramientas, formación, asesoría, tiendas online y sitios profesionales. Cada proyecto parte de una
                necesidad concreta y tiene su propia identidad.
              </p>
            </div>
            <div className="case-group-heading">
              <h3>Herramientas y propuestas propias</h3>
              <p>Tecnología, formación y acompañamiento.</p>
            </div>
            <div className="success-grid">
              {SUCCESS_CASES.map((c) => (
                <article className="success-card" id={c.id} key={c.id}>
                  <a
                    className={c.imageClass ? `success-image ${c.imageClass}` : "success-image"}
                    href={c.href}
                    {...EXT}
                    aria-label={c.cta}
                  >
                    <img
                      src={c.img}
                      width={c.width}
                      height={c.height}
                      alt={c.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <div className="success-copy">
                    <span className="case-category">{c.category}</span>
                    <h3>{c.title}</h3>
                    <p className="case-headline">{c.headline}</p>
                    <p>{c.text}</p>
                    {c.facts ? (
                      <dl className="case-facts">
                        {c.facts.map(([dt, dd]) => (
                          <div key={dt}>
                            <dt>{dt}</dt>
                            <dd>{dd}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                    <a className="text-link" href={c.href} {...EXT}>
                      {c.cta} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="case-note">
              Las herramientas de precios brindan estimaciones según los datos cargados y las condiciones de cada
              operación. Las propuestas son independientes, sin afiliación oficial con Mercado Libre.
            </p>
            <div className="case-group-heading websites-heading">
              <h3>Sitios y sistemas online</h3>
              <p>Distintos rubros. Una presencia propia.</p>
            </div>
            <div className="real-projects-grid">
              <article className="real-project real-project-featured">
                <a className="real-project-image" href="https://ercas.com.ar/" {...EXT} aria-label="Visitar ERCAS">
                  <img
                    src="/assets/ercas.webp"
                    width={1800}
                    height={600}
                    alt="Presentación de la tienda online ERCAS en el portfolio de Oriavision"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <div className="real-project-copy">
                  <div>
                    <span className="case-category">E-commerce</span>
                    <h3>ERCAS</h3>
                    <p>
                      Tienda online de tecnología e insumos de impresión, con catálogo de productos, búsqueda y
                      carrito de compras.
                    </p>
                  </div>
                  <a className="text-link" href="https://ercas.com.ar/" {...EXT}>
                    Visitá la tienda <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
              {REAL_PROJECTS.map((p) => (
                <article className="real-project" key={p.name}>
                  <a className="real-project-image" href={p.href} {...EXT} aria-label={`Visitar ${p.name}`}>
                    <img
                      src={p.img}
                      width={p.width}
                      height={p.height}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <div className="real-project-copy">
                    <span className="case-category">{p.category}</span>
                    <h3>{p.name}</h3>
                    <p>{p.text}</p>
                    <a className="text-link" href={p.href} {...EXT}>
                      {p.cta} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
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

        <section className="contact" id="contacto">
          <div className="wrap">
            <div>
              <div className="eyebrow">Demos el primer paso</div>
              <h2>
                Hagamos lugar
                <br />a tu próxima idea.
              </h2>
              <p>
                Contanos qué hacés y qué te gustaría lograr. Te ayudamos a encontrar una propuesta para tu negocio.
              </p>
            </div>
            <div className="contact-action">
              <a
                className="btn btn-dark"
                href={waLink("Hola, Oriavision. Quiero conversar sobre una web para mi negocio.")}
                {...EXT}
              >
                <span>Hablemos por WhatsApp</span> <Arrow />
              </a>
              <span>Directo. Simple. Con personas.</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              <a href="#inicio" className="brand" aria-label="ORIAVISION, volver al inicio">
                <BrandLogo />
              </a>
              <p>Diseño web con una mirada propia.</p>
            </div>
            <nav className="footer-nav" aria-label="Navegación del pie">
              <a href="#sitios">Ejemplos</a>
              <a href="#servicios">Servicios</a>
              <a href="#proceso">Proceso</a>
              <a href="#contacto">Contacto</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} ORIAVISION · Buenos Aires, Argentina</span>
            <span>
              ¿Buscás asesoría y herramientas de MercadoLibre?{" "}
              <a href="https://edgardoadiaz.com.ar/" {...EXT}>
                Edgardo A. Díaz ↗
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
