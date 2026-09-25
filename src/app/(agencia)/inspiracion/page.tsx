import { AgencyPage, PageIntro, pageMetadata } from "../chrome";
import SampleCatalog from "./SampleCatalog";

export const metadata = pageMetadata({
  path: "/inspiracion/",
  title: "Inspiración para tu sitio · ORIAVISION",
  description:
    "Explorá propuestas de sitios de muestra y encontrá ideas para la identidad digital de tu negocio, con muestras para una barbería y un estudio de Pilates.",
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
            La selección se irá ampliando con nuevas propuestas. Los ejemplos no representan trabajos para clientes.
          </p>
        </div>
      </section>
    </AgencyPage>
  );
}
