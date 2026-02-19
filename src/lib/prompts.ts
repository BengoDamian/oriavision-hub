export type PromptCategory =
  | "Mercado Libre"
  | "Rentabilidad"
  | "Publicaciones"
  | "Contenido"
  | "Atención al cliente"
  | "Otros";

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  prompt: string;
  tags?: string[];
  featured?: boolean;
}

export const prompts: PromptItem[] = [
  {
    id: "ml-titulo-gancho",
    title: "Título con gancho para Mercado Libre",
    description: "Genera 10 títulos optimizados para conversión y SEO interno.",
    category: "Publicaciones",
    featured: true,
    tags: ["títulos", "SEO", "conversión"],
    prompt: `Actuá como especialista en Mercado Libre Argentina.
Producto: {{PRODUCTO}}
Marca/Modelo: {{MARCA_MODELO}}
Características clave: {{CARACTERISTICAS}}
Público objetivo: {{PUBLICO}}

Generá:
1) 10 títulos de ML (máx 60 caracteres, sin símbolos raros, sin mayúsculas excesivas).
2) 5 variantes más “agresivas” orientadas a conversión.
3) 10 bullets para la descripción (claros, con beneficios y especificaciones).
Devuelve todo en formato listo para copiar y pegar.`,
  },
  {
    id: "ml-precio-competencia",
    title: "Análisis de precio vs competencia",
    description: "Checklist para decidir si subir, bajar o reposicionar.",
    category: "Rentabilidad",
    tags: ["precio", "competencia"],
    prompt: `Actuá como consultor de pricing para Mercado Libre.
Mi producto: {{PRODUCTO}}
Mi costo: {{COSTO}}
Mi precio actual: {{PRECIO}}
Competidores: {{LISTA_COMPETIDORES_CON_PRECIOS}}

Quiero que me devuelvas:
- Diagnóstico (1 párrafo)
- 5 acciones concretas (ordenadas por impacto)
- Recomendación final de precio (rango) y por qué
- Riesgos y cómo mitigarlos`,
  },
  {
    id: "tiktok-guion-30s",
    title: "Guion TikTok 30–40s (estilo argentino)",
    description: "Hook + guion + texto en pantalla + CTA suave.",
    category: "Contenido",
    featured: true,
    tags: ["tiktok", "guion", "hooks"],
    prompt: `Actuá como estratega de TikTok para vendedores de Mercado Libre Argentina.
Tema del video: {{TEMA}}
Objetivo: {{OBJETIVO}} (ej: comentarios / guardados / leads)
Nivel del público: {{NIVEL}} (principiante/medio/avanzado)

Entregá:
1) 3 títulos de portada (cortos)
2) 3 hooks (uno polémico)
3) Guion 30–40s (oral) + texto en pantalla + cortes
4) Comentario anzuelo
5) CTA suave
6) Caption + hashtags`,
  },
];
