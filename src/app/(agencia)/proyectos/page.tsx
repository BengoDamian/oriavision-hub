import { pageMetadata } from "../seo-metadata";
import { CatalogIntro, ProjectsCatalog } from "../portfolio-components";
import { Contact } from "../site-components";

export const metadata = pageMetadata({ path: "/proyectos/", title: "Diseños para tu web | ORIAVISIÓN", description: "Diseños web de muestra por actividad. Explorá estilos y paletas para adaptar a tu negocio." });

export default function ProjectsPage() {
  return <main id="contenido"><CatalogIntro kind="projects" /><ProjectsCatalog /><Contact /></main>;
}
