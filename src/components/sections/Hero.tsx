import { ArrowDown, CodeXml } from 'lucide-react'
import { heroTokenSample, modelStats, site } from '../../config/site'
import { TokenChip } from '../demo/TokenChip'
import { Card } from '../ui/Card'
import { GirihPattern } from '../ui/GirihPattern'

const heroStats = [
  { value: modelStats.parameters, label: 'parametr' },
  { value: modelStats.vocabSize, label: "lug'at (token)" },
  { value: modelStats.characters, label: "o'quv belgilari" },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <GirihPattern className="pointer-events-none absolute inset-0 -z-10 text-accent opacity-[0.07] dark:opacity-[0.09] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_72%)]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-body">
            <span aria-hidden="true" className="font-kr text-sm text-accent">
              {site.koreanName}
            </span>
            Koreyadagi o'zbek talabalari uchun
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl"
          >
            O'zbek tilida yozadigan{' '}
            <span className="italic text-accent">sunbae</span>.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-body sm:text-lg sm:leading-8">
            Sunbae — noldan qurilgan o'zbek tilidagi til modeli. Hozircha bu base model: u siz
            boshlagan matnni davom ettiradi. Keyingi bosqichda u suhbatdosh yordamchiga aylanadi.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#demo"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-on-accent shadow-[0_8px_22px_rgba(11,107,117,0.22)] transition hover:bg-accent-strong"
            >
              Demoni sinab ko'ring
              <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition hover:border-accent/60 hover:text-accent"
            >
              <CodeXml aria-hidden="true" className="size-4" />
              GitHub
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {heroStats.map(({ value, label }) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-muted">{label}</dt>
                <dd className="font-mono text-xl font-semibold text-foreground sm:text-2xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Card className="relative mx-auto w-full max-w-md p-6 sm:p-7">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-7 select-none font-kr text-8xl font-bold text-accent/10"
          >
            선배
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Tokenizer</p>
          <p className="mt-3 font-display text-xl text-foreground">“{heroTokenSample.text}”</p>

          <ul aria-label="Tokenlar va ularning raqamlari" className="mt-5 flex flex-wrap gap-1.5">
            {heroTokenSample.tokens.map((token, index) => (
              <li key={index}>
                <TokenChip token={token.text} id={token.id} index={index} />
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5">
            <div>
              <p className="font-mono text-lg font-semibold text-foreground">{modelStats.tokensPerWord}</p>
              <p className="text-xs text-muted">token / so'z</p>
            </div>
            <div>
              <p className="font-mono text-lg font-semibold text-foreground">{modelStats.vocabSize}</p>
              <p className="text-xs text-muted">lug'at hajmi</p>
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-muted">
            <span aria-hidden="true" className="font-kr text-accent">선배</span> (sunbae) — koreyschada
            “katta kursdosh”, yo'l ko'rsatadigan tajribali do'st.
          </p>
        </Card>
      </div>
    </section>
  )
}
