export default function GuideBody({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  const blocks: Array<
    | { type: "p"; text: string }
    | { type: "heading"; level: 1 | 2 | 3; text: string; sub?: string }
    | { type: "ul"; items: string[] }
    | { type: "callout"; title: string; body?: string }
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

        if (isHeadingLine(l) || isCalloutLine(l) || isListItem(l)) break;

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

        if (isHeadingLine(l) || isCalloutLine(l) || isListItem(l)) break;

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

        if (isHeadingLine(l) || isCalloutLine(l) || isListItem(l)) break;

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

        if (isHeadingLine(l) || isCalloutLine(l) || isListItem(l)) break;

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

        if (isHeadingLine(l) || isCalloutLine(l) || isListItem(l)) break;

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

      if (isHeadingLine(l) || isCalloutLine(l) || isListItem(l)) break;

      p += " " + l;
      i++;
    }

    pushParagraph(p);
  }

  return (
    <article className="w-full max-w-none space-y-7 text-slate-800">
      {blocks.map((b, idx) => {
        if (b.type === "heading") {
          if (b.level === 1) {
            return (
              <section key={idx} className="space-y-3 pt-2">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-4xl">
                  {b.text}
                </h2>
                {b.sub ? (
                  <p className="text-base font-medium leading-7 text-textBody md:text-lg">
                    {b.sub}
                  </p>
                ) : null}
              </section>
            );
          }

          if (b.level === 2) {
            return (
              <section key={idx} className="space-y-3 pt-2">
                <h3 className="text-xl font-black tracking-tight text-slate-900 md:text-3xl">
                  {b.text}
                </h3>
                {b.sub ? (
                  <p className="text-base font-medium leading-7 text-textBody md:text-lg">
                    {b.sub}
                  </p>
                ) : null}
              </section>
            );
          }

          return (
            <section key={idx} className="space-y-2 pt-1">
              <h4 className="text-lg font-extrabold tracking-tight text-slate-900 md:text-2xl">
                {b.text}
              </h4>
              {b.sub ? (
                <p className="text-base font-medium leading-7 text-textBody md:text-lg">
                  {b.sub}
                </p>
              ) : null}
            </section>
          );
        }

        if (b.type === "ul") {
          return (
            <ul
              key={idx}
              className="list-disc space-y-2 pl-6 text-base font-medium leading-7 text-textBody md:text-[18px] md:leading-8"
            >
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
              className="rounded-[1.5rem] border border-brand-100 bg-brand-50 p-6 md:p-7"
            >
              <div className="text-lg font-extrabold text-slate-900 md:text-xl">
                {b.title}
              </div>
              {b.body ? (
                <p className="mt-2 text-base font-medium leading-7 text-textBody md:text-lg">
                  {b.body}
                </p>
              ) : null}
            </div>
          );
        }

        return (
          <p
            key={idx}
            className="text-base font-medium leading-8 text-textBody md:text-[18px]"
          >
            {b.text}
          </p>
        );
      })}
    </article>
  );
}