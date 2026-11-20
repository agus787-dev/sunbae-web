import { useId } from 'react'

interface SliderProps {
  label: string
  hint?: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  format?: (value: number) => string
}

export function Slider({ label, hint, value, min, max, step, onChange, format = String }: SliderProps) {
  const id = useId()
  const hintId = `${id}-hint`

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-sm text-accent-ink dark:text-accent-ink">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-describedby={hint ? hintId : undefined}
        className="mt-2 w-full cursor-pointer"
      />
      {hint && (
        <p id={hintId} className="mt-1 text-xs leading-5 text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}
