# SEO

## Overview

SEO is handled by the [`astro-seo`](https://github.com/jonasmerlin/astro-seo) package inside `src/layouts/Layout.astro`. Every page that uses `<Layout>` inherits this configuration — customize it per project before launch.

## Required per-project changes

### 1. `<SEO>` component (`src/layouts/Layout.astro`)

```astro
<SEO
  title="Primary keyword | Brand name"
  description="Under 160 characters. Lead with the value proposition and include main keywords."
  openGraph={{
    basic: {
      title: 'Same or slightly different from title — optimized for sharing',
      type: 'website',
      image: `${URL}/imagen.webp`,  // absolute URL, 1200x630px
    },
  }}
  extend={{
    link: [{ rel: 'icon', href: '/favicon.ico' }],
    meta: [
      { name: 'theme-color', content: '#0b7ede' },
    ],
  }}
/>
```

**Title rules:**
- Max 60 characters.
- Format: `Primary keyword | Brand` or `Service in City | Brand`.
- The most important keyword goes first.

**Description rules:**
- Max 160 characters.
- Include the main keyword naturally.
- End with a call to action when possible.

**OG image:**
- Must be an **absolute URL** (e.g., `https://domain.com/imagen.webp`), not a relative path.
- Recommended size: 1200×630 px.
- Replace `public/imagen.webp` with the actual project image.
- The preload tag in `<head>` (`<link rel="preload" as="image" href="/imagen.webp" />`) must match the actual filename.

### 2. `PUBLIC_SITE_URL` (`site.config.js`)

This value is used by:
- `astro.config.mjs` → sets `site:` for Astro (required for sitemap generation).
- `Layout.astro` → builds absolute OG image URLs.
- `privacy-policy.astro` → links back to the site.

Always use the final production URL including protocol and without trailing slash:
```js
PUBLIC_SITE_URL: 'https://www.domain.com',
```

### 3. `lang` attribute

`Layout.astro` sets `<html lang="en">`. Change to `"es"` for Spanish-language sites.

## Google Tag Manager

GTM is loaded conditionally — it only runs when `PUBLIC_GTM` is a non-empty string in `site.config.js` (local dev) or the GitHub Actions variable (CI/CD).

```js
// site.config.js — leave empty to disable
PUBLIC_GTM: 'GTM-XXXXXXX',
```

The implementation in `Layout.astro` injects the `<script>` in `<head>` and the `<noscript>` iframe at the top of `<body>`. No changes to the layout are needed to activate or deactivate it.

## Google Fonts

Fonts are loaded in `Layout.astro` via Google Fonts with `preconnect` hints:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet" />
```

To change fonts:
1. Update the Google Fonts URL.
2. Update `--font-sans` / `--font-serif` / `--font-mono` in `src/styles/global.css`.

## Structured data (optional)

Because this is a static site, structured data (JSON-LD) must be added directly in the `.astro` files as inline `<script type="application/ld+json">` tags. For a medical landing page, `Physician`, `MedicalOrganization`, or `LocalBusiness` schemas are recommended.

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Nombre Apellido",
  "url": "https://www.domain.com",
  "telephone": "+521234567890",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ciudad de México",
    "addressCountry": "MX"
  }
})} />
```

Add this inside `<head>` in `Layout.astro` or directly in `index.astro`.

## Canonical URL

`astro-seo` does not add a `<link rel="canonical">` automatically unless you pass it:

```astro
<SEO
  canonical={`${URL}/`}
  ...
/>
```

Add the canonical for projects where the same content could be accessed under multiple URLs (www vs non-www, http vs https). The `.htaccess` already redirects to HTTPS and strips `www`, so the canonical should match that final URL.
