# Security

## Apache (.htaccess)

`src/.htaccess` is copied to `dist/` during the GitHub Actions build step (`cp ./src/.htaccess ./dist/.htaccess`). It applies to Apache-based shared hosting environments.

### Required customization

Update `SITE_URL` at the top of the file for each project:

```apache
SetEnv SITE_URL example.com  # Change to the actual domain (no protocol, no www)
```

This value is used by the anti-hotlinking and www-to-apex redirect rules.

### What the .htaccess enforces

**HTTPS redirect** — All HTTP requests are permanently redirected (301) to HTTPS:
```apache
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]
```

**www to apex redirect** — `www.domain.com` redirects to `domain.com`:
```apache
RewriteCond %{HTTP_HOST} ^www\.%{ENV:SITE_URL} [NC]
RewriteRule ^(.*)$ https://%{ENV:SITE_URL}/$1 [L,R=301]
```

**Anti-hotlinking** — Prevents other sites from loading images, fonts, and assets directly from this server. Allows search engines and major social platforms:
```apache
RewriteCond %{HTTP_REFERER} !^http(s)?://(www\.)?%{ENV:SITE_URL} [NC]
RewriteCond %{HTTP_REFERER} !^http(s)?://(www\.)?google.com [NC]
# ... (facebook, twitter, etc.)
RewriteRule \.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2)$ - [NC,F,L]
```

**Security headers:**

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Force HTTPS for 1 year |
| `Content-Security-Policy` | `upgrade-insecure-requests;` | Upgrade mixed content |
| `X-Frame-Options` | `SAMEORIGIN` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter (for old browsers) |

**Other protections:**
- `Options -Indexes` — disables directory listing.
- `.htaccess` and sensitive file extensions (`.db`, `.bak`, `.sql`, `.log`) are blocked from direct access.
- `ServerSignature Off` — hides Apache version from response headers.
- HTTP `TRACE` method is blocked.

### Expanding the CSP

The current CSP only upgrades insecure requests. For a stricter policy, add source directives. For a site using Google Fonts, GTM, and Google Maps:

```apache
Header always set Content-Security-Policy "upgrade-insecure-requests; default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src https://www.google.com; img-src 'self' data: https:;"
```

Note: GTM and inline Astro scripts require `'unsafe-inline'` for `script-src`. If you need a strict CSP with nonces, it requires a server-side implementation that is not compatible with this static site setup.

## Cloudflare security headers

When deploying to Cloudflare Pages, `.htaccess` is not processed. Add a `public/_headers` file to set HTTP headers:

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: upgrade-insecure-requests; default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src https://www.google.com; img-src 'self' data: https:;
```

`_headers` uses Cloudflare Pages routing syntax. The `/*` pattern applies the headers to all responses.

Additionally, enable **Cloudflare WAF** rules in the Cloudflare dashboard for DDoS protection and bot filtering at the network edge — this is not possible with static files alone.

## Form security

This site has no backend form processing. If a contact form is added via a third-party service (Formspree, Web3Forms, etc.):

- Never embed API keys or credentials directly in the form action URL if they grant write access to sensitive data.
- Add honeypot fields or use the third-party's built-in spam protection.
- Use `rel="noopener noreferrer"` on all `target="_blank"` links (already applied to WhatsApp and external links in the template).
