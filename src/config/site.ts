// Every number and text that may change lives here.

import type { GenerationSettings } from '../types'

export const site = {
  name: 'Sunbae',
  koreanName: '선배',
  tagline: "O'zbek tilidagi til modeli",
  githubUrl: 'https://github.com/agus787-dev/sunbae',
  frontendUrl: 'https://github.com/agus787-dev/sunbae-web',
} as const

export const navLinks = [
  { label: 'Demo', href: '#demo' },
  { label: 'Model', href: '#model' },
  { label: "Yo'l xaritasi", href: '#roadmap' },
] as const

// Limits mirror the backend validation
export const limits = {
  prompt: { min: 1, max: 1000 },
  max_tokens: { min: 1, max: 300, step: 1 },
  temperature: { min: 0, max: 2, step: 0.05 },
  top_k: { min: 0, max: 500, step: 1 },
  top_p: { min: 0, max: 1, step: 0.01 },
} as const

export const defaultSettings: GenerationSettings = {
  max_tokens: 80,
  temperature: 0.8,
  top_k: 50,
  top_p: 0.95,
}

export const HISTORY_LIMIT = 5

export const timeouts = {
  healthMs: 20_000,
  generateMs: 120_000,
  healthRetryMs: 30_000,
} as const

export const examplePrompts = [
  "Seulda talaba bo'lib yashash",
  "Koreyada o'qish uchun eng muhim narsa",
  "Toshkent — O'zbekistonning poytaxti,",
  "Bahor kelishi bilan",
  "Sun'iy intellekt kelajakda",
] as const

export const modelStats = {
  documents: '570K',
  characters: '1.23B',
  vocabSize: '8,000',
  tokensPerWord: '2.24',
  parameters: '13.8M',
  layers: 6,
  heads: 6,
  dModel: 384,
  contextLength: 256,
  trainTokens: '328M',
  trainSteps: '8,000',
} as const

// Shares must add up to 100
export const dataMix = [
  { label: 'FineWeb-2', share: 36, color: 'bg-accent' },
  { label: 'Yangiliklar', share: 33, color: 'bg-cobalt' },
  { label: 'Vikipediya', share: 31, color: 'bg-sand' },
] as const

export interface LossPoint {
  label: string
  step: number
  value: number | null
}

// value null = not known yet
export const lossPoints: LossPoint[] = [
  { label: 'Boshlanish', step: 0, value: 9.07 },
  { label: '1,000-qadam', step: 1000, value: 4.19 },
  { label: 'Yakuniy', step: 8000, value: null },
]

export const LOSS_PENDING_TEXT = 'Training davom etmoqda'

export type RoadmapStatus = 'active' | 'next' | 'planned'

export const roadmap: {
  title: string
  description: string
  status: RoadmapStatus
}[] = [
  {
    title: 'Base model',
    description:
      "O'zbek matnlarida noldan o'qitilgan model. U siz boshlagan matnni davom ettiradi.",
    status: 'active',
  },
  {
    title: 'SFT: suhbat rejimi',
    description:
      "Savol-javob namunalarida qo'shimcha o'qitish. Sayt chat ko'rinishiga o'tadi.",
    status: 'next',
  },
  {
    title: 'Koreyadagi talabalar uchun yordamchi',
    description:
      "Viza, universitet, ish va kundalik hayot bo'yicha amaliy maslahatlar beradigan sunbae.",
    status: 'planned',
  },
]

export const roadmapStatusLabels: Record<RoadmapStatus, string> = {
  active: 'Hozir',
  next: 'Keyingi',
  planned: 'Reja',
}

// Real output of the Sunbae tokenizer, shown in the hero card
export const heroTokenSample = {
  text: "Men Seulda o'qiyman",
  tokens: [
    { text: 'Men', id: 3642 },
    { text: ' Se', id: 2085 },
    { text: 'ul', id: 385 },
    { text: 'da', id: 259 },
    { text: ' o', id: 272 },
    { text: "'", id: 7 },
    { text: 'qiy', id: 1066 },
    { text: 'man', id: 516 },
  ],
}
