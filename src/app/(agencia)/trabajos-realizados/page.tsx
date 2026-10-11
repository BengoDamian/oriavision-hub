import { pageMetadata } from "../seo-metadata";
import { CatalogIntro, CompletedCatalog } from "../portfolio-components";
import { Contact } from "../site-components";

export const metadata = pageMetadata({ path: "/trabajos-realizados/", title: "Trabajos realizados | ORIAVISIÓN", description: "Sitios web, landing pages y herramientas realizadas por ORIAVISIÓN." });

export default function CompletedWorksPage() {
  return <main id="contenido"><CatalogIntro kind="works" /><CompletedCatalog /><Contact /></main>;
}
