# Performance

## Build-time optimizations

### astro-compressor

`astro-compressor` runs after the Astro build and applies gzip/brotli compression to all HTML, CSS, and JS output in `dist/`. Pre-compressed `.gz` and `.br` files are served directly by the web server without on-the-fly compression.

Configuration in `astro.config.mjs`:
```js
compressor(),  // default: gzip + brotli, all static asset types
```

No additional configuration is needed. The compressor runs automatically on every `pnpm build`.

### Sharp (image processing)

`sharp` is installed as a dependency and is used by Astro's built-in `<Image>` component (`astro:assets`) to:
- Convert images to WebP/AVIF at build time.
- Resize images to the dimensions specified in the `width` and `height` props.
- Strip metadata and optimize compression.

**Always use `<Image>` from `astro:assets` for images inside components**, not bare `<img>` tags. This ensures images are processed at build time.

```astro
import { Image } from 'astro:assets';

<Image src={icon} alt="Description" width={24} height={24} loading="lazy" />
```

For the hero/main image in `public/`, use WebP format directly and keep it outside `src/` — it is served as-is without processing. The preload tag in `Layout.astro` ensures it loads early:

```html
<link rel="preload" as="image" href="/imagen.webp" />
```

Recommended size for the main image: **1200×630 px**, WebP format, under 200 KB.

## Runtime performance

### Google Fonts

Fonts are loaded with `preconnect` hints to establish early connections:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

The font URL uses `display=swap` to prevent invisible text during load. Only load the weights actually used in the design — every extra weight adds to the request.

### Swiper

Swiper is loaded from a CDN in `Layout.astro`:

```html
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
```

This script is loaded on every page even if the page does not use the Swiper component. If a project does not need a slider, remove this script tag from `Layout.astro` to save ~50 KB.

### Tailwind CSS v4

Tailwind v4 purges unused utility classes at build time via the Vite plugin (`@tailwindcss/vite`). No extra configuration is needed — only classes used in `.astro` files are included in the final CSS bundle.

## Server-level caching (Apache)

`src/.htaccess` sets `Cache-Control` headers for static assets:

| Asset type | Cache duration |
|------------|---------------|
| Images (jpg, png, webp, svg, ico) | 1 year (`max-age=31536000`) |
| CSS, JS, fonts (woff, woff2, ttf, otf) | 1 month (`max-age=2592000`) |
| JSON files | 1 month (`max-age=2592000`) |
| Everything else | 2 days (`max-age=172800`) |

Astro generates hashed filenames for CSS/JS bundles (e.g., `_astro/index.Cx3d9A8B.css`), so long cache durations are safe — a new build produces new filenames.

In addition, `mod_deflate` in `.htaccess` provides server-side gzip compression as a fallback for hosts that do not serve the pre-compressed `.gz` files produced by `astro-compressor`.

## Cloudflare performance (when using Cloudflare Pages)

When deploying to Cloudflare Pages, most `.htaccess` directives are ignored. Use a `public/_headers` file instead — see `deployment.md` for the full example. Cloudflare also provides:

- Automatic brotli/gzip compression (disable or leave as-is — it will not conflict with pre-compressed files).
- Global CDN edge caching.
- HTTP/3 and Early Hints support automatically.

## Lighthouse checklist

Before launching a project, run Lighthouse (Chrome DevTools → Lighthouse) and verify:

- [ ] LCP (Largest Contentful Paint) < 2.5 s — ensure hero image is preloaded and in WebP format.
- [ ] CLS (Cumulative Layout Shift) < 0.1 — always set `width` and `height` on `<Image>` components.
- [ ] FID / INP — minimize inline scripts; avoid render-blocking resources.
- [ ] Performance score > 90.
- [ ] `robots.txt` accessible.
- [ ] Sitemap accessible.
- [ ] All images have `alt` text.
