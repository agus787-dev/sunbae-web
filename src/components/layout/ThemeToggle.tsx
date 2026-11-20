import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/60 hover:text-accent"
    >
      {theme === 'dark' ? (
        <Sun aria-hidden="true" className="size-[18px]" />
      ) : (
        <Moon aria-hidden="true" className="size-[18px]" />
      )}
    </button>
  )
}
