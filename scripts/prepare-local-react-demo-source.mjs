import { readFileSync, writeFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const [sourceArg, slug] = process.argv.slice(2);
if (!sourceArg || !slug) {
  throw new Error("Uso: node scripts/prepare-local-react-demo-source.mjs <directorio-fuente> <slug>");
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Slug inválido: ${slug}`);

const workspace = resolve(process.cwd());
const source = resolve(sourceArg);
const expectedRoot = resolve(workspace, ".tool-cache", "sources");
if (source !== expectedRoot && !source.startsWith(`${expectedRoot}${sep}`)) {
  throw new Error(`Fuente fuera del área temporal permitida: ${source}`);
}

const brandPath = resolve(source, "app", "brand.tsx");
const before = readFileSync(brandPath, "utf8");
const adminLink = '<a href="/panel">Administración</a>';
const occurrences = before.split(adminLink).length - 1;
if (occurrences > 1) {
  throw new Error(`Se esperaba como máximo un enlace administrativo en ${brandPath}; encontrados: ${occurrences}`);
}

writeFileSync(brandPath, before.replace(adminLink, ""), "utf8");

const demoPath = resolve(source, "app", "oriavision-demo.tsx");
const demoBefore = readFileSync(demoPath, "utf8");
const urlPattern = /const url="https:\/\/(?:[a-z0-9.-]+\.chatgpt\.site|pilates\.oriavision\.com\.ar|peluqueria\.oriavision\.com\.ar)\/?";/g;
const urls = [...demoBefore.matchAll(urlPattern)];
if (urls.length > 1) throw new Error(`Se esperaba como máximo una URL pública anterior en ${demoPath}; encontradas: ${urls.length}`);
const localUrl = `https://www.oriavision.com.ar/demos/${slug}/`;
const expected = `const url="${localUrl}";`;
let demoAfter = demoBefore;
if (urls.length === 1) demoAfter = demoBefore.replace(urlPattern, expected);
else if (!demoBefore.includes(expected)) throw new Error(`No se encontró una URL de demo reconocida en ${demoPath}`);
writeFileSync(demoPath, demoAfter, "utf8");

const alunaClient = `import { defaultConfig, schedule, type Slot } from "./model";

export class ApiRequestError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export async function api<T = void>(path: string, data?: unknown): Promise<T> {
  if (data) return { ok: true, demo: true } as T;
  const request = new URL(path, "https://demo.local/");
  const action = request.pathname.replace(/^\\/+/, "");
  if (action === "studio") return clone(defaultConfig) as T;
  if (action === "slots") {
    const classId = request.searchParams.get("classId") || "";
    const date = request.searchParams.get("date") || "";
    const selectedClass = defaultConfig.classes.find((entry) => entry.id === classId);
    if (!selectedClass || !/^\\d{4}-\\d{2}-\\d{2}$/.test(date)) return { slots: [] } as T;
    const day = new Date(date + "T12:00:00Z").getUTCDay();
    const slots: Slot[] = schedule
      .filter((entry) => entry.classId === classId && entry.days.includes(day))
      .map((entry) => ({
        id: entry.id,
        classId: entry.classId,
        instructorId: entry.instructorId,
        instructor: defaultConfig.instructors.find((person) => person.id === entry.instructorId)?.name || "",
        time: entry.time,
        remaining: selectedClass.capacity,
        capacity: selectedClass.capacity,
        price: selectedClass.price,
        duration: selectedClass.duration,
      }));
    return { slots } as T;
  }
  throw new ApiRequestError("Esta acción no forma parte de la demostración local.", 404);
}
`;

const barberClient = `import { businessId, defaultConfig } from "./model";

export class ApiRequestError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const minutes = (time: string) => {
  const [hours, mins] = time.split(":").map(Number);
  return hours * 60 + mins;
};
const clock = (value: number) => String(Math.floor(value / 60)).padStart(2, "0") + ":" + String(value % 60).padStart(2, "0");

export async function api<T = void>(path: string, data?: unknown): Promise<T> {
  if (data) return { ok: true, demo: true } as T;
  const request = new URL(path, "https://demo.local/");
  const action = request.pathname.replace(/^\\/+/, "");
  if (action === "business") return { id: businessId, config: clone(defaultConfig) } as T;
  if (action === "slots") {
    const serviceId = request.searchParams.get("serviceId") || "";
    const professionalId = request.searchParams.get("professionalId") || "";
    const date = request.searchParams.get("date") || "";
    const service = defaultConfig.services.find((entry) => entry.id === serviceId);
    const professional = defaultConfig.professionals.some((entry) => entry.id === professionalId);
    const validDate = /^\\d{4}-\\d{2}-\\d{2}$/.test(date);
    const day = validDate ? new Date(date + "T12:00:00Z").getUTCDay() : -1;
    if (!service || !professional || !defaultConfig.days.includes(day) || defaultConfig.blocked.includes(date)) {
      return { slots: [] } as T;
    }
    const slots: string[] = [];
    for (let value = minutes(defaultConfig.open); value + service.duration <= minutes(defaultConfig.close); value += 30) {
      const time = clock(value);
      if (new Date(date + "T" + time + ":00-03:00").getTime() >= Date.now() + 30 * 60 * 1000) slots.push(time);
    }
    return { slots } as T;
  }
  throw new ApiRequestError("Esta acción no forma parte de la demostración local.", 404);
}
`;

const clientPath = resolve(source, "lib", "client.ts");
writeFileSync(clientPath, slug.startsWith("aluna-pilates-") ? alunaClient : barberClient, "utf8");

console.log(`${sourceArg}: fuente preparada para /demos/${slug}/`);
