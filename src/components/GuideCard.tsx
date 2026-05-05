import Link from "next/link";
import type { GuideItem } from "@/lib/guides";

export default function GuideCard({ item }: { item: GuideItem }) {
  return (
    <Link
      href={`/guias/${item.id}`}
      className="card-animated hover-lift group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800">
          {item.category}
        </span>
        {item.featured && (
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            Destacado
          </span>
        )}
      </div>

      <h3 className="text-base font-extrabold text-slate-950 group-hover:underline">
        {item.title}
      </h3>
      <p className="mt-2 text-sm text-slate-700 line-clamp-2">
        {item.description}
      </p>

      {item.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}