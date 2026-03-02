"use client";

import { useEffect, useState } from "react";

export default function GoRedirect({ to, label }: { to: string; label: string }) {
  const [seconds, setSeconds] = useState(2);

  useEffect(() => {
    // contador visual
    const tick = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    // ✅ delay mayor: reduce bloqueos por redirect "instantáneo"
    const t = setTimeout(() => {
      try {
        window.location.assign(to);
      } catch {
        window.location.href = to;
      }
    }, 1700);

    return () => {
      clearTimeout(tick);
      clearTimeout(t);
    };
  }, [to]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="text-xl font-extrabold text-slate-900">
          Abriendo {label}…
        </div>

        <p className="mt-2 text-sm font-semibold text-slate-600">
          Redirigiendo en {seconds}s
        </p>

        <div className="mt-6">
          <a
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3 text-white font-extrabold hover:bg-brand-700 transition-colors w-full"
            href={to}
          >
            Abrir {label}
          </a>
        </div>

        <p className="mt-4 text-xs font-semibold text-slate-500">
          Si no abre automáticamente, tocá el botón.
        </p>
      </div>
    </main>
  );
}