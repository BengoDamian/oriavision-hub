// Diseños de muestra y su estado de publicación verificado.

export const RUBROS = [
  { id: "unas", name: "Uñas y belleza", text: "Servicios, estilos, colores y una experiencia visual pensada para convertir visitas en consultas." },
  { id: "barberias", name: "Barberías y peluquerías", text: "Servicios, profesionales, turnos y una identidad con carácter." },
  { id: "cafeterias", name: "Cafeterías y gastronomía", text: "Propuestas, carta, ambiente y llamados a la acción para atraer nuevas visitas." },
  { id: "bienestar", name: "Bienestar y movimiento", text: "Clases, disciplinas, profesionales y horarios." },
  { id: "tatuajes", name: "Tatuajes", text: "Estilos, artistas, estudio y reservas de muestra con una identidad visual propia." },
  { id: "arquitectura", name: "Arquitectura y seguridad", text: "Proyectos, soluciones de protección y espacios seguros explicados con claridad." },
  { id: "parrillas-herreria", name: "Parrillas y herrería", text: "Productos, trabajos a medida y consultas con una identidad visual sólida y artesanal." },
  { id: "veterinarias", name: "Veterinarias", text: "Servicios, equipo, agenda demostrativa y consultas con una identidad cercana y profesional." },
] as const;

export type RubroId = (typeof RUBROS)[number]["id"];

export const SAMPLE_FAMILIES = [
  { id: "art-nails", title: "Art Nails" },
  { id: "barberias", title: "Barberías y peluquerías" },
  { id: "buen-rato", title: "Buen Rato Café" },
  { id: "aluna", title: "Aluna Pilates" },
  { id: "ink-house", title: "Ink House / Tatuajes" },
  { id: "habitacion-antipanico", title: "Habitación Antipánico" },
  { id: "watorii", title: "watorii" },
  { id: "clinica-veterinaria", title: "Clínica Veterinaria" },
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
    href: "https://www.oriavision.com.ar/demos/art-nails-limon/",
    swatches: ["#DCEB3F", "#FFFBEA", "#194A39"],
    preview: "/catalog/art-nails-limon.png", previewAlt: "Portada del diseño de muestra Art Nails Limón", public: true,
  },
  {
    familyId: "art-nails", familyName: "Art Nails", variant: "Tornasol", rubro: "unas",
    title: "Art Nails · Tornasol",
    text: "Una propuesta iridiscente y delicada para un estudio de uñas con una identidad visual singular.",
    href: "https://www.oriavision.com.ar/demos/art-nails-tornasol/",
    swatches: ["#C9B8FF", "#F8F2FF", "#6E4B8B"],
    preview: "/catalog/art-nails-tornasol.png", previewAlt: "Portada del diseño de muestra Art Nails Tornasol", public: true,
  },
  {
    familyId: "art-nails", familyName: "Art Nails", variant: "Vibrante", rubro: "unas",
    title: "Art Nails · Vibrante",
    text: "Una versión enérgica y expresiva para mostrar diseños, servicios y llamados a reservar.",
    href: "https://www.oriavision.com.ar/demos/art-nails-vibrante/",
    swatches: ["#FF4F87", "#FFF2F7", "#7E2046"],
    preview: "/catalog/art-nails-vibrante.png", previewAlt: "Portada del diseño de muestra Art Nails Vibrante", public: true,
  },
  {
    familyId: "art-nails", familyName: "Art Nails", variant: "Tropical", rubro: "unas",
    title: "Art Nails · Tropical",
    text: "Una alternativa colorida y relajada para comunicar creatividad, cuidado y personalidad.",
    href: "https://www.oriavision.com.ar/demos/art-nails-tropical/",
    swatches: ["#24B88B", "#FFF2B2", "#ED6B4D"],
    preview: "/catalog/art-nails-tropical.png", previewAlt: "Portada del diseño de muestra Art Nails Tropical", public: true,
  },
  {
    familyId: "barberias", familyName: "Barberías y peluquerías", variant: "Próceres", rubro: "barberias",
    title: "Barbería · Próceres",
    text: "Una barbería tradicional con servicios, elección de barbero y un recorrido de reserva de muestra.",
    href: "https://www.oriavision.com.ar/demos/barberia-proceres/",
    swatches: ["#151614", "#F6F4EC", "#F2CD65"],
    preview: "/catalog/proceres.png", previewAlt: "Portada del diseño de muestra Barbería Próceres", public: true,
  },
  {
    familyId: "barberias", familyName: "Barberías y peluquerías", variant: "Turquesa", rubro: "barberias",
    title: "Barbería · Turquesa",
    text: "Una variante moderna y fresca para destacar cortes, equipo profesional y vías de consulta.",
    href: "https://www.oriavision.com.ar/demos/barberia-turquesa/",
    swatches: ["#25B7A5", "#EAFBF7", "#173C3A"],
    preview: "/catalog/barberia-turquesa.png", previewAlt: "Portada del diseño de muestra Barbería Turquesa", public: true,
  },
  {
    familyId: "barberias", familyName: "Barberías y peluquerías", variant: "Verde", rubro: "barberias",
    title: "Barbería · Verde",
    text: "Una propuesta sobria y contemporánea para ordenar servicios, profesionales y llamados a reservar.",
    href: "https://www.oriavision.com.ar/demos/barberia-verde/",
    swatches: ["#275B45", "#F1F4E9", "#C3A85F"],
    preview: "/catalog/barberia-verde.png", previewAlt: "Portada del diseño de muestra Barbería Verde", public: true,
  },
  {
    familyId: "barberias", familyName: "Barberías y peluquerías", variant: "Azul", rubro: "barberias",
    title: "Barbería · Azul",
    text: "Una alternativa de perfil clásico y limpio para presentar el oficio, los servicios y el equipo.",
    href: "https://www.oriavision.com.ar/demos/barberia-azul/",
    swatches: ["#164B73", "#EDF5FA", "#D4A94D"],
    preview: "/catalog/barberia-azul.png", previewAlt: "Portada del diseño de muestra Barbería Azul", public: true,
  },
  {
    familyId: "buen-rato", familyName: "Buen Rato Café", variant: "Original", rubro: "cafeterias",
    title: "Buen Rato Café · Original",
    text: "Una identidad cálida para presentar el concepto, la carta y la experiencia del café.",
    href: "https://www.oriavision.com.ar/demos/buen-rato-cafe/",
    swatches: ["#153A32", "#FFFAF3", "#A37B55"],
    preview: "/catalog/buen-rato-original.webp", previewAlt: "Portada del diseño de muestra Buen Rato Café Original", public: true,
  },
  {
    familyId: "buen-rato", familyName: "Buen Rato Café", variant: "Bosque", rubro: "cafeterias",
    title: "Buen Rato Café · Bosque",
    text: "Una paleta verde intensa con acentos cálidos para una cafetería cercana y contemporánea.",
    href: "https://www.oriavision.com.ar/demos/buen-rato-cafe-bosque/",
    swatches: ["#0A5A2A", "#F7F5EC", "#A94D06"],
    preview: "/catalog/buen-rato-bosque.webp", previewAlt: "Portada del diseño de muestra Buen Rato Café Bosque", public: true,
  },
  {
    familyId: "buen-rato", familyName: "Buen Rato Café", variant: "Tierra", rubro: "cafeterias",
    title: "Buen Rato Café · Tierra",
    text: "Una versión de tonos naturales y cobrizos que transmite calidez, oficio y pausa.",
    href: "https://www.oriavision.com.ar/demos/buen-rato-cafe-tierra/",
    swatches: ["#362A21", "#FFF9EE", "#A45832"],
    preview: "/catalog/buen-rato-tierra.webp", previewAlt: "Portada del diseño de muestra Buen Rato Café Tierra", public: true,
  },
  {
    familyId: "aluna", familyName: "Aluna Pilates", variant: "Original", rubro: "bienestar",
    title: "Aluna Pilates · Original",
    text: "Un estudio de Pilates Reformer, Mat y sesiones personales, con agenda demostrativa de turnos.",
    href: "https://www.oriavision.com.ar/demos/aluna-pilates-original/",
    swatches: ["#294D42", "#F5F1E8", "#D8C7AC"],
    preview: "/catalog/aluna-original.webp", previewAlt: "Portada del diseño de muestra Aluna Pilates Original", public: true,
  },
  {
    familyId: "aluna", familyName: "Aluna Pilates", variant: "Blossom", rubro: "bienestar",
    title: "Aluna Pilates · Blossom",
    text: "Una variante serena con azul profundo y rosa suave para comunicar cuidado y movimiento.",
    href: "https://www.oriavision.com.ar/demos/aluna-pilates-blossom/",
    swatches: ["#0D3A5C", "#F7A8C1", "#F7F8F3"],
    preview: "/catalog/aluna-blossom.webp", previewAlt: "Portada del diseño de muestra Aluna Pilates Blossom", public: true,
  },
  {
    familyId: "aluna", familyName: "Aluna Pilates", variant: "Delft", rubro: "bienestar",
    title: "Aluna Pilates · Delft",
    text: "Una versión gráfica de azul y blanco con acento naranja para una presencia más dinámica.",
    href: "https://www.oriavision.com.ar/demos/aluna-pilates-delft/",
    swatches: ["#0033A0", "#FAFAFA", "#FF8200"],
    preview: "/catalog/aluna-delft.webp", previewAlt: "Portada del diseño de muestra Aluna Pilates Delft", public: true,
  },
  {
    familyId: "aluna", familyName: "Aluna Pilates", variant: "Arcade", rubro: "bienestar",
    title: "Aluna Pilates · Arcade",
    text: "Una propuesta en azul y magenta con energía digital para una marca joven y expresiva.",
    href: "https://www.oriavision.com.ar/demos/aluna-pilates-arcade/",
    swatches: ["#07329B", "#ED0F87", "#1BB5FD"],
    preview: "/catalog/aluna-arcade.webp", previewAlt: "Portada del diseño de muestra Aluna Pilates Arcade", public: true,
  },
  {
    familyId: "ink-house", familyName: "Ink House / Tatuajes", variant: "Original", rubro: "tatuajes",
    title: "Ink House · Original",
    text: "Una propuesta clara y cálida para presentar estilos, artistas y reservas de un estudio de tatuajes.",
    href: "https://www.oriavision.com.ar/demos/ink-house-original/",
    swatches: ["#F6F1E8", "#C65F4B", "#276B6C"],
    preview: "/catalog/ink-house-original.webp", previewAlt: "Portada del diseño de muestra Ink House Original", public: true,
  },
  {
    familyId: "ink-house", familyName: "Ink House / Tatuajes", variant: "Classic", rubro: "tatuajes",
    title: "Ink House · Classic",
    text: "Una variante oscura de inspiración tradicional, con rojo profundo y tipografía de fuerte carácter.",
    href: "https://www.oriavision.com.ar/demos/ink-house-classic/",
    swatches: ["#202124", "#B51527", "#F5F3EF"],
    preview: "/catalog/ink-house-classic.webp", previewAlt: "Portada del diseño de muestra Ink House Classic", public: true,
  },
  {
    familyId: "ink-house", familyName: "Ink House / Tatuajes", variant: "Neón", rubro: "tatuajes",
    title: "Ink House · Neón",
    text: "Una identidad nocturna en azul, rosa y cian para un estudio joven, expresivo y contemporáneo.",
    href: "https://www.oriavision.com.ar/demos/ink-house-neon/",
    swatches: ["#0B0F2B", "#FF5CA8", "#00F0FF"],
    preview: "/catalog/ink-house-neon.webp", previewAlt: "Portada del diseño de muestra Ink House Neón", public: true,
  },
  {
    familyId: "ink-house", familyName: "Ink House / Tatuajes", variant: "Oxide", rubro: "tatuajes",
    title: "Ink House · Oxide",
    text: "Una versión industrial en negro y naranja para comunicar oficio, contraste y una presencia directa.",
    href: "https://www.oriavision.com.ar/demos/ink-house-oxide/",
    swatches: ["#0B1014", "#EE690B", "#BBD3EB"],
    preview: "/catalog/ink-house-oxide.webp", previewAlt: "Portada del diseño de muestra Ink House Oxide", public: true,
  },
  {
    familyId: "habitacion-antipanico", familyName: "Habitación Antipánico", variant: "Original", rubro: "arquitectura",
    title: "Habitación Antipánico · Original",
    text: "Una presentación técnica y clara para explicar arquitectura segura, protección y asesoramiento.",
    href: "https://www.oriavision.com.ar/demos/habitacion-antipanico-original/",
    swatches: ["#203B4B", "#0DA797", "#FCA311"],
    preview: "/catalog/habitacion-antipanico-original.webp", previewAlt: "Portada del diseño de muestra Habitación Antipánico Original", public: true,
  },
  {
    familyId: "habitacion-antipanico", familyName: "Habitación Antipánico", variant: "Petróleo", rubro: "arquitectura",
    title: "Habitación Antipánico · Petróleo",
    text: "Una variante sobria en tonos petróleo y cobre para comunicar confianza, ingeniería y resguardo.",
    href: "https://www.oriavision.com.ar/demos/habitacion-antipanico-petroleo/",
    swatches: ["#133640", "#0D7F97", "#C65A18"],
    preview: "/catalog/habitacion-antipanico-petroleo.webp", previewAlt: "Portada del diseño de muestra Habitación Antipánico Petróleo", public: true,
  },
  {
    familyId: "habitacion-antipanico", familyName: "Habitación Antipánico", variant: "Dorado", rubro: "arquitectura",
    title: "Habitación Antipánico · Dorado",
    text: "Una propuesta de azul profundo y dorado que combina precisión técnica con una presencia premium.",
    href: "https://www.oriavision.com.ar/demos/habitacion-antipanico-dorado/",
    swatches: ["#050A30", "#785D32", "#FFFAF2"],
    preview: "/catalog/habitacion-antipanico-dorado.webp", previewAlt: "Portada del diseño de muestra Habitación Antipánico Dorado", public: true,
  },
  {
    familyId: "habitacion-antipanico", familyName: "Habitación Antipánico", variant: "Cobre", rubro: "arquitectura",
    title: "Habitación Antipánico · Cobre",
    text: "Una identidad oscura con acentos cobre para destacar soluciones de seguridad y diseño a medida.",
    href: "https://www.oriavision.com.ar/demos/habitacion-antipanico-cobre/",
    swatches: ["#162334", "#9A5A36", "#FAFBFC"],
    preview: "/catalog/habitacion-antipanico-cobre.webp", previewAlt: "Portada del diseño de muestra Habitación Antipánico Cobre", public: true,
  },
  {
    familyId: "watorii", familyName: "watorii", variant: "Original", rubro: "parrillas-herreria",
    title: "watorii · Original",
    text: "Una propuesta de azul profundo, cobre y blanco para presentar parrillas, campanas y trabajos de herrería.",
    href: "https://www.oriavision.com.ar/demos/watorii-original/",
    swatches: ["#162334", "#9A5A36", "#FAFBFC"],
    preview: "/catalog/watorii-original.webp", previewAlt: "Portada del diseño de muestra watorii Original", public: true,
  },
  {
    familyId: "watorii", familyName: "watorii", variant: "Turquesa", rubro: "parrillas-herreria",
    title: "watorii · Turquesa",
    text: "Una variante turquesa y naranja, fresca y contrastada, para destacar productos, proyectos y consultas.",
    href: "https://www.oriavision.com.ar/demos/watorii-turquesa/",
    swatches: ["#0C354D", "#0DA797", "#C54B20"],
    preview: "/catalog/watorii-turquesa.webp", previewAlt: "Portada del diseño de muestra watorii Turquesa", public: true,
  },
  {
    familyId: "clinica-veterinaria", familyName: "Clínica Veterinaria", variant: "Tropical", rubro: "veterinarias",
    title: "Clínica Veterinaria · Tropical",
    text: "Una variante en azul profundo y amarillo vibrante para comunicar cercanía, energía y cuidado profesional.",
    href: "https://www.oriavision.com.ar/demos/veterinaria-tropical/",
    swatches: ["#061B26", "#FEFE41", "#FFFFFF"],
    preview: "/catalog/veterinaria-tropical.jpg", previewAlt: "Portada real del diseño de muestra Clínica Veterinaria Tropical", public: true,
  },
  {
    familyId: "clinica-veterinaria", familyName: "Clínica Veterinaria", variant: "Azul y Dorado", rubro: "veterinarias",
    title: "Clínica Veterinaria · Azul y Dorado",
    text: "Una propuesta sobria en azul y dorado para presentar servicios, equipo ficticio y consultas con claridad.",
    href: "https://www.oriavision.com.ar/demos/veterinaria-azul-dorado/",
    swatches: ["#182B49", "#D4AF37", "#FFFFFF"],
    preview: "/catalog/veterinaria-azul-dorado.jpg", previewAlt: "Portada real del diseño de muestra Clínica Veterinaria Azul y Dorado", public: true,
  },
  {
    familyId: "clinica-veterinaria", familyName: "Clínica Veterinaria", variant: "Original", rubro: "veterinarias",
    title: "Clínica Veterinaria · Original",
    text: "Una identidad neutra con naranja y verde para recorrer servicios, agenda simulada y contacto comercial.",
    href: "https://www.oriavision.com.ar/demos/veterinaria-original/",
    swatches: ["#363636", "#F58F1F", "#457534"],
    preview: "/catalog/veterinaria-original.jpg", previewAlt: "Portada real del diseño de muestra Clínica Veterinaria Original", public: true,
  },
  {
    familyId: "clinica-veterinaria", familyName: "Clínica Veterinaria", variant: "Petróleo", rubro: "veterinarias",
    title: "Clínica Veterinaria · Petróleo",
    text: "Una versión serena en petróleo, aqua y arena para transmitir confianza, cuidado y una presencia contemporánea.",
    href: "https://www.oriavision.com.ar/demos/veterinaria-petroleo/",
    swatches: ["#083A4F", "#407E8C", "#A58D66"],
    preview: "/catalog/veterinaria-petroleo.jpg", previewAlt: "Portada real del diseño de muestra Clínica Veterinaria Petróleo", public: true,
  },
];
