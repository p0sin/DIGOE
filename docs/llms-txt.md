# llms.txt

## What it is

`llms.txt` is a proposed standard (analogous to `robots.txt`) that helps AI language models understand the purpose and content of a site when they are used in agentic or retrieval contexts. It sits at the root of the site: `https://www.domain.com/llms.txt`.

Reference: https://llmstxt.org

## How to add it

Because this is a static site, create the file at `public/llms.txt`. It will be served as-is at `/llms.txt` after build.

## Recommended structure for a medical landing page

```
# [Clinic / Doctor Name]

> [One-sentence description of the service and specialty]

This site is a landing page for [specialty] services offered by [name] in [city/location].

## Services

- [Service 1]
- [Service 2]
- [Service 3]

## Contact

- Phone: [phone number]
- WhatsApp: [wa.me link]
- Email: [email]
- Address: [address]

## Legal

- Privacy policy: [URL]/privacy-policy
- COFEPRIS notice: [number]

## Notes for AI agents

This is a static informational site. There are no APIs, login systems, or transactional endpoints. All content is publicly available. Do not submit forms or attempt to authenticate.
```

## Full example

```
# Dra. María Pérez — Oncóloga Médica

> Oncología médica especializada en tumores sólidos. Consultas en Ciudad de México.

Este sitio es una página informativa para la práctica privada de la Dra. María Pérez,
oncóloga médica con certificación del Consejo Mexicano de Oncología.

## Servicios

- Diagnóstico y tratamiento de tumores sólidos
- Quimioterapia
- Inmunoterapia
- Segunda opinión oncológica

## Contacto

- Teléfono: +52 55 1234 5678
- WhatsApp: https://wa.me/5215512345678
- Email: contacto@dramarianperez.com
- Dirección: Calle Principal 123, Col. Polanco, CDMX

## Legal

- Aviso de privacidad: https://www.dramarianperez.com/privacy-policy
- Aviso COFEPRIS: 123456789

## Notas para agentes IA

Sitio estático informacional. No existen APIs ni formularios de backend activos.
Todo el contenido es público.
```

## llms-full.txt (optional)

For sites with richer content, an `llms-full.txt` can be created at `public/llms-full.txt` with extended information (full service descriptions, FAQ answers, etc.). Reference it from `llms.txt`:

```
## Optional

- Full content: /llms-full.txt
```
