// URL del backend Express. En produccion se define VITE_API_URL (Render).
// En desarrollo cae al backend local en el puerto 4000.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function request(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    let message = `Error ${res.status}`
    try {
      const data = await res.json()
      if (data?.error) message = data.error
    } catch {
      // respuesta sin cuerpo JSON
    }
    throw new Error(message)
  }

  return res.json()
}

export const api = {
  // Comprime con un algoritmo concreto
  compress: (text, algorithm) =>
    request('/api/compress', { text, algorithm }),

  // Compara ambos algoritmos sobre el mismo texto
  compare: (text) => request('/api/compare', { text }),

  // Decodifica un texto binario dada una tabla de codigos
  decompress: (encodedText, codeTable) =>
    request('/api/decompress', { encodedText, codeTable }),

  // Verifica que el backend este disponible
  health: async () => {
    const res = await fetch(`${API_URL}/api/health`)
    return res.json()
  },
}
