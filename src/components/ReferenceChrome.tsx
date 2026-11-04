import { readFileSync } from "node:fs";
import { join } from "node:path";
import { load } from "cheerio";

// Server-only markup shared with the exact v53 pages. Existing resources keep
// their React interactions while using the same navigation and footer.
const document = load(readFileSync(join(process.cwd(), "site/index.html"), "utf8"));
const local = (html: string | null) => (html || "").replaceAll("https://www.oriavision.com.ar", "");
const headerHtml = local(document("header.site-header").html());
const footerHtml = local(document("footer").html());
const floatingHtml = local(document("a.floating-wa").html());
const contactUrl = document("a.floating-wa").attr("href");

export function ReferenceHeader() {
  return <header className="site-header" dangerouslySetInnerHTML={{ __html: headerHtml }} />;
}

export function ReferenceFooter() {
  return <footer dangerouslySetInnerHTML={{ __html: footerHtml }} />;
}

export function ReferenceWhatsApp() {
  return <a className="floating-wa" href={contactUrl} target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp" dangerouslySetInnerHTML={{ __html: floatingHtml }} />;
}
