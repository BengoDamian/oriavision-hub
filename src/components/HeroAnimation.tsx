"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calculator, FileText, MonitorSmartphone, TrendingUp } from "lucide-react";

const floatA = { y: [0, -18, 0], rotate: [-1.5, 1.5, -1.5] };
const floatB = { y: [0, 16, 0], rotate: [1, -2, 1] };
const floatC = { y: [0, -12, 0], x: [0, 8, 0] };

export default function HeroAnimation() {
  const reduceMotion = useReducedMotion();
  const transitionSlow = reduceMotion ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" as const };
  const transitionMedium = reduceMotion ? {} : { duration: 5, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
      <motion.div
        className="absolute left-[5%] top-[20%] w-[245px] rounded-[1.8rem] border border-white/80 bg-white/85 p-5 text-left shadow-2xl shadow-blue-900/10 backdrop-blur-xl"
        animate={reduceMotion ? undefined : floatA}
        transition={transitionSlow}
      >
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-brand-600 shadow-inner">
          <Calculator className="h-6 w-6" />
        </div>
        <div className="text-xs font-black uppercase tracking-[0.22em] text-brand-600">Calculadora ML</div>
        <div className="mt-2 text-3xl font-black text-slate-900">+ Margen</div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-brand-600"
            initial={{ width: "35%" }}
            animate={reduceMotion ? undefined : { width: ["35%", "82%", "55%", "35%"] }}
            transition={reduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[7%] top-[23%] w-[265px] rounded-[1.8rem] border border-white/80 bg-white/85 p-5 text-left shadow-2xl shadow-blue-900/10 backdrop-blur-xl"
        animate={reduceMotion ? undefined : floatB}
        transition={transitionMedium}
      >
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 shadow-inner">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div className="text-xs font-black uppercase tracking-[0.22em] text-yellow-600">Precio sugerido</div>
        <div className="mt-2 text-3xl font-black text-slate-900">$ 48.990</div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Costo", "IVA", "Envío"].map((item, index) => (
            <motion.div
              key={item}
              className="rounded-xl bg-slate-50 px-3 py-2 text-center text-[11px] font-extrabold text-slate-600"
              animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6], y: [0, -3, 0] }}
              transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, delay: index * 0.35, ease: "easeInOut" }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[18%] left-[12%] flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-5 py-4 shadow-xl shadow-blue-900/10 backdrop-blur-xl"
        animate={reduceMotion ? undefined : floatC}
        transition={reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <FileText className="h-5 w-5" />
        </span>
        <span className="text-sm font-black text-slate-900">Prompts y guías</span>
      </motion.div>

      <motion.div
        className="absolute bottom-[17%] right-[13%] flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-5 py-4 shadow-xl shadow-blue-900/10 backdrop-blur-xl"
        animate={reduceMotion ? undefined : { y: [0, 14, 0], x: [0, -8, 0] }}
        transition={reduceMotion ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-brand-600">
          <MonitorSmartphone className="h-5 w-5" />
        </span>
        <span className="text-sm font-black text-slate-900">Webs a medida</span>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[58%] h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-brand-600/10"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-600 shadow-[0_0_22px_rgba(37,99,235,0.55)]" />
        <span className="absolute bottom-8 right-12 h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.55)]" />
      </motion.div>
    </div>
  );
}
