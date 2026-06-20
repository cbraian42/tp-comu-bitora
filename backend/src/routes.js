// ============================================================
// Rutas REST de la API de Bitora
// ============================================================
const express = require('express')
const {
  calculateFrequencies,
  huffmanCompress,
  shannonFanoCompress,
  decodeText,
} = require('./compression')

const router = express.Router()

// Limite de tamano del texto para evitar abusos (caracteres)
const MAX_TEXT_LENGTH = 100_000

function validateText(text, res) {
  if (typeof text !== 'string' || text.trim().length === 0) {
    res.status(400).json({ error: 'El campo "text" es requerido y debe ser un string no vacio.' })
    return false
  }
  if (text.length > MAX_TEXT_LENGTH) {
    res.status(413).json({ error: `El texto supera el maximo de ${MAX_TEXT_LENGTH} caracteres.` })
    return false
  }
  return true
}

// Health check (Render lo usa para verificar que el servicio esta vivo)
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'bitora-backend', timestamp: new Date().toISOString() })
})

// Comprime con un algoritmo y devuelve resultado + decodificacion validada
router.post('/compress', (req, res) => {
  const { text, algorithm = 'huffman' } = req.body || {}
  if (!validateText(text, res)) return

  if (algorithm !== 'huffman' && algorithm !== 'shannon-fano') {
    return res.status(400).json({ error: 'algorithm debe ser "huffman" o "shannon-fano".' })
  }

  const result = algorithm === 'huffman' ? huffmanCompress(text) : shannonFanoCompress(text)
  const decodedText = decodeText(result.encodedText, result.codeTable)

  res.json({
    ...result,
    frequencies: calculateFrequencies(text),
    decodedText,
    isValid: decodedText === text,
  })
})

// Compara ambos algoritmos sobre el mismo texto
router.post('/compare', (req, res) => {
  const { text } = req.body || {}
  if (!validateText(text, res)) return

  const huffman = huffmanCompress(text)
  const shannonFano = shannonFanoCompress(text)

  const huffmanDecoded = decodeText(huffman.encodedText, huffman.codeTable)
  const shannonDecoded = decodeText(shannonFano.encodedText, shannonFano.codeTable)

  const best =
    huffman.compressedSize <= shannonFano.compressedSize ? 'huffman' : 'shannon-fano'

  res.json({
    frequencies: calculateFrequencies(text),
    huffman: { ...huffman, decodedText: huffmanDecoded, isValid: huffmanDecoded === text },
    shannonFano: { ...shannonFano, decodedText: shannonDecoded, isValid: shannonDecoded === text },
    best,
    difference: Math.abs(huffman.compressedSize - shannonFano.compressedSize),
  })
})

// Decodifica un texto binario dada una tabla de codigos
router.post('/decompress', (req, res) => {
  const { encodedText, codeTable } = req.body || {}

  if (typeof encodedText !== 'string' || !Array.isArray(codeTable)) {
    return res.status(400).json({
      error: 'Se requiere "encodedText" (string) y "codeTable" (array).',
    })
  }

  const decodedText = decodeText(encodedText, codeTable)
  res.json({ decodedText })
})

module.exports = router
