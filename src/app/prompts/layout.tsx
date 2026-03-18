import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompts",
  description: "Recursos gratuitos: prompts listos para copiar y usar para vender mejor.",
};

export default function PromptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}