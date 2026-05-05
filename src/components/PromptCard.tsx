"use client";

import { useState } from "react";
import type { PromptItem } from "@/lib/prompts";
import { Copy, Check } from "lucide-react";

export default function PromptCard({ item }: { item: PromptItem }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback simple
      const ta = document.createElement("textarea");
      ta.value = item.prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <div className="card-animated hover-lift group bg-white rounded-[2rem] p-7 border-2 border-slate-100 hover:border-slate-300 transition-all duration-300 shadow-sm flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-brand-700 bg-blue-50 border border-blue-100 inline-flex px-3 py-1 rounded-full">
            {item.category}
          </div>
          <h3 className="mt-4 text-xl font-black text-slate-900 leading-tight">
            {item.title}
          </h3>
          <p className="mt-2 text-black font-medium leading-relaxed">
            {item.description}
          </p>
        </div>

        <button
          onClick={onCopy}
          className="shrink-0 inline-flex items-center gap-2 rounded-full border-2 border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-brand-600 hover:text-brand-700 transition-colors"
          aria-label="Copiar prompt"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Copiado
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copiar
            </>
          )}
        </button>
      </div>

      <div className="mt-auto pt-4">
        <div className="text-xs text-slate-400 font-semibold">
          Tip: reemplazá los campos entre <span className="font-black">{"{{ }}"}</span>
        </div>
      </div>
    </div>
  );
}
