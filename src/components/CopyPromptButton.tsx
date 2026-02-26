"use client";

import { useState } from "react";

export default function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback (por si el navegador bloquea clipboard)
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <button
      onClick={onCopy}
      className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-white font-extrabold hover:bg-brand-700 transition-colors"
      aria-label="Copiar prompt"
      type="button"
    >
      {copied ? "Copiado ✓" : "Copiar"}
    </button>
  );
}