import { Fragment } from "react";
import {
  Store,
  ShieldCheck,
  Inbox,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const STEPS = [
  { icon: Store, label: "Cuenta del vendedor", sub: "Tu operación" },
  { icon: ShieldCheck, label: "OAuth seguro", sub: "Autorización" },
  {
    icon: Inbox,
    label: "Oriavision Inbox",
    sub: "Procesa y ordena",
    highlight: true,
  },
  { icon: MessageSquare, label: "Grupo de Telegram", sub: "Te llega el aviso" },
  { icon: CheckCircle2, label: "Respuesta confirmada", sub: "Vos aprobás" },
];

/** Diagrama de flujo: horizontal en desktop, vertical en mobile. */
export default function InboxFlowVisual() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5 sm:p-7">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {STEPS.map((s, i) => (
          <Fragment key={s.label}>
            <div
              className={`flex flex-1 items-center gap-3 rounded-2xl border p-4 lg:flex-col lg:text-center ${
                s.highlight
                  ? "border-brand-600/30 bg-brand-50 shadow-sm shadow-brand-600/10"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  s.highlight
                    ? "bg-brand-600 text-white"
                    : "bg-brand-50 text-brand-600"
                }`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div className="lg:mt-1">
                <p className="text-sm font-black leading-tight text-textStrong">
                  {s.label}
                </p>
                <p className="text-xs font-semibold text-textMuted">{s.sub}</p>
              </div>
            </div>

            {i < STEPS.length - 1 && (
              <div className="flex items-center justify-center lg:px-0.5">
                <ArrowRight className="hidden h-5 w-5 text-brand-400 lg:block" />
                <ArrowDown className="block h-5 w-5 text-brand-400 lg:hidden" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
