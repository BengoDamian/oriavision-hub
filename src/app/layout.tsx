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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.oriavision.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Oriavision | Hub de Herramientas E-commerce",
    template: "%s | Oriavision",
  },

  description: "Herramientas inteligentes para vendedores de Mercado Libre.",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Oriavision",
    locale: "es_AR",
    title: "Oriavision | Hub de Herramientas E-commerce",
    description: "Herramientas inteligentes para vendedores de Mercado Libre.",
    images: [
      {
        url: `${SITE_URL}/og/home.png`,
        width: 1200,
        height: 630,
        alt: "Oriavision Hub",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Oriavision | Hub de Herramientas E-commerce",
    description: "Herramientas inteligentes para vendedores de Mercado Libre.",
    images: [`${SITE_URL}/og/home.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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