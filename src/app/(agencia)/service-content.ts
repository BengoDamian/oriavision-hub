import { contactLinks } from "./contact-links";
import type { ServiceKind } from "./service-visuals";

export type ServiceQuestion = {
  id: string;
  short: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  example?: string;
  link?: { href: string; label: string };
};

export type ServiceGuide = {
  kind: ServiceKind;
  name: string;
  title: string;
  intro: string;
  questions: ServiceQuestion[];
  inquiry: string;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  related: { href: string; label: string; description: string }[];
  sources?: { href: string; label: string }[];
};

export const seoGuide: ServiceGuide = {
  kind: "seo",
  name: "SEO orgánico",
  title: "Qué es el SEO.",
  intro: "Que tu negocio aparezca cuando alguien busca lo que ofrecés. Entendé cómo se trabaja el posicionamiento orgánico, qué puede aportar y qué conviene esperar.",
  inquiry: contactLinks.seo,
  ctaTitle: "¿Tu web está llegando a las personas indicadas?",
  ctaText: "Contanos qué ofrecés, en qué zona trabajás y cuál es tu sitio. Podemos conversar sobre su punto de partida y las prioridades de un trabajo de SEO.",
  ctaLabel: "Consultar por el SEO de mi web",
  questions: [
    { id: "que-es", short: "Qué significa", title: "¿Qué es el SEO y qué significa que sea orgánico?", paragraphs: ["SEO significa optimización para buscadores. Es el trabajo sobre tu sitio para ayudar a Google a comprender su contenido y facilitar que lo encuentren personas interesadas en lo que ofrecés.", "Orgánico se refiere a los resultados que no son anuncios. Google no te cobra por cada clic en ellos, pero mejorar el sitio, desarrollar contenido y hacer seguimiento sí requiere tiempo y trabajo."] },
    { id: "para-que-sirve", short: "Para qué sirve", title: "¿Para qué le sirve a un comercio o a un profesional?", paragraphs: ["Puede acercarte a personas que ya están buscando un servicio como el tuyo. La prioridad es aparecer en búsquedas relacionadas con tu actividad y con la zona donde podés atender, y que la página responda bien a esa necesidad.", "Una visita es una oportunidad, no una venta asegurada. También importan tu propuesta, la claridad de la web y cómo respondés a quien consulta."], example: "Por ejemplo: una veterinaria puede tener una página que explique su atención clínica, dónde está y cómo pedir un turno. Eso ayuda más a quien busca ese servicio que una página que solo diga «bienvenidos»." },
    { id: "seo-o-anuncios", short: "SEO o anuncios", title: "¿En qué se diferencia de pagar anuncios en Google?", paragraphs: ["Con Google Ads invertís en anuncios. Con SEO trabajás la presencia de tu sitio en los resultados orgánicos. Pagar publicidad no mejora por sí mismo el posicionamiento orgánico.", "Pueden convivir: una campaña puede acompañar una necesidad comercial concreta mientras se desarrolla el sitio y su contenido. La combinación se decide según tu objetivo y tus recursos."], link: { href: "/google-ads", label: "Entender cómo funciona Google Ads" } },
    { id: "que-se-hace", short: "Qué trabajo implica", title: "¿Qué se hace concretamente para mejorar el SEO?", paragraphs: ["En ORIAVISIÓN proponemos empezar por una revisión y un orden de prioridades. Según el estado del sitio, el alcance puede incluir:"], points: ["Revisar si los buscadores pueden acceder a las páginas importantes y detectar problemas técnicos.", "Entender qué busca tu público y qué páginas hacen falta para responderle.", "Mejorar títulos, textos, organización y enlaces entre los contenidos.", "Revisar el uso en celulares, la carga y el camino hasta el contacto.", "Medir los cambios y decidir qué conviene trabajar después."], example: "No se trata de repetir una palabra muchas veces. Una página sobre un servicio debería explicar qué resolvés, para quién, dónde atendés y cómo dar el siguiente paso." },
    { id: "seo-local", short: "Búsquedas en tu zona", title: "¿También sirve para que me encuentren en mi zona?", paragraphs: ["Sí. El SEO local se ocupa de búsquedas vinculadas a un lugar. Si tu actividad cumple los requisitos, el Perfil de Empresa en Google puede complementar tu web con ubicación, horarios y datos útiles para atender a tus clientes.", "Revisamos que la información sea correcta y coherente. Los resultados locales dependen, entre otros factores, de la relación con lo buscado, la distancia y la notoriedad del negocio: no se puede prometer aparecer primero en todas las zonas."] },
    { id: "sitio-actual", short: "Tu sitio actual", title: "¿Necesito hacer una web nueva para trabajar el SEO?", paragraphs: ["No necesariamente. Podemos partir de un sitio existente y evaluar qué se puede mejorar. A veces la prioridad es ordenar el contenido; otras, resolver limitaciones técnicas o una estructura que dificulta encontrar los servicios.", "Si estás por crear o rediseñar tu web, conviene contemplar estas necesidades desde el comienzo. La decisión de rehacerla debe responder a un problema concreto, no ser un requisito automático."], link: { href: "/diseno-web#preguntas", label: "Cómo creamos o mejoramos tu sitio" } },
    { id: "plazos", short: "Plazos y expectativas", title: "¿Cuánto tarda y pueden asegurarme el primer puesto?", paragraphs: ["El SEO no tiene un plazo único. Algunas mejoras pueden reflejarse antes y otras necesitan meses. Influyen el estado del sitio, la competencia, los contenidos y el tiempo que tardan los buscadores en procesar los cambios.", "Nadie puede garantizar una posición determinada. Por eso proponemos acordar tareas, prioridades y momentos de revisión, en lugar de prometer una fecha para estar primero."] },
    { id: "medicion", short: "Cómo se mide", title: "¿Cómo voy a saber si el trabajo está dando resultado?", paragraphs: ["Search Console permite revisar con qué búsquedas aparece tu sitio, cuántas veces se muestra y cuántos clics recibe. Miramos su evolución y las páginas que están llegando a personas interesadas.", "Después relacionamos esas visitas con acciones útiles: consultas, formularios o solicitudes de turno, según la medición disponible. Un clic en WhatsApp no demuestra por sí solo que hubo una conversación o una venta; tu registro de consultas ayuda a completar esa información."], example: "Para un profesional que atiende en una ciudad, puede ser más útil recibir consultas por el servicio correcto y en su zona que sumar muchas visitas de personas a las que no puede atender." },
    { id: "alcance", short: "Presupuesto y continuidad", title: "¿Qué incluye el presupuesto y por qué puede requerir continuidad?", paragraphs: ["Definimos el presupuesto según el sitio, los servicios que quieras trabajar, el contenido disponible y las mejoras necesarias. Antes de empezar, acordamos qué se revisa, qué se implementa, quién prepara los textos y cómo se informa el avance.", "Algunas tareas son puntuales. Otras necesitan seguimiento porque cambian tu negocio, las búsquedas o la competencia. La continuidad se propone con trabajo concreto y prioridades revisables. Para conversar, alcanza con contarnos qué hacés, tu zona y la dirección de tu web."] },
  ],
  related: [
    { href: "/google-ads", label: "Publicidad en Google", description: "Qué cambia cuando invertís en anuncios." },
    { href: "/diseno-web#preguntas", label: "Diseño web", description: "La base que recibe a tus próximas visitas." },
  ],
  sources: [
    { href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=es", label: "Guía de SEO de Google" },
    { href: "https://support.google.com/webmasters/answer/7576553?hl=es", label: "Cómo leer los resultados en Search Console" },
    { href: "https://support.google.com/business/answer/7091?hl=es", label: "Posicionamiento local en Google" },
  ],
};

export const marketingGuide: ServiceGuide = {
  kind: "marketing",
  name: "Marketing digital",
  title: "Tu estrategia digital.",
  intro: "Antes de elegir una red o publicar un anuncio, conviene saber a quién querés llegar y para qué. Estas preguntas te ayudan a ordenar las decisiones.",
  inquiry: contactLinks.marketing,
  ctaTitle: "¿Tenés varias ideas y no sabés por dónde empezar?",
  ctaText: "Contanos qué vendés o qué servicio prestás, cómo llegan hoy tus clientes y qué te gustaría mejorar. Ese es un buen punto de partida para definir prioridades.",
  ctaLabel: "Consultar por mi estrategia digital",
  questions: [
    { id: "que-es", short: "Qué significa", title: "¿Qué es el marketing digital?", paragraphs: ["Es el conjunto de decisiones y acciones que conectan tu propuesta con las personas que podrían necesitarla, usando medios digitales. Puede involucrar tu web, las búsquedas, las redes, los anuncios y la forma en que atendés las consultas.", "En una estrategia, esas acciones tienen una dirección: qué querés conseguir, a quién te dirigís, qué vas a comunicar y cómo vas a evaluar lo que pasa."] },
    { id: "publicar", short: "Más allá de publicar", title: "¿Es lo mismo que publicar en redes sociales?", paragraphs: ["Publicar es una de las acciones posibles. Antes conviene decidir qué necesitás explicar, qué dudas tiene tu público y qué paso esperás que dé después de ver el contenido.", "Podés tener publicaciones cuidadas y recibir pocas consultas si no queda claro qué ofrecés o cómo contratarte. Por eso revisamos el recorrido completo: desde el primer contacto con tu marca hasta la respuesta de tu negocio."], example: "Si una publicación presenta un servicio, la persona debería poder encontrar sus condiciones y una forma simple de consultar. Una buena imagen, por sí sola, no resuelve ese recorrido." },
    { id: "objetivos", short: "Definir un objetivo", title: "¿Cómo elegimos un objetivo que tenga sentido para mi negocio?", paragraphs: ["Partimos de una necesidad concreta: recibir consultas por un servicio, ocupar turnos disponibles, presentar una nueva propuesta o mejorar cómo llegan los clientes. Después definimos a quién querés atraer y qué capacidad tenés para atenderlo.", "También revisamos qué hace diferente a tu propuesta y qué necesita saber alguien antes de elegirte. Eso permite decidir qué comunicar y qué resultado sería valioso para vos, más allá de los seguidores."] },
    { id: "canales", short: "Elegir los canales", title: "¿Necesito estar en todas las redes y hacer todas las campañas?", paragraphs: ["No. Proponemos elegir según cómo busca, compara y decide tu público. También importan el material que podés producir, tu presupuesto y el tiempo disponible para atender consultas.", "La búsqueda en Google puede ser relevante cuando alguien necesita resolver algo concreto. Las redes pueden ayudar a presentar una propuesta y mostrar cómo trabajás. La estrategia define qué función cumple cada canal y cuáles conviene dejar para más adelante."], link: { href: "/meta-ads", label: "Qué puede aportar la publicidad en Meta" } },
    { id: "web", short: "El papel de la web", title: "¿Qué lugar ocupa el sitio web si ya tengo Instagram o WhatsApp?", paragraphs: ["La web puede reunir información que en las redes queda dispersa: tus servicios, trabajos, preguntas habituales y formas de contacto. También puede ser la página a la que llega alguien desde una búsqueda o un anuncio.", "No todas las acciones necesitan empezar por una web nueva. Revisamos si tu presencia actual permite entender la propuesta y consultar con facilidad. Si falta esa base, mejorarla puede ser una prioridad antes de atraer más visitas."], link: { href: "/diseno-web#preguntas", label: "Entender qué tipo de web necesitás" } },
    { id: "presupuesto", short: "Ordenar la inversión", title: "¿Cómo se trabaja con un presupuesto limitado?", paragraphs: ["Elegimos un objetivo principal, resolvemos los obstáculos más importantes y acordamos una primera etapa que puedas sostener. Distribuir poco presupuesto entre muchas acciones puede dificultar saber qué está funcionando.", "La propuesta debe distinguir estrategia, diseño o contenido, gestión e inversión en anuncios cuando corresponda. También dejamos claro qué materiales aportás vos y qué producimos nosotros, para evitar que una parte necesaria quede fuera del cálculo."] },
    { id: "resultados", short: "Evaluar resultados", title: "¿Cómo sé si funciona y cuándo conviene ajustar?", paragraphs: ["Definimos qué vamos a observar antes de empezar. Para conseguir turnos, por ejemplo, podemos revisar consultas recibidas, cuántas corresponden al servicio y cuántas terminan en una reserva. Las visitas y las interacciones ayudan a entender el camino, pero no lo explican todo.", "Acordamos revisiones según el tipo de acción y la información disponible. Si llegan consultas equivocadas, revisamos el mensaje y el público. Si hay interés pero no se concreta, también miramos la propuesta y la atención. Cada ajuste debe responder a lo que encontramos."] },
    { id: "trabajo-juntos", short: "Cómo empezamos", title: "¿Qué hace ORIAVISIÓN y qué necesitás aportar vos?", paragraphs: ["Podemos ayudarte a ordenar objetivos, revisar tu presencia digital y definir un plan de trabajo. El diseño web, el SEO, los contenidos y las campañas se incorporan según lo acordado; no son un paquete obligatorio.", "De tu lado necesitamos conocer tus servicios, tus clientes, tu disponibilidad y lo que sucede con las consultas. Definimos responsables, materiales, aprobaciones y seguimiento. Para comenzar no necesitás dominar ninguna herramienta: necesitás poder contarnos cómo funciona tu negocio."] },
  ],
  related: [
    { href: "/seo", label: "Qué es el SEO", description: "Trabajar tu presencia en las búsquedas orgánicas." },
    { href: "/google-ads", label: "Publicidad en Google", description: "Llegar a personas que buscan lo que ofrecés." },
    { href: "/meta-ads", label: "Publicidad en Meta", description: "Presentar tu propuesta en Instagram y Facebook." },
  ],
};

export const metaGuide: ServiceGuide = {
  kind: "meta",
  name: "Meta Ads · Instagram y Facebook",
  title: "Publicidad en Meta.",
  intro: "Anuncios para presentar tu negocio en Instagram y Facebook. Conocé qué hace falta para poner una campaña en marcha y cómo distinguir atención de oportunidades reales.",
  inquiry: contactLinks.meta,
  ctaTitle: "¿Qué te gustaría que pase después de ver tu anuncio?",
  ctaText: "Una consulta, un pedido de turno o una visita a tu web. Contanos tu objetivo y la propuesta que querés comunicar para conversar sobre una campaña posible.",
  ctaLabel: "Consultar por una campaña en Meta",
  questions: [
    { id: "que-es", short: "Qué es Meta Ads", title: "¿Qué es Meta Ads y dónde se ven los anuncios?", paragraphs: ["Es la plataforma publicitaria de Meta, la empresa de Facebook e Instagram. Permite crear campañas pagas que pueden aparecer, por ejemplo, en el inicio, las historias o los reels de esas aplicaciones, según la configuración.", "Un anuncio puede mostrar tu propuesta a personas que todavía no siguen tu cuenta. El trabajo consiste en definir qué querés conseguir, qué mensaje tiene sentido y adónde va la persona que se interesa."] },
    { id: "para-que-sirve", short: "Cuándo puede servir", title: "¿En qué situaciones puede servirle a mi negocio?", paragraphs: ["Puede ser una opción para presentar un servicio, mostrar un producto o dar a conocer una propuesta a nuevas personas. Conviene que lo ofrecido se entienda rápido y que haya una acción clara para seguir.", "Antes de invertir revisamos qué querés promover, dónde podés atender y si contás con imágenes, videos o información adecuados. También importa que puedas responder a quienes consulten."], example: "Una cafetería podría mostrar su espacio y su propuesta para invitar a conocerla. Un profesional podría explicar un servicio y facilitar una consulta. Cada caso necesita un mensaje y una forma de evaluar el interés diferentes." },
    { id: "promocionar", short: "Promocionar o planificar", title: "¿Es lo mismo que tocar «Promocionar publicación»?", paragraphs: ["Promocionar una publicación también es hacer publicidad. Es una manera más simple de dar difusión a un contenido existente. El Administrador de anuncios permite organizar campañas y trabajar con más opciones de configuración y seguimiento.", "Lo central es tener un objetivo y una forma de comprobarlo. Para una campaña proponemos acordar público, mensajes, inversión y medición, y revisar lo que ocurre después de publicarla, en vez de dejarla funcionando sin seguimiento."] },
    { id: "destino", short: "Web o WhatsApp", title: "¿Necesito una web o pueden escribirme por WhatsApp?", paragraphs: ["Según el objetivo y la configuración disponible, los anuncios pueden llevar a una web, abrir una conversación o usar un formulario dentro de la plataforma. No todas las campañas necesitan el mismo destino.", "Si el servicio requiere explicación, una página puede ayudar a resolver dudas antes del contacto. Si la consulta es directa, la mensajería puede ser útil. En ambos casos revisamos qué información recibirá la persona y quién va a responderle."], link: { href: "/diseno-web#tipos-de-web", label: "Qué es una página para una campaña" } },
    { id: "publicos-y-piezas", short: "Públicos y anuncios", title: "¿Cómo deciden a quién mostrar los anuncios y qué publicar?", paragraphs: ["Partimos de tus clientes, tu zona de atención y el servicio que querés ofrecer. Con las opciones que permita la plataforma, definimos una configuración acorde a ese objetivo y preparamos mensajes que dejen claro para quién es la propuesta.", "Las piezas pueden incluir fotos, videos y textos. Acordamos qué aportás y qué se produce, y probamos variantes con un motivo: por ejemplo, explicar mejor un beneficio o responder una duda frecuente. Elegir un público no garantiza que cada persona que vea el anuncio vaya a comprar."] },
    { id: "inversion", short: "Inversión y honorarios", title: "¿Cuánto necesito invertir y qué estoy pagando?", paragraphs: ["No hay una cifra útil para todos los negocios. Primero evaluamos objetivo, zona, propuesta, material disponible y duración de la etapa inicial. El presupuesto tiene que permitir observar resultados sin comprometer una suma que no puedas sostener.", "Distinguimos el dinero destinado a la plataforma de los honorarios por preparar, gestionar y revisar la campaña. La producción de piezas o una página de destino se detalla cuando forma parte del trabajo. Todo ese alcance debe quedar acordado antes de empezar."] },
    { id: "tiempos", short: "Cuándo evaluar", title: "¿Voy a conseguir clientes apenas se publique la campaña?", paragraphs: ["No se puede asegurar. Publicar permite empezar a mostrar los anuncios y reunir información, pero las consultas y las ventas dependen también de la propuesta, el mensaje, la competencia y la atención.", "Acordamos qué mirar y cuándo revisar según la inversión y el volumen de resultados. Un día aislado puede decir poco. Si encontramos un problema claro, lo corregimos; si faltan datos, evitamos sacar conclusiones apresuradas o cambiar todo a la vez."] },
    { id: "medicion", short: "Consultas y resultados", title: "¿Cómo se mide si la campaña sirve, más allá de los likes?", paragraphs: ["Miramos lo que corresponde al objetivo: alcance, visitas, conversaciones o solicitudes, junto con su costo. Después necesitamos saber si esas consultas eran pertinentes y qué ocurrió con ellas.", "Un mensaje puede ser una duda, no una venta. Si llegan muchas consultas que no encajan, revisamos el anuncio y la propuesta. Si son adecuadas pero no avanzan, revisamos con vos la respuesta, la disponibilidad y las condiciones del servicio."], example: "Una campaña para turnos necesita saber cuántas consultas llegaron y cuántas terminaron en reservas. Contar solamente las reacciones a la publicación dejaría afuera esa diferencia." },
    { id: "comenzar", short: "Qué hace falta", title: "¿Qué necesitamos para comenzar a trabajar juntos?", paragraphs: ["Tu propuesta, zona de atención, perfiles actuales, materiales disponibles y un presupuesto a evaluar. Revisamos las cuentas y los accesos necesarios, quién prepara las piezas y quién aprueba el contenido antes de publicarlo.", "También acordamos quién responde los mensajes y cómo nos vas a compartir lo que pasa con las consultas. Si falta una base importante, como información clara del servicio o capacidad de respuesta, la incluimos entre las prioridades antes de lanzar."] },
  ],
  related: [
    { href: "/marketing-digital", label: "Tu estrategia digital", description: "Definir qué papel cumple una campaña en tu negocio." },
    { href: "/google-ads", label: "Publicidad en Google", description: "La diferencia entre descubrir una propuesta y buscarla." },
  ],
  sources: [
    { href: "https://www.facebookblueprint.com/student/page/663949-grow-your-business-with-meta-ads", label: "Introducción a Meta Ads · Meta Blueprint" },
    { href: "https://www.facebookblueprint.com/student/page/652744-optimize-for-purchases-with-ads-that-click-to-message", label: "Anuncios que abren conversaciones · Meta Blueprint" },
  ],
};

export const googleGuide: ServiceGuide = {
  kind: "google",
  name: "Google Ads",
  title: "Publicidad en Google.",
  intro: "Llegar a personas que están buscando lo que ofrecés. Te explicamos cómo se piensa una campaña de búsqueda, qué incluye el trabajo y cómo se evalúa la inversión.",
  inquiry: contactLinks.google,
  ctaTitle: "¿Qué servicio querés que encuentren en Google?",
  ctaText: "Compartinos qué ofrecés, dónde atendés y a qué página llegarían las visitas. Con eso podemos conversar sobre el objetivo y el alcance de una campaña.",
  ctaLabel: "Consultar por una campaña en Google",
  questions: [
    { id: "que-es", short: "Qué es Google Ads", title: "¿Qué es Google Ads y cómo funciona una campaña de búsqueda?", paragraphs: ["Google Ads es la plataforma de publicidad de Google. En una campaña de búsqueda, tus anuncios pueden aparecer ante búsquedas relacionadas con los productos o servicios que ofrecés. Son espacios publicitarios, diferenciados de los resultados orgánicos.", "Definimos qué consultas interesa alcanzar, el mensaje, la zona y el presupuesto. Tu anuncio compite por mostrarse según la subasta y su configuración; pagar no significa aparecer siempre ni ocupar una posición fija."] },
    { id: "diferencias", short: "Google, SEO o Meta", title: "¿En qué se diferencia del SEO y de anunciar en Instagram?", paragraphs: ["El SEO trabaja la presencia orgánica de tu sitio. Google Ads permite invertir en anuncios, sin comprar una mejora en ese posicionamiento orgánico.", "En las campañas de búsqueda partimos de lo que la persona está buscando en ese momento. En Instagram o Facebook, un anuncio puede presentar una propuesta mientras recorre contenido. Son situaciones distintas: conviene elegir según tu servicio, la demanda y la forma en que decide tu cliente."], link: { href: "/seo#seo-o-anuncios", label: "Entender la diferencia con el SEO orgánico" } },
    { id: "cuando-conviene", short: "Cuándo puede servir", title: "¿Cómo sabemos si le puede servir a mi negocio?", paragraphs: ["Revisamos si existen búsquedas relacionadas con tu oferta, en qué zona necesitás aparecer y qué consultas serían valiosas. También importa el valor de cada contratación y tu capacidad para atender nuevos pedidos.", "Si todavía no está claro qué ofrecés o la página no permite consultar fácilmente, conviene resolverlo antes. No todos los servicios tienen la misma demanda ni el mismo costo para competir."], example: "Para un electricista que atiende en una zona, puede tener sentido estudiar búsquedas que expresen esa necesidad y ubicación. Atraer visitas de lugares donde no trabaja difícilmente ayude a su objetivo." },
    { id: "palabras-clave", short: "Elegir las búsquedas", title: "¿Qué son las palabras clave y por qué hay que revisarlas?", paragraphs: ["Son palabras o expresiones que orientan qué búsquedas pueden activar los anuncios. No se trata de elegir las más populares, sino las relacionadas con la necesidad que podés resolver.", "Revisamos los términos de búsqueda disponibles en los informes y agregamos exclusiones cuando corresponda. Por ejemplo, una consulta para aprender a hacer algo puede tener una intención distinta de otra que busca contratar un servicio. Esa revisión ayuda a cuidar la relevancia de la campaña."] },
    { id: "pagina-de-destino", short: "La página de destino", title: "¿A qué página debería llegar quien hace clic?", paragraphs: ["A una página que continúe lo que prometió el anuncio: el servicio, sus condiciones, la zona de atención y una forma clara de contacto. Si publicitás algo específico, enviar a una portada genérica puede obligar a la persona a buscar otra vez.", "La página debe ser fácil de usar, especialmente en celular. Revisamos el contenido, la carga y el funcionamiento de los contactos. Una landing page es justamente una página pensada para ese objetivo concreto."], link: { href: "/diseno-web#tipos-de-web", label: "Cómo diseñamos una página para tu campaña" } },
    { id: "presupuesto", short: "Costos y presupuesto", title: "¿Cómo se define el presupuesto y qué incluye el servicio?", paragraphs: ["En las campañas de búsqueda suele pagarse por clic, y el costo varía según la competencia y la campaña. Estimamos una inversión según el objetivo y las búsquedas que queramos trabajar, y revisamos si tiene sentido para tu actividad.", "Separamos la inversión publicitaria de la gestión. La propuesta detalla configuración, anuncios, medición y seguimiento; si hay que crear o mejorar la página de destino, también queda especificado. Un presupuesto mayor, por sí solo, no garantiza rentabilidad."] },
    { id: "medicion", short: "Cómo se mide", title: "¿Cómo sabré si los clics se convierten en oportunidades?", paragraphs: ["Antes de activar, definimos las acciones valiosas para tu negocio, como formularios enviados o solicitudes de contacto, y configuramos la medición que corresponda. A esas acciones se las suele llamar conversiones.", "Después evaluamos cantidad, costo y calidad de las consultas. Un clic en un botón puede mostrar intención, pero no confirma una venta. Por eso contrastamos los datos de la plataforma con lo que realmente recibís y concretás en tu negocio."] },
    { id: "plazos", short: "Expectativas y ajustes", title: "¿Los resultados son inmediatos y qué pasa si pauso?", paragraphs: ["Una campaña puede empezar a generar visibilidad cuando queda habilitada para publicarse, pero necesita datos y revisiones para evaluar su desempeño. No podemos prometer una cantidad de clientes ni rentabilidad desde el primer día.", "Al pausar los anuncios, dejás de recibir la exposición que dependía de esa campaña. Eso no equivale a perder o ganar posiciones orgánicas. Revisamos las decisiones con tus objetivos, presupuesto y resultados en mente."] },
    { id: "empezar", short: "Cómo empezamos", title: "¿Qué necesitás de mí para preparar una campaña?", paragraphs: ["Necesitamos conocer tus servicios, zona, horarios, condiciones de contratación y objetivo. Revisamos el sitio al que llegarán las visitas, las cuentas disponibles y cómo se reciben las consultas.", "Acordamos presupuesto, piezas, responsables y seguimiento antes de activar. Si ya tenés campañas, podemos comenzar revisando su información y qué ocurrió con las consultas, para decidir qué conservar y qué ajustar."] },
  ],
  related: [
    { href: "/seo", label: "Qué es el SEO", description: "Desarrollar la presencia orgánica de tu web." },
    { href: "/marketing-digital", label: "Tu estrategia digital", description: "Elegir las acciones según tu objetivo." },
  ],
  sources: [
    { href: "https://support.google.com/google-ads/answer/6242914?hl=es", label: "Presupuestos y pujas · Ayuda de Google Ads" },
    { href: "https://support.google.com/google-ads/answer/14086?hl=es", label: "Qué es una página de destino · Google Ads" },
  ],
};

export const webGuide: ServiceGuide = {
  kind: "web",
  name: "Diseño web",
  title: "Cómo creamos tu sitio.",
  intro: "Las dudas que conviene resolver antes de diseñar, mejorar o publicar tu web.",
  inquiry: contactLinks.web,
  ctaTitle: "Tu sitio empieza con lo que necesitás resolver.",
  ctaText: "Contanos qué hacés, si ya tenés una web y qué te gustaría que puedan hacer quienes te visiten. Podemos definir una propuesta a partir de eso.",
  ctaLabel: "Consultar por mi sitio web",
  questions: [
    { id: "para-que-una-web", short: "Para qué una web", title: "¿Para qué necesito una web si ya tengo redes sociales?", paragraphs: ["Una web reúne tu propuesta en un lugar organizado: qué hacés, a quién ayudás, tus trabajos y cómo contactarte. Puede darle a quien llega desde una recomendación, una búsqueda o una red la información que necesita para decidir.", "Las redes y la web pueden complementarse. Si hoy las consultas repiten siempre las mismas dudas o cuesta encontrar tus servicios, un sitio claro puede resolver parte de ese recorrido."] },
    { id: "tipos-de-web", short: "Qué tipo de sitio", title: "¿Me conviene un sitio institucional, una landing o una tienda?", paragraphs: ["Un sitio institucional o profesional presenta tu actividad y puede desarrollar varios servicios. Una landing page concentra una propuesta y un objetivo, como consultar por un servicio o acompañar una campaña.", "Una tienda online suma catálogo, compra y una operación de pagos y entregas que hay que planificar. Elegimos la solución según lo que necesitás que haga el visitante: vender online es una posibilidad, no un requisito para tener una buena web."] },
    { id: "sitio-existente", short: "Mejorar lo que tenés", title: "¿Pueden mejorar mi sitio actual sin empezar de cero?", paragraphs: ["Sí. Primero revisamos su contenido, estructura y funcionamiento. Puede alcanzar con ordenar servicios, mejorar la lectura en celulares o facilitar el contacto. Si hay limitaciones de fondo, evaluamos un rediseño.", "También revisamos qué conviene conservar. Si cambia la dirección de una página, contemplamos las redirecciones necesarias para que los enlaces existentes sigan llevando a contenido útil."] },
    { id: "alcance", short: "Qué incluye", title: "¿Qué incluye el diseño y desarrollo?", paragraphs: ["Acordamos las páginas, funciones, navegación e identidad visual del sitio. El trabajo contempla cómo se presenta el contenido, cómo se usa en celulares y escritorio, y cómo se llega al contacto.", "El presupuesto especifica la preparación de textos e imágenes, los formularios o integraciones y las revisiones incluidas. También dejamos definidos el dominio —la dirección del sitio— y el alojamiento, que permite mantenerlo online, con sus responsabilidades y costos correspondientes."] },
    { id: "materiales", short: "Qué tenés que aportar", title: "¿Tengo que tener listos todos los textos y las fotos?", paragraphs: ["No hace falta tener todo resuelto para la primera conversación. Necesitamos entender tus servicios, tu público, tus datos de contacto y la información que no puede faltar. El material disponible ayuda a definir el alcance.", "Podemos acordar qué contenido preparás vos y cuál desarrollamos nosotros. Antes de publicar, revisás la exactitud de la información. Las fotos, los textos y las aprobaciones pendientes también influyen en el plazo."] },
    { id: "seo-y-celular", short: "Celular y Google", title: "¿Se va a ver bien en el celular y aparecer en Google?", paragraphs: ["La adaptación a celulares forma parte del diseño: revisamos lectura, botones, navegación y contacto en distintas pantallas. También contemplamos una estructura y un contenido preparados para trabajar el SEO.", "Eso no garantiza una posición en Google. El posicionamiento orgánico implica un trabajo propio de análisis, mejoras y seguimiento, cuyo alcance se define por separado."], link: { href: "/seo", label: "Entender qué implica el SEO orgánico" } },
    { id: "plazo-y-precio", short: "Plazo y presupuesto", title: "¿Cuánto tarda y cómo se define el precio?", paragraphs: ["Depende de la cantidad de páginas, las funciones, el contenido disponible y las integraciones. Antes de comenzar, acordamos alcance, precio, etapas y un plazo según esas necesidades.", "Primero definimos la dirección, después trabajamos sobre una versión navegable y revisamos el resultado antes de publicarlo. Si aparece una función nueva durante el proceso, evaluamos su impacto para que puedas decidir cómo avanzar."] },
    { id: "despues-de-publicar", short: "Después de publicar", title: "¿Qué pasa después de publicar? ¿Puedo actualizarlo?", paragraphs: ["La forma de actualizar el sitio depende de la solución elegida y de qué quieras gestionar por tu cuenta. Conviene definirlo desde el inicio, junto con los accesos, el dominio y la continuidad del alojamiento.", "El mantenimiento, las mejoras y el contenido periódico se acuerdan según tus necesidades. Antes de la entrega dejamos claro qué incluye el proyecto y qué tareas posteriores requieren otro alcance, para que sepas cómo mantener tu web al día."] },
  ],
  related: [
    { href: "/seo", label: "Qué es el SEO", description: "El siguiente paso para trabajar tu presencia en Google." },
    { href: "/trabajos-realizados", label: "Ver trabajos realizados", description: "Sitios que podés recorrer para conocer nuestro trabajo." },
  ],
};
