export default function GuideBody({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  const blocks: Array<
    | { type: "p"; text: string }
    | { type: "h3"; text: string; sub?: string }
    | { type: "ul"; items: string[] }
    | { type: "callout"; title: string; body?: string }
  > = [];

  let i = 0;

  const pushParagraph = (text: string) => {
    const t = text.trim();
    if (t) blocks.push({ type: "p", text: t });
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    // saltar vacíos
    if (!line) {
      i++;
      continue;
    }

    // Callout 📌
    if (line.startsWith("📌")) {
      const title = line.replace(/^📌\s*/, "").trim();
      // junta párrafos siguientes hasta que haya un "✅" o "📌" o lista
      i++;
      let body = "";
      while (i < lines.length) {
        const l = lines[i].trim();
        if (!l) {
          body += "\n";
          i++;
          continue;
        }
        if (l.startsWith("✅") || l.startsWith("📌") || l.startsWith("- ")) break;
        body += (body ? " " : "") + l;
        i++;
      }
      blocks.push({ type: "callout", title, body: body.trim() || undefined });
      continue;
    }

    // Heading ✅
    if (line.startsWith("✅")) {
      const title = line.replace(/^✅\s*/, "").trim();
      i++;
      let sub = "";
      while (i < lines.length) {
        const l = lines[i].trim();
        if (!l) {
          i++;
          break;
        }
        if (l.startsWith("✅") || l.startsWith("📌") || l.startsWith("- ")) break;
        sub += (sub ? " " : "") + l;
        i++;
      }
      blocks.push({ type: "h3", text: title, sub: sub.trim() || undefined });
      continue;
    }

    // Listas "- "
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (!l) {
          i++;
          continue;
        }
        if (!l.startsWith("- ")) break;
        items.push(l.replace(/^- /, "").trim());
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Párrafo normal (junta líneas hasta vacío)
    let p = line;
    i++;
    while (i < lines.length && lines[i].trim()) {
      const l = lines[i].trim();
      if (l.startsWith("✅") || l.startsWith("📌") || l.startsWith("- ")) break;
      p += " " + l;
      i++;
    }
    pushParagraph(p);
  }

  return (
    <article className="space-y-6 text-[17px] leading-8 text-slate-800">
      {blocks.map((b, idx) => {
        if (b.type === "h3") {
          return (
            <section key={idx} className="space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {b.text}
              </h3>
              {b.sub ? <p className="font-medium text-textBody">{b.sub}</p> : null}
            </section>
          );
        }

        if (b.type === "ul") {
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 font-medium text-textBody">
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          );
        }

        if (b.type === "callout") {
          return (
            <div
              key={idx}
              className="rounded-[1.5rem] border border-brand-100 bg-brand-50 p-6"
            >
              <div className="font-extrabold text-slate-900">{b.title}</div>
              {b.body ? <p className="mt-2 font-medium text-textBody">{b.body}</p> : null}
            </div>
          );
        }

        return (
          <p key={idx} className="font-medium text-textBody">
            {b.text}
          </p>
        );
      })}
    </article>
  );
}