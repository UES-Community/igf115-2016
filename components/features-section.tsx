'use client'

import { motion } from 'framer-motion'
import { Code2, Play, BookOpen, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: Code2,
    title: 'Editor de Código Monaco',
    description:
      'El mismo motor que potencia VS Code. Escribe, ejecuta y experimenta con algoritmos directamente en el navegador con resaltado de sintaxis completo.',
    color: 'var(--igf-cyan)',
    colorDim: 'var(--igf-cyan-dim)',
    href: '/editor',
    cta: 'Abrir editor',
  },
  {
    icon: Play,
    title: 'Visualizaciones Animadas',
    description:
      'Observa paso a paso cómo funcionan pilas, colas, árboles y grafos. Animaciones precisas con framer-motion para entender la lógica interna.',
    color: 'var(--igf-green)',
    colorDim: 'oklch(0.25 0.07 145)',
    href: '/visualizaciones',
    cta: 'Ver demos',
  },
  {
    icon: BarChart3,
    title: 'Análisis de Complejidad',
    description:
      'Comprende la notación Big-O con gráficas comparativas. Visualiza cómo O(1), O(log n), O(n), O(n²) se comportan con diferentes tamaños de entrada.',
    color: 'var(--igf-amber)',
    colorDim: 'oklch(0.27 0.07 70)',
    href: '/unidades/complejidad',
    cta: 'Aprender Big-O',
  },
  {
    icon: BookOpen,
    title: 'Contenido Estructurado',
    description:
      'Seis unidades progresivas desde fundamentos hasta optimización. Cada tema incluye teoría, pseudocódigo, implementación y casos de uso reales.',
    color: 'oklch(0.70 0.14 280)',
    colorDim: 'oklch(0.22 0.07 280)',
    href: '/unidades/fundamentos',
    cta: 'Ver programa',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function FeaturesSection() {
  return (
    <section
      className="border-t border-[var(--igf-border)] py-16 md:py-24"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs text-[var(--igf-muted)] uppercase tracking-widest mb-2">
            Herramientas incluidas
          </p>
          <h2
            id="features-heading"
            className="font-display text-3xl font-700 text-[var(--igf-ink)] tracking-tight md:text-4xl"
          >
            Todo lo que necesitas para aprender
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                variants={itemVariants}
                className="group relative flex flex-col rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-6 transition-colors hover:bg-[var(--igf-surface-alt)]"
              >
                {/* Subtle top accent bar */}
                <div
                  className="absolute inset-x-0 top-0 h-px rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)` }}
                />

                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ background: feat.colorDim, color: feat.color }}
                >
                  <Icon size={20} />
                </div>

                <h3 className="font-display text-lg font-600 text-[var(--igf-ink)] tracking-tight">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--igf-muted)] flex-1">
                  {feat.description}
                </p>

                <Link
                  href={feat.href}
                  className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-600 transition-colors"
                  style={{
                    borderColor: feat.color,
                    color: feat.color,
                  }}
                >
                  {feat.cta}
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
