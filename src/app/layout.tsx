import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oriavision — Animación estilo video",
  description: "Hero animado por capas para Oriavision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
