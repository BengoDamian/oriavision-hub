import type { Metadata } from "next";

const SITE_URL = "https://www.oriavision.com.ar";
const PAGE_URL = `${SITE_URL}/web/`;

export const metadata: Metadata = {
  title: "Diseño web profesional para negocios | Oriavision",
  description:
    "Diseñamos páginas web profesionales para emprendedores y negocios. Landings, webs completas y sistemas a medida.",
  alternates: { canonical: "/web/" },
  openGraph: {
    url: PAGE_URL,
    title: "Diseño web profesional para negocios | Oriavision",
    description:
      "Diseñamos páginas web profesionales para emprendedores y negocios. Landings, webs completas y sistemas a medida.",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Oriavision" }],
  },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return children;
}
