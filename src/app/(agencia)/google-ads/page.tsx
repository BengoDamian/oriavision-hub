import { pageMetadata } from "../seo-metadata";
import { ServiceGuidePage } from "../service-guide";
import { googleGuide } from "../service-content";

export const metadata = pageMetadata({ path: "/google-ads/",
  title: "Qué es Google Ads y cómo funciona la publicidad en Google · ORIAVISIÓN",
  description: "Preguntas habituales sobre campañas de búsqueda: palabras clave, presupuesto, páginas de destino, resultados y diferencias con SEO y Meta Ads.",
});

export default function GoogleAdsPage() { return <ServiceGuidePage guide={googleGuide} />; }
