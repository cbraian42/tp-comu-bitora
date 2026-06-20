import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { HowItWorksSection } from '@/components/home/how-it-works-section'
import { EducationalSection } from '@/components/home/educational-section'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, Binary, GitBranch, Scale } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <EducationalSection />

        {/* CTA Section */}
        <section className="py-24 bg-background-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-card to-card-elevated border-primary/30 overflow-hidden relative">
                {/* Binary Pattern Background */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 font-mono text-xs text-primary">
                    01001000 01110101 01100110<br/>
                    01100110 01101101 01100001<br/>
                    01101110 00100000 01000011
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-xs text-accent">
                    10110101 10100110 01100110<br/>
                    11101101 01100001 10101110<br/>
                    00100000 11001000 10110101
                  </div>
                </div>

                <CardContent className="p-8 md:p-12 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                        Empezá a experimentar con compresión de datos
                      </h2>
                      <p className="text-text-secondary leading-relaxed mb-6">
                        Cargá cualquier texto, visualizá cómo se construyen los códigos y comprendé en profundidad los algoritmos de Huffman y Shannon-Fano.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link to="/laboratorio">
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2">
                            Abrir laboratorio
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to="/teoria">
                          <Button variant="outline" className="border-border hover:bg-card">
                            Leer la teoría
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-background/50 rounded-xl border border-border">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                          <Binary className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-mono text-2xl font-bold text-foreground">2</p>
                        <p className="text-sm text-text-secondary">Algoritmos disponibles</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-xl border border-border">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                          <GitBranch className="h-5 w-5 text-accent" />
                        </div>
                        <p className="font-mono text-2xl font-bold text-foreground">∞</p>
                        <p className="text-sm text-text-secondary">Textos para analizar</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-xl border border-border">
                        <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center mb-3">
                          <Scale className="h-5 w-5 text-accent-orange" />
                        </div>
                        <p className="font-mono text-2xl font-bold text-foreground">100%</p>
                        <p className="text-sm text-text-secondary">Sin pérdida de datos</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-xl border border-border">
                        <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-3">
                          <Binary className="h-5 w-5 text-accent-purple" />
                        </div>
                        <p className="font-mono text-2xl font-bold text-foreground">Live</p>
                        <p className="text-sm text-text-secondary">Visualizaciones en vivo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
