import { motion } from 'framer-motion'
import { ArrowRight, FileText, GitBranch, Share2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Ingresá tu texto',
    description: 'Escribí o cargá un archivo .txt con el contenido que querés analizar.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    number: '02',
    icon: Share2,
    title: 'Analizá frecuencias',
    description: 'El sistema detecta cada símbolo y cuenta cuántas veces aparece.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    number: '03',
    icon: GitBranch,
    title: 'Generá códigos',
    description: 'Elegí entre Huffman, Shannon-Fano o compará ambos algoritmos.',
    color: 'text-accent-orange',
    bgColor: 'bg-accent-orange/10',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Cómo funciona
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Un proceso simple para entender la compresión de datos paso a paso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary via-accent to-accent-orange opacity-30" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card border border-border rounded-xl p-6 h-full">
                {/* Step Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${step.bgColor} mb-4 relative z-10`}>
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>

                {/* Number Badge */}
                <span className="absolute top-4 right-4 font-mono text-4xl font-bold text-border">
                  {step.number}
                </span>

                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="flex md:hidden justify-center my-4">
                  <ArrowRight className="h-6 w-6 text-border rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
