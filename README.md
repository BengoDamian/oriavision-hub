# Oriavision Hub

## Run local
```bash
npm install
npm run dev
```
Abrí http://localhost:3000

## Importante (para que no te vuelva a pasar el error)
Este proyecto está armado con **Tailwind v3** (clásico), compatible con:
- `globals.css` usando `@tailwind base/components/utilities`
- `postcss.config.cjs` usando `tailwindcss` + `autoprefixer`
No usa `@tailwindcss/postcss`.

## Estructura
- `src/lib/tools.ts`: registry de herramientas.
- `src/components/*`: Navbar / Footer / ToolCard / TestimonialCard
- `src/app/*`: páginas (Home, catálogo, detalle, contacto, quienes somos)
