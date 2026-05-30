import { Search, Star, Flame } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { useLanguage } from '../hooks/useLanguage'
import { fmtXp } from '../lib/format'
import LanguageToggle from './LanguageToggle'
import { motion } from 'framer-motion'

export default function TopBar() {
  const { progress } = useProgress()
  const { t } = useLanguage()
  const pct = Math.min(100, (progress.dailyXp / progress.dailyGoal) * 100)
  return (
    <header className="sticky top-0 z-40 bg-[#FFFCF7]/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center gap-3">
        <div className="md:hidden w-9 h-9 rounded-xl bg-[#E63946] flex items-center justify-center text-white font-display font-bold">B</div>
        <div className="relative flex-1 max-w-xs hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1410]/40" />
          <input placeholder={t('search')} className="w-full pl-9 pr-3 py-2 text-sm rounded-full bg-black/[0.04] border border-transparent focus:border-[#E63946]/40 focus:bg-white outline-none transition-all duration-200" />
        </div>
        <div className="flex-1 sm:hidden" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
          <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Flame size={16} className="text-amber-500" fill="currentColor" />
          </motion.span>
          <span className="text-sm font-bold text-amber-700">{progress.streak}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E63946]/8">
          <Star size={15} className="text-[#E63946]" fill="currentColor" />
          <span className="text-sm font-bold text-[#E63946]">{fmtXp(progress.xp)} XP</span>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-black/10 overflow-hidden">
            <motion.div className="h-full bg-[#E63946]" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
          </div>
          <span className="text-xs text-[#1A1410]/50 font-medium">{progress.dailyXp}/{progress.dailyGoal}</span>
        </div>
        <div className="md:hidden"><LanguageToggle compact /></div>
      </div>
    </header>
  )
}