import { useRef, useState } from 'react'
import { generateText } from '../api/generate'
import { getErrorMessage } from '../api/client'
import { HISTORY_LIMIT } from '../config/site'
import type { GenerateParams, HistoryItem } from '../types'

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

// Request state, the latest result and a short history
export function useGenerate() {
  const [status, setStatus] = useState<RequestStatus>('idle')
  const [result, setResult] = useState<HistoryItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  // Ignore responses from older requests
  const latestRequest = useRef(0)

  async function generate(params: GenerateParams) {
    const requestId = ++latestRequest.current
    setStatus('loading')
    setError(null)

    try {
      const response = await generateText(params)
      if (requestId !== latestRequest.current) return

      const item: HistoryItem = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        params,
        response,
      }
      setResult(item)
      setHistory((items) => [item, ...items].slice(0, HISTORY_LIMIT))
      setStatus('success')
    } catch (caught) {
      if (requestId !== latestRequest.current) return
      setError(getErrorMessage(caught))
      setStatus('error')
    }
  }

  return { status, result, error, history, generate, isLoading: status === 'loading' }
}
