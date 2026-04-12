# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quality criteria

Internal QA requirements before a project goes live are in `SENSO_MX_QA.md`.

## Documentation

Detailed docs for each concern live in the `docs/` folder:

- `docs/seo.md` — meta tags, Open Graph, GTM, structured data
- `docs/sitemap.md` — sitemap generation and submission
- `docs/robots.md` — robots.txt configuration
- `docs/llms-txt.md` — llms.txt for AI crawlers
- `docs/performance.md` — images, fonts, compression, caching, Lighthouse checklist
- `docs/security.md` — .htaccess rules, HTTP headers, Cloudflare _headers
- `docs/deployment.md` — GitHub Actions FTP and Cloudflare Pages
- `docs/components.md` — all landing page sections and how to customize them
## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production (outputs to dist/)
pnpm preview    # Preview production build
```

Package manager: **pnpm** (required, no npm/yarn).

## Architecture

This is an **Astro 5** landing page template with Tailwind CSS v4 + DaisyUI v5.

### Configuration flow

All site configuration lives in **`site.config.js`** (committed to repo). `astro.config.mjs` reads it and injects every key as `import.meta.env.PUBLIC_*` via Vite's `define`. No `.env` file is needed for local development — edit `site.config.js` directly.

Available config keys: `PUBLIC_SITE_URL`, `PUBLIC_CONTACT_EMAIL`, `PUBLIC_GTM`, `PUBLIC_COFEPRIS`, `PUBLIC_WA_LINK`, `PUBLIC_PHONE`, `PUBLIC_PRIVACY_NAME`, `PUBLIC_PRIVACY_ADDRESS`.

### Page structure

- `src/layouts/Layout.astro` — root HTML shell: SEO (`astro-seo`), GTM (conditional on `PUBLIC_GTM`), Google Fonts, Swiper CDN script, sitemap link, `<Footer />`, and a `<slot />` for page content.
- `src/pages/index.astro` — composes all section components in order.
- `src/pages/privacy-policy.astro` — reads `PUBLIC_PRIVACY_NAME`, `PUBLIC_PRIVACY_ADDRESS`, `PUBLIC_CONTACT_EMAIL`, `PUBLIC_SITE_URL` for the legal notice.

### Styling

Tailwind CSS v4 is configured entirely in **`src/styles/global.css`** — no `tailwind.config.js`. DaisyUI is loaded via `@plugin "daisyui"`. Theme colors and fonts are set with CSS variables inside `@plugin "daisyui/theme"`. To change colors, edit the `--color-*` variables there; to change fonts, edit `--font-*` and update the Google Fonts import in `Layout.astro`.

### Deployment

CI/CD via GitHub Actions (`.github/workflows/main.yml`). Triggered on new GitHub releases or manually. Builds with pnpm, copies `src/.htaccess` to `dist/`, then FTP-deploys `dist/` to the server. Requires GitHub repo **Variables** (`PUBLIC_*` keys) and **Secrets** (`FTP_SERVER`, `FTP_USER`, `FTP_PASS`, `GOOGLE_CHAT_WEBHOOK_URL`).

To deploy a new release:
```bash
gh release create --generate-notes --title "v1.0.0" v1.0.0
```

### Assets to replace per project

- `public/favicon.svg` and `public/favicon.ico`
- `public/imagen.webp` (main hero image, 1200x630px recommended)
- Update `<link rel="preload" as="image" href="/imagen.webp" />` in `Layout.astro` if filename changes
- Update `<SEO>` props in `Layout.astro` (title, description, OG image URL)
- Update `PUBLIC_SITE_URL` in `site.config.js`
