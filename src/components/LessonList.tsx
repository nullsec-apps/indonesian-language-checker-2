import { useState } from 'react'
import { lessons } from '../lib/data'
import { useLanguage } from '../hooks/useLanguage'
import { Lock, Hand, Hash, Utensils, Plane, Users, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LessonDetail from './LessonDetail'

const icons: Record<string, any> = { Hand, Hash, Utensils, Plane, Users }
const diffColor: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-emerald-700',
  Intermediate: 'bg-amber-50 text-amber-700',
  Advanced: 'bg-[#E63946]/10 text-[#E63946]',
}

export default function LessonList() {
  const { t, locale } = useLanguage()
  const [active, setActive] = useState<string | null>(null)
  const lesson = lessons.find(l => l.id === active)

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-1">{t('lessons')}</h1>
      <p className="text-[#1A1410]/50 mb-6">Pilih topik untuk mulai belajar</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {lessons.map((l, i) => {
          const Icon = icons[l.icon] || Hand
          return (
            <motion.button
              key={l.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              disabled={l.locked}
              onClick={() => !l.locked && setActive(l.id)}
              className={`relative text-left bg-white rounded-3xl p-6 border border-black/5 shadow-sm transition-all duration-200 ${l.locked ? 'opacity-60' : 'hover:shadow-md hover:-translate-y-1 cursor-pointer'}`}
            >
              {l.locked && <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center"><Lock size={15} className="text-[#1A1410]/40" /></div>}
              <div className="w-12 h-12 rounded-2xl bg-[#E63946]/10 flex items-center justify-center mb-4"><Icon size={24} className="text-[#E63946]" /></div>
              <h3 className="font-display text-lg font-bold">{locale === 'id' ? l.titleId : l.title}</h3>
              <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mt-2 ${diffColor[l.difficulty]}`}>{l.difficulty}</span>
              <div className="mt-4">
                <div className="w-full h-1.5 rounded-full bg-black/8 overflow-hidden">
                  <div className="h-full bg-[#E63946] rounded-full" style={{ width: `${l.progress}%` }} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#1A1410]/50">{l.vocab.length} {t('card')}</span>
                  {!l.locked && <span className="flex items-center gap-1 text-xs font-semibold text-[#E63946]"><Play size={12} fill="currentColor" />{l.progress > 0 ? t('continue') : t('start')}</span>}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
      <AnimatePresence>
        {lesson && <LessonDetail lesson={lesson} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  )
}