// The production 301 is in public/_redirects; keep a working local fallback.
import { pageMetadata } from "../seo-metadata";
export { default } from "../proyectos/page";
export const metadata = { ...pageMetadata({ path: "/proyectos/", title: "Diseños para tu web | ORIAVISIÓN", description: "Diseños web de muestra por actividad." }), robots: { index: false, follow: true } };
