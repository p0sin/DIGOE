# robots.txt

## Current configuration

`public/robots.txt` currently allows all crawlers with no restrictions:

```
User-agent: *
Disallow:
```

## Adding the sitemap reference

It is best practice to include the sitemap URL in `robots.txt` so crawlers can discover it:

```
User-agent: *
Disallow:

Sitemap: https://www.domain.com/sitemap-index.xml
```

Since this is a static site, `robots.txt` is a plain file in `public/` — update it directly. The sitemap URL must be absolute and must match `PUBLIC_SITE_URL`.

## Blocking specific paths

To prevent crawlers from indexing certain paths (e.g., a staging page or a thank-you page you don't want indexed):

```
User-agent: *
Disallow: /gracias
Disallow: /staging

Sitemap: https://www.domain.com/sitemap-index.xml
```

## Blocking AI crawlers (optional)

If the project should not be used as training data for AI models, add known AI crawler user agents. This is best-effort — compliance is voluntary.

```
User-agent: GPTBot
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: *
Disallow:

Sitemap: https://www.domain.com/sitemap-index.xml
```

See `llms-txt.md` for the complementary approach of explicitly describing what AI agents are allowed to use.
