# ORIAVISION HUB 🚀

Landing + Hub de recursos para vendedores de **MercadoLibre Argentina**.

**Oriavision Hub** es una web tipo SaaS (clean, rápida y mobile-first) pensada para:
- Mostrar nuestra herramienta principal (**Calculadora ML**)
- Publicar **Guías** prácticas (para leer y aplicar)
- Publicar **Prompts** listos para usar
- Captar mails con **Newsletter** (Brevo) y automatizar el **mail de bienvenida**

---

## ✨ Qué incluye

### ✅ Landing (Home)
- Hero + CTA claros
- Sección Herramientas (hoy: **Calculadora ML**)
- Preview de **Prompts** (cards → detalle)
- Preview de **Guías** (cards → detalle)
- Sección “Quiénes somos”
- CTA final de contacto
- Botones flotantes:
  - **Calculadora ML** (abajo izquierda)
  - **WhatsApp** (abajo derecha)

### ✅ Prompts
- Listado: `/prompts`
- Detalle: `/prompts/[id]`
- En el detalle se muestra el prompt completo y **se puede copiar** (CopyButton)
- Datos en `src/lib/prompts.ts`

### ✅ Guías
- Listado: `/guias`
- Detalle: `/guias/[id]`
- Guías pensadas para **leer**, con estética tipo artículo
- Datos en `src/lib/guides.ts`

### ✅ Newsletter (Brevo)
- Formulario de suscripción en Home (al final)
- Endpoint serverless en Cloudflare Pages Functions:
  - `POST /api/subscribe` → agrega/actualiza contacto en Brevo y lo mete en una lista
- Automatización en Brevo:
  - **Welcome email** automático al entrar a la lista

---

## 🧱 Stack
- **Next.js (App Router)**
- **Tailwind CSS**
- **Cloudflare Pages** (deploy)
- **Cloudflare Pages Functions** (API)
- **Brevo** (newsletter + automatizaciones)
- Componentes UI: `Reveal` (scroll animations) + `Blob` (decoración)

---

## ⚙️ Configuración de Newsletter (Brevo + Cloudflare)

### 1) Crear lista en Brevo
En Brevo → Contactos → Listas  
Creá una lista (ej: “Oriavision Newsletter”) y guardá el **List ID**.

### 2) Crear API Key en Brevo
Brevo → Settings → SMTP y API → **Claves API**  
Generá una API Key.

### 3) Variables de entorno en Cloudflare Pages
Cloudflare → Pages → tu proyecto → Settings → Environment variables

Agregar:
- `BREVO_API_KEY` = tu API key
- `BREVO_LIST_ID` = el ID numérico de la lista

### 4) Endpoint
El endpoint vive en:
- `functions/api/subscribe.ts`

El front envía:
- `POST /api/subscribe` con JSON `{ "email": "..." }`

---

## 🖥️ Desarrollo local

```bash
npm install
npm run dev