# Guía Template Landing Pages

Template moderno y optimizado para crear landing pages con [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) y [DaisyUI](https://daisyui.com).

## ✨ Características

- ⚡️ **Rápido**: Construido con Astro para un rendimiento óptimo
- 🎨 **Personalizable**: Utiliza Tailwind CSS y DaisyUI para un diseño flexible
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🔍 **SEO optimizado**: Incluye astro-seo para mejorar el posicionamiento
- 🗺️ **Sitemap automático**: Genera automáticamente el sitemap de tu sitio
- 🖼️ **Sliders**: Integración con Swiper para crear carruseles y sliders
- 🗜️ **Compresión**: Optimización automática de assets con astro-compressor

## 📦 Instalación

Este proyecto utiliza [pnpm](https://pnpm.io) como gestor de paquetes. Asegúrate de tenerlo instalado antes de comenzar.

```bash
# Instalar pnpm si no lo tienes instalado
npm install -g pnpm

# Clonar el repositorio
git clone https://github.com/tu-usuario/landing-page-template.git
cd landing-page-template

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Previsualizar la build
pnpm preview
```

## 🔧 Configuración

### Configuración del sitio (`site.config.js`)

Toda la configuración pública del sitio está en **`site.config.js`** en la raíz del proyecto. Edita ese archivo con la URL del sitio, email, GTM, COFEPRIS y enlace de WhatsApp. No hace falta configurar variables de entorno en GitHub ni Cloudflare.

Las claves del config se exponen en el proyecto como `import.meta.env.PUBLIC_*` (por ejemplo `import.meta.env.PUBLIC_SITE_URL`). No guardes datos sensibles en `site.config.js`, ya que se incluye en el repo.

## 🧩 Estructura y Navegación

El template está diseñado con una estructura modular que facilita la personalización y expansión:

### Estructura de Archivos Principal

```
/
├── public/              # Archivos estáticos
│   ├── favicon.svg      # 🔄 Reemplazar con tu favicon
│   ├── favicon.ico      # 🔄 Reemplazar con tu favicon
│   └── imagen.webp      # 🔄 Reemplazar con tu imagen principal
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Footer.astro # Pie de página global
│   │   └── ...          # Otros componentes
│   ├── layouts/
│   │   └── Layout.astro # Layout principal (incluye head, GTM, etc.)
│   ├── pages/
│   │   ├── index.astro  # Página principal
│   │   └── privacy-policy.astro # 🔄 Actualizar variables NAME y ADRESS
│   ├── styles/
│   │   └── global.css   # Estilos globales y variables CSS
│   ├── utils/           # Utilidades y helpers
│   └── .htaccess        # Configuración para servidores Apache
└── package.json         # Dependencias y scripts
```

### Componente Layout.astro

El componente principal `Layout.astro` incluye:

- Configuración de SEO mediante `astro-seo`
- Integración con Google Tag Manager (si se configura `PUBLIC_GTM`)
- Carga de fuentes de Google
- Precarga de recursos críticos
- Integración con Swiper para sliders y carruseles
- Vinculación del sitemap generado automáticamente

### Navegación y Páginas

Por defecto, el template incluye:

1. **Página Principal** (`/pages/index.astro`): Landing page principal
2. **Política de Privacidad** (`/pages/privacy-policy.astro`): Página legal que requiere personalización

Para añadir más páginas:

1. Crea nuevos archivos `.astro` en la carpeta `/pages`
2. Asegúrate de usar el componente `Layout` para mantener la consistencia
3. Actualiza los enlaces en el footer y menú de navegación según sea necesario

### Componentes Prediseñados

El template incluye componentes comunes para landing pages:

- Footer prediseñado y responsive
- Sección de Hero con llamada a la acción
- Componentes para tarjetas de características/servicios
- Carrusel/Slider usando Swiper
- Secciones de testimonios
- Formulario de contacto

## 📚 Dependencias principales

```json
{
  "dependencies": {
    "@astrojs/sitemap": "^3.3.1",
    "@tailwindcss/vite": "^4.1.4",
    "astro": "^5.7.7",
    "astro-compressor": "^1.0.0",
    "astro-seo": "^0.8.4",
    "daisyui": "^5.0.28",
    "swiper": "^11.2.6",
    "tailwindcss": "^4.1.4"
  }
}
```

## 🚀 Despliegue

### GitHub Actions (Método recomendado)

Este template está configurado para desplegar automáticamente mediante GitHub Actions cuando se crea una nueva release. El flujo de trabajo utiliza FTP para subir los archivos compilados al servidor web.

#### Configuración requerida:

1. **Variables de repositorio** (Settings > Secrets and variables > Actions > Variables):

   - `PUBLIC_PHONE`: Número de teléfono público (ej: "+521234567890")
   - `PUBLIC_WA_LINK`: Enlace completo de WhatsApp (ej: "https://wa.me/521234567890")

2. **Secrets** (Settings > Secrets and variables > Actions > Secrets):
   - `FTP_SERVER`: Servidor FTP (ej: "ftp.tudominio.com")
   - `FTP_USER`: Usuario FTP (ej: "usuario_ftp")
   - `FTP_PASS`: Contraseña FTP

#### Crear una nueva versión:

Para desplegar una nueva versión:

```bash
# Usando gh-release
gh release create --generate-notes --title "v1.0.0" v1.0.0

# O con el comando patch para incrementar la versión automáticamente
gh-release --patch
```

El workflow también puede ejecutarse manualmente desde la pestaña Actions en GitHub.

### Personalización de Elementos Visuales

Para adaptar el template al nuevo proyecto, debes reemplazar los siguientes elementos:

#### 1. Favicon

- Reemplaza `/public/favicon.svg` y `/public/favicon.ico`
- Asegúrate de proporcionar ambos formatos para mejor compatibilidad

```html
<!-- En Layout.astro -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" href="/favicon.ico" />
```

#### 2. Imagen Principal

- Reemplaza `/public/imagen.webp`
- Recomendado: formato WebP para mejor rendimiento
- Tamaño sugerido: 1200x630px para compatibilidad con OG tags

```html
<!-- En Layout.astro - Precarga de imagen principal -->
<link rel="preload" as="image" href="/imagen.webp" />

<!-- En SEO - Open Graph -->
<SEO openGraph={{ basic: { image: 'https://tudominio.com/imagen.webp', // URL
absoluta }, }} />
```

#### 3. Fuentes Tipográficas

- El template usa Inter, Merriweather y Fira Code por defecto (según global.css)
- Para cambiar las fuentes:
  1. Modifica las variables `--font-sans`, `--font-serif` y `--font-mono` en `global.css`
  2. Actualiza la importación de Google Fonts en `Layout.astro`

```html
<!-- En Layout.astro - Cambia por tus fuentes -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=TuFuente:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

> **⚠️ Importante**: Recuerda actualizar el sitio URL en los metadatos de SEO y OpenGraph con la URL absoluta del proyecto para asegurar el funcionamiento correcto de las previsualizaciones en redes sociales.## 📝 Política de Privacidad

El template incluye una página de política de privacidad preconfigurada en `/pages/privacy-policy.astro`. Esta página requiere personalización con los datos específicos del cliente:

### Variables a modificar

En el archivo `/pages/privacy-policy.astro`, debes actualizar las siguientes variables al inicio del archivo:

```astro
// =============================================
// 🔴 VARIABLES A MODIFICAR
// =============================================
const NAME = '[NOMBRE_COMPLETO_DEL_RESPONSABLE]'; // Ejemplo: "Dra. María Pérez López"
const ADRESS = '[DOMICILIO_COMPLETO]'; // Ejemplo: "Calle Principal #123, Col. Centro, CDMX, C.P. 00000"
const EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL; // Ejemplo: "privacidad@clinica.com"
const URL = import.meta.env.PUBLIC_SITE_URL; // Ejemplo: "https://www.clinicademuestra.com"
// =============================================
```

### Configuración SEO

El template utiliza `astro-seo` para optimizar el SEO de la landing page. Este componente está preconfigurado en el layout principal pero debe personalizarse:

```astro
<SEO
  title="Título de tu proyecto | Descripción corta"
  description="Una descripción optimizada con palabras clave relevantes (máx. 160 caracteres)."
  openGraph={{
    basic: {
      title: 'Título para compartir en redes sociales',
      type: 'website',
      image: 'https://tudominio.com/imagen.webp',
    },
  }}
  extend={{
    link: [{ rel: 'icon', href: '/favicon.ico' }],
    meta: [
      { name: 'theme-color', content: '#TU_COLOR' },
      // Tags adicionales según necesidad
    ],
  }}
/>
```

### Guía para Optimización SEO

Para maximizar el rendimiento SEO de la landing page:

#### Títulos y Descripciones

- **Título**: Máximo 60 caracteres. Incluye las palabras clave principales al inicio.
- **Descripción**: Máximo 160 caracteres. Debe resumir el contenido e incluir palabras clave relevantes.

#### OpenGraph para Redes Sociales

- **Título OG**: Puede ser más atractivo/descriptivo que el título SEO
- **Imagen OG**: Debe ser de 1200x630px para una visualización óptima en todas las plataformas
- **Tipo**: Normalmente 'website' para landing pages

#### Sitemap y Robots

- El template genera automáticamente un sitemap mediante `@astrojs/sitemap`
- Asegúrate de actualizar `PUBLIC_SITE_URL` en tu archivo `.env` para que el sitemap sea correcto

```html
<!-- Ya incluido en Layout.astro -->
<link rel="sitemap" href="/sitemap-index.xml" />
```

#### Rendimiento

- El template está optimizado para obtener buenas puntuaciones en Lighthouse
- Utiliza `astro-compressor` para minimizar automáticamente HTML, CSS y JS
- Las imágenes deben estar en formato WebP o AVIF para mejor rendimiento## 🎨 Estilos y Personalización Visual

### Configuración de Estilos Globales

El template utiliza Tailwind CSS v4 junto con DaisyUI para la creación de interfaces. La configuración principal se encuentra en `src/styles/global.css`:

```css
/**
 * DOCUMENTACIÓN DEL ARCHIVO
 * =======================
 * 
 * Este archivo configura Tailwind CSS con el plugin DaisyUI para crear un tema personalizado.
 * 
 * CARACTERÍSTICAS:
 * - Importa Tailwind CSS como base
 * - Activa el plugin DaisyUI con tema predeterminado "light"
 * - Define un tema personalizado con:
 *   - Fuentes tipográficas (sans, serif y mono)
 *   - Paleta de colores completa para la identidad visual
 *   - Configuración de colores para textos, fondos y componentes
 * 
 * CÓMO PERSONALIZAR:
 * - Para cambiar el tema predeterminado: modifica el valor en la sección "themes"
 * - Para modificar la paleta de colores: cambia los valores hexadecimales en las variables --color-*
 * - Para cambiar las fuentes: edita las listas en las variables --font-*
 * 
 * REFERENCIAS DE VARIABLES:
 * - Variables de tema de Tailwind: https://tailwindcss.com/docs/theme#default-theme-variable-reference
 * - Variables CSS de DaisyUI: https://daisyui.com/docs/utilities/#theme-css-variables
 * 
 * Las variables definidas abajo pueden personalizarse según las necesidades del proyecto.
 * Consulta las referencias para ver todas las opciones disponibles.
 */

@import 'tailwindcss';

@plugin "daisyui" {
  themes: light --default;
}

@plugin "daisyui/theme" {
  name: 'light';
  default: true;

  --font-sans: 'Inter', 'Helvetica Neue', Arial, ui-sans-serif, system-ui,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  --font-serif: 'Merriweather', 'Georgia Pro', ui-serif, Georgia, Cambria,
    'Times New Roman', Times, serif;
  --font-mono: 'Fira Code', 'JetBrains Mono', ui-monospace, SFMono-Regular,
    Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;

  --color-primary: #0b7ede;
  --color-primary-content: #ffffff;
  --color-secondary: #f7313b;
  --color-secondary-content: #ffffff;
  --color-text-primary: #161616;
  --color-bg-neutral: #292929;
  --color-accent: #f6fdfd;
  --color-info: #0eb3ee;
}
```

### Personalización del Tema

Para adaptar la apariencia visual del template a tu proyecto:

1. **Colores de marca**: Modifica las variables `--color-*` con los códigos hexadecimales de tu paleta de colores corporativa.

   - `--color-primary`: Color principal de la marca
   - `--color-secondary`: Color secundario/acento
   - `--color-text-primary`: Color principal para textos

2. **Tipografía**: Actualiza las variables `--font-*` con las familias tipográficas de tu marca.

   - No olvides añadir las importaciones de fuentes correspondientes en `Layout.astro`
   - Asegúrate de mantener las fuentes de sistema como fallback

3. **Tema DaisyUI**: Si prefieres usar otro tema predeterminado, puedes cambiar el valor en la sección `themes`.

### Integración con Tailwind CSS v4

El template utiliza Tailwind CSS v4 y DaisyUI para un desarrollo de UI eficiente:

- La sintaxis de plugin `@plugin` es parte de Tailwind CSS v4
- Utiliza la configuración de tema directamente en CSS (sin `tailwind.config.js` adicional)
- Ofrece una experiencia de desarrollo intuitiva con utilidades prediseñadas

> **🔧 Personalización avanzada**: Para cambios más profundos en el sistema de diseño, consulta la [documentación de Tailwind CSS v4](https://tailwindcss.com/docs) y [DaisyUI](https://daisyui.com/docs).## 📊 Analytics y Seguimiento

### Google Tag Manager

El template incluye soporte para Google Tag Manager. Para activarlo:

1. Agrega tu ID de GTM a las variables de entorno:

   ```
   PUBLIC_GTM=GTM-XXXXXXX
   ```

2. La implementación ya está incluida en el layout principal y se activará automáticamente cuando la variable de entorno esté presente.

3. El código de GTM se carga de manera condicional, lo que significa que si no defines la variable `PUBLIC_GTM`, no se añadirá ningún código de seguimiento a tu sitio.

#### Estructura de implementación

El template utiliza la siguiente estructura para implementar GTM correctamente en Astro:

```astro
<!-- En el <head> -->
{import.meta.env.PUBLIC_GTM && (
  <script define:vars={{ gtmId: import.meta.env.PUBLIC_GTM }}>
    // Google Tag Manager script
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',gtmId);
  </script>
)}

<!-- En el <body> -->
{import.meta.env.PUBLIC_GTM && (
  <noscript>
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${import.meta.env.PUBLIC_GTM}`}
      height="0"
      width="0"
      style="display:none;visibility:hidden">
    </iframe>
  </noscript>
)}
```

Esta implementación garantiza que:

- Se utilice la sintaxis correcta de Astro para interactuar con variables de entorno
- El código de GTM solo se cargue cuando la variable esté definida
- Se sigan las mejores prácticas para la implementación de GTM# Template de Landing Page con Astro 🚀
