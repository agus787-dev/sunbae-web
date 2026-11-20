import { History } from 'lucide-react'
import type { HistoryItem } from '../../types'

interface HistoryListProps {
  items: HistoryItem[]
  onSelect: (item: HistoryItem) => void
}

export function HistoryList({ items, onSelect }: HistoryListProps) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="history-title" className="mt-6">
      <h3 id="history-title" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
        <History aria-hidden="true" className="size-4 text-accent" />
        Oxirgi so'rovlar
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-left transition hover:border-accent/60 hover:bg-accent-soft"
            >
              <span className="min-w-0 truncate text-sm text-foreground">{item.params.prompt}</span>
              <span className="shrink-0 font-mono text-xs text-muted">
                {item.response.tokens} tok · t={item.params.temperature.toFixed(2)}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted">Bosing — matn va sozlamalar qayta tiklanadi.</p>
    </section>
  )
}
