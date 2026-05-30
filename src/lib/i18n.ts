export type Locale = 'en' | 'id'

const dict: Record<string, { en: string; id: string }> = {
  dashboard: { en: 'Dashboard', id: 'Beranda' },
  lessons: { en: 'Lessons', id: 'Pelajaran' },
  flashcards: { en: 'Flashcards', id: 'Kartu' },
  phrasebook: { en: 'Phrasebook', id: 'Frasa' },
  practice: { en: 'Practice', id: 'Latihan' },
  quiz: { en: 'Quiz', id: 'Kuis' },
  search: { en: 'Search...', id: 'Cari...' },
  welcome: { en: 'Selamat datang back!', id: 'Selamat datang kembali!' },
  subtitle: { en: "Let's continue learning Indonesian", id: 'Mari lanjutkan belajar Bahasa Indonesia' },
  dailyGoal: { en: 'Daily Goal', id: 'Target Harian' },
  recommended: { en: 'Recommended for you', id: 'Direkomendasikan untukmu' },
  continue: { en: 'Continue', id: 'Lanjut' },
  start: { en: 'Start', id: 'Mulai' },
  wordsLearned: { en: 'Words Learned', id: 'Kata Dipelajari' },
  accuracy: { en: 'Accuracy', id: 'Akurasi' },
  timeStudied: { en: 'Time Studied', id: 'Waktu Belajar' },
  streak: { en: 'Day Streak', id: 'Hari Beruntun' },
  listen: { en: 'Listen', id: 'Dengar' },
  next: { en: 'Next', id: 'Selanjutnya' },
  knowIt: { en: 'I know it', id: 'Saya tahu' },
  review: { en: 'Review', id: 'Ulangi' },
  results: { en: 'Results', id: 'Hasil' },
  restart: { en: 'Restart', id: 'Mulai Lagi' },
  card: { en: 'card', id: 'kartu' },
  speak: { en: 'Tap to speak', id: 'Tekan untuk bicara' },
  recording: { en: 'Listening...', id: 'Mendengarkan...' },
  yourTurn: { en: 'Your turn to speak', id: 'Giliranmu berbicara' },
  score: { en: 'Your score', id: 'Skormu' },
  correct: { en: 'Correct!', id: 'Benar!' },
  wrong: { en: 'Not quite', id: 'Kurang tepat' },
}

export function translate(key: string, locale: Locale): string {
  const e = dict[key]
  return e ? e[locale] : key
}