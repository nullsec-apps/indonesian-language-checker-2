import { useProgress } from '../hooks/useProgress'
import { useLanguage } from '../hooks/useLanguage'
import { lessons } from '../lib/data'
import { fmtPct, fmtTime } from '../lib/format'
import { BookOpen, Target, TrendingUp, Clock, Flame, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

function Ring({ value }: { value: number }) {
  const r = 52, c = 2 * Math.PI * r
  const off = c - (value / 100) * c
  return (
    <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90">
      <circle cx="66" cy="66" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="12" />
      <motion.circle cx="66" cy="66" r={r} fill="none" stroke="#E63946" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: off }} transition={{ duration: 1.2, ease: 'easeOut' }} />
    </svg>
  )
}

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const heat = [3, 4, 2, 4, 4, 1, 3]

export default function Dashboard() {
  const { progress } = useProgress()
  const { t } = useLanguage()
  const rec = lessons.find(l => l.progress > 0 && l.progress < 100) || lessons[0]
  const pct = Math.min(100, (progress.dailyXp / progress.dailyGoal) * 100)

  const stats = [
    { icon: BookOpen, label: t('wordsLearned'), value: progress.words, color: 'text-[#E63946]', bg: 'bg-[#E63946]/8' },
    { icon: TrendingUp, label: t('accuracy'), value: fmtPct(progress.accuracy), color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Clock, label: t('timeStudied'), value: fmtTime(progress.minutes), color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Flame, label: t('streak'), value: progress.streak, color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl md:text-4xl font-bold">{t('welcome')}</h1>
        <p className="text-[#1A1410]/50 mt-1">{t('subtitle')}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm flex items-center gap-6">
          <div className="relative shrink-0">
            <Ring value={pct} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-bold">{Math.round(pct)}%</span>
              <span className="text-[10px] text-[#1A1410]/50">{progress.dailyXp}/{progress.dailyGoal} XP</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[#E63946] font-semibold"><Target size={18} />{t('dailyGoal')}</div>
            <p className="text-sm text-[#1A1410]/50 mt-1 max-w-[180px]">Keep going! Just {Math.max(0, progress.dailyGoal - progress.dailyXp)} XP to hit today's goal.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm md:col-span-2">
          <div className="text-sm font-semibold mb-4">This week</div>
          <div className="flex justify-between items-end gap-2 h-24">
            {heat.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div initial={{ height: 0 }} animate={{ height: `${h * 20}px` }} transition={{ delay: 0.2 + i * 0.05 }}
                  className="w-full rounded-lg" style={{ background: h >= 4 ? '#E63946' : h >= 2 ? '#E6394680' : '#E6394630' }} />
                <span className="text-[10px] text-[#1A1410]/40 font-medium">{days[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold mb-3">{t('recommended')}</h2>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-gradient-to-br from-[#E63946] to-[#c92d3a] rounded-3xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wide text-white/70 font-semibold">{rec.difficulty}</span>
            <h3 className="font-display text-2xl font-bold mt-1">{rec.title}</h3>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-32 h-2 rounded-full bg-white/25 overflow-hidden">
                <div className="h-full bg-white" style={{ width: `${rec.progress}%` }} />
              </div>
              <span className="text-xs text-white/80">{rec.progress}%</span>
            </div>
          </div>
          <button className="bg-white text-[#E63946] rounded-full px-5 py-3 font-semibold flex items-center justify-center gap-2 hover:gap-3 transition-all duration-200 shrink-0">
            {t('continue')} <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm hover:shadow-md transition-all duration-200">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <Icon size={20} className={s.color} />
              </div>
              <div className="font-display text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-[#1A1410]/50 mt-0.5">{s.label}</div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}