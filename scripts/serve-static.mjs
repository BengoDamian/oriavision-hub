import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { legacyDestination } from "./site-config.mjs";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 4173);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

createServer((request, response) => {
  let pathname, url;
  try {
    url = new URL(request.url, "http://localhost");
    pathname = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }
  const destination = legacyDestination(pathname);
  if (destination) {
    const target = new URL(destination, url.origin);
    target.search = url.search;
    response.writeHead(301, { Location: target.pathname + target.search + target.hash }).end();
    return;
  }
  let path = normalize(join(root, pathname.replace(/^\/+/, "")));
  if (path !== root && !path.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (existsSync(path) && statSync(path).isDirectory()) {
    if (!pathname.endsWith("/")) {
      response.writeHead(301, { Location: url.pathname + "/" + url.search }).end();
      return;
    }
    path = join(path, "index.html");
  }
  if (!existsSync(path) || !statSync(path).isFile()) {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    if (request.method === "HEAD") response.end();
    else if (existsSync(join(root, "404.html"))) createReadStream(join(root, "404.html")).pipe(response);
    else response.end("Not found");
    return;
  }
  const size = statSync(path).size;
  const headers = { "Content-Type": types[extname(path).toLowerCase()] ?? "application/octet-stream", "Cache-Control": "no-store", "Accept-Ranges": "bytes" };
  const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if (range) {
    const start = Number(range[1]);
    const end = Math.min(range[2] ? Number(range[2]) : size - 1, size - 1);
    if (start > end || start >= size) {
      response.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
      return;
    }
    response.writeHead(206, { ...headers, "Content-Length": end - start + 1, "Content-Range": `bytes ${start}-${end}/${size}` });
    if (request.method === "HEAD") response.end();
    else createReadStream(path, { start, end }).pipe(response);
  } else {
    response.writeHead(200, { ...headers, "Content-Length": size });
    if (request.method === "HEAD") response.end();
    else createReadStream(path).pipe(response);
  }
}).listen(port, "127.0.0.1", () => console.log(`Static QA server: http://127.0.0.1:${port}`));
