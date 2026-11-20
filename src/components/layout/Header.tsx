import { navLinks, site } from '../../config/site'
import type { HealthStatus } from '../../types'
import { StatusBadge } from './StatusBadge'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  status: HealthStatus
  isMock: boolean
}

export function Header({ status, isMock }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <a href="#top" className="inline-flex items-center gap-2.5 rounded-lg" aria-label="Sunbae bosh sahifa">
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-xl bg-accent font-kr text-lg font-bold text-on-accent"
          >
            선
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            {site.name}
          </span>
        </a>

        <nav aria-label="Asosiy bo'limlar" className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-body transition hover:bg-surface-2 hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <StatusBadge status={status} isMock={isMock} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
