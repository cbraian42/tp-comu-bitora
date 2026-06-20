import * as React from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, variant = 'default', ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variant === 'default'
          ? 'border-transparent bg-primary/10 text-primary'
          : 'border-border text-foreground',
        className
      )}
      {...props}
    />
  )
}
