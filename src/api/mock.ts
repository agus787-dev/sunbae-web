// Fake backend used when VITE_USE_MOCK=true, so the UI works without a server.

import type { GenerateParams, GenerateResponse, HealthResponse } from '../types'

const sampleCompletions = [
  " juda qiziqarli, lekin oson emas. Birinchi oylarda til, ob-havo va ovqatga ko'nikish kerak bo'ladi. Ko'p talabalar yotoqxonada yashaydi va universitet yaqinidagi kafelarda ovqatlanadi.",
  " — bu vaqtni to'g'ri taqsimlash. Darslar, til kurslari va qo'shimcha ish o'rtasida muvozanat saqlash uchun har kuni reja tuzish foydali.",
  " mamlakatning eng katta shahri va iqtisodiy markazi hisoblanadi. Shaharda ko'plab universitetlar, muzeylar va qadimiy obidalar bor.",
  " tabiat uyg'onadi, daraxtlar gullaydi va odamlar ko'chalarga chiqishadi. Navro'z bayrami ham aynan shu faslda nishonlanadi.",
  " ta'lim, tibbiyot va sanoatda katta o'zgarishlarga olib kelishi mumkin. Shu bilan birga, uni mas'uliyat bilan ishlatish muhim.",
  " haqida ko'p gapiriladi, ammo har bir inson o'z tajribasiga tayanadi. Shuning uchun maslahatlarni tinglab, o'zingiz uchun eng yaxshisini tanlang.",
]

const keywords: [string, number][] = [
  ['seul', 0],
  ['talaba', 0],
  ['muhim', 1],
  ['toshkent', 2],
  ['bahor', 3],
  ['intellekt', 4],
]

function pickCompletion(prompt: string): string {
  const lower = prompt.toLowerCase()
  const match = keywords.find(([word]) => lower.includes(word))
  if (match) return sampleCompletions[match[1]]
  return sampleCompletions[Math.floor(Math.random() * sampleCompletions.length)]
}

// Rough BPE imitation: words keep their leading space, long words are split
function fakeTokenize(text: string): string[] {
  const words = text.match(/\s*\S+/g) ?? []
  const tokens: string[] = []

  for (const word of words) {
    let rest = word
    while (rest.length > 6) {
      const size = 3 + (rest.length % 3)
      tokens.push(rest.slice(0, size))
      rest = rest.slice(size)
    }
    tokens.push(rest)
  }

  return tokens
}

function delay(): Promise<void> {
  const ms = 600 + Math.random() * 600
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function mockHealth(): Promise<HealthResponse> {
  await delay()
  return { status: 'ok', parameters: 13_800_000, block_size: 256 }
}

export async function mockGenerate(params: GenerateParams): Promise<GenerateResponse> {
  const started = performance.now()
  await delay()

  const tokenStrings = fakeTokenize(pickCompletion(params.prompt)).slice(0, params.max_tokens)
  const completion = tokenStrings.join('')

  return {
    text: params.prompt + completion,
    completion,
    tokens: tokenStrings.length,
    time_ms: Math.round(performance.now() - started),
    token_strings: tokenStrings,
  }
}
