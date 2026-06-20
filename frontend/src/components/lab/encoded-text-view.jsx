import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Copy, Check, CheckCircle2 } from 'lucide-react'
import { decodeText } from '@/lib/display'

export function EncodedTextView({ originalText, result }) {
  const [copied, setCopied] = useState(false)
  const [showDecoded, setShowDecoded] = useState(false)

  const decodedText = decodeText(result.encodedText, result.codeTable)
  const isValid = decodedText === originalText

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.encodedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Formatear texto codificado con saltos de línea para legibilidad
  const formattedEncoded = result.encodedText.match(/.{1,64}/g)?.join('\n') || result.encodedText

  return (
    <div className="space-y-4">
      {/* Original Text */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-display text-foreground">
            Texto original
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[120px]">
            <pre className="font-mono text-sm text-text-secondary whitespace-pre-wrap break-all">
              {originalText}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Encoded Text */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-display text-foreground">
                Texto codificado
              </CardTitle>
              <p className="text-sm text-text-secondary">
                {result.encodedText.length.toLocaleString()} bits
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar código binario
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[120px]">
            <pre className="font-mono text-sm text-accent whitespace-pre-wrap break-all">
              {formattedEncoded}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Decoded Text */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-foreground">
              Texto decodificado
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDecoded(!showDecoded)}
            >
              {showDecoded ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showDecoded ? (
            <ScrollArea className="h-[120px]">
              <pre className="font-mono text-sm text-text-secondary whitespace-pre-wrap break-all">
                {decodedText}
              </pre>
            </ScrollArea>
          ) : (
            <p className="text-sm text-text-muted italic">
              Hacé clic en {"\"Mostrar\""} para ver el texto decodificado
            </p>
          )}
        </CardContent>
      </Card>

      {/* Validation */}
      <Card className={`border ${isValid ? 'border-accent/50 bg-accent/5' : 'border-error/50 bg-error/5'}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isValid ? 'bg-accent/10' : 'bg-error/10'}`}>
              <CheckCircle2 className={`h-5 w-5 ${isValid ? 'text-accent' : 'text-error'}`} />
            </div>
            <div>
              <p className={`font-medium ${isValid ? 'text-accent' : 'text-error'}`}>
                {isValid ? 'Validación exitosa' : 'Error en la validación'}
              </p>
              <p className="text-sm text-text-secondary">
                {isValid 
                  ? 'El texto fue decodificado correctamente. No hubo pérdida de información.'
                  : 'El texto decodificado no coincide con el original.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
