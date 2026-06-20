// Helpers de presentacion (puros, lado cliente)

export function formatBytes(bits) {
  const bytes = bits / 8
  if (bytes < 1024) return `${bytes.toFixed(1)} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function getSymbolDisplay(symbol) {
  if (symbol === ' ') return '␣'
  if (symbol === '\n') return '↵'
  if (symbol === '\t') return '→'
  if (symbol === '\r') return '⏎'
  return symbol
}

// Decodifica un texto binario dada una tabla de codigos
export function decodeText(encodedText, codeTable) {
  const reverseCodes = new Map()
  for (const entry of codeTable) {
    reverseCodes.set(entry.code, entry.symbol)
  }

  let decoded = ''
  let currentCode = ''

  for (const bit of encodedText) {
    currentCode += bit
    if (reverseCodes.has(currentCode)) {
      decoded += reverseCodes.get(currentCode)
      currentCode = ''
    }
  }

  return decoded
}
