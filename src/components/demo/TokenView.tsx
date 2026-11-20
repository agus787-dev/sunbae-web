import { TokenChip } from './TokenChip'

export function TokenView({ tokens }: { tokens: string[] }) {
  return (
    <div>
      <ol aria-label={`${tokens.length} ta yangi token`} className="flex flex-wrap gap-1.5">
        {tokens.map((token, index) => (
          <li key={index}>
            <TokenChip token={token} index={index} />
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-muted">
        <span className="font-mono">␣</span> — token boshidagi bo'sh joy.
      </p>
    </div>
  )
}
