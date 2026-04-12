import type { Locale, PageContext } from './types';

/** Ruta base de la home localizada (con slash final donde aplica). */
export function homePath(locale: Locale): string {
  return locale === 'en' ? '/en/' : '/';
}

export function privacyPath(locale: Locale): string {
  return locale === 'en' ? '/en/privacy-policy/' : '/privacy-policy/';
}

/** Enlace a sección con ancla en la home (p. ej. services → /#services o /en/#services). */
export function homeSectionHash(locale: Locale, sectionId: string): string {
  const id = sectionId.replace(/^#/, '');
  return locale === 'en' ? `/en/#${id}` : `/#${id}`;
}

/** URL de la misma página en el otro idioma (conmutador ES/EN). */
export function alternatePageUrl(locale: Locale, page: PageContext): string {
  const target: Locale = locale === 'es' ? 'en' : 'es';
  if (page === 'home') return homePath(target);
  return privacyPath(target);
}
