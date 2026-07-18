'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Code2 } from 'lucide-react'

const CODE_SNIPPET = `// Ciclo de vida del software (Cascada)
const phases = ["Requisitos", "Diseño", "Codificación", "Pruebas", "Despliegue"];

function getNextPhase(currentPhase: string): string {
  const index = phases.indexOf(currentPhase);
  if (index !== -1 && index < phases.length - 1) {
    return phases[index + 1];
  }
  return "Mantenimiento";
}`

const TOKEN_COLORS: Record<string, string> = {
  keyword: '#7dd3fc',
  fn: '#a5f3fc',
  type: '#86efac',
  string: '#fde68a',
  number: '#fda4af',
  comment: '#6b7280',
  punct: '#94a3b8',
  default: '#e2e8f0',
}

// Minimal tokenizer for display
function tokenize(code: string) {
  const lines = code.split('\n')
  return lines.map((line) => {
    const parts: { text: string; color: string }[] = []
    let rest = line

    // Comment
    const commentIdx = rest.indexOf('//')
    if (commentIdx !== -1) {
      parts.push({ text: rest.slice(0, commentIdx), color: TOKEN_COLORS.default })
      parts.push({ text: rest.slice(commentIdx), color: TOKEN_COLORS.comment })
      return parts
    }

    // Simple highlight pass
    const tokenRegex = /(\b(function|return|while|if|else|let|const|var|of|in|new|typeof)\b|:\s*(number|string|boolean|void|number\[\]|string\[\])|(['"`][^'"`]*['"`])|\b\d+\b|[{}[\]();,.<=>!+\-*/&|?:]+)/g

    let lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = tokenRegex.exec(rest)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: rest.slice(lastIndex, match.index), color: TOKEN_COLORS.default })
      }
      const text = match[0]
      let color = TOKEN_COLORS.default
      if (/^(function|return|while|if|else|let|const|var|of|in|new|typeof)$/.test(text)) color = TOKEN_COLORS.keyword
      else if (/^:\s*(number|string|boolean|void|number\[\]|string\[\])/.test(text)) color = TOKEN_COLORS.type
      else if (/^['"`]/.test(text)) color = TOKEN_COLORS.string
      else if (/^\d+$/.test(text)) color = TOKEN_COLORS.number
      else if (/^[{}[\]();,.<=>!+\-*/&|?:]+$/.test(text)) color = TOKEN_COLORS.punct
      parts.push({ text, color })
      lastIndex = match.index + text.length
    }
    if (lastIndex < rest.length) {
      parts.push({ text: rest.slice(lastIndex), color: TOKEN_COLORS.default })
    }
    return parts
  })
}

const STATS = [
  { value: '4', label: 'Unidades temáticas' },
  { value: 'ISO 25010', label: 'Estándar de calidad' },
  { value: 'Tomcat', label: 'Servidor de aplicaciones' },
]

export default function HeroSection() {
  const lines = tokenize(CODE_SNIPPET)

  return (
    <section className="relative overflow-hidden border-b border-[var(--igf-border)]">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--igf-border) 1px, transparent 1px), linear-gradient(90deg, var(--igf-border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.35,
        }}
      />
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-3xl"
        style={{ background: 'oklch(0.78 0.14 200 / 0.12)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--igf-border)] bg-[var(--igf-surface)] px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-[var(--igf-cyan)] animate-pulse" />
              <span className="font-mono text-xs text-[var(--igf-muted)] tracking-widest uppercase">
                IGF115-2016 · Ciclo 2016
              </span>
            </div>

            <h1 className="font-display text-4xl font-700 leading-[1.1] tracking-tight text-[var(--igf-ink)] md:text-5xl lg:text-6xl text-balance">
              Ingeniería del{' '}
              <span
                className="relative"
                style={{
                  background: 'linear-gradient(90deg, var(--igf-cyan), var(--igf-green))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Software
              </span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[var(--igf-muted)] max-w-lg">
              Domina los fundamentos de la ingeniería del software, patrones de diseño, desarrollo web en Java y configuración de servidores con guías de estudio interactivas y autoevaluaciones.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-700 text-[var(--igf-ink)]">{s.value}</p>
                  <p className="font-mono text-xs text-[var(--igf-muted)]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/unidades/el-software"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--igf-cyan)] px-5 py-2.5 text-sm font-600 text-[var(--igf-bg)] transition-opacity hover:opacity-90"
              >
                Comenzar <ArrowRight size={15} />
              </Link>
              <Link
                href="/visualizaciones"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--igf-border)] px-5 py-2.5 text-sm font-600 text-[var(--igf-ink)] transition-colors hover:bg-[var(--igf-surface)]"
              >
                <Play size={13} fill="currentColor" /> Ver visualizaciones
              </Link>
            </div>
          </motion.div>

          {/* Code panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-[var(--igf-border)] px-4 py-3">
                <span className="h-3 w-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#ffbd2e' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#28c840' }} />
                <span className="ml-3 font-mono text-xs text-[var(--igf-muted)]">lifecycle.ts</span>
                <div className="ml-auto flex items-center gap-1.5 text-[var(--igf-muted)]">
                  <Code2 size={12} />
                  <span className="font-mono text-xs">TypeScript</span>
                </div>
              </div>
              {/* Code body */}
              <pre className="overflow-x-auto px-5 py-5">
                <code className="font-mono text-sm leading-6">
                  {lines.map((line, li) => (
                    <div key={li} className="flex">
                      <span className="mr-5 w-6 shrink-0 select-none text-right font-mono text-xs text-[var(--igf-border)] leading-6">
                        {li + 1}
                      </span>
                      <span>
                        {line.map((tok, ti) => (
                          <span key={ti} style={{ color: tok.color }}>
                            {tok.text}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
              {/* Complexity badge */}
              <div className="border-t border-[var(--igf-border)] px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--igf-muted)]">Enfoque de desarrollo</span>
                <span className="rounded-full bg-[var(--igf-cyan-dim)] px-3 py-0.5 font-mono text-xs font-600 text-[var(--igf-cyan)]">
                  Ingeniería
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
