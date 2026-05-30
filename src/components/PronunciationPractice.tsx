import { useState, useRef, useCallback } from 'react'
import { allVocab, phrases } from '../lib/data'
import { useLanguage } from '../hooks/useLanguage'
import { useSpeech } from '../hooks/useSpeech'
import { useProgress } from '../hooks/useProgress'
import { Volume2, Mic, RotateCcw, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const items = [...phrases.map(p => p.phrase), ...allVocab.map(v => v.word)]

function similarity(a: string, b: string) {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z\s]/g, '').trim()
  const wa = norm(a).split(/\s+/), wb = norm(b).split(/\s+/)
  if (!wa.length) return 0
  let hits = 0
  wa.forEach(w => { if (wb.includes(w)) hits++ })
  return Math.round((hits / wa.length) * 100)
}

export default function PronunciationPractice() {
  const { t } = useLanguage()
  const { speak } = useSpeech()
  const { addXp } = useProgress()
  const [idx, setIdx] = useState(0)
  const [recording, setRecording] = useState(false)
  const [heard, setHeard] = useState('')
  const [scoreVal, setScoreVal] = useState<number | null>(null)
  const [error, setError] = useState('')
  const recRef = useRef<any>(null)
  const target = items[idx]

  const start = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { setError('Speech recognition is not supported in this browser. Try Chrome.'); return }
    setError(''); setHeard(''); setScoreVal(null)
    const rec = new SR()
    rec.lang = 'id-ID'; rec.interimResults = false; rec.maxAlternatives = 1
    rec.onstart = () => setRecording(true)
    rec.onend = () => setRecording(false)
    rec.onerror = (e: any) => { setRecording(false); setError(e.error === 'no-speech' ? 'No speech detected. Try again.' : 'Mic error: ' + e.error) }
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript
      setHeard(text)
      const s = similarity(target, text)
      setScoreVal(s)
      addXp(Math.round(s / 10))
    }
    recRef.current = rec
    rec.start()
  }, [target, addXp])

  const nextItem = () => { setIdx(i => (i + 1) % items.length); setHeard(''); setScoreVal(null); setError('') }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="font-display text-3xl font-bold mb-1">{t('practice')}</h1>
      <p className="text-[#1A1410]/50 mb-6">{t('yourTurn')}</p>

      <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm text-center">
        <div className="font-display text-3xl font-bold text-[#E63946]">{target}</div>
        <button onClick={() => speak(target)} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E63946]/10 text-[#E63946] font-semibold text-sm hover:bg-[#E63946]/20 transition-all duration-200">
          <Volume2 size={16} /> {t('listen')}
        </button>

        <div className="my-8 flex justify-center">
          <button onClick={start} disabled={recording} className="relative">
            {recording && <motion.span className="absolute inset-0 rounded-full bg-[#E63946]/30" animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} />}
            <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${recording ? 'bg-[#E63946] text-white' : 'bg-[#E63946] text-white hover:bg-[#c92d3a]'}`}>
              <Mic size={32} />
            </div>
          </button>
        </div>
        <div className="text-sm font-medium text-[#1A1410]/50 h-5">{recording ? t('recording') : t('speak')}</div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-start gap-2 text-left p-3 rounded-xl bg-amber-50 text-amber-700 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
            </motion.div>
          )}
          {scoreVal !== null && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6">
              <div className="text-xs text-[#1A1410]/50">You said: <span className="font-semibold text-[#1A1410]">“{heard}”</span></div>
              <div className="mt-3 text-sm font-semibold">{t('score')}</div>
              <div className={`font-display text-5xl font-bold mt-1 ${scoreVal >= 70 ? 'text-emerald-600' : scoreVal >= 40 ? 'text-amber-500' : 'text-[#E63946]'}`}>{scoreVal}%</div>
              <div className="w-full h-2 rounded-full bg-black/8 overflow-hidden mt-3">
                <motion.div className={scoreVal >= 70 ? 'h-full bg-emerald-500' : scoreVal >= 40 ? 'h-full bg-amber-400' : 'h-full bg-[#E63946]'} initial={{ width: 0 }} animate={{ width: `${scoreVal}%` }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button onClick={nextItem} className="w-full mt-5 flex items-center justify-center gap-2 bg-white border border-black/5 rounded-2xl py-3.5 font-semibold hover:bg-black/[0.02] transition-all duration-200">
        <RotateCcw size={18} /> {t('next')}
      </button>
    </div>
  )
}