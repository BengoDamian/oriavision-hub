import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompts gratis | Oriavision",
  description: "Prompts gratis y recursos gratuitos listos para copiar y usar para vender mejor en MercadoLibre y e-commerce.",
};

export default function PromptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}