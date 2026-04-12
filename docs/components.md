# Componentes

Todos los componentes están en `src/components/`. Son componentes Astro puros — sin React, Vue ni ningún otro framework. La página se ensambla en `src/pages/index.astro`.

---

## CTAButton

**Archivo:** `src/components/CTAButton.astro`

Botón de llamada a la acción reutilizable. Estilo fijo: gradiente azul (`#0EB3EE` → `#0B7EDE`), texto blanco, bordes redondeados.

**Props:**

| Prop | Tipo | Default |
|------|------|---------|
| `text` | `string` | `'Cita por WhatsApp'` |
| `url` | `string` | `import.meta.env.PUBLIC_WA_LINK` |

**Uso:**
```astro
<CTAButton />
<CTAButton text="Llamar ahora" url="tel:+521234567890" />
```

---

## HeroBackground

**Archivo:** `src/components/HeroBackground.astro`

Hero de pantalla completa con imagen de fondo. El contenido (logo, cédulas, H1, subtítulo, CTA) se posiciona sobre la imagen en la mitad izquierda. En mobile el CTA se reemplaza por un ícono de flecha y la imagen ocupa el fondo completo.

**Estructura:**
- Imagen de fondo distinta para mobile y desktop (`bg-[url(...)]`)
- Altura fija: `600px`
- Container: `max-w-7xl`
- CTA visible solo en desktop (`hidden md:block`)
- Logo con `fetchpriority="high"` y `loading="eager"`

**A reemplazar:**
- URL de imagen de fondo (actualmente `placehold.co/1920x1080`)
- URL del logo (`placehold.co/200x80`)
- URL del ícono de flecha (`placehold.co/24x24`)
- Textos de H1, subtítulo y cédulas

**Depende de:** `CTAButton`

---

## HeroLeftText

**Archivo:** `src/components/HeroLeftText.astro`

Hero con imagen de fondo y texto alineado a la izquierda. Variante más simple que HeroBackground: sin logo, sin ícono mobile. Incluye H1 con palabra destacada en `<b>`, un H2 secundario y CTA.

**Estructura:**
- Imagen de fondo responsive (`bg-right` mobile, `bg-center` desktop)
- Altura mínima: `min-h-[600px]` con padding inferior en mobile
- Container: `max-w-7xl`
- Texto ocupa `w-full md:w-1/2`

**A reemplazar:**
- URL de imagen de fondo (`placehold.co/1920x1080`)
- Textos de H1 y H2

**Depende de:** `CTAButton`

---

## HeroImage

**Archivo:** `src/components/HeroImage.astro`

Hero en dos columnas: texto e imagen del profesional en paralelo. Ideal para presentar a una persona. La imagen queda oculta en mobile.

**Estructura:**
- Grid 2 columnas en `md+` (`md:grid-cols-2`)
- Columna izquierda: H1, H2 (especialidad), párrafo descriptivo, dos botones CTA
- Columna derecha: `<img>` del profesional (oculta en mobile con `hidden md:block`)
- Container: `max-w-screen-lg`
- Imagen de fondo en la sección completa (Unsplash en placeholder)

**A reemplazar:**
- Imagen del profesional (`placehold.co/600x400`) — usar imagen real en `public/`
- Imagen de fondo de la sección
- Textos de H1, H2 y párrafo
- Texto y destino de los botones CTA

**Depende de:** `CTAButton`

---

## ServicesGrid

**Archivo:** `src/components/ServicesGrid.astro`

Grid de tarjetas de servicios con ícono y título. Diseñado para colocarse inmediatamente debajo del hero con un efecto de superposición (margen negativo).

**Estructura:**
- Array `SERVICES` con objetos `{ icon, iconMobile, title }` — 8 ítems de placeholder
- Grid: 2 columnas mobile, 4 columnas desktop
- Posicionamiento: `relative z-20 -mt-18` (se superpone al final del hero)
- Cada tarjeta: `w-40 md:w-2xs`, fondo `bg-secondary-content`, borde sutil
- Íconos distintos para mobile y desktop
- Container: `max-w-7xl`

**A reemplazar:**
- Array `SERVICES` con los servicios reales
- Íconos SVG en `public/` (actualmente `placeholder-icon.svg`)

**Sin dependencias externas.**

---

## ServicesFlipCards

**Archivo:** `src/components/ServicesFlipCards.astro`

Grid de tarjetas con efecto flip al hacer clic. El frente muestra ícono y título; el reverso muestra título y descripción.

**Estructura:**
- Array `SERVICES` con objetos `{ img, title, description }` — 8 ítems de placeholder
- Grid: 1 col mobile, 2 cols tablet, 4 cols desktop
- Altura fija por tarjeta: `150px` (configurable en CSS)
- Animación: `transform 0.6s` en eje Y
- Fondo: `bg-accent` en ambas caras
- Párrafo superior con texto introductorio configurable
- Container: `max-w-screen-lg`

**A reemplazar:**
- Array `SERVICES` con los servicios reales
- Íconos SVG en `public/services/` (actualmente `cancer.svg`)
- Texto introductorio de la sección

**Requiere:** `astro:assets` para optimización de íconos.

**JavaScript inline** para manejar el evento `click` y activar la clase `.flipped`.

---

## Swiper

**Archivo:** `src/components/Swiper.astro`

Carrusel horizontal de tarjetas de testimonios/reseñas. Se extiende a ancho de pantalla completa rompiendo el container intencionalmente.

**Estructura:**
- Array `REVIEWS` con objetos `{ name, headline, content }` — 10 ítems de placeholder
- Cada tarjeta: `420px` de ancho fijo, `340px` de alto
  - Cabecera (`125px`): fondo `#FAFAFA`, titular en texto primario
  - Cuerpo (`215px`): fondo `bg-primary`, reseña en itálica blanca, nombre del paciente
- Swiper configurado con: `autoplay-delay="5000"`, `loop`, `scrollbar`, `speed="30"`, `css-mode`
- El campo `content` soporta HTML (se renderiza con `set:html`)
- Container del carrusel: `w-screen` con margen negativo (`-ml-[calc(50vw-50%)]`) para romper el container

**A reemplazar:**
- Array `REVIEWS` con testimonios reales
- Título de la sección

**Depende de:** Swiper cargado desde CDN en `Layout.astro`. Importa `register` de `swiper/element/bundle`.

---

## PaymentMethods

**Archivo:** `src/components/PaymentMethods.astro`

Sección con título, subtítulo y tarjetas de métodos de pago.

**Estructura:**
- Array `METHODS` con objetos `{ img, title, description }` — 3 ítems de placeholder
- Grid: 1 col mobile, 3 cols desktop
- Fondo de sección: `bg-accent`, bordes redondeados
- Cada tarjeta: ícono SVG (60×60), título en negrita, descripción
- Container: `max-w-screen-lg`

**A reemplazar:**
- Array `METHODS` con los métodos reales
- Íconos SVG en `public/payments/` (ya existen: `aseguradoras.svg`, `efectivo.svg`, `tarjetas.svg`)
- Título y subtítulo de la sección

**Requiere:** `astro:assets`.

---

## FAQs

**Archivo:** `src/components/FAQs.astro`

Sección de preguntas frecuentes en formato acordeón (componente `collapse` de DaisyUI), con imagen decorativa en desktop.

**Estructura:**
- Array `QUESTIONS` con objetos `{ question, answer }` — 8 ítems de placeholder
- Layout: 1 columna mobile/tablet, 2 columnas en `lg+`
  - Columna izquierda: acordeón de FAQs
  - Columna derecha: imagen decorativa (oculta en tablet, visible en `lg+`)
- Acordeón: radio inputs (solo una pregunta abierta a la vez), primera abierta por defecto
- Las respuestas soportan HTML (se renderizan con `set:html`) — útil para links, listas, etc.
- Container: `max-w-screen-lg`

**A reemplazar:**
- Array `QUESTIONS` con preguntas y respuestas reales
- Imagen decorativa (`placehold.co/650x860`)

**Requiere:** `astro:assets` para la imagen. DaisyUI para el componente `collapse`.

---

## Contact

**Archivo:** `src/components/Contact.astro`

Sección de contacto con tarjetas de información y mapa de Google Maps embebido.

**Estructura:**
- Array `contactInfo` con objetos `{ title, description, icon, link? }` — 4 tarjetas
- Grid de 12 columnas, cada tarjeta ocupa `col-span-3`
- Las tarjetas con `link` son clicables (`tel:`, `https://wa.me/...`)
- Íconos SVG en `public/contact/` (actualmente todos usan `llamadas.svg`)
- Mapa: `<iframe>` de Google Maps embed, ancho 100%, alto 400px
- Container: `max-w-screen-lg`

**A reemplazar:**
- Array `contactInfo` con datos reales (ubicación, horario, teléfono, WhatsApp)
- Íconos SVG correspondientes a cada tarjeta
- URL del iframe de Google Maps (obtener el embed desde Google Maps → Compartir → Insertar mapa)

**Requiere:** `astro:assets`.

---

## WaBubble

**Archivo:** `src/components/WaBubble.astro`

Botón flotante de WhatsApp fijo en la esquina inferior derecha, visible en toda la página.

**Estructura:**
- `<a>` fijo (`position: fixed`), `right-8 bottom-8`, `z-50`
- Círculo verde (`#04be04`), 50×50px
- Ícono SVG de WhatsApp desde `src/assets/walogo.svg`
- Enlace: `PUBLIC_WA_LINK`

**A reemplazar:** Nada — lee `PUBLIC_WA_LINK` de `site.config.js`.

**Requiere:** `astro:assets`.

---

## Footer

**Archivo:** `src/components/Footer.astro`

Pie de página global. Incluido por `Layout.astro`, no por `index.astro`.

**Estructura:**
- Fondo: `bg-primary`
- Muestra número de aviso COFEPRIS desde `PUBLIC_COFEPRIS`
- Link a `/privacy-policy` (abre en nueva pestaña)
- Link a `https://sensomx.com` con texto `Supported by SENSO Mx.`
- Container: `max-w-screen-lg`

**A reemplazar:** Solo `PUBLIC_COFEPRIS` en `site.config.js`. El resto es fijo.

---

## Resumen

| Componente | Sección | Container | Datos editables | Depende de |
|-----------|---------|-----------|-----------------|-----------|
| `CTAButton` | — | — | `text`, `url` (props) | — |
| `HeroBackground` | Hero | `max-w-7xl` | Imágenes, textos | `CTAButton` |
| `HeroLeftText` | Hero | `max-w-7xl` | Imágenes, textos | `CTAButton` |
| `HeroImage` | Hero | `max-w-screen-lg` | Imagen profesional, textos | `CTAButton` |
| `ServicesGrid` | Servicios | `max-w-7xl` | Array `SERVICES` | — |
| `ServicesFlipCards` | Servicios | `max-w-screen-lg` | Array `SERVICES` | `astro:assets` |
| `Swiper` | Testimonios | Full-width | Array `REVIEWS` | Swiper CDN |
| `PaymentMethods` | Pagos | `max-w-screen-lg` | Array `METHODS` | `astro:assets` |
| `FAQs` | FAQs | `max-w-screen-lg` | Array `QUESTIONS`, imagen | `astro:assets`, DaisyUI |
| `Contact` | Contacto | `max-w-screen-lg` | Array `contactInfo`, Maps URL | `astro:assets` |
| `WaBubble` | Global | — | `PUBLIC_WA_LINK` | `astro:assets` |
| `Footer` | Global | `max-w-screen-lg` | `PUBLIC_COFEPRIS` | — |
