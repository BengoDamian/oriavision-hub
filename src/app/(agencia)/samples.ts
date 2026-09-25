// Sitios de muestra publicados (subdominios verificados de oriavision.com.ar) y los rubros que representan.
// Solo se listan rubros con al menos una muestra.

export const RUBROS = [
  {
    id: "barberias",
    name: "Barberías y peluquerías",
    text: "Servicios, profesionales, turnos y una identidad con carácter.",
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
  text: string;
  href: string;
  swatches: [string, string, string];
}[] = [
  {
    rubro: "barberias",
    title: "Barbería · Próceres",
    text: "Una barbería tradicional con servicios, elección de barbero y sistema de reservas online.",
    href: "https://peluqueria.oriavision.com.ar",
    // Colores del propio sitio: fondo, papel y dorado.
    swatches: ["#151614", "#F6F4EC", "#F2CD65"],
  },
  {
    rubro: "bienestar",
    title: "Pilates · Aluna",
    text: "Un estudio de Pilates Reformer, Mat y sesiones personales, con clases y agenda de turnos.",
    href: "https://pilates.oriavision.com.ar",
    // Colores del propio sitio: verde, lino y arena.
    swatches: ["#294D42", "#F5F1E8", "#D8C7AC"],
  },
];
