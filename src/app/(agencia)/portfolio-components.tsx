"use client";

import { Fragment, useEffect, useState } from "react";
import { RUBROS } from "./samples";
import { CatalogStack } from "./catalog-stack";
import { designInquiry } from "./contact-links";
import { completedWorks, type ProjectCollection } from "./catalog-data";
import { projectCollections } from "./project-collections";

export function CatalogIntro({ kind }: { kind: "works" | "projects" }) {
  const works = kind === "works";
  return <section className="catalog-hero"><div className="container">
    <a className="catalog-back" href="/">Volver al inicio</a>
    <p className="eyebrow">{works ? "Diseño y desarrollo en funcionamiento" : "Diseños de muestra por actividad"}</p>
    <h1>{works ? "Trabajos realizados." : "Diseños para tu web."}</h1>
    <p className="catalog-description">{works ? "Sitios, landing pages y herramientas que ya podés visitar. Cada trabajo responde a una propuesta y a una necesidad concreta." : "Son modelos de muestra, no trabajos de clientes. Elegí una actividad, probá sus paletas y recorré el diseño. Podemos adaptarlo a tu identidad, tu contenido y las funciones que necesites."}</p>
    <nav className="catalog-navigation" aria-label="Catálogos"><a href="/trabajos-realizados" aria-current={works ? "page" : undefined}>Trabajos realizados</a><a href="/proyectos" aria-current={!works ? "page" : undefined}>Diseños para tu web</a></nav>
  </div></section>;
}

function PaletteDots({ colors }: { colors: [string, string, string] }) {
  return <span className="palette-dots" aria-hidden="true">{[colors[1], colors[2], colors[0]].map((color, index) => <span key={index} style={{ backgroundColor: color }} />)}</span>;
}

function CatalogActions({ title, href, completed = false }: { title: string; href: string; completed?: boolean }) {
  return <div className="catalog-actions">
    <a className="button button-outline" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${completed ? "Ver sitio" : "Ver diseño"}: ${title}, abre en otra pestaña`}><span className="button-label">{completed ? "Ver sitio" : "Ver diseño"}<span aria-hidden="true">↗</span></span></a>
    <a className="button button-light" href={designInquiry(title, href)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar por WhatsApp por un sitio como ${title}, abre en otra pestaña`}><span className="button-label">Quiero uno así<span aria-hidden="true">→</span></span></a>
  </div>;
}

export function CompletedCatalog() {
  return <CatalogStack label="Todos los trabajos realizados">{completedWorks.map((item, index) => <Fragment key={item.title}>
    <div className="stack-anchor" aria-hidden="true" />
    <article className="stack-card" style={{ zIndex: index + 1 }} aria-labelledby={`work-${index}`}>
      <div className="stack-panel stack-panel-work">
        <a className="stack-media" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Visitar ${item.title}, abre en otra pestaña`}><img src={item.image} alt={`Captura de la página ${item.title}`} width="1333" height="926" loading="lazy" decoding="async" /></a>
        <div className="stack-copy"><p className="stack-category">{item.type}</p><span className="catalog-status">Trabajo realizado</span><h2 id={`work-${index}`}>{item.title}</h2><p className="stack-description">{item.description}</p>
          <CatalogActions title={item.title} href={item.href} completed />
        </div>
      </div>
    </article>
  </Fragment>)}</CatalogStack>;
}

function ProjectRow({ collection, index }: { collection: ProjectCollection; index: number }) {
  const [variantName, setVariantName] = useState(collection.initialVariant || collection.variants[0].name);
  const variant = collection.variants.find(v => v.name === variantName)!;
  return <>
    <div className="stack-anchor" aria-hidden="true" />
    <article className="stack-card" style={{ zIndex: index + 1 }} aria-labelledby={`project-${collection.id}`}>
      <div className="stack-panel">
        <a className="stack-media" href={variant.href} target="_blank" rel="noopener noreferrer" aria-label={`Explorar ${collection.title}, variante ${variant.name}, abre en otra pestaña`}><img src={variant.image} alt={`Captura de ${collection.title}, variante ${variant.name}`} width="1440" height="960" loading="lazy" /></a>
        <div className="stack-copy">
          <div className="stack-meta"><p className="stack-category">Colección {String(index + 1).padStart(2, "0")} · {collection.variants.length} variantes</p><PaletteDots colors={variant.colors} /></div>
          <h2 id={`project-${collection.id}`} aria-live="polite">{collection.title} · {variant.name}</h2>
          <div className="palette-picker">
            <p className="palette-heading">{collection.title} · Elegí una paleta</p>
            <fieldset className="palette-grid" aria-label={`Paletas de ${collection.title}`}>
              {collection.variants.map(v => <label className="palette-choice" data-state={variantName === v.name ? "checked" : "unchecked"} key={v.name}><input className="sr-only" type="radio" name={`palette-${collection.id}`} value={v.name} checked={variantName === v.name} onChange={() => setVariantName(v.name)} aria-label={v.name} /><PaletteDots colors={v.colors} /><span className="palette-name">{v.name}</span></label>)}
            </fieldset>
          </div>
          <CatalogActions title={`${collection.title} · ${variant.name}`} href={variant.href} />
        </div>
      </div>
    </article>
  </>;
}

export function ProjectsCatalog() {
  const [filter, setFilter] = useState("todos");
  const rubroByCollection: Record<string, string> = { "clinica-veterinaria": "veterinarias", "estudio-juridico": "abogados", "art-nails": "unas", barberias: "barberias", "buen-rato": "cafeterias", aluna: "bienestar", "ink-house": "tatuajes", "habitacion-antipanico": "arquitectura", watorii: "parrillas-herreria" };
  useEffect(() => {
    const sync = () => {
      const value = new URLSearchParams(window.location.search).get("rubro");
      setFilter(RUBROS.some(rubro => rubro.id === value) ? value! : "todos");
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const collections = projectCollections.filter(collection => filter === "todos" || rubroByCollection[collection.id] === filter);
  const change = (value: string) => {
    setFilter(value);
    const url = new URL(window.location.href);
    if (value === "todos") url.searchParams.delete("rubro"); else url.searchParams.set("rubro", value);
    if (url.href !== window.location.href) window.history.pushState(null, "", url);
  };
  return <section className="projects-catalog" aria-label="Todos los diseños de muestra">
    <div className="container catalog-toolbar"><div><label htmlFor="rubro-filter">Elegí una actividad</label><select id="rubro-filter" value={filter} onChange={event => change(event.target.value)}><option value="todos">Todas las actividades</option>{RUBROS.map(rubro => <option key={rubro.id} value={rubro.id}>{rubro.name}</option>)}</select></div><p className="catalog-note" role="status">{collections.length} propuestas por actividad, con {collections.reduce((n, p) => n + p.variants.length, 0)} variantes para explorar.</p></div>
    <CatalogStack key={filter} label="Propuestas por actividad">{collections.map((collection, index) => <ProjectRow key={collection.id} collection={collection} index={index} />)}</CatalogStack>
  </section>;
}
