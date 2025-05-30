import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

// Liste des langues supportées
export const supportedLngs = ["fr", "en"] as const;
export type SupportedLng = typeof supportedLngs[number];

// Chargement des traductions
import en from "../../public/locales/en/common.json";
import fr from "../../public/locales/fr/common.json";

// Instance i18n SSR/CSR
export const i18n = createInstance();

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    ns: ["common"],
    defaultNS: "common",
    resources: {
      fr: { common: fr },
      en: { common: en }
    },
    debug: true,
  });

export default i18n; 