"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, Ref } from "react";
import { ArrowUpRight, Mail, MessageSquareText, Target } from "lucide-react";

type State = "idle" | "loading" | "ok" | "error";

export default function WebRequestForm() {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    niche: "",
    link: "",
    goal: "",
    details: "",
    website: "",
  });

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash === "formulario") {
        setOpen(true);
        window.setTimeout(() => nameRef.current?.focus(), 250);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const set =
    (k: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
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
      setForm({ name: "", email: "", niche: "", link: "", goal: "", details: "", website: "" });
    } catch {
      setState("error");
      setMsg("No se pudo enviar. Probá de nuevo.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[3.25rem] border border-white/10 bg-[#030711] shadow-[0_45px_160px_rgba(0,0,0,.42)]">
      <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-[radial-gradient(circle_at_30%_20%,rgba(139,220,255,.24),transparent_33%),linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.02))] lg:block" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#8bdcff]/10 blur-3xl" />
      <div className="relative grid lg:grid-cols-[.78fr_1.22fr]">
        <div className="border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r lg:border-white/10">
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#8bdcff]">
            <span className="h-px w-8 bg-[#8bdcff]/60" /> briefing
          </span>
          <h2 className="mt-7 text-5xl font-black leading-[.88] tracking-[-0.08em] text-white md:text-6xl [font-family:var(--font-space-grotesk)]">
            Contame qué querés que la web haga por tu negocio.
          </h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-slate-300">
            Con eso podemos pensar si conviene una landing, una web institucional, una automatización o algo más a medida.
          </p>

          <div className="mt-10 space-y-3">
            {[
              { icon: Target, title: "Objetivo", text: "consulta, venta, marca o sistema" },
              { icon: MessageSquareText, title: "Mensaje", text: "qué tiene que entender el cliente" },
              { icon: Mail, title: "Contacto", text: "te respondemos por mail" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/24 p-4">
                <Icon className="h-5 w-5 text-[#8bdcff]" />
                <div>
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="text-xs font-bold text-slate-400">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-10">
          {!open ? (
            <div className="flex min-h-[520px] flex-col justify-center rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 md:p-12">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/35">siguiente paso</p>
              <h3 className="mt-5 max-w-2xl text-4xl font-black leading-[.9] tracking-[-0.06em] text-white md:text-6xl [font-family:var(--font-space-grotesk)]">
                Hagamos un diagnóstico rápido antes de diseñar.
              </h3>
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-300">
                No hace falta que tengas todo definido. Con tu rubro, objetivo y una referencia ya se puede empezar a orientar la propuesta.
              </p>
              <div className="mt-9">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-black text-[#02050d] transition hover:-translate-y-0.5 hover:bg-[#e9fbff]"
                >
                  Abrir briefing <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4">
              <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden="true" />

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nombre" value={form.name} onChange={set("name")} placeholder="Tu nombre" required inputRef={nameRef} />
                <Field label="Email" value={form.email} onChange={set("email")} placeholder="tu@email.com" required type="email" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Rubro" value={form.niche} onChange={set("niche")} placeholder="Ej: servicios, ecommerce, tecnología..." />
                <Field label="Web actual" value={form.link} onChange={set("link")} placeholder="https://tuweb.com.ar" />
              </div>

              <Field label="Qué querés lograr" value={form.goal} onChange={set("goal")} placeholder="Ej: recibir consultas, mostrar servicios, vender más..." />

              <div>
                <label className="text-sm font-black text-white">Detalles</label>
                <textarea
                  value={form.details}
                  onChange={set("details")}
                  rows={6}
                  className="mt-2 w-full rounded-[1.35rem] border border-white/10 bg-black/30 px-5 py-4 font-semibold text-white outline-none placeholder:text-slate-600 focus:border-[#8bdcff]/50"
                  placeholder="Contanos qué te gustaría incluir, qué referencia tenés o qué necesitás resolver."
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-black text-[#02050d] transition hover:-translate-y-0.5 hover:bg-[#e9fbff] disabled:opacity-60"
                >
                  {state === "loading" ? "Enviando..." : "Enviar briefing"} <ArrowUpRight className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/15 bg-white/[0.055] px-7 py-4 text-sm font-black text-white transition hover:border-[#8bdcff]/35"
                >
                  Cerrar
                </button>
              </div>

              <div className="text-sm font-semibold">
                {state === "ok" && <span className="text-emerald-300">{msg}</span>}
                {state === "error" && <span className="text-red-300">{msg}</span>}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  inputRef,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  inputRef?: Ref<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="text-sm font-black text-white">{label}</label>
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
        className="mt-2 w-full rounded-[1.35rem] border border-white/10 bg-black/30 px-5 py-4 font-semibold text-white outline-none placeholder:text-slate-600 focus:border-[#8bdcff]/50"
        placeholder={placeholder}
      />
    </div>
  );
}
