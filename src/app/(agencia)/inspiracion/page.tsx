import { AgencyPage, PageIntro, pageMetadata } from "../chrome";
import SampleCatalog from "./SampleCatalog";

export const metadata = pageMetadata({
  path: "/inspiracion/",
  title: "Inspiración para tu sitio · ORIAVISION",
  description:
    "Explorá diseños web personalizables para uñas y belleza, barberías, cafeterías, bienestar, arquitectura y seguridad.",
});

export default function InspiracionPage() {
  return (
    <AgencyPage>
      <PageIntro
        eyebrow="Propuestas de muestra"
        title="Inspiración para tu sitio."
        text="Explorá distintos estilos. Son diseños de muestra, personalizables con tu nombre, tu contenido y las funciones de tu negocio."
      />
      <section className="catalog-section">
        <div className="wrap">
          <SampleCatalog />
          <p className="catalog-note">
            Todos son diseños de muestra personalizables; no representan clientes diferentes. Elegí una paleta para comparar cada
            variante. Las opciones con publicación pendiente pueden verse acá, pero no se habilitan para explorar hasta que su acceso sea público.
          </p>
        </div>
      </section>
    </AgencyPage>
  );
}
