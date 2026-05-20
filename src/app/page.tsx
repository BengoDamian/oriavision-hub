import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Calculator,
  CheckCircle2,
  Database,
  FileText,
  Globe2,
  LayoutTemplate,
  MessageCircle,
  MonitorSmartphone,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";
import TrackLink from "@/components/TrackLink";
import ResourceSearch from "@/components/ResourceSearch";
import { getAllPromptsMerged, getAllGuidesMerged } from "@/lib/content";

const SITE_URL = "https://www.oriavision.com.ar";
const CALC_URL = "https://calculadoraml.oriavision.com.ar";
const ORIENTADOR_URL = "https://www.orientadordepreciosml.oriavision.com.ar/";

export const metadata: Metadata = {
  title: "Oriavision | Soluciones digitales para vender mejor online",
  description:
    "Herramientas para MercadoLibre, recursos gratuitos y desarrollo de páginas web profesionales para negocios que quieren vender mejor online.",
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: "Oriavision | Soluciones digitales para vender mejor online",
    description:
      "Herramientas, recursos y páginas web pensadas desde la experiencia real de venta online.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Oriavision",
      },
    ],
  },
  twitter: {
    title: "Oriavision | Soluciones digitales para vender mejor online",
    description:
      "Herramientas, recursos y páginas web pensadas desde la experiencia real de venta online.",
    images: ["/og/home.png"],
  },
};

const TEAM = [
  {
    name: "Edgardo A. Díaz",
    role: "E-commerce & MercadoLibre",
    bio: "18 años vendiendo online. Oriavision nace de problemas reales: precios, procesos, páginas y decisiones comerciales.",
    img: "/team/persona-1.jpg",
  },
  {
    name: "Analía L. Rodriguez",
    role: "Operaciones & Customer Success",
    bio: "Procesos simples, seguimiento claro y soporte humano para que cada solución se pueda usar sin fricción.",
    img: "/team/persona-2.jpg",
  },
  {
    name: "Damián E. Bengochea",
    role: "Desarrollo & Producto",
    bio: "Convierte ideas en herramientas rápidas, estables y fáciles de mantener, desde landings hasta sistemas con lógica propia.",
    img: "/team/persona-3.jpg",
  },
];

const STATS = [
  { value: "18+", label: "años vendiendo online" },
  { value: "3", label: "tiendas MercadoLibre" },
  { value: "100%", label: "experiencia real" },
];

const HOME_BLOCKS = [
  {
    icon: Calculator,
    title: "Herramientas ML",
    text: "Calculadoras, orientadores y soluciones prácticas para decidir precios y operar con más claridad.",
    href: "#herramientas",
    label: "Ver herramientas",
    img: "/web-visuals/mockup-slide-system.png",
  },
  {
    icon: LayoutTemplate,
    title: "Desarrollo web",
    text: "Landing pages, sistemas simples, branding visual y páginas profesionales para convertir mejor.",
    href: "#servicios",
    label: "Ver servicios",
    img: "/web-exact/web-exact-04.jpg",
  },
];

const SHOWCASE_VISUALS = [
  {
    title: "Siempre de Guardia",
    caption: "Proyecto web real",
    img: "/portfolio/siempredeguardia.png",
    large: true,
  },
  {
    title: "Calculadora ML",
    caption: "Herramienta propia",
    img: "/portfolio/calculadora-webapp.png",
  },
  {
    title: "Quirvo",
    caption: "Producto digital",
    img: "/portfolio/quirvo.png",
  },
];

const SERVICES = [
  {
    icon: LayoutTemplate,
    title: "Landing pages",
    text: "Una página enfocada en una oferta concreta: presentar, explicar, captar leads y llevar a WhatsApp o formulario.",
  },
  {
    icon: Globe2,
    title: "Webs profesionales",
    text: "Sitios claros, modernos y rápidos para negocios que necesitan una carta de presentación sólida y confiable.",
  },
  {
    icon: Database,
    title: "Sistemas web simples",
    text: "Soluciones con formularios, login, paneles, base de datos o automatizaciones cuando una web común queda corta.",
  },
];

const PORTFOLIO = [
  {
    title: "Siempre de Guardia",
    tag: "Servicios locales",
    text: "Rediseño orientado a claridad, confianza y captación por especialidad.",
    img: "/portfolio/siempredeguardia.png",
    href: "https://siempredeguardia.com.ar",
  },
  {
    title: "Quirvo",
    tag: "Producto digital",
    text: "Landing para explicar un sistema QR de acceso simple, moderno y sin fricción.",
    img: "/portfolio/quirvo.png",
    href: "https://quirvo.com.ar",
  },
  {
    title: "Calculadora ML",
    tag: "Herramienta SaaS",
    text: "Producto propio para estimar precios de MercadoLibre contemplando costos reales.",
    img: "/portfolio/calculadora-landing.png",
    href: "https://calculadoraml.oriavision.com.ar",
  },
];

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Oriavision",
  url: SITE_URL,
  description:
    "Herramientas para MercadoLibre, recursos gratuitos y páginas web profesionales para vender mejor online.",
  inLanguage: "es-AR",
};

const pageStyles = `
  .ov-home {
    --ov-navy: #0A1F6E;
    --ov-royal: #1456C8;
    --ov-bright: #0091D5;
    --ov-cyan: #1EC8F0;
    --ov-bg: #FFFFFF;
    --ov-off: #F2F8FF;
    --ov-text: #0A1F6E;
    --ov-muted: #5A6E8C;
    --ov-line: #DCE8F6;
    --ov-grad: linear-gradient(120deg, #0A1F6E 0%, #1456C8 52%, #1EC8F0 100%);
    --ov-grad-soft: linear-gradient(135deg, rgba(10,31,110,.08), rgba(30,200,240,.12));
    background: #fff;
    color: var(--ov-text);
    font-family: Nunito, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .ov-home h1,
  .ov-home h2,
  .ov-home h3,
  .ov-home .ov-display {
    font-family: "Exo 2", Inter, ui-sans-serif, system-ui, sans-serif;
    letter-spacing: -.045em;
  }

  .ov-wrap {
    width: min(1160px, calc(100% - 40px));
    margin-inline: auto;
  }

  .ov-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    border: 1px solid rgba(20,86,200,.14);
    background: rgba(255,255,255,.82);
    color: var(--ov-royal);
    border-radius: 999px;
    padding: .68rem 1rem;
    font-size: .72rem;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
    box-shadow: 0 16px 46px rgba(10,31,110,.08), 0 0 12px rgba(30,200,240,.05);
    backdrop-filter: blur(16px);
    transition: all .28s cubic-bezier(0,0,1,1);
  }

  .ov-eyebrow:hover {
    border-color: rgba(30,200,240,.25);
    box-shadow: 0 18px 50px rgba(10,31,110,.1), 0 0 18px rgba(30,200,240,.08);
  }

  .ov-hero {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    padding: 76px 0 64px;
    background:
      radial-gradient(circle at 88% 14%, rgba(30,200,240,.26), transparent 26%),
      radial-gradient(circle at 8% 18%, rgba(20,86,200,.16), transparent 28%),
      linear-gradient(180deg, #FFFFFF 0%, #F2F8FF 100%);
  }

  .ov-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(10,31,110,.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10,31,110,.055) 1px, transparent 1px);
    background-size: 54px 54px;
    mask-image: linear-gradient(to bottom, transparent, black 16%, black 78%, transparent);
  }

  .ov-hero::after {
    content: "";
    position: absolute;
    right: -11rem;
    bottom: -11rem;
    width: 34rem;
    height: 34rem;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(30,200,240,.28), transparent 66%);
    filter: blur(24px);
    animation: ovPulse 8s ease-in-out infinite alternate;
  }

  .ov-hero-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1.02fr .98fr;
    gap: clamp(36px, 5vw, 72px);
    align-items: center;
  }

  .ov-hero h1 {
    margin-top: 1.3rem;
    max-width: 760px;
    color: var(--ov-navy);
    font-size: clamp(3.05rem, 7vw, 6.8rem);
    line-height: .9;
    font-weight: 900;
  }

  .ov-hero-copy {
    margin-top: 1.45rem;
    max-width: 650px;
    color: var(--ov-muted);
    font-size: clamp(1.08rem, 1.8vw, 1.42rem);
    line-height: 1.58;
    font-weight: 700;
  }

  .ov-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2.1rem;
  }

  .ov-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    border-radius: 999px;
    padding: 1rem 1.35rem;
    font-weight: 950;
    transition: transform .22s cubic-bezier(0,0,1,1), box-shadow .22s cubic-bezier(0,0,1,1), background .22s cubic-bezier(0,0,1,1), color .22s cubic-bezier(0,0,1,1);
  }

  .ov-btn-primary {
    color: #fff;
    background: var(--ov-grad);
    box-shadow: 0 18px 44px rgba(20,86,200,.22), 0 0 20px rgba(30,200,240,.08);
    overflow: hidden;
  }

  .ov-btn-primary:hover {
    box-shadow: 0 22px 56px rgba(20,86,200,.28), 0 0 32px rgba(30,200,240,.12);
  }

  .ov-btn-primary::after {
    content: "";
    position: absolute;
    inset: -60%;
    width: 42%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
    transform: translateX(-160%) skewX(-18deg);
    animation: ovShine 5.4s ease-in-out infinite;
  }

  .ov-btn-secondary {
    color: var(--ov-navy);
    background: rgba(255,255,255,.72);
    border: 1px solid rgba(20,86,200,.16);
    box-shadow: 0 16px 44px rgba(10,31,110,.08), 0 0 15px rgba(20,86,200,.04);
    backdrop-filter: blur(12px);
  }

  .ov-btn-secondary:hover {
    box-shadow: 0 18px 50px rgba(10,31,110,.1), 0 0 20px rgba(20,86,200,.08);
    border-color: rgba(30,200,240,.25);
  }

  .ov-btn:hover {
    transform: translateY(-2px);
  }

  .ov-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: .8rem;
    margin-top: 2rem;
    max-width: 640px;
  }

  .ov-stat {
    border: 1px solid rgba(20,86,200,.12);
    background: rgba(255,255,255,.72);
    border-radius: 1.35rem;
    padding: 1rem;
    box-shadow: 0 16px 42px rgba(10,31,110,.07), 0 0 12px rgba(30,200,240,.03);
    backdrop-filter: blur(10px);
    transition: transform .28s cubic-bezier(0,0,1,1), box-shadow .28s cubic-bezier(0,0,1,1), border-color .28s cubic-bezier(0,0,1,1);
  }

  .ov-stat:hover {
    transform: translateY(-3px);
    border-color: rgba(30,200,240,.22);
    box-shadow: 0 20px 56px rgba(10,31,110,.09), 0 0 18px rgba(30,200,240,.06);
  }

  .ov-stat strong {
    display: block;
    font-size: 1.55rem;
    color: var(--ov-navy);
    line-height: 1;
  }

  .ov-stat span {
    display: block;
    margin-top: .35rem;
    color: var(--ov-muted);
    font-size: .72rem;
    text-transform: uppercase;
    letter-spacing: .08em;
    font-weight: 900;
  }

  .ov-search-shell {
    margin-bottom: 1.4rem;
    max-width: 640px;
    border-radius: 1.7rem;
    border: 1px solid rgba(20,86,200,.12);
    background: rgba(255,255,255,.78);
    padding: .8rem;
    box-shadow: 0 20px 55px rgba(10,31,110,.09);
    backdrop-filter: blur(18px);
  }

  .ov-hero-visual {
    position: relative;
    min-height: 560px;
  }

  .ov-mobile-hero-row {
    display: block;
  }

  .ov-mobile-hero-card {
    display: none;
  }

  .ov-hero-glow {
    position: absolute;
    inset: 6% 0 auto 10%;
    height: 420px;
    border-radius: 999px;
    background: linear-gradient(135deg, rgba(20,86,200,.18), rgba(30,200,240,.26));
    filter: blur(36px);
    animation: ovFloat 8s ease-in-out infinite alternate;
  }

  .ov-mockup-stack {
    position: relative;
    height: 100%;
    min-height: 560px;
  }

  .ov-mockup {
    position: absolute;
    overflow: hidden;
    border-radius: 2rem;
    border: 1px solid rgba(255,255,255,.72);
    background: rgba(255,255,255,.78);
    box-shadow: 0 30px 70px rgba(10,31,110,.18);
    backdrop-filter: blur(18px);
  }

  .ov-mockup-main {
    top: 44px;
    right: 16px;
    width: min(100%, 470px);
    padding: 1rem;
    transform: rotate(1.4deg);
  }

  .ov-mockup-small {
    left: 0;
    bottom: 58px;
    width: min(70%, 300px);
    padding: .95rem;
    transform: rotate(-4deg);
    z-index: 2;
  }

  .ov-mockup-card {
    right: 24px;
    bottom: 8px;
    width: min(72%, 330px);
    padding: 1.1rem;
    background: var(--ov-grad);
    color: #fff;
    transform: rotate(3deg);
    z-index: 3;
  }

  .ov-chrome {
    display: flex;
    align-items: center;
    gap: .42rem;
    border-bottom: 1px solid rgba(10,31,110,.08);
    padding-bottom: .8rem;
    margin-bottom: 1rem;
  }

  .ov-dot {
    width: .58rem;
    height: .58rem;
    border-radius: 999px;
    background: rgba(20,86,200,.28);
  }

  .ov-url {
    margin-left: .4rem;
    height: .62rem;
    flex: 1;
    border-radius: 999px;
    background: rgba(10,31,110,.08);
  }

  .ov-panel-screen {
    border-radius: 1.35rem;
    background: linear-gradient(180deg, #fff, #f5faff);
    padding: 1.1rem;
  }

  .ov-panel-line {
    height: .75rem;
    border-radius: 999px;
    background: rgba(20,86,200,.12);
  }

  .ov-panel-line.is-dark {
    background: rgba(10,31,110,.8);
  }

  .ov-panel-box {
    border-radius: 1rem;
    background: var(--ov-grad-soft);
    border: 1px solid rgba(20,86,200,.1);
  }

  .ov-ticker {
    overflow: hidden;
    background: var(--ov-grad);
    color: #fff;
    padding: .85rem 0;
    white-space: nowrap;
  }

  .ov-ticker-track {
    display: inline-flex;
    gap: 2.4rem;
    animation: ovTicker 28s linear infinite;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
    font-size: .82rem;
  }

  .ov-section {
    position: relative;
    padding: 96px 0;
    background: #fff;
  }

  .ov-section-off {
    background:
      radial-gradient(circle at 12% 0%, rgba(30,200,240,.12), transparent 28%),
      #F2F8FF;
  }

  .ov-section-dark {
    overflow: hidden;
    background:
      radial-gradient(circle at 12% 15%, rgba(30,200,240,.18), transparent 30%),
      radial-gradient(circle at 84% 0%, rgba(20,86,200,.28), transparent 34%),
      #071a4f;
    color: #fff;
  }

  .ov-section-dark::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(circle at 52% 30%, black, transparent 74%);
  }

  .ov-section-head {
    max-width: 790px;
    margin: 0 auto 3.2rem;
    text-align: center;
  }

  .ov-section-head.left {
    margin-left: 0;
    text-align: left;
  }

  .ov-section-head h2 {
    margin-top: 1rem;
    color: var(--ov-navy);
    font-size: clamp(2.25rem, 5vw, 4.7rem);
    line-height: .95;
    font-weight: 900;
  }

  .ov-section-dark .ov-section-head h2 {
    color: #fff;
  }

  .ov-section-head p {
    margin-top: 1.15rem;
    color: var(--ov-muted);
    font-size: 1.15rem;
    line-height: 1.68;
    font-weight: 700;
  }

  .ov-section-dark .ov-section-head p {
    color: rgba(226,242,255,.78);
  }

  .ov-card {
    position: relative;
    height: 100%;
    overflow: hidden;
    border-radius: 2rem;
    border: 1px solid rgba(20,86,200,.12);
    background: rgba(255,255,255,.82);
    box-shadow: 0 22px 60px rgba(10,31,110,.08), 0 0 20px rgba(30,200,240,.04);
    transition: transform .28s cubic-bezier(0,0,1,1), box-shadow .28s cubic-bezier(0,0,1,1), border-color .28s cubic-bezier(0,0,1,1);
  }

  .ov-card:hover {
    transform: translateY(-6px);
    border-color: rgba(30,200,240,.4);
    box-shadow: 0 32px 90px rgba(10,31,110,.12), 0 0 32px rgba(30,200,240,.1);
  }

  .ov-card-pad {
    padding: clamp(1.5rem, 3vw, 2.25rem);
  }

  .ov-card-media {
    position: relative;
    height: clamp(190px, 24vw, 275px);
    overflow: hidden;
    border-radius: 1.65rem 1.65rem 0 0;
    background: linear-gradient(135deg, rgba(20,86,200,.12), rgba(30,200,240,.16));
  }

  .ov-card-media::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0) 45%, rgba(255,255,255,.82) 100%);
    pointer-events: none;
  }

  .ov-card-media img,
  .ov-photo-frame img,
  .ov-wide-photo img {
    transition: transform .65s cubic-bezier(0,0,1,1), filter .65s cubic-bezier(0,0,1,1);
  }

  .ov-card:hover .ov-card-media img,
  .ov-mockup:hover .ov-photo-frame img,
  .ov-wide-photo:hover img {
    transform: scale(1.025);
    filter: brightness(1.01) contrast(1.01);
  }

  .ov-photo-frame {
    position: relative;
    overflow: hidden;
    border-radius: 1.35rem;
    background: #eaf3ff;
  }

  .ov-photo-frame-main {
    height: 340px;
  }

  .ov-photo-frame-small {
    height: 185px;
  }

  .ov-wide-photo {
    position: relative;
    min-height: 430px;
    overflow: hidden;
    border-radius: 2rem;
    border: 1px solid rgba(255,255,255,.16);
    box-shadow: 0 34px 90px rgba(0,0,0,.22);
  }

  .ov-wide-photo::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(7,26,79,.12), rgba(30,200,240,.08));
    pointer-events: none;
  }

  .ov-showcase-grid {
    display: grid;
    grid-template-columns: 1.18fr .82fr;
    gap: 1rem;
    margin-top: 1.1rem;
  }

  .ov-showcase-stack {
    display: grid;
    gap: 1rem;
  }

  .ov-showcase-card {
    position: relative;
    overflow: hidden;
    min-height: 230px;
    border-radius: 1.9rem;
    border: 1px solid rgba(20,86,200,.12);
    background: #dfeeff;
    box-shadow: 0 24px 60px rgba(10,31,110,.10), 0 0 20px rgba(30,200,240,.05);
    transition: transform .28s cubic-bezier(0,0,1,1), box-shadow .28s cubic-bezier(0,0,1,1), border-color .28s cubic-bezier(0,0,1,1);
  }

  .ov-showcase-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 32px 80px rgba(10,31,110,.12), 0 0 30px rgba(30,200,240,.08);
    border-color: rgba(30,200,240,.25);
  }

  .ov-showcase-card.is-large {
    min-height: 478px;
  }

  .ov-showcase-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(8,24,88,.84) 100%);
    pointer-events: none;
  }

  .ov-showcase-badge {
    position: absolute;
    left: 1.2rem;
    right: 1.2rem;
    bottom: 1.15rem;
    z-index: 2;
    color: #fff;
  }

  .ov-showcase-badge span {
    display: inline-flex;
    padding: .4rem .7rem;
    border-radius: 999px;
    background: rgba(255,255,255,.16);
    border: 1px solid rgba(255,255,255,.22);
    backdrop-filter: blur(12px);
    font-size: .68rem;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .ov-showcase-badge strong {
    display: block;
    margin-top: .7rem;
    font-family: "Exo 2", Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(1.25rem, 2vw, 2rem);
    line-height: .95;
    font-weight: 900;
  }

  .ov-tool-media {
    position: relative;
    overflow: hidden;
    height: 220px;
    margin-bottom: 1.25rem;
    border-radius: 1.5rem;
    border: 1px solid rgba(20,86,200,.10);
    background: linear-gradient(135deg, rgba(20,86,200,.10), rgba(30,200,240,.16));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.45);
  }

  .ov-tool-media::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,.02) 0%, rgba(7,26,79,.14) 100%);
    pointer-events: none;
  }

  .ov-services-layout {
    display: grid;
    grid-template-columns: minmax(0, .9fr) minmax(420px, 1.1fr);
    gap: clamp(28px, 5vw, 64px);
    align-items: center;
    margin-bottom: 2.4rem;
  }

  .ov-service-copy h2 {
    margin-top: 1rem;
    color: #fff;
    font-size: clamp(2.1rem, 4.8vw, 4.8rem);
    line-height: .96;
    font-weight: 900;
  }

  .ov-service-copy p {
    margin-top: 1.15rem;
    color: rgba(226,242,255,.78);
    font-size: 1.12rem;
    line-height: 1.68;
    font-weight: 700;
  }

  .ov-services-visual {
    position: relative;
    min-height: 520px;
  }

  .ov-services-visual::before {
    content: "";
    position: absolute;
    inset: 12% 4% 10% 8%;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(30,200,240,.26), transparent 68%);
    filter: blur(30px);
  }

  .ov-service-preview {
    position: absolute;
    overflow: hidden;
    border-radius: 1.75rem;
    border: 1px solid rgba(255,255,255,.16);
    background: rgba(255,255,255,.08);
    box-shadow: 0 30px 90px rgba(0,0,0,.28);
    backdrop-filter: blur(18px);
  }

  .ov-service-preview-main {
    inset: 20px 10px auto 0;
    height: 315px;
    transform: rotate(-1.2deg);
  }

  .ov-service-preview-secondary {
    width: 52%;
    right: 0;
    bottom: 18px;
    height: 255px;
    z-index: 2;
    transform: rotate(2.4deg);
  }

  .ov-service-preview-tertiary {
    width: 42%;
    left: 28px;
    bottom: 0;
    height: 210px;
    z-index: 3;
    transform: rotate(-3deg);
  }

  .ov-service-preview .ov-chrome {
    margin: 0;
    padding: .8rem 1rem;
    border-bottom-color: rgba(255,255,255,.1);
    background: rgba(4,13,35,.72);
  }

  .ov-service-preview-screen {
    position: relative;
    height: calc(100% - 42px);
    overflow: hidden;
  }

  .ov-service-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: .65rem;
    margin-top: 1.4rem;
  }

  .ov-service-chip {
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 999px;
    background: rgba(255,255,255,.08);
    color: rgba(255,255,255,.82);
    padding: .68rem .9rem;
    font-size: .78rem;
    font-weight: 950;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .ov-service-mini-panel {
    position: absolute;
    right: 34px;
    top: 330px;
    z-index: 4;
    width: 220px;
    border: 1px solid rgba(30,200,240,.28);
    border-radius: 1.35rem;
    background: rgba(4,13,35,.82);
    padding: 1rem;
    color: #fff;
    box-shadow: 0 20px 55px rgba(0,0,0,.28);
    backdrop-filter: blur(18px);
  }

  .ov-service-mini-panel strong {
    display: block;
    font-size: 1.1rem;
    line-height: 1.05;
  }

  .ov-service-mini-panel span {
    display: block;
    margin-top: .45rem;
    color: rgba(226,242,255,.72);
    font-size: .78rem;
    font-weight: 800;
    line-height: 1.4;
  }

  .ov-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3.45rem;
    height: 3.45rem;
    border-radius: 1.15rem;
    color: #fff;
    background: var(--ov-grad);
    box-shadow: 0 16px 34px rgba(20,86,200,.24);
  }

  .ov-card h3 {
    margin-top: 1.2rem;
    color: var(--ov-navy);
    font-size: 1.65rem;
    line-height: 1.05;
    font-weight: 900;
  }

  .ov-card p {
    margin-top: .85rem;
    color: var(--ov-muted);
    line-height: 1.62;
    font-weight: 700;
  }

  .ov-card-link {
    margin-top: 1.35rem;
    display: inline-flex;
    align-items: center;
    gap: .45rem;
    color: var(--ov-royal);
    font-weight: 950;
  }

  .ov-dark-card {
    border: 1px solid rgba(255,255,255,.13);
    background: rgba(255,255,255,.08);
    box-shadow: 0 25px 80px rgba(0,0,0,.18), 0 0 25px rgba(30,200,240,.04);
    backdrop-filter: blur(18px);
    transition: transform .28s cubic-bezier(0,0,1,1), box-shadow .28s cubic-bezier(0,0,1,1), border-color .28s cubic-bezier(0,0,1,1);
  }

  .ov-dark-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 32px 100px rgba(0,0,0,.24), 0 0 40px rgba(30,200,240,.08);
    border-color: rgba(139,220,255,.22);
  }

  .ov-dark-card h3,
  .ov-dark-card p {
    color: #fff;
  }

  .ov-dark-card p {
    color: rgba(226,242,255,.78);
  }

  .ov-tool-badge {
    position: absolute;
    top: 1.15rem;
    right: 1.15rem;
    border-radius: 999px;
    background: var(--ov-grad);
    color: #fff;
    padding: .5rem .78rem;
    font-size: .68rem;
    font-weight: 950;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .ov-list {
    margin-top: 1.45rem;
    display: grid;
    gap: .85rem;
  }

  .ov-list li {
    display: flex;
    gap: .68rem;
    align-items: flex-start;
    color: #324966;
    font-weight: 800;
  }

  .ov-section-dark .ov-list li {
    color: rgba(226,242,255,.86);
  }

  .ov-portfolio-card {
    display: block;
    overflow: hidden;
    border-radius: 2rem;
    border: 1px solid rgba(20,86,200,.12);
    background: #fff;
    box-shadow: 0 22px 60px rgba(10,31,110,.08), 0 0 20px rgba(30,200,240,.04);
    transition: transform .28s cubic-bezier(0,0,1,1), box-shadow .28s cubic-bezier(0,0,1,1), border-color .28s cubic-bezier(0,0,1,1);
  }

  .ov-portfolio-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 32px 90px rgba(10,31,110,.12), 0 0 32px rgba(30,200,240,.08);
    border-color: rgba(30,200,240,.3);
  }

  .ov-portfolio-image {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #eaf3ff;
  }

  .ov-portfolio-card img {
    transition: transform .65s cubic-bezier(0,0,1,1), filter .65s cubic-bezier(0,0,1,1);
  }

  .ov-portfolio-card:hover img {
    transform: scale(1.03);
    filter: brightness(1.02) contrast(1.01);
  }

  .ov-tag {
    display: inline-flex;
    border-radius: 999px;
    background: rgba(30,200,240,.12);
    color: var(--ov-royal);
    padding: .45rem .7rem;
    font-size: .7rem;
    font-weight: 950;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .ov-team-grid {
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    gap: 2rem;
    align-items: start;
  }

  .ov-team-list {
    display: grid;
    gap: 1rem;
  }

  .ov-person {
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 1.1rem;
    align-items: center;
  }

  .ov-person-image {
    position: relative;
    width: 96px;
    height: 96px;
    overflow: hidden;
    border-radius: 1.45rem;
    background: #eaf3ff;
    box-shadow: 0 14px 32px rgba(10,31,110,.12);
  }

  .ov-final {
    overflow: hidden;
    position: relative;
    padding: 96px 0;
    color: #fff;
    background: var(--ov-grad);
    text-align: center;
  }

  .ov-final::before {
    content: "";
    position: absolute;
    inset: -30% 18% auto auto;
    width: 32rem;
    height: 32rem;
    border-radius: 999px;
    background: rgba(255,255,255,.18);
    filter: blur(28px);
  }

  .ov-final h2 {
    position: relative;
    max-width: 850px;
    margin: 0 auto;
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    line-height: .98;
    font-weight: 900;
  }

  .ov-final p {
    position: relative;
    max-width: 670px;
    margin: 1.25rem auto 0;
    color: rgba(255,255,255,.82);
    font-size: 1.15rem;
    line-height: 1.66;
    font-weight: 700;
  }

  @keyframes ovTicker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes ovFloat {
    from { transform: translate3d(0, 0, 0) scale(1); }
    to { transform: translate3d(-20px, 24px, 0) scale(1.04); }
  }

  @keyframes ovPulse {
    from { opacity: .65; transform: scale(1); }
    to { opacity: 1; transform: scale(1.08); }
  }

  @keyframes ovShine {
    0%, 62% { transform: translateX(-160%) skewX(-18deg); }
    100% { transform: translateX(230%) skewX(-18deg); }
  }

  @keyframes ovRevealBlur {
    from { filter: blur(8px); opacity: 0; }
    to { filter: blur(0px); opacity: 1; }
  }

  @media (max-width: 980px) {
    .ov-hero {
      min-height: auto;
      padding-top: 56px;
    }

    .ov-hero-inner,
    .ov-team-grid,
    .ov-services-layout {
      grid-template-columns: 1fr;
    }

    .ov-team-grid .sticky {
      position: relative !important;
      top: auto !important;
    }

    .ov-team-list {
      margin-top: 1rem;
    }

    .ov-services-visual {
      min-height: 500px;
    }

    .ov-hero-visual,
    .ov-mockup-stack {
      min-height: 500px;
    }

    .ov-mockup-main {
      right: 0;
      width: 92%;
    }
  }

  @media (max-width: 640px) {
    .ov-wrap {
      width: min(100% - 28px, 1160px);
    }

    .ov-hero {
      min-height: auto;
      padding: 24px 0 44px;
      align-items: flex-start;
    }

    .ov-hero-inner {
      display: block;
    }

    .ov-hero-inner > div:first-child {
      position: relative;
      z-index: 3;
    }

    .ov-search-shell {
      margin-bottom: 1rem;
      border-radius: 1.25rem;
      padding: .45rem;
      box-shadow: 0 14px 36px rgba(10,31,110,.08);
    }

    .ov-search-shell form {
      gap: .65rem !important;
      border-radius: 1rem !important;
      padding: .72rem .78rem !important;
    }

    .ov-search-shell input {
      font-size: .88rem !important;
    }

    .ov-mobile-hero-row {
      display: grid;
      grid-template-columns: minmax(0, 1.08fr) minmax(0, .92fr);
      gap: .85rem;
      align-items: end;
      margin: .95rem 0 .95rem;
    }

    .ov-mobile-hero-row > * {
      min-width: 0;
    }

    .ov-mobile-hero-card {
      position: relative;
      display: block;
      overflow: hidden;
      min-height: 168px;
      margin: 0;
      border: 1px solid rgba(20,86,200,.14);
      border-radius: 1.3rem;
      background: linear-gradient(135deg, rgba(20,86,200,.08), rgba(30,200,240,.12));
      box-shadow: 0 18px 40px rgba(10,31,110,.12);
    }

    .ov-mobile-hero-card::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,.04) 0%, rgba(10,31,110,.10) 100%);
      pointer-events: none;
    }

    .ov-mobile-hero-card img {
      object-position: center center;
    }

    .ov-hero .ov-eyebrow {
      padding: .58rem .78rem;
      font-size: .62rem;
      letter-spacing: .12em;
    }

    .ov-hero h1 {
      margin-top: 0;
      font-size: clamp(2rem, 9.8vw, 2.7rem);
      line-height: .93;
      letter-spacing: -.055em;
    }

    .ov-hero-copy {
      margin-top: .8rem;
      font-size: .98rem;
      line-height: 1.55;
    }

    .ov-actions,
    .ov-final .ov-actions {
      flex-direction: column;
      gap: .8rem;
      margin-top: 1.45rem;
    }

    .ov-btn {
      width: 100%;
      padding: .9rem 1.1rem;
    }

    .ov-stats {
      grid-template-columns: 1fr;
      gap: .65rem;
      margin-top: 1.25rem;
    }

    .ov-stat {
      border-radius: 1rem;
      padding: .85rem;
    }

    .ov-hero-visual {
      display: none;
    }

    .ov-showcase-grid {
      grid-template-columns: 1fr;
      gap: .8rem;
      margin-top: .9rem;
    }

    .ov-showcase-stack {
      grid-template-columns: 1fr 1fr;
    }

    .ov-showcase-card,
    .ov-showcase-card.is-large {
      min-height: 220px;
      border-radius: 1.35rem;
    }

    .ov-showcase-badge {
      left: .95rem;
      right: .95rem;
      bottom: .95rem;
    }

    .ov-showcase-badge strong {
      font-size: 1.15rem;
    }

    .ov-tool-media {
      height: 176px;
      margin-bottom: 1rem;
      border-radius: 1.2rem;
    }

    .ov-photo-frame-main {
      height: 190px;
    }

    .ov-photo-frame-small {
      height: 150px;
    }

    .ov-wide-photo {
      min-height: 300px;
    }

    /* Servicios web mobile: visual limpio y texto legible, sin montajes superpuestos. */
    .ov-services-layout {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.8rem;
    }

    .ov-services-layout > *:first-child {
      order: 2;
    }

    .ov-services-layout > *:last-child {
      order: 1;
    }

    .ov-services-visual {
      min-height: 184px;
      width: 100%;
      margin: 0;
    }

    .ov-services-visual::before {
      inset: 4% 8% 10%;
      opacity: .55;
      filter: blur(22px);
    }

    .ov-service-preview {
      position: relative;
      transform: none !important;
      box-shadow: 0 18px 48px rgba(0,0,0,.22);
      backdrop-filter: none;
    }

    .ov-service-preview-main {
      inset: auto;
      width: 100%;
      height: 184px;
      border-radius: 1.35rem;
    }

    .ov-service-preview-main .ov-chrome {
      padding: .55rem .7rem;
    }

    .ov-service-preview-main .ov-service-preview-screen {
      height: calc(100% - 34px);
    }

    .ov-service-preview-secondary,
    .ov-service-preview-tertiary,
    .ov-service-mini-panel {
      display: none;
    }

    .ov-service-copy {
      position: relative;
      z-index: 5;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 1.45rem;
      background: rgba(255,255,255,.06);
      padding: 1.05rem;
      box-shadow: 0 18px 48px rgba(0,0,0,.16);
      backdrop-filter: blur(12px);
    }

    .ov-service-copy .ov-eyebrow {
      padding: .48rem .68rem;
      font-size: .59rem;
      letter-spacing: .12em;
    }

    .ov-service-copy h2 {
      font-size: clamp(1.85rem, 8vw, 2.42rem);
      line-height: 1.03;
      margin-top: .85rem;
      letter-spacing: -.045em;
    }

    .ov-service-copy p {
      margin-top: .85rem;
      font-size: .94rem;
      line-height: 1.55;
    }

    .ov-service-copy .ov-btn {
      margin-top: 1rem;
    }

    .ov-service-chip-row {
      gap: .45rem;
      margin-top: .95rem;
    }

    .ov-service-chip {
      padding: .48rem .62rem;
      font-size: .62rem;
    }

    .ov-section {
      padding: 72px 0;
    }

    #nosotros .ov-card.sticky {
      position: relative !important;
      top: auto !important;
      z-index: 1;
    }

    #nosotros .ov-team-list {
      position: relative;
      z-index: 2;
      margin-top: 1.25rem;
      gap: .85rem;
    }

    #nosotros .ov-person {
      grid-template-columns: 74px 1fr;
      gap: .9rem;
      align-items: center;
      border-radius: 1.35rem;
      padding: 1rem !important;
    }

    #nosotros .ov-person-image {
      width: 74px;
      height: 74px;
      border-radius: 1.05rem;
      box-shadow: 0 10px 26px rgba(10,31,110,.10);
    }

    #nosotros .ov-person h3 {
      font-size: 1.15rem !important;
      line-height: 1.05;
    }

    #nosotros .ov-person p {
      margin-top: .45rem;
      font-size: .9rem;
      line-height: 1.45;
    }

    #nosotros .ov-person .text-xs {
      font-size: .62rem;
      letter-spacing: .12em;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ov-hero::after,
    .ov-hero-glow,
    .ov-ticker-track,
    .ov-btn-primary::after {
      animation: none !important;
    }

    .ov-btn,
    .ov-card,
    .ov-portfolio-card,
    .ov-card:hover,
    .ov-portfolio-card:hover {
      transition: none !important;
      transform: none !important;
    }
  }
`;

function SectionHeader({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal>
      <div className={`ov-section-head ${align === "left" ? "left" : ""}`}>
        <span className="ov-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </Reveal>
  );
}

export default function Home() {
  const whatsappHref =
    "https://wa.me/5491127575675?text=Hola%20Oriavision%21%20Vi%20la%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n.%20%C2%BFMe%20ayudan%3F";

  const prompts = getAllPromptsMerged();
  const guides = getAllGuidesMerged();

  const previewPrompts = (
    prompts.filter((p) => p.featured).length
      ? prompts.filter((p) => p.featured)
      : prompts
  ).slice(0, 2);

  const previewGuides = (
    guides.filter((g) => g.featured).length
      ? guides.filter((g) => g.featured)
      : guides
  ).slice(0, 2);

  const searchItems = [
    ...prompts.map((p) => ({
      type: "Prompt" as const,
      title: p.title,
      description: p.description,
      category: p.category,
      href: `/prompts/${p.id}/`,
    })),
    ...guides.map((g) => ({
      type: "Guía" as const,
      title: g.title,
      description: g.description,
      category: g.category,
      href: `/guias/${g.id}/`,
    })),
  ];

  return (
    <div className="ov-home min-h-screen overflow-hidden pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <TrackLink
        href={CALC_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir Calculadora ML"
        event="click_calc"
        place="floating_home"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] left-4 z-[70] inline-flex items-center gap-2 rounded-full bg-[#1456C8] px-4 py-3 font-extrabold text-white shadow-2xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#0A1F6E] sm:left-6 sm:bottom-[calc(env(safe-area-inset-bottom)+24px)]"
      >
        <Calculator className="h-5 w-5" />
        <span className="hidden sm:inline">Calculadora ML</span>
      </TrackLink>

      <TrackLink
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        event="click_whatsapp"
        place="floating_home"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] p-4 font-extrabold text-white shadow-2xl shadow-emerald-900/20 transition hover:-translate-y-0.5 sm:right-6 sm:bottom-[calc(env(safe-area-inset-bottom)+24px)] sm:px-5 sm:py-3"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </TrackLink>

      <section className="ov-hero">
        <div className="ov-wrap ov-hero-inner">
          <div>
            <Reveal delay={0.02}>
              <div className="ov-search-shell">
                <ResourceSearch items={searchItems} variant="hero" />
              </div>
            </Reveal>

            <div className="ov-mobile-hero-row">
              <Reveal delay={0.08} className="ov-mobile-hero-title">
                <h1>Soluciones digitales para vender mejor online.</h1>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="ov-mobile-hero-card" aria-hidden="true">
                  <Image
                    src="/web-visuals/hero-web-responsive-clean.png"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.11}>
              <p className="ov-hero-copy">
                Creamos herramientas, recursos y páginas web para negocios que necesitan verse profesionales, calcular mejor y convertir con más claridad.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="ov-actions">
                <a href="#herramientas" className="ov-btn ov-btn-primary">
                  Explorar herramientas <ArrowRight className="relative z-10 h-5 w-5" />
                </a>

                <Link href="/web/" className="ov-btn ov-btn-secondary">
                  Diseño web profesional
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.17}>
              <div className="ov-stats">
                {STATS.map((stat) => (
                  <div key={stat.label} className="ov-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="ov-hero-visual">
            <div className="ov-hero-glow" />
            <div className="ov-mockup-stack" aria-hidden="true">
              <div className="ov-mockup ov-mockup-main">
                <div className="ov-chrome">
                  <span className="ov-dot" />
                  <span className="ov-dot" />
                  <span className="ov-dot" />
                  <span className="ov-url" />
                </div>

                <div className="ov-photo-frame ov-photo-frame-main">
                  <Image
                    src="/web-visuals/oriavision-hero-focus.png"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 980px) 92vw, 470px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="ov-mockup ov-mockup-small">
                <div className="ov-chrome">
                  <span className="ov-dot" />
                  <span className="ov-dot" />
                  <span className="ov-url" />
                </div>
                <div className="ov-photo-frame ov-photo-frame-small">
                  <Image
                    src="/web-exact/web-exact-05.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 980px) 78vw, 300px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="ov-mockup ov-mockup-card">
                <div className="text-xs font-black uppercase tracking-[.18em] text-white/70">
                  Panel Oriavision
                </div>
                <div className="mt-3 text-3xl font-black leading-none">
                  claridad para vender mejor
                </div>
                <div className="mt-5 grid gap-3 text-sm font-extrabold text-white/85">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Venta online desde 2006
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Uso diario de MercadoLibre
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ov-section ov-section-off">
        <div className="ov-wrap">
          <div className="grid gap-6 md:grid-cols-2">
            {HOME_BLOCKS.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={0.04 + index * 0.04}>
                  <a href={item.href} className="ov-card block">
                    <div className="ov-card-media">
                      <Image
                        src={item.img}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="ov-card-pad">
                      <div className="ov-icon">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <div className="ov-card-link">
                        {item.label}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ov-section">
        <div className="ov-wrap">
          <SectionHeader
            eyebrow="Proyectos y herramientas"
            title="Un home con más imagen y menos monotonía."
            text="Una muestra rápida de proyectos, herramientas y productos para que la home tenga más impacto visual sin perder claridad."
          />

          <div className="ov-showcase-grid">
            <Reveal delay={0.04}>
              <div className="ov-showcase-card is-large">
                <Image
                  src={SHOWCASE_VISUALS[0].img}
                  alt={SHOWCASE_VISUALS[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="ov-showcase-badge">
                  <span>{SHOWCASE_VISUALS[0].caption}</span>
                  <strong>{SHOWCASE_VISUALS[0].title}</strong>
                </div>
              </div>
            </Reveal>

            <div className="ov-showcase-stack">
              {SHOWCASE_VISUALS.slice(1).map((item, index) => (
                <Reveal key={item.title} delay={0.08 + index * 0.05}>
                  <div className="ov-showcase-card">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 26vw"
                      className="object-cover"
                    />
                    <div className="ov-showcase-badge">
                      <span>{item.caption}</span>
                      <strong>{item.title}</strong>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="herramientas" className="ov-section scroll-mt-24">
        <div className="ov-wrap">
          <SectionHeader
            eyebrow="Herramientas"
            title="Números claros antes de publicar."
            text="Dos productos propios pensados para vendedores de MercadoLibre: uno para calcular fino y otro para orientarte rápido con listas y oportunidades."
          />

          <div className="grid gap-7 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="ov-card ov-card-pad">
                <div className="ov-tool-media">
                  <Image
                    src="/portfolio/calculadora-webapp.png"
                    alt="Calculadora ML"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="ov-tool-badge">Principal</div>
                <div className="ov-icon">
                  <Calculator className="h-8 w-8" />
                </div>

                <h3>Calculadora ML</h3>
                <p>
                  Para calcular un precio de publicación contemplando costo, IVA, margen, comisión, IIBB, envío y cuotas.
                </p>

                <ul className="ov-list">
                  {[
                    "Cálculo más preciso producto por producto",
                    "Desglose fácil de entender",
                    "Pensada para vendedores argentinos",
                  ].map((item) => (
                    <li key={item}>
                      <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-[#1456C8]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <TrackLink
                  href={CALC_URL}
                  target="_blank"
                  rel="noreferrer"
                  event="click_calc"
                  place="calculator_card_home"
                  className="ov-btn ov-btn-primary mt-8 w-full sm:w-auto"
                >
                  Abrir calculadora <ArrowRight className="relative z-10 h-5 w-5" />
                </TrackLink>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="ov-card ov-card-pad">
                <div className="ov-tool-media">
                  <Image
                    src="/web-visuals/mockup-slide-automation.png"
                    alt="Orientador de precios ML"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-cyan-200/30 blur-2xl" />
                <div className="ov-icon relative">
                  <MonitorSmartphone className="h-8 w-8" />
                </div>

                <h3 className="relative">Orientador de precios ML</h3>
                <p className="relative">
                  Para trabajar con listas, mirar rápido si hay margen y detectar productos que merecen análisis más profundo.
                </p>

                <ul className="ov-list relative">
                  {[
                    "Ideal para mirar muchos productos",
                    "Enfoque estimativo y práctico",
                    "Complementa a la Calculadora ML",
                  ].map((item) => (
                    <li key={item}>
                      <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-[#1456C8]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <TrackLink
                  href={ORIENTADOR_URL}
                  target="_blank"
                  rel="noreferrer"
                  event="click_orientador"
                  place="orientador_card_home"
                  className="ov-btn ov-btn-secondary relative mt-8 w-full sm:w-auto"
                >
                  Ver orientador <ArrowRight className="h-5 w-5" />
                </TrackLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="servicios" className="ov-section ov-section-dark scroll-mt-24">
        <div className="ov-wrap relative z-10">
          <div className="ov-services-layout">
            <Reveal delay={0.04}>
              <div className="ov-service-copy">
                <span className="ov-eyebrow">Servicios web</span>
                <h2>No hacemos “una web más”. Armamos una presencia digital que se entienda y convierta.</h2>
                <p>
                  Diseño, copy, estructura, SEO base y criterio comercial. La web tiene que verse bien, pero también tiene que explicar, ordenar y vender.
                </p>

                <Link href="/web/" className="ov-btn ov-btn-primary mt-8">
                  Ver servicios web <ArrowRight className="relative z-10 h-5 w-5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="ov-services-visual">
              <div className="ov-service-preview ov-service-preview-main">
                <div className="ov-chrome">
                  <span className="ov-dot" />
                  <span className="ov-dot" />
                  <span className="ov-dot" />
                  <span className="ov-url" />
                </div>
                <div className="ov-service-preview-screen">
                  <Image
                    src="/portfolio/siempredeguardia.png"
                    alt=""
                    fill
                    sizes="(max-width: 980px) 100vw, 620px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="ov-service-preview ov-service-preview-secondary">
                <div className="ov-chrome">
                  <span className="ov-dot" />
                  <span className="ov-dot" />
                  <span className="ov-url" />
                </div>
                <div className="ov-service-preview-screen">
                  <Image
                    src="/portfolio/quirvo.png"
                    alt=""
                    fill
                    sizes="(max-width: 980px) 62vw, 330px"
                    className="object-cover object-left-top"
                  />
                </div>
              </div>

              <div className="ov-service-preview ov-service-preview-tertiary">
                <div className="ov-chrome">
                  <span className="ov-dot" />
                  <span className="ov-url" />
                </div>
                <div className="ov-service-preview-screen">
                  <Image
                    src="/portfolio/calculadora-landing.png"
                    alt=""
                    fill
                    sizes="(max-width: 980px) 52vw, 270px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.title} delay={0.05 + index * 0.05}>
                  <div className="ov-card ov-card-pad ov-dark-card">
                    <div className="ov-icon bg-white/10">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="ov-section scroll-mt-24">
        <div className="ov-wrap">
          <SectionHeader
            eyebrow="Portfolio"
            title="Proyectos que muestran criterio real."
            text="Casos propios y trabajos donde lo importante no es solo verse moderno: es que el mensaje sea claro y funcional."
          />

          <div className="grid gap-7 md:grid-cols-3">
            {PORTFOLIO.map((project, index) => (
              <Reveal key={project.title} delay={0.05 + index * 0.05}>
                <a href={project.href} target="_blank" rel="noreferrer" className="ov-portfolio-card">
                  <div className="ov-portfolio-image">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="p-6">
                    <span className="ov-tag">{project.tag}</span>
                    <h3 className="mt-4 text-2xl font-black leading-tight text-[#0A1F6E]">
                      {project.title}
                    </h3>
                    <p className="mt-3 font-bold leading-relaxed text-[#5A6E8C]">
                      {project.text}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="recursos-gratuitos" className="ov-section ov-section-off scroll-mt-24">
        <div className="ov-wrap">
          <SectionHeader
            eyebrow="Recursos gratuitos"
            title="Contenido útil para aplicar hoy."
            text="Prompts y guías creadas desde problemas reales de venta online, no desde teoría genérica."
          />

          <div className="grid gap-7 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="ov-card ov-card-pad">
                <div className="ov-icon">
                  <FileText className="h-7 w-7" />
                </div>
                <h3>Prompts</h3>
                <p>
                  Listos para copiar, adaptar y usar en análisis de productos, publicaciones y decisiones de MercadoLibre.
                </p>

                <div className="mt-7 space-y-4">
                  {previewPrompts.map((p) => (
                    <Link key={p.id} href={`/prompts/${p.id}/`} className="ov-card block rounded-[1.35rem] p-5 shadow-none">
                      <span className="ov-tag">{p.category}</span>
                      <h4 className="mt-3 text-lg font-black leading-tight text-[#0A1F6E]">
                        {p.title}
                      </h4>
                      <p className="mt-2 text-sm font-bold leading-relaxed text-[#5A6E8C]">
                        {p.description}
                      </p>
                    </Link>
                  ))}
                </div>

                <Link href="/prompts/" className="ov-btn ov-btn-primary mt-7">
                  Ver todos los prompts <ArrowRight className="relative z-10 h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="ov-card ov-card-pad">
                <div className="ov-icon">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h3>Guías</h3>
                <p>
                  Artículos simples, directos y accionables para tomar mejores decisiones en e-commerce.
                </p>

                <div className="mt-7 space-y-4">
                  {previewGuides.map((g) => (
                    <Link key={g.id} href={`/guias/${g.id}/`} className="ov-card block rounded-[1.35rem] p-5 shadow-none">
                      <span className="ov-tag">{g.category}</span>
                      <h4 className="mt-3 text-lg font-black leading-tight text-[#0A1F6E]">
                        {g.title}
                      </h4>
                      <p className="mt-2 text-sm font-bold leading-relaxed text-[#5A6E8C]">
                        {g.description}
                      </p>
                    </Link>
                  ))}
                </div>

                <Link href="/guias/" className="ov-btn ov-btn-secondary mt-7">
                  Ver todas las guías <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="nosotros" className="ov-section scroll-mt-24">
        <div className="ov-wrap">
          <div className="ov-team-grid">
            <Reveal>
              <div className="ov-card ov-card-pad sticky top-28">
                <span className="ov-eyebrow">Sobre Oriavision</span>
                <h2 className="mt-5 text-4xl font-black leading-[.98] text-[#0A1F6E] md:text-6xl">
                  Vendemos online. Por eso diseñamos distinto.
                </h2>
                <p className="mt-5 text-lg font-bold leading-relaxed text-[#5A6E8C]">
                  La diferencia no está solo en saber diseñar o programar. Está en entender qué necesita ver una persona para confiar, consultar, comprar o tomar una decisión.
                </p>

                <div className="mt-8 grid gap-4">
                  {[
                    "Experiencia real en MercadoLibre y e-commerce",
                    "Diseño con foco comercial, no decorativo",
                    "Soluciones simples, rápidas y mantenibles",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 font-extrabold text-[#324966]">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#1456C8]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="ov-team-list">
              {TEAM.map((person, index) => (
                <Reveal key={person.name} delay={0.05 + index * 0.05}>
                  <article className="ov-card ov-card-pad ov-person">
                    <div className="ov-person-image">
                      <Image src={person.img} alt={person.name} fill sizes="96px" className="object-cover" />
                    </div>

                    <div>
                      <h3 className="!mt-0 text-xl font-black text-[#0A1F6E]">
                        {person.name}
                      </h3>
                      <div className="mt-1 text-xs font-black uppercase tracking-[.14em] text-[#1456C8]">
                        {person.role}
                      </div>
                      <p className="mt-2 font-bold leading-relaxed text-[#5A6E8C]">
                        {person.bio}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ov-final">
        <Reveal>
          <div className="ov-wrap relative z-10">
            <h2>¿Querés que tu negocio se vea más profesional y funcione mejor?</h2>
            <p>
              Podemos empezar por una landing, mejorar tu sitio actual o pensar una herramienta simple que te ahorre tiempo.
            </p>

            <div className="ov-actions justify-center">
              <Link href="/web/" className="ov-btn bg-white text-[#0A1F6E] shadow-2xl shadow-blue-950/20">
                Ver servicios <ArrowRight className="h-5 w-5" />
              </Link>

              <a href={whatsappHref} target="_blank" rel="noreferrer" className="ov-btn border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/15">
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Newsletter />
    </div>
  );
}
