import { AgencyPage, EXT, PageIntro, pageMetadata } from "../chrome";
import { FEATURED_PROJECT, REAL_PROJECTS, SUCCESS_CASES } from "../projects";

export const metadata = pageMetadata({
  path: "/proyectos/",
  title: "Proyectos realizados · ORIAVISION",
  description:
    "Herramientas, formación, asesoría, tiendas online y sitios profesionales desarrollados por ORIAVISION, con sus objetivos y soluciones.",
});

export default function ProyectosPage() {
  return (
    <AgencyPage>
      <PageIntro
        eyebrow="Nuestro trabajo"
        title="Proyectos realizados."
        text="Cada proyecto empieza con un negocio, una necesidad y una forma propia de comunicar."
      />

      <section className="case-section success-section projects-section" aria-label="Proyectos">
        <div className="wrap">
          <div className="case-group-heading">
            <h2>Herramientas y propuestas propias</h2>
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
                  <img src={c.img} width={c.width} height={c.height} alt={c.alt} loading="lazy" decoding="async" />
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
            <h2>Sitios y sistemas online</h2>
            <p>Distintos rubros. Una presencia propia.</p>
          </div>
          <div className="real-projects-grid">
            <article className="real-project real-project-featured">
              <a
                className="real-project-image"
                href={FEATURED_PROJECT.href}
                {...EXT}
                aria-label={`Visitar ${FEATURED_PROJECT.name}`}
              >
                <img
                  src={FEATURED_PROJECT.img}
                  width={FEATURED_PROJECT.width}
                  height={FEATURED_PROJECT.height}
                  alt={FEATURED_PROJECT.alt}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="real-project-copy">
                <div>
                  <span className="case-category">{FEATURED_PROJECT.category}</span>
                  <h3>{FEATURED_PROJECT.name}</h3>
                  <p>{FEATURED_PROJECT.text}</p>
                </div>
                <a className="text-link" href={FEATURED_PROJECT.href} {...EXT}>
                  {FEATURED_PROJECT.cta} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
            {REAL_PROJECTS.map((p) => (
              <article className="real-project" key={p.name}>
                <a className="real-project-image" href={p.href} {...EXT} aria-label={`Visitar ${p.name}`}>
                  <img src={p.img} width={p.width} height={p.height} alt={p.alt} loading="lazy" decoding="async" />
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
    </AgencyPage>
  );
}
