"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { ArrowRight, Search } from "lucide-react";

export type ResourceSearchItem = {
  type?: "Prompt" | "Guía" | "Herramienta" | "Servicio" | string;
  title: string;
  description?: string;
  category?: string;
  subcategory?: string;
  href: string;
  external?: boolean;
  tags?: string[];
  keywords?: string[];
  synonyms?: string[];
  slug?: string;
  featured?: boolean;
};

type ResourceSearchProps = {
  items: ResourceSearchItem[];
  variant?: "light" | "hero";
  placeholder?: string;
};

// Normaliza el texto: minúsculas, sin acentos, sin signos, trim.
function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// A partir de qué score de Fuse consideramos que una coincidencia es "clara".
// Fuse: 0 = perfecta, 1 = pésima. Por debajo de este valor mostramos resultados normales.
const STRONG_MATCH = 0.32;

export default function ResourceSearch({
  items,
  placeholder = "Buscá por título, tema o categoría...",
}: ResourceSearchProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const cleanQuery = query.trim();

  // Índice de Fuse. Normalizamos cada campo (acentos/minúsculas) vía getFn
  // para que la búsqueda difusa sea insensible a acentos y mayúsculas.
  const fuse = useMemo(() => {
    return new Fuse(items, {
      includeScore: true,
      ignoreLocation: true,
      threshold: 0.42,
      minMatchCharLength: 2,
      ignoreFieldNorm: false,
      keys: [
        { name: "title", weight: 0.4 },
        { name: "keywords", weight: 0.24 },
        { name: "tags", weight: 0.2 },
        { name: "synonyms", weight: 0.16 },
        { name: "category", weight: 0.14 },
        { name: "subcategory", weight: 0.12 },
        { name: "type", weight: 0.08 },
        { name: "description", weight: 0.12 },
        { name: "slug", weight: 0.05 },
      ],
      getFn: (obj, path) => {
        const key = Array.isArray(path) ? path[0] : path;
        const value = (obj as Record<string, unknown>)[key as string];
        if (value == null) return "";
        if (Array.isArray(value)) return value.map((v) => normalize(String(v)));
        return normalize(String(value));
      },
    });
  }, [items]);

  // Búsqueda difusa combinando la frase completa + cada palabra suelta.
  // Nos quedamos con el mejor score (más bajo) por recurso.
  const scored = useMemo(() => {
    const normalized = normalize(cleanQuery);
    if (normalized.length < 2) return [];

    const tokens = normalized.split(" ").filter((t) => t.length >= 2);
    const queries = Array.from(new Set([normalized, ...tokens]));

    const best = new Map<string, { item: ResourceSearchItem; score: number }>();

    for (const q of queries) {
      for (const result of fuse.search(q)) {
        const score = result.score ?? 1;
        const key = `${result.item.href}|${result.item.title}`;
        const prev = best.get(key);
        if (!prev || score < prev.score) {
          best.set(key, { item: result.item, score });
        }
      }
    }

    return Array.from(best.values())
      .sort((a, b) => a.score - b.score)
      .slice(0, 6);
  }, [fuse, cleanQuery]);

  // Recursos recomendados por defecto (fallback cuando la búsqueda no arroja nada).
  // Prioridad: featured -> herramientas activas -> MercadoLibre -> guías -> prompts.
  // Se deduplica por href y se limita a 6.
  const recommendedItems = useMemo(() => {
    const priority = (item: ResourceSearchItem) => {
      if (item.featured) return 0;
      if (item.type === "Herramienta") return 1;
      const haystack = normalize(
        `${item.category ?? ""} ${(item.tags ?? []).join(" ")}`
      );
      if (haystack.includes("mercado libre") || haystack.includes("mercadolibre"))
        return 2;
      if (item.type === "Guía") return 3;
      if (item.type === "Prompt") return 4;
      return 5;
    };

    const ordered = items
      .map((item, index) => ({ item, index }))
      .sort(
        (a, b) =>
          priority(a.item) - priority(b.item) || a.index - b.index
      )
      .map((entry) => entry.item);

    // La Calculadora ML es la herramienta principal del portal:
    // si existe, se fuerza al primer lugar del listado de recomendados.
    const calcIndex = ordered.findIndex(
      (item) => normalize(item.title) === normalize("Calculadora Mercado Libre")
    );
    if (calcIndex > 0) {
      const [calc] = ordered.splice(calcIndex, 1);
      ordered.unshift(calc);
    }

    const seen = new Set<string>();

    return ordered
      .filter((item) => {
        if (seen.has(item.href)) return false;
        seen.add(item.href);
        return true;
      })
      .slice(0, 6);
  }, [items]);

  const hasStrongMatch = scored.some((entry) => entry.score <= STRONG_MATCH);
  // "results" = coincidencias claras | "fuzzy" = solo sugerencias relacionadas
  // "recommended" = sin resultados -> mostramos recursos recomendados (nunca vacío seco)
  const mode: "results" | "fuzzy" | "recommended" = !scored.length
    ? "recommended"
    : hasStrongMatch
      ? "results"
      : "fuzzy";

  const results = scored.map((entry) => entry.item);
  const displayItems = mode === "recommended" ? recommendedItems : results;

  const showDropdown =
    focused && cleanQuery.length >= 2 && displayItems.length > 0;

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
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-brand-200 focus-within:shadow-md"
      >
        <Search className="h-5 w-5 shrink-0 text-brand-700" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            window.setTimeout(() => setFocused(false), 140);
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
        />

        <button
          type="submit"
          aria-label="Buscar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-brand-700 transition hover:bg-brand-50"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {showDropdown ? (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-[9999] max-h-[70vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/40">
          <div className="grid gap-1">
            {mode === "fuzzy" ? (
              <div className="px-4 pt-2 pb-1 text-xs font-bold leading-snug text-slate-500">
                No encontramos una coincidencia exacta, pero estos recursos
                pueden ayudarte.
              </div>
            ) : null}

            {mode === "recommended" ? (
              <div className="px-4 pt-2 pb-1 text-xs font-bold leading-snug text-slate-500">
                Tal vez estos recursos pueden servirte para empezar.
              </div>
            ) : null}

            {displayItems.map((item) => (
                <Link
                  key={`${item.href}-${item.title}`}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="group rounded-xl px-4 py-3 transition hover:bg-slate-50"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-700">
                    {[item.type, item.category].filter(Boolean).join(" · ")}
                  </div>

                  <div className="mt-1 text-sm font-black leading-tight text-slate-950">
                    {item.title}
                  </div>

                  {item.description ? (
                    <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  ) : null}
                </Link>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
