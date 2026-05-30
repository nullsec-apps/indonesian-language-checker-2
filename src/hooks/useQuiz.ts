import { useState, useMemo, useCallback } from 'react'
import { allVocab, type Vocab } from '../lib/data'

export interface Question { vocab: Vocab; options: string[]; answer: string }

function shuffle<T>(a: T[]) { return [...a].sort(() => Math.random() - 0.5) }

function buildQuiz(): Question[] {
  const pool = shuffle(allVocab).slice(0, 8)
  return pool.map(v => {
    const distractors = shuffle(allVocab.filter(x => x.id !== v.id)).slice(0, 3).map(x => x.meaning)
    const options = shuffle([v.meaning, ...distractors])
    return { vocab: v, options, answer: v.meaning }
  })
}

export function useQuiz() {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuiz())
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const current = questions[index]
  const done = index >= questions.length
  const progress = (index / questions.length) * 100

  const select = useCallback((opt: string) => {
    if (answered) return
    setSelected(opt)
    setAnswered(true)
    if (current && opt === current.answer) setScore(s => s + 1)
  }, [answered, current])

  const next = useCallback(() => {
    setSelected(null); setAnswered(false); setIndex(i => i + 1)
  }, [])

  const restart = useCallback(() => {
    setQuestions(buildQuiz()); setIndex(0); setSelected(null); setScore(0); setAnswered(false)
  }, [])

  const accuracy = useMemo(() => questions.length ? Math.round((score / questions.length) * 100) : 0, [score, questions.length])

  return { current, done, index, total: questions.length, progress, selected, answered, score, accuracy, select, next, restart }
}