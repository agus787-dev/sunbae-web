export type ApiErrorKind =
  | 'configuration'
  | 'network'
  | 'starting'
  | 'validation'
  | 'server'
  | 'invalid-response'

export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status?: number

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
  }
}

// Friendly Uzbek messages shown in the UI, one per error kind
export const errorMessages: Record<ApiErrorKind, string> = {
  configuration:
    "Server manzili sozlanmagan. VITE_API_URL ni belgilang va ilovani qayta ishga tushiring.",
  network: "Serverga ulanib bo'lmadi. Internet aloqasini tekshirib, qayta urinib ko'ring.",
  starting:
    "Server hozir ishga tushmoqda yoki band. Bir oz kutib, qayta urinib ko'ring.",
  validation: "So'rov qabul qilinmadi. Matn va sozlamalarni tekshirib ko'ring.",
  server: "Serverda xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring.",
  'invalid-response': "Server kutilmagan javob qaytardi. Qayta urinib ko'ring.",
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message
  return errorMessages.server
}

const API_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, '')

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

function getApiUrl(): string {
  if (!API_URL) {
    throw new ApiError('configuration', errorMessages.configuration)
  }

  return API_URL
}

function getHttpError(status: number): ApiError {
  if (status === 400 || status === 413 || status === 422) {
    return new ApiError('validation', errorMessages.validation, status)
  }

  if (status === 502 || status === 503 || status === 504) {
    return new ApiError('starting', errorMessages.starting, status)
  }

  return new ApiError('server', errorMessages.server, status)
}

interface RequestOptions {
  method?: 'GET' | 'POST'
  body?: unknown
  timeoutMs: number
}

// Fetch JSON from the backend and map every failure to an ApiError
export async function requestJson(path: string, options: RequestOptions): Promise<unknown> {
  const { method = 'GET', body, timeoutMs } = options
  // Outside the try, so a missing URL shows the configuration message, not "network"
  const url = `${getApiUrl()}${path}`
  let response: Response

  try {
    response = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    })
  } catch (error) {
    // A timeout usually means a cold start or a busy server
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new ApiError('starting', errorMessages.starting)
    }
    throw new ApiError('network', errorMessages.network)
  }

  if (!response.ok) {
    throw getHttpError(response.status)
  }

  try {
    return (await response.json()) as unknown
  } catch {
    throw new ApiError('invalid-response', errorMessages['invalid-response'], response.status)
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
