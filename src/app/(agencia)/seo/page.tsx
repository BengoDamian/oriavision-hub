import { pageMetadata } from "../seo-metadata";
import { ServiceGuidePage } from "../service-guide";
import { seoGuide } from "../service-content";

export const metadata = pageMetadata({ path: "/seo/",
  title: "Qué es el SEO orgánico y para qué sirve · ORIAVISIÓN",
  description: "Respuestas claras sobre posicionamiento SEO: qué se hace, cómo se mide, plazos, SEO local y diferencias con los anuncios de Google.",
});

export default function SEOPage() { return <ServiceGuidePage guide={seoGuide} />; }
