import { ArrowUpRight } from 'lucide-react'
import { site } from '../../config/site'

const footerLinks = [
  { label: 'Model (backend)', href: site.githubUrl },
  { label: 'Sayt (frontend)', href: site.frontendUrl },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p className="flex items-center gap-2 text-center sm:text-left">
          <span aria-hidden="true" className="font-kr text-base text-accent">
            {site.koreanName}
          </span>
          <span>Koreyadagi o'zbek talabalari uchun · Noldan qurilgan.</span>
        </p>
        <nav aria-label="Loyiha repozitoriylari" className="flex items-center gap-5">
          {footerLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium transition hover:text-accent"
            >
              {label}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
