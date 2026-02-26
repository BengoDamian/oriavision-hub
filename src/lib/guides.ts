export type GuideCategory = string;

export type GuideItem = {
    id: string;
    title: string;
    description: string;
    category: GuideCategory;
    content: string; // texto largo (la guía completa)
    tags?: string[];
    featured?: boolean;
};

export const guides: GuideItem[] = [
    {
        id: "logistica-flex-principiantes",
        title: "Cómo elegir logística Flex (principiantes)",
        description: "Guía simple para elegir bien y cuidar tu reputación.",
        category: "Logística",
        tags: ["Flex", "Reputación", "Cumplimiento"],
        featured: true,
        content: `Hola! 👋 Te dejo una guía simple para elegir tu logística de Mercado Envíos Flex cuando recién empezás (esto te ahorra problemas y, sobre todo, te cuida la reputación).

✅ 1) Priorizá que la logística te quede CERCA
Al principio es clave porque si algún día no pasan a retirar o se complica, vos podés acercar los paquetes y salvar las entregas.
👉 Ideal: que puedas llegar en 15–30 minutos.

✅ 2) No elijas por “el más barato”: elegí por el que MÁS CUMPLE
En Flex lo más caro es romper la reputación (reclamos, demoras, cancelaciones y después vendés menos).
El costo se compara recién entre los que cumplen bien.

✅ 3) Preguntas claves para hacerle a cualquier mensajería/logística
- ¿Qué zonas cubren exactamente? (CABA / GBA / radios)
- ¿A qué hora retiran y cuál es el horario de corte real?
- ¿Cumplen “llega hoy” de forma consistente? (pedí ejemplos/referencias)
- ¿Qué pasa si hay muchos pedidos? (picos tipo Hot Sale/Cyber)
- ¿Cómo confirman la entrega? (foto / firma / DNI / comprobante)
- ¿Qué hacen si el cliente no está? (reintento, costo, tiempos)
- ¿Cómo te dan soporte si hay un problema el mismo día? (WhatsApp/telefonía)

✅ 4) Configuración recomendada para arrancar sin sufrir
- Empezá con zona chica (donde llegás cómodo)
- Poné horario de corte temprano (mejor prometer menos y cumplir)
- Poné cupo diario bajo (para no desbordarte)
Después, cuando veas que cumplís bien, vas ampliando zona/horario/cupo.

✅ 5) Señales de que tenés que cambiar de logística (o ajustar Flex)
- Se atrasan seguido o te reprograman entregas
- Se te acumulan pedidos para la noche
- Te suben reclamos “no llegó” / “llegó tarde”
- Te genera estrés tener Flex activo (eso suele ser promesa mal armada)

📌 Resumen corto:
Elegí una logística cerca + que cumpla. El precio es secundario si te cuida la reputación.`,
    },
];