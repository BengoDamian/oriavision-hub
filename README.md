# ORIAVISION HUB 🚀

Landing + hub de recursos para vendedores de **MercadoLibre Argentina** (y Tiendanube), con captación de leads y medición.

**Oriavision Hub** es una web tipo SaaS (clean, rápida y mobile-first) pensada para:
- Mostrar nuestra herramienta principal (**Calculadora ML**)
- Publicar **Guías** prácticas (para leer y aplicar)
- Publicar **Prompts** listos para usar (copiar con 1 click)
- Captar mails con **Newsletter** (Brevo) y automatizar **Welcome email**
- Recibir pedidos de **landing a medida** desde `/web`
- Medir **visitas + clicks + conversiones** con Cloudflare Web Analytics

---

## ✨ Qué incluye

### ✅ Landing (Home)
- Hero + CTA claros
- **LeadMagnet** arriba del fold (animado)
- Sección Herramientas (hoy: **Calculadora ML**)
- Preview de **Prompts** (cards → detalle)
- Preview de **Guías** (cards → detalle)
- Sección “Quiénes somos”
- CTA final de contacto
- Link sutil al final: **“Pedí una landing como esta →”** (`/web`)
- Botones flotantes:
  - **Calculadora ML** (abajo izquierda)
  - **WhatsApp** (abajo derecha)

### ✅ Prompts
- Listado: `/prompts`
- Detalle: `/prompts/[id]`
- En el detalle se muestra el prompt completo y **se puede copiar** (`CopyPromptButton`)
- Datos en `src/lib/prompts.ts`

### ✅ Guías
- Listado: `/guias`
- Detalle: `/guias/[id]`
- Guías pensadas para **leer**, con estética tipo artículo (`GuideBody`)
- Datos en `src/lib/guides.ts`

### ✅ Newsletter (Brevo)
- Formulario de suscripción en Home (al final)
- Endpoint serverless en Cloudflare Pages Functions:
  - `POST /api/subscribe` → agrega/actualiza contacto en Brevo y lo mete en una lista
- Automatización en Brevo:
  - **Welcome email** automático al entrar a la lista
- **Conversión medida:** luego de suscribirse, redirige a `/gracias`

### ✅ Página de conversión (medición)
- `/gracias` (landing simple post-suscripción)
- Se usa para medir conversiones en Cloudflare Web Analytics:
  - `/gracias?src=leadmagnet`
  - `/gracias?src=newsletter`

### ✅ Pedidos de landing a medida
- Página: `/web`
- Formulario real (`WebRequestForm`) que envía un mail a soporte vía Brevo transactional:
  - `POST /api/webquote` → manda email a `soporte@oriavision.com.ar`

### ✅ Medición (Cloudflare Web Analytics)
- Beacon en `layout.tsx` con modo SPA (`spa: true`)
- Medición de clicks usando páginas `/go/*` (redirección con pequeño delay):
  - `/go/calculadora`
  - `/go/whatsapp`

> Nota: extensiones tipo AdBlock pueden bloquear el tracking. Para testear, usar incógnito o desactivar bloqueos para el dominio.

---

## 🧱 Stack
- **Next.js (App Router)**
- **Tailwind CSS**
- **Cloudflare Pages** (deploy)
- **Cloudflare Pages Functions** (API)
- **Brevo** (newsletter + automatizaciones + transactional SMTP)
- Componentes UI: `Reveal` (scroll animations) + `Blob` (decoración)
- Tipografía: `next/font` (Inter)

---

## 🗺️ Rutas

- `/` Home
- `/prompts` listado
- `/prompts/[id]` detalle
- `/guias` listado
- `/guias/[id]` detalle
- `/web` pedir landing a medida (form)
- `/gracias` confirmación suscripción (conversión)
- `/go/calculadora` tracking click → redirige a Calculadora
- `/go/whatsapp` tracking click → redirige a WhatsApp

---

## 🧩 Archivos clave

- Home: `src/app/page.tsx`
- Layout + Analytics: `src/app/layout.tsx`
- LeadMagnet: `src/components/LeadMagnet.tsx`
- Newsletter: `src/components/Newsletter.tsx`
- Prompts data: `src/lib/prompts.ts`
- Guías data: `src/lib/guides.ts`
- Página /web: `src/app/web/page.tsx`
- Form /web: `src/components/WebRequestForm.tsx`
- API webquote: `functions/api/webquote.ts`
- API subscribe: `functions/api/subscribe.ts`
- Página /gracias: `src/app/gracias/page.tsx`
- Redirect tracking: `src/components/GoRedirect.tsx`
- /go routes:
  - `src/app/go/calculadora/page.tsx`
  - `src/app/go/whatsapp/page.tsx`

---

## ⚙️ Configuración de Newsletter (Brevo + Cloudflare)

### 1) Crear lista en Brevo
Brevo → Contactos → Listas  
Creá una lista (ej: “Oriavision Newsletter”) y guardá el **List ID**.

### 2) Crear API Key en Brevo
Brevo → Settings → SMTP y API → **Claves API**  
Generá una **API Key**.

### 3) Variables de entorno en Cloudflare Pages
Cloudflare → Pages → proyecto → Settings → Environment variables

Agregar:
- `BREVO_API_KEY` = tu API key
- `BREVO_LIST_ID` = el ID numérico de la lista

### 4) Endpoint
El endpoint vive en:
- `functions/api/subscribe.ts`

El front envía:
- `POST /api/subscribe` con JSON `{ "email": "..." }`

---

## ✉️ Configuración de pedidos de landing (/web)

### Endpoint
- `functions/api/webquote.ts`

### Variables
- `BREVO_API_KEY` (obligatoria)
Opcional:
- `SUPPORT_EMAIL=soporte@oriavision.com.ar`
- `BREVO_SENDER_EMAIL=noreply@oriavision.com.ar`

---

## 📈 Medición (Cloudflare Web Analytics)

### 1) Crear sitio en Web Analytics
Cloudflare → Web Analytics → Add site → copiar **token**.

### 2) Variable de entorno
Cloudflare Pages → Environment variables:
- `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` = token

### 3) /go tracking
Los botones a Calculadora/WhatsApp apuntan a rutas internas:
- `/go/calculadora`
- `/go/whatsapp`

Esas páginas muestran un “abriendo…” y redirigen a los destinos reales, permitiendo registrar el pageview.

---

## 🖥️ Desarrollo local

```bash
npm install
npm run dev