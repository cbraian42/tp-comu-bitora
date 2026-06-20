import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Binary, Code2, RefreshCcw, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: BarChart3,
    title: 'Frecuencias',
    description: 'Detectá cuántas veces aparece cada símbolo en el texto.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
  },
  {
    icon: Code2,
    title: 'Codificación',
    description: 'Generá códigos binarios según el algoritmo elegido.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/30',
  },
  {
    icon: Zap,
    title: 'Compresión',
    description: 'Compará el tamaño original con el tamaño comprimido.',
    color: 'text-accent-orange',
    bgColor: 'bg-accent-orange/10',
    borderColor: 'border-accent-orange/30',
  },
  {
    icon: RefreshCcw,
    title: 'Decodificación',
    description: 'Reconstruí el mensaje original y verificá que no se pierda información.',
    color: 'text-accent-purple',
    bgColor: 'bg-accent-purple/10',
    borderColor: 'border-accent-purple/30',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function HeroSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 binary-pattern opacity-30" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-text-secondary">
              <Binary className="h-4 w-4 text-primary" />
              Laboratorio de compresión de datos
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance mb-4"
          >
            Comprimí datos y entendé cómo se forman los{' '}
            <span className="text-primary">códigos binarios</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-6"
          >
            Bitora permite analizar textos, calcular frecuencias, generar códigos Huffman y Shannon-Fano, y comparar cuál comprime mejor en cada caso.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/laboratorio">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 gap-2">
                Iniciar laboratorio
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/comparacion">
              <Button size="lg" variant="outline" className="border-border hover:bg-card font-medium px-8">
                Ver comparación
              </Button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className={`bg-card border ${feature.borderColor} hover:bg-card-elevated transition-colors h-full`}>
                  <CardContent className="p-6 text-left">
                    <div className={`inline-flex p-2.5 rounded-lg ${feature.bgColor} mb-4`}>
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Binary Decoration */}
        <div className="hidden lg:block absolute bottom-20 left-10 font-mono text-text-muted/20 text-sm">
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            01001000 01110101<br />
            01100110 01100110<br />
            01101101 01100001<br />
            01101110 00100000
          </motion.div>
        </div>

        <div className="hidden lg:block absolute bottom-20 right-10 font-mono text-text-muted/20 text-sm text-right">
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            11001000 10110101<br />
            10100110 01100110<br />
            11101101 01100001<br />
            10101110 00100000
          </motion.div>
        </div>
      </div>
    </section>
  )
}
