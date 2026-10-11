import { Fragment } from "react";
import { GuideVisual, GuideExplainer } from "./service-visuals";
import type { ServiceGuide } from "./service-content";

export function ServiceQuestions({ guide }: { guide: ServiceGuide }) {
  return <section className={`guide-questions section-pad guide-questions-${guide.kind}`} id="preguntas" aria-labelledby="guide-questions-title">
    <div className="container">
      <div className="guide-section-heading">
        <p className="eyebrow">Entender antes de decidir</p>
        <h2 id="guide-questions-title">Tus preguntas.<br /><span>Respuestas claras.</span></h2>
      </div>
      <div className="guide-layout">
        <nav className="guide-index" aria-label={`Preguntas sobre ${guide.name}`}>
          <p>En esta página</p>
          <ol>{guide.questions.map((question, index) => <li key={question.id}>
            <a href={`#${question.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{question.short}</a>
          </li>)}</ol>
        </nav>
        <div className="guide-answers">
          {guide.questions.map((question, index) => <Fragment key={question.id}><article className="guide-answer" id={question.id} aria-labelledby={`${question.id}-title`}>
            <p className="guide-question-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
            <h3 id={`${question.id}-title`}>{question.title}</h3>
            {question.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {question.points && <ul>{question.points.map(point => <li key={point}>{point}</li>)}</ul>}
            {question.example && <aside className="guide-example" aria-label="Un ejemplo para entenderlo"><span className="guide-example-label">En la práctica</span><p>{question.example}</p></aside>}
            {question.link && <a className="button guide-topic-button" href={question.link.href}>{question.link.label}</a>}
          </article>
            {index === 2 && <GuideExplainer kind={guide.kind} />}
            {index === 5 && <aside className="guide-mid-cta"><p>¿Cómo se aplica a tu negocio?</p><a className="button service-button service-button-gold" href={guide.inquiry} target="_blank" rel="noopener noreferrer">{guide.ctaLabel}<span className="sr-only"> por WhatsApp (abre en otra pestaña)</span></a></aside>}
          </Fragment>)}
          <a href="#preguntas" className="guide-back-to-index">Volver a las preguntas</a>
          {guide.sources && <div className="guide-sources"><p>Para profundizar, en las fuentes oficiales</p><ul>{guide.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}<span className="sr-only"> (abre en otra pestaña)</span></a></li>)}</ul></div>}
        </div>
      </div>
    </div>
  </section>;
}

export function ServiceClosing({ guide }: { guide: ServiceGuide }) {
  return <>
    <section className="guide-contact section-pad" id="contacto" aria-labelledby="guide-contact-title"><div className="container guide-contact-layout">
      <div><p className="eyebrow">Ahora, hablemos de tu caso</p><h2 id="guide-contact-title">{guide.ctaTitle}</h2></div>
      <div><p>{guide.ctaText}</p><a className="button guide-contact-button service-button service-button-gold" href={guide.inquiry} target="_blank" rel="noopener noreferrer">{guide.ctaLabel}<span className="sr-only"> por WhatsApp (abre en otra pestaña)</span></a></div>
    </div></section>
    <section className="guide-related" aria-labelledby="guide-related-title"><div className="container"><h2 id="guide-related-title">Seguí explorando</h2><div className="guide-related-links">{guide.related.map(link => <a href={link.href} key={link.href}><span>{link.label}</span><p>{link.description}</p></a>)}</div><a className="guide-return" href="/#servicios">Volver a los servicios de ORIAVISIÓN</a></div></section>
  </>;
}

export function ServiceGuidePage({ guide }: { guide: ServiceGuide }) {
  return <main id="contenido" className={`service-guide-page service-guide-${guide.kind}`}>
    <section className="guide-hero"><div className="container">
      <nav className="guide-breadcrumb" aria-label="Ubicación en el sitio"><a href="/">Inicio</a><span aria-hidden="true">/</span><a href="/#servicios">Servicios</a></nav>
      <div className="guide-hero-layout"><div className="guide-hero-copy"><p className="eyebrow">{guide.name}</p><h1>{guide.title}</h1><p className="guide-hero-description">{guide.intro}</p><a href="#preguntas" className="button service-button service-button-gold">Encontrá respuesta a tus dudas</a></div><div className="guide-hero-visual"><GuideVisual kind={guide.kind} /></div></div>
    </div></section>
    <ServiceQuestions guide={guide} />
    <ServiceClosing guide={guide} />
  </main>;
}
