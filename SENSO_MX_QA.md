# SENSO Mx — QA Checklist

Criterios de calidad internos que todo proyecto debe revisar antes de considerarse listo para producción. Los ítems marcados como **[Blocker]** impiden el lanzamiento si no pasan. Los demás son revisados y documentados aunque no necesariamente bloqueen el deploy.

Muchos ítems pueden no aplicar según el tipo de proyecto — en ese caso se anota "N/A" en observaciones.

---

## 01 · Core

### Marca & UI

| ID | Check | Detalle esperado | Severidad |
|----|-------|-----------------|-----------|
| UI-01 | Favicon correcto | Favicon correcto en desktop y mobile | Alta |
| UI-02 | Logo correcto | Logo versión correcta (light/dark si aplica) | Alta |
| UI-03 | Tipografías correctas | Familia y tamaños según diseño | **Blocker** |
| UI-04 | Espaciados correctos | Sin elementos apretados o desalineados. Sin espacios en blanco excesivos | Media |
| UI-05 | Estados hover/focus | Hover, active y focus visibles | Baja |
| UI-06 | Consistencia en botones | Botones CTA tienen el mismo estilo | Media |

### Navegación

| ID | Check | Detalle esperado | Severidad |
|----|-------|-----------------|-----------|
| NAV-01 | Menú desktop | Menú navega correctamente | Alta |
| NAV-02 | Menú móvil | Menú móvil funcional | **Blocker** |
| NAV-03 | Links internos | Sin links rotos | **Blocker** |
| NAV-04 | Links externos | Abren en nueva pestaña | Media |
| NAV-05 | Anclas | Anclas llevan a sección correcta | Media |
| NAV-06 | Overscroll en Y | La página no rebota al hacer scroll vertical | Baja |
| NAV-07 | Links no dentro de `<span>` | Los links están directos en anclas `<a>`, sin HTML interno | **Blocker** |

### Formularios

| ID | Check | Detalle esperado | Severidad |
|----|-------|-----------------|-----------|
| FRM-01 | Campos mínimos | Solo campos necesarios | Alta |
| FRM-02 | Validaciones | Validaciones claras | **Blocker** |
| FRM-03 | Errores | Mensajes de error entendibles | Alta |
| FRM-04 | Mensaje éxito | Mensaje visible de éxito al enviar | **Blocker** |
| FRM-05 | Entrega lead | Lead llega a destino correcto | **Blocker** |
| FRM-06 | Doble envío | Botón protegido contra doble envío | Alta |

> Este proyecto es un sitio estático — los formularios deben integrarse con un servicio externo (Formspree, Web3Forms, etc.). No existe backend propio para recibir POST requests.

### Responsive

| ID | Check | Detalle esperado | Severidad |
|----|-------|-----------------|-----------|
| RSP-01 | Hero visible | Hero completo y legible en 375px | **Blocker** |
| RSP-02 | CTA principal visible | CTA principal visible sin scroll excesivo | **Blocker** |
| RSP-03 | Tipografía legible | Texto ≥14–16px, sin necesidad de zoom | **Blocker** |
| RSP-04 | Botones táctiles | Botones con tamaño y separación adecuada | **Blocker** |
| RSP-05 | Menú móvil funcional | Menú abre/cierra y no tapa contenido | **Blocker** |
| RSP-06 | Header sticky | Header no tapa hero ni CTA | Alta |
| RSP-07 | Cards / grids | Cards y grids no se rompen ni desbordan | Alta |
| RSP-08 | Imágenes adaptadas | Imágenes escalan correctamente en mobile | Alta |
| RSP-09 | Formularios usables | Inputs visibles, teclado correcto | **Blocker** |
| RSP-10 | Espaciado vertical | No bloques demasiado juntos o separados | Media |
| RSP-11 | Scroll horizontal | No existe scroll horizontal inesperado | **Blocker** |
| RSP-12 | Popups / banners | No bloquean lectura ni CTA | Alta |
| RSP-13 | Sticky elements | Sticky bars no cubren CTAs | Alta |
| RSP-14 | Performance percibida | Contenido visible rápidamente | Media |
| RSP-15 | Breakpoints clave | 375 / 768 / 1024 revisados | Media |
| RSP-16 | Max width | Todas las secciones tienen el mismo ancho máximo y usan container | Alta |

### Legales

| ID | Check | Detalle esperado | Severidad |
|----|-------|-----------------|-----------|
| LG-01 | COFEPRIS | El sitio muestra claramente el aviso COFEPRIS, si aplica | **Blocker** |
| LG-02 | Cédulas | El sitio muestra cédulas profesionales y de especialidad, si aplica | Alta |
| LG-03 | Aviso de privacidad | El footer muestra el link al aviso de privacidad | **Blocker** |

---

## 02 · Contenido

### Medios

| ID | Check | Detalle esperado | Severidad |
|----|-------|-----------------|-----------|
| MED-01 | No placeholders | No hay imágenes placeholder | **Blocker** |
| MED-02 | Imágenes nítidas | No pixeladas ni borrosas | Alta |
| MED-03 | Proporciones | Proporciones correctas, sin distorsión | Media |
| MED-04 | Peso | Peso razonable (hero < 200 KB en WebP) | Media |
| MED-05 | Formato | WebP/JPG correcto según contexto | Media |
| MED-06 | Alt text | Alt text presente en imágenes relevantes | Baja |
| MED-07 | Video | Videos reproducen correctamente | Alta |
| MED-08 | Autoplay/mute | Videos con autoplay tienen mute activado | Baja |
| MED-09 | Carga del hero | La imagen hero carga inmediatamente (preload activo) | Media |
| MED-10 | Iconos | Los iconos son SVG con vectores reales, no imágenes embebidas dentro de SVG | Media |

### Testimoniales

| ID | Check | Detalle esperado | Severidad |
|----|-------|-----------------|-----------|
| TS-01 | Coherencia | Coherentes con el servicio ofrecido | Alta |
| TS-02 | Lenguaje | Lenguaje coincide con el público objetivo | Alta |
| TS-03 | Duplicados | No hay testimoniales repetidos | Alta |
| TS-04 | Fotos | No hay fotos repetidas con nombres distintos | Alta |
| TS-05 | Nombre | Nombre consistente y real | Media |
| TS-06 | Contexto | Cargo o contexto del autor es claro | Alta |
| TS-07 | Ubicación | Ubicación coherente con el servicio | Media |
| TS-08 | Formato | Formato visual consistente entre testimoniales | Media |
| TS-09 | Credibilidad | No parecen inventados | **Blocker** |
| TS-10 | Relevancia | Apoyan la promesa principal del sitio | Alta |

### FAQs

| ID | Check | Detalle esperado | Severidad |
|----|-------|-----------------|-----------|
| FAQ-01 | FAQs visibles | Existen y son visibles en la página | **Blocker** |
| FAQ-02 | Relevancia | Preguntas relevantes para el usuario | Alta |
| FAQ-03 | Claridad | Respuestas claras y directas | Alta |
| FAQ-04 | No ambiguas | No hay respuestas tipo "depende" sin explicar | Baja |
| FAQ-05 | Lenguaje | Lenguaje entendible para el público | Media |
| FAQ-06 | Consistencia copy | No contradicen el copy del resto del sitio | **Blocker** |
| FAQ-07 | Consistencia precios | No contradicen precios ni condiciones mencionadas | **Blocker** |
| FAQ-09 | Duplicados | No hay FAQs duplicadas | Media |
| FAQ-10 | Mobile | FAQs visibles y funcionales en mobile | Alta |

### Contenido de contacto

| ID | Check | Detalle esperado | Severidad |
|----|-------|-----------------|-----------|
| CT-01 | Teléfono correcto | Formato y número correctos. Clickeable en `<a href="tel:+52...">` sin HTML interno | **Blocker** |
| CT-02 | Email correcto | Email válido y clickeable en `<a href="mailto:...">` | **Blocker** |
| CT-03 | WhatsApp correcto | Link y número correctos. Clickeable en `<a href="https://wa.me/...">` sin HTML interno | **Blocker** |
| CT-04 | Dirección física correcta | Dirección válida y actual. Mapa muestra ubicación correcta | **Blocker** |
| CT-05 | Horarios correctos | Horarios actualizados | **Blocker** |
| CT-06 | Branding SENSO Mx | El footer contiene `Supported by SENSO Mx.` con link externo al sitio de SENSO | Alta |

---

## 03 · SEO

### Indexación

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-03 | Noindex correcto | Ninguna página pública importante tiene `noindex` | **Blocker** |
| SEO-04 | Meta robots correcto | Meta robots = `index, follow` en páginas públicas | **Blocker** |

### Robots & Sitemap

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-01 | robots.txt | Existe y no bloquea secciones críticas | Alta |
| SEO-02 | llms.txt | Existe `/llms.txt` para crawlers de IA | Media |
| SEO-05 | Sitemap accesible | `/sitemap-index.xml` carga correctamente | Alta |
| SEO-06 | Sitemap limpio | No contiene 404s ni URLs de staging | Alta |
| SEO-07 | URLs canónicas en sitemap | Sitemap solo incluye URLs finales correctas | Media |

### Canonical

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-08 | Canonical presente | Todas las páginas tienen `<link rel="canonical">` | **Blocker** |
| SEO-09 | Canonical correcto | Canonical apunta a sí misma | **Blocker** |
| SEO-10 | Dominio correcto | Canonical usa HTTPS y el dominio final de producción | **Blocker** |

### Duplicados & URLs

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-11 | Parámetros | URLs con parámetros no generan duplicados indexados | Alta |
| SEO-12 | Trailing slash | `/pagina` y `/pagina/` no generan duplicados | Media |
| SEO-13 | Lowercase | URLs normalizadas en minúsculas | Media |
| SEO-14 | URLs legibles | URLs sin IDs ni strings innecesarios | Media |
| SEO-15 | Guiones correctos | Uso de guiones (`-`), no underscores (`_`) | Baja |
| SEO-16 | Jerarquía lógica | Estructura de URLs coherente con el sitio | Media |

### Metadatos

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-17 | Title único | Cada página tiene title único | **Blocker** |
| SEO-18 | Title descriptivo | Title refleja la intención de la página | Alta |
| SEO-19 | Longitud title | Title no truncado (~50–60 caracteres) | Media |
| SEO-20 | Meta description | Meta description presente | Media |
| SEO-21 | Meta description única | No duplicada entre páginas | Media |

### Headings

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-22 | H1 único | 1 solo H1 por página | **Blocker** |
| SEO-23 | H1 visible | H1 visible, no oculto solo para SEO | Alta |
| SEO-24 | Jerarquía headings | Uso correcto H1 → H2 → H3 | Media |
| SEO-25 | Headings semánticos | Headings no usados únicamente para estilo visual | Baja |

### Imágenes

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-26 | Alt text | Imágenes relevantes con alt descriptivo | Media |
| SEO-27 | Alt no spam | Alt sin keyword stuffing | Baja |
| SEO-28 | Nombre de archivo | Nombres de archivo descriptivos | Baja |

### Performance SEO

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-29 | LCP razonable | LCP < 2.5s en mobile | Alta |
| SEO-30 | CLS bajo | No hay saltos visuales significativos | Media |
| SEO-31 | Lazy correcto | No se aplica `loading="lazy"` en imágenes above the fold | Media |
| SEO-32 | JS no bloqueante | JS pesado diferido o `async` | Media |

### Mobile

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-33 | Contenido mobile | Mobile tiene el mismo contenido que desktop | **Blocker** |
| SEO-34 | Interstitials | No hay popups invasivos en mobile | Alta |

### Seguridad

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-35 | HTTPS | Todo el sitio fuerza HTTPS | **Blocker** |
| SEO-36 | Mixed content | No hay recursos HTTP en páginas HTTPS | Alta |

### Schema / Datos estructurados

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| SEO-37 | Datos estructurados | Schema válido sin errores (validar con Rich Results Test) | Media |
| SEO-38 | Coherencia schema | Schema coincide con contenido visible en la página | Media |

---

## 04 · Marketing & Tracking

| ID | Check | Detalle | Severidad |
|----|-------|---------|-----------|
| TRK-01 | GTM instalado | Google Tag Manager presente y disparando correctamente | **Blocker** |

---

## Blockers — resumen rápido

Lista de todos los ítems que bloquean el lanzamiento si no pasan:

`UI-03` `NAV-02` `NAV-03` `NAV-07` `FRM-02` `FRM-04` `FRM-05` `RSP-01` `RSP-02` `RSP-03` `RSP-04` `RSP-05` `RSP-09` `RSP-11` `LG-01` `LG-03` `MED-01` `TS-09` `FAQ-01` `FAQ-06` `FAQ-07` `CT-01` `CT-02` `CT-03` `CT-04` `CT-05` `SEO-03` `SEO-04` `SEO-08` `SEO-09` `SEO-10` `SEO-17` `SEO-22` `SEO-33` `SEO-35` `TRK-01`
