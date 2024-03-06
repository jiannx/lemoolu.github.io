import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enUS from './locals/en-US.js';
import zhCN from './locals/zh-CN.js';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';

export enum Lng {
  'zhCN' = 'zh-CN',
  'enUS' = 'en-US',
}
export const I18nCookieKey = 'i18next';

const resources = {
  'en-US': {
    translation: enUS,
  },
  'zh-CN': {
    translation: zhCN,
  },
};

i18n
  .use(LanguageDetector)
  .init({
    resources,
    lng: Cookies.get(I18nCookieKey) || Lng.zhCN, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  });

function changeLanguage(lng: Lng) {
  Cookies.set(I18nCookieKey, lng); // https://github.com/i18next/i18next-browser-languageDetector
  i18n.changeLanguage(lng);
}

export { i18n, changeLanguage };
