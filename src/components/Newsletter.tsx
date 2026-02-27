"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Sparkles } from "lucide-react";

export default function LeadMagnet() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const shakeClass = useMemo(() => {
    return state === "error" ? "animate-[shake_220ms_ease-in-out_1]" : "";
  }, [state]);

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
      setMsg("Listo ✅ Te mandamos el contenido por mail.");
      setEmail("");

      // ✅ Conversión medible
      setTimeout(() => {
        router.push("/gracias?src=leadmagnet");
      }, 350);
    } catch {
      setState("error");
      setMsg("No se pudo suscribir.");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="relative">
        <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-brand-600/20 via-yellow-200/20 to-brand-600/20 blur-2xl opacity-60 motion-reduce:opacity-40 animate-[pulseSoft_4.5s_ease-in-out_infinite] motion-reduce:animate-none" />

        <div className="relative rounded-[2rem] p-[2px] bg-[length:200%_200%] bg-gradient-to-r from-brand-600/50 via-yellow-200/40 to-brand-600/50 animate-[borderFlow_7s_ease-in-out_infinite] motion-reduce:animate-none">
          <div
            className={[
              "relative overflow-hidden rounded-[calc(2rem-2px)] border border-slate-200 bg-white/85 backdrop-blur p-5 sm:p-6 shadow-sm",
              "transition-transform duration-300 hover:-translate-y-[2px]",
              shakeClass,
            ].join(" ")}
          >
            {/* Shine sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[calc(2rem-2px)]">
              <div className="absolute -left-1/2 top-[-20%] h-[140%] w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-50 animate-[shine_3.2s_ease-in-out_infinite] motion-reduce:animate-none" />
            </div>

            {/* Header */}
            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-700">
                    Gratis
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-extrabold text-slate-900 shadow-sm motion-reduce:shadow-none animate-[float_4.2s_ease-in-out_infinite] motion-reduce:animate-none">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    Guías + Prompts
                  </span>
                </div>

                <div className="mt-3 flex items-start gap-3">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-2xl bg-brand-600/10 blur-md animate-[pulseSoft_3.8s_ease-in-out_infinite] motion-reduce:animate-none" />
                    <div className="relative w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-brand-600" />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900">
                      Guías + Prompts que Usamos Todos los Días
                    </div>
                    <p className="mt-1 text-sm font-semibold text-textBody">
                      Contenido semanal para vender mejor. Corto, accionable y sin humo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="relative mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:flex-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Tu email"
                  className="w-full rounded-full border-2 border-slate-200 px-5 py-3 text-slate-900 font-semibold outline-none focus:border-brand-600 bg-white"
                  required
                />
                <div className="pointer-events-none absolute inset-0 rounded-full ring-0 ring-brand-600/20 transition-all focus-within:ring-4" />
              </div>

              <button
                type="submit"
                disabled={state === "loading"}
                className="group relative rounded-full bg-brand-600 hover:bg-brand-700 px-8 py-3 text-white font-extrabold transition-colors disabled:opacity-60 overflow-hidden"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_2.2s_ease-in-out_infinite] motion-reduce:animate-none" />
                </span>

                <span className="relative inline-flex items-center gap-2">
                  {state === "loading" && (
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  )}
                  {state === "loading" ? "Sumando..." : "Suscribirme Gratis"}
                </span>
              </button>
            </form>

            {/* Status */}
            <div className="relative mt-3 text-sm font-semibold">
              {state === "ok" && <span className="text-emerald-700">{msg}</span>}
              {state === "error" && <span className="text-red-600">{msg}</span>}
            </div>

            <p className="relative mt-2 text-xs font-semibold text-slate-500">
              Podés darte de baja cuando quieras.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseSoft {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.75; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes shine {
          0% { transform: translateX(-130%) rotate(12deg); }
          100% { transform: translateX(130%) rotate(12deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-2px); }
        }
      `}</style>
    </div>
  );
}