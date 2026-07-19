'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Laptop, Layers, RefreshCw, FileCode, CheckCircle, Info, Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Zap, Sparkles, Box } from 'lucide-react'

type VisualizerMode = 'ioc' | 'scopes'

interface Step {
  activeNode: string
  title: string
  description: string
  code: string
  codeLang: string
  arrowFlow?: { from: string; to: string }
}

const IOC_NODES = [
  { id: 'scanner', label: 'Component Scan', icon: Zap, desc: '@ComponentScan' },
  { id: 'container', label: 'Spring IoC', icon: Cpu, desc: 'ApplicationContext' },
  { id: 'repository', label: 'Repository', icon: Layers, desc: '@Repository' },
  { id: 'service', label: 'Service', icon: Box, desc: '@Service' },
  { id: 'controller', label: 'Controller', icon: FileCode, desc: '@RestController' }
]

const IOC_POSITIONS: Record<string, number> = {
  scanner: 5,
  container: 28,
  repository: 51,
  service: 74,
  controller: 95
}

const IOC_STEPS: Step[] = [
  {
    activeNode: 'scanner',
    title: 'Paso 1: Escaneo de Componentes (Component Scanning)',
    description: 'Al iniciar la aplicación, Spring escanea las anotaciones (@Component, @Service, @Repository, @RestController) en los paquetes configurados para registrar definiciones de beans.',
    code: '@SpringBootApplication\n// Incluye automáticamente @ComponentScan en el paquete raíz\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}',
    codeLang: 'java'
  },
  {
    activeNode: 'container',
    title: 'Paso 2: Registro en el Contenedor IoC (ApplicationContext)',
    description: 'El contenedor IoC toma las definiciones encontradas y las registra en su fábrica interna de beans, organizando el orden de instanciación según las dependencias requeridas.',
    code: '// ApplicationContext creando el grafo de dependencias:\nBeanDefinition repoDef = new BeanDefinition(ProductRepository.class);\nBeanDefinition serviceDef = new BeanDefinition(ProductService.class);\nBeanDefinition controllerDef = new BeanDefinition(ProductController.class);',
    codeLang: 'java',
    arrowFlow: { from: 'scanner', to: 'container' }
  },
  {
    activeNode: 'repository',
    title: 'Paso 3: Instanciación de la Capa de Datos (@Repository)',
    description: 'Spring instanciará primero los beans que no tienen dependencias. Crea el Singleton de ProductRepository y lo almacena en el registro del contenedor.',
    code: '@Repository\npublic class ProductRepository {\n    public List<Product> findAll() {\n        return List.of(new Product(1L, "Laptop"));\n    }\n}',
    codeLang: 'java',
    arrowFlow: { from: 'container', to: 'repository' }
  },
  {
    activeNode: 'service',
    title: 'Paso 4: Inyección de Dependencia en el Servicio (@Autowired)',
    description: 'Spring crea ProductService e inyecta automáticamente el bean ProductRepository en su constructor. No se requiere instanciar objetos manualmente con "new".',
    code: '@Service\npublic class ProductService {\n    private final ProductRepository productRepository;\n\n    @Autowired // Inyección por constructor (Buena Práctica)\n    public ProductService(ProductRepository productRepository) {\n        this.productRepository = productRepository;\n    }\n}',
    codeLang: 'java',
    arrowFlow: { from: 'repository', to: 'service' }
  },
  {
    activeNode: 'controller',
    title: 'Paso 5: Ensamblado Final y Exposición HTTP (@RestController)',
    description: 'El contenedor inyecta ProductService en ProductController. El controlador queda completamente ensamblado y listo para atender peticiones en Spring Web MVC.',
    code: '@RestController\n@RequestMapping("/api/productos")\npublic class ProductController {\n    private final ProductService productService;\n\n    public ProductController(ProductService productService) {\n        this.productService = productService;\n    }\n\n    @GetMapping\n    public List<Product> listar() { return productService.obtenerTodos(); }\n}',
    codeLang: 'java',
    arrowFlow: { from: 'service', to: 'controller' }
  }
]

export default function SpringVisualizer() {
  const [activeTab, setActiveTab] = useState<VisualizerMode>('ioc')
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Estado para la simulación de scopes
  const [singletonInstances, setSingletonInstances] = useState<number[]>([101])
  const [prototypeInstances, setPrototypeInstances] = useState<number[]>([201])

  const currentStep = IOC_STEPS[currentStepIndex]

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && activeTab === 'ioc') {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < IOC_STEPS.length - 1) {
            return prev + 1
          } else {
            setIsPlaying(false)
            return prev
          }
        })
      }, 3500)
    }
    return () => clearInterval(timer)
  }, [isPlaying, activeTab])

  const handleNext = () => {
    if (currentStepIndex < IOC_STEPS.length - 1) {
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

  const requestSingletonBean = () => {
    // Reutiliza la misma instancia
  }

  const requestPrototypeBean = () => {
    setPrototypeInstances(prev => [...prev, Math.floor(Math.random() * 899) + 100].slice(-4))
  }

  const resetScopes = () => {
    setSingletonInstances([101])
    setPrototypeInstances([201])
  }

  return (
    <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 md:p-6 shadow-xl flex flex-col gap-6">
      {/* Cabecera y Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--igf-border)] pb-4">
        <div>
          <h2 className="font-display text-base font-600 text-[var(--igf-ink)]">
            Visualizador Interactivo de Spring Framework
          </h2>
          <p className="text-xs text-[var(--igf-muted)] mt-1">
            Explora el funcionamiento del contenedor IoC, la Inyección de Dependencias y los alcances de Beans.
          </p>
        </div>

        {/* Botones de Modo */}
        <div className="flex bg-[#0d1117] rounded-lg p-1 border border-[var(--igf-border)]">
          <button
            onClick={() => {
              setActiveTab('ioc')
              setCurrentStepIndex(0)
              setIsPlaying(false)
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'ioc'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] border border-[var(--igf-cyan-dim)] font-600'
                : 'text-[var(--igf-muted)] hover:text-white border border-transparent'
            }`}
          >
            Contenedor IoC & DI
          </button>
          <button
            onClick={() => setActiveTab('scopes')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'scopes'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] border border-[var(--igf-cyan-dim)] font-600'
                : 'text-[var(--igf-muted)] hover:text-white border border-transparent'
            }`}
          >
            Alcance: Singleton vs Prototype
          </button>
        </div>
      </div>

      {/* ── SECCIÓN 1: CONTENEDOR IOC & INYECCIÓN DE DEPENDENCIAS ───────────── */}
      {activeTab === 'ioc' && (
        <div className="flex flex-col gap-6">
          <div className="bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-4 flex gap-3 items-start">
            <Info size={16} className="text-[var(--igf-cyan)] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              <span className="font-600 text-[var(--igf-ink)]">Inversión de Control (IoC): </span>
              Spring asume el control del ciclo de vida de los componentes de la aplicación. En lugar de crear objetos manualmente con "new", Spring los instancializa, configura e inyecta donde se necesiten.
            </p>
          </div>

          {/* Diagrama de Nodos IoC */}
          <div className="relative bg-[#0d1117] border border-[var(--igf-border)] rounded-xl py-12 px-4 md:px-8 overflow-hidden min-h-[140px] flex items-center justify-between">
            <div className="absolute left-[8%] right-[8%] h-0.5 bg-[var(--igf-border)] top-1/2 -translate-y-1/2 z-0" />

            <AnimatePresence mode="wait">
              {currentStep.arrowFlow && (
                <motion.div
                  key={`ioc-flow-${currentStepIndex}`}
                  className="absolute h-1 rounded-full bg-[var(--igf-cyan)] z-10 top-1/2 -translate-y-1/2"
                  initial={{
                    left: `${IOC_POSITIONS[currentStep.arrowFlow.from]}%`,
                    right: `${100 - IOC_POSITIONS[currentStep.arrowFlow.to]}%`
                  }}
                  animate={{
                    left: [
                      `${IOC_POSITIONS[currentStep.arrowFlow.from]}%`,
                      `${IOC_POSITIONS[currentStep.arrowFlow.to]}%`
                    ],
                    right: [
                      `${100 - IOC_POSITIONS[currentStep.arrowFlow.from]}%`,
                      `${100 - IOC_POSITIONS[currentStep.arrowFlow.to]}%`
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
                    left: `${Math.min(IOC_POSITIONS[currentStep.arrowFlow.from], IOC_POSITIONS[currentStep.arrowFlow.to])}%`,
                    width: `${Math.abs(IOC_POSITIONS[currentStep.arrowFlow.to] - IOC_POSITIONS[currentStep.arrowFlow.from])}%`
                  }}
                />
              )}
            </AnimatePresence>

            {IOC_NODES.map(node => {
              const isActive = currentStep.activeNode === node.id
              const NodeIcon = node.icon
              const posPercent = IOC_POSITIONS[node.id]

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
                disabled={currentStepIndex === IOC_STEPS.length - 1}
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
              Paso {currentStepIndex + 1} de {IOC_STEPS.length}
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
                <span>Fase Activa:</span>
                <span className="text-[var(--igf-cyan)] font-600">
                  {IOC_NODES.find(n => n.id === currentStep.activeNode)?.label}
                </span>
              </div>
            </div>

            <div className="md:col-span-7 border border-[var(--igf-border)] rounded-xl p-4 flex flex-col gap-2 bg-[#0d1117]">
              <div className="flex justify-between items-center border-b border-[var(--igf-border)] pb-2">
                <span className="text-[10px] font-mono text-[var(--igf-muted)]">
                  Código Java / Configuración de Spring
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
      )}

      {/* ── SECCIÓN 2: ALCANCE DE BEANS (SINGLETON VS PROTOTYPE) ─────────── */}
      {activeTab === 'scopes' && (
        <div className="flex flex-col gap-6">
          <div className="bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-4 flex gap-3 items-start">
            <Info size={16} className="text-[var(--igf-cyan)] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              Haz clic en "Solicitar Bean" para pedir una instancia al contenedor de Spring. Observa cómo el alcance <span className="text-emerald-400 font-600">Singleton</span> reutiliza la misma dirección de memoria, mientras que el alcance <span className="text-amber-400 font-600">Prototype</span> crea un nuevo objeto cada vez.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Panel Singleton */}
            <div className="border border-emerald-500/30 bg-[#0d1117] rounded-xl p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-400" />
                  <h3 className="font-display text-xs font-700 text-emerald-400 uppercase tracking-wider">
                    Scope: Singleton (Por Defecto)
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-emerald-950/40 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  @Scope("singleton")
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Existe únicamente **una sola instancia compartida** por cada contenedor de Spring. Todas las peticiones reciben la misma referencia.
              </p>

              <div className="flex flex-col gap-2 min-h-[110px] bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-3 justify-center items-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  {singletonInstances.map((id, idx) => (
                    <motion.div
                      key={idx}
                      className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 rounded font-mono text-xs shadow-md"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      Instance @{id} (Reutilizada)
                    </motion.div>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[var(--igf-muted)] mt-2">
                  Instancia única en el contenedor Spring IoC
                </span>
              </div>

              <button
                onClick={requestSingletonBean}
                className="w-full py-2 bg-emerald-950/30 border border-emerald-500/40 hover:bg-emerald-950/60 text-emerald-300 font-mono text-xs rounded-lg transition-colors"
              >
                Solicitar Bean Singleton (getBean)
              </button>
            </div>

            {/* Panel Prototype */}
            <div className="border border-amber-500/30 bg-[#0d1117] rounded-xl p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-amber-500/20 pb-2">
                <div className="flex items-center gap-2">
                  <RefreshCw size={16} className="text-amber-400" />
                  <h3 className="font-display text-xs font-700 text-amber-400 uppercase tracking-wider">
                    Scope: Prototype
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-amber-950/40 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  @Scope("prototype")
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Cada solicitud del bean al contenedor resulta en la **creación de una nueva instancia independiente** en memoria.
              </p>

              <div className="flex flex-col gap-2 min-h-[110px] bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-3 justify-center items-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  {prototypeInstances.map((id, idx) => (
                    <motion.div
                      key={idx}
                      className="px-2.5 py-1 bg-amber-950/40 border border-amber-500/40 text-amber-300 rounded font-mono text-xs shadow-md"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      Instance @{id}
                    </motion.div>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[var(--igf-muted)] mt-2">
                  Instancias independientes creadas por demanda
                </span>
              </div>

              <button
                onClick={requestPrototypeBean}
                className="w-full py-2 bg-amber-950/30 border border-amber-500/40 hover:bg-amber-950/60 text-amber-300 font-mono text-xs rounded-lg transition-colors"
              >
                Solicitar Bean Prototype (Crear Nuevo)
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={resetScopes}
              className="px-4 py-2 bg-[#161b22] border border-[var(--igf-border)] text-xs font-mono text-gray-300 hover:bg-[#21262d] rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw size={14} />
              Reiniciar Alcances
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
