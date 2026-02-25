export default function Privacidad() {
  return (
    <div className="container py-24 max-w-3xl">
      <h1 className="text-4xl font-black mb-6 text-textStrong">Política de Privacidad</h1>

      <p className="text-textBody leading-relaxed mb-8 font-medium">
        En Oriavision valoramos tu privacidad. Esta política explica qué datos podemos
        recopilar cuando visitás nuestro sitio y cómo los usamos.
      </p>

      <div className="space-y-6 text-textBody leading-relaxed font-medium">
        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">1) Datos que recopilamos</h2>
          <p>
            - Datos de navegación (por ejemplo: páginas visitadas, dispositivo, país/ciudad aproximados).
            <br />
            - Datos que nos enviás si nos contactás (por ejemplo: nombre, email, mensaje).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">2) Para qué usamos los datos</h2>
          <p>
            - Mejorar el sitio y la experiencia de uso.
            <br />
            - Responder consultas y soporte.
            <br />
            - Medir rendimiento y entender qué contenido es más útil.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">3) Cookies y analítica</h2>
          <p>
            Podemos usar cookies o herramientas de analítica para entender el uso del sitio.
            No vendemos tus datos ni los usamos para enviarte spam.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">4) Terceros</h2>
          <p>
            Si el sitio enlaza a herramientas externas (por ejemplo, la Calculadora ML),
            esas plataformas pueden tener sus propias políticas. Te recomendamos revisarlas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-textStrong mb-2">5) Contacto</h2>
          <p>
            Si querés consultar, actualizar o eliminar información vinculada a tu contacto,
            escribinos a:{" "}
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