import { limits, timeouts } from '../config/site'
import type { GenerateParams, GenerateResponse, HealthResponse } from '../types'
import { ApiError, USE_MOCK, errorMessages, isRecord, requestJson } from './client'
import { mockGenerate, mockHealth } from './mock'

function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

function invalidResponse(): ApiError {
  return new ApiError('invalid-response', errorMessages['invalid-response'])
}

function parseHealth(value: unknown): HealthResponse {
  if (!isRecord(value) || value.status !== 'ok') {
    throw new ApiError('starting', errorMessages.starting)
  }

  const { parameters, block_size } = value
  if (!isNonNegativeNumber(parameters) || !isNonNegativeNumber(block_size)) {
    throw invalidResponse()
  }

  return { status: 'ok', parameters, block_size }
}

function parseGenerate(value: unknown): GenerateResponse {
  if (!isRecord(value)) throw invalidResponse()

  const { text, completion, tokens, time_ms, token_strings } = value

  if (
    typeof text !== 'string' ||
    typeof completion !== 'string' ||
    !isNonNegativeNumber(tokens) ||
    !isNonNegativeNumber(time_ms)
  ) {
    throw invalidResponse()
  }

  // token_strings is optional, but must be a string list when present
  if (
    token_strings !== undefined &&
    token_strings !== null &&
    !(Array.isArray(token_strings) && token_strings.every((t) => typeof t === 'string'))
  ) {
    throw invalidResponse()
  }

  return {
    text,
    completion,
    tokens,
    time_ms,
    token_strings: Array.isArray(token_strings) ? (token_strings as string[]) : undefined,
  }
}

function inRange(value: number, range: { min: number; max: number }): boolean {
  return Number.isFinite(value) && value >= range.min && value <= range.max
}

// Same limits as the backend, checked before sending
function validateParams(params: GenerateParams): void {
  const promptLength = params.prompt.trim().length
  const valid =
    promptLength >= limits.prompt.min &&
    params.prompt.length <= limits.prompt.max &&
    Number.isInteger(params.max_tokens) &&
    inRange(params.max_tokens, limits.max_tokens) &&
    inRange(params.temperature, limits.temperature) &&
    Number.isInteger(params.top_k) &&
    inRange(params.top_k, limits.top_k) &&
    inRange(params.top_p, limits.top_p)

  if (!valid) {
    throw new ApiError('validation', errorMessages.validation)
  }
}

export async function checkApiHealth(): Promise<HealthResponse> {
  if (USE_MOCK) return mockHealth()

  const response = await requestJson('/health', { timeoutMs: timeouts.healthMs })
  return parseHealth(response)
}

export async function generateText(params: GenerateParams): Promise<GenerateResponse> {
  validateParams(params)

  if (USE_MOCK) return mockGenerate(params)

  const response = await requestJson('/generate', {
    method: 'POST',
    body: params,
    timeoutMs: timeouts.generateMs,
  })
  return parseGenerate(response)
}
