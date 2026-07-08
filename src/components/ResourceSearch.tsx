"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

export type ResourceSearchItem = {
  type?: "Prompt" | "Guía" | "Herramienta" | "Servicio" | string;
  title: string;
  description?: string;
  category?: string;
  href: string;
  external?: boolean;
};

type ResourceSearchProps = {
  items: ResourceSearchItem[];
  variant?: "light" | "hero";
  placeholder?: string;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreItem(item: ResourceSearchItem, query: string) {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(item.title);
  const description = normalize(item.description || "");
  const category = normalize(item.category || "");
  const type = normalize(item.type || "");
  const full = `${title} ${description} ${category} ${type}`;

  let score = 0;

  if (title === q) score += 300;
  if (title.startsWith(q)) score += 180;
  if (title.includes(q)) score += 120;
  if (category.includes(q)) score += 55;
  if (type.includes(q)) score += 45;
  if (description.includes(q)) score += 25;

  for (const token of q.split(" ").filter(Boolean)) {
    if (title.includes(token)) score += 45;
    else if (full.includes(token)) score += 18;
  }

  return score;
}

export default function ResourceSearch({
  items,
  variant = "light",
  placeholder = "Buscá por título, tema o categoría...",
}: ResourceSearchProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const isHero = variant === "hero";
  const cleanQuery = query.trim();

  const results = useMemo(() => {
    if (cleanQuery.length < 2) return [];

    return items
      .map((item) => ({
        item,
        score: scoreItem(item, cleanQuery),
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((entry) => entry.item);
  }, [items, cleanQuery]);

  const showDropdown = focused && cleanQuery.length >= 2;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!results.length) return;

    const first = results[0];

    if (first.external) {
      window.open(first.href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = first.href;
  }

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className={
          isHero
            ? "flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-brand-200 focus-within:shadow-md"
            : "flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-brand-200 focus-within:shadow-md"
        }
      >
        <Search
          className={
            isHero
              ? "h-5 w-5 shrink-0 text-brand-700"
              : "h-5 w-5 shrink-0 text-brand-700"
          }
        />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            window.setTimeout(() => setFocused(false), 140);
          }}
          placeholder={placeholder}
          className={
            isHero
              ? "min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
              : "min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
          }
        />

        <button
          type="submit"
          aria-label="Buscar"
          className={
            isHero
              ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-brand-700 transition hover:bg-brand-50"
              : "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-brand-700 transition hover:bg-brand-50"
          }
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {showDropdown ? (
        <div
          className={
            isHero
              ? "absolute left-0 right-0 top-[calc(100%+10px)] z-[9999] max-h-[70vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/40"
              : "absolute left-0 right-0 top-[calc(100%+10px)] z-[9999] max-h-[70vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/40"
          }
        >
          {results.length ? (
            <div className="grid gap-1">
              {results.map((item) => (
                <Link
                  key={`${item.href}-${item.title}`}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className={
                    isHero
                      ? "group rounded-xl px-4 py-3 transition hover:bg-slate-50"
                      : "group rounded-xl px-4 py-3 transition hover:bg-slate-50"
                  }
                >
                  <div
                    className={
                      isHero
                        ? "text-[10px] font-black uppercase tracking-[0.18em] text-brand-700"
                        : "text-[10px] font-black uppercase tracking-[0.18em] text-brand-700"
                    }
                  >
                    {[item.type, item.category].filter(Boolean).join(" · ")}
                  </div>

                  <div
                    className={
                      isHero
                        ? "mt-1 text-sm font-black leading-tight text-slate-950"
                        : "mt-1 text-sm font-black leading-tight text-slate-950"
                    }
                  >
                    {item.title}
                  </div>

                  {item.description ? (
                    <p
                      className={
                        isHero
                          ? "mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-slate-600"
                          : "mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-slate-600"
                      }
                    >
                      {item.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          ) : (
            <div
              className={
                isHero
                  ? "rounded-xl px-4 py-3 text-sm font-bold text-slate-600"
                  : "rounded-xl px-4 py-3 text-sm font-bold text-slate-600"
              }
            >
              No encontré resultados para esa búsqueda.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}