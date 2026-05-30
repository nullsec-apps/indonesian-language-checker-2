import { createContext, useContext } from 'react'
import { type Locale } from '../lib/i18n'

interface Ctx { locale: Locale; setLocale: (l: Locale) => void; t: (k: string) => string }

export const LanguageContext = createContext<Ctx>({ locale: 'en', setLocale: () => {}, t: (k) => k })

export function useLanguage() { return useContext(LanguageContext) }