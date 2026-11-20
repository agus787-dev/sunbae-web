interface ExampleChipsProps {
  prompts: readonly string[]
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function ExampleChips({ prompts, onSelect, disabled }: ExampleChipsProps) {
  return (
    <div>
      <p id="examples-label" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Namunalar
      </p>
      <ul aria-labelledby="examples-label" className="mt-2 flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <li key={prompt}>
            <button
              type="button"
              onClick={() => onSelect(prompt)}
              disabled={disabled}
              className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-left text-sm text-body transition hover:border-accent/60 hover:bg-accent-soft hover:text-accent-ink disabled:cursor-not-allowed disabled:opacity-55"
            >
              {prompt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
