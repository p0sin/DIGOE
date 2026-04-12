// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import compressor from 'astro-compressor';
import sitemap from '@astrojs/sitemap';
import siteConfig from './site.config.js';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.PUBLIC_SITE_URL,

  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.PUBLIC_SITE_NAME': JSON.stringify(siteConfig.PUBLIC_SITE_NAME ?? ''),
      'import.meta.env.PUBLIC_SITE_URL': JSON.stringify(siteConfig.PUBLIC_SITE_URL),
      'import.meta.env.PUBLIC_CONTACT_EMAIL': JSON.stringify(siteConfig.PUBLIC_CONTACT_EMAIL),
      'import.meta.env.PUBLIC_GTM': JSON.stringify(siteConfig.PUBLIC_GTM ?? ''),
      'import.meta.env.PUBLIC_COFEPRIS': JSON.stringify(siteConfig.PUBLIC_COFEPRIS ?? ''),
      'import.meta.env.PUBLIC_WA_LINK': JSON.stringify(siteConfig.PUBLIC_WA_LINK ?? ''),
      'import.meta.env.PUBLIC_PHONE': JSON.stringify(siteConfig.PUBLIC_PHONE ?? ''),
      'import.meta.env.PUBLIC_PRIVACY_NAME': JSON.stringify(siteConfig.PUBLIC_PRIVACY_NAME ?? ''),
      'import.meta.env.PUBLIC_PRIVACY_ADDRESS': JSON.stringify(siteConfig.PUBLIC_PRIVACY_ADDRESS ?? ''),
    },
  },

  integrations: [
    sitemap({
      lastmod: new Date(),
    }),
    compressor(),
  ],
});