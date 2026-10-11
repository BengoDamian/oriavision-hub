import { pageMetadata } from "../seo-metadata";
import { ServiceGuidePage } from "../service-guide";
import { metaGuide } from "../service-content";

export const metadata = pageMetadata({ path: "/meta-ads/",
  title: "Qué es Meta Ads: publicidad en Instagram y Facebook · ORIAVISIÓN",
  description: "Entendé cómo funciona una campaña en Meta: anuncios, WhatsApp, públicos, inversión y medición de consultas. Respuestas sin tecnicismos.",
});

export default function MetaAdsPage() { return <ServiceGuidePage guide={metaGuide} />; }
