import { useState, useCallback, useEffect } from 'react'

export interface Progress {
  xp: number; dailyXp: number; dailyGoal: number; streak: number
  words: number; accuracy: number; minutes: number
}

const KEY = 'bb_progress'
const initial: Progress = { xp: 1240, dailyXp: 35, dailyGoal: 60, streak: 7, words: 84, accuracy: 0.91, minutes: 326 }

function load(): Progress {
  try { const s = localStorage.getItem(KEY); if (s) return { ...initial, ...JSON.parse(s) } } catch {}
  return initial
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(progress)) } catch {} }, [progress])
  const addXp = useCallback((n: number) => setProgress(p => ({ ...p, xp: p.xp + n, dailyXp: p.dailyXp + n })), [])
  const addWord = useCallback(() => setProgress(p => ({ ...p, words: p.words + 1 })), [])
  return { progress, addXp, addWord }
}