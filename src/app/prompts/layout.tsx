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
  metadataBase: new URL("https://www.oriavision.com.ar"),
  title: {
    default: "Oriavision | Calculadora ML, recursos y desarrollo web",
    template: "%s | Oriavision",
  },
  description:
    "Calculadora ML, prompts, guías y desarrollo de landing pages y páginas web a medida para vender mejor.",
  openGraph: {
    type: "website",
    siteName: "Oriavision",
    locale: "es_AR",
    title: "Oriavision | Calculadora ML, recursos y desarrollo web",
    description:
      "Calculadora ML, prompts, guías y desarrollo de landing pages y páginas web a medida para vender mejor.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Oriavision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oriavision | Calculadora ML, recursos y desarrollo web",
    description:
      "Calculadora ML, prompts, guías y desarrollo de landing pages y páginas web a medida para vender mejor.",
    images: ["/og/home.png"],
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
              spa: true,
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