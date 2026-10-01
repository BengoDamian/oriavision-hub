import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve, sep } from "node:path";

const root = resolve(process.cwd(), "public", "demos");
const demoDirectories = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const problems = [];
let htmlCount = 0;
let assetCount = 0;

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else inspect(path);
  }
}

function publicTarget(reference) {
  const clean = reference.split(/[?#]/)[0];
  const relative = clean.replace(/^\/+/, "");
  const candidate = resolve(process.cwd(), "public", ...relative.split("/"));
  const publicRoot = resolve(process.cwd(), "public");
  if (candidate !== publicRoot && !candidate.startsWith(`${publicRoot}${sep}`)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  const index = join(candidate, "index.html");
  return existsSync(index) ? index : null;
}

function inspect(path) {
  const extension = extname(path).toLowerCase();
  if (extension !== ".html") {
    assetCount += 1;
    return;
  }

  htmlCount += 1;
  const html = readFileSync(path, "utf8");
  if (!/<meta\s+name=["']robots["'][^>]*noindex/i.test(html)) problems.push(`${path}: falta noindex`);
  if (!html.includes('/demos/demo-host.js')) problems.push(`${path}: falta demo-host.js`);
  if (/ercasa\.chatgpt\.site|\.chatgpt\.site/i.test(html)) problems.push(`${path}: referencia externa a ChatGPT Sites`);

  const numbers = [...html.matchAll(/wa\.me\/([0-9]+)/g)].map((match) => match[1]);
  for (const number of numbers) if (number !== "5491127575675") problems.push(`${path}: WhatsApp incorrecto ${number}`);
  if (/\b(?:mailto|tel):/i.test(html)) problems.push(`${path}: contacto mailto/tel sin normalizar`);

  for (const match of html.matchAll(/\b(?:href|src|poster|action)=["'](\/demos\/[^"']+)["']/gi)) {
    if (!publicTarget(match[1])) problems.push(`${path}: recurso o ruta inexistente ${match[1]}`);
  }
}

for (const directory of demoDirectories) {
  const index = join(root, directory, "index.html");
  if (!existsSync(index)) problems.push(`${directory}: falta index.html`);
  walk(join(root, directory));
}

const result = { demos: demoDirectories.length, html: htmlCount, assets: assetCount, problems };
console.log(JSON.stringify(result, null, 2));
if (demoDirectories.length !== 29 || problems.length) process.exitCode = 1;
