import { cn } from '@/lib/utils'

const options = [
  { value: 'huffman', label: 'Huffman' },
  { value: 'shannon-fano', label: 'Shannon-Fano' },
]

export function AlgorithmSelector({ value, onChange }) {
  return (
    <div className="inline-flex flex-wrap rounded-lg bg-card border border-border p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-all',
            value === option.value
              ? 'bg-primary text-primary-foreground'
              : 'text-text-secondary hover:text-foreground'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
