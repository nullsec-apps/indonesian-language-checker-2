import { useQuiz } from '../hooks/useQuiz'
import { useLanguage } from '../hooks/useLanguage'
import { useSpeech } from '../hooks/useSpeech'
import { useProgress } from '../hooks/useProgress'
import { Volume2, Check, X, RotateCcw, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { useEffect, useRef } from 'react'

export default function QuizPanel() {
  const { current, done, index, total, progress, selected, answered, score, accuracy, select, next, restart } = useQuiz()
  const { t } = useLanguage()
  const { speak } = useSpeech()
  const { addXp } = useProgress()
  const scored = useRef(false)

  useEffect(() => {
    if (done && !scored.current) { addXp(score * 10); scored.current = true }
    if (!done) scored.current = false
  }, [done, score, addXp])

  if (done) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6"><Trophy size={40} className="text-amber-500" /></motion.div>
        <h2 className="font-display text-3xl font-bold">{t('results')}</h2>
        <p className="text-[#1A1410]/50 mt-2">{score} of {total} correct</p>
        <div className="my-6 font-display text-5xl font-bold text-[#E63946]">{accuracy}%</div>
        <p className="text-sm text-emerald-600 font-semibold">+{score * 10} XP earned</p>
        <button onClick={restart} className="mt-6 inline-flex items-center gap-2 bg-[#E63946] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#c92d3a] transition-all duration-200">
          <RotateCcw size={18} /> {t('restart')}
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="font-display text-3xl font-bold mb-1">{t('quiz')}</h1>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full bg-black/8 overflow-hidden">
          <motion.div className="h-full bg-[#E63946]" animate={{ width: `${progress}%` }} />
        </div>
        <span className="text-sm text-[#1A1410]/50 font-medium">{index + 1}/{total}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current.vocab.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm text-center">
            <div className="text-xs uppercase tracking-wide text-[#1A1410]/40 font-semibold mb-2">What does this mean?</div>
            <div className="font-display text-3xl font-bold text-[#E63946]">{current.vocab.word}</div>
            <button onClick={() => speak(current.vocab.word)} className="mt-3 inline-flex w-10 h-10 rounded-full bg-[#E63946]/10 text-[#E63946] items-center justify-center hover:bg-[#E63946]/20 transition-all duration-200"><Volume2 size={18} /></button>
          </div>

          <div className="space-y-3 mt-5">
            {current.options.map(opt => {
              const isCorrect = opt === current.answer
              const isSel = opt === selected
              const showCorrect = answered && isCorrect
              const showWrong = answered && isSel && !isCorrect
              return (
                <motion.button key={opt} onClick={() => select(opt)} disabled={answered}
                  animate={showWrong ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                  className={cn(
                    'w-full flex items-center justify-between px-5 py-4 rounded-2xl border font-medium text-left transition-all duration-200',
                    !answered && 'bg-white border-black/5 hover:border-[#E63946]/40 hover:bg-[#E63946]/[0.03]',
                    showCorrect && 'bg-emerald-50 border-emerald-300 text-emerald-700',
                    showWrong && 'bg-[#E63946]/10 border-[#E63946]/40 text-[#E63946]',
                    answered && !showCorrect && !showWrong && 'bg-white border-black/5 opacity-50'
                  )}>
                  {opt}
                  {showCorrect && <Check size={18} />}
                  {showWrong && <X size={18} />}
                </motion.button>
              )
            })}
          </div>

          {answered && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
              <div className={cn('text-center font-semibold mb-3', selected === current.answer ? 'text-emerald-600' : 'text-[#E63946]')}>
                {selected === current.answer ? t('correct') : `${t('wrong')} — ${current.answer}`}
              </div>
              <button onClick={next} className="w-full bg-[#E63946] text-white rounded-2xl py-4 font-semibold hover:bg-[#c92d3a] transition-all duration-200">{t('next')}</button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}