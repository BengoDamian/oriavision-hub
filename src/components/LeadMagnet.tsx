"use client";

import { useState } from "react";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setMsg("");

    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setState("error");
        setMsg(data?.error || "No se pudo suscribir.");
        return;
      }

      setState("ok");
      setMsg("Listo ✅ Te mandamos la próxima guía por mail.");
      setEmail("");
    } catch {
      setState("error");
      setMsg("No se pudo suscribir.");
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <div className="rounded-[2rem] border border-slate-200 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <div className="inline-flex items-center gap-2">
              <span className="rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                Gratis
              </span>
              <span className="text-sm font-extrabold text-slate-900">
                Contenido semanal, corto y accionable
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-textBody">
              Prompts, guías, checklists y novedades para vender mejor. Sin spam.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Tu email"
            className="w-full sm:flex-1 rounded-full border-2 border-slate-200 px-5 py-3 text-slate-900 font-semibold outline-none focus:border-brand-600 bg-white"
            required
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-full bg-brand-600 hover:bg-brand-700 px-8 py-3 text-white font-extrabold transition-colors disabled:opacity-60"
          >
            {state === "loading" ? "Sumando..." : "Quiero las guías"}
          </button>
        </form>

        <div className="mt-3 text-sm font-semibold">
          {state === "ok" && <span className="text-emerald-700">{msg}</span>}
          {state === "error" && <span className="text-red-600">{msg}</span>}
        </div>

        <p className="mt-2 text-xs font-semibold text-slate-500">
          Podés darte de baja cuando quieras.
        </p>
      </div>
    </div>
  );
}