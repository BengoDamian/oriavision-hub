import { Pencil, Eye, Send, X, ShieldCheck } from "lucide-react";

/**
 * Comparación visual: respuesta escrita vs. vista previa antes de enviar.
 * Deja claro que nada se envía sin confirmación. Mockup ilustrativo.
 */
export default function InboxPreviewMockup() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-brand-900/5">
      <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
        {/* Izquierda: respuesta escrita */}
        <div className="bg-white p-6">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-textMuted">
            <Pencil className="h-4 w-4 text-brand-600" /> Respuesta escrita
          </p>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium leading-relaxed text-textBody">
              Sí, tenemos stock disponible. Podés realizar la compra y
              coordinamos el retiro hoy.
              <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-brand-500 align-middle" />
            </p>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-slate-400">
            Editás el texto desde el chat
          </p>
        </div>

        {/* Derecha: vista previa */}
        <div className="bg-white p-6">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-brand-600">
            <Eye className="h-4 w-4" /> Vista previa antes de enviar
          </p>
          <div className="mt-3 rounded-2xl rounded-tl-md border border-brand-200 bg-brand-50 p-4">
            <p className="text-sm font-medium leading-relaxed text-textBody">
              Sí, tenemos stock disponible. Podés realizar la compra y
              coordinamos el retiro hoy.
            </p>
            <p className="mt-1 text-right text-[10px] font-bold text-brand-400">
              10:24
            </p>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-slate-400">
            Así lo verá el comprador
          </p>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col items-center gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-5 sm:flex-row sm:justify-between">
        <p className="inline-flex items-center gap-2 text-xs font-bold text-textBody">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Nada se envía sin tu confirmación
        </p>
        <div className="flex w-full gap-2 sm:w-auto">
          <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-extrabold text-white sm:flex-none">
            <Send className="h-4 w-4" /> Enviar
          </span>
          <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-extrabold text-slate-500 sm:flex-none">
            <X className="h-4 w-4" /> Cancelar
          </span>
        </div>
      </div>
    </div>
  );
}
