import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ne from './locales/ne.json'

const STORAGE_KEY = 'els_lang'
export const SUPPORTED = [
  { id: 'en', label: 'English',  short: 'EN' },
  { id: 'ne', label: 'नेपाली',    short: 'ने' },
]
export const DEFAULT_LANG = 'en'

const stored = (() => {
  try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
})()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ne: { translation: ne },
    },
    lng: SUPPORTED.some((l) => l.id === stored) ? stored : DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

i18n.on('languageChanged', (lng) => {
  try { localStorage.setItem(STORAGE_KEY, lng) } catch { /* no-op */ }
  document.documentElement.setAttribute('lang', lng)
})

document.documentElement.setAttribute('lang', i18n.language)

export default i18n
