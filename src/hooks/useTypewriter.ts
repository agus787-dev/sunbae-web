import { useEffect, useState } from 'react'

const TICK_MS = 20
const TARGET_DURATION_MS = 1600

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Reveals text step by step. Remount (via key) to restart for new text.
export function useTypewriter(text: string) {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0))
  const step = Math.max(1, Math.ceil(text.length / (TARGET_DURATION_MS / TICK_MS)))

  useEffect(() => {
    if (count >= text.length) return
    const timer = setTimeout(() => setCount((c) => Math.min(c + step, text.length)), TICK_MS)
    return () => clearTimeout(timer)
  }, [count, step, text.length])

  return { visible: text.slice(0, count), done: count >= text.length }
}
