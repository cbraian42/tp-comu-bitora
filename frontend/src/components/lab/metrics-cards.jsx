import { Card, CardContent } from '@/components/ui/card'
import { FileText, Archive, TrendingDown, Gauge, Hash, Trophy, Percent } from 'lucide-react'
import { formatBytes } from '@/lib/display'

function MetricCard({ icon, label, value, subValue, color }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-text-secondary mb-1">{label}</p>
            <p className="text-xl font-semibold text-foreground truncate">{value}</p>
            {subValue && <p className="text-xs text-text-muted mt-0.5">{subValue}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MetricsCards({ result, comparisonResult }) {
  if (!result) return null

  const bestAlgorithm = comparisonResult
    ? result.compressedSize <= comparisonResult.compressedSize
      ? result.algorithm
      : comparisonResult.algorithm
    : result.algorithm

  const metrics = [
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      label: 'Tamaño original',
      value: formatBytes(result.originalSize),
      subValue: `${result.originalSize.toLocaleString()} bits`,
      color: 'bg-primary/10',
    },
    {
      icon: <Archive className="h-5 w-5 text-accent" />,
      label: 'Tamaño comprimido',
      value: formatBytes(result.compressedSize),
      subValue: `${result.compressedSize.toLocaleString()} bits`,
      color: 'bg-accent/10',
    },
    {
      icon: <TrendingDown className="h-5 w-5 text-accent-orange" />,
      label: 'Reducción lograda',
      value: `${result.reductionPercent.toFixed(1)}%`,
      subValue: `${(result.originalSize - result.compressedSize).toLocaleString()} bits ahorrados`,
      color: 'bg-accent-orange/10',
    },
    {
      icon: <Gauge className="h-5 w-5 text-accent-purple" />,
      label: 'Eficiencia',
      value: `${Math.min(result.efficiency, 100).toFixed(1)}%`,
      subValue: `Entropía: ${result.entropy.toFixed(3)} bits`,
      color: 'bg-accent-purple/10',
    },
    {
      icon: <Hash className="h-5 w-5 text-primary" />,
      label: 'Longitud promedio',
      value: `${result.averageCodeLength.toFixed(2)} bits`,
      subValue: 'Por símbolo',
      color: 'bg-primary/10',
    },
    {
      icon: <Percent className="h-5 w-5 text-accent" />,
      label: 'Símbolos detectados',
      value: result.codeTable.length.toString(),
      subValue: 'Caracteres únicos',
      color: 'bg-accent/10',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Best Result Badge */}
      {comparisonResult && (
        <Card className="bg-card-elevated border-accent/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Trophy className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Mejor resultado</p>
                <p className="font-semibold text-foreground">
                  {bestAlgorithm === 'huffman' ? 'Huffman' : 'Shannon-Fano'}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm text-text-secondary">Diferencia</p>
                <p className="font-mono text-foreground">
                  {Math.abs(result.compressedSize - comparisonResult.compressedSize).toLocaleString()} bits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
