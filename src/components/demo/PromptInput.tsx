import { Send } from 'lucide-react'
import type { FormEvent, KeyboardEvent } from 'react'
import { limits } from '../../config/site'
import { Button } from '../ui/Button'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  loading: boolean
}

export function PromptInput({ value, onChange, onSubmit, loading }: PromptInputProps) {
  const length = value.length
  const tooLong = length > limits.prompt.max
  const canSubmit = value.trim().length >= limits.prompt.min && !tooLong && !loading

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (canSubmit) onSubmit()
  }

  // Ctrl/Cmd + Enter submits
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      if (canSubmit) onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prompt" className="text-sm font-semibold text-foreground">
        Matn boshlanishi
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
        placeholder="Masalan: Seulda talaba bo'lib yashash"
        aria-describedby="prompt-help"
        aria-invalid={tooLong || undefined}
        className="mt-2 block w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-base leading-7 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent"
      />
      <div id="prompt-help" className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>
          <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono">Ctrl</kbd>
          {' / '}
          <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono">⌘</kbd>
          {' + '}
          <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono">Enter</kbd>
          {' — yuborish'}
        </span>
        <span className={`font-mono ${tooLong ? 'font-semibold text-danger' : ''}`}>
          {length} / {limits.prompt.max}
        </span>
      </div>
      <Button type="submit" loading={loading} disabled={!canSubmit} className="mt-4 w-full sm:w-auto">
        {!loading && <Send aria-hidden="true" className="size-4" />}
        {loading ? 'Yozilmoqda...' : 'Davom ettirish'}
      </Button>
    </form>
  )
}
