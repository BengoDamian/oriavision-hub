import { cpSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join, relative, resolve, sep } from "node:path";

const [sourceArg, slug, sourceHostname, family, variant] = process.argv.slice(2);

if (!sourceArg || !slug || !sourceHostname || !family || !variant) {
  throw new Error(
    "Uso: node scripts/import-static-demo.mjs <directorio-exportado> <slug> <hostname-origen> <familia> <variante>",
  );
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error(`Slug inválido: ${slug}`);
}

const workspace = process.cwd();
const source = resolve(workspace, sourceArg);
const demosRoot = resolve(workspace, "public", "demos");
const destination = resolve(demosRoot, slug);

if (!existsSync(source) || !statSync(source).isDirectory()) {
  throw new Error(`No existe el directorio fuente: ${source}`);
}

if (!destination.startsWith(`${demosRoot}${sep}`)) {
  throw new Error(`Destino fuera de public/demos: ${destination}`);
}

cpSync(source, destination, { recursive: true, force: true });

const basePath = `/demos/${slug}`;
const publicOrigin = `https://www.oriavision.com.ar${basePath}`;
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt", ".xml"]);

function rewrite(content) {
  let next = content.replaceAll(sourceHostname, `www.oriavision.com.ar${basePath}/`);

  next = next.replace(/((?:href|src|action)=(["']))\/(?!\/)/g, `$1${basePath}/`);
  next = next.replace(/url\((['"]?)\/(?!\/)/g, `url($1${basePath}/`);
  next = next.replace(/(["'`])\/(assets|nosotros|servicios|equipo|instalaciones|contacto|opiniones|turnos)(?=\/)/g, `$1${basePath}/$2`);

  return next
    .replaceAll(`${publicOrigin}//`, `${publicOrigin}/`)
    .replaceAll(`${basePath}//`, `${basePath}/`);
}

function addDemoHost(html, path) {
  const script = `<script src="/demos/demo-host.js" data-root="${basePath}" data-family="${family.replaceAll('"', '&quot;')}" data-variant="${variant.replaceAll('"', '&quot;')}"></script>`;
  const relativePath = relative(destination, path).split(sep).join("/");
  const pagePath = relativePath === "index.html" ? "/" : `/${relativePath.replace(/index\.html$/, "")}`;
  const canonical = `<link rel="canonical" href="${publicOrigin}${pagePath}">`;
  const withoutCanonical = html.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "");
  const host = withoutCanonical.includes('src="/demos/demo-host.js"') ? "" : script;
  return withoutCanonical.replace(/<head([^>]*)>/i, `<head$1>${host}${canonical}`);
}

function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(path);
      continue;
    }

    if (!textExtensions.has(extname(entry.name)) && basename(entry.name) !== "_headers") {
      continue;
    }

    const before = readFileSync(path, "utf8");
    let after = basename(entry.name) === "sitemap.xml"
      ? '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'
      : rewrite(before);
    if (family === "Clínica Veterinaria" && basename(entry.name) === "site.css") {
      after += "\nhtml,body{max-width:100%;overflow-x:hidden}\n";
    }
    if (extname(entry.name) === ".html") after = addDemoHost(after, path);
    if (after !== before) writeFileSync(path, after, "utf8");
  }
}

visit(destination);
console.log(`${slug}: importada en ${destination}`);
