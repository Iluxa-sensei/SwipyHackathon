/**
 * Aqbobek International School — Aktobe, Kazakhstan.
 * Web paths use `/…` (Vite `public/` → site root).
 */
export const brand = {
  siteName: "Aqbobek International School",
  portalTitle: "Aqbobek International School Portal",
  primaryColor: "#6B21A8",
  /** Официальное лого (фиолетовый круг, белый орнамент и текст) */
  logoPath: "/logo.png",
  /**
   * Для светлого UI; сейчас тот же файл, что и `logoPath`.
   * При появлении варианта без фиолетового круга (фиолетовый орнамент на прозрачном) замените `public/logo-light.png`.
   */
  logoLightPath: "/logo-light.png",
  supportedLocales: ["ru", "kk"] as const,
} as const;

export type SupportedLocale = (typeof brand.supportedLocales)[number];
