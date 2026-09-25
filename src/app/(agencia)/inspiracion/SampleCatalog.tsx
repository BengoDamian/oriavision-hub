"use client";

import { useEffect, useState } from "react";
import { RUBROS, SAMPLES } from "../samples";
import { waLink } from "../shared";

type Filter = "todos" | (typeof RUBROS)[number]["id"];
const KNOWN = ["todos", ...RUBROS.map((r) => r.id)];

/** Catálogo de muestras con filtro por rubro. Lee y actualiza ?rubro= como la referencia. */
export default function SampleCatalog() {
  const [filter, setFilter] = useState<Filter>("todos");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("rubro") ?? "todos";
    setFilter((KNOWN.includes(value) ? value : "todos") as Filter);
  }, []);

  const change = (value: Filter) => {
    setFilter(value);
    const url = new URL(window.location.href);
    if (value === "todos") url.searchParams.delete("rubro");
    else url.searchParams.set("rubro", value);
    window.history.replaceState(null, "", url);
  };

  const visible = SAMPLES.filter((s) => filter === "todos" || s.rubro === filter);

  return (
    <>
      <div className="catalog-toolbar">
        <div>
          <label htmlFor="rubro-filter">Filtrar por rubro</label>
          <select id="rubro-filter" value={filter} onChange={(e) => change(e.target.value as Filter)}>
            <option value="todos">Todos los rubros</option>
            {RUBROS.map((r) => (
              <option value={r.id} key={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <p id="catalog-status" role="status">
          {visible.length === 1 ? "1 diseño en el catálogo" : `${visible.length} diseños en el catálogo`}
        </p>
      </div>
      <div className="demo-grid">
        {SAMPLES.map((s, i) => (
          <article className="demo-card" data-rubro={s.rubro} hidden={!visible.includes(s)} key={s.href}>
            {s.preview ? (
              <div className="demo-preview">
                <img src={s.preview} alt={s.previewAlt ?? `Vista previa de ${s.title}`} />
              </div>
            ) : (
              <div className="demo-preview demo-preview-pending" aria-label="Vista previa pendiente de publicación">
                <div className="demo-preview-mark" aria-hidden="true">
                  {s.title.split(" · ")[1]?.slice(0, 1) ?? s.title.slice(0, 1)}
                </div>
                <span>Vista previa disponible al publicar la demo</span>
              </div>
            )}
            <div className="demo-card-top">
              <span>DISEÑO {String(i + 1).padStart(2, "0")}</span>
              <div className="swatches" aria-hidden="true">
                {s.swatches.map((c) => (
                  <span style={{ background: c }} key={c} />
                ))}
              </div>
            </div>
            <span className={`demo-status ${s.public ? "is-public" : "is-pending"}`}>
              {s.public ? "Disponible para explorar" : "Publicación pendiente"}
            </span>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
            <div className="demo-card-actions">
              {s.public ? (
                <a className="btn btn-dark edge-light" href={s.href} target="_blank" rel="noopener noreferrer">
                  <span>Explorar diseño</span>
                  <svg aria-hidden="true">
                    <use href="#external" />
                  </svg>
                </a>
              ) : (
                <span className="btn btn-disabled" aria-disabled="true" title="La demo todavía requiere publicación pública">
                  <span>Exploración pendiente</span>
                </span>
              )}
              <a
                className="btn btn-contact"
                href={waLink(
                  `Hola, ORIAVISION. Me interesa el diseño ${s.contactName} para mi negocio. Lo vi acá: ${s.href}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Quiero este diseño</span>
                <svg aria-hidden="true">
                  <use href="#arrow" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
