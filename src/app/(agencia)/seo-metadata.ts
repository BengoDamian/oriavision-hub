import type { Metadata } from "next";

export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website", locale: "es_AR", siteName: "ORIAVISION",
      url: `https://www.oriavision.com.ar${path}`, title, description,
      images: [{ url: "/og/oriavision-agencia.png", width: 1200, height: 630, alt: "ORIAVISION · Diseño web y posicionamiento SEO" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og/oriavision-agencia.png"] },
  };
}
