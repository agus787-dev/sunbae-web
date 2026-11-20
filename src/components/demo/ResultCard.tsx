import { Check, CircleAlert, Copy, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useTypewriter } from '../../hooks/useTypewriter'
import type { HistoryItem } from '../../types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { TokenView } from './TokenView'

type Tab = 'text' | 'tokens'

interface ResultCardProps {
  result: HistoryItem | null
  error: string | null
  loading: boolean
}

export function ResultCard({ result, error, loading }: ResultCardProps) {
  return (
    <Card className="p-5 sm:p-6">
      <div aria-live="polite" className="sr-only">
        {loading ? 'Model yozmoqda' : result ? 'Natija tayyor' : ''}
      </div>
      {error && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-3 rounded-2xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}
      {loading ? (
        <LoadingState />
      ) : result ? (
        // key restarts the typing animation for each new result
        <ResultBody key={result.id} item={result} />
      ) : (
        <EmptyState />
      )}
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
        <Sparkles aria-hidden="true" className="size-5" />
      </span>
      <p className="mt-4 font-display text-lg text-foreground">Natija shu yerda paydo bo'ladi</p>
      <p className="mt-1 max-w-xs text-sm text-muted">
        Gapni boshlang yoki namunani tanlang — model uni davom ettiradi.
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="min-h-56" aria-hidden="true">
      <p className="text-sm font-medium text-muted">Model yozmoqda...</p>
      <div className="mt-5 space-y-3">
        {['w-full', 'w-11/12', 'w-4/5', 'w-2/3'].map((width) => (
          <div key={width} className={`h-3.5 animate-pulse rounded-full bg-surface-2 ${width}`} />
        ))}
      </div>
    </div>
  )
}

function ResultBody({ item }: { item: HistoryItem }) {
  const { params, response } = item
  const tokenStrings = response.token_strings
  const hasTokens = Boolean(tokenStrings && tokenStrings.length > 0)
  const [tab, setTab] = useState<Tab>('text')
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ text: null, tokens: null })

  // Prompt part as returned by the backend, falling back to what was sent
  const promptPart = response.text.endsWith(response.completion)
    ? response.text.slice(0, response.text.length - response.completion.length)
    : params.prompt

  // Arrow keys move between the enabled tabs
  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!hasTokens || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next: Tab = tab === 'text' ? 'tokens' : 'text'
    const target = event.key === 'Home' ? 'text' : event.key === 'End' ? 'tokens' : next
    setTab(target)
    tabRefs.current[target]?.focus()
  }

  const tabClass = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
      active ? 'bg-surface text-foreground shadow-sm' : 'text-body hover:text-foreground'
    }`

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Natija ko'rinishi" className="inline-flex rounded-full bg-surface-2 p-1">
          <button
            ref={(node) => {
              tabRefs.current.text = node
            }}
            type="button"
            role="tab"
            id="tab-text"
            aria-selected={tab === 'text'}
            aria-controls="panel-text"
            tabIndex={tab === 'text' ? 0 : -1}
            onClick={() => setTab('text')}
            onKeyDown={handleTabKey}
            className={tabClass(tab === 'text')}
          >
            Matn
          </button>
          <button
            ref={(node) => {
              tabRefs.current.tokens = node
            }}
            type="button"
            role="tab"
            id="tab-tokens"
            aria-selected={tab === 'tokens'}
            aria-controls="panel-tokens"
            aria-describedby={hasTokens ? undefined : 'tokens-hint'}
            tabIndex={tab === 'tokens' ? 0 : -1}
            disabled={!hasTokens}
            onClick={() => setTab('tokens')}
            onKeyDown={handleTabKey}
            className={tabClass(tab === 'tokens')}
          >
            Tokenlar
          </button>
        </div>
        <CopyButton text={response.text} />
      </div>

      {!hasTokens && (
        <p id="tokens-hint" className="mt-2 text-xs text-muted">
          Server tokenlar ro'yxatini qaytarmadi.
        </p>
      )}

      <div
        role="tabpanel"
        id="panel-text"
        aria-labelledby="tab-text"
        hidden={tab !== 'text'}
        tabIndex={0}
        className="mt-5 rounded-lg"
      >
        <TypedResult prompt={promptPart} completion={response.completion} />
      </div>

      {hasTokens && tokenStrings && (
        <div
          role="tabpanel"
          id="panel-tokens"
          aria-labelledby="tab-tokens"
          hidden={tab !== 'tokens'}
          tabIndex={0}
          className="mt-5 rounded-lg"
        >
          <TokenView tokens={tokenStrings} />
        </div>
      )}

      <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-4 font-mono text-xs text-muted">
        <span>{response.tokens} yangi token</span>
        <span>{Math.round(response.time_ms).toLocaleString('en-US')} ms</span>
        <span>temperatura {params.temperature.toFixed(2)}</span>
      </p>
    </div>
  )
}

function TypedResult({ prompt, completion }: { prompt: string; completion: string }) {
  const { visible, done } = useTypewriter(completion)

  return (
    <p className="whitespace-pre-wrap break-words text-base leading-8">
      <span className="text-muted">{prompt}</span>
      <span className="font-medium text-foreground">{visible}</span>
      {!done && (
        <span aria-hidden="true" className="typing-caret ml-0.5 inline-block h-5 w-0.5 translate-y-1 bg-accent" />
      )}
      {/* Full text for screen readers while the animation runs */}
      {!done && <span className="sr-only">{completion.slice(visible.length)}</span>}
    </p>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button variant="secondary" size="sm" onClick={copy}>
      {copied ? (
        <Check aria-hidden="true" className="size-3.5 text-success" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5" />
      )}
      <span aria-live="polite">{copied ? 'Nusxa olindi' : 'Nusxa olish'}</span>
    </Button>
  )
}
