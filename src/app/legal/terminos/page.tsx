export default function Terminos() {
  return (
    <div className="container py-24 max-w-3xl">
      <h1 className="text-4xl font-black mb-6 text-textStrong">Términos y Condiciones</h1>

      <p className="text-textBody leading-relaxed mb-8 font-medium">
        Al usar este sitio, aceptás estos términos. El objetivo de Oriavision es brindar
        recursos y herramientas para vendedores, de forma clara y transparente.
      </p>

      <div className="space-y-6 text-textBody leading-relaxed font-medium">
        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">1) Uso del sitio</h2>
          <p>
            Podés usar el sitio y sus recursos para fines personales o comerciales.
            No está permitido copiar, revender o redistribuir contenido/prompt sin autorización.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">2) Información y resultados</h2>
          <p>
            Las herramientas y contenidos buscan ayudar, pero no garantizamos resultados
            comerciales específicos (ventas, ranking, rentabilidad). La decisión final
            siempre es del usuario.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">3) Enlaces a terceros</h2>
          <p>
            Algunas secciones pueden dirigir a sitios externos (por ejemplo, la Calculadora ML).
            No controlamos el contenido o disponibilidad de plataformas de terceros.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">4) Cambios</h2>
          <p>
            Podemos actualizar el sitio y estos términos para mejorar la experiencia.
            Si hay cambios importantes, actualizaremos la fecha de “última actualización”.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">5) Contacto</h2>
          <p>
            Si tenés dudas sobre estos términos, escribinos a:{" "}
            <a className="text-brand-600 font-extrabold hover:underline" href="mailto:contacto@oriavision.com">
              contacto@oriavision.com
            </a>
          </p>
        </section>
      </div>

      <p className="text-textMuted text-sm font-semibold mt-10">
        Última actualización: {new Date().toLocaleDateString("es-AR")}
      </p>
    </div>
  );
}