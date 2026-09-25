/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages: necesitamos export estático + imágenes sin optimizar
  output: "export",
  images: { unoptimized: true },

  // ✅ Genera /ruta/index.html en vez de /ruta.html
  // y evita 404 cuando navegás a /guias/algo/ o /prompts/algo/
  trailingSlash: true,

  // Hay dos layouts raíz (portada de agencia y páginas internas): la 404 necesita su propio documento.
  experimental: { globalNotFound: true },
};

export default nextConfig;