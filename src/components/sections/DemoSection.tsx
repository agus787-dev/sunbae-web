import { CircleAlert, Info } from 'lucide-react'
import { useRef, useState } from 'react'
import { defaultSettings, examplePrompts } from '../../config/site'
import { useGenerate } from '../../hooks/useGenerate'
import type { GenerationSettings, HealthStatus, HistoryItem } from '../../types'
import { ExampleChips } from '../demo/ExampleChips'
import { HistoryList } from '../demo/HistoryList'
import { PromptInput } from '../demo/PromptInput'
import { ResultCard } from '../demo/ResultCard'
import { SettingsPanel } from '../demo/SettingsPanel'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

interface DemoSectionProps {
  healthStatus: HealthStatus
  isMock: boolean
}

export function DemoSection({ healthStatus, isMock }: DemoSectionProps) {
  const [prompt, setPrompt] = useState('')
  const [settings, setSettings] = useState<GenerationSettings>(defaultSettings)
  const { result, error, history, generate, isLoading } = useGenerate()
  const resultRef = useRef<HTMLDivElement>(null)

  function handleSubmit() {
    generate({ prompt, ...settings })
    // On narrow screens the result is below the form, so bring it into view
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      resultRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }
  }

  function restore(item: HistoryItem) {
    const { prompt: savedPrompt, ...savedSettings } = item.params
    setPrompt(savedPrompt)
    setSettings(savedSettings)
    document.getElementById('prompt')?.focus()
  }

  return (
    <section id="demo" aria-labelledby="demo-title" className="border-y border-border bg-surface-2/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          id="demo-title"
          eyebrow="Demo"
          title="Gapni boshlang — Sunbae davom ettiradi"
          description="Modelga matnning boshini bering va sozlamalar bilan tajriba qiling."
        />

        <p className="mt-6 flex max-w-2xl items-start gap-3 rounded-2xl border border-cobalt/20 bg-cobalt-soft px-4 py-3 text-sm leading-6 text-cobalt">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>
            Bu <strong>base model</strong>: u savollarga javob bermaydi, balki matnni davom ettiradi.
            Suhbat rejimi keyingi bosqichda qo'shiladi.
          </span>
        </p>

        {!isMock && healthStatus === 'offline' && (
          <p
            role="alert"
            className="mt-4 flex max-w-2xl items-start gap-3 rounded-2xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger"
          >
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Server hozir javob bermayapti. Birozdan so'ng qayta tekshiriladi.
          </p>
        )}

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          <Card className="space-y-6 p-5 sm:p-6">
            <PromptInput value={prompt} onChange={setPrompt} onSubmit={handleSubmit} loading={isLoading} />
            <ExampleChips prompts={examplePrompts} onSelect={setPrompt} disabled={isLoading} />
            <SettingsPanel settings={settings} onChange={setSettings} />
          </Card>

          <div ref={resultRef} className="min-w-0 scroll-mt-24">
            <ResultCard result={result} error={error} loading={isLoading} />
            <HistoryList items={history} onSelect={restore} />
          </div>
        </div>
      </div>
    </section>
  )
}
