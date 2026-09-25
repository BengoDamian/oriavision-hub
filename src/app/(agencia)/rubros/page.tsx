import { AgencyPage, Arrow, EXT, PageIntro, pageMetadata } from "../chrome";
import { RUBROS } from "../samples";
import { waLink } from "../shared";

export const metadata = pageMetadata({
  path: "/rubros/",
  title: "Sitios web por rubro · ORIAVISION",
  description:
    "Ideas de diseño web por actividad: barberías y peluquerías, bienestar y movimiento. Y propuestas a medida para tu rubro.",
});

export default function RubrosPage() {
  return (
    <AgencyPage>
      <PageIntro
        eyebrow="Tu actividad, tu punto de partida"
        title="Buscá por rubro."
        text="Cada actividad necesita contar algo diferente. Elegí la tuya para explorar propuestas y pensar qué debería resolver tu web."
      />
      <section className="rubros-section">
        <div className="wrap">
          <div className="rubro-grid">
            {RUBROS.map((r, i) => (
              <a className="rubro-card" href={`/inspiracion/?rubro=${r.id}`} key={r.id}>
                <span className="rubro-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{r.name}</h2>
                  <p>{r.text}</p>
                </div>
                <Arrow />
              </a>
            ))}
          </div>
          <div className="rubro-other">
            <p>¿Tu actividad no está en la lista? Podemos desarrollar una propuesta para vos.</p>
            <a
              className="btn btn-dark"
              href={waLink("Mi rubro no está en el catálogo. Quiero conversar sobre mi sitio.")}
              {...EXT}
            >
              <span>Contanos qué hacés</span>
              <Arrow />
            </a>
          </div>
        </div>
      </section>
    </AgencyPage>
  );
}
