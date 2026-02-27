/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  ...(isProd
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true, // ✅ evita 404 en Cloudflare con rutas sin slash
      }
    : {}),
};

export default nextConfig;