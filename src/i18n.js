import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    ns: ['common','translation', 'trade' ,'home', 'about', 'navigation', 'competitivePricing'], // Define namespaces
    defaultNS: 'common', // Default namespace
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Load translations by namespace
    },
    detection: {
        order: ['querystring', 'localStorage', 'navigator'], // Language detection order
        caches: ['localStorage'], // Cache the language in localStorage
    },
  });

export default i18n;
