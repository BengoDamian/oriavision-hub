export const SITE_URL = 'https://www.oriavision.com.ar';
export const SOURCE_URL = 'https://oriavision-tiendanube-borrador.ercasa.chatgpt.site';

// Every old public landing has a single permanent destination (no redirect chains).
export const legacyRoutes = {
  '/diseno-web/': '/servicios/diseno-web/',
  '/web/': '/servicios/diseno-web/',
  '/marketing-digital/': '/servicios/marketing-digital/',
  '/seo/': '/servicios/marketing-digital/seo/',
  '/meta-ads/': '/servicios/marketing-digital/meta-ads/',
  '/google-ads/': '/servicios/marketing-digital/google-ads/',
  '/ecommerce/': '/servicios/ecommerce/',
  '/tiendanube/': '/servicios/tiendanube/',
  '/mercado-libre/': '/servicios/mercado-libre/',
  '/proyectos/': '/servicios/diseno-web/inspiracion/',
  '/rubros/': '/servicios/diseno-web/inspiracion/',
  '/inspiracion/': '/servicios/diseno-web/inspiracion/',
  '/trabajos-realizados/': '/trabajos/',
  '/contacto/': '/#contacto',
  '/quienes-somos/': '/#proceso',
};

export function legacyDestination(pathname) {
  const normalized = pathname.endsWith('/') ? pathname : pathname + '/';
  if (Object.hasOwn(legacyRoutes, normalized)) return legacyRoutes[normalized];
  if (pathname.startsWith('/web/')) return '/servicios/diseno-web/';
  if (normalized === '/demos/abogados-espresso-imagen/') return '/demos/abogados-espresso-editorial/';
  if (pathname.startsWith('/demos/abogados-espresso-imagen/')) return pathname.replace('/demos/abogados-espresso-imagen/', '/demos/abogados-espresso-editorial/');
  return null;
}
