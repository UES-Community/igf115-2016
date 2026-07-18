'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, FileCode, CheckCircle, ArrowRight, Info, Layers, RefreshCw, Server, HelpCircle } from 'lucide-react'

type VisualizerMode = 'orm' | 'lifecycle'
type EntityState = 'transient' | 'persistent' | 'detached' | 'removed'

interface StateDetail {
  title: string
  description: string
  inJVM: boolean
  inSession: boolean
  inDB: boolean
  colorClass: string
  glowClass: string
}

const STATE_DETAILS: Record<EntityState, StateDetail> = {
  transient: {
    title: 'Transient (Transitorio)',
    description: 'El objeto fue creado con el operador "new" en Java. No está asociado a ninguna sesión de Hibernate y no tiene representación ni clave primaria en la base de datos.',
    inJVM: true,
    inSession: false,
    inDB: false,
    colorClass: 'border-yellow-500/50 bg-yellow-950/20 text-yellow-400',
    glowClass: 'shadow-[0_0_15px_rgba(234,179,8,0.2)]'
  },
  persistent: {
    title: 'Persistent (Persistente)',
    description: 'El objeto está asociado a una sesión activa de Hibernate y posee un identificador de base de datos. Cualquier modificación en sus campos será detectada automáticamente (dirty checking) y sincronizada al confirmar la transacción.',
    inJVM: true,
    inSession: true,
    inDB: true,
    colorClass: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400',
    glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]'
  },
  detached: {
    title: 'Detached (Desconectado)',
    description: 'El objeto posee una clave primaria de base de datos, pero la sesión de Hibernate que lo gestionaba se cerró o el objeto fue explícitamente expulsado de ella. Hibernate ya no rastrea sus cambios.',
    inJVM: true,
    inSession: false,
    inDB: true,
    colorClass: 'border-blue-500/50 bg-blue-950/20 text-blue-400',
    glowClass: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]'
  },
  removed: {
    title: 'Removed (Eliminado)',
    description: 'El objeto está marcado para ser borrado en el contenedor de persistencia. Al realizar el commit o flush de la transacción, se ejecutará la sentencia SQL DELETE correspondiente en la base de datos.',
    inJVM: true,
    inSession: true,
    inDB: false, // se eliminará de DB al flush
    colorClass: 'border-rose-500/50 bg-rose-950/20 text-rose-400',
    glowClass: 'shadow-[0_0_15px_rgba(244,63,94,0.2)]'
  }
}

interface OrmMapping {
  id: string
  javaCode: string
  dbColumn: string
  annotation: string
  explanation: string
}

const ORM_MAPPINGS: OrmMapping[] = [
  {
    id: 'entity',
    javaCode: '@Entity\n@Table(name = "productos")',
    dbColumn: 'Tabla: productos',
    annotation: '@Entity / @Table',
    explanation: 'Define que esta clase Java representa una entidad persistente y la mapea a la tabla física llamada "productos" en la base de datos.'
  },
  {
    id: 'id',
    javaCode: '@Id\n@GeneratedValue(strategy = GenerationType.IDENTITY)\nprivate Long id;',
    dbColumn: 'id BIGINT PRIMARY KEY AUTO_INCREMENT',
    annotation: '@Id / @GeneratedValue',
    explanation: 'Declara la llave primaria de la entidad. IDENTITY delega la generación del valor incremental al motor de base de datos.'
  },
  {
    id: 'nombre',
    javaCode: '@Column(name = "nombre", nullable = false, length = 100)\nprivate String nombre;',
    dbColumn: 'nombre VARCHAR(100) NOT NULL',
    annotation: '@Column(nullable, length)',
    explanation: 'Mapea la propiedad Java a la columna "nombre". Configura restricciones como que no admita valores nulos y limite su longitud.'
  },
  {
    id: 'precio',
    javaCode: 'private Double precio; // @Column implícito',
    dbColumn: 'precio DOUBLE',
    annotation: 'Mapeo Implícito',
    explanation: 'Por defecto, si una propiedad no tiene la anotación @Transient, Hibernate la mapeará automáticamente a una columna con el mismo nombre y tipo coincidente.'
  }
]

export default function PersistenceVisualizer() {
  const [activeTab, setActiveTab] = useState<VisualizerMode>('lifecycle')
  const [entityState, setEntityState] = useState<EntityState>('transient')
  const [selectedOrmId, setSelectedOrmId] = useState<string>('entity')
  const [historyLogs, setHistoryLogs] = useState<string[]>([
    'Objeto instanciado: estado inicial = Transient.'
  ])

  const stateInfo = STATE_DETAILS[entityState]

  const addLog = (msg: string) => {
    setHistoryLogs(prev => [msg, ...prev].slice(0, 5))
  }

  // Operaciones del ciclo de vida
  const handleNew = () => {
    setEntityState('transient')
    addLog('new Product(): Objeto inicializado en memoria local sin ID.')
  }

  const handlePersist = () => {
    setEntityState('persistent')
    addLog('session.persist(p): Objeto guardado en la sesión. Se le asigna ID y se vincula con la DB.')
  }

  const handleClose = () => {
    if (entityState === 'persistent' || entityState === 'removed') {
      setEntityState('detached')
      addLog('session.close() / evict(): La sesión se cierra. El objeto queda Desconectado.')
    } else {
      addLog('⚠️ Operación inválida: El objeto no se encuentra en una sesión activa.')
    }
  }

  const handleMerge = () => {
    if (entityState === 'detached') {
      setEntityState('persistent')
      addLog('session.merge(p): Objeto desconectado se reasocia a una nueva sesión persistente.')
    } else {
      addLog('⚠️ Operación inválida: merge() se aplica sobre entidades en estado Detached.')
    }
  }

  const handleRemove = () => {
    if (entityState === 'persistent') {
      setEntityState('removed')
      addLog('session.remove(p): Se marca la entidad para su eliminación en la base de datos.')
    } else {
      addLog('⚠️ Operación inválida: Solo se pueden eliminar entidades persistentes.')
    }
  }

  return (
    <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 md:p-6 shadow-xl flex flex-col gap-6">
      {/* Cabecera del Visualizador */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--igf-border)] pb-4">
        <div>
          <h2 className="font-display text-base font-600 text-[var(--igf-ink)]">
            Visualizador de Persistencia y ORM
          </h2>
          <p className="text-xs text-[var(--igf-muted)] mt-1">
            Comprende el ciclo de vida de las entidades Hibernate y el mapeo objeto-relacional (JPA).
          </p>
        </div>

        {/* Alternar pestañas */}
        <div className="flex bg-[#0d1117] rounded-lg p-1 border border-[var(--igf-border)]">
          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'lifecycle'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] border border-[var(--igf-cyan-dim)] font-600'
                : 'text-[var(--igf-muted)] hover:text-white border border-transparent'
            }`}
          >
            Ciclo de Vida de Entidades
          </button>
          <button
            onClick={() => setActiveTab('orm')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'orm'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] border border-[var(--igf-cyan-dim)] font-600'
                : 'text-[var(--igf-muted)] hover:text-white border border-transparent'
            }`}
          >
            Mapeo Objeto-Relacional
          </button>
        </div>
      </div>

      {/* ── SECCIÓN 1: CICLO DE VIDA DE ENTIDADES ─────────────────────────── */}
      {activeTab === 'lifecycle' && (
        <div className="flex flex-col gap-6">
          {/* Info Banner */}
          <div className="bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-4 flex gap-3 items-start">
            <Info size={16} className="text-[var(--igf-cyan)] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              Haz clic en los botones de operación de Hibernate ubicados en el panel inferior para interactuar con la entidad y observar sus transiciones de estado a través de la memoria virtual (JVM), la caché de nivel 1 de la sesión y la base de datos física.
            </p>
          </div>

          {/* Gráfico de los Tres Espacios de Datos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* 1. JVM Memory */}
            <div className="rounded-xl border border-[var(--igf-border)] bg-[#0d1117] p-4 flex flex-col gap-3 min-h-[160px] relative">
              <div className="flex items-center gap-1.5 justify-center border-b border-[var(--igf-border)] pb-2">
                <Layers size={14} className="text-amber-400" />
                <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">JVM Heap (Memoria)</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                {stateInfo.inJVM ? (
                  <motion.div
                    layoutId="entity-instance"
                    className={`px-3 py-2 border rounded-lg text-xs font-mono font-600 shadow-lg ${stateInfo.colorClass} ${stateInfo.glowClass} flex items-center gap-2`}
                  >
                    <span>Product @hashcode</span>
                  </motion.div>
                ) : (
                  <span className="text-[10px] font-mono text-[var(--igf-muted)]">Sin instancia activa</span>
                )}
              </div>
              <span className="text-[9px] font-mono text-[var(--igf-muted)]">Representa al objeto en la memoria de Java</span>
            </div>

            {/* 2. Hibernate Session L1 Cache */}
            <div className="rounded-xl border border-[var(--igf-border)] bg-[#0d1117] p-4 flex flex-col gap-3 min-h-[160px] relative">
              <div className="flex items-center gap-1.5 justify-center border-b border-[var(--igf-border)] pb-2">
                <Server size={14} className="text-sky-400" />
                <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">Caché de Sesión (L1)</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                {stateInfo.inSession ? (
                  <motion.div
                    className={`px-3 py-2 border rounded-lg text-xs font-mono font-600 shadow-md ${stateInfo.colorClass} flex items-center gap-1.5`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <span>Gestionado (Managed)</span>
                  </motion.div>
                ) : (
                  <span className="text-[10px] font-mono text-[var(--igf-muted)]">Fuera de la Sesión</span>
                )}
              </div>
              <span className="text-[9px] font-mono text-[var(--igf-muted)]">Administra el ciclo de vida y dirty checking</span>
            </div>

            {/* 3. Base de Datos Relacional */}
            <div className="rounded-xl border border-[var(--igf-border)] bg-[#0d1117] p-4 flex flex-col gap-3 min-h-[160px] relative">
              <div className="flex items-center gap-1.5 justify-center border-b border-[var(--igf-border)] pb-2">
                <Database size={14} className="text-emerald-400" />
                <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">Base de Datos</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                {stateInfo.inDB ? (
                  <motion.div
                    className="px-3 py-2 border border-emerald-500/30 bg-emerald-950/10 text-emerald-400 rounded-lg text-xs font-mono font-600 flex items-center gap-1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <CheckCircle size={12} />
                    <span>Registro Existente</span>
                  </motion.div>
                ) : (
                  <span className="text-[10px] font-mono text-[var(--igf-muted)]">Ningún registro en tabla</span>
                )}
              </div>
              <span className="text-[9px] font-mono text-[var(--igf-muted)]">Registro en la tabla SQL física</span>
            </div>
          </div>

          {/* Estado de la Entidad e Información */}
          <div className={`border rounded-xl p-4 flex flex-col gap-2 transition-all ${stateInfo.colorClass} ${stateInfo.glowClass}`}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase tracking-wider font-700">Estado Actual:</span>
              <span className="text-xs font-mono font-700">{stateInfo.title}</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {stateInfo.description}
            </p>
          </div>

          {/* Panel de Controles / Operaciones de Persistencia */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 border border-[var(--igf-border)] rounded-xl p-3 bg-[#0d1117]">
            <button
              onClick={handleNew}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-xs font-mono text-gray-200 hover:bg-[#21262d] transition-colors"
            >
              new Product()
            </button>
            <button
              onClick={handlePersist}
              disabled={entityState === 'persistent'}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-xs font-mono text-gray-200 hover:bg-[#21262d] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              session.persist()
            </button>
            <button
              onClick={handleClose}
              disabled={entityState !== 'persistent' && entityState !== 'removed'}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-xs font-mono text-gray-200 hover:bg-[#21262d] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              session.close()
            </button>
            <button
              onClick={handleMerge}
              disabled={entityState !== 'detached'}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-xs font-mono text-gray-200 hover:bg-[#21262d] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              session.merge()
            </button>
            <button
              onClick={handleRemove}
              disabled={entityState !== 'persistent'}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-xs font-mono text-gray-200 hover:bg-[#21262d] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              session.remove()
            </button>
          </div>

          {/* Historial de Logs */}
          <div className="border border-[var(--igf-border)] bg-[#0d1117] rounded-xl p-3 flex flex-col gap-2">
            <span className="text-[10px] font-mono text-[var(--igf-muted)] uppercase tracking-widest border-b border-[var(--igf-border)] pb-1.5">Consola de Transición de Estados</span>
            <div className="flex flex-col gap-1.5 max-h-[100px] overflow-y-auto">
              {historyLogs.map((log, idx) => (
                <div key={idx} className="text-[11px] font-mono text-gray-300 flex items-start gap-1.5">
                  <span className="text-[var(--igf-cyan)] shrink-0">➜</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SECCIÓN 2: MAPEO OBJETO-RELACIONAL (ORM) ────────────────────── */}
      {activeTab === 'orm' && (
        <div className="flex flex-col gap-6">
          {/* Info Banner */}
          <div className="bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-4 flex gap-3 items-start">
            <Info size={16} className="text-[var(--igf-cyan)] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              Selecciona cualquiera de las secciones en el panel izquierdo de código de la Entidad Java para visualizar cómo se mapea directamente con su respectiva columna o tabla dentro de la base de datos relacional SQL en el panel derecho.
            </p>
          </div>

          {/* Mappings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* LADO IZQUIERDO: Entidad Java (6 Cols) */}
            <div className="md:col-span-6 border border-[var(--igf-border)] bg-[#0d1117] rounded-xl p-4 flex flex-col gap-3">
              <span className="text-xs font-mono text-[var(--igf-muted)] border-b border-[var(--igf-border)] pb-2 flex items-center gap-1.5">
                <FileCode size={14} className="text-[var(--igf-cyan)]" />
                Producto.java (Clase Entidad Java)
              </span>

              <div className="flex flex-col gap-2 font-mono text-[11px] leading-relaxed select-none">
                {ORM_MAPPINGS.map(item => {
                  const isSelected = selectedOrmId === item.id
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedOrmId(item.id)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[var(--igf-cyan-dim)] border-[var(--igf-cyan)] text-[var(--igf-ink)]'
                          : 'bg-[#161b22] border-[var(--igf-border)] text-gray-300 hover:bg-[#21262d]'
                      }`}
                    >
                      <pre className="whitespace-pre-wrap">{item.javaCode}</pre>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* LADO DERECHO: Tabla Base de Datos (6 Cols) */}
            <div className="md:col-span-6 border border-[var(--igf-border)] bg-[#0d1117] rounded-xl p-4 flex flex-col gap-3 justify-between">
              <div>
                <span className="text-xs font-mono text-[var(--igf-muted)] border-b border-[var(--igf-border)] pb-2 flex items-center gap-1.5">
                  <Database size={14} className="text-emerald-400" />
                  productos (Tabla SQL)
                </span>

                <div className="mt-4 flex flex-col gap-2 font-mono text-[11px] select-none">
                  {ORM_MAPPINGS.map(item => {
                    const isSelected = selectedOrmId === item.id
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedOrmId(item.id)}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-950/20 border-emerald-400 text-emerald-400 shadow-md'
                            : 'bg-[#161b22] border-[var(--igf-border)] text-gray-300 hover:bg-[#21262d]'
                        }`}
                      >
                        <span>{item.dbColumn}</span>
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded uppercase font-700"
                          >
                            Mapeado
                          </motion.span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Explicación Detallada del Mapeo Seleccionado */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOrmId}
                  className="bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-3 mt-4"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[var(--igf-cyan)] font-mono text-xs font-700">
                    <HelpCircle size={12} />
                    <span>Anotación: {ORM_MAPPINGS.find(o => o.id === selectedOrmId)?.annotation}</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                    {ORM_MAPPINGS.find(o => o.id === selectedOrmId)?.explanation}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
