'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileCode, Database, RefreshCw, Layers, Server, Shield, CheckCircle, Info, HelpCircle, Shuffle, RotateCcw } from 'lucide-react'

type VisualizerMode = 'associations' | 'fetching'
type AssociationType = 'one-to-one' | 'one-to-many' | 'many-to-many'
type FetchMode = 'eager' | 'lazy'

interface AssociationDetail {
  title: string
  description: string
  javaParent: string
  javaChild: string
  dbSchema: string
  annotation: string
}

const ASSOCIATION_DETAILS: Record<AssociationType, AssociationDetail> = {
  'one-to-one': {
    title: 'Relación Uno a Uno (@OneToOne)',
    description: 'Cada fila de la tabla principal se asocia exactamente con una fila de la tabla secundaria. Ejemplo: Un Usuario tiene un único PerfilUsuario.',
    javaParent: '@Entity\npublic class Usuario {\n    @Id\n    private Long id;\n\n    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)\n    private PerfilUsuario perfil;\n}',
    javaChild: '@Entity\npublic class PerfilUsuario {\n    @Id\n    private Long id;\n\n    @OneToOne\n    @JoinColumn(name = "usuario_id")\n    private Usuario usuario;\n}',
    dbSchema: 'tabla: usuarios\n- id BIGINT (PK)\n\ntabla: perfiles\n- id BIGINT (PK)\n- usuario_id BIGINT (FK -> usuarios.id) UNIQUE',
    annotation: '@OneToOne / @JoinColumn'
  },
  'one-to-many': {
    title: 'Relación Uno a Muchos / Muchos a Uno (@OneToMany / @ManyToOne)',
    description: 'La relación más común. Una categoría contiene muchos productos, pero cada producto pertenece a una sola categoría. Se modela bidireccionalmente usando mappedBy.',
    javaParent: '@Entity\npublic class Categoria {\n    @Id\n    private Long id;\n\n    @OneToMany(mappedBy = "categoria")\n    private List<Producto> productos;\n}',
    javaChild: '@Entity\npublic class Producto {\n    @Id\n    private Long id;\n\n    @ManyToOne\n    @JoinColumn(name = "categoria_id")\n    private Categoria categoria;\n}',
    dbSchema: 'tabla: categorias\n- id BIGINT (PK)\n\ntabla: productos\n- id BIGINT (PK)\n- categoria_id BIGINT (FK -> categorias.id)',
    annotation: '@ManyToOne / @OneToMany'
  },
  'many-to-many': {
    title: 'Relación Muchos a Muchos (@ManyToMany)',
    description: 'Muchos estudiantes se inscriben en muchos cursos. Requiere obligatoriamente una tabla intermedia (de unión o join table) para mapear las llaves foráneas de ambos lados.',
    javaParent: '@Entity\npublic class Estudiante {\n    @Id\n    private Long id;\n\n    @ManyToMany\n    @JoinTable(\n        name = "estudiante_curso",\n        joinColumns = @JoinColumn(name = "estudiante_id"),\n        inverseJoinColumns = @JoinColumn(name = "curso_id")\n    )\n    private List<Curso> cursos;\n}',
    javaChild: '@Entity\npublic class Curso {\n    @Id\n    private Long id;\n\n    @ManyToMany(mappedBy = "cursos")\n    private List<Estudiante> estudiantes;\n}',
    dbSchema: 'tabla: estudiantes\n- id BIGINT (PK)\n\ntabla: cursos\n- id BIGINT (PK)\n\ntabla: estudiante_curso (Join Table)\n- estudiante_id BIGINT (FK -> estudiantes.id)\n- curso_id BIGINT (FK -> cursos.id)\n* PK compuesta por (estudiante_id, curso_id)',
    annotation: '@ManyToMany / @JoinTable'
  }
}

export default function AdvancedPersistenceVisualizer() {
  const [activeTab, setActiveTab] = useState<VisualizerMode>('fetching')
  const [assocType, setAssocType] = useState<AssociationType>('one-to-many')
  const [fetchMode, setFetchMode] = useState<FetchMode>('lazy')
  const [fetchingStep, setFetchingStep] = useState<number>(0)
  const [sqlConsole, setSqlConsole] = useState<string[]>([])

  const assocInfo = ASSOCIATION_DETAILS[assocType]

  const triggerFetchSimulation = (mode: FetchMode) => {
    setFetchMode(mode)
    setFetchingStep(1)
    if (mode === 'eager') {
      setSqlConsole([
        'SELECT * FROM categorias c LEFT JOIN productos p ON p.categoria_id = c.id WHERE c.id = 1;',
        '-- INFO: EAGER cargó la Categoria y todos sus Productos asociados en una única consulta JOIN.'
      ])
    } else {
      setSqlConsole([
        'SELECT * FROM categorias WHERE id = 1;',
        '-- INFO: LAZY cargó solo Categoria. Colección "productos" reemplazada por un Proxy de Hibernate.'
      ])
    }
  }

  const loadLazyCollection = () => {
    if (fetchMode === 'lazy' && fetchingStep === 1) {
      setFetchingStep(2)
      setSqlConsole(prev => [
        'SELECT * FROM productos WHERE categoria_id = 1;',
        '-- INFO: Se accedió a categoria.getProductos(). Inicializando colección y ejecutando consulta secundaria.',
        ...prev
      ])
    }
  }

  const triggerCascadeRemove = () => {
    setFetchingStep(3)
    setSqlConsole(prev => [
      'DELETE FROM productos WHERE categoria_id = 1;',
      'DELETE FROM categorias WHERE id = 1;',
      '-- INFO: CascadeType.REMOVE / orphanRemoval = true propagó el borrado de la Categoría hacia todos sus Productos.',
      ...prev
    ])
  }

  const resetSimulation = () => {
    setFetchingStep(0)
    setSqlConsole([])
  }

  return (
    <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 md:p-6 shadow-xl flex flex-col gap-6">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--igf-border)] pb-4">
        <div>
          <h2 className="font-display text-base font-600 text-[var(--igf-ink)]">
            Visualizador de Hibernate Avanzado
          </h2>
          <p className="text-xs text-[var(--igf-muted)] mt-1">
            Explora las asociaciones de entidades JPA y las estrategias de carga en base de datos.
          </p>
        </div>

        {/* Selector de Pestaña */}
        <div className="flex bg-[#0d1117] rounded-lg p-1 border border-[var(--igf-border)]">
          <button
            onClick={() => setActiveTab('fetching')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'fetching'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] border border-[var(--igf-cyan-dim)] font-600'
                : 'text-[var(--igf-muted)] hover:text-white border border-transparent'
            }`}
          >
            LAZY vs EAGER & Cascada
          </button>
          <button
            onClick={() => {
              setActiveTab('associations')
              resetSimulation()
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'associations'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] border border-[var(--igf-cyan-dim)] font-600'
                : 'text-[var(--igf-muted)] hover:text-white border border-transparent'
            }`}
          >
            Modelado de Asociaciones
          </button>
        </div>
      </div>

      {/* ── SECCIÓN 1: FETCHING (LAZY VS EAGER) & CASCADA ───────────────── */}
      {activeTab === 'fetching' && (
        <div className="flex flex-col gap-5">
          {/* Banner de Info */}
          <div className="bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-4 flex gap-3 items-start">
            <Info size={16} className="text-[var(--igf-cyan)] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              Selecciona una estrategia de carga para simular una consulta de Categoría (con Productos asociados) y ver cuántas sentencias SQL se emiten. Luego interactúa con la colección Lazy o elimina el registro para ver el efecto Cascada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Lado izquierdo: Simulación de flujo (7 cols) */}
            <div className="md:col-span-7 border border-[var(--igf-border)] bg-[#0d1117] rounded-xl p-4 flex flex-col gap-4 justify-between">
              <span className="text-xs font-mono text-[var(--igf-muted)] border-b border-[var(--igf-border)] pb-2 flex items-center gap-1.5">
                <Shuffle size={14} className="text-[var(--igf-cyan)]" />
                Área de Flujo e Instancias en Memoria
              </span>

              {/* Diagrama de carga de objetos */}
              <div className="flex-1 flex flex-col items-center justify-center min-h-[160px] gap-6 relative">
                
                {/* 1. Categoría Principal */}
                {fetchingStep >= 1 && (
                  <motion.div
                    className="px-4 py-2 bg-slate-900 border border-slate-700 text-white rounded-lg text-xs font-mono text-center flex flex-col gap-1 w-48 shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <span className="font-600 text-[var(--igf-cyan)]">Categoria @id=1</span>
                    <span className="text-[10px] text-gray-400">nombre: "Electrónica"</span>
                  </motion.div>
                )}

                {/* Línea de enlace */}
                {fetchingStep >= 1 && (
                  <div className="h-4 w-0.5 bg-slate-700" />
                )}

                {/* 2. Colección de Productos Asociados */}
                {fetchingStep === 1 && fetchMode === 'lazy' && (
                  <motion.div
                    className="px-4 py-2 bg-yellow-950/20 border border-yellow-500/30 text-yellow-400 rounded-lg text-xs font-mono text-center cursor-pointer hover:border-yellow-400 transition-all flex flex-col gap-1 w-48 shadow-inner"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={loadLazyCollection}
                    title="Haz clic para inicializar el proxy LAZY"
                  >
                    <span className="font-600">Proxy: productos</span>
                    <span className="text-[9px] text-yellow-500 font-bold uppercase blink flex items-center justify-center gap-1">
                      <RefreshCw size={10} className="animate-spin" />
                      Inicializar LAZY
                    </span>
                  </motion.div>
                )}

                {/* Productos cargados (EAGER o LAZY resuelto) */}
                {((fetchMode === 'eager' && fetchingStep >= 1) || (fetchMode === 'lazy' && fetchingStep >= 2)) && fetchingStep < 3 && (
                  <motion.div
                    className="grid grid-cols-2 gap-2 w-full max-w-xs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="p-2 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono rounded text-center">
                      <p className="font-600">Producto @id=101</p>
                      <p className="text-[9px] text-gray-400">Celular ($500)</p>
                    </div>
                    <div className="p-2 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono rounded text-center">
                      <p className="font-600">Producto @id=102</p>
                      <p className="text-[9px] text-gray-400">Teclado ($50)</p>
                    </div>
                  </motion.div>
                )}

                {/* Cascada de eliminación */}
                {fetchingStep === 3 && (
                  <motion.div
                    className="p-3 border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-mono rounded-lg text-center shadow-lg flex items-center gap-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <span>🗑️ Instancias eliminadas de la memoria</span>
                  </motion.div>
                )}

                {fetchingStep === 0 && (
                  <span className="text-xs font-mono text-[var(--igf-muted)]">Sin consultas cargadas.</span>
                )}

              </div>

              {/* Botones de acción del Simulador */}
              <div className="flex flex-wrap gap-2.5 bg-[#161b22] p-2.5 rounded-xl border border-[var(--igf-border)]">
                <button
                  onClick={() => triggerFetchSimulation('eager')}
                  className="flex-1 min-w-[120px] px-3 py-1.5 bg-[#21262d] border border-[var(--igf-border)] hover:bg-[#30363d] text-xs font-mono rounded-lg text-white transition-colors"
                >
                  Cargar EAGER
                </button>
                <button
                  onClick={() => triggerFetchSimulation('lazy')}
                  className="flex-1 min-w-[120px] px-3 py-1.5 bg-[#21262d] border border-[var(--igf-border)] hover:bg-[#30363d] text-xs font-mono rounded-lg text-white transition-colors"
                >
                  Cargar LAZY
                </button>
                <button
                  onClick={triggerCascadeRemove}
                  disabled={fetchingStep === 0 || fetchingStep === 3}
                  className="flex-1 min-w-[120px] px-3 py-1.5 bg-rose-950/20 border border-rose-500/30 text-rose-400 hover:bg-rose-950/40 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono rounded-lg transition-colors"
                >
                  Borrrar Categoria
                </button>
                <button
                  onClick={resetSimulation}
                  className="p-1.5 bg-[#21262d] border border-[var(--igf-border)] text-gray-300 rounded-lg hover:bg-[#30363d] transition-colors"
                  title="Reiniciar"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Lado derecho: SQL Console (5 cols) */}
            <div className="md:col-span-5 border border-[var(--igf-border)] bg-[#0d1117] rounded-xl p-4 flex flex-col gap-2">
              <span className="text-xs font-mono text-[var(--igf-muted)] border-b border-[var(--igf-border)] pb-2 flex items-center gap-1.5">
                <Database size={14} className="text-emerald-400" />
                Consola SQL (Sentencias generadas)
              </span>

              <div className="flex-1 bg-[#090d13] rounded-lg p-3 border border-[var(--igf-border)] text-[10px] font-mono text-gray-300 overflow-y-auto max-h-[220px] flex flex-col gap-2 whitespace-pre-wrap leading-relaxed">
                {sqlConsole.length > 0 ? (
                  sqlConsole.map((line, idx) => (
                    <div key={idx} className={line.startsWith('--') ? 'text-[var(--igf-muted)] italic' : 'text-emerald-400 font-bold'}>
                      {line}
                    </div>
                  ))
                ) : (
                  <span className="text-[var(--igf-muted)] italic">Esperando simulación...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SECCIÓN 2: MODELADO DE ASOCIACIONES ─────────────────────────── */}
      {activeTab === 'associations' && (
        <div className="flex flex-col gap-5">
          {/* Info Banner */}
          <div className="bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-4 flex gap-3 items-start">
            <Info size={16} className="text-[var(--igf-cyan)] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              Selecciona el tipo de asociación deseado en el selector de tipo de relación. Examina las clases de entidad Java correspondientes (Lado A y Lado B) y la estructura de tablas de base de datos relacionales generada.
            </p>
          </div>

          {/* Selector de Tipo de Relación */}
          <div className="flex gap-2 p-1 border border-[var(--igf-border)] bg-[#0d1117] rounded-lg w-fit">
            {(['one-to-one', 'one-to-many', 'many-to-many'] as AssociationType[]).map(type => (
              <button
                key={type}
                onClick={() => setAssocType(type)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                  assocType === type
                    ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] border border-[var(--igf-cyan-dim)]'
                    : 'text-[var(--igf-muted)] hover:text-white border border-transparent'
                }`}
              >
                {type === 'one-to-one' ? 'OneToOne' : type === 'one-to-many' ? 'OneToMany' : 'ManyToMany'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Clases Java (8 cols) */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border border-[var(--igf-border)] bg-[#0d1117] rounded-xl p-4">
              {/* Lado A */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-[var(--igf-muted)] border-b border-[var(--igf-border)] pb-1 flex items-center gap-1">
                  <FileCode size={12} className="text-[var(--igf-cyan)]" />
                  Lado Principal (A)
                </span>
                <pre className="p-2.5 rounded bg-[#090d13] border border-[var(--igf-border)] text-[10px] font-mono text-gray-300 overflow-x-auto leading-relaxed">
                  <code>{assocInfo.javaParent}</code>
                </pre>
              </div>

              {/* Lado B */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-[var(--igf-muted)] border-b border-[var(--igf-border)] pb-1 flex items-center gap-1">
                  <FileCode size={12} className="text-[var(--igf-cyan)]" />
                  Lado Inverso/Asociado (B)
                </span>
                <pre className="p-2.5 rounded bg-[#090d13] border border-[var(--igf-border)] text-[10px] font-mono text-gray-300 overflow-x-auto leading-relaxed">
                  <code>{assocInfo.javaChild}</code>
                </pre>
              </div>
            </div>

            {/* Esquema DB Relacional (4 cols) */}
            <div className="md:col-span-4 border border-[var(--igf-border)] bg-[#0d1117] rounded-xl p-4 flex flex-col gap-3">
              <span className="text-xs font-mono text-[var(--igf-muted)] border-b border-[var(--igf-border)] pb-2 flex items-center gap-1.5">
                <Database size={14} className="text-emerald-400" />
                Esquema de Tablas SQL
              </span>
              <pre className="flex-1 p-3 rounded bg-[#090d13] border border-[var(--igf-border)] text-[10px] font-mono text-emerald-400 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                <code>{assocInfo.dbSchema}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
