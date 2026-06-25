import type { Metadata } from "next";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/inbox/`;

const TITLE = "Oriavision Inbox | Bot de Telegram para vendedores de MercadoLibre";
const DESCRIPTION =
  "Oriavision Inbox es un bot de Telegram, independiente, que ayuda a vendedores de MercadoLibre a responder más rápido y no perder ventas. Solicitá una demo.";

export const metadata: Metadata = {
  title: TITLE,
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
