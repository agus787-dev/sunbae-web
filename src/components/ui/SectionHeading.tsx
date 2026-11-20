interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-7 text-body">{description}</p>}
    </div>
  )
}
