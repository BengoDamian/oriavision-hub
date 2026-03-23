type CFContext = {
  request: Request;
};

function isPreviewHost(host: string) {
  return host.endsWith(".pages.dev") || host.includes(".pages.dev");
}

export async function onRequest(context: CFContext) {
  const { request } = context;
  const url = new URL(request.url);
  const origin = url.origin;
  const host = url.host;

  // En preview: commitea a cms-admin
  // En prod: commitea a main
  const branch = isPreviewHost(host) ? "cms-admin" : "main";

  const REPO = "BengoDamian/oriavision-hub";

  const yaml = `
slug:
  encoding: "ascii"
  clean_accents: true
  sanitize_replacement: "-"

backend:
  name: github
  repo: ${REPO}
  branch: ${branch}
  base_url: ${origin}
  auth_endpoint: /api/auth

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "prompts"
    label: "Prompts"
    label_singular: "Prompt"
    folder: "content/prompts"
    create: true
    slug: "{{slug}}"
    extension: "md"
    format: "frontmatter"
    editor:
      preview: false
    summary: "{{title}} | {{category}} | featured: {{featured}} | draft: {{draft}} | noindex: {{noindex}}"
    fields:
      - { label: "Título", name: "title", widget: "string" }
      - { label: "Descripción", name: "description", widget: "text" }
      - { label: "Categoría", name: "category", widget: "string" }
      - { label: "Tags", name: "tags", widget: "list", required: false }
      - { label: "Destacado", name: "featured", widget: "boolean", required: false, default: false }
      - { label: "Borrador", name: "draft", widget: "boolean", required: false, default: false }
      - { label: "Noindex", name: "noindex", widget: "boolean", required: false, default: false }
      - { label: "SEO title", name: "seoTitle", widget: "string", required: false }
      - { label: "SEO description", name: "seoDescription", widget: "text", required: false }
      - label: "UpdatedAt"
        name: "updatedAt"
        widget: "datetime"
        required: false
        format: "YYYY-MM-DD"
        date_format: "YYYY-MM-DD"
        time_format: false
        picker_utc: false
      - { label: "Prompt", name: "body", widget: "markdown" }

  - name: "guides"
    label: "Guías"
    label_singular: "Guía"
    folder: "content/guides"
    create: true
    slug: "{{slug}}"
    extension: "md"
    format: "frontmatter"
    editor:
      preview: false
    summary: "{{title}} | {{category}} | featured: {{featured}} | draft: {{draft}} | noindex: {{noindex}}"
    fields:
      - { label: "Título", name: "title", widget: "string" }
      - { label: "Descripción", name: "description", widget: "text" }
      - { label: "Categoría", name: "category", widget: "string" }
      - { label: "Tags", name: "tags", widget: "list", required: false }
      - { label: "Destacada", name: "featured", widget: "boolean", required: false, default: false }
      - { label: "Borrador", name: "draft", widget: "boolean", required: false, default: false }
      - { label: "Noindex", name: "noindex", widget: "boolean", required: false, default: false }
      - { label: "SEO title", name: "seoTitle", widget: "string", required: false }
      - { label: "SEO description", name: "seoDescription", widget: "text", required: false }
      - label: "PublishedAt"
        name: "publishedAt"
        widget: "datetime"
        required: false
        format: "YYYY-MM-DD"
        date_format: "YYYY-MM-DD"
        time_format: false
        picker_utc: false
      - label: "UpdatedAt"
        name: "updatedAt"
        widget: "datetime"
        required: false
        format: "YYYY-MM-DD"
        date_format: "YYYY-MM-DD"
        time_format: false
        picker_utc: false
      - { label: "Autor", name: "author", widget: "string", required: false }
      - { label: "Imagen", name: "image", widget: "image", required: false }
      - { label: "Contenido", name: "body", widget: "markdown" }
`.trim();

  return new Response(yaml, {
    headers: {
      "content-type": "text/yaml; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}