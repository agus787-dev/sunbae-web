import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section'
}

export function Card({ as: Tag = 'div', className = '', ...props }: CardProps) {
  return (
    <Tag
      className={`rounded-3xl border border-border bg-surface shadow-[0_1px_2px_rgba(20,33,43,0.04),0_12px_32px_rgba(20,33,43,0.05)] ${className}`}
      {...props}
    />
  )
}
