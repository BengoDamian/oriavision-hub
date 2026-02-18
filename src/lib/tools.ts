export interface Tool {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  status: "active" | "soon";
  href: string;
  badge: string;
  externalUrl?: string; // Si tiene esto, lleva afuera
  featured?: boolean;
}

export const tools: Tool[] = [
  {
    slug: "calculadora-ml",
    title: "Calculadora Mercado Libre",
    shortDescription: "Calculá costos, comisiones e impuestos al instante.",
    fullDescription: "La herramienta #1 para vendedores. Ingresá el precio de venta, categoría y costos, y obtené tu ganancia neta exacta descontando IIBB, envío y comisiones de la plataforma.",
    status: "active",
    href: "/herramientas/calculadora-ml",
    badge: "MÁS POPULAR",
    externalUrl: "https://calculadoraml.oriavision.com.ar",
    featured: true,
  },
  {
    slug: "analizador-competencia",
    title: "Analizador de Competencia",
    shortDescription: "Compará tus precios contra los líderes de tu categoría.",
    status: "soon",
    href: "/herramientas/analizador-competencia",
    badge: "PRÓXIMAMENTE",
  },
  {
    slug: "auditor-publicaciones",
    title: "Auditor de Publicaciones",
    shortDescription: "Detectá errores en títulos y fotos que bajan tu exposición.",
    status: "soon",
    href: "/herramientas/auditor-publicaciones",
    badge: "EN DESARROLLO",
  }
];
