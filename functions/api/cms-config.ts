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

  // ✅ En preview: commitea a cms-admin
  // ✅ En prod: commitea a main
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
    folder: "content/prompts"
    create: true
    slug: "{{slug}}"
    extension: "md"
    format: "frontmatter"
    editor:
      preview: false
    fields:
      - { label: "Título", name: "title", widget: "string" }
      - { label: "Descripción", name: "description", widget: "string" }
      - { label: "Categoría", name: "category", widget: "string" }
      - { label: "Tags", name: "tags", widget: "list", required: false }
      - { label: "Destacado", name: "featured", widget: "boolean", required: false, default: false }
      - { label: "Prompt", name: "body", widget: "markdown" }

  - name: "guides"
    label: "Guías"
    folder: "content/guides"
    create: true
    slug: "{{slug}}"
    extension: "md"
    format: "frontmatter"
    editor:
      preview: false
    fields:
      - { label: "Título", name: "title", widget: "string" }
      - { label: "Descripción", name: "description", widget: "string" }
      - { label: "Categoría", name: "category", widget: "string" }
      - { label: "Tags", name: "tags", widget: "list", required: false }
      - { label: "Destacada", name: "featured", widget: "boolean", required: false, default: false }
      - { label: "Contenido", name: "body", widget: "markdown" }
`.trim();

  return new Response(yaml, {
    headers: {
      "content-type": "text/yaml; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}