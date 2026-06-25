import Link from "next/link";
import Reveal from "@/components/Reveal";
import InboxHeroMockup from "./components/InboxHeroMockup";
import InboxFlowVisual from "./components/InboxFlowVisual";
import InboxPreviewMockup from "./components/InboxPreviewMockup";
import InboxSecurityVisual from "./components/InboxSecurityVisual";
import {
  Send,
  ArrowRight,
  ShieldCheck,
  Lock,
  MessageSquare,
  AlertTriangle,
  PackageCheck,
  Bell,
  Zap,
  Users,
  Play,
  CheckCircle2,
} from "lucide-react";

/* ── CTA principal: Solicitar / Coordinar demo ──
   (No existe CTA público de conexión directa.) */
const DEMO_WA =
  "https://wa.me/5491127575675?text=Hola%20Oriavision%21%20Quiero%20coordinar%20una%20demo%20de%20Oriavision%20Inbox%20%28bot%20de%20Telegram%20para%20vendedores%20de%20MercadoLibre%29.";
const DEMO_MAIL =
  "mailto:soporte@oriavision.com.ar?subject=Demo%20Oriavision%20Inbox&body=Hola%2C%20quiero%20coordinar%20una%20demo%20de%20Oriavision%20Inbox.";

/* Qué centraliza el bot — cada card lleva un micro-mockup de chat. */
const CENTRALIZA = [
  {
    icon: MessageSquare,
    tag: "Pregunta",
    preview: "¿Tienen stock para retirar hoy?",
    accent: "brand",
  },
  {
    icon: AlertTriangle,
    tag: "Reclamo",
    preview: "El cartucho llegó sin sellar.",
    accent: "amber",
  },
  {
    icon: PackageCheck,
    tag: "Mensaje postventa",
    preview: "¿Cómo coordino la devolución?",
    accent: "brand",
  },
  {
    icon: Bell,
    tag: "Alerta",
    preview: "Pregunta sin responder hace 2 h.",
    accent: "amber",
  },
  {
    icon: Zap,
    tag: "Respuesta rápida",
    preview: "/stock · /envio · /horario",
    accent: "brand",
  },
  {
    icon: Users,
    tag: "Equipo",
    preview: "3 agentes respondiendo en el grupo.",
    accent: "brand",
  },
] as const;

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
    a: "Sí. La conexión usa OAuth: nunca pedimos tu contraseña, autorizás vos y podés revocar el acceso cuando quieras. Podés revisar más en nuestra página de Seguridad.",
  },
];

function CtaButtons({ center = false }: { center?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${center ? "justify-center" : ""}`}>
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

        <div className="container grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-10">
          {/* Texto */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-brand-700">
                <Send className="h-4 w-4" />
                Bot de Telegram para vendedores
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-textStrong sm:text-6xl">
                Oriavision Inbox
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-textBody sm:text-xl">
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
              <p className="mt-6 max-w-xl text-sm font-semibold leading-relaxed text-textMuted">
                Herramienta <strong>independiente</strong> de Oriavision. No somos
                MercadoLibre ni un partner oficial (todavía). “MercadoLibre” y
                “Telegram” se usan solo de forma descriptiva.
              </p>
            </Reveal>
          </div>

          {/* Mockup */}
          <Reveal delay={0.1} y={24}>
            <InboxHeroMockup />
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
              asociada ni respaldada oficialmente por MercadoLibre. Las marcas se
              mencionan únicamente para describir a qué vendedores está orientada.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUÉ CENTRALIZA ── */}
      <section className="container py-20 sm:py-24">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-black tracking-tight text-textStrong sm:text-4xl">
            Todo tu flujo de mensajes, ordenado en un solo lugar
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-textBody">
            Oriavision Inbox centraliza en Telegram lo que hoy se te dispersa entre
            pestañas y notificaciones.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CENTRALIZA.map((c, i) => {
            const amber = c.accent === "amber";
            return (
              <Reveal key={c.tag} delay={i * 0.05}>
                <div className="group h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-xl hover:shadow-brand-600/5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                        amber
                          ? "bg-amber-100 text-amber-600"
                          : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      <c.icon className="h-5 w-5" />
                    </span>
                    <p className="text-base font-black text-textStrong">{c.tag}</p>
                  </div>

                  {/* micro-mockup de chat */}
                  <div
                    className={`mt-4 rounded-2xl rounded-tl-sm border px-3.5 py-2.5 text-sm font-medium ${
                      amber
                        ? "border-amber-100 bg-amber-50 text-amber-900"
                        : "border-slate-100 bg-slate-50 text-textBody"
                    }`}
                  >
                    {c.preview}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
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

          {/* Diagrama de flujo */}
          <Reveal delay={0.05}>
            <div className="mt-10">
              <InboxFlowVisual />
            </div>
          </Reveal>

          {/* Pasos escritos */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
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

      {/* ── NO RESPONDE SOLO ── */}
      <section className="container py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-brand-700">
                <ShieldCheck className="h-4 w-4" />
                Vos tenés la última palabra
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-textStrong sm:text-4xl">
                No responde solo
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-textBody">
                Oriavision Inbox te prepara la respuesta y te la muestra como vista
                previa. <strong className="text-textStrong">Nada se envía sin tu confirmación.</strong>{" "}
                Revisás, editás y recién ahí enviás.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={24}>
            <InboxPreviewMockup />
          </Reveal>
        </div>
      </section>

      {/* ── SEGURIDAD ── */}
      <section className="bg-slate-50/70 py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-brand-700">
                <Lock className="h-4 w-4" />
                Seguridad
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-textStrong sm:text-4xl">
                Conexión segura con OAuth
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-textBody">
                Te conectás autorizando el acceso, sin entregar tu contraseña. Vos
                mantenés el control y podés revocar los permisos cuando quieras.
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

          <Reveal delay={0.08} y={24}>
            <InboxSecurityVisual />
          </Reveal>
        </div>
      </section>

      {/* ── DEMO / VIDEO ── */}
      <section className="container py-20 sm:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-black tracking-tight text-textStrong sm:text-4xl">
            Mirá Oriavision Inbox en acción
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative mx-auto mt-10 aspect-video w-full max-w-3xl overflow-hidden rounded-4xl border border-brand-700/20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 shadow-2xl shadow-brand-900/20">
            {/* textura suave */}
            <div className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />

            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-brand-700 shadow-xl ring-8 ring-white/15 transition-transform hover:scale-105">
                <Play className="h-8 w-8 translate-x-0.5 fill-current" />
              </span>
              <h3 className="mt-6 text-2xl font-black text-white sm:text-3xl">
                Demo guiada de Oriavision Inbox
              </h3>
              <p className="mt-2 text-sm font-semibold text-brand-100 sm:text-base">
                Próximamente video de funcionamiento real
              </p>
            </div>
          </div>
        </Reveal>
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
