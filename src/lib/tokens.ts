// The five chip tints, cycled in order
export const tokenTints = [
  'bg-(--tint-1-bg) text-(--tint-1-fg)',
  'bg-(--tint-2-bg) text-(--tint-2-fg)',
  'bg-(--tint-3-bg) text-(--tint-3-fg)',
  'bg-(--tint-4-bg) text-(--tint-4-fg)',
  'bg-(--tint-5-bg) text-(--tint-5-fg)',
]

// Make whitespace visible: leading space as ␣, newline as ↵
export function formatToken(token: string): string {
  return token.replace(/^ /, '␣').replace(/\n/g, '↵')
}
