const number = "5491127575675";
const inquiry = (service: string) => `https://wa.me/${number}?text=${encodeURIComponent(`Hola, ORIAVISIÓN. Quiero consultar por ${service}.`)}`;

export const designInquiry = (title: string, href: string) => `https://wa.me/${number}?text=${encodeURIComponent(`Hola, ORIAVISIÓN. Me interesa un sitio como ${title}. Quisiera consultar por un proyecto similar. Referencia: ${href}`)}`;

export const contactLinks = {
  general: inquiry("mi proyecto de diseño web, SEO o marketing digital"),
  web: inquiry("el diseño o la mejora de mi sitio web"),
  marketing: inquiry("una estrategia de marketing digital para mi negocio"),
  seo: inquiry("posicionamiento SEO y presencia orgánica en Google"),
  meta: inquiry("campañas en Meta Ads para Facebook e Instagram"),
  google: inquiry("campañas en Google Ads"),
};
