import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos del servicio | Oriavision Inbox",
  description:
    "Términos y condiciones de uso de Oriavision Inbox, el bot de Telegram para vendedores de MercadoLibre.",
  alternates: { canonical: "/inbox/terminos/" },
};

export default function InboxTerminos() {
  return (
    <div className="container max-w-3xl py-20 sm:py-24">
      <Link
        href="/inbox/"
        className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Oriavision Inbox
      </Link>

      <h1 className="mt-6 text-4xl font-black text-textStrong">
        Términos del servicio
      </h1>

      <p className="mt-6 leading-relaxed font-medium text-textBody">
        Estos términos regulan el uso de <strong>Oriavision Inbox</strong>, un bot
        de Telegram desarrollado por Oriavision para ayudar a vendedores de
        MercadoLibre a gestionar sus mensajes y preguntas. Al usar el servicio,
        aceptás estos términos.
      </p>

      <div className="mt-8 space-y-6 leading-relaxed font-medium text-textBody">
        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            1) Servicio independiente
          </h2>
          <p>
            Oriavision Inbox es una herramienta independiente. No está afiliada,
            asociada, autorizada ni respaldada oficialmente por MercadoLibre. La
            marca “MercadoLibre” se menciona únicamente de forma descriptiva, para
            identificar a qué vendedores está orientada la herramienta. No somos
            MercadoLibre ni un partner oficial (todavía).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            2) Uso del servicio
          </h2>
          <p>
            El servicio se ofrece para gestionar consultas y mensajes vinculados a
            tu operación comercial. Te comprometés a usarlo de forma lícita, sin
            vulnerar derechos de terceros ni los términos de las plataformas que
            utilices, incluida la de MercadoLibre.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            3) Cuenta y acceso
          </h2>
          <p>
            Para usar Oriavision Inbox podés necesitar vincular tu cuenta de
            vendedor y tu Telegram. Sos responsable de mantener la confidencialidad
            de tus accesos y de la actividad que ocurra a través de ellos. Podés
            solicitar la desconexión y la baja del servicio en cualquier momento.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            4) Disponibilidad y resultados
          </h2>
          <p>
            Trabajamos para que el servicio esté disponible y sea útil, pero no
            garantizamos resultados comerciales específicos (ventas, reputación,
            posicionamiento) ni disponibilidad ininterrumpida. Pueden existir
            tareas de mantenimiento o limitaciones de plataformas de terceros.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            5) Propiedad intelectual
          </h2>
          <p>
            El software, la marca Oriavision Inbox y sus contenidos pertenecen a
            Oriavision. No está permitido copiar, revender ni redistribuir el
            servicio sin autorización.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            6) Cambios en los términos
          </h2>
          <p>
            Podemos actualizar estos términos para mejorar el servicio. Si hay
            cambios importantes, actualizaremos la fecha de última actualización.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">7) Contacto</h2>
          <p>
            Ante cualquier duda sobre estos términos, escribinos a{" "}
            <a
              className="font-extrabold text-brand-600 hover:underline"
              href="mailto:soporte@oriavision.com.ar"
            >
              soporte@oriavision.com.ar
            </a>
            .
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm font-semibold text-textMuted">
        Última actualización: {new Date().toLocaleDateString("es-AR")}
      </p>
    </div>
  );
}
