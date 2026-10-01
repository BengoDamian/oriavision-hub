import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve, sep } from "node:path";

const [originArg, slug, family, variant] = process.argv.slice(2);
if (!originArg || !slug || !family || !variant) {
  throw new Error("Uso: node scripts/mirror-published-demo.mjs <origen> <slug> <familia> <variante>");
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Slug inválido: ${slug}`);

const origin = new URL(originArg);
const basePath = `/demos/${slug}`;
const publicOrigin = `https://www.oriavision.com.ar${basePath}`;
const demosRoot = resolve(process.cwd(), "public", "demos");
const destination = resolve(demosRoot, slug);
if (!destination.startsWith(`${demosRoot}${sep}`)) throw new Error("Destino fuera de public/demos");

const pageQueue = ["/"];
const assetQueue = [];
const seenPages = new Set();
const seenAssets = new Set();
const assetExtensions = new Set([
  ".avif", ".css", ".gif", ".ico", ".jpeg", ".jpg", ".js", ".json", ".mjs", ".mp3", ".mp4",
  ".ogg", ".otf", ".pdf", ".png", ".svg", ".ttf", ".webm", ".webp", ".woff", ".woff2", ".xml",
]);

const ensureInsideDestination = (path) => {
  const resolved = resolve(path);
  if (resolved !== destination && !resolved.startsWith(`${destination}${sep}`)) throw new Error(`Ruta insegura: ${resolved}`);
  return resolved;
};

function isAsset(pathname) {
  return pathname.startsWith("/_next/") || assetExtensions.has(extname(pathname).toLowerCase());
}

function enqueue(reference, from, forceAsset = false) {
  if (!reference || /^(?:data|blob|javascript|mailto|tel):/i.test(reference) || reference.startsWith("#")) return;
  let url;
  try { url = new URL(reference, from); } catch { return; }
  if (url.origin !== origin.origin || /^\/(?:api|admin|panel|cdn-cgi)(?:\/|$)/i.test(url.pathname)) return;
  if (/\/(?:admin|panel)[^/]*\.js$/i.test(url.pathname)) return;
  if (forceAsset || isAsset(url.pathname)) assetQueue.push(url.pathname);
  else pageQueue.push(url.pathname || "/");
}

function collectReferences(text, from, contentType) {
  if (contentType.includes("html")) {
    for (const match of text.matchAll(/\b(?:href|src|poster|action)=["']([^"']+)["']/gi)) enqueue(match[1], from);
    for (const match of text.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
      for (const candidate of match[1].split(",")) enqueue(candidate.trim().split(/\s+/)[0], from, true);
    }
  }
  if (contentType.includes("css") || contentType.includes("html")) {
    for (const match of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) enqueue(match[1], from, true);
  }
  for (const match of text.matchAll(/["'](\/?_next\/static\/[^"'`()\s,;]+)["']/g)) enqueue(match[1].startsWith("/") ? match[1] : `/${match[1]}`, from, true);
}

function rewriteRootReferences(text) {
  return text
    .replaceAll(origin.origin, publicOrigin)
    .replaceAll(encodeURIComponent(origin.origin), encodeURIComponent(publicOrigin))
    // This also catches escaped RSC payloads such as \"css:/_next/...\".
    .replaceAll("/_next/static/", `${basePath}/_next/static/`)
    .replace(/((?:href|src|poster|action)=["'])\/(?!\/)/gi, `$1${basePath}/`)
    .replace(/(srcset=["'])([^"']+)(["'])/gi, (_all, start, value, end) => {
      const rewritten = value.replace(/(^|,\s*)\/(?!\/)/g, `$1${basePath}/`);
      return `${start}${rewritten}${end}`;
    })
    .replace(/url\((['"]?)\/(?!\/)/gi, `url($1${basePath}/`)
    // Vinext serializes route and asset paths inside its hydration payloads and
    // compiled chunks. Keep every quoted root-relative path inside this demo.
    .replace(/(["'`])\/(?!\/|demos\/)([a-zA-Z0-9][^"'`\s?#]*)/g, `$1${basePath}/$2`)
    // Its dependency table omits the leading slash, then the runtime restores
    // it at the site root. Prefix those entries before that happens.
    .replace(/(["'`])_next\/static\//g, `$1demos/${slug}/_next/static/`)
    .replaceAll(`${basePath}${basePath}/`, `${basePath}/`)
    .replaceAll(`${basePath}//`, `${basePath}/`)
    .replaceAll(`${publicOrigin}//`, `${publicOrigin}/`);
}

function rewriteHtml(html, pathname) {
  let next = html
    // Cloudflare adds a challenge bootstrap to the published response. It is
    // infrastructure code, not part of the demo, and must not be mirrored.
    .replace(/<script\b[^>]*src=["'][^"']*\/cdn-cgi\/[^"']*["'][^>]*><\/script>/gi, "")
    .replace(/<script\b(?![^>]*\bsrc=)[^>]*>(?:(?!<\/script>)[\s\S])*?cdn-cgi(?:(?!<\/script>)[\s\S])*?<\/script>/gi, "");
  next = rewriteRootReferences(next)
    .replace(new RegExp(`<a\\b[^>]*href=["']${basePath}/(?:admin|panel)/?["'][^>]*>[\\s\\S]*?<\\/a>`, "gi"), "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>/gi, "");
  const canonicalPath = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  const metadata = `<meta name="robots" content="noindex,nofollow"><link rel="canonical" href="${publicOrigin}${canonicalPath}">`;
  next = next.replace(/<head([^>]*)>/i, `<head$1>${metadata}`);

  // Adding a new script node before hydration makes React reject the document
  // in some Vinext builds. Reuse the load event of an existing module and add
  // the host behavior after hydration has started instead.
  const loader = `setTimeout(()=>{const s=document.createElement("script");s.src="/demos/demo-host.js";s.dataset.root=${JSON.stringify(basePath)};s.dataset.family=${JSON.stringify(family)};s.dataset.variant=${JSON.stringify(variant)};document.body.appendChild(s)},250)`;
  const escapedLoader = loader.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
  next = next.replace(
    /(<script\b[^>]*\bsrc=["'][^"']*\/_next\/static\/chunks\/[^"']+["'][^>]*)(>)/i,
    `$1 onload="${escapedLoader}"$2`,
  );
  return next;
}

function pageFile(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, "");
  return ensureInsideDestination(clean ? join(destination, ...clean.split("/"), "index.html") : join(destination, "index.html"));
}

function assetFile(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  return ensureInsideDestination(join(destination, ...clean.split("/")));
}

async function request(pathname) {
  const response = await fetch(new URL(pathname, origin), {
    headers: { "User-Agent": "ORIAVISION local demo migration" },
    redirect: "follow",
  });
  if (!response.ok) throw new Error(`${response.status} ${pathname}`);
  return response;
}

while (pageQueue.length) {
  const pathname = pageQueue.shift();
  const key = pathname.replace(/\/$/, "") || "/";
  if (seenPages.has(key)) continue;
  seenPages.add(key);
  const response = await request(pathname);
  const type = response.headers.get("content-type") || "";
  if (!type.includes("html")) {
    assetQueue.push(pathname);
    continue;
  }
  const html = await response.text();
  collectReferences(html, new URL(pathname, origin), type);
  const output = pageFile(pathname);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, rewriteHtml(html, pathname), "utf8");
}

while (assetQueue.length) {
  const pathname = assetQueue.shift();
  if (seenAssets.has(pathname)) continue;
  seenAssets.add(pathname);
  const response = await request(pathname);
  const type = response.headers.get("content-type") || "";
  const output = assetFile(pathname);
  mkdirSync(dirname(output), { recursive: true });
  if (/^(?:text\/|application\/(?:javascript|json|xml))/.test(type) || /\.(?:css|js|json|mjs|svg|xml)$/i.test(pathname)) {
    const text = await response.text();
    collectReferences(text, new URL(pathname, origin), type);
    writeFileSync(output, rewriteRootReferences(text), "utf8");
  } else {
    writeFileSync(output, Buffer.from(await response.arrayBuffer()));
  }
}

console.log(`${slug}: ${seenPages.size} páginas, ${seenAssets.size} recursos`);
