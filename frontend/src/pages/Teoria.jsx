import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Binary, 
  GitBranch, 
  Lock, 
  Gauge, 
  TreeDeciduous,
  SplitSquareVertical,
  BarChart3,
  Lightbulb,
  BookOpen
} from 'lucide-react'

const concepts = [
  {
    id: 'compresion',
    icon: Lock,
    title: 'Compresión sin pérdida',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    content: [
      'La compresión sin pérdida es una técnica que reduce el tamaño de los datos sin eliminar información. El mensaje original puede recuperarse exactamente después de la descompresión.',
      'A diferencia de la compresión con pérdida (usada en MP3 o JPEG), aquí no se descarta ningún dato. Esto es importante para textos, código fuente o cualquier información que deba preservarse intacta.',
      'Los algoritmos de Huffman y Shannon-Fano son ejemplos clásicos de compresión sin pérdida basados en códigos de longitud variable.',
    ],
  },
  {
    id: 'huffman',
    icon: TreeDeciduous,
    title: 'Algoritmo de Huffman',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    content: [
      'El algoritmo de Huffman, desarrollado por David Huffman en 1952, construye un árbol binario óptimo para la codificación.',
      'El proceso funciona así: primero, ordena los símbolos por frecuencia. Luego, toma los dos símbolos menos frecuentes y los combina en un nodo padre. Repite hasta formar un árbol completo.',
      'Los símbolos más frecuentes quedan más cerca de la raíz, recibiendo códigos más cortos. Los menos frecuentes quedan más lejos, con códigos más largos.',
      'Es un algoritmo goloso (greedy) que garantiza encontrar una codificación óptima para una fuente de símbolos dada.',
    ],
    steps: [
      'Calcular la frecuencia de cada símbolo',
      'Crear nodos hoja para cada símbolo',
      'Combinar los dos nodos con menor frecuencia',
      'Repetir hasta tener un solo árbol',
      'Asignar 0 a ramas izquierdas, 1 a derechas',
      'Leer códigos desde la raíz hasta cada hoja',
    ],
  },
  {
    id: 'shannon-fano',
    icon: SplitSquareVertical,
    title: 'Algoritmo de Shannon-Fano',
    color: 'text-accent-orange',
    bgColor: 'bg-accent-orange/10',
    content: [
      'Shannon-Fano fue propuesto por Claude Shannon y Robert Fano como uno de los primeros métodos de codificación de longitud variable.',
      'El algoritmo ordena los símbolos por frecuencia y luego los divide recursivamente en dos grupos de peso similar. Cada división agrega un bit al código.',
      'Aunque no siempre produce la codificación óptima (Huffman lo hace), es más simple de entender y calcular manualmente.',
      'La diferencia con Huffman está en el enfoque: Shannon-Fano trabaja de arriba hacia abajo (divide), mientras que Huffman trabaja de abajo hacia arriba (combina).',
    ],
    steps: [
      'Ordenar símbolos por frecuencia descendente',
      'Dividir la lista en dos grupos de peso similar',
      'Asignar 0 al primer grupo, 1 al segundo',
      'Repetir recursivamente en cada grupo',
      'Continuar hasta que cada grupo tenga un símbolo',
    ],
  },
  {
    id: 'entropia',
    icon: Gauge,
    title: 'Entropía y eficiencia',
    color: 'text-accent-purple',
    bgColor: 'bg-accent-purple/10',
    content: [
      'La entropía, definida por Claude Shannon, mide la cantidad mínima de bits necesarios para representar un símbolo en promedio.',
      'Se calcula como: H = -Σ p(x) × log₂(p(x)), donde p(x) es la probabilidad de cada símbolo.',
      'La longitud promedio del código nunca puede ser menor que la entropía. Cuando se acerca a la entropía, el código es más eficiente.',
      'La eficiencia se mide como el cociente entre la entropía y la longitud promedio real del código. Un 100% significa codificación perfecta.',
    ],
  },
  {
    id: 'frecuencias',
    icon: BarChart3,
    title: 'Análisis de frecuencias',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    content: [
      'El primer paso de ambos algoritmos es calcular cuántas veces aparece cada símbolo en el texto.',
      'La probabilidad de un símbolo se obtiene dividiendo su frecuencia por el total de caracteres.',
      'Los símbolos más frecuentes (como la letra \'e\' en español o el espacio) son los candidatos ideales para códigos cortos.',
      'Este análisis estadístico es la base de la compresión: aprovechamos que algunos símbolos aparecen más que otros.',
    ],
  },
]

const keyTerms = [
  {
    term: 'Código prefijo',
    definition: 'Un código donde ninguna palabra código es prefijo de otra. Permite decodificación instantánea sin ambigüedad.',
  },
  {
    term: 'Longitud promedio',
    definition: 'El número esperado de bits por símbolo, ponderado por las probabilidades de cada símbolo.',
  },
  {
    term: 'Tasa de compresión',
    definition: 'La relación entre el tamaño original y el comprimido. Se expresa como porcentaje de reducción.',
  },
  {
    term: 'Árbol binario',
    definition: 'Estructura de datos donde cada nodo tiene como máximo dos hijos. Se usa para representar los códigos.',
  },
  {
    term: 'Código de longitud variable',
    definition: 'Sistema donde diferentes símbolos pueden tener códigos de diferente longitud, a diferencia de ASCII que usa 8 bits fijos.',
  },
]

export default function Teoria() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <Badge variant="outline" className="border-border text-text-secondary">
              Material educativo
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Fundamentos de compresión de datos
          </h1>
          <p className="text-text-secondary max-w-2xl text-lg leading-relaxed">
            Conceptos teóricos detrás de los algoritmos de Huffman y Shannon-Fano, explicados de forma clara y práctica.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {concepts.map((concept) => (
            <Card key={concept.id} id={concept.id} className="bg-card border-border scroll-mt-20">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${concept.bgColor}`}>
                    <concept.icon className={`h-6 w-6 ${concept.color}`} />
                  </div>
                  <div>
                    <CardTitle className="font-display text-2xl text-foreground">
                      {concept.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {concept.content.map((paragraph, index) => (
                    <p key={index} className="text-text-secondary leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {concept.steps && (
                  <div className="bg-background rounded-lg p-6">
                    <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-warning" />
                      Pasos del algoritmo
                    </h4>
                    <ol className="space-y-2">
                      {concept.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-text-secondary">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Key Terms */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10">
                  <Binary className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-display text-2xl text-foreground">
                  Glosario de términos
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyTerms.map((item, index) => (
                  <div key={index} className="p-4 bg-background rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">{item.term}</h4>
                    <p className="text-sm text-text-secondary">{item.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Example Section */}
          <Card className="bg-card-elevated border-primary/30">
            <CardHeader>
              <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                Ejemplo práctico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-text-secondary">
                Supongamos que queremos codificar el texto {'"ABRACADABRA"'} usando Huffman:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-foreground mb-3">1. Frecuencias</h4>
                  <div className="font-mono text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-primary">A:</span>
                      <span className="text-text-secondary">5 (45%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent">B:</span>
                      <span className="text-text-secondary">2 (18%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-orange">R:</span>
                      <span className="text-text-secondary">2 (18%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-purple">C:</span>
                      <span className="text-text-secondary">1 (9%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warning">D:</span>
                      <span className="text-text-secondary">1 (9%)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-foreground mb-3">2. Códigos Huffman</h4>
                  <div className="font-mono text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-primary">A:</span>
                      <span className="text-accent">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent">B:</span>
                      <span className="text-accent">10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-orange">R:</span>
                      <span className="text-accent">110</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-purple">C:</span>
                      <span className="text-accent">1110</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warning">D:</span>
                      <span className="text-accent">1111</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-foreground mb-3">3. Resultado</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-text-secondary">Original (ASCII):</span>
                      <p className="font-mono text-foreground">88 bits</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Comprimido:</span>
                      <p className="font-mono text-foreground">23 bits</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Reducción:</span>
                      <p className="font-mono text-accent">73.9%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
