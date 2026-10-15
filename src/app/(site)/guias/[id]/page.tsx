import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GuideBody from "@/components/GuideBody";
import GuideCover from "@/components/GuideCover";
import Newsletter from "@/components/Newsletter";
import { getGuideByIdMerged, getGuideIdsMerged, getPublishedGuides } from "@/lib/content";
import { isGuideIndexable } from "@/lib/guide-policy";
import { parseGuideContent } from "@/lib/guide-content";

const SITE_URL = "https://www.oriavision.com.ar";
export const dynamic = "error";
export const dynamicParams = false;
type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams(): { id: string }[] {
  return getGuideIdsMerged().map(id => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getGuideByIdMerged(id);
  if (!item) return { title: "Guía no encontrada", robots: { index: false, follow: false } };
  const title = item.seoTitle || item.title;
  const description = item.seoDescription || item.description;
  const image = item.image || (item.contactMessage ? "/og/oriavision-agencia.png" : "/og/guia.png");
  return {
    title, description,
    robots: { index: isGuideIndexable(item), follow: true, googleBot: { index: isGuideIndexable(item), follow: true } },
    alternates: { canonical: `/guias/${item.id}/` },
    openGraph: {
      type: "article", locale: "es_AR", siteName: "ORIAVISION",
      url: `${SITE_URL}/guias/${item.id}/`, title, description,
      publishedTime: item.publishedAt, modifiedTime: item.updatedAt || item.publishedAt,
      images: [{ url: image, width: 1200, height: 630, alt: item.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function GuiaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = getGuideByIdMerged(id);
  if (!item) notFound();
  const archived = item.editorialStatus === "archived";
  const current = isGuideIndexable(item);
  const sections = parseGuideContent(item.content).filter(block => block.type === "heading" && block.level !== 3);
  const related = current ? getPublishedGuides().filter(guide => guide.id !== item.id && item.relatedGuides?.includes(guide.id)) : [];
  const url = `${SITE_URL}/guias/${item.id}/`;
  const author = item.author || "ORIAVISION";
  const image = item.image || (item.contactMessage ? "/og/oriavision-agencia.png" : "/og/guia.png");
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE_URL}/guias/` },
      { "@type": "ListItem", position: 3, name: item.title, item: url },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: item.title, description: item.description, mainEntityOfPage: url, url,
    datePublished: item.publishedAt, dateModified: item.updatedAt || item.publishedAt,
    author: { "@type": author.toUpperCase() === "ORIAVISION" ? "Organization" : "Person", name: author },
    publisher: { "@type": "Organization", name: "ORIAVISION", url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/oriavision-logo-original.jpg` } },
    image: [new URL(image, SITE_URL).href], inLanguage: "es-AR",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
      <div className={`guide-reading${current ? " guide-reading-current" : ""}`}>
        <nav className="guides-breadcrumb" aria-label="Ruta de navegación">
          <a href="/">Inicio</a><span aria-hidden="true">/</span>
          <a href="/guias/">Guías</a><span aria-hidden="true">/</span>
          <span aria-current="page">Esta guía</span>
        </nav>
        {archived && <aside className="guide-archive-notice" aria-label="Estado editorial">
          <strong>Contenido archivado</strong>
          <p>Esta guía pertenece a una etapa anterior de ORIAVISION y se conserva para quienes recibieron su enlace. No forma parte de nuestras guías vigentes y sus recomendaciones no se mantienen actualizadas.</p>
          <a className="guides-text-link" href="/guias/">Ver guías vigentes</a>
        </aside>}
        <article>
          <header className={`guide-article-header${current && item.image ? " guide-article-header-visual" : ""}`}>
            <div>
            <span className="guides-category">{item.category}</span>
            <h1>{item.title}</h1>
            <p className="guide-article-description">{item.description}</p>
            <div className="guide-byline">
              <span>Por {author}</span>
              {item.publishedAt && <time dateTime={item.publishedAt}>{new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(item.publishedAt))}</time>}
              {item.updatedAt && item.updatedAt !== item.publishedAt && <span>Actualizada el <time dateTime={item.updatedAt}>{new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(item.updatedAt))}</time></span>}
            </div>
            </div>
            {current && <GuideCover {...item} priority sizes="(max-width: 700px) calc(100vw - 40px), 360px" />}
          </header>
          <div className="guide-reading-column">
            {current && !!item.takeaways?.length && <section className="guide-takeaways" aria-labelledby="guide-takeaways-title">
              <h2 id="guide-takeaways-title">Qué vas a poder resolver con esta guía</h2>
              <ul>{item.takeaways.map(point => <li key={point}>{point}</li>)}</ul>
            </section>}
            {current && sections.length >= 4 && <details className="guide-toc">
              <summary>En esta guía <span>{sections.length} secciones</span></summary>
              <nav aria-label="Secciones de esta guía"><ol>{sections.map(section => section.type === "heading" &&
                <li key={section.id}><a href={`#${section.id}`}>{section.text}</a></li>
              )}</ol></nav>
            </details>}
            <GuideBody content={item.content} />
          </div>
        </article>
        <div className="guide-reading-column">
        {current && (
          <aside className="guide-contact-block" aria-label="Consultá por tu sitio web">
            <h2>{item.contactTitle || "¿Querés llevar estas ideas al sitio de tu negocio?"}</h2>
            <p>Si buscás ideas para tu actividad, podés recorrer nuestros diseños por rubro.</p>
            <div className="guide-contact-actions">
              <a className="button button-dark" href={`https://wa.me/5491127575675?text=${encodeURIComponent(item.contactMessage || `Hola, leí la guía «${item.title}» y quiero consultar por la presencia digital de mi negocio.`)}`} target="_blank" rel="noopener noreferrer">Consultar con ORIAVISION</a>
              <a className="guides-text-link" href="/proyectos/">Explorar rubros <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </aside>
        )}
        {related.length > 0 && <aside className="guide-related" aria-labelledby="guide-related-title">
          <h2 id="guide-related-title">Para seguir con la presencia digital de tu negocio</h2>
          {related.map(guide => <a key={guide.id} className="guides-text-link" href={`/guias/${guide.id}/`}>{guide.title}<ArrowRight size={18} aria-hidden="true" /></a>)}
        </aside>}
        <a className="guides-text-link" href="/guias/"><ArrowLeft size={18} aria-hidden="true" />Volver a todas las guías</a>
        </div>
      </div>
      <div className="guides-newsletter"><Newsletter /></div>
    </>
  );
}
