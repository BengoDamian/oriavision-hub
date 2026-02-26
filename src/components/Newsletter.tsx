"use client";

import { useState } from "react";

export default function Newsletter() {
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
      setMsg("Listo ✅ Te avisamos cuando haya una guía nueva.");
      setEmail("");
    } catch {
      setState("error");
      setMsg("No se pudo suscribir.");
    }
  };

  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Newsletter Oriavision
          </h2>
          <p className="mt-3 text-lg text-textBody font-medium max-w-2xl">
            Problemas reales. Soluciones simples. Guías para aplicar hoy.
          </p>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Tu email"
              className="w-full sm:flex-1 rounded-full border-2 border-slate-200 px-5 py-3 text-slate-900 font-semibold outline-none focus:border-brand-600"
              required
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="rounded-full bg-brand-600 hover:bg-brand-700 px-8 py-3 text-white font-extrabold transition-colors disabled:opacity-60"
            >
              {state === "loading" ? "Suscribiendo..." : "Suscribirme"}
            </button>
          </form>

          <div className="mt-3 text-sm font-semibold">
            {state === "ok" && <span className="text-emerald-700">{msg}</span>}
            {state === "error" && <span className="text-red-600">{msg}</span>}
          </div>

          <p className="mt-4 text-xs text-slate-600 font-semibold">
            Podés darte de baja cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
}