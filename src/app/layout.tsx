import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Oriavision Hub",
    template: "%s | Oriavision",
  },
  description:
    "Guías + prompts que usamos todos los días para vender mejor. Corto, accionable y sin humo.",
  openGraph: {
    type: "website",
    siteName: "Oriavision",
    title: "Oriavision Hub",
    description:
      "Guías + prompts que usamos todos los días para vender mejor en MercadoLibre y Tiendanube. Corto, accionable y sin humo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oriavision Hub",
    description:
      "Guías + prompts que usamos todos los días para vender mejor en MercadoLibre y Tiendanube. Corto, accionable y sin humo.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

  return (
    <html lang="es">
      <head>
        {token ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token,
              spa: true, // ✅ cuenta navegación interna (Link) como pageviews
            })}
          />
        ) : null}
      </head>

      <body
        className={`${inter.variable} font-sans bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-700 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}