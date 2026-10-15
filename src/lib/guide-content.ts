// Shared by the article body and its anchor navigation. No browser dependencies.
export function parseGuideContent(content: string) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  const blocks: Array<
    | { type: "p"; text: string }
    | { type: "template"; text: string }
    | { type: "heading"; level: 1 | 2 | 3; text: string; sub?: string; id?: string }
    | { type: "ul"; items: string[] }
    | { type: "callout"; title: string; body?: string }
    | { type: "table"; headers: string[]; rows: string[][] }
  > = [];

  let i = 0;

  const isListItem = (line: string) =>
    line.startsWith("- ") || line.startsWith("* ");

  const isHeadingLine = (line: string) =>
    line.startsWith("# ") ||
    line.startsWith("## ") ||
    line.startsWith("### ") ||
    line.startsWith("✅");

  const isCalloutLine = (line: string) => line.startsWith("📌");

  const isTableLine = (line: string) => {
    const trimmed = line.trim();
    return trimmed.startsWith("|") && trimmed.includes("|");
  };

  const isTableDividerLine = (line: string) => {
    const trimmed = line.trim();
    return /^\|?(\s*:?-{3,}:?\s*\|)+\s*$/.test(trimmed);
  };

  const parseTableRow = (line: string) => {
    return line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());
  };

  const pushParagraph = (text: string) => {
    const t = text.trim();
    if (t) blocks.push({ type: "p", text: t });
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      i++;
      continue;
    }

    if (line === "```ficha") {
      const template: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== "```") {
        template.push(lines[i++]);
      }
      i++;
      blocks.push({ type: "template", text: template.join("\n") });
      continue;
    }

    // Tabla markdown
    if (
      isTableLine(line) &&
      i + 1 < lines.length &&
      isTableDividerLine(lines[i + 1].trim())
    ) {
      const headers = parseTableRow(lines[i]);
      i += 2; // salta header + divider

      const rows: string[][] = [];

      while (i < lines.length) {
        const l = lines[i].trim();

        if (!l) {
          i++;
          break;
        }

        if (!isTableLine(l)) break;

        rows.push(parseTableRow(l));
        i++;
      }

      blocks.push({
        type: "table",
        headers,
        rows,
      });

      continue;
    }

    // Callout 📌
    if (isCalloutLine(line)) {
      const title = line.replace(/^📌\s*/, "").trim();
      i++;

      let body = "";
      while (i < lines.length) {
        const l = lines[i].trim();

        if (!l) {
          i++;
          break;
        }

        if (
          isHeadingLine(l) ||
          isCalloutLine(l) ||
          isListItem(l) ||
          (isTableLine(l) &&
            i + 1 < lines.length &&
            isTableDividerLine(lines[i + 1].trim()))
        ) {
          break;
        }

        body += (body ? " " : "") + l;
        i++;
      }

      blocks.push({
        type: "callout",
        title,
        body: body.trim() || undefined,
      });
      continue;
    }

    // Headings markdown
    if (line.startsWith("### ")) {
      const text = line.replace(/^###\s+/, "").trim();
      i++;

      let sub = "";
      while (i < lines.length) {
        const l = lines[i].trim();

        if (!l) {
          i++;
          break;
        }

        if (
          isHeadingLine(l) ||
          isCalloutLine(l) ||
          isListItem(l) ||
          (isTableLine(l) &&
            i + 1 < lines.length &&
            isTableDividerLine(lines[i + 1].trim()))
        ) {
          break;
        }

        sub += (sub ? " " : "") + l;
        i++;
      }

      blocks.push({
        type: "heading",
        level: 3,
        text,
        sub: sub.trim() || undefined,
      });
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.replace(/^##\s+/, "").trim();
      i++;

      let sub = "";
      while (i < lines.length) {
        const l = lines[i].trim();

        if (!l) {
          i++;
          break;
        }

        if (
          isHeadingLine(l) ||
          isCalloutLine(l) ||
          isListItem(l) ||
          (isTableLine(l) &&
            i + 1 < lines.length &&
            isTableDividerLine(lines[i + 1].trim()))
        ) {
          break;
        }

        sub += (sub ? " " : "") + l;
        i++;
      }

      blocks.push({
        type: "heading",
        level: 2,
        text,
        sub: sub.trim() || undefined,
      });
      continue;
    }

    if (line.startsWith("# ")) {
      const text = line.replace(/^#\s+/, "").trim();
      i++;

      let sub = "";
      while (i < lines.length) {
        const l = lines[i].trim();

        if (!l) {
          i++;
          break;
        }

        if (
          isHeadingLine(l) ||
          isCalloutLine(l) ||
          isListItem(l) ||
          (isTableLine(l) &&
            i + 1 < lines.length &&
            isTableDividerLine(lines[i + 1].trim()))
        ) {
          break;
        }

        sub += (sub ? " " : "") + l;
        i++;
      }

      blocks.push({
        type: "heading",
        level: 1,
        text,
        sub: sub.trim() || undefined,
      });
      continue;
    }

    // Heading ✅
    if (line.startsWith("✅")) {
      const text = line.replace(/^✅\s*/, "").trim();
      i++;

      let sub = "";
      while (i < lines.length) {
        const l = lines[i].trim();

        if (!l) {
          i++;
          break;
        }

        if (
          isHeadingLine(l) ||
          isCalloutLine(l) ||
          isListItem(l) ||
          (isTableLine(l) &&
            i + 1 < lines.length &&
            isTableDividerLine(lines[i + 1].trim()))
        ) {
          break;
        }

        sub += (sub ? " " : "") + l;
        i++;
      }

      blocks.push({
        type: "heading",
        level: 2,
        text,
        sub: sub.trim() || undefined,
      });
      continue;
    }

    // Listas
    if (isListItem(line)) {
      const items: string[] = [];

      while (i < lines.length) {
        const l = lines[i].trim();

        if (!l) {
          i++;
          continue;
        }

        if (!isListItem(l)) break;

        items.push(l.replace(/^[-*]\s+/, "").trim());
        i++;
      }

      blocks.push({ type: "ul", items });
      continue;
    }

    // Párrafo normal
    let p = line;
    i++;

    while (i < lines.length) {
      const l = lines[i].trim();

      if (!l) {
        i++;
        break;
      }

      if (
        isHeadingLine(l) ||
        isCalloutLine(l) ||
        isListItem(l) ||
        (isTableLine(l) &&
          i + 1 < lines.length &&
          isTableDividerLine(lines[i + 1].trim()))
      ) {
        break;
      }

      p += " " + l;
      i++;
    }

    pushParagraph(p);
  }

  const seen = new Map<string, number>();
  return blocks.map(block => {
    if (block.type !== "heading") return block;
    const slug = block.text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const base = `seccion-${slug || "guia"}`;
    const count = (seen.get(base) || 0) + 1;
    seen.set(base, count);
    return { ...block, id: count === 1 ? base : `${base}-${count}` };
  });
}
