import { AgencyPage, Arrow, EXT, PageIntro, pageMetadata } from "../chrome";
import { RUBROS, SAMPLES } from "../samples";
import { waLink } from "../shared";

export const metadata = pageMetadata({
  path: "/rubros/",
  title: "Sitios web por rubro · ORIAVISION",
  description:
    "Ideas de diseño web para uñas y belleza, barberías y peluquerías, cafeterías y gastronomía, bienestar, tatuajes, arquitectura, seguridad, parrillas y herrería.",
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
            {RUBROS.map((r, i) => {
              const variants = SAMPLES.filter((sample) => sample.rubro === r.id);
              const preview = variants[0];

              return (
                <a className="rubro-card" href={`/inspiracion/?rubro=${r.id}`} key={r.id}>
                  <div className="rubro-card-preview">
                    <img src={preview.preview} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="rubro-card-copy">
                    <span className="rubro-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h2>{r.name}</h2>
                      <p>{r.text}</p>
                      <small>
                        {variants.length} {variants.length === 1 ? "diseño" : "diseños"}
                      </small>
                    </div>
                    <Arrow />
                  </div>
                </a>
              );
            })}
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
