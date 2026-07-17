'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ArrowUp, ArrowRight, RefreshCw, Info } from 'lucide-react'

type StructureType = 'stack' | 'queue'

interface ElementItem {
  id: string
  value: number
}

export default function VisualizationsPage() {
  const [structure, setStructure] = useState<StructureType>('stack')
  const [stackItems, setStackItems] = useState<ElementItem[]>([
    { id: '1', value: 12 },
    { id: '2', value: 45 },
    { id: '3', value: 78 }
  ])
  const [queueItems, setQueueItems] = useState<ElementItem[]>([
    { id: '1', value: 8 },
    { id: '2', value: 24 },
    { id: '3', value: 64 }
  ])
  const [inputValue, setInputValue] = useState('')
  const [logs, setLogs] = useState<string[]>([
    'Estructuras inicializadas con valores de ejemplo.'
  ])

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 10))
  }

  const handlePush = () => {
    const val = inputValue.trim() === '' ? Math.floor(Math.random() * 90) + 10 : Number(inputValue)
    if (isNaN(val)) return

    if (stackItems.length >= 8) {
      addLog('⚠️ Límite del visualizador alcanzado (máx 8 elementos en pila).')
      return
    }

    const newItem = { id: Math.random().toString(), value: val }
    setStackItems(prev => [...prev, newItem])
    setInputValue('')
    addLog(`Push: Se insertó el valor ${val} en el tope de la Pila.`)
  }

  const handlePop = () => {
    if (stackItems.length === 0) {
      addLog('⚠️ Pila vacía (Underflow). No se pueden retirar elementos.')
      return
    }
    const popped = stackItems[stackItems.length - 1]
    setStackItems(prev => prev.slice(0, -1))
    addLog(`Pop: Se retiró el valor ${popped.value} del tope de la Pila.`)
  }

  const handleEnqueue = () => {
    const val = inputValue.trim() === '' ? Math.floor(Math.random() * 90) + 10 : Number(inputValue)
    if (isNaN(val)) return

    if (queueItems.length >= 8) {
      addLog('⚠️ Límite del visualizador alcanzado (máx 8 elementos en cola).')
      return
    }

    const newItem = { id: Math.random().toString(), value: val }
    setQueueItems(prev => [...prev, newItem])
    setInputValue('')
    addLog(`Enqueue: Se insertó el valor ${val} al final de la Cola (Rear).`)
  }

  const handleDequeue = () => {
    if (queueItems.length === 0) {
      addLog('⚠️ Cola vacía (Underflow). No se pueden retirar elementos.')
      return
    }
    const dequeued = queueItems[0]
    setQueueItems(prev => prev.slice(1))
    addLog(`Dequeue: Se retiró el valor ${dequeued.value} del inicio de la Cola (Front).`)
  }

  const handleReset = () => {
    if (structure === 'stack') {
      setStackItems([
        { id: Math.random().toString(), value: 12 },
        { id: Math.random().toString(), value: 45 },
        { id: Math.random().toString(), value: 78 }
      ])
      addLog('Pila restablecida a valores por defecto.')
    } else {
      setQueueItems([
        { id: Math.random().toString(), value: 8 },
        { id: Math.random().toString(), value: 24 },
        { id: Math.random().toString(), value: 64 }
      ])
      addLog('Cola restablecida a valores por defecto.')
    }
    setInputValue('')
  }

  const handleClear = () => {
    if (structure === 'stack') {
      setStackItems([])
      addLog('Pila vaciada.')
    } else {
      setQueueItems([])
      addLog('Cola vaciada.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--igf-bg)] text-[var(--igf-ink)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between border-b border-[var(--igf-border)] pb-5">
          <div>
            <span className="font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-widest">
              Laboratorio Visual
            </span>
            <h1 className="font-display text-2xl font-700 tracking-tight md:text-3xl">
              Visualizador de Estructuras Lineales
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-1 bg-[var(--igf-surface)] p-1 rounded-lg border border-[var(--igf-border)]">
            <button
              onClick={() => setStructure('stack')}
              className={`py-1.5 px-4 rounded-md text-xs font-sans font-600 transition-all ${
                structure === 'stack'
                  ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)]'
                  : 'text-[var(--igf-muted)] hover:text-[var(--igf-ink)]'
              }`}
            >
              Pila (Stack)
            </button>
            <button
              onClick={() => setStructure('queue')}
              className={`py-1.5 px-4 rounded-md text-xs font-sans font-600 transition-all ${
                structure === 'queue'
                  ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)]'
                  : 'text-[var(--igf-muted)] hover:text-[var(--igf-ink)]'
              }`}
            >
              Cola (Queue)
            </button>
          </div>
        </div>

        {/* Panel principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Panel de Controles - 4 Cols */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 flex flex-col gap-4">
              <h2 className="font-display text-sm font-600 text-[var(--igf-ink)] border-b border-[var(--igf-border)] pb-2 mb-1">
                Controles de {structure === 'stack' ? 'Pila' : 'Cola'}
              </h2>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-[var(--igf-muted)] uppercase tracking-wider">
                  Valor a Insertar (Dejar vacío para aleatorio)
                </label>
                <input
                  type="number"
                  placeholder="Ej. 42"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-[var(--igf-bg)] border border-[var(--igf-border)] rounded-lg py-2 px-3 text-sm font-sans focus:outline-none focus:border-[var(--igf-cyan)] text-[var(--igf-ink)]"
                />
              </div>

              {structure === 'stack' ? (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={handlePush}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--igf-cyan)] text-[var(--igf-bg)] text-xs font-sans font-600 py-2.5 hover:opacity-90 transition-opacity"
                  >
                    <Plus size={14} />
                    Push
                  </button>
                  <button
                    onClick={handlePop}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--igf-red)] text-[var(--igf-red)] text-xs font-sans font-600 py-2.5 hover:bg-[var(--igf-red)]/10 transition-colors"
                  >
                    <Trash2 size={14} />
                    Pop
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={handleEnqueue}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--igf-cyan)] text-[var(--igf-bg)] text-xs font-sans font-600 py-2.5 hover:opacity-90 transition-opacity"
                  >
                    <Plus size={14} />
                    Enqueue
                  </button>
                  <button
                    onClick={handleDequeue}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--igf-red)] text-[var(--igf-red)] text-xs font-sans font-600 py-2.5 hover:bg-[var(--igf-red)]/10 transition-colors"
                  >
                    <Trash2 size={14} />
                    Dequeue
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 border-t border-[var(--igf-border)] pt-4 mt-2">
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-1 text-[10px] font-mono text-[var(--igf-muted)] hover:text-[var(--igf-ink)] transition-colors"
                >
                  <RefreshCw size={10} />
                  Reiniciar
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center justify-center gap-1 text-[10px] font-mono text-[var(--igf-muted)] hover:text-[var(--igf-red)] transition-colors"
                >
                  Vaciar
                </button>
              </div>
            </div>

            {/* Teoría y Complejidad */}
            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 flex flex-col gap-3 text-xs text-[var(--igf-muted)] leading-relaxed">
              <div className="flex items-center gap-1.5 text-[var(--igf-cyan)] font-mono uppercase tracking-wider text-[10px]">
                <Info size={12} />
                <span>Análisis de Complejidad</span>
              </div>
              {structure === 'stack' ? (
                <div>
                  <p className="mb-2">
                    Una <strong>Pila (Stack)</strong> funciona bajo el principio <strong>LIFO</strong> (Last In, First Out). El último elemento insertado es el primero en salir.
                  </p>
                  <ul className="flex flex-col gap-1 list-disc list-inside text-[11px] font-mono">
                    <li>Push (Insertar): <span className="text-[var(--igf-green)]">O(1)</span></li>
                    <li>Pop (Retirar): <span className="text-[var(--igf-green)]">O(1)</span></li>
                    <li>Acceso al Tope: <span className="text-[var(--igf-green)]">O(1)</span></li>
                    <li>Búsqueda: <span className="text-[var(--igf-amber)]">O(n)</span></li>
                  </ul>
                </div>
              ) : (
                <div>
                  <p className="mb-2">
                    Una <strong>Cola (Queue)</strong> funciona bajo el principio <strong>FIFO</strong> (First In, First Out). El primer elemento en llegar es el primero en ser atendido.
                  </p>
                  <ul className="flex flex-col gap-1 list-disc list-inside text-[11px] font-mono">
                    <li>Enqueue (Insertar): <span className="text-[var(--igf-green)]">O(1)</span></li>
                    <li>Dequeue (Retirar): <span className="text-[var(--igf-green)]">O(1)</span></li>
                    <li>Acceso al Frontal: <span className="text-[var(--igf-green)]">O(1)</span></li>
                    <li>Búsqueda: <span className="text-[var(--igf-amber)]">O(n)</span></li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Área de Visualización - 8 Cols */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Visualizer container */}
            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-6 min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
              {structure === 'stack' ? (
                /* STACK VISUALIZATION */
                <div className="flex flex-col items-center justify-end h-72 w-full max-w-sm mt-4">
                  <div className="flex flex-col-reverse items-center justify-start border-b-4 border-x-4 border-[var(--igf-border)] rounded-b-xl w-48 min-h-[220px] p-2 bg-[var(--igf-bg)] relative">
                    <AnimatePresence initial={false}>
                      {stackItems.map((item, index) => {
                        const isTop = index === stackItems.length - 1
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: -50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, y: -30 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 120 }}
                            className={`w-full h-8 mb-1.5 flex items-center justify-between px-3 rounded-md border font-mono text-xs font-600 transition-colors ${
                              isTop
                                ? 'bg-[var(--igf-cyan-dim)] border-[var(--igf-cyan)] text-[var(--igf-cyan)]'
                                : 'bg-[var(--igf-surface-alt)] border-[var(--igf-border)] text-gray-300'
                            }`}
                          >
                            <span>[{index}]</span>
                            <span>{item.value}</span>
                            <span className="text-[10px] opacity-75">{isTop ? 'TOPE' : ''}</span>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>

                    {stackItems.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-[var(--igf-muted)] font-mono">
                        Pila Vacía
                      </div>
                    )}
                  </div>

                  {/* Pointer annotation */}
                  {stackItems.length > 0 && (
                    <motion.div
                      layout
                      className="flex items-center gap-1.5 mt-3 text-xs font-mono text-[var(--igf-cyan)]"
                    >
                      <ArrowUp size={12} className="animate-bounce" />
                      <span>Tope apunta a {stackItems[stackItems.length - 1].value} (Índice {stackItems.length - 1})</span>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* QUEUE VISUALIZATION */
                <div className="flex flex-col items-center justify-center h-72 w-full mt-4">
                  <div className="flex items-center justify-start gap-2 border-y-2 border-[var(--igf-border)] w-full max-w-xl min-h-[90px] px-4 py-2 bg-[var(--igf-bg)] relative overflow-x-auto rounded-lg">
                    <AnimatePresence initial={false}>
                      {queueItems.map((item, index) => {
                        const isFront = index === 0
                        const isRear = index === queueItems.length - 1
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 50, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, x: -30 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 120 }}
                            className={`w-20 h-14 shrink-0 flex flex-col items-center justify-center rounded-md border font-mono text-xs font-600 transition-colors relative ${
                              isFront
                                ? 'bg-[var(--igf-cyan-dim)] border-[var(--igf-cyan)] text-[var(--igf-cyan)]'
                                : isRear
                                ? 'bg-[oklch(0.25 0.07 145)] border-[var(--igf-green)] text-[var(--igf-green)]'
                                : 'bg-[var(--igf-surface-alt)] border-[var(--igf-border)] text-gray-300'
                            }`}
                          >
                            <span className="text-[9px] opacity-75">[{index}]</span>
                            <span className="text-sm my-0.5">{item.value}</span>
                            
                            {isFront && (
                              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-700 text-[var(--igf-cyan)]">
                                FRONT
                              </span>
                            )}
                            {isRear && (
                              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-700 text-[var(--igf-green)]">
                                REAR
                              </span>
                            )}
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>

                    {queueItems.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-[var(--igf-muted)] font-mono">
                        Cola Vacía
                      </div>
                    )}
                  </div>

                  {/* Queue description */}
                  {queueItems.length > 0 && (
                    <motion.div
                      layout
                      className="flex flex-col gap-1 items-center justify-center mt-8 text-xs font-mono"
                    >
                      <div className="flex items-center gap-1 text-[var(--igf-cyan)]">
                        <ArrowRight size={12} className="rotate-180" />
                        <span>Frente (Salida): {queueItems[0].value} (Índice 0)</span>
                      </div>
                      <div className="flex items-center gap-1 text-[var(--igf-green)]">
                        <span>Final (Entrada): {queueItems[queueItems.length - 1].value} (Índice {queueItems.length - 1})</span>
                        <ArrowRight size={12} />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Bitácora de operaciones */}
            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-4 flex flex-col gap-2 h-44">
              <span className="font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-wider border-b border-[var(--igf-border)] pb-2 mb-1">
                Bitácora de Eventos
              </span>
              <div className="flex-1 font-mono text-xs overflow-y-auto flex flex-col gap-1.5 pr-2">
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed border-l-2 pl-2 ${
                      log.startsWith('⚠️')
                        ? 'border-[var(--igf-amber)] text-[var(--igf-amber)]'
                        : log.startsWith('Push') || log.startsWith('Enqueue')
                        ? 'border-[var(--igf-cyan)] text-gray-200'
                        : log.startsWith('Pop') || log.startsWith('Dequeue')
                        ? 'border-[var(--igf-red)] text-gray-300'
                        : 'border-gray-500 text-[var(--igf-muted)]'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
