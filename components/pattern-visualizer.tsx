'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
interface ClassNode {
  id: string
  name: string
  stereotype?: string          // «interface», «abstract», etc.
  attributes?: string[]
  methods?: string[]
  x: number                    // Relative grid column (1-based)
  y: number                    // Relative grid row (1-based)
  highlight?: boolean
}

interface Relation {
  from: string
  to: string
  label?: string
  type: 'uses' | 'implements' | 'creates' | 'notifies'
}

interface PatternData {
  id: string
  label: string
  category: string
  purpose: string
  whenToUse: string[]
  nodes: ClassNode[]
  relations: Relation[]
  accentColor: string
  accentDim: string
}

/* ─────────────────────────────────────────────────────────────────────────────
   Pattern definitions
───────────────────────────────────────────────────────────────────────────── */
const PATTERNS: PatternData[] = [
  {
    id: 'singleton',
    label: 'Singleton',
    category: 'Creacional',
    purpose:
      'Garantiza que una clase tenga una única instancia en toda la aplicación y proporciona un punto de acceso global a dicha instancia.',
    whenToUse: [
      'Gestión de conexiones a base de datos o pools de recursos compartidos.',
      'Configuración global de la aplicación (propiedades, logging).',
      'Caché centralizada accesible desde múltiples módulos.',
    ],
    accentColor: 'var(--igf-cyan)',
    accentDim: 'var(--igf-cyan-dim)',
    nodes: [
      {
        id: 'singleton',
        name: 'DatabaseConnection',
        highlight: true,
        attributes: ['- instance: DatabaseConnection'],
        methods: ['- DatabaseConnection()', '+ getInstance(): DatabaseConnection'],
        x: 2,
        y: 1,
      },
      {
        id: 'client',
        name: 'ClientService',
        attributes: [],
        methods: ['+ doWork()'],
        x: 1,
        y: 3,
      },
      {
        id: 'client2',
        name: 'AnotherService',
        attributes: [],
        methods: ['+ doWork()'],
        x: 3,
        y: 3,
      },
    ],
    relations: [
      { from: 'client', to: 'singleton', type: 'uses', label: 'getInstance()' },
      { from: 'client2', to: 'singleton', type: 'uses', label: 'getInstance()' },
    ],
  },
  {
    id: 'observer',
    label: 'Observer',
    category: 'Comportamiento',
    purpose:
      'Define una dependencia uno-a-muchos entre objetos, de manera que cuando un objeto cambia de estado todos sus dependientes son notificados y actualizados automáticamente.',
    whenToUse: [
      'Sistemas de eventos y manejadores (UI frameworks, event buses).',
      'Notificaciones en tiempo real: actualizaciones de feeds, alertas.',
      'Sincronización de vistas con el modelo en arquitecturas MVC.',
    ],
    accentColor: 'var(--igf-green)',
    accentDim: 'oklch(0.25 0.07 145)',
    nodes: [
      {
        id: 'subject',
        name: 'Subject',
        stereotype: '«interface»',
        highlight: true,
        methods: ['+ attach(o: Observer)', '+ detach(o: Observer)', '+ notifyObservers()'],
        x: 2,
        y: 1,
      },
      {
        id: 'concreteSubject',
        name: 'StockMarket',
        attributes: ['- price: double', '- observers: List'],
        methods: ['+ setPrice(p: double)', '+ notifyObservers()'],
        x: 2,
        y: 3,
      },
      {
        id: 'observer',
        name: 'Observer',
        stereotype: '«interface»',
        methods: ['+ update(event: Object)'],
        x: 4,
        y: 1,
      },
      {
        id: 'display',
        name: 'PriceDisplay',
        methods: ['+ update(event: Object)', '- render()'],
        x: 4,
        y: 3,
      },
    ],
    relations: [
      { from: 'concreteSubject', to: 'subject', type: 'implements', label: 'implements' },
      { from: 'display', to: 'observer', type: 'implements', label: 'implements' },
      { from: 'concreteSubject', to: 'display', type: 'notifies', label: 'notifies' },
    ],
  },
  {
    id: 'factory',
    label: 'Factory Method',
    category: 'Creacional',
    purpose:
      'Define una interfaz para crear un objeto, pero deja que las subclases decidan qué clase instanciar. Permite que una clase difiera la instanciación a sus subclases.',
    whenToUse: [
      'Cuando la clase creadora no conoce de antemano qué tipo concreto debe instanciar.',
      'Para desacoplar el código cliente de las clases producto concretas.',
      'Al añadir nuevos tipos de producto sin modificar el código existente (Open/Closed Principle).',
    ],
    accentColor: 'var(--igf-amber)',
    accentDim: 'oklch(0.27 0.07 70)',
    nodes: [
      {
        id: 'creator',
        name: 'NotificationService',
        stereotype: '«abstract»',
        highlight: true,
        methods: ['+ send(msg: String)', '# createChannel(): Channel'],
        x: 2,
        y: 1,
      },
      {
        id: 'concreteCreatorA',
        name: 'EmailService',
        methods: ['# createChannel(): EmailChannel'],
        x: 1,
        y: 3,
      },
      {
        id: 'concreteCreatorB',
        name: 'SMSService',
        methods: ['# createChannel(): SMSChannel'],
        x: 3,
        y: 3,
      },
      {
        id: 'product',
        name: 'Channel',
        stereotype: '«interface»',
        methods: ['+ deliver(msg: String)'],
        x: 5,
        y: 1,
      },
      {
        id: 'productA',
        name: 'EmailChannel',
        methods: ['+ deliver(msg: String)'],
        x: 4,
        y: 3,
      },
      {
        id: 'productB',
        name: 'SMSChannel',
        methods: ['+ deliver(msg: String)'],
        x: 6,
        y: 3,
      },
    ],
    relations: [
      { from: 'concreteCreatorA', to: 'creator', type: 'implements', label: 'extends' },
      { from: 'concreteCreatorB', to: 'creator', type: 'implements', label: 'extends' },
      { from: 'productA', to: 'product', type: 'implements', label: 'implements' },
      { from: 'productB', to: 'product', type: 'implements', label: 'implements' },
      { from: 'concreteCreatorA', to: 'productA', type: 'creates', label: 'creates' },
      { from: 'concreteCreatorB', to: 'productB', type: 'creates', label: 'creates' },
    ],
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   ClassBox sub-component
───────────────────────────────────────────────────────────────────────────── */
function ClassBox({
  node,
  accentColor,
  accentDim,
  index,
}: {
  node: ClassNode
  accentColor: string
  accentDim: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
      className="rounded-lg border font-mono text-[10px] leading-relaxed overflow-hidden min-w-[140px] max-w-[200px]"
      style={{
        borderColor: node.highlight ? accentColor : 'var(--igf-border)',
        background: node.highlight ? accentDim : 'var(--igf-surface-alt)',
        boxShadow: node.highlight ? `0 0 12px ${accentColor}33` : undefined,
      }}
    >
      {/* Header */}
      <div
        className="px-3 py-1.5 border-b text-center"
        style={{
          borderColor: node.highlight ? accentColor : 'var(--igf-border)',
          background: node.highlight ? `${accentDim}` : 'var(--igf-surface)',
        }}
      >
        {node.stereotype && (
          <div className="text-[9px] opacity-60" style={{ color: accentColor }}>
            {node.stereotype}
          </div>
        )}
        <div
          className="font-bold text-[11px]"
          style={{ color: node.highlight ? accentColor : 'var(--igf-ink)' }}
        >
          {node.name}
        </div>
      </div>

      {/* Attributes */}
      {node.attributes && node.attributes.length > 0 && (
        <div className="px-3 py-1.5 border-b" style={{ borderColor: 'var(--igf-border)' }}>
          {node.attributes.map((attr) => (
            <div key={attr} className="text-[var(--igf-muted)]">
              {attr}
            </div>
          ))}
        </div>
      )}

      {/* Methods */}
      {node.methods && node.methods.length > 0 && (
        <div className="px-3 py-1.5">
          {node.methods.map((method) => (
            <div key={method} className="text-gray-300">
              {method}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Relation badge (simplified — just labelled lines as badges)
───────────────────────────────────────────────────────────────────────────── */
function RelationBadge({
  relation,
  accentColor,
  index,
}: {
  relation: Relation
  accentColor: string
  index: number
}) {
  const icons: Record<Relation['type'], string> = {
    uses: '─uses─▶',
    implements: '─▷',
    creates: '──creates──▶',
    notifies: '──notifies──▶',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.2 + index * 0.06 }}
      className="flex items-center gap-1.5 rounded-md border border-[var(--igf-border)] bg-[var(--igf-surface)] px-2.5 py-1.5 text-[9px] font-mono"
    >
      <span className="font-bold" style={{ color: accentColor }}>
        {relation.from}
      </span>
      <span className="text-[var(--igf-muted)]">{icons[relation.type]}</span>
      <span className="font-bold" style={{ color: accentColor }}>
        {relation.to}
      </span>
      {relation.label && (
        <span className="ml-1 text-[var(--igf-muted)] italic">({relation.label})</span>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────────────────── */
export default function PatternVisualizer() {
  const [activeId, setActiveId] = useState<string>('singleton')
  const pattern = PATTERNS.find((p) => p.id === activeId)!

  return (
    <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-6 md:p-8 shadow-xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--igf-border)] pb-4">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-[var(--igf-green)]" />
          <h3 className="font-display text-base font-semibold text-[var(--igf-ink)]">
            Visualizador de Patrones de Diseño
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-wider">
          GoF — Patrones Clásicos
        </span>
      </div>

      {/* Tab Switcher */}
      <div className="grid grid-cols-3 gap-1 bg-[var(--igf-surface-alt)] p-1 rounded-lg border border-[var(--igf-border)]">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            id={`pattern-tab-${p.id}`}
            aria-selected={activeId === p.id}
            onClick={() => setActiveId(p.id)}
            className="flex flex-col items-center gap-0.5 rounded-md py-2 px-1 text-center transition-all"
            style={{
              background: activeId === p.id ? p.accentDim : 'transparent',
              color: activeId === p.id ? p.accentColor : 'var(--igf-muted)',
            }}
          >
            <span className="font-mono text-[10px] font-bold">{p.label}</span>
            <span
              className="text-[9px]"
              style={{ color: activeId === p.id ? p.accentColor : 'var(--igf-muted)', opacity: 0.7 }}
            >
              {p.category}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-5"
        >
          {/* Purpose */}
          <p className="text-xs text-[var(--igf-muted)] leading-relaxed border-l-2 pl-3"
            style={{ borderColor: pattern.accentColor }}>
            {pattern.purpose}
          </p>

          {/* Class diagram boxes */}
          <div className="rounded-lg border border-[var(--igf-border)] bg-[var(--igf-bg)] p-4">
            <p className="font-mono text-[9px] text-[var(--igf-muted)] uppercase tracking-widest mb-3">
              Diagrama de Clases — {pattern.label}
            </p>
            <div className="flex flex-wrap gap-3 items-start justify-center">
              {pattern.nodes.map((node, i) => (
                <ClassBox
                  key={node.id}
                  node={node}
                  accentColor={pattern.accentColor}
                  accentDim={pattern.accentDim}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Relations */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[9px] text-[var(--igf-muted)] uppercase tracking-widest">
              Relaciones
            </p>
            <div className="flex flex-wrap gap-2">
              {pattern.relations.map((rel, i) => (
                <RelationBadge
                  key={`${rel.from}-${rel.to}`}
                  relation={rel}
                  accentColor={pattern.accentColor}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* When to use */}
          <div className="rounded-lg border border-[var(--igf-border)] bg-[var(--igf-surface-alt)] p-4 flex flex-col gap-2">
            <p className="font-mono text-[9px] text-[var(--igf-muted)] uppercase tracking-widest mb-1">
              ¿Cuándo usarlo?
            </p>
            <ul className="flex flex-col gap-1.5">
              {pattern.whenToUse.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: pattern.accentColor }}
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
