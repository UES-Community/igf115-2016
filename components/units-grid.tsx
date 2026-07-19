'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Layers, Settings, Coffee, Server, FileCode, Database, Network } from 'lucide-react'

const UNITS = [
  {
    id: 'unidad-1',
    label: 'Unidad I',
    title: 'El Software y la Ingeniería del Software',
    icon: Settings,
    href: '/unidades/el-software',
    color: 'var(--igf-cyan)',
    colorDim: 'var(--igf-cyan-dim)',
    topics: [
      'El software como producto y proceso',
      'Características del software de calidad',
      'Crisis del software e historia',
      'Modelos de ciclo de vida del software'
    ],
    complexity: 'Fundamentos de IS',
  },
  {
    id: 'unidad-2',
    label: 'Unidad II',
    title: 'Arquitectura del Software',
    icon: Layers,
    href: '/unidades/arquitectura',
    color: 'var(--igf-green)',
    colorDim: 'oklch(0.25 0.07 145)',
    topics: [
      'Acoplamiento bajo y alta cohesión',
      'Patrones GoF: Singleton, Observer, Factory',
      'Estilos: Capas, Microservicios, Event-Driven',
      'Principios SOLID aplicados al diseño'
    ],
    complexity: 'Arquitectura y Componentes',
  },
  {
    id: 'unidad-3',
    label: 'Unidad III',
    title: 'Programación Web en Java',
    icon: Coffee,
    href: '/unidades/prog-web-java',
    color: 'var(--igf-amber)',
    colorDim: 'oklch(0.27 0.07 70)',
    topics: [
      'Arquitecturas de programación',
      'Arquitectura de aplicaciones web',
      'Servlets y páginas JSP',
      'Patrón MVC en Java'
    ],
    complexity: 'Arquitectura Web',
  },
  {
    id: 'unidad-4',
    label: 'Unidad IV',
    title: 'Servidor de Aplicaciones',
    icon: Server,
    href: '/unidades/servidor-aplicaciones',
    color: 'oklch(0.70 0.14 280)',
    colorDim: 'oklch(0.22 0.07 280)',
    topics: [
      'Conceptos de servidor web',
      'Servidor de aplicaciones Tomcat',
      'Configuración de Tomcat',
      'Despliegue de aplicaciones'
    ],
    complexity: 'Tomcat y Despliegue',
  },
  {
    id: 'unidad-5',
    label: 'Unidad V',
    title: 'Java Server Pages',
    icon: FileCode,
    href: '/unidades/java-server-pages',
    color: 'oklch(0.70 0.16 300)',
    colorDim: 'oklch(0.22 0.08 300)',
    topics: [
      'Ciclo de vida de una página JSP',
      'Scriptlets, Expresiones y Declaraciones',
      'Directivas y Objetos implícitos',
      'Lenguaje de Expresiones (EL) y JSTL'
    ],
    complexity: 'JSP y Plantillas',
  },
  {
    id: 'unidad-6',
    label: 'Unidad VI',
    title: 'Motor de Persistencia',
    icon: Database,
    href: '/unidades/motor-persistencia',
    color: 'oklch(0.70 0.15 140)',
    colorDim: 'oklch(0.22 0.07 140)',
    topics: [
      'Concepto de persistencia y desfase ORM',
      'Arquitectura de Hibernate y JPA',
      'Estados del ciclo de vida de entidades',
      'Mapeo básico: anotaciones y llaves primarias'
    ],
    complexity: 'Hibernate y Bases de Datos',
  },
  {
    id: 'unidad-7',
    label: 'Unidad VII',
    title: 'Hibernate Avanzado',
    icon: Network,
    href: '/unidades/hibernate-avanzado',
    color: 'oklch(0.70 0.16 320)',
    colorDim: 'oklch(0.22 0.08 320)',
    topics: [
      'Asociaciones: OneToOne, OneToMany, ManyToOne',
      'Asociaciones ManyToMany con tablas de unión',
      'Estrategias de carga: LAZY y EAGER',
      'Propagación de operaciones: Cascade'
    ],
    complexity: 'Hibernate Avanzado',
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
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
              4 Unidades Temáticas
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
