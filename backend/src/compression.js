// ============================================================
// Algoritmos de compresion: Huffman y Shannon-Fano
// Logica pura, sin dependencias de framework.
// ============================================================

// Calcula la frecuencia de cada simbolo en el texto
function calculateFrequencies(text) {
  const frequencyMap = new Map()

  for (const char of text) {
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1)
  }

  const total = text.length
  const frequencies = []

  frequencyMap.forEach((count, symbol) => {
    frequencies.push({
      symbol,
      frequency: count,
      probability: count / total,
    })
  })

  // Orden descendente por frecuencia
  return frequencies.sort((a, b) => b.frequency - a.frequency)
}

// Entropia (minimo teorico de bits por simbolo)
function calculateEntropy(frequencies) {
  let entropy = 0
  for (const { probability } of frequencies) {
    if (probability > 0) {
      entropy -= probability * Math.log2(probability)
    }
  }
  return entropy
}

// ---------------------- Huffman ----------------------

function buildHuffmanTree(frequencies) {
  if (frequencies.length === 0) return null

  const nodes = frequencies.map((f) => ({
    symbol: f.symbol,
    frequency: f.frequency,
    left: null,
    right: null,
  }))

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency)

    const left = nodes.shift()
    const right = nodes.shift()

    nodes.push({
      symbol: null,
      frequency: left.frequency + right.frequency,
      left,
      right,
    })
  }

  return nodes[0] || null
}

function generateHuffmanCodes(node, code = '', codes = new Map()) {
  if (!node) return codes

  if (node.symbol !== null) {
    // Caso de un solo simbolo
    codes.set(node.symbol, code || '0')
  } else {
    generateHuffmanCodes(node.left, code + '0', codes)
    generateHuffmanCodes(node.right, code + '1', codes)
  }

  return codes
}

function huffmanCompress(text) {
  const frequencies = calculateFrequencies(text)
  const tree = buildHuffmanTree(frequencies)
  const codes = generateHuffmanCodes(tree)
  const entropy = calculateEntropy(frequencies)

  const codeTable = frequencies.map((f) => ({
    ...f,
    code: codes.get(f.symbol) || '',
    codeLength: (codes.get(f.symbol) || '').length,
  }))

  let encodedText = ''
  for (const char of text) {
    encodedText += codes.get(char) || ''
  }

  const originalSize = text.length * 8
  const compressedSize = encodedText.length

  let avgCodeLength = 0
  for (const entry of codeTable) {
    avgCodeLength += entry.probability * entry.codeLength
  }

  const efficiency = avgCodeLength > 0 ? (entropy / avgCodeLength) * 100 : 0

  return {
    algorithm: 'huffman',
    originalSize,
    compressedSize,
    reductionPercent: originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0,
    averageCodeLength: avgCodeLength,
    efficiency,
    entropy,
    codeTable,
    encodedText,
    tree: tree || undefined,
  }
}

// ---------------------- Shannon-Fano ----------------------

function shannonFanoRecursive(symbols, codes, currentCode = '', partitions = [], level = 0) {
  if (symbols.length === 0) return partitions

  if (symbols.length === 1) {
    codes.set(symbols[0].symbol, currentCode || '0')
    partitions.push({ symbols, code: currentCode || '0', level })
    return partitions
  }

  const totalFreq = symbols.reduce((sum, s) => sum + s.frequency, 0)
  let runningSum = 0
  let splitIndex = 0
  let minDiff = Infinity

  for (let i = 0; i < symbols.length - 1; i++) {
    runningSum += symbols[i].frequency
    const diff = Math.abs(2 * runningSum - totalFreq)
    if (diff < minDiff) {
      minDiff = diff
      splitIndex = i + 1
    }
  }

  const leftGroup = symbols.slice(0, splitIndex)
  const rightGroup = symbols.slice(splitIndex)

  partitions.push({ symbols: leftGroup, code: currentCode + '0', level })
  partitions.push({ symbols: rightGroup, code: currentCode + '1', level })

  shannonFanoRecursive(leftGroup, codes, currentCode + '0', partitions, level + 1)
  shannonFanoRecursive(rightGroup, codes, currentCode + '1', partitions, level + 1)

  return partitions
}

function shannonFanoCompress(text) {
  const frequencies = calculateFrequencies(text)
  const codes = new Map()
  const partitions = shannonFanoRecursive(frequencies, codes)
  const entropy = calculateEntropy(frequencies)

  const codeTable = frequencies.map((f) => ({
    ...f,
    code: codes.get(f.symbol) || '',
    codeLength: (codes.get(f.symbol) || '').length,
  }))

  let encodedText = ''
  for (const char of text) {
    encodedText += codes.get(char) || ''
  }

  const originalSize = text.length * 8
  const compressedSize = encodedText.length

  let avgCodeLength = 0
  for (const entry of codeTable) {
    avgCodeLength += entry.probability * entry.codeLength
  }

  const efficiency = avgCodeLength > 0 ? (entropy / avgCodeLength) * 100 : 0

  return {
    algorithm: 'shannon-fano',
    originalSize,
    compressedSize,
    reductionPercent: originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0,
    averageCodeLength: avgCodeLength,
    efficiency,
    entropy,
    codeTable,
    encodedText,
    partitions,
  }
}

// ---------------------- Decodificacion ----------------------

function decodeText(encodedText, codeTable) {
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

module.exports = {
  calculateFrequencies,
  calculateEntropy,
  buildHuffmanTree,
  huffmanCompress,
  shannonFanoCompress,
  decodeText,
}
