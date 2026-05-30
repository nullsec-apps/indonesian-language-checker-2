import { useState, useMemo } from 'react'
import { LanguageContext } from './hooks/useLanguage'
import { translate, type Locale } from './lib/i18n'
import ErrorBoundary from './components/ErrorBoundary'
import AppSidebar from './components/AppSidebar'
import TopBar from './components/TopBar'
import Dashboard from './components/Dashboard'
import LessonList from './components/LessonList'
import Flashcard from './components/Flashcard'
import Phrasebook from './components/Phrasebook'
import PronunciationPractice from './components/PronunciationPractice'
import QuizPanel from './components/QuizPanel'
import { motion, AnimatePresence } from 'framer-motion'

function Shell() {
  const [view, setView] = useState('dashboard')
  const content = () => {
    switch (view) {
      case 'dashboard': return <Dashboard />
      case 'lessons': return <LessonList />
      case 'flashcards': return <Flashcard />
      case 'phrasebook': return <Phrasebook />
      case 'practice': return <PronunciationPractice />
      case 'quiz': return <QuizPanel />
      default: return <Dashboard />
    }
  }
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <AppSidebar current={view} onNav={setView} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div key={view} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {content()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('bb_locale') as Locale) || 'en')
  const ctx = useMemo(() => ({
    locale,
    setLocale: (l: Locale) => { setLocale(l); localStorage.setItem('bb_locale', l) },
    t: (k: string) => translate(k, locale),
  }), [locale])
  return (
    <ErrorBoundary>
      <LanguageContext.Provider value={ctx}>
        <Shell />
      </LanguageContext.Provider>
    </ErrorBoundary>
  )
}