export const SITE_URL = 'https://www.oriavision.com.ar';
export const SOURCE_URL = 'https://oriavision-tiendanube-borrador.ercasa.chatgpt.site';

export function localizeSiteLinks(html) {
  return html.replace(/((?:href|src|data-src|data-preview|data-url|data-project-url)=")https:\/\/(?:www\.)?oriavision\.com\.ar(\/[^"\s]*)/g, (link, attribute, pathname) => {
    // Open the published dental demo from preview deployments as well.
    if (pathname === '/demos/clinica-dental-original/') return link;
    return attribute + pathname;
  });
}

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

// Dates reflect substantive content edits, not each deployment.
export const pageLastModified = {"/trabajos/quirvo/": "2026-11-16", "/servicios/tiendanube/crear-tienda/": "2026-11-16", "/servicios/tiendanube/mejorar-tienda/": "2026-11-16", "/servicios/tiendanube/": "2026-11-16", "/": "2026-11-16", "/trabajos/ercas/": "2026-11-16", "/trabajos/pampatex/": "2026-11-16", "/trabajos/": "2026-11-16"};
