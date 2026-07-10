import type { Metadata } from "next";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/inbox/`;

const TITLE = "Bot Telegram para MercadoLibre | Oriavision";
const DESCRIPTION =
  "Recibí alertas de MercadoLibre en Telegram (mensajes, preguntas, reclamos, facturación y stock) y respondé preguntas desde Telegram.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/inbox/" },
  openGraph: {
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Oriavision Inbox" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/home.png"],
  },
};

export default function InboxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
