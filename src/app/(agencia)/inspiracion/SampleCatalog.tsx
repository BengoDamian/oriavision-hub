"use client";

import { useEffect, useState } from "react";
import { RUBROS, SAMPLES } from "../samples";
import { waLink } from "../shared";

type Filter = "todos" | (typeof RUBROS)[number]["id"];
type Sample = (typeof SAMPLES)[number];

const KNOWN = ["todos", ...RUBROS.map((rubro) => rubro.id)];
const NAIL_SAMPLES = SAMPLES.filter((sample) => sample.rubro === "unas");
const BARBER_SAMPLES = SAMPLES.filter((sample) => sample.rubro === "barberias");
const SINGLE_SAMPLES = SAMPLES.filter(
  (sample) => sample.rubro === "cafeterias" || sample.rubro === "bienestar",
);

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
  title,
  eyebrow,
  samples,
}: {
  title: string;
  eyebrow: string;
  samples: Sample[];
}) {
  const [selectedHref, setSelectedHref] = useState(samples[0].href);
  const selected =
    samples.find((sample) => sample.href === selectedHref) ?? samples[0];

  return (
    <article className="demo-card demo-card-palette">
      <div className="palette-layout">
        <div
          className="demo-preview palette-preview"
          aria-label={"Vista previa de " + selected.contactName}
          aria-live="polite"
        >
          {samples.map((sample) => {
            const active = sample.href === selected.href;
            return (
              <img
                src={sample.preview}
                alt={
                  active
                    ? sample.previewAlt ?? "Vista previa de " + sample.title
                    : ""
                }
                aria-hidden={!active}
                className={active ? "is-active" : ""}
                key={sample.href}
              />
            );
          })}
        </div>

        <div className="palette-copy">
          <div className="demo-card-top palette-card-top">
            <span>{eyebrow}</span>
            <div className="swatches" aria-hidden="true">
              {selected.swatches.map((color) => (
                <span style={{ background: color }} key={color} />
              ))}
            </div>
          </div>

          <span className="demo-status is-public">
            Disponible para explorar
          </span>
          <h2>{selected.title}</h2>
          <p className="palette-description">{selected.text}</p>

          <fieldset className="palette-selector">
            <legend>{title} · Elegí una paleta</legend>
            <div className="palette-options">
              {samples.map((sample) => {
                const active = sample.href === selected.href;
                const variant =
                  sample.title.split(" · ")[1] ?? sample.title;
                return (
                  <button
                    type="button"
                    className={
                      "palette-option" + (active ? " is-active" : "")
                    }
                    aria-pressed={active}
                    onClick={() => setSelectedHref(sample.href)}
                    key={sample.href}
                  >
                    <VariantSwatches sample={sample} />
                    <span className="palette-option-name">{variant}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="demo-card-actions palette-actions">
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
            <a
              className="btn btn-contact"
              href={waLink(
                "Hola, ORIAVISION. Me interesa el diseño " +
                  selected.contactName +
                  " para mi negocio. Lo vi acá: " +
                  selected.href,
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
        </div>
      </div>
    </article>
  );
}

function SampleCard({ sample, number }: { sample: Sample; number: number }) {
  return (
    <article className="demo-card" data-rubro={sample.rubro}>
      {sample.preview ? (
        <div className="demo-preview">
          <img
            src={sample.preview}
            alt={
              sample.previewAlt ?? "Vista previa de " + sample.title
            }
          />
        </div>
      ) : (
        <div
          className="demo-preview demo-preview-pending"
          aria-label="Vista previa pendiente de publicación"
        >
          <div className="demo-preview-mark" aria-hidden="true">
            {sample.title.split(" · ")[1]?.slice(0, 1) ??
              sample.title.slice(0, 1)}
          </div>
          <span>Vista previa disponible al publicar la demo</span>
        </div>
      )}
      <div className="demo-card-top">
        <span>DISEÑO {String(number).padStart(2, "0")}</span>
        <div className="swatches" aria-hidden="true">
          {sample.swatches.map((color) => (
            <span style={{ background: color }} key={color} />
          ))}
        </div>
      </div>
      <span
        className={
          "demo-status " + (sample.public ? "is-public" : "is-pending")
        }
      >
        {sample.public ? "Disponible para explorar" : "Publicación pendiente"}
      </span>
      <h2>{sample.title}</h2>
      <p>{sample.text}</p>
      <div className="demo-card-actions">
        {sample.public ? (
          <a
            className="btn btn-dark edge-light"
            href={sample.href}
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
          href={waLink(
            "Hola, ORIAVISION. Me interesa el diseño " +
              sample.contactName +
              " para mi negocio. Lo vi acá: " +
              sample.href,
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
  const showNails = filter === "todos" || filter === "unas";
  const showBarbers = filter === "todos" || filter === "barberias";
  const visibleSingles = SINGLE_SAMPLES.filter(
    (sample) => filter === "todos" || sample.rubro === filter,
  );

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
        {showNails && (
          <PaletteBlock
            title="Art Nails"
            eyebrow="COLECCIÓN 01 · 4 VARIANTES"
            samples={NAIL_SAMPLES}
          />
        )}
        {showBarbers && (
          <PaletteBlock
            title="Barberías y peluquerías"
            eyebrow="COLECCIÓN 02 · 4 VARIANTES"
            samples={BARBER_SAMPLES}
          />
        )}
        {visibleSingles.map((sample) => (
          <SampleCard
            sample={sample}
            number={SAMPLES.indexOf(sample) + 1}
            key={sample.href}
          />
        ))}
      </div>
    </>
  );
}
