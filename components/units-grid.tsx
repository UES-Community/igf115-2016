'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code2, Layers, GitBranch, Binary, Zap, Network } from 'lucide-react'

const UNITS = [
  {
    id: 'unidad-1',
    label: 'Unidad I',
    title: 'Fundamentos de Programación',
    icon: Code2,
    href: '/unidades/fundamentos',
    color: 'var(--igf-cyan)',
    colorDim: 'var(--igf-cyan-dim)',
    topics: ['Variables y tipos de datos', 'Estructuras de control', 'Funciones y parámetros', 'Recursividad'],
    complexity: 'O(1) — O(n)',
  },
  {
    id: 'unidad-2',
    label: 'Unidad II',
    title: 'Estructuras Lineales',
    icon: Layers,
    href: '/unidades/lineales',
    color: 'var(--igf-green)',
    colorDim: 'oklch(0.25 0.07 145)',
    topics: ['Arreglos y matrices', 'Pilas (Stack)', 'Colas (Queue)', 'Listas enlazadas'],
    complexity: 'O(1) — O(n)',
  },
  {
    id: 'unidad-3',
    label: 'Unidad III',
    title: 'Estructuras No Lineales',
    icon: GitBranch,
    href: '/unidades/no-lineales',
    color: 'var(--igf-amber)',
    colorDim: 'oklch(0.27 0.07 70)',
    topics: ['Árboles binarios de búsqueda', 'Árboles AVL', 'Montículos (Heap)', 'Tries / Prefijos'],
    complexity: 'O(log n)',
  },
  {
    id: 'unidad-4',
    label: 'Unidad IV',
    title: 'Grafos',
    icon: Network,
    href: '/unidades/grafos',
    color: 'oklch(0.70 0.14 280)',
    colorDim: 'oklch(0.22 0.07 280)',
    topics: ['Representación (lista/matriz)', 'BFS y DFS', 'Dijkstra / Bellman-Ford', 'Árbol de expansión mínima'],
    complexity: 'O(V + E)',
  },
  {
    id: 'unidad-5',
    label: 'Unidad V',
    title: 'Algoritmos de Ordenamiento',
    icon: Binary,
    href: '/unidades/ordenamiento',
    color: 'var(--igf-red)',
    colorDim: 'oklch(0.22 0.08 25)',
    topics: ['Bubble & Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort & Counting Sort'],
    complexity: 'O(n log n)',
  },
  {
    id: 'unidad-6',
    label: 'Unidad VI',
    title: 'Complejidad y Optimización',
    icon: Zap,
    href: '/unidades/complejidad',
    color: 'oklch(0.78 0.13 320)',
    colorDim: 'oklch(0.22 0.06 320)',
    topics: ['Notación Big-O, Ω, Θ', 'Algoritmos voraces (Greedy)', 'Programación dinámica', 'Divide y vencerás'],
    complexity: 'Análisis asintótico',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function UnitsGrid() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="units-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs text-[var(--igf-muted)] uppercase tracking-widest mb-2">
              Programa de estudio
            </p>
            <h2
              id="units-heading"
              className="font-display text-3xl font-700 text-[var(--igf-ink)] tracking-tight md:text-4xl"
            >
              6 Unidades Temáticas
            </h2>
          </div>
          <p className="text-sm text-[var(--igf-muted)] max-w-sm leading-relaxed">
            Cada unidad incluye teoría, implementaciones en código y visualizaciones animadas paso a paso.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UNITS.map((unit, i) => {
            const Icon = unit.icon
            return (
              <motion.div
                key={unit.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
              >
                <Link
                  href={unit.href}
                  className="group flex h-full flex-col rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 transition-all duration-200 hover:border-[var(--igf-border)] hover:bg-[var(--igf-surface-alt)] hover:shadow-lg"
                  style={{ '--unit-color': unit.color } as React.CSSProperties}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: unit.colorDim, color: unit.color }}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase"
                      style={{ background: unit.colorDim, color: unit.color }}
                    >
                      {unit.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base font-600 text-[var(--igf-ink)] leading-snug tracking-tight">
                    {unit.title}
                  </h3>

                  {/* Topics */}
                  <ul className="mt-3 flex flex-col gap-1.5 flex-1">
                    {unit.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm text-[var(--igf-muted)]">
                        <span
                          className="h-1 w-1 shrink-0 rounded-full"
                          style={{ background: unit.color }}
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-[var(--igf-border)] pt-4">
                    <span
                      className="font-mono text-xs"
                      style={{ color: unit.color }}
                    >
                      {unit.complexity}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs transition-transform group-hover:translate-x-0.5"
                      style={{ color: unit.color }}
                    >
                      Ver unidad <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
