"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RUBROS, SAMPLE_FAMILIES, SAMPLES, type Sample } from "./samples";
import { waLink } from "./shared";

type Filter = "todos" | (typeof RUBROS)[number]["id"];

const KNOWN = ["todos", ...RUBROS.map((rubro) => rubro.id)];

function getFilterFromLocation(): Filter {
  const value =
    new URLSearchParams(window.location.search).get("rubro") ?? "todos";
  return (KNOWN.includes(value) ? value : "todos") as Filter;
}

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
  stackIndex,
}: {
  number: number;
  title: string;
  samples: Sample[];
  stackIndex: number;
}) {
  const [selectedHref, setSelectedHref] = useState(samples[0].href);
  const selected =
    samples.find((sample) => sample.href === selectedHref) ?? samples[0];
  const message =
    `Hola, ORIAVISION. Quiero consultar por una web como ${selected.familyName}, ` +
    `variante ${selected.variant}. Vi este diseño: ${selected.href}`;

  return (
    <article
      className="demo-card demo-card-palette"
      data-rubro={selected.rubro}
      style={
        {
          "--stack-offset": `${stackIndex * 7}px`,
          zIndex: stackIndex + 1,
        } as CSSProperties
      }
    >
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

        <div className="palette-heading">
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
        </div>

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
              <span>Ver diseño</span>
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
              <span>Ver diseño</span>
            </span>
          )}
          <a
            className="btn btn-contact"
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Quiero uno así</span>
            <svg aria-hidden="true">
              <use href="#arrow" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

/** Catálogo de muestras con filtro por rubro y selectores de variantes. */
export default function SampleCatalog() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [stackEnabled, setStackEnabled] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFilter = () => setFilter(getFilterFromLocation());

    syncFilter();
    window.addEventListener("popstate", syncFilter);
    return () => window.removeEventListener("popstate", syncFilter);
  }, []);

  const change = (value: Filter) => {
    setFilter(value);
    const url = new URL(window.location.href);
    if (value === "todos") url.searchParams.delete("rubro");
    else url.searchParams.set("rubro", value);
    if (url.href !== window.location.href) {
      window.history.pushState(null, "", url);
    }
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

  useEffect(() => {
    const grid = gridRef.current;
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!grid || visibleFamilies.length <= 1) {
      setStackEnabled(false);
      return;
    }

    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(".demo-card-palette"),
    );
    const updateStack = () => {
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const stickyTop = Math.ceil(headerHeight + 12);
      const availableHeight = window.innerHeight - stickyTop - 24;
      const cardsFit = cards.every(
        (card, index) => card.getBoundingClientRect().height <= availableHeight - index * 7,
      );

      grid.style.setProperty("--catalog-sticky-top", `${stickyTop}px`);
      setStackEnabled(cardsFit);
    };

    updateStack();
    const observer = new ResizeObserver(updateStack);
    cards.forEach((card) => observer.observe(card));
    if (header) observer.observe(header);
    window.addEventListener("resize", updateStack);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStack);
    };
  }, [filter, visibleFamilies.length]);

  return (
    <>
      <div className="catalog-toolbar">
        <div>
          <label htmlFor="rubro-filter">Elegí un rubro</label>
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

      <div
        className="demo-grid"
        data-stack={stackEnabled ? "true" : "false"}
        ref={gridRef}
      >
        {visibleFamilies.map((family, stackIndex) => (
          <PaletteBlock
            number={family.number}
            title={family.title}
            samples={family.samples}
            stackIndex={stackIndex}
            key={family.id}
          />
        ))}
      </div>
    </>
  );
}
