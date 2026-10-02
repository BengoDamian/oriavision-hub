import { AgencyPage, PageIntro, pageMetadata } from "../chrome";
import SampleCatalog from "../SampleCatalog";

export const metadata = pageMetadata({
  path: "/rubros/",
  title: "Explorar rubros · ORIAVISION",
  description:
    "Elegí tu rubro y explorá diseños web personalizables para uñas y belleza, barberías, cafeterías, bienestar, tatuajes, arquitectura, seguridad y veterinarias.",
});

export default function RubrosPage() {
  return (
    <AgencyPage>
      <PageIntro
        eyebrow="Diseños por actividad"
        title="Explorar rubros"
        text="Elegí un rubro y explorá sus diseños. Cada propuesta se puede personalizar con tu nombre, tu contenido y las funciones de tu negocio."
        breadcrumbs={[
          { href: "/", label: "Inicio" },
          { label: "Explorar rubros" },
        ]}
      />
      <section className="catalog-section">
        <div className="wrap">
          <SampleCatalog />
          <p className="catalog-note">
            Todos son diseños de muestra personalizables; no representan clientes diferentes. Elegí una paleta para comparar cada
            variante y explorarla en detalle.
          </p>
        </div>
      </section>
    </AgencyPage>
  );
}
