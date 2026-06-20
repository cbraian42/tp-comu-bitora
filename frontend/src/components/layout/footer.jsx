import { Link } from 'react-router-dom'
import { Binary, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <Binary className="h-5 w-5 text-primary" />
                <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">Bitora</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              Herramienta educativa para analizar textos, calcular frecuencias y generar códigos de
              compresión usando Huffman y Shannon-Fano.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Navegación</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/laboratorio', label: 'Laboratorio' },
                { href: '/comparacion', label: 'Comparación' },
                { href: '/teoria', label: 'Teoría' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/teoria#huffman" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Algoritmo Huffman
                </Link>
              </li>
              <li>
                <Link to="/teoria#shannon-fano" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Algoritmo Shannon-Fano
                </Link>
              </li>
              <li>
                <Link to="/teoria#compresion" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Compresión sin pérdida
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © 2026 Bitora. Herramienta educativa de compresión de datos.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
