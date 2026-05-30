import { useLanguage } from '../hooks/useLanguage'
import { cn } from '../lib/utils'

export default function LanguageToggle({ compact }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage()
  return (
    <div className={cn('inline-flex items-center rounded-full bg-black/5 p-1', compact && 'scale-90')}>
      {(['en', 'id'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            'px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200',
            locale === l ? 'bg-[#E63946] text-white shadow-sm' : 'text-[#1A1410]/60 hover:text-[#1A1410]'
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}