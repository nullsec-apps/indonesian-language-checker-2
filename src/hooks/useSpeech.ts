import { useState, useCallback, useRef } from 'react'

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const timer = useRef<any>(null)
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'id-ID'
    u.rate = 0.85
    const voices = window.speechSynthesis.getVoices()
    const id = voices.find(v => v.lang.startsWith('id'))
    if (id) u.voice = id
    u.onstart = () => setSpeaking(true)
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    setSpeaking(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setSpeaking(false), 2500)
    window.speechSynthesis.speak(u)
  }, [])
  return { speak, speaking }
}