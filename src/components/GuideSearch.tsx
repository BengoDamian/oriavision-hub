"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import GuideCover from "./GuideCover";
import { matchesGuideSearch } from "@/lib/guide-search";

export type SearchGuide = {
  id: string; title: string; description: string; category: string; featured?: boolean;
  image?: string; imageSmall?: string; imageAlt?: string; searchText: string;
};

export default function GuideSearch({ guides }: { guides: SearchGuide[] }) {
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => setReady(true), []);
  const results = guides.filter(guide => matchesGuideSearch(guide.searchText, query));
  const clear = () => { setQuery(""); input.current?.focus(); };

  return <>
    <div className="guide-search" role="search" aria-label="Buscar guías">
      <label htmlFor="guide-search">Buscá un tema para tu negocio</label>
      <div className="guide-search-field">
        <Search size={20} aria-hidden="true" />
        <input ref={input} id="guide-search" type="search" value={query} disabled={!ready}
          onChange={event => setQuery(event.target.value)} placeholder="Por ejemplo: página web o reseñas"
          aria-controls="guide-results" aria-describedby="guide-results-count" autoComplete="off" />
        {query && <button type="button" onClick={clear} aria-label="Limpiar búsqueda"><X size={20} aria-hidden="true" /></button>}
      </div>
      <p id="guide-results-count" role="status" aria-live="polite" aria-atomic="true">
        {results.length} {results.length === 1 ? "guía" : "guías"}{query.trim() ? " para tu búsqueda" : " para explorar"}
      </p>
      <noscript><p>Para buscar, activá JavaScript. Podés leer todas las guías a continuación.</p></noscript>
    </div>
    <div id="guide-results" className="guides-grid">
      {results.map((guide, index) => <article key={guide.id} className={`guide-card${guide.featured ? " guide-card-featured" : ""}`}>
        <GuideCover {...guide} priority={index === 0} />
        <div className="guide-card-meta"><span className="guides-category">{guide.category}</span>
          {guide.featured && <span className="guide-featured-label">Guía destacada</span>}</div>
        <h2><a href={`/guias/${guide.id}/`}>{guide.title}</a></h2>
        <p>{guide.description}</p>
        <a className="guides-text-link" href={`/guias/${guide.id}/`} aria-label={`Leer guía: ${guide.title}`}>
          Leer guía <ArrowRight size={18} aria-hidden="true" />
        </a>
      </article>)}
    </div>
    {results.length === 0 && <div className="guide-search-empty">
      <h2>No encontramos guías con esa búsqueda</h2>
      <p>Probá con un tema más general, como «web», «Google» o «reseñas».</p>
      <button className="guides-text-link" type="button" onClick={clear}>Ver todas las guías</button>
    </div>}
  </>;
}
