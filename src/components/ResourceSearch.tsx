"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, FileText, Search } from "lucide-react";

export type ResourceSearchItem = {
  type: "Prompt" | "Guía";
  title: string;
  description: string;
  category: string;
  href: string;
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreItem(item: ResourceSearchItem, rawQuery: string) {
  const query = normalizeText(rawQuery);
  if (!query) return 0;

  const title = normalizeText(item.title);
  const category = normalizeText(item.category);
  const description = normalizeText(item.description);
  const fullText = `${title} ${category} ${description}`;

  let score = 0;

  if (title === query) score += 500;
  if (title.startsWith(query)) score += 250;
  if (title.includes(query)) score += 140;
  if (category.includes(query)) score += 40;
  if (description.includes(query)) score += 20;

  const tokens = query.split(" ").filter(Boolean);
  let matchedTokens = 0;

  for (const token of tokens) {
    if (title.includes(token)) {
      score += 70;
      matchedTokens += 1;
      continue;
    }

    if (fullText.includes(token)) {
      score += 25;
      matchedTokens += 1;
      continue;
    }

    const words = fullText.split(" ");
    const startsWithMatch = words.some((word) => word.startsWith(token));
    if (startsWithMatch) {
      score += 18;
      matchedTokens += 1;
    }
  }

  if (tokens.length > 1 && matchedTokens === tokens.length) {
    score += 80;
  }

  return score;
}

export default function ResourceSearch({
  items,
}: {
  items: ResourceSearchItem[];
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return [];

    return items
      .map((item) => ({
        item,
        score: scoreItem(item, cleanQuery),
      }))
      .filter((entry) => entry.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score || a.item.title.localeCompare(b.item.title, "es")
      )
      .slice(0, 8);
  }, [items, query]);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-3 flex items-center gap-2">
        <Search className="h-4 w-4 text-brand-600" />
        <span className="text-sm font-extrabold uppercase tracking-wide text-brand-700">
          Buscar recursos
        </span>
      </div>

      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscá por título, tema o categoría..."
          className="w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 pr-12 text-slate-900 font-semibold outline-none focus:border-brand-600"
        />
        <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      </div>

      {!query.trim() ? (
        <p className="mt-4 text-sm font-medium text-slate-500">
          Ejemplos: tienda oficial, logística, reclamos, promociones, ML
        </p>
      ) : results.length > 0 ? (
        <div className="mt-4 space-y-3">
          {results.map(({ item }) => (
            <Link
              key={`${item.type}-${item.href}`}
              href={item.href}
              className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                {item.type === "Prompt" ? (
                  <FileText className="h-4 w-4 text-brand-600" />
                ) : (
                  <BookOpen className="h-4 w-4 text-brand-600" />
                )}

                <span className="rounded-full border border-blue-100 bg-white px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-brand-700">
                  {item.type}
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  {item.category}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-black text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm font-medium leading-relaxed text-textBody">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm font-medium text-slate-500">
          No encontré resultados para “{query}”.
        </p>
      )}
    </div>
  );
}