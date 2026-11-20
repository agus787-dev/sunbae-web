import { useId } from 'react'

// Faint decorative girih (eight-point star) lattice
export function GirihPattern({ className = '' }: { className?: string }) {
  const id = 'girih' + useId().replace(/[^\w-]/g, '')

  return (
    <svg aria-hidden="true" focusable="false" className={className} width="100%" height="100%">
      <defs>
        <pattern id={id} width="96" height="96" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            {/* Star made of two squares */}
            <rect x="28" y="28" width="40" height="40" />
            <rect x="28" y="28" width="40" height="40" transform="rotate(45 48 48)" />
            {/* Lines that join neighbouring stars */}
            <path d="M0 0 L19.7 19.7 M96 0 L76.3 19.7 M0 96 L19.7 76.3 M96 96 L76.3 76.3" />
            <path d="M48 0 V19.7 M48 96 V76.3 M0 48 H19.7 M96 48 H76.3" />
            <circle cx="48" cy="48" r="8" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
