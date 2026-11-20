// Request body for POST /generate
export interface GenerateParams {
  prompt: string
  max_tokens: number
  temperature: number
  top_k: number
  top_p: number
}

// Sampling settings without the prompt
export type GenerationSettings = Omit<GenerateParams, 'prompt'>

// Response of POST /generate
export interface GenerateResponse {
  /** prompt + completion */
  text: string
  /** Only the newly generated part */
  completion: string
  /** Number of new tokens */
  tokens: number
  time_ms: number
  /** Optional: the new tokens as strings, in order */
  token_strings?: string[]
}

// Response of GET /health
export interface HealthResponse {
  status: 'ok'
  parameters: number
  block_size: number
}

export type HealthStatus = 'checking' | 'online' | 'offline'

// One finished exchange. A chat UI can reuse this as a message pair later.
export interface HistoryItem {
  id: string
  createdAt: number
  params: GenerateParams
  response: GenerateResponse
}
