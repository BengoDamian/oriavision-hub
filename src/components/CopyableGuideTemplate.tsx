"use client";

import { useRef, useState } from "react";

export default function CopyableGuideTemplate({ text }: { text: string }) {
  const field = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Ficha copiada. Pegala en tus notas para completarla.");
    } catch {
      field.current?.focus();
      field.current?.select();
      setStatus("Seleccionamos la ficha. Usá la opción Copiar de tu dispositivo.");
    }
  }

  return (
    <div className="guide-template">
      <textarea ref={field} aria-label="Ficha del negocio para copiar" value={text} readOnly rows={9} />
      <button className="button button-dark" type="button" onClick={copy}>Copiar ficha</button>
      <p className="guide-copy-status" role="status">{status}</p>
    </div>
  );
}
