import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TextInput } from '@/components/lab/text-input'
import { AlgorithmSelector } from '@/components/lab/algorithm-selector'
import { MetricsCards } from '@/components/lab/metrics-cards'
import { FrequencyChart } from '@/components/lab/frequency-chart'
import { CodeTable } from '@/components/lab/code-table'
import { HuffmanTree } from '@/components/lab/huffman-tree'
import { EncodedTextView } from '@/components/lab/encoded-text-view'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Play, RotateCcw, Download, AlertCircle } from 'lucide-react'
import { api } from '@/lib/api'

export default function Laboratorio() {
  const [text, setText] = useState('')
  const [algorithm, setAlgorithm] = useState('huffman')
  const [isProcessing, setIsProcessing] = useState(false)
  const [frequencies, setFrequencies] = useState([])
  const [huffmanResult, setHuffmanResult] = useState(null)
  const [shannonFanoResult, setShannonFanoResult] = useState(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setIsProcessing(true)
    setError('')

    try {
      const res = await api.compress(text, algorithm)
      setFrequencies(res.frequencies || [])
      if (algorithm === 'huffman') {
        setHuffmanResult(res)
        setShannonFanoResult(null)
      } else {
        setShannonFanoResult(res)
        setHuffmanResult(null)
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al conectar con el servidor.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClear = () => {
    setText('')
    setFrequencies([])
    setHuffmanResult(null)
    setShannonFanoResult(null)
    setError('')
  }

  const handleDownload = () => {
    const result = algorithm === 'shannon-fano' ? shannonFanoResult : huffmanResult
    if (!result) return

    const content = JSON.stringify(
      {
        algorithm: result.algorithm,
        originalText: text,
        encodedText: result.encodedText,
        codeTable: result.codeTable,
        metrics: {
          originalSize: result.originalSize,
          compressedSize: result.compressedSize,
          reductionPercent: result.reductionPercent,
          averageCodeLength: result.averageCodeLength,
          efficiency: result.efficiency,
          entropy: result.entropy,
        },
      },
      null,
      2
    )

    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bitora-${result.algorithm}-result.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentResult = algorithm === 'shannon-fano' ? shannonFanoResult : huffmanResult
  const hasResults = huffmanResult !== null || shannonFanoResult !== null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Laboratorio de compresión
          </h1>
          <p className="text-text-secondary">
            Ingresá texto, elegí un algoritmo y analizá los resultados de la compresión.
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Input Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Text Input */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h2 className="font-display font-semibold text-foreground mb-4">
                  Entrada de texto
                </h2>
                <TextInput value={text} onChange={setText} onClear={handleClear} />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2 space-y-6">
            {!hasResults ? (
              <Card className="bg-card border-border">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Sin resultados todavía
                  </h3>
                  <p className="text-text-secondary max-w-md mx-auto">
                    Ingresá un texto en el panel izquierdo y hacé clic en {'"Analizar y comprimir"'} para ver los resultados de la codificación.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Metrics */}
                <MetricsCards result={currentResult} />

                {/* Tabbed Content */}
                <Tabs defaultValue="frequencies" className="w-full">
                  <TabsList className="w-full justify-start bg-card border border-border h-auto p-1 flex-wrap">
                    <TabsTrigger
                      value="frequencies"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Frecuencias
                    </TabsTrigger>
                    <TabsTrigger
                      value="codes"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Códigos
                    </TabsTrigger>
                    {algorithm === 'huffman' && huffmanResult?.tree && (
                      <TabsTrigger
                        value="tree"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        Árbol
                      </TabsTrigger>
                    )}
                    <TabsTrigger
                      value="encoded"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Codificación
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="frequencies" className="mt-4">
                    <FrequencyChart
                      frequencies={frequencies}
                      codeTable={currentResult?.codeTable}
                    />
                  </TabsContent>

                  <TabsContent value="codes" className="mt-4">
                    {currentResult && (
                      <CodeTable codeTable={currentResult.codeTable} algorithm={algorithm} />
                    )}
                  </TabsContent>

                  {algorithm === 'huffman' && huffmanResult?.tree && (
                    <TabsContent value="tree" className="mt-4">
                      <HuffmanTree tree={huffmanResult.tree} />
                    </TabsContent>
                  )}

                  <TabsContent value="encoded" className="mt-4">
                    {currentResult && (
                      <EncodedTextView originalText={text} result={currentResult} />
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}

            {/* Controls moved below results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Algorithm Selection */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h2 className="font-display font-semibold text-foreground mb-4">
                    Algoritmo
                  </h2>
                  <AlgorithmSelector value={algorithm} onChange={setAlgorithm} />
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col justify-end gap-3 pb-0 md:pb-1">
                <Button
                  onClick={handleAnalyze}
                  disabled={!text.trim() || isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Analizar y comprimir
                    </>
                  )}
                </Button>
                <div className="flex gap-3">
                  <Button onClick={handleClear} variant="outline" className="flex-1 border-border">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reiniciar
                  </Button>
                  {hasResults && (
                    <Button onClick={handleDownload} variant="outline" className="flex-1 border-border">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
