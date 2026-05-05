import { ArrowRight, BarChart3, CheckCircle2, Database, ShieldCheck, Zap } from "lucide-react";

const metrics = [
  { label: "Precio sugerido", value: "+18%" },
  { label: "Margen neto", value: "OK" },
  { label: "Envío", value: "Auto" },
];

const nodes = [
  { className: "left-[14%] top-[22%]" },
  { className: "left-[35%] top-[44%]" },
  { className: "left-[62%] top-[26%]" },
  { className: "left-[78%] top-[58%]" },
  { className: "left-[24%] top-[72%]" },
];

export default function TechDemoPanel() {
  return (
    <div className="tech-demo-panel" aria-hidden="true">
      <div className="tech-demo-glow tech-demo-glow-one" />
      <div className="tech-demo-glow tech-demo-glow-two" />

      <div className="tech-demo-screen">
        <div className="tech-demo-grid" />
        <div className="tech-demo-scan" />

        <div className="tech-demo-topbar">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-sky-200/80">
            Oriavision Engine
          </span>
        </div>

        <div className="relative z-10 grid gap-5 p-4 sm:p-5">
          <div className="tech-demo-header">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-sky-100">
                <Zap className="h-3 w-3" />
                Demo 2D tecnológico
              </div>
              <h3 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl">
                Calculá, compará y decidí con datos claros.
              </h3>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur sm:block">
              <BarChart3 className="h-8 w-8 text-sky-200" />
            </div>
          </div>

          <div className="tech-demo-canvas">
            <svg className="tech-demo-lines" viewBox="0 0 640 300" fill="none" preserveAspectRatio="none">
              <path className="tech-line tech-line-a" d="M30 210 C130 60 240 245 345 115 C425 20 500 85 610 40" />
              <path className="tech-line tech-line-b" d="M35 78 C145 135 205 38 315 96 C420 150 472 215 610 178" />
              <path className="tech-line tech-line-c" d="M65 250 C160 205 235 205 315 232 C410 265 485 245 585 225" />
            </svg>

            {nodes.map((node, index) => (
              <span key={index} className={`tech-node ${node.className}`} />
            ))}

            <div className="tech-demo-card tech-demo-card-main">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-sky-200/80">
                  Publicación ML
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              </div>
              <div className="mt-4 h-3 w-3/4 rounded-full bg-white/15" />
              <div className="mt-3 h-3 w-1/2 rounded-full bg-white/10" />
              <div className="mt-5 flex items-end gap-2">
                <span className="h-10 flex-1 rounded-t-lg bg-sky-300/25" />
                <span className="h-16 flex-1 rounded-t-lg bg-sky-300/45" />
                <span className="h-12 flex-1 rounded-t-lg bg-sky-300/30" />
                <span className="h-20 flex-1 rounded-t-lg bg-emerald-300/50" />
              </div>
            </div>

            <div className="tech-demo-card tech-demo-card-mini">
              <div className="flex items-center gap-2 text-xs font-extrabold text-white">
                <Database className="h-4 w-4 text-sky-200" />
                Recursos listos
              </div>
              <div className="mt-3 space-y-2">
                <span className="block h-2 rounded-full bg-white/15" />
                <span className="block h-2 w-4/5 rounded-full bg-white/10" />
              </div>
            </div>

            <div className="tech-demo-card tech-demo-card-shield">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <span className="text-xs font-black text-white">Rápido + liviano</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300/80">
                  {metric.label}
                </div>
                <div className="mt-2 flex items-center justify-between text-lg font-black text-white">
                  {metric.value}
                  <ArrowRight className="h-4 w-4 text-sky-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
