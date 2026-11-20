import { Binary, Cpu, Database, TrendingDown, type LucideIcon } from 'lucide-react'
import { LOSS_PENDING_TEXT, dataMix, lossPoints, modelStats } from '../../config/site'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

interface OverviewCard {
  icon: LucideIcon
  title: string
  value: string
  rows: [string, string][]
}

const cards: OverviewCard[] = [
  {
    icon: Database,
    title: "Ma'lumotlar",
    value: modelStats.documents,
    rows: [
      ['hujjat', modelStats.documents],
      ['belgi', modelStats.characters],
    ],
  },
  {
    icon: Binary,
    title: 'Tokenizer',
    value: modelStats.vocabSize,
    rows: [
      ["lug'at", modelStats.vocabSize],
      ["token / so'z", modelStats.tokensPerWord],
    ],
  },
  {
    icon: Cpu,
    title: 'Arxitektura',
    value: modelStats.parameters,
    rows: [
      ['qatlam × head', `${modelStats.layers} × ${modelStats.heads}`],
      ['d_model', String(modelStats.dModel)],
      ['kontekst', `${modelStats.contextLength} token`],
    ],
  },
  {
    icon: TrendingDown,
    title: "O'qitish",
    value: modelStats.trainTokens,
    rows: [
      ['token', modelStats.trainTokens],
      ['qadam', modelStats.trainSteps],
    ],
  },
]

export function ModelOverview() {
  return (
    <section id="model" aria-labelledby="model-title">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          id="model-title"
          eyebrow="Model"
          title="Sunbae qanday qurilgan"
          description="Ma'lumotlar yig'ishdan tortib tokenizer va transformergacha — hammasi noldan."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, value, rows }) => (
            <li key={title}>
              <Card as="article" className="h-full p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-body">{title}</h3>
                <p className="mt-1 font-mono text-2xl font-semibold text-foreground">{value}</p>
                <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
                  {rows.map(([label, rowValue]) => (
                    <div key={label} className="flex justify-between gap-3">
                      <dt className="text-muted">{label}</dt>
                      <dd className="font-mono text-foreground">{rowValue}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <DataMixCard />
          <LossCard />
        </div>
      </div>
    </section>
  )
}

function DataMixCard() {
  return (
    <Card as="article" className="p-5 sm:p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">Ma'lumotlar tarkibi</h3>
      <div
        role="img"
        aria-label={dataMix.map(({ label, share }) => `${label} ${share}%`).join(', ')}
        className="mt-5 flex h-4 overflow-hidden rounded-full"
      >
        {dataMix.map(({ label, share, color }) => (
          <span key={label} className={`${color} h-full`} style={{ width: `${share}%` }} />
        ))}
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {dataMix.map(({ label, share, color }) => (
          <li key={label} className="flex items-center gap-2.5 text-sm">
            <span aria-hidden="true" className={`size-2.5 rounded-full ${color}`} />
            <span className="text-body">{label}</span>
            <span className="ml-auto font-mono font-semibold text-foreground sm:ml-0">{share}%</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function LossCard() {
  const maxLoss = Math.max(...lossPoints.map((point) => point.value ?? 0))

  return (
    <Card as="article" className="p-5 sm:p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">Validation loss</h3>
      <ul className="mt-5 space-y-4">
        {lossPoints.map(({ label, value }) => (
          <li key={label}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-body">{label}</span>
              {value === null ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-ink">
                  <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-accent" />
                  {LOSS_PENDING_TEXT}
                </span>
              ) : (
                <span className="font-mono font-semibold text-foreground">{value.toFixed(2)}</span>
              )}
            </div>
            <div aria-hidden="true" className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
              {value !== null && (
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: `${(value / maxLoss) * 100}%` }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">Pastroq — yaxshiroq.</p>
    </Card>
  )
}
