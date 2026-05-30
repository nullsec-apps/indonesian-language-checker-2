import { useState, useMemo } from 'react'
import { phrases } from '../lib/data'
import { useLanguage } from '../hooks/useLanguage'
import { useSpeech } from '../hooks/useSpeech'
import { Search, Volume2, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

export default function Phrasebook() {
  const { t } = useLanguage()
  const { speak } = useSpeech()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [favs, setFavs] = useState<string[]>([])

  const cats = useMemo(() => ['All', ...Array.from(new Set(phrases.map(p => p.category)))], [])
  const filtered = useMemo(() => phrases.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (p.phrase.toLowerCase().includes(q.toLowerCase()) || p.meaning.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat])

  const toggleFav = (id: string) => setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id])

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-bold mb-1">{t('phrasebook')}</h1>
      <p className="text-[#1A1410]/50 mb-6">Frasa sehari-hari yang berguna</p>
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1410]/40" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('search')} className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-black/5 focus:border-[#E63946]/40 outline-none transition-all duration-200 shadow-sm" />
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} className={cn('px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200', cat === c ? 'bg-[#E63946] text-white' : 'bg-white border border-black/5 text-[#1A1410]/60 hover:bg-black/[0.03]')}>{c}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl p-4 border border-black/5 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-200">
            <button onClick={() => speak(p.phrase)} className="shrink-0 w-11 h-11 rounded-full bg-[#E63946]/10 text-[#E63946] flex items-center justify-center hover:bg-[#E63946]/20 transition-all duration-200"><Volume2 size={20} /></button>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-lg">{p.phrase}</div>
              <div className="text-sm text-[#1A1410]/60">{p.meaning} · <span className="text-[#1A1410]/40">/{p.pron}/</span></div>
            </div>
            <button onClick={() => toggleFav(p.id)} className="shrink-0 w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center transition-all duration-200">
              <Star size={18} className={favs.includes(p.id) ? 'text-amber-400' : 'text-[#1A1410]/25'} fill={favs.includes(p.id) ? 'currentColor' : 'none'} />
            </button>
          </motion.div>
        ))}
        {!filtered.length && <div className="text-center text-[#1A1410]/40 py-12">No phrases found</div>}
      </div>
    </div>
  )
}