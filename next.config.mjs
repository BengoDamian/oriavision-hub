/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages: necesitamos export estático + imágenes sin optimizar
  output: "export",
  images: { unoptimized: true },

  // ✅ Genera /ruta/index.html en vez de /ruta.html
  // y evita 404 cuando navegás a /guias/algo/ o /prompts/algo/
  trailingSlash: true,
};

export default nextConfig;