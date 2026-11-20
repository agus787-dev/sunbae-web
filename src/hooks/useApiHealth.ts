import { useEffect, useState } from 'react'
import { checkApiHealth } from '../api/generate'
import { USE_MOCK } from '../api/client'
import { timeouts } from '../config/site'
import type { HealthResponse, HealthStatus } from '../types'

// Checks /health on load and retries while the server is offline
export function useApiHealth() {
  const [status, setStatus] = useState<HealthStatus>('checking')
  const [health, setHealth] = useState<HealthResponse | null>(null)

  useEffect(() => {
    let cancelled = false
    let retryTimer: ReturnType<typeof setTimeout> | undefined

    async function check() {
      try {
        const result = await checkApiHealth()
        if (cancelled) return
        setHealth(result)
        setStatus('online')
      } catch {
        if (cancelled) return
        setStatus('offline')
        retryTimer = setTimeout(check, timeouts.healthRetryMs)
      }
    }

    check()
    return () => {
      cancelled = true
      clearTimeout(retryTimer)
    }
  }, [])

  return { status, health, isMock: USE_MOCK }
}
