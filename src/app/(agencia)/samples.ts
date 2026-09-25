// Diseños de muestra y su estado de publicación.
// Las demos restringidas se muestran como pendientes, sin un enlace de exploración engañoso.

export const RUBROS = [
  {
    id: "unas",
    name: "Uñas y belleza",
    text: "Servicios, estilos, colores y una experiencia visual pensada para convertir visitas en consultas.",
  },
  {
    id: "barberias",
    name: "Barberías y peluquerías",
    text: "Servicios, profesionales, turnos y una identidad con carácter.",
  },
  {
    id: "cafeterias",
    name: "Cafeterías y gastronomía",
    text: "Propuestas, carta, ambiente y llamados a la acción para atraer nuevas visitas.",
  },
  {
    id: "bienestar",
    name: "Bienestar y movimiento",
    text: "Clases, disciplinas, profesionales y horarios.",
  },
] as const;

export type RubroId = (typeof RUBROS)[number]["id"];

export const SAMPLES: {
  rubro: RubroId;
  title: string;
  contactName: string;
  text: string;
  href: string;
  swatches: [string, string, string];
  preview?: string;
  previewAlt?: string;
  public: boolean;
}[] = [
  {
    rubro: "unas",
    title: "Art Nails · Limón",
    contactName: "Art Nails Limón",
    text: "Una variante fresca y luminosa para presentar servicios de uñas, trabajos destacados y consultas.",
    href: "https://art-nails-limon.ercasa.chatgpt.site/",
    swatches: ["#DCEB3F", "#FFFBEA", "#194A39"],
    preview: "/catalog/art-nails-limon.png",
    previewAlt: "Portada del diseño de muestra Art Nails Limón",
    public: true,
  },
  {
    rubro: "unas",
    title: "Art Nails · Tornasol",
    contactName: "Art Nails Tornasol",
    text: "Una propuesta iridiscente y delicada para un estudio de uñas con una identidad visual singular.",
    href: "https://art-nails-tornasol.ercasa.chatgpt.site/",
    swatches: ["#C9B8FF", "#F8F2FF", "#6E4B8B"],
    preview: "/catalog/art-nails-tornasol.png",
    previewAlt: "Portada del diseño de muestra Art Nails Tornasol",
    public: true,
  },
  {
    rubro: "unas",
    title: "Art Nails · Vibrante",
    contactName: "Art Nails Vibrante",
    text: "Una versión enérgica y expresiva para mostrar diseños, servicios y llamados a reservar.",
    href: "https://art-nails-vibrante.ercasa.chatgpt.site/",
    swatches: ["#FF4F87", "#FFF2F7", "#7E2046"],
    preview: "/catalog/art-nails-vibrante.png",
    previewAlt: "Portada del diseño de muestra Art Nails Vibrante",
    public: true,
  },
  {
    rubro: "unas",
    title: "Art Nails · Tropical",
    contactName: "Art Nails Tropical",
    text: "Una alternativa colorida y relajada para comunicar creatividad, cuidado y personalidad.",
    href: "https://art-nails-tropical.ercasa.chatgpt.site/",
    swatches: ["#24B88B", "#FFF2B2", "#ED6B4D"],
    preview: "/catalog/art-nails-tropical.png",
    previewAlt: "Portada del diseño de muestra Art Nails Tropical",
    public: true,
  },
  {
    rubro: "barberias",
    title: "Barbería · Próceres",
    contactName: "Barbería Próceres",
    text: "Una barbería tradicional con servicios, elección de barbero y sistema de reservas online.",
    href: "https://peluqueria.oriavision.com.ar/",
    // Colores del propio sitio: fondo, papel y dorado.
    swatches: ["#151614", "#F6F4EC", "#F2CD65"],
    preview: "/catalog/proceres.png",
    previewAlt: "Portada del diseño de muestra Barbería Próceres",
    public: true,
  },
  {
    rubro: "barberias",
    title: "Barbería · Turquesa",
    contactName: "Barbería Turquesa",
    text: "Una variante moderna y fresca para destacar cortes, equipo profesional y vías de consulta.",
    href: "https://barberia-turquesa.ercasa.chatgpt.site/",
    swatches: ["#25B7A5", "#EAFBF7", "#173C3A"],
    preview: "/catalog/barberia-turquesa.png",
    previewAlt: "Portada del diseño de muestra Barbería Turquesa",
    public: true,
  },
  {
    rubro: "barberias",
    title: "Barbería · Verde",
    contactName: "Barbería Verde",
    text: "Una propuesta sobria y contemporánea para ordenar servicios, profesionales y llamados a reservar.",
    href: "https://barberia-verde.ercasa.chatgpt.site/",
    swatches: ["#275B45", "#F1F4E9", "#C3A85F"],
    preview: "/catalog/barberia-verde.png",
    previewAlt: "Portada del diseño de muestra Barbería Verde",
    public: true,
  },
  {
    rubro: "barberias",
    title: "Barbería · Azul",
    contactName: "Barbería Azul",
    text: "Una alternativa de perfil clásico y limpio para presentar el oficio, los servicios y el equipo.",
    href: "https://barberia-azul.ercasa.chatgpt.site/",
    swatches: ["#164B73", "#EDF5FA", "#D4A94D"],
    preview: "/catalog/barberia-azul.png",
    previewAlt: "Portada del diseño de muestra Barbería Azul",
    public: true,
  },
  {
    rubro: "cafeterias",
    title: "Cafetería · Buen Rato",
    contactName: "Buen Rato Café",
    text: "Una propuesta cálida para contar el concepto del café, presentar la carta e invitar a visitarlo.",
    href: "https://buen-rato-cafe.ercasa.chatgpt.site/",
    swatches: ["#6D3F27", "#F5E7D1", "#C88842"],
    preview: "/catalog/buen-rato-cafe.png",
    previewAlt: "Portada del diseño de muestra Buen Rato Café",
    public: true,
  },
  {
    rubro: "bienestar",
    title: "Pilates · Aluna",
    contactName: "Pilates Aluna",
    text: "Un estudio de Pilates Reformer, Mat y sesiones personales, con clases y agenda de turnos.",
    href: "https://pilates.oriavision.com.ar/",
    // Colores del propio sitio: verde, lino y arena.
    swatches: ["#294D42", "#F5F1E8", "#D8C7AC"],
    preview: "/catalog/aluna.png",
    previewAlt: "Portada del diseño de muestra Pilates Aluna",
    public: true,
  },
];
