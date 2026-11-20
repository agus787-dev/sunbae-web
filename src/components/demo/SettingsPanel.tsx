import { RotateCcw, SlidersHorizontal } from 'lucide-react'
import { defaultSettings, limits } from '../../config/site'
import type { GenerationSettings } from '../../types'
import { Button } from '../ui/Button'
import { Slider } from '../ui/Slider'

interface SettingsPanelProps {
  settings: GenerationSettings
  onChange: (settings: GenerationSettings) => void
}

export function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  function update<K extends keyof GenerationSettings>(key: K, value: GenerationSettings[K]) {
    onChange({ ...settings, [key]: value })
  }

  const isDefault = (Object.keys(defaultSettings) as (keyof GenerationSettings)[]).every(
    (key) => settings[key] === defaultSettings[key],
  )

  return (
    <div role="group" aria-labelledby="settings-title" className="rounded-2xl border border-border bg-background p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 id="settings-title" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal aria-hidden="true" className="size-4 text-accent" />
          Sozlamalar
        </h3>
        <Button variant="ghost" size="sm" onClick={() => onChange(defaultSettings)} disabled={isDefault}>
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Standart
        </Button>
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <Slider
          label="Uzunlik (max_tokens)"
          hint="Nechta yangi token yozilsin."
          value={settings.max_tokens}
          {...limits.max_tokens}
          onChange={(value) => update('max_tokens', value)}
        />
        <Slider
          label="Temperatura"
          hint="Past — aniqroq, yuqori — ijodiyroq."
          value={settings.temperature}
          {...limits.temperature}
          onChange={(value) => update('temperature', value)}
          format={(value) => value.toFixed(2)}
        />
        <Slider
          label="Top-k"
          hint="0 — cheklovsiz."
          value={settings.top_k}
          {...limits.top_k}
          onChange={(value) => update('top_k', value)}
        />
        <Slider
          label="Top-p"
          hint="Ehtimollik bo'yicha saralash."
          value={settings.top_p}
          {...limits.top_p}
          onChange={(value) => update('top_p', value)}
          format={(value) => value.toFixed(2)}
        />
      </div>
    </div>
  )
}
