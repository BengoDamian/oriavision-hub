// Only the five new law-demo hostnames are routed here. Existing demo domains
// and the main ORIAVISION site pass through unchanged.
const variants = ["bordo-oro", "esmeralda-oro", "azul-oro", "espresso", "espresso-imagen"];
const demoHosts = new Map(variants.map(variant => [`abogados-${variant}.oriavision.com.ar`, `abogados-${variant}`]));

type Element = {getAttribute(name: string): string | null; setAttribute(name: string, value: string): void};
declare class HTMLRewriter {
  on(selector: string, handler: {element(element: Element): void}): HTMLRewriter;
  transform(response: Response): Response;
}
type Context = {request: Request; next(): Promise<Response>; env: {ASSETS: {fetch(request: Request): Promise<Response>}}};

export const onRequest = async (context: Context) => {
  const url = new URL(context.request.url);
  const slug = demoHosts.get(url.hostname);
  if (!slug) return context.next();
  const prefix = `/demos/${slug}`;
  const pathname = url.pathname.startsWith(`${prefix}/`) ? url.pathname.slice(prefix.length) : url.pathname;
  // Do not expose other demos, APIs or the commercial site's pages on this host.
  if (/^\/(?:api|admin|administracion|demos)(?:\/|$)/.test(pathname)) return new Response("Not found", {status:404});
  const assetUrl = new URL(context.request.url);
  assetUrl.pathname = prefix + (pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname) ? pathname : pathname + "/");
  const response = await context.env.ASSETS.fetch(new Request(assetUrl, context.request));
  if (!response.headers.get("content-type")?.includes("text/html")) return response;
  const publicRoot = `https://${url.hostname}/`;
  const localRoot = `https://www.oriavision.com.ar${prefix}/`;
  const relative = pathname.replace(/^\/+|\/+$/g, "");
  const canonical = publicRoot + (relative ? `${relative}/` : "");
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  const result = new Response(response.body, {status:response.status, headers});
  return new HTMLRewriter()
    .on("a[href],link[href],img[src],script[src],source[src]", {
      element(el) {
        for (const attr of ["href", "src"]) {
          const value = el.getAttribute(attr);
          if (!value) continue;
          if (value.startsWith(`${prefix}/`)) el.setAttribute(attr, value.slice(prefix.length));
          else if (value.startsWith("https://wa.me/5491127575675?")) el.setAttribute(attr, value.replace(encodeURIComponent(localRoot), encodeURIComponent(publicRoot)));
        }
      },
    })
    .on('link[rel="canonical"]', {element(el) {el.setAttribute("href", canonical);}})
    .transform(result);
};
