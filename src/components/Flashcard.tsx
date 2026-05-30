import { useFlashcards } from '../hooks/useFlashcards'
import { useLanguage } from '../hooks/useLanguage'
import { useSpeech } from '../hooks/useSpeech'
import { useProgress } from '../hooks/useProgress'
import { Volume2, RotateCcw, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Flashcard() {
  const { current, done, index, total, progress, flipped, flip, mark, known, restart } = useFlashcards()
  const { t } = useLanguage()
  const { speak } = useSpeech()
  const { addXp, addWord } = useProgress()

  const handleMark = (k: boolean) => {
    if (k) { addXp(10); addWord() } else addXp(2)
    mark(k)
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6"><Check size={40} className="text-emerald-600" /></div>
        <h2 className="font-display text-3xl font-bold">{t('results')}</h2>
        <p className="text-[#1A1410]/50 mt-2">You knew {known} of {total} cards</p>
        <div className="my-6 text-5xl font-display font-bold text-[#E63946]">{Math.round((known / total) * 100)}%</div>
        <button onClick={restart} className="inline-flex items-center gap-2 bg-[#E63946] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#c92d3a] transition-all duration-200">
          <RotateCcw size={18} /> {t('restart')}
        </button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="font-display text-3xl font-bold mb-1">{t('flashcards')}</h1>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full bg-black/8 overflow-hidden">
          <motion.div className="h-full bg-[#E63946]" animate={{ width: `${progress}%` }} />
        </div>
        <span className="text-sm text-[#1A1410]/50 font-medium">{index + 1}/{total}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9, x: -40 }}
          className="flip-card h-72 cursor-pointer" onClick={flip}>
          <div className={`flip-inner relative w-full h-full ${flipped ? 'flip-back' : ''}`}>
            <div className="backface-hidden absolute inset-0 bg-white rounded-3xl border border-black/5 shadow-sm flex flex-col items-center justify-center p-6">
              <div className="font-display text-4xl font-bold text-[#E63946]">{current.word}</div>
              <div className="text-sm text-[#1A1410]/40 mt-2">/{current.pron}/</div>
              <button onClick={e => { e.stopPropagation(); speak(current.word) }} className="mt-4 w-11 h-11 rounded-full bg-[#E63946]/10 text-[#E63946] flex items-center justify-center hover:bg-[#E63946]/20 transition-all duration-200"><Volume2 size={20} /></button>
              <div className="absolute bottom-5 text-xs text-[#1A1410]/30">Tap to flip</div>
            </div>
            <div className="backface-hidden flip-back absolute inset-0 bg-[#E63946] text-white rounded-3xl shadow-sm flex flex-col items-center justify-center p-6">
              <div className="font-display text-3xl font-bold">{current.meaning}</div>
              <div className="mt-4 text-center">
                <div className="text-sm font-medium">{current.example}</div>
                <div className="text-sm text-white/70 mt-1">{current.exampleEn}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button onClick={() => handleMark(false)} className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 rounded-2xl py-4 font-semibold hover:bg-amber-100 transition-all duration-200">
          <X size={18} /> {t('review')}
        </button>
        <button onClick={() => handleMark(true)} className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 rounded-2xl py-4 font-semibold hover:bg-emerald-100 transition-all duration-200">
          <Check size={18} /> {t('knowIt')}
        </button>
      </div>
    </div>
  )
}