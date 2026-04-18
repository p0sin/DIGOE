/**
 * Configuración del sitio (variables públicas).
 * Este archivo se commitea al repo; no uses GitHub/Cloudflare env para estas variables.
 *
 * Todas las claves se exponen como import.meta.env.PUBLIC_* en el proyecto.
 */
export default {
  /** Nombre corto del sitio / producto (navbar, SEO) */
  PUBLIC_SITE_NAME: 'DIGOE GF',

  /** URL canónica del sitio */
  PUBLIC_SITE_URL: 'https://digoegf.com',

  /** Email de contacto (aviso de privacidad, bloque contacto) */
  PUBLIC_CONTACT_EMAIL: 'info@digoegf.com',

  /** Web3Forms access key (formulario de contacto) */
  PUBLIC_WEB3FORMS_KEY: '7fa23247-ec49-4bf0-8201-31bc9013fade',

  /** ID de Google Tag Manager (ej: GTM-XXXXXXX). Dejar vacío para desactivar. */
  PUBLIC_GTM: '',

  /** Número de aviso COFEPRIS (pie de página) */
  PUBLIC_COFEPRIS: '000000000',

  /** Enlace de WhatsApp (ej: https://wa.me/521234567890) */
  PUBLIC_WA_LINK: 'https://wa.me/523331230189',

  /** Teléfono público (mostrado en contacto) */
  PUBLIC_PHONE: '33 3123 0189',

  /** Nombre del responsable del aviso de privacidad */
  PUBLIC_PRIVACY_NAME: 'DIGOE GF',

  /** Domicilio del responsable del aviso de privacidad */
  PUBLIC_PRIVACY_ADDRESS: 'Guadalajara, Jalisco, México',
};
