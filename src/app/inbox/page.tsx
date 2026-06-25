import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  MessageSquare,
  Zap,
  Bell,
  Clock,
  ShieldCheck,
  LineChart,
  Send,
  Lock,
  EyeOff,
  KeyRound,
  Server,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ── CTA principal: Solicitar / Coordinar demo ──
   (No existe botón público de "Conectar MercadoLibre".) */
const DEMO_WA =
  "https://wa.me/5491127575675?text=Hola%20Oriavision%21%20Quiero%20coordinar%20una%20demo%20de%20Oriavision%20Inbox%20%28bot%20de%20Telegram%20para%20vendedores%20de%20MercadoLibre%29.";
const DEMO_MAIL =
  "mailto:soporte@oriavision.com.ar?subject=Demo%20Oriavision%20Inbox&body=Hola%2C%20quiero%20coordinar%20una%20demo%20de%20Oriavision%20Inbox.";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Todo en Telegram",
    text: "Recibí y respondé las consultas de tus compras y ventas desde un chat que ya usás todos los días, sin instalar nada nuevo.",
  },
  {
    icon: Bell,
    title: "Avisos al instante",
    text: "Te notifica cada pregunta o mensaje nuevo apenas entra, para que no se te escape ninguna oportunidad de venta.",
  },
  {
    icon: Zap,
    title: "Respuestas más rápidas",
    text: "Plantillas y respuestas guardadas para contestar en segundos las preguntas que más se repiten.",
  },
  {
    icon: Clock,
    title: "Menos tiempo perdido",
    text: "Dejá de saltar entre pestañas y notificaciones. Todo el flujo de mensajes llega ordenado a un solo lugar.",
  },
  {
    icon: LineChart,
    title: "Más ventas cerradas",
    text: "Responder a tiempo mejora tu reputación y tu posición. Contestar rápido vende más.",
  },
  {
    icon: ShieldCheck,
    title: "Pensado para vendedores",
    text: "Hecho por y para vendedores que manejan volumen y no quieren perder ni una consulta.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Coordinás una demo",
    text: "Nos escribís, te mostramos cómo funciona Oriavision Inbox y resolvemos tus dudas. Sin compromiso.",
  },
  {
    n: "2",
    title: "Configuramos tu cuenta",
    text: "Te ayudamos con la puesta en marcha y la conexión con tu operación de MercadoLibre, paso a paso.",
  },
  {
    n: "3",
    title: "Recibís todo en Telegram",
    text: "Las preguntas y mensajes de tus ventas empiezan a llegarte al bot, listos para responder al toque.",
  },
];

const SECURITY = [
  {
    icon: Lock,
    title: "Conexión cifrada",
    text: "La comunicación viaja cifrada de punta a punta entre la plataforma y Telegram.",
  },
  {
    icon: EyeOff,
    title: "No vendemos tus datos",
    text: "Tu información se usa solo para que la herramienta funcione. Nunca la comercializamos.",
  },
  {
    icon: KeyRound,
    title: "Accesos controlados",
    text: "El bot solo accede a lo necesario para mostrarte mensajes y preguntas de tu operación.",
  },
  {
    icon: Server,
    title: "Podés revocar cuando quieras",
    text: "Vos mantenés el control: podés desconectar y solicitar la baja del servicio en cualquier momento.",
  },
];

const FAQ = [
  {
    q: "¿Oriavision Inbox es de MercadoLibre?",
    a: "No. Oriavision Inbox es una herramienta independiente, desarrollada por Oriavision. No somos MercadoLibre ni un partner oficial (todavía). “MercadoLibre” se menciona únicamente de forma descriptiva, para indicar a qué vendedores ayuda la herramienta.",
  },
  {
    q: "¿Qué necesito para usarlo?",
    a: "Tener una cuenta de vendedor en MercadoLibre y Telegram instalado. En la demo te mostramos la puesta en marcha completa.",
  },
  {
    q: "¿Tengo que instalar algo?",
    a: "No hace falta instalar software adicional: trabajás directamente desde tu Telegram, que probablemente ya tengas en el celular y en la compu.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Coordinás una demo con nosotros. Te mostramos cómo funciona y, si te sirve, te acompañamos en la configuración.",
  },
  {
    q: "¿Es seguro?",
    a: "Sí. Usamos conexiones cifradas, accesos limitados a lo necesario y no vendemos tu información. Podés revisar más en nuestra página de Seguridad.",
  },
];

function CtaButtons({ center = false }: { center?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row ${
        center ? "justify-center" : ""
      }`}
    >
      <a
        href={DEMO_WA}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand-600/20 transition-colors hover:bg-brand-700"
      >
        Solicitar demo
        <ArrowRight className="h-5 w-5" />
      </a>
      <a
        href={DEMO_MAIL}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-600/20 bg-brand-50 px-7 py-3.5 text-base font-extrabold text-brand-700 transition-colors hover:border-brand-600 hover:bg-white"
      >
        Coordinar demo por email
      </a>
    </div>
  );
}

export default function InboxLanding() {
  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
        <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />

        <div className="container py-20 sm:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-brand-700">
              <Send className="h-4 w-4" />
              Bot de Telegram para vendedores
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-textStrong sm:text-6xl">
              Oriavision Inbox
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-textBody sm:text-xl">
              El bot de Telegram que ayuda a los{" "}
              <strong className="text-textStrong">vendedores de MercadoLibre</strong>{" "}
              a responder más rápido, no perder consultas y cerrar más ventas — todo
              desde un chat que ya usás.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8">
              <CtaButtons />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-sm font-semibold leading-relaxed text-textMuted">
              Herramienta <strong>independiente</strong> de Oriavision. No somos
              MercadoLibre ni un partner oficial (todavía). “MercadoLibre” se usa
              solo de forma descriptiva.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INDEPENDENCIA / DISCLAIMER STRIP ── */}
      <section className="border-y border-slate-100 bg-slate-50/70">
        <div className="container py-8">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <ShieldCheck className="h-7 w-7 shrink-0 text-brand-600" />
            <p className="text-sm font-semibold leading-relaxed text-textBody sm:text-base">
              Oriavision Inbox es una herramienta independiente. No está afiliada,
              asociada ni respaldada oficialmente por MercadoLibre. La marca se
              menciona únicamente para describir a qué vendedores está orientada.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="container py-20 sm:py-24">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-black tracking-tight text-textStrong sm:text-4xl">
            Todo tu flujo de mensajes, ordenado en un solo lugar
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-textBody">
            Dejá de perder ventas por responder tarde. Oriavision Inbox lleva las
            preguntas y mensajes de tu operación directo a Telegram.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-xl hover:shadow-brand-600/5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-black text-textStrong">{f.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-textBody">
                  {f.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PASOS ── */}
      <section className="bg-slate-50/70 py-20 sm:py-24">
        <div className="container">
          <Reveal>
            <h2 className="text-3xl font-black tracking-tight text-textStrong sm:text-4xl">
              Cómo funciona
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-medium text-textBody">
              En tres pasos simples empezás a recibir tus consultas en Telegram.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-slate-200 bg-white p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-xl font-black text-white">
                    {s.n}
                  </span>
                  <h3 className="mt-5 text-xl font-black text-textStrong">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-textBody">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <CtaButtons />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SEGURIDAD ── */}
      <section className="container py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-brand-700">
                <Lock className="h-4 w-4" />
                Seguridad
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-textStrong sm:text-4xl">
                Tus datos, bajo control
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-textBody">
                Tratamos tu información con criterios de seguridad y privacidad
                claros. Vos siempre mantenés el control de tu cuenta.
              </p>
              <Link
                href="/inbox/seguridad/"
                className="mt-6 inline-flex items-center gap-2 text-base font-extrabold text-brand-700 hover:underline"
              >
                Ver detalle de seguridad
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {SECURITY.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-6">
                  <s.icon className="h-7 w-7 text-brand-600" />
                  <h3 className="mt-4 text-base font-black text-textStrong">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-textBody">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50/70 py-20 sm:py-24">
        <div className="container max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-black tracking-tight text-textStrong sm:text-4xl">
              Preguntas frecuentes
            </h2>
          </Reveal>

          <div className="mt-10 space-y-4">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04}>
                <details className="group rounded-2xl border border-slate-200 bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-black text-textStrong">
                    {item.q}
                    <ArrowRight className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-textBody">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="container py-20 sm:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-brand-600 px-8 py-14 text-center sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
              ¿Listo para no perder ni una venta más?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-brand-100">
              Coordiná una demo de Oriavision Inbox y descubrí cómo responder más
              rápido desde Telegram.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={DEMO_WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-brand-700 transition-transform hover:scale-105"
              >
                Solicitar demo
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={DEMO_MAIL}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-base font-extrabold text-white transition-colors hover:bg-white/10"
              >
                Escribir por email
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-brand-100">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Sin compromiso
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Herramienta independiente
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Soporte en español
              </span>
            </div>
          </div>
        </Reveal>

        {/* Enlaces legales */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-textMuted">
          <Link href="/inbox/terminos/" className="hover:text-brand-700 hover:underline">
            Términos
          </Link>
          <Link href="/inbox/privacidad/" className="hover:text-brand-700 hover:underline">
            Privacidad
          </Link>
          <Link href="/inbox/seguridad/" className="hover:text-brand-700 hover:underline">
            Seguridad
          </Link>
        </div>
      </section>
    </div>
  );
}
