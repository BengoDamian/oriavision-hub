import {
  Bot,
  ShoppingBag,
  ExternalLink,
  Reply,
  Send,
  X,
} from "lucide-react";

/**
 * Mockup visual del grupo de Telegram (ilustrativo, NO funcional).
 * No usa logos oficiales: los íconos son genéricos y la marca es Oriavision Inbox.
 */
export default function InboxHeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* glow de fondo */}
      <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[2.75rem] bg-gradient-to-tr from-brand-200/60 via-brand-100/40 to-transparent blur-2xl" />

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-brand-900/10 ring-1 ring-black/5">
        {/* Header del chat */}
        <div className="flex items-center gap-3 bg-brand-600 px-4 py-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <Bot className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black leading-tight">
              Grupo de atención
            </p>
            <p className="truncate text-[11px] font-semibold text-brand-100">
              Oriavision Inbox · bot activo
            </p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> En línea
          </span>
        </div>

        {/* Cuerpo del chat */}
        <div className="space-y-3 bg-slate-50 px-4 py-5">
          {/* Mensaje del bot: nueva pregunta */}
          <div className="max-w-[90%] rounded-2xl rounded-tl-md border border-slate-200 bg-white p-3 shadow-sm">
            <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-brand-600">
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-500" />
              Nueva pregunta recibida
            </p>

            {/* Producto */}
            <div className="mt-2 flex items-center gap-2 rounded-xl bg-slate-50 p-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <p className="text-xs font-bold leading-tight text-textStrong">
                Cartucho HP 667 Negro Original
              </p>
            </div>

            {/* Consulta */}
            <p className="mt-2 text-sm font-medium text-textBody">
              “Hola, ¿tienen stock para retirar hoy?”
            </p>

            {/* Botones visuales */}
            <div className="mt-3 flex gap-2">
              <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-extrabold text-white">
                <Reply className="h-3.5 w-3.5" /> Responder
              </span>
              <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-600">
                <ExternalLink className="h-3.5 w-3.5" /> Ver publicación
              </span>
            </div>
          </div>

          {/* Respuesta rápida (comando) */}
          <div className="flex justify-end">
            <span className="inline-flex items-center rounded-2xl rounded-tr-md bg-brand-600 px-3 py-1.5 text-sm font-bold text-white shadow-sm">
              /stock
            </span>
          </div>

          {/* Vista previa de respuesta */}
          <div className="max-w-[90%] rounded-2xl rounded-tl-md border border-dashed border-brand-300 bg-brand-50/70 p-3">
            <p className="text-[11px] font-black uppercase tracking-wide text-brand-600">
              Vista previa
            </p>
            <p className="mt-1.5 text-sm font-medium text-textBody">
              Sí, tenemos stock disponible. Podés realizar la compra y
              coordinamos el retiro.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-extrabold text-white">
                <Send className="h-3.5 w-3.5" /> Enviar respuesta
              </span>
              <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-500">
                <X className="h-3.5 w-3.5" /> Cancelar
              </span>
            </div>
          </div>
        </div>

        {/* Aclaración */}
        <div className="border-t border-slate-100 bg-white px-4 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Mockup ilustrativo · no funcional
        </div>
      </div>
    </div>
  );
}
