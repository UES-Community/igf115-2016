'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, Cpu, Server, FolderClosed, FileText, Code2, Play, Pause, ChevronRight, ChevronLeft, RotateCcw, Info, RefreshCw } from 'lucide-react'

interface VisualizerStep {
  activeNode: string
  title: string
  description: string
  code: string
  codeLang: string
  arrowFlow?: { from: string; to: string }
}

const JSP_NODES = [
  { id: 'client', label: 'Cliente (Navegador)', icon: Laptop, desc: 'Petición HTTP' },
  { id: 'jsp', label: 'Archivo JSP', icon: FileText, desc: 'paginas/index.jsp' },
  { id: 'java', label: 'Servlet Java', icon: Code2, desc: 'index_jsp.java (Traducción)' },
  { id: 'class', label: 'Clase compilada', icon: Cpu, desc: 'index_jsp.class (Compilación)' },
  { id: 'tomcat', label: 'Memoria Tomcat', icon: Server, desc: 'Instancia de Servlet' }
]

const JSP_POSITIONS: Record<string, number> = {
  client: 5,
  jsp: 27,
  java: 49,
  class: 71,
  tomcat: 95
}

const JSP_STEPS: VisualizerStep[] = [
  {
    activeNode: 'jsp',
    title: 'Fase 1: Petición y Localización de JSP',
    description: 'El cliente solicita una página JSP (ej: index.jsp). El contenedor web (Tomcat) recibe la petición y localiza el archivo físico en el directorio de la aplicación.',
    code: '<!-- index.jsp -->\n<%@ page contentType="text/html;charset=UTF-8" %>\n<html>\n  <body>\n    <h2>Hora actual: <%= new java.util.Date() %></h2>\n  </body>\n</html>',
    codeLang: 'html'
  },
  {
    activeNode: 'java',
    title: 'Fase 2: Traducción (JSP -> .java)',
    description: 'Si es la primera petición (o la JSP cambió), el motor Jasper de Tomcat lee el archivo JSP y genera un archivo de código fuente Java (.java) que implementa un servlet clásico.',
    code: '// index_jsp.java (Servlet generado automáticamente)\npublic final class index_jsp extends org.apache.jasper.runtime.HttpJspBase {\n    public void _jspService(HttpServletRequest request, HttpServletResponse response) {\n        out.write("<html>\\n  <body>\\n    <h2>Hora actual: ");\n        out.print( new java.util.Date() );\n        // ...',
    codeLang: 'java',
    arrowFlow: { from: 'jsp', to: 'java' }
  },
  {
    activeNode: 'class',
    title: 'Fase 3: Compilación (.java -> .class)',
    description: 'El compilador de Java interno de Tomcat compila el servlet de Java generado (`index_jsp.java`) a código binario ejecutable (`index_jsp.class`).',
    code: '# Comando ejecutado internamente por el motor de JSP\n$ javac org/apache/jsp/index_jsp.java\n# Salida: index_jsp.class (Bytecode de Java listo para cargarse)',
    codeLang: 'bash',
    arrowFlow: { from: 'java', to: 'class' }
  },
  {
    activeNode: 'tomcat',
    title: 'Fase 4: Carga e Instanciación',
    description: 'El cargador de clases (ClassLoader) de Tomcat sube el archivo `.class` a memoria. Posteriormente, se crea una única instancia del servlet para responder a todas las peticiones.',
    code: '// En memoria de la JVM de Tomcat:\nClass<?> jspClass = classLoader.loadClass("org.apache.jsp.index_jsp");\nServlet jspServletInstance = (Servlet) jspClass.getDeclaredConstructor().newInstance();',
    codeLang: 'java',
    arrowFlow: { from: 'class', to: 'tomcat' }
  },
  {
    activeNode: 'tomcat',
    title: 'Fase 5: Inicialización (jspInit)',
    description: 'El contenedor invoca el método de inicialización del ciclo de vida `jspInit()`. Aquí es donde se pueden instanciar recursos reutilizables como conexiones de bases de datos.',
    code: 'public void jspInit() {\n    // Se ejecuta una sola vez al cargar el servlet\n    System.out.println("JSP inicializada correctamente.");\n}',
    codeLang: 'java'
  },
  {
    activeNode: 'client',
    title: 'Fase 6: Ejecución de Servicio (_jspService)',
    description: 'Para cada petición del cliente, Tomcat invoca el método `_jspService()`. Este ejecuta el código dinámico, escribe el HTML resultante en el buffer de salida, y envía la respuesta HTTP 200 OK de vuelta al navegador.',
    code: '// Petición entrante de usuario desencadena:\n// jspServletInstance._jspService(request, response)\n\nHTTP/1.1 200 OK\nContent-Type: text/html;charset=UTF-8\n\n<html>\n  <body>\n    <h2>Hora actual: Sat Jul 18 17:41:00 CST 2026</h2>\n  </body>\n</html>',
    codeLang: 'http',
    arrowFlow: { from: 'tomcat', to: 'client' }
  },
  {
    activeNode: 'tomcat',
    title: 'Fase 7: Destrucción (jspDestroy)',
    description: 'Cuando la aplicación web se detiene o se desinstala, Tomcat llama a `jspDestroy()`. Se utiliza para cerrar conexiones o liberar recursos activos.',
    code: 'public void jspDestroy() {\n    // Se ejecuta al apagar la aplicación o servidor\n    System.out.println("Liberando recursos de la JSP...");\n}',
    codeLang: 'java'
  }
]

export default function JspVisualizer() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentStep = JSP_STEPS[currentStepIndex]

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < JSP_STEPS.length - 1) {
            return prev + 1
          } else {
            setIsPlaying(false)
            return prev
          }
        })
      }, 3500)
    }
    return () => clearInterval(timer)
  }, [isPlaying])

  const handleNext = () => {
    if (currentStepIndex < JSP_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  const handleReset = () => {
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  return (
    <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 md:p-6 shadow-xl flex flex-col gap-6">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--igf-border)] pb-4">
        <div>
          <h2 className="font-display text-base font-600 text-[var(--igf-ink)]">
            Ciclo de Vida de una Página JSP
          </h2>
          <p className="text-xs text-[var(--igf-muted)] mt-1">
            Visualiza cómo Tomcat traduce, compila y ejecuta una JSP convirtiéndola en un Servlet dinámico en memoria.
          </p>
        </div>
      </div>

      {/* Info Explicativa */}
      <div className="bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-4 flex gap-3 items-start">
        <Info size={16} className="text-[var(--igf-cyan)] shrink-0 mt-0.5" />
        <p className="text-xs text-gray-300 leading-relaxed">
          <span className="font-600 text-[var(--igf-ink)]">Fases del ciclo de vida: </span>
          Las JSPs no se ejecutan directamente. Pasan por una fase única de traducción y compilación antes de poder procesar peticiones en memoria.
        </p>
      </div>

      {/* Diagrama de Nodos */}
      <div className="relative bg-[#0d1117] border border-[var(--igf-border)] rounded-xl py-12 px-4 md:px-8 overflow-hidden min-h-[140px] flex items-center justify-between">
        
        {/* Línea Base */}
        <div className="absolute left-[8%] right-[8%] h-0.5 bg-[var(--igf-border)] top-1/2 -translate-y-1/2 z-0" />

        {/* Flecha de Animación */}
        <AnimatePresence mode="wait">
          {currentStep.arrowFlow && (
            <motion.div
              key={`jsp-flow-${currentStepIndex}`}
              className="absolute h-1 rounded-full bg-[var(--igf-cyan)] z-10 top-1/2 -translate-y-1/2"
              initial={{
                left: `${JSP_POSITIONS[currentStep.arrowFlow.from]}%`,
                right: `${100 - JSP_POSITIONS[currentStep.arrowFlow.to]}%`
              }}
              animate={{
                left: [
                  `${JSP_POSITIONS[currentStep.arrowFlow.from]}%`,
                  `${JSP_POSITIONS[currentStep.arrowFlow.to]}%`
                ],
                right: [
                  `${100 - JSP_POSITIONS[currentStep.arrowFlow.from]}%`,
                  `${100 - JSP_POSITIONS[currentStep.arrowFlow.to]}%`
                ]
              }}
              transition={{
                duration: 1.2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0.5
              }}
              style={{
                left: `${Math.min(JSP_POSITIONS[currentStep.arrowFlow.from], JSP_POSITIONS[currentStep.arrowFlow.to])}%`,
                width: `${Math.abs(JSP_POSITIONS[currentStep.arrowFlow.to] - JSP_POSITIONS[currentStep.arrowFlow.from])}%`
              }}
            />
          )}
        </AnimatePresence>

        {/* Nodos */}
        {JSP_NODES.map(node => {
          const isActive = currentStep.activeNode === node.id
          const NodeIcon = node.icon
          const posPercent = JSP_POSITIONS[node.id]

          return (
            <div
              key={node.id}
              className="flex flex-col items-center z-20 relative select-none"
              style={{ width: '12%', left: `calc(${posPercent}% - 6%)`, position: 'absolute' }}
            >
              <motion.div
                className={`h-11 w-11 md:h-12 md:w-12 rounded-xl flex items-center justify-center border transition-all ${
                  isActive
                    ? 'bg-[var(--igf-cyan-dim)] border-[var(--igf-cyan)] text-[var(--igf-cyan)] shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                    : 'bg-[#161b22] border-[var(--igf-border)] text-[var(--igf-muted)]'
                }`}
                animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: 'reverse' }}
              >
                <NodeIcon size={20} className={isActive ? 'text-[var(--igf-cyan)]' : 'text-[var(--igf-muted)]'} />
              </motion.div>

              <span className={`text-[10px] md:text-xs font-sans mt-2 text-center truncate w-full ${isActive ? 'text-[var(--igf-ink)] font-600' : 'text-[var(--igf-muted)]'}`}>
                {node.label}
              </span>

              {isActive && (
                <div className="absolute top-16 bg-[#21262d] border border-[var(--igf-border)] text-[9px] text-gray-200 px-2 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap z-30 font-mono">
                  {node.desc}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Controles */}
      <div className="flex justify-between items-center bg-[#0d1117] border border-[var(--igf-border)] rounded-lg p-3">
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-gray-300 hover:bg-[#21262d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Paso Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-gray-300 hover:bg-[#21262d] transition-colors flex items-center gap-1.5 px-3"
          >
            {isPlaying ? (
              <>
                <Pause size={14} className="text-[var(--igf-cyan)] fill-[var(--igf-cyan)]" />
                <span className="text-xs font-mono">Pausa</span>
              </>
            ) : (
              <>
                <Play size={14} className="text-emerald-400 fill-emerald-400" />
                <span className="text-xs font-mono">Play</span>
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === JSP_STEPS.length - 1}
            className="p-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-gray-300 hover:bg-[#21262d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Siguiente Paso"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-gray-300 hover:bg-[#21262d] transition-colors"
            title="Reiniciar"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <span className="text-xs font-mono text-[var(--igf-muted)]">
          Paso {currentStepIndex + 1} de {JSP_STEPS.length}
        </span>
      </div>

      {/* Detalle y Código */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        <div className="md:col-span-5 border border-[var(--igf-border)] rounded-xl p-4 flex flex-col justify-between bg-[#0d1117]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[var(--igf-cyan)]" />
              <h3 className="font-display text-xs font-700 uppercase tracking-wider text-[var(--igf-cyan)]">
                {currentStep.title}
              </h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {currentStep.description}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--igf-border)] text-[10px] text-[var(--igf-muted)] font-mono flex items-center justify-between">
            <span>Componente Activo:</span>
            <span className="text-[var(--igf-cyan)] font-600">
              {JSP_NODES.find(n => n.id === currentStep.activeNode)?.label || 'Tomcat'}
            </span>
          </div>
        </div>

        <div className="md:col-span-7 border border-[var(--igf-border)] rounded-xl p-4 flex flex-col gap-2 bg-[#0d1117]">
          <div className="flex justify-between items-center border-b border-[var(--igf-border)] pb-2">
            <span className="text-[10px] font-mono text-[var(--igf-muted)]">
              Representación en Código / Logs
            </span>
            <span className="rounded bg-[#21262d] text-gray-300 px-1.5 py-0.5 text-[9px] font-mono uppercase">
              {currentStep.codeLang}
            </span>
          </div>
          <pre className="flex-1 rounded bg-[#090d13] p-3 text-[10px] font-mono text-gray-300 overflow-x-auto whitespace-pre leading-relaxed border border-[var(--igf-border)]">
            <code>{currentStep.code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
