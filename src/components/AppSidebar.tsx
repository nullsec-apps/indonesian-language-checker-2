import { LayoutDashboard, BookOpen, Layers, MessageSquare, Mic, ListChecks } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { cn } from '../lib/utils'
import LanguageToggle from './LanguageToggle'

interface Props { current: string; onNav: (id: string) => void }

const nav = [
  { id: 'dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { id: 'lessons', icon: BookOpen, key: 'lessons' },
  { id: 'flashcards', icon: Layers, key: 'flashcards' },
  { id: 'phrasebook', icon: MessageSquare, key: 'phrasebook' },
  { id: 'practice', icon: Mic, key: 'practice' },
  { id: 'quiz', icon: ListChecks, key: 'quiz' },
]

export default function AppSidebar({ current, onNav }: Props) {
  const { t } = useLanguage()
  return (
    <>
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-black/5 bg-white/60 backdrop-blur-sm sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E63946] flex items-center justify-center text-white font-display font-bold text-lg">B</div>
          <div>
            <div className="font-display font-bold text-lg leading-tight">Belajar</div>
            <div className="text-xs text-[#1A1410]/50 -mt-0.5">Bahasa Indonesia</div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1 mt-2">
          {nav.map(item => {
            const Icon = item.icon
            const active = current === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className={cn(
                  'relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  active ? 'text-[#E63946] bg-[#E63946]/8' : 'text-[#1A1410]/60 hover:bg-black/[0.03] hover:text-[#1A1410]'
                )}
              >
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-r-full bg-[#E63946]" />}
                <Icon size={20} strokeWidth={active ? 2.2 : 1.7} />
                {t(item.key)}
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-black/5 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <img src="https://i.pravatar.cc/80?img=47" alt="" className="w-9 h-9 rounded-full" />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Sarah Chen</div>
              <div className="text-xs text-[#1A1410]/50">Level 4 · Pemula</div>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-t border-black/5 flex justify-around py-2 px-1">
        {nav.map(item => {
          const Icon = item.icon
          const active = current === item.id
          return (
            <button key={item.id} onClick={() => onNav(item.id)} className={cn('flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all duration-200', active ? 'text-[#E63946]' : 'text-[#1A1410]/50 hover:text-[#1A1410]')}>
              <Icon size={20} strokeWidth={active ? 2.2 : 1.7} />
              <span className="text-[10px] font-medium">{t(item.key)}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}