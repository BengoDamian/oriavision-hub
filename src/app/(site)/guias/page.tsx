import type { Metadata } from "next";
import Newsletter from "@/components/Newsletter";
import GuideSearch from "@/components/GuideSearch";
import { getPublishedGuides } from "@/lib/content";
import { makeGuideSearchText } from "@/lib/guide-search";

const SITE_URL = "https://www.oriavision.com.ar";
const title = "Guías para mejorar la presencia digital de tu negocio";
const description = "Ideas y pasos concretos para que tu sitio web ayude a tus clientes a entender qué ofrecés y cómo contactarte";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/guias/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", locale: "es_AR", siteName: "ORIAVISION",
    url: `${SITE_URL}/guias/`, title, description,
    images: [{ url: "/og/oriavision-agencia.png", width: 1200, height: 630, alt: "Guías de ORIAVISION" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/oriavision-agencia.png"] },
};

export const dynamic = "error";

export default function GuiasPage() {
  const guides = getPublishedGuides();
  const featured = guides.filter(g => g.featured).sort((a, b) =>
    (b.publishedAt || "").localeCompare(a.publishedAt || "")
  )[0];
  const ordered = featured ? [featured, ...guides.filter(g => g.id !== featured.id)] : guides;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE_URL}/guias/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="guides-container">
        <nav className="guides-breadcrumb" aria-label="Ruta de navegación">
          <a href="/">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Guías</span>
        </nav>
        <header className="guides-intro">
          <p className="eyebrow">Recursos para tu negocio</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <GuideSearch guides={ordered.map(g => ({
          id: g.id, title: g.title, description: g.description, category: g.category,
          featured: g.id === featured?.id, image: g.image, imageSmall: g.imageSmall, imageAlt: g.imageAlt,
          searchText: makeGuideSearchText(g),
        }))} />
      </div>
      <div className="guides-newsletter"><Newsletter /></div>
    </>
  );
}
