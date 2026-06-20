// ============================================================
// Servidor Express de Bitora
// ============================================================
const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes')

const app = express()
const PORT = process.env.PORT || 4000

// CORS: en produccion limitamos al dominio del frontend (Vercel).
// Configurable via la variable de entorno FRONTEND_URL.
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((o) => o.trim().replace(/\/$/, ''))
  : '*'

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origin (como curl o Postman)
      if (!origin || allowedOrigins === '*') {
        return callback(null, true)
      }
      
      const cleanOrigin = origin.replace(/\/$/, '')
      
      // 1. Permitir coincidencia exacta con lo configurado en FRONTEND_URL
      if (allowedOrigins.includes(cleanOrigin)) {
        return callback(null, true)
      }
      
      // 2. Permitir de forma dinamica cualquier despliegue (produccion o preview/rama) en Vercel de este proyecto
      const isVercelDeploy = cleanOrigin.startsWith('https://tp-comu-bitora') && cleanOrigin.endsWith('.vercel.app')
      
      if (isVercelDeploy) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Permite cuerpos JSON grandes (textos largos)
app.use(express.json({ limit: '2mb' }))

// Rutas de la API bajo /api
app.use('/api', apiRouter)

// Ruta raiz informativa
app.get('/', (_req, res) => {
  res.json({
    name: 'Bitora API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/compress', '/api/compare', '/api/decompress'],
  })
})

// Manejo de rutas no encontradas
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' })
})

app.listen(PORT, () => {
  console.log(`[bitora-backend] escuchando en el puerto ${PORT}`)
})
