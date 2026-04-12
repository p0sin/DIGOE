# Documentation

This is a **static site** built with Astro 5. No server-side code runs at request time — everything is pre-rendered to plain HTML/CSS/JS at build time.

## Contents

| File | Topic |
|------|-------|
| [seo.md](./seo.md) | Meta tags, Open Graph, title/description, GTM |
| [sitemap.md](./sitemap.md) | Automatic sitemap generation |
| [robots.md](./robots.md) | robots.txt configuration |
| [llms-txt.md](./llms-txt.md) | llms.txt for AI crawlers |
| [performance.md](./performance.md) | Images, fonts, compression, caching |
| [security.md](./security.md) | HTTP headers, .htaccess, Cloudflare |
| [deployment.md](./deployment.md) | GitHub Actions FTP and Cloudflare Pages |
| [components.md](./components.md) | Landing page sections and how to customize them |

## Static site constraint

Because this site is 100% static:

- No API routes, no middleware, no server endpoints.
- No `output: 'server'` or `output: 'hybrid'` in `astro.config.mjs` — the default `output: 'static'` must remain.
- Forms must use a third-party service (Formspree, Web3Forms, Make, etc.) — there is no backend to receive POST requests.
- Any logic that would normally run server-side (auth, database queries, dynamic pricing) must be handled externally or removed.
- Environment variables are injected at build time via `vite.define` in `astro.config.mjs`. They are baked into the HTML/JS bundle — treat all `PUBLIC_*` values as public.
