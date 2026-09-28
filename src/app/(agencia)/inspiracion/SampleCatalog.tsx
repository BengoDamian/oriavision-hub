"use client";

import { useEffect, useState } from "react";
import { RUBROS, SAMPLE_FAMILIES, SAMPLES, type Sample } from "../samples";
import { waLink } from "../shared";

type Filter = "todos" | (typeof RUBROS)[number]["id"];

const KNOWN = ["todos", ...RUBROS.map((rubro) => rubro.id)];

function VariantSwatches({ sample }: { sample: Sample }) {
  return (
    <span className="palette-option-swatches" aria-hidden="true">
      {sample.swatches.map((color) => (
        <span style={{ background: color }} key={color} />
      ))}
    </span>
  );
}

function PaletteBlock({
  number,
  title,
  samples,
}: {
  number: number;
  title: string;
  samples: Sample[];
}) {
  const [selectedHref, setSelectedHref] = useState(samples[0].href);
  const selected =
    samples.find((sample) => sample.href === selectedHref) ?? samples[0];
  const message =
    `Hola, ORIAVISION. Quiero consultar por una web como ${selected.familyName}, ` +
    `variante ${selected.variant}. Vi este diseño: ${selected.href}`;

  return (
    <article className="demo-card demo-card-palette" data-rubro={selected.rubro}>
      <div className="palette-layout">
        <div
          className="demo-preview palette-preview"
          aria-label={"Vista previa de " + selected.title}
          aria-live="polite"
        >
          {samples.map((sample) => {
            const active = sample.href === selected.href;
            return (
              <img
                src={sample.preview}
                alt={active ? sample.previewAlt : ""}
                aria-hidden={!active}
                className={active ? "is-active" : ""}
                key={sample.href}
              />
            );
          })}
        </div>

        <div className="palette-copy">
          <div className="demo-card-top palette-card-top">
            <span>
              COLECCIÓN {String(number).padStart(2, "0")} · {samples.length} VARIANTES
            </span>
            <div className="swatches" aria-hidden="true">
              {selected.swatches.map((color) => (
                <span style={{ background: color }} key={color} />
              ))}
            </div>
          </div>

          <span
            className={
              "demo-status " + (selected.public ? "is-public" : "is-pending")
            }
          >
            {selected.public ? "Disponible para explorar" : "Publicación pendiente"}
          </span>
          <h2>{selected.title}</h2>
          <p className="palette-description">{selected.text}</p>

          <fieldset className="palette-selector">
            <legend>{title} · Elegí una paleta</legend>
            <div className="palette-options">
              {samples.map((sample) => {
                const active = sample.href === selected.href;
                return (
                  <button
                    type="button"
                    className={
                      "palette-option" +
                      (active ? " is-active" : "") +
                      (!sample.public ? " is-pending" : "")
                    }
                    aria-label={
                      sample.variant +
                      (sample.public ? "" : " · publicación pendiente")
                    }
                    aria-pressed={active}
                    onClick={() => setSelectedHref(sample.href)}
                    key={sample.href}
                  >
                    <VariantSwatches sample={sample} />
                    <span className="palette-option-name">{sample.variant}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="demo-card-actions palette-actions">
            {selected.public ? (
              <a
                className="btn btn-dark edge-light"
                href={selected.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Explorar diseño</span>
                <svg aria-hidden="true">
                  <use href="#external" />
                </svg>
              </a>
            ) : (
              <span
                className="btn btn-disabled"
                aria-disabled="true"
                title="La demo todavía requiere publicación pública"
              >
                <span>Exploración pendiente</span>
              </span>
            )}
            <a
              className="btn btn-contact"
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Quiero este diseño</span>
              <svg aria-hidden="true">
                <use href="#arrow" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Catálogo de muestras con filtro por rubro y selectores de variantes. */
export default function SampleCatalog() {
  const [filter, setFilter] = useState<Filter>("todos");

  useEffect(() => {
    const value =
      new URLSearchParams(window.location.search).get("rubro") ?? "todos";
    setFilter((KNOWN.includes(value) ? value : "todos") as Filter);
  }, []);

  const change = (value: Filter) => {
    setFilter(value);
    const url = new URL(window.location.href);
    if (value === "todos") url.searchParams.delete("rubro");
    else url.searchParams.set("rubro", value);
    window.history.replaceState(null, "", url);
  };

  const visible = SAMPLES.filter(
    (sample) => filter === "todos" || sample.rubro === filter,
  );
  const visibleFamilies = SAMPLE_FAMILIES.map((family, index) => ({
    ...family,
    number: index + 1,
    samples: SAMPLES.filter(
      (sample) =>
        sample.familyId === family.id &&
        (filter === "todos" || sample.rubro === filter),
    ),
  })).filter((family) => family.samples.length > 0);

  return (
    <>
      <div className="catalog-toolbar">
        <div>
          <label htmlFor="rubro-filter">Filtrar por rubro</label>
          <select
            id="rubro-filter"
            value={filter}
            onChange={(event) => change(event.target.value as Filter)}
          >
            <option value="todos">Todos los rubros</option>
            {RUBROS.map((rubro) => (
              <option value={rubro.id} key={rubro.id}>
                {rubro.name}
              </option>
            ))}
          </select>
        </div>
        <p id="catalog-status" role="status">
          {visible.length === 1
            ? "1 diseño en el catálogo"
            : visible.length + " diseños en el catálogo"}
        </p>
      </div>

      <div className="demo-grid">
        {visibleFamilies.map((family) => (
          <PaletteBlock
            number={family.number}
            title={family.title}
            samples={family.samples}
            key={family.id}
          />
        ))}
      </div>
    </>
  );
}
