import { LoaderCircle } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[0_8px_22px_rgba(11,107,117,0.22)] hover:bg-accent-strong disabled:shadow-none',
  secondary: 'border border-border bg-surface text-foreground hover:border-accent/60 hover:text-accent',
  ghost: 'text-body hover:bg-surface-2 hover:text-foreground',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-9 gap-1.5 px-3.5 text-xs',
  md: 'min-h-11 gap-2 px-5 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center rounded-full font-semibold transition disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
      {children}
    </button>
  )
}
