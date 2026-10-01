import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const demosRoot = resolve("public", "demos");
let changed = 0;

function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(path);
      continue;
    }
    if (extname(entry.name) !== ".html") continue;

    const before = readFileSync(path, "utf8");
    const after = before.replaceAll("document.body.appendChild(s)", "document.head.appendChild(s)");
    if (after === before) continue;
    writeFileSync(path, after, "utf8");
    changed += 1;
  }
}

visit(demosRoot);
console.log(`${changed} páginas actualizadas`);
