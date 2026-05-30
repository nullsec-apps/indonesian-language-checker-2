import { useState, useCallback } from 'react'
import { allVocab, type Vocab } from '../lib/data'
import { nextInterval } from '../lib/srs'

export function useFlashcards() {
  const [deck, setDeck] = useState<Vocab[]>(() => [...allVocab])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const [reviewed, setReviewed] = useState(0)

  const current = deck[index]
  const done = index >= deck.length
  const progress = deck.length ? (index / deck.length) * 100 : 0

  const flip = useCallback(() => setFlipped(f => !f), [])

  const mark = useCallback((isKnown: boolean) => {
    if (isKnown) setKnown(k => k + 1)
    nextInterval(isKnown, 1.3)
    setFlipped(false)
    setReviewed(r => r + 1)
    setTimeout(() => setIndex(i => i + 1), 50)
  }, [])

  const restart = useCallback(() => {
    setDeck([...allVocab].sort(() => Math.random() - 0.5))
    setIndex(0); setFlipped(false); setKnown(0); setReviewed(0)
  }, [])

  return { current, done, index, total: deck.length, progress, flipped, flip, mark, known, reviewed, restart }
}