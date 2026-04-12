# Deployment

This is a static site. The build output is the `dist/` directory — a folder of plain HTML, CSS, JS, and asset files that can be hosted anywhere.

There are two supported deployment methods.

---

## Method 1: GitHub Actions + FTP upload

Defined in `.github/workflows/main.yml`.

### Trigger

- **Automatic:** When a new GitHub release is published.
- **Manual:** Via the "Run workflow" button in GitHub Actions (Actions tab → Website Release → Run workflow).

### Required GitHub repository settings

Go to **Settings → Secrets and variables → Actions**.

**Variables** (plain text, not secret — safe to read in logs):

| Variable | Example | Required |
|----------|---------|----------|
| `PUBLIC_SITE_URL` | `https://www.domain.com` | Yes |
| `PUBLIC_PHONE` | `+521234567890` | Yes |
| `PUBLIC_WA_LINK` | `https://wa.me/521234567890` | Yes |
| `PUBLIC_CONTACT_EMAIL` | `privacidad@domain.com` | Yes |
| `PUBLIC_COFEPRIS` | `123456789` | Yes |
| `PUBLIC_PRIVACY_NAME` | `Dr. Nombre Apellido` | Yes |
| `PUBLIC_PRIVACY_ADDRESS` | `Calle 123, Col. Centro, CDMX` | Yes |
| `PUBLIC_GTM` | `GTM-XXXXXXX` | No (leave empty to disable) |
| `GOOGLE_CHAT_WEBHOOK_URL` | `https://chat.googleapis.com/...` | No (skip notification if absent) |

**Secrets** (encrypted, never visible in logs):

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | FTP hostname (e.g., `ftp.domain.com`) |
| `FTP_USER` | FTP username |
| `FTP_PASS` | FTP password |

### Build steps (what the workflow does)

1. Checks out the repository.
2. Installs pnpm 10 and Node.js 20.
3. Runs `pnpm install`.
4. Runs `pnpm build` with all `PUBLIC_*` variables injected as environment variables (they override `site.config.js` values during CI).
5. Copies `src/.htaccess` to `dist/.htaccess`.
6. Runs `git reset --hard` to discard any file changes made by the build (prevents lock file drift).
7. FTP-deploys the entire `dist/` directory to the server using `SamKirkland/FTP-Deploy-Action`.
8. Sends a Google Chat notification with the result.

### Creating a release (trigger deployment)

```bash
# Create a new release and trigger deployment
gh release create v1.0.0 --generate-notes --title "v1.0.0"
```

The version number is arbitrary — use semantic versioning or simple incrementing numbers. The release title appears in the Google Chat notification.

### FTP notes

- The FTP action uploads the full `dist/` directory and syncs deletions by default (files removed from `dist/` are deleted from the server).
- The destination is the server's web root (e.g., `public_html/`). Confirm the FTP user's home directory maps to the correct web root.
- The `.htaccess` file must be in the upload — it handles HTTPS redirects, caching, and security headers.

---

## Method 2: Cloudflare Pages

### Setup

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Select the GitHub repository.
3. Configure the build:

| Setting | Value |
|---------|-------|
| Framework preset | Astro |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Node.js version | `20` |

4. Add environment variables under **Settings → Environment variables** (Production):

Add all `PUBLIC_*` variables from the table above. These override the values in `site.config.js` at build time.

### Deployments

- **Production:** Every push to the `main` branch triggers a new production build.
- **Preview:** Every push to any other branch creates a preview deployment at a unique URL.

To deploy manually: push to `main`, or trigger a new deployment from the Cloudflare dashboard.

### .htaccess on Cloudflare Pages

Cloudflare Pages does **not** process `.htaccess` files. Create `public/_headers` to set HTTP response headers and `public/_redirects` for redirects instead.

**`public/_headers`** (security headers + caching):

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable
```

**`public/_redirects`** (www to apex redirect, handled by Cloudflare automatically when set up in DNS, but can also be done here):

```
https://www.domain.com/* https://domain.com/:splat 301
```

### Custom domain

In the Cloudflare Pages project → **Custom domains** → add the production domain. Cloudflare handles HTTPS certificates automatically — no manual certificate configuration is needed.

---

## Choosing between the two methods

| | GitHub Actions + FTP | Cloudflare Pages |
|--|----------------------|-----------------|
| Hosting | Shared/cPanel hosting | Cloudflare global edge CDN |
| HTTPS | Via Let's Encrypt on cPanel | Automatic, Cloudflare managed |
| Deploys on | GitHub release | Push to `main` |
| Preview URLs | No | Yes (per branch) |
| .htaccess | Yes | No — use `_headers` + `_redirects` |
| CDN / Edge | No (single origin) | Yes (global edge) |
| Cost | Hosting plan cost | Free tier (500 builds/month) |
