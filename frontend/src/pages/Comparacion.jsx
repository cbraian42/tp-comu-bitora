import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TextInput } from '@/components/lab/text-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Loader2, Trophy, Scale, TrendingDown, Gauge, Hash, Zap, AlertCircle, RotateCcw } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { formatBytes } from '@/lib/display'
import { api } from '@/lib/api'

export default function Comparacion() {
  const [text, setText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [huffmanResult, setHuffmanResult] = useState(null)
  const [shannonFanoResult, setShannonFanoResult] = useState(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setIsProcessing(true)
    setError('')

    try {
      const res = await api.compare(text)
      setHuffmanResult(res.huffman)
      setShannonFanoResult(res.shannonFano)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al conectar con el servidor.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClear = () => {
    setText('')
    setHuffmanResult(null)
    setShannonFanoResult(null)
    setError('')
  }

  const hasResults = huffmanResult !== null && shannonFanoResult !== null

  const winner = hasResults
    ? huffmanResult.compressedSize <= shannonFanoResult.compressedSize
      ? 'huffman'
      : 'shannon-fano'
    : null

  const comparisonData = hasResults
    ? [
        {
          metric: 'Tamaño comprimido',
          Huffman: huffmanResult.compressedSize,
          'Shannon-Fano': shannonFanoResult.compressedSize,
        },
        {
          metric: 'Longitud promedio',
          // Escalado para visualización en gráfico de barras
          Huffman: Math.round(huffmanResult.averageCodeLength * 100),
          'Shannon-Fano': Math.round(shannonFanoResult.averageCodeLength * 100),
        },
      ]
    : []

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Comparación de algoritmos
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Analizá el mismo texto con Huffman y Shannon-Fano para ver cuál logra mejor compresión en cada caso.
          </p>
        </div>

        {error && (
          <Card className="bg-error/10 border-error/50 border mb-6">
            <CardContent className="p-4 flex items-center gap-3 text-error">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Input Section */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <h2 className="font-display font-semibold text-foreground mb-4">
                  Texto a comparar
                </h2>
                <TextInput value={text} onChange={setText} onClear={handleClear} />
              </div>
              <div className="flex flex-col justify-end gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={!text.trim() || isProcessing}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Comparando...
                    </>
                  ) : (
                    <>
                      <Scale className="h-5 w-5" />
                      Comparar algoritmos
                    </>
                  )}
                </Button>
                <Button onClick={handleClear} variant="outline" className="border-border">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reiniciar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {hasResults ? (
          <div className="space-y-6">
            {/* Winner Banner */}
            <Card className={`border-2 ${winner === 'huffman' ? 'border-primary bg-primary/5' : 'border-accent bg-accent/5'}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className={`p-3 rounded-xl ${winner === 'huffman' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                    <Trophy className={`h-8 w-8 ${winner === 'huffman' ? 'text-primary' : 'text-accent'}`} />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                      {winner === 'huffman' ? 'Huffman' : 'Shannon-Fano'} logró mejor compresión
                    </h2>
                    <p className="text-text-secondary">
                      {winner === 'huffman'
                        ? 'En este caso, Huffman asignó códigos más cortos a los símbolos más frecuentes, logrando una mejor compresión.'
                        : 'En este caso, Shannon-Fano logró una distribución de códigos más eficiente para este texto en particular.'}
                    </p>
                  </div>
                  <div className="ml-auto text-center">
                    <p className="text-sm text-text-secondary">Diferencia</p>
                    <p className="font-mono text-2xl font-bold text-foreground">
                      {Math.abs(huffmanResult.compressedSize - shannonFanoResult.compressedSize).toLocaleString()} bits
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Side by Side Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Huffman */}
              <Card className={`bg-card border-2 ${winner === 'huffman' ? 'border-primary' : 'border-border'}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                      Huffman
                      {winner === 'huffman' && (
                        <Badge className="bg-primary/10 text-primary border-primary/30">
                          Mejor
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="text-2xl font-bold text-primary font-mono">
                      {formatBytes(huffmanResult.compressedSize)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-2 text-text-secondary mb-1">
                        <TrendingDown className="h-4 w-4" />
                        <span className="text-sm">Reducción</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {huffmanResult.reductionPercent.toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-2 text-text-secondary mb-1">
                        <Hash className="h-4 w-4" />
                        <span className="text-sm">Long. promedio</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {huffmanResult.averageCodeLength.toFixed(2)} bits
                      </p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-2 text-text-secondary mb-1">
                        <Gauge className="h-4 w-4" />
                        <span className="text-sm">Eficiencia</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {Math.min(huffmanResult.efficiency, 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-2 text-text-secondary mb-1">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm">Entropía</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {huffmanResult.entropy.toFixed(3)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                      <span>Compresión</span>
                      <span>{huffmanResult.reductionPercent.toFixed(1)}%</span>
                    </div>
                    <Progress value={huffmanResult.reductionPercent} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Shannon-Fano */}
              <Card className={`bg-card border-2 ${winner === 'shannon-fano' ? 'border-accent' : 'border-border'}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                      Shannon-Fano
                      {winner === 'shannon-fano' && (
                        <Badge className="bg-accent/10 text-accent border-accent/30">
                          Mejor
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="text-2xl font-bold text-accent font-mono">
                      {formatBytes(shannonFanoResult.compressedSize)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-2 text-text-secondary mb-1">
                        <TrendingDown className="h-4 w-4" />
                        <span className="text-sm">Reducción</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {shannonFanoResult.reductionPercent.toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-2 text-text-secondary mb-1">
                        <Hash className="h-4 w-4" />
                        <span className="text-sm">Long. promedio</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {shannonFanoResult.averageCodeLength.toFixed(2)} bits
                      </p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-2 text-text-secondary mb-1">
                        <Gauge className="h-4 w-4" />
                        <span className="text-sm">Eficiencia</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {Math.min(shannonFanoResult.efficiency, 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-2 text-text-secondary mb-1">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm">Entropía</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {shannonFanoResult.entropy.toFixed(3)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                      <span>Compresión</span>
                      <span>{shannonFanoResult.reductionPercent.toFixed(1)}%</span>
                    </div>
                    <Progress value={shannonFanoResult.reductionPercent} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bar Chart Comparison */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg text-foreground">
                  Comparación visual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} layout="vertical">
                      <XAxis
                        type="number"
                        tick={{ fill: '#94A3B8', fontSize: 12 }}
                        axisLine={{ stroke: '#334155' }}
                      />
                      <YAxis
                        type="category"
                        dataKey="metric"
                        tick={{ fill: '#CBD5E1', fontSize: 12 }}
                        axisLine={{ stroke: '#334155' }}
                        width={120}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1E293B',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#F8FAFC',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="Huffman" fill="#38BDF8" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="Shannon-Fano" fill="#22C55E" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Compará algoritmos
              </h3>
              <p className="text-text-secondary max-w-md mx-auto">
                Ingresá un texto arriba y hacé clic en {'"Comparar algoritmos"'} para ver qué método funciona mejor para tu contenido.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
