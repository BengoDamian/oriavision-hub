# Oriavision

Sitio de Oriavision para Cloudflare Pages. La portada, los servicios, trabajos, inspiración, guías vigentes y páginas legales reproducen la versión 53 del ZIP `oriavision-codigo-completo-v53.zip` del 4 de noviembre de 2026.

## Editar y ejecutar

- `site/`: HTML, CSS, JavaScript y recursos originales de la referencia. Esta es la fuente del diseño nuevo.
- `src/app/(site)/`: recursos anteriores que siguen disponibles, incluidos prompts, Inbox y guías archivadas. Comparten encabezado y pie con la referencia.
- `public/demos/` y `demo-sources/`: diseños de muestra existentes.
- `functions/`: integraciones y enrutamiento de Cloudflare Pages.
- `out/`: resultado completo generado, listo para publicar. No editar esta carpeta manualmente.

```sh
npm ci
npm run dev
```

En Windows con restricciones de PowerShell se puede usar `npm.cmd` en lugar de `npm`. `dev` compila y sirve el sitio final en `http://127.0.0.1:3000`. Después de editar, ejecutar nuevamente `npm run build` y recargar el navegador; el servidor sirve los archivos nuevos sin reiniciarse.

```sh
npm run build
npm start
```

La compilación conserva la exportación estática de Next para los recursos anteriores, incorpora las páginas de `site/`, prepara el SEO y ejecuta las comprobaciones. `next dev` por sí solo muestra las plantillas anteriores y no es la vista previa del sitio final. El antiguo `index.html` de la raíz pertenece al catálogo anterior; no es la portada publicada.

## Cloudflare Pages

- Comando de compilación: `npm run build`.
- Directorio de salida: `out`.
- Conservar las Functions, variables de entorno e integraciones existentes.
- No publicar la raíz del repositorio ni solamente `site/`: omitiría las demos, recursos anteriores e integraciones.

Los cambios quedan preparados en el repositorio; compilar localmente no modifica la publicación en producción.

## Rutas e indexación

`scripts/site-config.mjs` define las 15 direcciones anteriores y sus reemplazos permanentes. Se aplican tanto en el middleware de Cloudflare como en `_redirects`, evitando depender de redirecciones que Pages Functions puede omitir. Se mantienen los parámetros de consulta. Cada página nueva tiene su propio `index.html`, URL canónica en `https://www.oriavision.com.ar`, título, descripción y datos para compartir.

El sitemap contiene las 30 páginas públicas de la referencia y los recursos vigentes anteriores. Las pruebas de animación, las guías archivadas y las páginas de redirección mantienen `noindex`. `robots.txt` permite el rastreo público y declara el sitemap. Las URL desconocidas devuelven un 404 real para evitar contenido duplicado y falsos éxitos. La indexación efectiva depende de que el sitio se publique y los buscadores lo rastreen.

## Verificación

```sh
npm run qa:site
node scripts/qa-reference-site.mjs --url http://127.0.0.1:3000
```

La auditoría comprueba páginas, enlaces y anclas internas, recursos, sitemap, canónicas, redirecciones y compatibilidad del middleware con los dominios de demos. También compara el cuerpo de cada página y los bytes de los recursos con `site/`: los cambios de producción se limitan a enlaces locales, metadatos SEO y la integración de Analytics ya existente.

Con `--url` también comprueba respuestas HTTP, enlaces anteriores con y sin barra final, parámetros de consulta, video por rangos y el estado 404 de una ruta inexistente. Estas comprobaciones no sustituyen una revisión visual en navegador.
