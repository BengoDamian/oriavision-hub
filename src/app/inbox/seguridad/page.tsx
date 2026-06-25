import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, EyeOff, KeyRound, Server, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Seguridad | Oriavision Inbox",
  description:
    "Cómo protege Oriavision Inbox tu información: cifrado, accesos mínimos y control total de tu cuenta.",
  alternates: { canonical: "/inbox/seguridad/" },
};

const PILLARS = [
  {
    icon: Lock,
    title: "Conexiones cifradas",
    text: "La comunicación entre la plataforma y Telegram viaja cifrada, protegiendo tus mensajes en tránsito.",
  },
  {
    icon: KeyRound,
    title: "Accesos mínimos",
    text: "El servicio solo accede a lo estrictamente necesario para mostrarte y permitirte responder mensajes y preguntas.",
  },
  {
    icon: EyeOff,
    title: "Sin venta de datos",
    text: "Nunca vendemos ni comercializamos tu información. Se usa únicamente para que la herramienta funcione.",
  },
  {
    icon: Server,
    title: "Control de tu cuenta",
    text: "Podés desconectar el servicio y solicitar la baja en cualquier momento. El control siempre es tuyo.",
  },
];

export default function InboxSeguridad() {
  return (
    <div className="container max-w-3xl py-20 sm:py-24">
      <Link
        href="/inbox/"
        className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Oriavision Inbox
      </Link>

      <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-brand-700">
        <ShieldCheck className="h-4 w-4" />
        Seguridad
      </span>

      <h1 className="mt-5 text-4xl font-black text-textStrong">
        Tu información, protegida
      </h1>

      <p className="mt-6 leading-relaxed font-medium text-textBody">
        En <strong>Oriavision Inbox</strong> tratamos la seguridad como una
        prioridad. A continuación detallamos las prácticas con las que protegemos
        tus datos y tu operación.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="h-full rounded-3xl border border-slate-200 bg-white p-6"
          >
            <p.icon className="h-7 w-7 text-brand-600" />
            <h2 className="mt-4 text-lg font-black text-textStrong">{p.title}</h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-textBody">
              {p.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-6 leading-relaxed font-medium text-textBody">
        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            Herramienta independiente
          </h2>
          <p>
            Oriavision Inbox es un servicio independiente de Oriavision. No estamos
            afiliados ni respaldados oficialmente por MercadoLibre, ni somos un
            partner oficial (todavía). Mencionamos la marca solo de forma
            descriptiva.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            Buenas prácticas recomendadas
          </h2>
          <p>
            - Mantené tu Telegram y tus cuentas con verificación en dos pasos.
            <br />- No compartas tus accesos con terceros.
            <br />- Ante cualquier actividad sospechosa, desconectá el servicio y
            avisanos.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            Reportar un problema de seguridad
          </h2>
          <p>
            Si detectás una vulnerabilidad o algo que no encaja, escribinos a{" "}
            <a
              className="font-extrabold text-brand-600 hover:underline"
              href="mailto:soporte@oriavision.com.ar"
            >
              soporte@oriavision.com.ar
            </a>{" "}
            y lo revisamos lo antes posible.
          </p>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-textMuted">
        <Link href="/inbox/terminos/" className="hover:text-brand-700 hover:underline">
          Términos
        </Link>
        <Link href="/inbox/privacidad/" className="hover:text-brand-700 hover:underline">
          Privacidad
        </Link>
      </div>

      <p className="mt-8 text-sm font-semibold text-textMuted">
        Última actualización: {new Date().toLocaleDateString("es-AR")}
      </p>
    </div>
  );
}
