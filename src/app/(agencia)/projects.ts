// Casos y desarrollos propios publicados en /proyectos/.

export type SuccessCase = {
  id: string;
  href: string;
  img: string;
  width: number;
  height: number;
  alt: string;
  imageClass?: string;
  category: string;
  title: string;
  headline: string;
  text: string;
  facts?: [string, string][];
  cta: string;
};

export const SUCCESS_CASES: SuccessCase[] = [
  {
    id: "caso-calculadora",
    href: "https://calculadora.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-calculadora-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Calculadora ML de Edgardo A. Díaz",
    category: "Precios · Producto por producto",
    title: "Calculadora ML",
    headline: "Del costo al precio de publicación.",
    text: "Nació de una necesidad de nuestra operación: contemplar los costos de vender en Mercado Libre antes de definir un precio.",
    facts: [
      ["La propuesta", "Reúne costo neto, IVA, margen, comisión, IIBB, envío y cuotas en un mismo cálculo."],
      ["Qué permite", "Revisar el precio de un producto y comparar escenarios al contado y en cuotas."],
    ],
    cta: "Conocé la calculadora",
  },
  {
    id: "caso-orientador",
    href: "https://orientador.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-orientador-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Orientador de precios ML de Edgardo A. Díaz",
    category: "Precios · Listas de mayoristas",
    title: "Orientador de precios ML",
    headline: "Una lista completa. Una primera orientación.",
    text: "Para analizar muchos productos en conjunto y elegir cuáles merecen una revisión más detallada.",
    facts: [
      ["La propuesta", "Cargás la planilla de tu mayorista, configurás las variables y obtenés referencias al contado y en cuotas."],
      ["Qué permite", "Descargar un Excel para filtrar, comparar y evaluar oportunidades de compra."],
    ],
    cta: "Conocé el orientador",
  },
  {
    id: "caso-programa",
    href: "https://programa.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-programa-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Programa de Transformación de Edgardo A. Díaz",
    category: "Formación · Producto digital",
    title: "Programa de Transformación",
    headline: "Una forma de pensar Mercado Libre.",
    text: "Capacitación práctica en PDF de Edgardo A. Díaz para revisar publicaciones, ordenar la cuenta y aplicar inteligencia artificial al trabajo diario.",
    facts: [
      ["La propuesta", "Una página que presenta el contenido del programa, su alcance y el acceso a la compra."],
      ["Qué permite", "Conocer la propuesta y trabajar el material a tu ritmo. No incluye asesoría personalizada."],
    ],
    cta: "Conocé el programa",
  },
  {
    id: "caso-asesoria",
    href: "https://asesoria.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-asesoria-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Asesoría personalizada de Edgardo A. Díaz",
    category: "Servicios · Acompañamiento profesional",
    title: "Asesoría personalizada",
    headline: "Una segunda mirada para tu operación.",
    text: "La propuesta de Edgardo A. Díaz para trabajar sobre consultas, problemas y decisiones concretas de una cuenta de Mercado Libre.",
    facts: [
      ["La propuesta", "Una presentación clara de la modalidad: 30 días, tres reuniones individuales y consultas puntuales por WhatsApp con su equipo."],
      ["Qué permite", "Entender el alcance del servicio y consultar cómo empezar a trabajar sobre tu negocio."],
    ],
    cta: "Conocé la asesoría",
  },
  {
    id: "caso-bot",
    href: "https://bot.edgardoadiaz.com.ar/",
    img: "/assets/edgardo-bot-miniatura.jpg",
    width: 1200,
    height: 750,
    alt: "Vista de la página de Bot de Telegram para Mercado Libre de Edgardo A. Díaz",
    category: "Integración · Atención y seguimiento",
    title: "Bot de Telegram para Mercado Libre",
    headline: "Tu cuenta, más cerca.",
    text: "Preguntas, mensajes, reclamos y alertas de tus cuentas en Telegram para acompañar la atención cotidiana.",
    facts: [
      ["La propuesta", "Una herramienta que reúne avisos de la operación y permite preparar respuestas a las preguntas de compradores."],
      ["Qué permite", "Revisar la respuesta y confirmar antes de enviarla. Vos mantenés el control."],
    ],
    cta: "Conocé el bot",
  },
  {
    id: "caso-quirvo",
    href: "https://quirvo.com.ar/",
    img: "/assets/quirvo.webp",
    width: 1200,
    height: 900,
    alt: "Quirvo, sistema de portero QR",
    imageClass: "quirvo-image",
    category: "Portero QR · Desarrollo propio",
    title: "Quirvo",
    headline: "De una necesidad cotidiana a una solución.",
    text: "Un portero QR que conecta a visitantes y residentes desde el celular. Identidad, presentación web y tecnología reunidas en un producto propio.",
    cta: "Conocé Quirvo",
  },
];

// ERCAS se presenta destacado, a todo el ancho, antes del resto de los sitios.
export const FEATURED_PROJECT = {
  href: "https://ercas.com.ar/",
  name: "ERCAS",
  img: "/assets/ercas.webp",
  width: 1800,
  height: 600,
  alt: "Presentación de la tienda online ERCAS en el portfolio de Oriavision",
  category: "E-commerce",
  text: "Tienda online de tecnología e insumos de impresión, con catálogo de productos, búsqueda y carrito de compras.",
  cta: "Visitá la tienda",
};

export const REAL_PROJECTS = [
  {
    href: "https://www.myriamrodriguez.com.ar/",
    name: "Myriam Rodríguez Inmuebles",
    img: "/assets/myriam-rodriguez.jpg",
    width: 1100,
    height: 990,
    alt: "Presentación del sitio Myriam Rodríguez Inmuebles en el portfolio de Oriavision",
    category: "Web inmobiliaria",
    text: "Propiedades, tasaciones y servicios jurídicos en una web con buscador y canales de consulta.",
    cta: "Visitá el sitio",
  },
  {
    href: "https://web-siempredeguardia.vercel.app/",
    name: "Siempre de Guardia",
    img: "/assets/siempre-de-guardia.webp",
    width: 1200,
    height: 1180,
    alt: "Presentación del directorio Siempre de Guardia en el portfolio de Oriavision",
    category: "Sistema web",
    text: "Directorio de prestadores de servicios, organizado por rubros, con registro de usuarios y contacto directo.",
    cta: "Explorá el directorio",
  },
  {
    href: "https://dbengotech.com.ar/",
    name: "dbengotech",
    img: "/assets/dbengotech.webp",
    width: 1200,
    height: 1180,
    alt: "Presentación del sitio profesional dbengotech en el portfolio de Oriavision",
    category: "Web profesional",
    text: "Una presentación de servicios tecnológicos para e-commerce, con propuesta de trabajo, portfolio y contacto.",
    cta: "Visitá el sitio",
  },
];
