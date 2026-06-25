import {
  ShieldCheck,
  KeyRound,
  UserCheck,
  RotateCcw,
  Headphones,
  Check,
} from "lucide-react";

const ITEMS = [
  {
    icon: KeyRound,
    title: "No pedimos tu contraseña",
    text: "Nunca manejamos ni almacenamos tus credenciales de acceso.",
  },
  {
    icon: UserCheck,
    title: "Autorización del vendedor",
    text: "Vos autorizás el acceso mediante una conexión OAuth segura.",
  },
  {
    icon: RotateCcw,
    title: "Permisos revocables",
    text: "Podés revocar el acceso cuando quieras, sin trámites.",
  },
  {
    icon: Headphones,
    title: "Implementación asistida",
    text: "Te acompañamos paso a paso en toda la puesta en marcha.",
  },
];

/** Panel checklist de seguridad OAuth (escudo + tildes). */
export default function InboxSecurityVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8">
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-100/50 blur-3xl" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-brand-700">
            Conexión OAuth
          </p>
          <p className="text-xs font-semibold text-textMuted">
            Acceso seguro, sin compartir claves
          </p>
        </div>
      </div>

      <ul className="relative mt-6 space-y-3">
        {ITEMS.map((it) => (
          <li
            key={it.title}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-4 w-4" />
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-black text-textStrong">
                <it.icon className="h-4 w-4 text-brand-600" />
                {it.title}
              </p>
              <p className="mt-0.5 text-xs font-medium text-textBody">{it.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
