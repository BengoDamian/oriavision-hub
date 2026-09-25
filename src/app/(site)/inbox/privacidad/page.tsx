import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de privacidad | Oriavision Inbox",
  description:
    "Cómo Oriavision Inbox trata tus datos: qué información usa, para qué y cómo mantenés el control.",
  alternates: { canonical: "/inbox/privacidad/" },
};

export default function InboxPrivacidad() {
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
        Política de privacidad
      </h1>

      <p className="mt-6 leading-relaxed font-medium text-textBody">
        En <strong>Oriavision Inbox</strong> cuidamos tu información. Esta política
        explica qué datos tratamos para que el bot de Telegram funcione, con qué
        finalidad y cómo podés ejercer el control sobre ellos.
      </p>

      <div className="mt-8 space-y-6 leading-relaxed font-medium text-textBody">
        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            1) Quién es responsable
          </h2>
          <p>
            El responsable del tratamiento es Oriavision. Oriavision Inbox es una
            herramienta independiente y no representa a MercadoLibre; la marca se
            menciona solo de forma descriptiva.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            2) Qué datos tratamos
          </h2>
          <p>
            - Datos de contacto que nos brindás al solicitar una demo (por ejemplo:
            nombre, email, teléfono).
            <br />- Datos técnicos mínimos para vincular tu Telegram y tu cuenta de
            vendedor.
            <br />- Mensajes y preguntas de tu operación que el servicio procesa
            para mostrártelos y permitirte responder.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            3) Para qué usamos los datos
          </h2>
          <p>
            - Hacer funcionar el servicio (recibir, mostrar y responder mensajes).
            <br />- Brindar soporte y atención.
            <br />- Mejorar la herramienta y su seguridad.
            <br />
            No vendemos tu información ni la usamos para enviarte spam.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            4) Conservación y seguridad
          </h2>
          <p>
            Conservamos los datos el tiempo necesario para prestar el servicio.
            Aplicamos medidas de seguridad razonables, como conexiones cifradas y
            accesos limitados a lo necesario. Podés ampliar en nuestra{" "}
            <Link
              href="/inbox/seguridad/"
              className="font-extrabold text-brand-600 hover:underline"
            >
              página de seguridad
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            5) Terceros
          </h2>
          <p>
            El servicio se apoya en plataformas de terceros (por ejemplo, Telegram y
            MercadoLibre), que tienen sus propias políticas de privacidad. Te
            recomendamos revisarlas. No controlamos el tratamiento que esas
            plataformas hacen de tus datos.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-black text-textStrong">
            6) Tus derechos
          </h2>
          <p>
            Podés solicitar acceder, actualizar o eliminar tus datos, y desconectar
            o dar de baja el servicio en cualquier momento. Para ejercer estos
            derechos, escribinos a{" "}
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
