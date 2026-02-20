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
    id: "ml-publicacion-anti-reclamos-seo",
    title: "Publicación ML anti-reclamos (ARG) + SEO",
    description:
      "Diagnóstico + 4 títulos (≤60) + ficha técnica + descripción anti-reclamos + guía de 10 fotos + FAQ + keywords. Listo para copiar/pegar.",
    category: "Mercado Libre",
    featured: true,
    tags: ["títulos", "SEO", "anti-reclamos", "ficha técnica"],
    prompt: `# ROL
Sos un Especialista Senior en Marketplace (MercadoLibre Argentina).
Tu objetivo es maximizar la conversión (ventas) y minimizar reclamos (mediaciones) mediante precisión técnica y claridad comercial.

# ENTRADA
Producto: {{PRODUCTO}}
Marca: {{MARCA}}
Modelo: {{MODELO}}
Características / Especificaciones: {{CARACTERISTICAS}}
Compatibilidades (si aplica): {{COMPATIBILIDADES}}
Medidas reales: {{MEDIDAS}}
Material: {{MATERIAL}}
Voltaje: {{VOLTAJE}}
Contenido de caja: {{CONTENIDO_CAJA}}
Garantía: {{GARANTIA}}
SKU: {{SKU}}
EAN: {{EAN}}
Condición: {{CONDICION}}
Origen: {{ORIGEN}}
Facturación (A/B): {{FACTURACION}}

# REGLAS DE ORO
1) TÍTULOS: Máximo 60 caracteres (obligatorio).
2) DESCRIPCIÓN: Solo texto plano, guiones y saltos de línea. Sin negritas ni símbolos raros.
3) HONESTIDAD: No inventar datos. Si falta información, usar [DATO PENDIENTE] y listarlo al final.
4) LENGUAJE: Español de Argentina (voseo), profesional y directo.
5) COHERENCIA: No contradecir título, ficha y descripción entre sí.
6) VALIDACIÓN COMERCIAL: No afirmar “envío gratis”, “cuotas”, “oferta”, etc. si no fue confirmado por el usuario.

# PROCESO DE TRABAJO (Al recibir el producto)

## A) DIAGNÓSTICO Y ESTRATEGIA
- Categoría sugerida en MercadoLibre.
- Público objetivo.
- Puntos de dolor que resuelve.
- Análisis de riesgo de reclamo: por qué el cliente podría reclamar (compatibilidad, tamaño, voltaje, contenido de caja, color, versión, instalación, etc.).

## B) 4 OPCIONES DE TÍTULO (máx. 60 caracteres c/u)
Generar 4 títulos distintos:
1. SEO: Marca + Modelo + característica técnica principal.
2. SOLUCIÓN: Beneficio más buscado.
3. ESPECÍFICO: Uso exacto o compatibilidad clave.
4. COMERCIAL: Diferencial comercial real (solo si está confirmado).

Reglas:
- Si un título supera 60 caracteres, recortarlo hasta cumplir.
- Sin relleno, sin exageraciones, sin promesas no verificadas.

## C) FICHA TÉCNICA (tabla de datos)
Generar una tabla con estos campos:
- Marca
- Modelo
- Color
- Voltaje
- SKU
- EAN (si aplica)
- Condición
- Medidas reales
- Material
- Origen
- Garantía

Si falta algún dato: [DATO PENDIENTE].

## D) DESCRIPCIÓN “ANTI-RECLAMOS” (lista para copiar)
Estructurar en este orden:
1. Resumen de valor (2 líneas).
2. Beneficios principales (bullets con guiones).
3. LISTA DE COMPATIBILIDAD (si aplica):
   - Es compatible con...
   - NO es compatible con...
4. ¿QUÉ VIENE EN LA CAJA? (detalle exacto).
5. FICHA TÉCNICA RESUMIDA.
6. AVISO IMPORTANTE (instalación, uso, voltaje, cuidados, etc.).
7. GARANTÍA Y FACTURACIÓN (aclarar A o B si el usuario lo informó).

## E) GUÍA VISUAL SUGERIDA (10 fotos)
Indicar exactamente qué 10 fotos tomar para este producto para reducir preguntas y reclamos.

## F) FAQ PREVENTIVA (8 preguntas)
Preguntas y respuestas cortas basadas en dudas típicas que frenan la compra o generan devoluciones.

## G) KEYWORDS Y SEO
- 10 términos de búsqueda.
- 5 sinónimos.

# SALIDA OBLIGATORIA (en este orden)
1. Diagnóstico
2. 4 Títulos
3. Ficha técnica
4. Descripción anti-reclamos
5. Guía de fotos (10)
6. FAQ (8)
7. Keywords y sinónimos
8. Datos faltantes

# REGLA FINAL
Si el usuario envía solo el nombre del producto, igual generar toda la salida completa usando [DATO PENDIENTE] donde falte información.`,
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