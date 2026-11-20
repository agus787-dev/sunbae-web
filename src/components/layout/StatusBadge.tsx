import type { HealthStatus } from '../../types'

interface StatusBadgeProps {
  status: HealthStatus
  isMock: boolean
}

const states = {
  mock: { label: 'Demo rejim', dot: 'bg-sand', text: 'text-body' },
  checking: { label: 'Ulanmoqda...', dot: 'bg-sand animate-pulse', text: 'text-body' },
  online: { label: 'Model ulangan', dot: 'bg-success', text: 'text-foreground' },
  offline: { label: 'Server ishlamayapti', dot: 'bg-danger', text: 'text-danger' },
} as const

export function StatusBadge({ status, isMock }: StatusBadgeProps) {
  const state = states[isMock ? 'mock' : status]

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium ${state.text}`}
    >
      <span aria-hidden="true" className={`size-2 rounded-full ${state.dot}`} />
      {state.label}
    </span>
  )
}
