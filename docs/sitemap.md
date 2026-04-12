# Sitemap

## How it works

The sitemap is generated automatically at build time by `@astrojs/sitemap`. The integration scans every static page in `src/pages/` and emits `dist/sitemap-index.xml` and `dist/sitemap-0.xml`.

Configuration in `astro.config.mjs`:

```js
sitemap({
  lastmod: new Date(),  // sets lastmod to the build date on every page
}),
```

The `<link rel="sitemap" href="/sitemap-index.xml" />` tag is already present in `Layout.astro`.

## Requirements

`PUBLIC_SITE_URL` in `site.config.js` must be set to the correct production URL before building. Astro uses the `site:` config value to generate absolute URLs inside the sitemap. If it is wrong or missing, the sitemap will contain incorrect or relative URLs.

```js
// site.config.js
PUBLIC_SITE_URL: 'https://www.domain.com',
```

## Excluding pages

To exclude a page from the sitemap, pass a `filter` function:

```js
sitemap({
  lastmod: new Date(),
  filter: (page) => !page.includes('/privacy-policy'),
}),
```

## Verifying the sitemap

After `pnpm build`, open `dist/sitemap-0.xml` to verify all URLs are correct and absolute before deploying.

## Submitting to Google Search Console

1. Deploy the site.
2. Go to Google Search Console → Sitemaps.
3. Submit `https://www.domain.com/sitemap-index.xml`.
