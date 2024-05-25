import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import hr from "./locales/hr.json";

i18n.use(initReactI18next).init({
  fallbackLng: "hr",
  lng: "en",
  debug: true,
  resources: { en: { translation: en }, hr: { translation: hr } },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});

// @ts-ignore
window.huh = i18n;

export default i18n;
