// Diseños de muestra y su estado de publicación verificado.

export const RUBROS = [
  { id: "unas", name: "Uñas y belleza", text: "Servicios, estilos, colores y una experiencia visual pensada para convertir visitas en consultas." },
  { id: "barberias", name: "Barberías y peluquerías", text: "Servicios, profesionales, turnos y una identidad con carácter." },
  { id: "cafeterias", name: "Cafeterías y gastronomía", text: "Propuestas, carta, ambiente y llamados a la acción para atraer nuevas visitas." },
  { id: "bienestar", name: "Bienestar y movimiento", text: "Clases, disciplinas, profesionales y horarios." },
  { id: "arquitectura", name: "Arquitectura y seguridad", text: "Proyectos, soluciones de protección y espacios seguros explicados con claridad." },
] as const;

export type RubroId = (typeof RUBROS)[number]["id"];

export const SAMPLE_FAMILIES = [
  { id: "art-nails", title: "Art Nails" },
  { id: "barberias", title: "Barberías y peluquerías" },
  { id: "buen-rato", title: "Buen Rato Café" },
  { id: "aluna", title: "Aluna Pilates" },
  { id: "habitacion-antipanico", title: "Habitación Antipánico" },
] as const;

type FamilyId = (typeof SAMPLE_FAMILIES)[number]["id"];

export type Sample = {
  familyId: FamilyId;
  familyName: string;
  variant: string;
  rubro: RubroId;
  title: string;
  text: string;
  href: string;
  swatches: [string, string, string];
  preview: string;
  previewAlt: string;
  public: boolean;
};

export const SAMPLES: Sample[] = [
  {
    familyId: "art-nails", familyName: "Art Nails", variant: "Limón", rubro: "unas",
    title: "Art Nails · Limón",
    text: "Una variante fresca y luminosa para presentar servicios de uñas, trabajos destacados y consultas.",
    href: "https://art-nails-limon.ercasa.chatgpt.site/",
    swatches: ["#DCEB3F", "#FFFBEA", "#194A39"],
    preview: "/catalog/art-nails-limon.png", previewAlt: "Portada del diseño de muestra Art Nails Limón", public: true,
  },
  {
    familyId: "art-nails", familyName: "Art Nails", variant: "Tornasol", rubro: "unas",
    title: "Art Nails · Tornasol",
    text: "Una propuesta iridiscente y delicada para un estudio de uñas con una identidad visual singular.",
    href: "https://art-nails-tornasol.ercasa.chatgpt.site/",
    swatches: ["#C9B8FF", "#F8F2FF", "#6E4B8B"],
    preview: "/catalog/art-nails-tornasol.png", previewAlt: "Portada del diseño de muestra Art Nails Tornasol", public: true,
  },
  {
    familyId: "art-nails", familyName: "Art Nails", variant: "Vibrante", rubro: "unas",
    title: "Art Nails · Vibrante",
    text: "Una versión enérgica y expresiva para mostrar diseños, servicios y llamados a reservar.",
    href: "https://art-nails-vibrante.ercasa.chatgpt.site/",
    swatches: ["#FF4F87", "#FFF2F7", "#7E2046"],
    preview: "/catalog/art-nails-vibrante.png", previewAlt: "Portada del diseño de muestra Art Nails Vibrante", public: true,
  },
  {
    familyId: "art-nails", familyName: "Art Nails", variant: "Tropical", rubro: "unas",
    title: "Art Nails · Tropical",
    text: "Una alternativa colorida y relajada para comunicar creatividad, cuidado y personalidad.",
    href: "https://art-nails-tropical.ercasa.chatgpt.site/",
    swatches: ["#24B88B", "#FFF2B2", "#ED6B4D"],
    preview: "/catalog/art-nails-tropical.png", previewAlt: "Portada del diseño de muestra Art Nails Tropical", public: true,
  },
  {
    familyId: "barberias", familyName: "Barberías y peluquerías", variant: "Próceres", rubro: "barberias",
    title: "Barbería · Próceres",
    text: "Una barbería tradicional con servicios, elección de barbero y un recorrido de reserva de muestra.",
    href: "https://peluqueria.oriavision.com.ar/",
    swatches: ["#151614", "#F6F4EC", "#F2CD65"],
    preview: "/catalog/proceres.png", previewAlt: "Portada del diseño de muestra Barbería Próceres", public: true,
  },
  {
    familyId: "barberias", familyName: "Barberías y peluquerías", variant: "Turquesa", rubro: "barberias",
    title: "Barbería · Turquesa",
    text: "Una variante moderna y fresca para destacar cortes, equipo profesional y vías de consulta.",
    href: "https://barberia-turquesa.ercasa.chatgpt.site/",
    swatches: ["#25B7A5", "#EAFBF7", "#173C3A"],
    preview: "/catalog/barberia-turquesa.png", previewAlt: "Portada del diseño de muestra Barbería Turquesa", public: true,
  },
  {
    familyId: "barberias", familyName: "Barberías y peluquerías", variant: "Verde", rubro: "barberias",
    title: "Barbería · Verde",
    text: "Una propuesta sobria y contemporánea para ordenar servicios, profesionales y llamados a reservar.",
    href: "https://barberia-verde.ercasa.chatgpt.site/",
    swatches: ["#275B45", "#F1F4E9", "#C3A85F"],
    preview: "/catalog/barberia-verde.png", previewAlt: "Portada del diseño de muestra Barbería Verde", public: true,
  },
  {
    familyId: "barberias", familyName: "Barberías y peluquerías", variant: "Azul", rubro: "barberias",
    title: "Barbería · Azul",
    text: "Una alternativa de perfil clásico y limpio para presentar el oficio, los servicios y el equipo.",
    href: "https://barberia-azul.ercasa.chatgpt.site/",
    swatches: ["#164B73", "#EDF5FA", "#D4A94D"],
    preview: "/catalog/barberia-azul.png", previewAlt: "Portada del diseño de muestra Barbería Azul", public: true,
  },
  {
    familyId: "buen-rato", familyName: "Buen Rato Café", variant: "Original", rubro: "cafeterias",
    title: "Buen Rato Café · Original",
    text: "Una identidad cálida para presentar el concepto, la carta y la experiencia del café.",
    href: "https://buen-rato-cafe.ercasa.chatgpt.site/",
    swatches: ["#153A32", "#FFFAF3", "#A37B55"],
    preview: "/catalog/buen-rato-original.webp", previewAlt: "Portada del diseño de muestra Buen Rato Café Original", public: true,
  },
  {
    familyId: "buen-rato", familyName: "Buen Rato Café", variant: "Bosque", rubro: "cafeterias",
    title: "Buen Rato Café · Bosque",
    text: "Una paleta verde intensa con acentos cálidos para una cafetería cercana y contemporánea.",
    href: "https://buen-rato-cafe-bosque.ercasa.chatgpt.site/",
    swatches: ["#0A5A2A", "#F7F5EC", "#A94D06"],
    preview: "/catalog/buen-rato-bosque.webp", previewAlt: "Portada del diseño de muestra Buen Rato Café Bosque", public: true,
  },
  {
    familyId: "buen-rato", familyName: "Buen Rato Café", variant: "Tierra", rubro: "cafeterias",
    title: "Buen Rato Café · Tierra",
    text: "Una versión de tonos naturales y cobrizos que transmite calidez, oficio y pausa.",
    href: "https://buen-rato-cafe-tierra.ercasa.chatgpt.site/",
    swatches: ["#362A21", "#FFF9EE", "#A45832"],
    preview: "/catalog/buen-rato-tierra.webp", previewAlt: "Portada del diseño de muestra Buen Rato Café Tierra", public: true,
  },
  {
    familyId: "aluna", familyName: "Aluna Pilates", variant: "Original", rubro: "bienestar",
    title: "Aluna Pilates · Original",
    text: "Un estudio de Pilates Reformer, Mat y sesiones personales, con agenda demostrativa de turnos.",
    href: "https://pilates.oriavision.com.ar/",
    swatches: ["#294D42", "#F5F1E8", "#D8C7AC"],
    preview: "/catalog/aluna-original.webp", previewAlt: "Portada del diseño de muestra Aluna Pilates Original", public: true,
  },
  {
    familyId: "aluna", familyName: "Aluna Pilates", variant: "Blossom", rubro: "bienestar",
    title: "Aluna Pilates · Blossom",
    text: "Una variante serena con azul profundo y rosa suave para comunicar cuidado y movimiento.",
    href: "https://aluna-pilates-blossom.ercasa.chatgpt.site/",
    swatches: ["#0D3A5C", "#F7A8C1", "#F7F8F3"],
    preview: "/catalog/aluna-blossom.webp", previewAlt: "Portada del diseño de muestra Aluna Pilates Blossom", public: true,
  },
  {
    familyId: "aluna", familyName: "Aluna Pilates", variant: "Delft", rubro: "bienestar",
    title: "Aluna Pilates · Delft",
    text: "Una versión gráfica de azul y blanco con acento naranja para una presencia más dinámica.",
    href: "https://aluna-pilates-delft.ercasa.chatgpt.site/",
    swatches: ["#0033A0", "#FAFAFA", "#FF8200"],
    preview: "/catalog/aluna-delft.webp", previewAlt: "Portada del diseño de muestra Aluna Pilates Delft", public: true,
  },
  {
    familyId: "aluna", familyName: "Aluna Pilates", variant: "Arcade", rubro: "bienestar",
    title: "Aluna Pilates · Arcade",
    text: "Una propuesta en azul y magenta con energía digital para una marca joven y expresiva.",
    href: "https://aluna-pilates-arcade.ercasa.chatgpt.site/",
    swatches: ["#07329B", "#ED0F87", "#1BB5FD"],
    preview: "/catalog/aluna-arcade.webp", previewAlt: "Portada del diseño de muestra Aluna Pilates Arcade", public: true,
  },
  {
    familyId: "habitacion-antipanico", familyName: "Habitación Antipánico", variant: "Original", rubro: "arquitectura",
    title: "Habitación Antipánico · Original",
    text: "Una presentación técnica y clara para explicar arquitectura segura, protección y asesoramiento.",
    href: "https://habitacion-antipanico.ercasa.chatgpt.site/",
    swatches: ["#203B4B", "#0DA797", "#FCA311"],
    preview: "/catalog/habitacion-antipanico-original.webp", previewAlt: "Portada del diseño de muestra Habitación Antipánico Original", public: true,
  },
  {
    familyId: "habitacion-antipanico", familyName: "Habitación Antipánico", variant: "Petróleo", rubro: "arquitectura",
    title: "Habitación Antipánico · Petróleo",
    text: "Una variante sobria en tonos petróleo y cobre para comunicar confianza, ingeniería y resguardo.",
    href: "https://habitacion-antipanico-petroleo.ercasa.chatgpt.site/",
    swatches: ["#133640", "#0D7F97", "#C65A18"],
    preview: "/catalog/habitacion-antipanico-petroleo.webp", previewAlt: "Portada del diseño de muestra Habitación Antipánico Petróleo", public: true,
  },
  {
    familyId: "habitacion-antipanico", familyName: "Habitación Antipánico", variant: "Dorado", rubro: "arquitectura",
    title: "Habitación Antipánico · Dorado",
    text: "Una propuesta de azul profundo y dorado que combina precisión técnica con una presencia premium.",
    href: "https://habitacion-antipanico-dorado.ercasa.chatgpt.site/",
    swatches: ["#050A30", "#785D32", "#FFFAF2"],
    preview: "/catalog/habitacion-antipanico-dorado.webp", previewAlt: "Portada del diseño de muestra Habitación Antipánico Dorado", public: true,
  },
  {
    familyId: "habitacion-antipanico", familyName: "Habitación Antipánico", variant: "Cobre", rubro: "arquitectura",
    title: "Habitación Antipánico · Cobre",
    text: "Una identidad oscura con acentos cobre para destacar soluciones de seguridad y diseño a medida.",
    href: "https://habitacion-antipanico-cobre.ercasa.chatgpt.site/",
    swatches: ["#162334", "#9A5A36", "#FAFBFC"],
    preview: "/catalog/habitacion-antipanico-cobre.webp", previewAlt: "Portada del diseño de muestra Habitación Antipánico Cobre", public: true,
  },
];
