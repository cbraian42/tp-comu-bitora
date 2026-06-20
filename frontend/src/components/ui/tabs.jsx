import * as React from 'react'
import { cn } from '@/lib/utils'

const TabsContext = React.createContext(null)

export function Tabs({ defaultValue, value, onValueChange, className, children }) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal

  const setValue = React.useCallback(
    (v) => {
      setInternal(v)
      onValueChange?.(v)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }) {
  return (
    <div
      className={cn('inline-flex items-center gap-1 rounded-lg', className)}
      role="tablist"
      {...props}
    />
  )
}

export function TabsTrigger({ value, className, children, ...props }) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('TabsTrigger debe usarse dentro de Tabs')
  const active = ctx.value === value

  return (
    <button
      role="tab"
      aria-selected={active}
      data-state={active ? 'active' : 'inactive'}
      onClick={() => ctx.setValue(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        active ? '' : 'text-text-secondary hover:text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children, ...props }) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('TabsContent debe usarse dentro de Tabs')
  if (ctx.value !== value) return null

  return (
    <div role="tabpanel" className={className} {...props}>
      {children}
    </div>
  )
}
