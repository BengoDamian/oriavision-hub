# Nubrexa · catálogo de marca blanca

Versión del 01/10/2026: 8 rubros y 30 variantes.

## Subir la actualización

Copiá el contenido de este ZIP dentro de tu repositorio nubrexa-landing, reemplazando los archivos existentes. index.html debe quedar en la raíz. Conservá la carpeta .git de tu repositorio. Luego hacé commit y push para que Cloudflare Pages publique los cambios.

## Abrir localmente

En Visual Studio Code, abrí la carpeta del proyecto y ejecutá en la terminal:

```
python -m http.server 8000
```

Abrí http://localhost:8000/ en el navegador.

## Navegación

- “Ver proyectos” y “Ver rubros” llevan a coleccion.html#rubros.
- El índice tiene buscador y muestra todas las categorías.
- Al elegir una categoría, se muestra únicamente ese rubro.
- “Todos los rubros” vuelve al índice. El selector permite cambiar de rubro.
- Los enlaces anteriores (#art-nails, #barberia, etc.) siguen funcionando.
- La selección de paleta se conserva en la dirección al navegar.
- En celular las paletas se distribuyen en dos columnas, junto a la vista previa.

## Variantes

- Uñas y estética: 4.
- Peluquería y barbería (un solo rubro): 4.
- Café y gastronomía: 4 (Azul & Marfil del ZIP anterior, Verde & Arena del enlace original actual, Bosque y Tierra).
- Tatuajes: 4 (Neón, Clásico, Original y Oxide).
- Pilates y bienestar: 4.
- Arquitectura y seguridad: 4.
- Parrillas y quinchos: 2 (Watorii Original y Turquesa).
- Veterinaria y mascotas: 4 (Original, Tropical, Azul & Dorado y Petróleo), sin contactos activos.

## Agregar rubros o paletas

1. Agregá los datos a catalogo.json siguiendo las entradas existentes.
2. Guardá la demo local en demos/ y la captura de 1200 × 750 en assets/previews/.
3. Ejecutá:

```
python scripts/build_catalog.py
python scripts/build_assets.py
```

El índice, las fichas, los selectores y los contadores se generan desde catalogo.json. Para agregar nuevas categorías, revisá también el texto breve de rubros de la portada.

## Marca blanca

Las demostraciones son locales. En Watorii se conservan activos los contactos originales: WhatsApp, teléfonos, ubicación, reseñas de Google y enlaces al sitio del negocio. En los demás rubros, los botones de contacto, teléfono, WhatsApp y reservas están desactivados. Fuera de Watorii no se envían formularios ni se incluyen números o correo. Ninguna demo incluye credenciales, paneles administrativos o servicios de reservas. Las cartas, notas, páginas de modelos y navegación interna siguen disponibles.

No hacen falta Node.js, bases de datos ni comandos de compilación en Cloudflare. Framework: None. Directorio de salida: raíz del repositorio.
