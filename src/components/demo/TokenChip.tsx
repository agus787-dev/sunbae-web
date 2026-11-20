import { formatToken, tokenTints } from '../../lib/tokens'

interface TokenChipProps {
  token: string
  index: number
  id?: number
}

export function TokenChip({ token, index, id }: TokenChipProps) {
  return (
    <span
      className={`inline-flex flex-col items-center rounded-lg px-2 py-1 font-mono text-sm leading-tight ${tokenTints[index % tokenTints.length]}`}
    >
      <span className="whitespace-pre">{formatToken(token)}</span>
      {id !== undefined && <span className="mt-0.5 text-[10px] opacity-80">{id}</span>}
    </span>
  )
}
