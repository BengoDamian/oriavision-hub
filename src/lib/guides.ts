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
        description: "Guía práctica para no arruinar tu reputación en los primeros envíos.",
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

    {
        id: "promociones-publicidad-politica-precios",
        title: "Promociones, publicidad y política de precios: una buena idea... hasta que la operación te pasa factura",
        description:
            "Testear promociones y publicidad suena bárbaro, pero si multiplicás publicaciones y precios, la gestión se complica.",
        category: "Precios & Promociones",
        tags: ["Promociones", "Publicidad", "Precios", "Operación", "MercadoLibre", "Tiendanube"],
        featured: true,
        content: `Hola! 👋 Si estás pensando en dedicar parte del margen a promociones o publicidad (ej: un 10%), la idea es buena… pero ojo con el costo operativo cuando lo llevás a escala.

✅ 1) La teoría cierra perfecto
La lógica es simple:
- Publicación A: precio “normal”
- Publicación B: precio más alto para después aplicar promoción
- Publicación C: precio más alto para empujar con publicidad

Así comparás resultados reales y ves qué te deja mejor rentabilidad o volumen.

✅ 2) El problema real: pasás de 1 precio a varios
Cuando tenés varias publicaciones “iguales”, ya no administrás un producto: administrás un sistema de precios.
Y eso implica:
- mirar competencia todo el tiempo
- revisar cómo quedó cada publicación
- decidir si cada precio sigue teniendo sentido

✅ 3) Se vuelve imposible resolverlo con cambios masivos
Con 3 publicaciones del mismo producto:
- no podés hacer “un cambio masivo y listo”
- cada publicación necesita su ajuste

Y si repetís esto en muchos productos… la operación se te vuelve pesada.

✅ 4) El costo oculto: gestión
La estrategia puede servir para testear, pero tiene un costo:
- más seguimiento
- más tiempo
- más chances de error

📌 Esto no se ve en la teoría, pero se siente en el día a día.

✅ 5) ¿Cuándo puede funcionar sin explotar?
- Si tenés equipo
- Si tenés procesos claros
- Si tenés herramientas para monitorear y ajustar sin fricción

Si sos pocos y además atendés ventas, stock, consultas, reclamos y precios… se complica.

✅ 6) Cómo usarlo sin morir en el intento
- Hacelo como prueba puntual (1–2 productos)
- Medí resultados (ventas, margen, conversión)
- Sacá conclusiones y volvés a un esquema simple

📌 Resumen corto:
Sirve para testear y aprender, pero a escala la operación manda. Lo que cierra en Excel muchas veces se vuelve difícil de sostener todos los días.`,
    },

    {
        id: "tienda-oficial-mercadolibre-empeza-por-esto",
        title: "¿Querés llegar a tener una Tienda Oficial en Mercado Libre? Empezá por esto",
        description:
            "Antes de pensar en Tienda Oficial, ordená tu marca: INPI, agente de marcas e identidad consistente.",
        category: "MercadoLibre",
        tags: ["Tienda Oficial", "Marca", "INPI", "Branding", "Identidad", "MercadoLibre"],
        featured: true,
        content: `Hola! 👋 Muchas personas me consultan qué hace falta para tener una *Tienda Oficial en Mercado Libre*. Y aunque la pregunta parece empezar en Mercado Libre, para mí hay algo más importante que conviene resolver antes: *la marca*.

Porque cuando un negocio quiere dar un paso más profesional, ya no alcanza con vender bien. También importa *cómo está construida la identidad*, si el nombre puede sostenerse en el tiempo y si está bien resguardado. Si eso se deja para más adelante, el problema aparece justo cuando más querés crecer.

✅ 1) Antes de pensar en Mercado Libre, pensá en tu nombre
Lo primero es revisar si el nombre que querés usar *realmente tiene viabilidad*.
En Argentina, eso se hace ante el *INPI*: ahí podés consultar antecedentes y avanzar con una solicitud de registro.

Mi recomendación personal es no resolver esto improvisando ni dejarlo para “más adelante”.
Lo ideal es trabajarlo con un *agente de marcas* o un profesional especializado, para:
- analizar bien la disponibilidad y posibles similitudes
- elegir la *clase correcta* para registrar
- evitar errores que después salen caros

✅ 2) No alcanza con que el nombre esté libre: también tiene que servirte en todos lados
Además del registro, conviene mirar algo muy práctico: que ese nombre también pueda acompañarte en Instagram, Facebook, TikTok, Google, correo y dominio web.

¿Por qué? Porque una marca transmite más solidez cuando mantiene *la misma identidad* en todos sus canales.
Cuando esto no se revisa a tiempo, después aparecen los parches: guiones bajos, “oficial”, números, variantes raras… y eso termina debilitando la imagen del negocio.

✅ 3) ¿Qué pide Mercado Libre para una Tienda Oficial?
En general, Mercado Libre *no publica de forma abierta* un listado completo y detallado con todos los criterios comerciales para acceder a Tienda Oficial.
Lo que sí suele pasar es que:
- no es un botón que activás desde tu cuenta
- hay una instancia de evaluación
- el proceso suele pasar por contacto con un asesor comercial

Y ahí es donde llegar con la marca ordenada, la identidad clara y una presencia profesional *te deja mucho mejor parado*.

✅ 4) “Mi Página” no es lo mismo que “Tienda Oficial”
Este punto suele generar confusión.
- *Mi Página*: es una herramienta para mostrar tu identidad dentro de Mercado Libre (nombre, logo, portada, etc.)
- *Tienda Oficial*: es otra instancia, con evaluación comercial y contacto con asesor

Por eso, lo más razonable es separar los conceptos:
Mi Página es algo más “activable” y concreto; Tienda Oficial es un paso superior, más selectivo.

✅ 5) Mi consejo
Si tu idea es llegar a tener una Tienda Oficial, no empieces solo por preguntar qué te va a pedir Mercado Libre.

Empezá por lo más importante:
✅ Elegí bien el nombre  
✅ Revisá si se puede registrar  
✅ Trabajalo con un agente de marcas  
✅ Asegurate de que esa identidad también te sirva en redes, correo y web  

Cuando esa base está bien hecha, todo lo demás queda mejor parado.

Porque una Tienda Oficial no empieza el día que hablás con Mercado Libre.  
Empieza mucho antes, cuando construís una marca sólida, ordenada y preparada para crecer.`,
    },
];