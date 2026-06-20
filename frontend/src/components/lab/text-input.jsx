import { useCallback } from 'react'
import { Upload, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function TextInput({ value, onChange, onClear }) {
  const handleFileUpload = useCallback(
    (file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result
        onChange(content)
      }
      reader.readAsText(file)
    },
    [onChange]
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file && file.type === 'text/plain') {
        handleFileUpload(file)
      }
    },
    [handleFileUpload]
  )

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <div className="space-y-4">
      {/* Text Area */}
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribí o pegá el texto que querés analizar..."
          className="min-h-[200px] bg-card border-border text-foreground placeholder:text-text-muted font-mono text-sm resize-none"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="absolute top-2 right-2 h-8 w-8 text-text-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* File Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
      >
        <input
          type="file"
          accept=".txt,text/plain"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-foreground font-medium">
              Arrastrá un archivo .txt o hacé clic para seleccionar
            </p>
            <p className="text-sm text-text-muted mt-1">Soporta archivos de texto plano</p>
          </div>
        </div>
      </div>

      {/* Character count */}
      {value && (
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{value.length.toLocaleString()} caracteres</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{new Set(value).size} símbolos únicos</span>
          </div>
        </div>
      )}
    </div>
  )
}
