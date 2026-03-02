import { prompts } from "@/lib/prompts";

export const dynamic = "error";
export const dynamicParams = false;

// ✅ Next export estático: esto lo hace “a prueba de balas”
export function generateStaticParams(): { id: string }[] {
  return prompts.map((p) => ({ id: p.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}