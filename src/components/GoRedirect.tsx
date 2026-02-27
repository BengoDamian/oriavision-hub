"use client";

import { useEffect } from "react";

export default function GoRedirect({ to, label }: { to: string; label: string }) {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = to;
    }, 350);
    return () => clearTimeout(t);
  }, [to]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-xl font-extrabold text-slate-900">
          Redirigiendo a {label}…
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Si no redirige,{" "}
          <a className="text-brand-600 underline" href={to}>
            tocá acá
          </a>
          .
        </p>
      </div>
    </main>
  );
}