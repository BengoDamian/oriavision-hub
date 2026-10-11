import { pageMetadata } from "../seo-metadata";
import { ServiceGuidePage } from "../service-guide";
import { marketingGuide } from "../service-content";

export const metadata = pageMetadata({ path: "/marketing-digital/",
  title: "Qué es el marketing digital y cómo definir tu estrategia · ORIAVISIÓN",
  description: "Cómo definir objetivos, elegir canales y ordenar tu inversión en marketing digital. Preguntas y respuestas para comercios y profesionales.",
});

export default function MarketingPage() { return <ServiceGuidePage guide={marketingGuide} />; }
