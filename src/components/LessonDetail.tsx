import { type Lesson } from '../lib/data'
import { useLanguage } from '../hooks/useLanguage'
import { useSpeech } from '../hooks/useSpeech'
import { useProgress } from '../hooks/useProgress'
import { X, Volume2, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function LessonDetail({ lesson, onClose }: { lesson: Lesson; onClose: () => void }) {
  const { t, locale } = useLanguage()
  const { speak, speaking } = useSpeech()
  const { addXp } = useProgress()
  const [step, setStep] = useState(0)
  const v = lesson.vocab[step]
  const isLast = step === lesson.vocab.length - 1
  const progress = ((step + 1) / lesson.vocab.length) * 100

  const handleNext = () => {
    addXp(5)
    if (isLast) onClose()
    else setStep(s => s + 1)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6" onClick={onClose}>
      <motion.div initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }} onClick={e => e.stopPropagation()}
        className="bg-[#FFFCF7] rounded-t-3xl md:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-[#FFFCF7] p-5 border-b border-black/5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">{locale === 'id' ? lesson.titleId : lesson.title}</h2>
            <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center transition-all duration-200"><X size={18} /></button>
          </div>
          <div className="w-full h-1.5 rounded-full bg-black/8 overflow-hidden mt-3">
            <motion.div className="h-full bg-[#E63946]" animate={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="p-6">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 border border-black/5 text-center shadow-sm">
            <div className="font-display text-4xl font-bold text-[#E63946]">{v.word}</div>
            <div className="text-sm text-[#1A1410]/40 mt-1">/{v.pron}/</div>
            <button onClick={() => speak(v.word)} className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${speaking ? 'bg-[#E63946] text-white' : 'bg-[#E63946]/10 text-[#E63946] hover:bg-[#E63946]/20'}`}>
              <Volume2 size={16} /> {t('listen')}
            </button>
            <div className="text-lg font-semibold mt-6">{v.meaning}</div>
            <div className="mt-4 p-4 rounded-2xl bg-black/[0.03] text-left">
              <div className="text-sm font-medium">{v.example}</div>
              <div className="text-sm text-[#1A1410]/50 mt-1">{v.exampleEn}</div>
            </div>
          </motion.div>
          <button onClick={handleNext} className="w-full mt-6 bg-[#E63946] text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-[#c92d3a] transition-all duration-200">
            {isLast ? <><Check size={18} /> Selesai</> : t('next')}
          </button>
          <div className="text-center text-xs text-[#1A1410]/40 mt-3">{step + 1} / {lesson.vocab.length}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}