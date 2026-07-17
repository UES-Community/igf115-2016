import Link from 'next/link'
import { BookOpen, Code2, GitBranch } from 'lucide-react'

const LINKS = {
  unidades: [
    { label: 'Fundamentos de Programación', href: '/unidades/fundamentos' },
    { label: 'Estructuras Lineales', href: '/unidades/lineales' },
    { label: 'Estructuras No Lineales', href: '/unidades/no-lineales' },
    { label: 'Grafos', href: '/unidades/grafos' },
    { label: 'Ordenamiento', href: '/unidades/ordenamiento' },
    { label: 'Complejidad', href: '/unidades/complejidad' },
  ],
  herramientas: [
    { label: 'Editor de Código', href: '/editor' },
    { label: 'Visualizaciones', href: '/visualizaciones' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--igf-border)] bg-[var(--igf-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--igf-cyan)] text-[var(--igf-bg)]">
                <BookOpen size={16} strokeWidth={2.5} />
              </div>
              <div>
                <span className="block font-display text-sm font-700 text-[var(--igf-ink)] tracking-tight">
                  IGF115-2016
                </span>
                <span className="block font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-widest">
                  Ing. del Software
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[var(--igf-muted)] max-w-xs">
              Plataforma educativa para la materia Ingeniería del Software. Estructuras de datos,
              algoritmos y programación con visualizaciones interactivas.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-[var(--igf-border)] px-3 py-1.5">
                <Code2 size={12} className="text-[var(--igf-cyan)]" />
                <span className="font-mono text-[10px] text-[var(--igf-muted)]">Monaco Editor</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[var(--igf-border)] px-3 py-1.5">
                <GitBranch size={12} className="text-[var(--igf-green)]" />
                <span className="font-mono text-[10px] text-[var(--igf-muted)]">Framer Motion</span>
              </div>
            </div>
          </div>

          {/* Unidades */}
          <div>
            <h3 className="font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-widest mb-4">
              Unidades
            </h3>
            <ul className="flex flex-col gap-2.5">
              {LINKS.unidades.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--igf-muted)] hover:text-[var(--igf-ink)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Herramientas */}
          <div>
            <h3 className="font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-widest mb-4">
              Herramientas
            </h3>
            <ul className="flex flex-col gap-2.5">
              {LINKS.herramientas.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--igf-muted)] hover:text-[var(--igf-ink)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--igf-border)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-[var(--igf-muted)]">
            &copy; {new Date().getFullYear()} IGF115-2016 — Ingeniería del Software
          </p>
          <p className="font-mono text-xs text-[var(--igf-muted)]">
            Next.js 16 &middot; Tailwind v4 &middot; Monaco &middot; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
