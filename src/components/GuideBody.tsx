import { parseGuideContent } from "@/lib/guide-content";
import CopyableGuideTemplate from "./CopyableGuideTemplate";

function inlineText(text: string) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    return link ? <a key={index} href={link[2]}>{link[1]}</a> : part;
  });
}

export default function GuideBody({ content }: { content: string }) {
  const blocks = parseGuideContent(content);

  return (
    <div className="guide-body w-full max-w-none space-y-7 text-slate-800">
      {blocks.map((b, idx) => {
        if (b.type === "template") return <CopyableGuideTemplate key={idx} text={b.text} />;
        if (b.type === "heading") {
          if (b.level === 1) {
            return (
              <section key={idx} className="space-y-3 pt-2">
                <h2 id={b.id} tabIndex={-1} className="text-2xl font-black tracking-tight text-slate-900 md:text-4xl">
                  {b.text}
                </h2>
                {b.sub ? (
                  <p className="text-base font-medium leading-7 text-textBody md:text-lg">
                    {inlineText(b.sub)}
                  </p>
                ) : null}
              </section>
            );
          }

          if (b.level === 2) {
            return (
              <section key={idx} className="space-y-3 pt-2">
                <h2 id={b.id} tabIndex={-1} className="text-xl font-black tracking-tight text-slate-900 md:text-3xl">
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

          return (
            <section key={idx} className="space-y-2 pt-1">
              <h3 id={b.id} tabIndex={-1} className="text-lg font-extrabold tracking-tight text-slate-900 md:text-2xl">
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

        if (b.type === "ul") {
          return (
            <ul
              key={idx}
              className={`list-disc space-y-2 pl-6 text-base font-medium leading-7 text-textBody md:text-[18px] md:leading-8${blocks.slice(0, idx).reverse().find(block => block.type === "heading" && /checklist/i.test(block.text)) ? " guide-checklist" : ""}`}
            >
              {b.items.map((it, j) => (
                <li key={j}>{inlineText(it)}</li>
              ))}
            </ul>
          );
        }

        if (b.type === "callout") {
          return (
            <div
              key={idx}
              className="guide-callout rounded-[1.5rem] border border-brand-100 bg-brand-50 p-6 md:p-7"
            >
              <div className="text-lg font-extrabold text-slate-900 md:text-xl">
                {b.title}
              </div>
              {b.body ? (
                <p className="mt-2 text-base font-medium leading-7 text-textBody md:text-lg">
                  {inlineText(b.body)}
                </p>
              ) : null}
            </div>
          );
        }

        if (b.type === "table") {
          return (
            <div
              key={idx}
              className="overflow-x-auto rounded-[1.5rem] border border-slate-200 bg-white"
            >
              <table className="min-w-full border-collapse text-left">
                <thead className="bg-slate-50">
                  <tr>
                    {b.headers.map((header, j) => (
                      <th
                        key={j}
                        className="border-b border-slate-200 px-4 py-3 text-sm font-extrabold text-slate-900 md:px-5 md:py-4 md:text-[15px]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="align-top">
                      {b.headers.map((_, cIdx) => (
                        <td
                          key={cIdx}
                          className="border-b border-slate-100 px-4 py-3 text-sm font-medium leading-6 text-textBody md:px-5 md:py-4 md:text-[15px]"
                        >
                          {row[cIdx] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return (
          <p
            key={idx}
            className="text-base font-medium leading-8 text-textBody md:text-[18px]"
          >
            {inlineText(b.text)}
          </p>
        );
      })}
    </div>
  );
}
