import { roadmap, roadmapStatusLabels, type RoadmapStatus } from '../../config/site'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

const statusStyles: Record<RoadmapStatus, string> = {
  active: 'bg-accent text-on-accent',
  next: 'bg-cobalt-soft text-cobalt',
  planned: 'bg-surface-2 text-body',
}

export function Roadmap() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-title" className="border-t border-border bg-surface-2/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          id="roadmap-title"
          eyebrow="Yo'l xaritasi"
          title="Base modeldan haqiqiy sunbaegacha"
        />

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {roadmap.map(({ title, description, status }, index) => (
            <li key={title}>
              <Card as="article" className={`h-full p-6 ${status === 'active' ? 'ring-2 ring-accent/40' : ''}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-sm text-muted">0{index + 1}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>
                    {roadmapStatusLabels[status]}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-body">{description}</p>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
