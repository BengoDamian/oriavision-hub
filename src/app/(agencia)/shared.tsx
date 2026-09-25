export const WHATSAPP_NUMBER = "5491127575675";

/** Enlace de WhatsApp con mensaje prearmado (equivale al data-contact de la referencia). */
export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Logotipo original encuadrado en su proporción; el filtro CSS lo pasa a blanco sobre verde. */
export function BrandLogo() {
  return (
    <svg className="brand-logo" viewBox="185 215 1208 255" role="img" aria-label="ORIAVISION">
      <image href="/assets/oriavision-logo-original.jpg" width="1536" height="699" />
    </svg>
  );
}
