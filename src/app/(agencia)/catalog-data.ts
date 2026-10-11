export type PortfolioEntry = {
  title: string;
  type: string;
  image: string;
  href: string;
  description: string;
};

export type ProjectCollection = {
  id: string;
  title: string;
  category: string;
  description: string;
  variants: { name: string; image: string; href: string; colors: [string, string, string] }[];
  initialVariant?: string;
};

export const completedWorks: PortfolioEntry[] = [
  { title: "Edgardo A. Díaz", type: "Sitio profesional", image: "/images/edgardo-home.webp", href: "https://edgardoadiaz.com.ar/", description: "Herramientas, formación y servicios para Mercado Libre, ecommerce e IA aplicada." },
  { title: "Bot de Telegram", type: "Landing page · Producto digital", image: "/images/bot-home.webp", href: "https://bot.edgardoadiaz.com.ar/", description: "Presentación del bot para vendedores de Mercado Libre, con demostración interactiva, precios y consulta." },
  { title: "Myriam Rodríguez Inmuebles", type: "Web inmobiliaria", image: "/images/myriam-rodriguez.jpg", href: "https://www.myriamrodriguez.com.ar/", description: "Propiedades, tasaciones y servicios jurídicos con buscador y canales de consulta." },
  { title: "dbengotech", type: "Web profesional", image: "/images/dbengotech.webp", href: "https://dbengotech.com.ar/", description: "Servicios tecnológicos para ecommerce, portfolio y contacto." },
  { title: "ERCAS", type: "Tienda online", image: "/images/ercas.webp", href: "https://ercas.com.ar/", description: "Tecnología e insumos de impresión, con catálogo, búsqueda y carrito de compras." },
  { title: "Siempre de Guardia", type: "Sistema web", image: "/images/siempre-de-guardia.webp", href: "https://web-siempredeguardia.vercel.app/", description: "Directorio de prestadores de servicios organizado por rubros, con registro y contacto directo." },
  { title: "Quirvo", type: "Producto digital · Desarrollo propio", image: "/images/quirvo.webp", href: "https://quirvo.com.ar/", description: "Identidad y presentación web para un sistema de portero QR." },
  { title: "Calculadora ML", type: "Herramienta web", image: "/images/edgardo-calculadora-miniatura.webp", href: "https://calculadora.edgardoadiaz.com.ar/", description: "Una herramienta para revisar el precio de publicación a partir de costos y parámetros de venta." },
  { title: "Orientador de precios ML", type: "Herramienta web", image: "/images/edgardo-orientador-miniatura.webp", href: "https://orientador.edgardoadiaz.com.ar/", description: "Referencias de precios para analizar listas de mayoristas y comparar escenarios." },
  { title: "Programa de Transformación", type: "Landing page · Formación", image: "/images/edgardo-programa-miniatura.webp", href: "https://programa.edgardoadiaz.com.ar/", description: "Presentación de una capacitación práctica en PDF para trabajar una cuenta de Mercado Libre." },
  { title: "Asesoría personalizada", type: "Landing page · Servicio profesional", image: "/images/edgardo-asesoria-miniatura.webp", href: "https://asesoria.edgardoadiaz.com.ar/", description: "Una página dedicada a explicar el alcance y la modalidad del acompañamiento profesional." },
];
