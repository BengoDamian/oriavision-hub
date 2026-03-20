"use client";

import { useState } from "react";

type State = "idle" | "loading" | "ok" | "error";

export default function WebRequestForm() {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    niche: "",
    link: "",
    goal: "",
    details: "",
    website: "", // honeypot anti-bot
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setMsg("");

    try {
      const r = await fetch("/api/webquote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setState("error");
        setMsg(data?.error || "No se pudo enviar. Probá de nuevo.");
        return;
      }

      setState("ok");
      setMsg("Listo ✅ Te respondemos a la brevedad.");
      setForm({
        name: "",
        email: "",
        niche: "",
        link: "",
        goal: "",
        details: "",
        website: "",
      });
    } catch {
      setState("error");
      setMsg("No se pudo enviar. Probá de nuevo.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-blue-100 bg-slate-50 p-8 shadow-sm md:p-10">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-600/10 blur-2xl" />
      <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-yellow-200/20 blur-2xl" />

      <div className="relative">
        <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
          Landing page o web a medida
        </div>

        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
          ¿Querés una landing page o una web a medida?
        </h1>

        <p className="mt-4 max-w-2xl text-lg font-medium text-textBody">
          Contanos qué necesitás y te respondemos por mail. Desde una landing simple hasta una web más completa con
          funcionalidades a medida.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={set("website")}
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-extrabold text-slate-900">Nombre</label>
              <input
                value={form.name}
                onChange={set("name")}
                required
                className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 outline-none focus:border-brand-600"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="text-sm font-extrabold text-slate-900">Email</label>
              <input
                value={form.email}
                onChange={set("email")}
                required
                type="email"
                className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 outline-none focus:border-brand-600"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-extrabold text-slate-900">Rubro</label>
              <input
                value={form.niche}
                onChange={set("niche")}
                className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 outline-none focus:border-brand-600"
                placeholder="Ej: Insumos, tecnología, servicios…"
              />
            </div>

            <div>
              <label className="text-sm font-extrabold text-slate-900">Link</label>
              <input
                value={form.link}
                onChange={set("link")}
                className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 outline-none focus:border-brand-600"
                placeholder="IG / MercadoLibre / Web (si tenés)"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-extrabold text-slate-900">Qué querés lograr</label>
            <input
              value={form.goal}
              onChange={set("goal")}
              className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 outline-none focus:border-brand-600"
              placeholder="Ej: captar leads, vender, link en bio, etc."
            />
          </div>

          <div>
            <label className="text-sm font-extrabold text-slate-900">Detalles</label>
            <textarea
              value={form.details}
              onChange={set("details")}
              rows={5}
              className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 outline-none focus:border-brand-600"
              placeholder="Qué secciones querés, ejemplos, etc."
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={state === "loading"}
              className="rounded-full bg-brand-600 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-blue-200 transition-colors hover:bg-brand-700 disabled:opacity-60"
            >
              {state === "loading" ? "Enviando..." : "Enviar pedido"}
            </button>

            <div className="text-sm font-semibold">
              {state === "ok" && <span className="text-emerald-700">{msg}</span>}
              {state === "error" && <span className="text-red-600">{msg}</span>}
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-500">
            Respondemos desde soporte@oriavision.com.ar
          </p>
        </form>
      </div>
    </div>
  );
}