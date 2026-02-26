import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/guides";

export const dynamic = "error";

export default function GuiasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          Guías
        </h1>
        <p className="mt-2 text-slate-700">
          Guías rápidas para no cometer errores caros
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <GuideCard key={g.id} item={g} />
        ))}
      </div>
    </div>
  );
}