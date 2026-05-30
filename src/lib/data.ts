export interface Vocab { id: string; word: string; pron: string; meaning: string; example: string; exampleEn: string }
export interface Lesson { id: string; title: string; titleId: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; icon: string; progress: number; locked: boolean; vocab: Vocab[] }
export interface Phrase { id: string; phrase: string; pron: string; meaning: string; category: string }

export const lessons: Lesson[] = [
  { id: 'greetings', title: 'Greetings', titleId: 'Salam', difficulty: 'Beginner', icon: 'Hand', progress: 60, locked: false, vocab: [
    { id: 'g1', word: 'Halo', pron: 'ha-lo', meaning: 'Hello', example: 'Halo, apa kabar?', exampleEn: 'Hello, how are you?' },
    { id: 'g2', word: 'Selamat pagi', pron: 'se-la-mat pa-gi', meaning: 'Good morning', example: 'Selamat pagi, Bu.', exampleEn: 'Good morning, Ma\'am.' },
    { id: 'g3', word: 'Terima kasih', pron: 'te-ri-ma ka-sih', meaning: 'Thank you', example: 'Terima kasih banyak.', exampleEn: 'Thank you very much.' },
    { id: 'g4', word: 'Sama-sama', pron: 'sa-ma sa-ma', meaning: "You're welcome", example: 'Sama-sama, teman.', exampleEn: "You're welcome, friend." },
    { id: 'g5', word: 'Sampai jumpa', pron: 'sam-pai jum-pa', meaning: 'See you later', example: 'Sampai jumpa besok!', exampleEn: 'See you tomorrow!' },
  ]},
  { id: 'numbers', title: 'Numbers', titleId: 'Angka', difficulty: 'Beginner', icon: 'Hash', progress: 30, locked: false, vocab: [
    { id: 'n1', word: 'Satu', pron: 'sa-tu', meaning: 'One', example: 'Saya mau satu.', exampleEn: 'I want one.' },
    { id: 'n2', word: 'Dua', pron: 'du-a', meaning: 'Two', example: 'Dua kopi, tolong.', exampleEn: 'Two coffees, please.' },
    { id: 'n3', word: 'Tiga', pron: 'ti-ga', meaning: 'Three', example: 'Tiga hari lagi.', exampleEn: 'Three more days.' },
    { id: 'n4', word: 'Empat', pron: 'em-pat', meaning: 'Four', example: 'Empat orang.', exampleEn: 'Four people.' },
    { id: 'n5', word: 'Lima', pron: 'li-ma', meaning: 'Five', example: 'Lima ribu rupiah.', exampleEn: 'Five thousand rupiah.' },
  ]},
  { id: 'food', title: 'Food & Drink', titleId: 'Makanan', difficulty: 'Beginner', icon: 'Utensils', progress: 0, locked: false, vocab: [
    { id: 'f1', word: 'Nasi', pron: 'na-si', meaning: 'Rice', example: 'Saya makan nasi.', exampleEn: 'I eat rice.' },
    { id: 'f2', word: 'Air', pron: 'a-ir', meaning: 'Water', example: 'Minta air putih.', exampleEn: 'Plain water, please.' },
    { id: 'f3', word: 'Kopi', pron: 'ko-pi', meaning: 'Coffee', example: 'Kopi ini enak.', exampleEn: 'This coffee is good.' },
    { id: 'f4', word: 'Enak', pron: 'e-nak', meaning: 'Delicious', example: 'Makanannya enak!', exampleEn: 'The food is delicious!' },
    { id: 'f5', word: 'Pedas', pron: 'pe-das', meaning: 'Spicy', example: 'Jangan terlalu pedas.', exampleEn: "Not too spicy." },
  ]},
  { id: 'travel', title: 'Travel', titleId: 'Perjalanan', difficulty: 'Intermediate', icon: 'Plane', progress: 0, locked: false, vocab: [
    { id: 't1', word: 'Di mana', pron: 'di ma-na', meaning: 'Where', example: 'Di mana stasiun?', exampleEn: 'Where is the station?' },
    { id: 't2', word: 'Berapa', pron: 'be-ra-pa', meaning: 'How much', example: 'Berapa harganya?', exampleEn: 'How much is it?' },
    { id: 't3', word: 'Kiri', pron: 'ki-ri', meaning: 'Left', example: 'Belok kiri.', exampleEn: 'Turn left.' },
    { id: 't4', word: 'Kanan', pron: 'ka-nan', meaning: 'Right', example: 'Belok kanan.', exampleEn: 'Turn right.' },
    { id: 't5', word: 'Lurus', pron: 'lu-rus', meaning: 'Straight', example: 'Jalan lurus saja.', exampleEn: 'Just go straight.' },
  ]},
  { id: 'family', title: 'Family', titleId: 'Keluarga', difficulty: 'Intermediate', icon: 'Users', progress: 0, locked: true, vocab: [
    { id: 'fa1', word: 'Ibu', pron: 'i-bu', meaning: 'Mother', example: 'Ini ibu saya.', exampleEn: 'This is my mother.' },
    { id: 'fa2', word: 'Ayah', pron: 'a-yah', meaning: 'Father', example: 'Ayah bekerja.', exampleEn: 'Father is working.' },
  ]},
]

export const allVocab: Vocab[] = lessons.flatMap(l => l.vocab)

export const phrases: Phrase[] = [
  { id: 'p1', phrase: 'Apa kabar?', pron: 'a-pa ka-bar', meaning: 'How are you?', category: 'Greetings' },
  { id: 'p2', phrase: 'Kabar baik', pron: 'ka-bar ba-ik', meaning: "I'm fine", category: 'Greetings' },
  { id: 'p3', phrase: 'Nama saya...', pron: 'na-ma sa-ya', meaning: 'My name is...', category: 'Greetings' },
  { id: 'p4', phrase: 'Permisi', pron: 'per-mi-si', meaning: 'Excuse me', category: 'Politeness' },
  { id: 'p5', phrase: 'Maaf', pron: 'ma-af', meaning: 'Sorry', category: 'Politeness' },
  { id: 'p6', phrase: 'Tolong', pron: 'to-long', meaning: 'Please / Help', category: 'Politeness' },
  { id: 'p7', phrase: 'Berapa harganya?', pron: 'be-ra-pa har-ga-nya', meaning: 'How much is it?', category: 'Shopping' },
  { id: 'p8', phrase: 'Terlalu mahal', pron: 'ter-la-lu ma-hal', meaning: 'Too expensive', category: 'Shopping' },
  { id: 'p9', phrase: 'Saya mau ini', pron: 'sa-ya mau i-ni', meaning: 'I want this', category: 'Shopping' },
  { id: 'p10', phrase: 'Di mana toilet?', pron: 'di ma-na toi-let', meaning: 'Where is the toilet?', category: 'Travel' },
  { id: 'p11', phrase: 'Saya tidak mengerti', pron: 'sa-ya ti-dak meng-er-ti', meaning: "I don't understand", category: 'Travel' },
  { id: 'p12', phrase: 'Tolong bicara pelan', pron: 'to-long bi-ca-ra pe-lan', meaning: 'Please speak slowly', category: 'Travel' },
  { id: 'p13', phrase: 'Selamat makan', pron: 'se-la-mat ma-kan', meaning: 'Enjoy your meal', category: 'Food' },
  { id: 'p14', phrase: 'Minta bon', pron: 'min-ta bon', meaning: 'The bill, please', category: 'Food' },
  { id: 'p15', phrase: 'Saya lapar', pron: 'sa-ya la-par', meaning: "I'm hungry", category: 'Food' },
]