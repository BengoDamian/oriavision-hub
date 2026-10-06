// Converts the public render into editable static source, including hidden FAQ
// content from public RSC data. No original executable code or backend is shipped.
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { load } from 'cheerio';

const variants = JSON.parse(readFileSync('demo-sources/abogados/variants.json', 'utf8'));
function rscObjects(html) {
  const records = [];
  for (const match of html.matchAll(/\.rsc\.push\(("(?:[^"\\]|\\.)*")\)/g)) {
    const chunk = JSON.parse(match[1]);
    for (const row of chunk.split('\n')) {
      try { records.push(JSON.parse(row.slice(row.indexOf(':') + 1))); } catch {}
    }
  }
  return records;
}
function findFAQs(value, result = []) {
  if (!value || typeof value !== 'object') return result;
  if (Array.isArray(value.items) && value.items.every(i => Array.isArray(i) && i.length === 2 && i.every(s => typeof s === 'string'))) result.push(...value.items);
  for (const item of Object.values(value)) findFAQs(item, result);
  return result;
}
for (const variant of variants) {
  const source = resolve('.tool-cache/law-references', variant.sourceId ?? variant.id);
  const destination = resolve('demo-sources/abogados', variant.id);
  const manifest = JSON.parse(readFileSync(resolve(source, 'manifest.json'), 'utf8'));
  for (const resource of manifest.resources.filter(path => !/\.(js|json)$/.test(path))) {
    const target = resolve(destination, 'assets', resource.slice(1));
    mkdirSync(dirname(target), {recursive: true});
    if (extname(resource) === '.css') {
      let css = readFileSync(resolve(source, 'assets', resource.slice(1)), 'utf8');
      css = css.replace(/url\((['"]?)\/(?!\/)/g, 'url($1{{BASE}}/');
      writeFileSync(target, css);
    } else cpSync(resolve(source, 'assets', resource.slice(1)), target);
  }
  for (const page of manifest.pages) {
    const pageFile = `${page === '/' ? 'index' : page.slice(1)}/index.html`;
    const html = readFileSync(resolve(source, 'pages', pageFile), 'utf8');
    const faqs = findFAQs(rscObjects(html));
    const $ = load(html);
    $('script,link[rel="modulepreload"],link[as="script"],meta[name="robots"],link[rel="canonical"],iframe,.socials,.contact-map,.footer-demo-address,a[href^="/administracion"]').remove();
    $('link[rel="preconnect"],link[rel="dns-prefetch"]').remove();
    $('[data-slot="accordion-item"]').each((index, item) => {
      const answer = faqs.find(([q]) => $(item).find('button').text().trim() === q)?.[1];
      if (!answer) throw new Error(`Missing FAQ: ${variant.id} ${page} ${index}`);
      const region = $(item).find('[data-slot="accordion-content"]');
      region.removeAttr('style').append($('<div class="text-base text-muted-foreground leading-relaxed pb-5"></div>').text(answer));
      $(item).find('button').attr('aria-controls', region.attr('id'));
    });
    $('.contact-row').each((_, row) => {
      if ($(row).find('.lucide-map-pin,.lucide-clock3,.lucide-clock-3').length) $(row).remove();
      else if ($(row).text().includes('Correo electrónico')) {
        $(row).find('strong').text('Sitio de ORIAVISION');
        $(row).find('button').replaceWith('<a class="contact-value" href="https://www.oriavision.com.ar/">www.oriavision.com.ar</a>');
      }
    });
    $('p').each((_, el) => { if ($(el).text().includes('Carrer de Mallorca')) $(el).remove(); });
    $('.topbar .container').html('<span>Sitio de demostración · {{VARIANT}}</span><span>Consultas sobre este diseño a ORIAVISION</span>');
    $('.contact-layout').css('grid-template-columns', 'minmax(0, 1fr)');
    $('.footer-inner > div:last-child h3').text('Consultas a ORIAVISION');
    $('.footer-inner > div:last-child .footer-links').html('<a href="{{WHATSAPP}}" data-oria-contact>WhatsApp +54 9 11 2757-5675</a><a href="https://www.oriavision.com.ar/">www.oriavision.com.ar</a><a href="https://www.oriavision.com.ar/rubros/">Ver más diseños</a>');
    $('button').each((_, el) => {
      const button = $(el);
      if (button.is('[data-whatsapp-inline],.whatsapp-bar') || /WhatsApp|\+34 600/.test(button.text())) {
        const link = $('<a></a>').attr('href', '{{WHATSAPP}}').attr('data-oria-contact', '').attr('class', button.attr('class') || '').html(button.html());
        if (button.attr('data-whatsapp-inline')) link.attr('data-whatsapp-inline', 'true');
        if (button.hasClass('whatsapp-bar')) link.attr('aria-label', 'Consultar sobre este diseño a ORIAVISION').attr('aria-hidden', 'true').attr('tabindex', '-1');
        link.html(link.html().replaceAll('+34 600 000 000', '+54 9 11 2757-5675'));
        button.replaceWith(link);
      }
    });
    $('.wa-bar-copy strong').text('Tu próximo sitio, el primer paso.');
    $('.wa-bar-copy > span').text('Consultas sobre este diseño a ORIAVISION');
    $('.contact-row small').text('Consultas comerciales sobre este diseño a ORIAVISION');
    $('.footer-bottom > span').text('Sitio de demostración. Consultas sobre este diseño a ORIAVISION');
    $('.footer-bottom .footer-links').append('<a href="https://www.oriavision.com.ar/rubros/">Ver más diseños</a>');
    if (page === '/aviso-legal') {
      $('main').html('<div class="container"><div class="page-intro"><span class="kicker">Información del sitio</span><h1>Sitio de demostración</h1><p>Consultas sobre este diseño a ORIAVISION.</p></div><div class="prose"><h2>Una muestra de diseño para estudios jurídicos</h2><p>La identidad profesional, los servicios, las publicaciones y las opiniones se muestran como contenido de ejemplo. No se ofrecen servicios jurídicos ni se reciben consultas legales en este sitio.</p><h2>Contacto comercial</h2><p>Todos los contactos se dirigen a ORIAVISION para consultar por el diseño web.</p><p><a href="{{WHATSAPP}}" data-oria-contact>WhatsApp +54 9 11 2757-5675</a></p><p><a href="https://www.oriavision.com.ar/">www.oriavision.com.ar</a> · <a href="https://www.oriavision.com.ar/rubros/">Ver más diseños</a></p><h2>Privacidad</h2><p>Esta demostración no registra turnos, no almacena datos de formularios ni envía notificaciones. WhatsApp se abre únicamente cuando elegís su enlace; no se envía ningún mensaje automáticamente.</p></div></div>');
    }
    // A static navigation drawer retains the public links; no React hydration.
    const nav = $('.nav').html();
    $('body').append(`<dialog class="oria-menu" aria-label="Navegación móvil"><button class="oria-menu-close" type="button" aria-label="Cerrar menú">×</button><div class="brand-name">{{PROFESSIONAL}}<small>Demostración · ORIAVISION</small></div><nav class="mobile-links">${nav}</nav></dialog>`);
    $('.menu-toggle').attr('aria-controls', 'oria-menu');
    $('.oria-menu').attr('id', 'oria-menu');
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (/^https?:/.test(href) && !href.startsWith('https://www.oriavision.com.ar/')) {
        // Keep neutral editorial source references, never commercial profiles.
        if (!/^(https:\/\/(?:www\.)?(?:boe\.es|tribunalconstitucional\.es|poderjudicial\.es|consumo\.gob\.es)\/)/.test(href)) $(el).replaceWith($('<span></span>').html($(el).html()));
      }
    });
    $('a[href],link[href],img[src],source[src]').each((_, el) => {
      for (const attr of ['href','src']) {
        const value = $(el).attr(attr);
        if (!value?.startsWith('/') || value.startsWith('//')) continue;
        const [pathname, fragment] = value.split('#');
        const local = extname(pathname) ? pathname : (pathname.replace(/\/$/, '') + '/');
        $(el).attr(attr, `{{BASE}}${local}${fragment ? '#' + fragment : ''}`);
      }
    });
    $('[style]').each((_, el) => $(el).attr('style', $(el).attr('style').replace(/url\((['"]?)\//g, 'url($1{{BASE}}/')));
    $('form').each((_, el) => $(el).removeAttr('action').attr('data-demo-form', ''));
    $('title').text(`Estudio jurídico · {{VARIANT}} · ORIAVISION`);
    $('meta[property^="og:"],meta[name^="twitter:"]').remove();
    $('link[rel="icon"],link[rel="shortcut icon"]').remove();
    $('head').append('<link rel="icon" type="image/svg+xml" href="{{BASE}}/favicon.svg">');
    $('head').append('<meta name="robots" content="noindex,nofollow"><link rel="canonical" href="{{CANONICAL}}"><link rel="stylesheet" href="{{BASE}}/demo.css"><script src="{{BASE}}/demo.js" defer></script>');
    let result = $.html().replaceAll('Matías Ferlante', '{{PROFESSIONAL}}').replaceAll('contacto@ferlante.example', 'www.oriavision.com.ar').replaceAll('+34 600 000 000', '+54 9 11 2757-5675');
    const unsafe = result.match(/.{0,120}(?:chatgpt\.site|<iframe|\/administracion|maps\.google|Carrer de Mallorca).{0,200}/);
    if (unsafe) throw new Error(`Unsafe leftover: ${variant.id} ${page}: ${unsafe[0]}`);
    const target = resolve(destination, 'pages', pageFile);
    mkdirSync(dirname(target), {recursive: true});
    writeFileSync(target, result);
  }
  writeFileSync(resolve(destination, 'manifest.json'), JSON.stringify({variant: variant.id, source: manifest.origin, retrieved: '2026-10-06', pages: manifest.pages}, null, 2));
  console.log(`${variant.id}: fuente estática editable preparada (${manifest.pages.length} páginas)`);
}
