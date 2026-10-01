import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const [debugPort = "9230", baseUrl = "http://127.0.0.1:4173"] = process.argv.slice(2);
const demosRoot = resolve(process.cwd(), "public", "demos");
const slugs = readdirSync(demosRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

let pages = [];
for (let attempt = 0; attempt < 40; attempt += 1) {
  try {
    pages = await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json();
    if (pages.length) break;
  } catch {}
  await new Promise((resolveWait) => setTimeout(resolveWait, 200));
}
const page = pages.find((item) => item.type === "page") ?? pages[0];
if (!page) throw new Error("No hay una página de Chrome disponible");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolveOpen, reject) => {
  socket.addEventListener("open", resolveOpen, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let id = 0;
const pending = new Map();
let navigationErrors = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
    return;
  }
  if (message.method === "Runtime.exceptionThrown") {
    const details = message.params.exceptionDetails;
    navigationErrors.push(details.exception?.description || details.text || "runtime exception");
  }
  if (message.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(message.params.type)) {
    const rendered = message.params.args
      .map((arg) => arg.value ?? arg.description ?? arg.type)
      .join(" ");
    navigationErrors.push(`console.${message.params.type}: ${rendered}`);
  }
  if (message.method === "Network.responseReceived" && message.params.response.status >= 400) {
    const url = message.params.response.url;
    if (!url.endsWith("/favicon.ico")) navigationErrors.push(`${message.params.response.status} ${url}`);
  }
});
const call = (method, params = {}) => new Promise((resolveCall) => {
  const callId = ++id;
  pending.set(callId, resolveCall);
  socket.send(JSON.stringify({ id: callId, method, params }));
});

await call("Page.enable");
await call("Runtime.enable");
await call("Network.enable");

async function evaluate(expression) {
  const result = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.result?.exceptionDetails) throw new Error(result.result.exceptionDetails.text);
  return result.result?.result?.value;
}

async function navigate(url, width, reload = false) {
  navigationErrors = [];
  const slug = new URL(url).pathname.split("/")[2] || "";
  await call("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: false });
  if (reload) await call("Page.reload", { ignoreCache: true });
  else await call("Page.navigate", { url });
  await new Promise((resolveWait) => setTimeout(resolveWait, 700));
  const metrics = await evaluate(`(() => ({
    title: document.title,
    bodyText: (document.body?.innerText || '').trim().length,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
    chatgptResources: performance.getEntriesByType('resource').map((entry) => entry.name).filter((url) => /chatgpt\\.site/i.test(url)),
    hostScript: Boolean(document.querySelector('script[src="/demos/demo-host.js"]')),
    badContacts: [...document.querySelectorAll('a[href]')].map((a) => a.href).filter((href) => /^(?:mailto|tel):/i.test(href) || /(?:wa\\.me|api\\.whatsapp\\.com)\\/(?!5491127575675)/i.test(href)),
    adminLinks: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href') || '').filter((href) => /\\/(?:admin|panel)\\/?(?:[?#].*)?$/i.test(href)),
    incompleteWhatsapp: [...document.querySelectorAll('a[href*="wa.me/"]')].map((a) => a.href).filter((href) => !href.includes('5491127575675') || !decodeURIComponent(href).includes('/demos/${slug}/')),
    h1: (document.querySelector('h1')?.innerText || '').trim(),
  }))()`);
  return { metrics, errors: [...navigationErrors] };
}

function findInternalPage(slug) {
  const root = join(demosRoot, slug);
  const candidates = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.name === "index.html" && path !== join(root, "index.html")) candidates.push(path);
    }
  };
  visit(root);
  candidates.sort();
  const preferred = candidates.find((path) => /(?:reserv|servicios|productos|contacto)/i.test(path)) ?? candidates[0];
  if (!preferred) return null;
  return `/${relative(resolve(process.cwd(), "public"), preferred).split(sep).join("/").replace(/index\.html$/, "")}`;
}

function findFormPage(slug) {
  const root = join(demosRoot, slug);
  const candidates = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.name === "index.html" && /<form\b/i.test(readFileSync(path, "utf8"))) candidates.push(path);
    }
  };
  visit(root);
  const preferred = candidates.find((path) => /(?:reserv|turnos|contacto)/i.test(path)) ?? candidates[0];
  if (!preferred) return null;
  return `/${relative(resolve(process.cwd(), "public"), preferred).split(sep).join("/").replace(/index\.html$/, "")}`;
}

const problems = [];
const checked = [];
const warnings = [];
const hydrationSlugs = new Set([
  "aluna-pilates-original", "aluna-pilates-arcade", "aluna-pilates-blossom", "aluna-pilates-delft",
  "barberia-proceres", "barberia-azul", "barberia-turquesa", "barberia-verde",
]);
for (const width of [1440, 390, 360]) {
  for (const slug of slugs) {
    const url = `${baseUrl}/demos/${slug}/`;
    const { metrics, errors } = await navigate(url, width);
    if (!metrics || metrics.bodyText < 300 || !metrics.h1) problems.push(`${slug}@${width}: contenido incompleto`);
    if (metrics && metrics.scrollWidth > metrics.clientWidth + 1) problems.push(`${slug}@${width}: desborde ${metrics.scrollWidth}/${metrics.clientWidth}`);
    if (metrics?.brokenImages.length) problems.push(`${slug}@${width}: imágenes rotas ${metrics.brokenImages.join(",")}`);
    if (metrics?.chatgptResources.length) problems.push(`${slug}@${width}: dependencia ChatGPT ${metrics.chatgptResources.join(",")}`);
    if (!metrics?.hostScript) problems.push(`${slug}@${width}: falta host de demostración`);
    if (metrics?.badContacts.length) problems.push(`${slug}@${width}: contacto externo ${metrics.badContacts.join(",")}`);
    if (metrics?.adminLinks.length) problems.push(`${slug}@${width}: enlace administrativo publico ${metrics.adminLinks.join(",")}`);
    if (metrics?.incompleteWhatsapp.length) problems.push(`${slug}@${width}: mensaje de WhatsApp incompleto`);
    if (errors.length) problems.push(`${slug}@${width}: ${errors.join(" | ")}`);
    if (width === 390) {
      const menu = await evaluate(`(() => {
        const button = document.querySelector('[aria-controls="main-menu"]');
        if (!button) return { present: false };
        const before = button.getAttribute('aria-expanded');
        button.click();
        return { present: true, before };
      })()`);
      if (menu?.present) {
        await new Promise((resolveWait) => setTimeout(resolveWait, 100));
        const expanded = await evaluate(`document.querySelector('[aria-controls="main-menu"]')?.getAttribute('aria-expanded')`);
        if (expanded !== "true") problems.push(`${slug}@${width}: menú móvil no abre`);
      }
    }
    checked.push(`${slug}@${width}`);
  }
}

for (const slug of slugs) {
  const internal = findInternalPage(slug);
  if (internal) {
    const first = await navigate(`${baseUrl}${internal}`, 1280);
    if (!first.metrics || first.metrics.bodyText < 200 || first.metrics.brokenImages.length) problems.push(`${slug}: página interna inválida ${internal}`);
    if (hydrationSlugs.has(slug) && first.errors.length) problems.push(`${slug}: página interna produjo ${first.errors.join(" | ")}`);
    const second = await navigate(`${baseUrl}${internal}`, 1280, true);
    if (!second.metrics || second.metrics.title !== first.metrics.title) problems.push(`${slug}: recarga interna inestable ${internal}`);
    if (hydrationSlugs.has(slug) && second.errors.length) problems.push(`${slug}: recarga interna produjo ${second.errors.join(" | ")}`);
  }

  if (hydrationSlugs.has(slug) && internal) {
    const rootUrl = `${baseUrl}/demos/${slug}/`;
    await navigate(rootUrl, 1280);
    const reloaded = await navigate(rootUrl, 1280, true);
    if (!reloaded.metrics || reloaded.errors.length) {
      problems.push(`${slug}: recarga de portada inestable${reloaded.errors.length ? ` (${reloaded.errors.join(" | ")})` : ""}`);
    }

    await navigate(rootUrl, 1280);
    const clicked = await evaluate(`(() => {
      const normalized = (path) => path.endsWith('/') ? path.slice(0, -1) : path;
      const expected = normalized(${JSON.stringify(internal)});
      const link = [...document.querySelectorAll('a[href]')].find((anchor) => normalized(new URL(anchor.href).pathname) === expected);
      if (!link) return false;
      link.click();
      return true;
    })()`);
    if (!clicked) problems.push(`${slug}: no se encontró enlace interno a ${internal}`);
    else {
      await new Promise((resolveWait) => setTimeout(resolveWait, 450));
      const arrived = await evaluate("location.pathname");
      if (arrived.replace(/\/$/, "") !== internal.replace(/\/$/, "")) problems.push(`${slug}: navegación por enlace falló (${arrived})`);
      await evaluate("history.back()");
      await new Promise((resolveWait) => setTimeout(resolveWait, 450));
      const backed = await evaluate("location.pathname");
      if (backed !== `/demos/${slug}/`) problems.push(`${slug}: Atrás falló (${backed})`);
      await evaluate("history.forward()");
      await new Promise((resolveWait) => setTimeout(resolveWait, 450));
      const forwarded = await evaluate("location.pathname");
      if (forwarded.replace(/\/$/, "") !== internal.replace(/\/$/, "")) problems.push(`${slug}: Adelante falló (${forwarded})`);
      if (navigationErrors.length) problems.push(`${slug}: historial produjo ${navigationErrors.join(" | ")}`);
    }
  }

  const formPage = findFormPage(slug);
  if (formPage) {
    const formNavigation = await navigate(`${baseUrl}${formPage}`, 1280);
    if (hydrationSlugs.has(slug) && formNavigation.errors.length) problems.push(`${slug}: formulario produjo ${formNavigation.errors.join(" | ")}`);
    const simulated = await evaluate(`(() => {
      const form = document.querySelector('form');
      if (!form) return false;
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      const dialog = document.querySelector('#oriavision-demo-confirmation');
      return Boolean(dialog && (dialog.open || dialog.hasAttribute('open')) && /No se registró ningún turno/.test(dialog.textContent));
    })()`);
    if (!simulated) problems.push(`${slug}: reserva no confirmada como simulación`);
  }
}

console.log(JSON.stringify({ demos: slugs.length, viewportChecks: checked.length, warnings, problems }, null, 2));
socket.close();
if (slugs.length !== 29 || problems.length) process.exitCode = 1;
