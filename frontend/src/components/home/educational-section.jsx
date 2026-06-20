import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Binary, GitBranch, Gauge, Lock } from 'lucide-react'

const concepts = [
  {
    icon: Lock,
    title: 'Compresión sin pérdida',
    description: 'Reduce el tamaño del mensaje sin eliminar información. El texto original puede recuperarse exactamente.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: GitBranch,
    title: 'Huffman',
    description: 'Construye un árbol donde los símbolos más frecuentes quedan más cerca de la raíz y reciben códigos más cortos.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Binary,
    title: 'Shannon-Fano',
    description: 'Ordena los símbolos por frecuencia y los divide en grupos para asignar códigos binarios.',
    color: 'text-accent-orange',
    bgColor: 'bg-accent-orange/10',
  },
  {
    icon: Gauge,
    title: 'Longitud promedio',
    description: 'Indica cuántos bits se usan, en promedio, para representar cada símbolo del mensaje.',
    color: 'text-accent-purple',
    bgColor: 'bg-accent-purple/10',
  },
]

export function EducationalSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Conceptos clave
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Entendé los fundamentos detrás de la compresión de datos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${concept.bgColor} flex items-center justify-center`}>
                      <concept.icon className={`h-6 w-6 ${concept.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-2">
                        {concept.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {concept.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
