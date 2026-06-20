import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Search, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSymbolDisplay } from '@/lib/display'

export function CodeTable({ codeTable, algorithm }) {
  const [search, setSearch] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)

  const filteredTable = codeTable.filter(
    (entry) =>
      entry.symbol.toLowerCase().includes(search.toLowerCase()) || entry.code.includes(search)
  )

  const handleCopy = async (code, index) => {
    await navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-display text-foreground">Tabla de códigos</CardTitle>
            <p className="text-sm text-text-secondary">
              {algorithm === 'huffman' ? 'Algoritmo Huffman' : 'Algoritmo Shannon-Fano'}
            </p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="Buscar símbolo o código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-sm font-medium text-text-secondary">Símbolo</th>
                <th className="text-right py-2 px-2 text-sm font-medium text-text-secondary">Frecuencia</th>
                <th className="text-right py-2 px-2 text-sm font-medium text-text-secondary">Probabilidad</th>
                <th className="text-left py-2 px-2 text-sm font-medium text-text-secondary">Código</th>
                <th className="text-right py-2 px-2 text-sm font-medium text-text-secondary">Bits</th>
                <th className="py-2 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTable.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b border-border/50 hover:bg-card-elevated transition-colors"
                >
                  <td className="py-2 px-2">
                    <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {getSymbolDisplay(entry.symbol)}
                    </span>
                  </td>
                  <td className="text-right py-2 px-2 text-foreground">
                    {entry.frequency.toLocaleString()}
                  </td>
                  <td className="text-right py-2 px-2 text-text-secondary">
                    {(entry.probability * 100).toFixed(2)}%
                  </td>
                  <td className="py-2 px-2">
                    <span className="font-mono text-accent text-sm">{entry.code}</span>
                  </td>
                  <td className="text-right py-2 px-2 text-text-secondary">{entry.codeLength}</td>
                  <td className="py-2 px-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleCopy(entry.code, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-3.5 w-3.5 text-accent" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-text-muted" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
