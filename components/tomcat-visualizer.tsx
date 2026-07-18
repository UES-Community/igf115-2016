'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, Cpu, Network, FolderClosed, Box, Settings, Play, Pause, ChevronRight, ChevronLeft, RotateCcw, Package, FileCode, CheckCircle, Info } from 'lucide-react'

// ── TYPES ───────────────────────────────────────────────────────────
type VisualizerMode = 'request' | 'deployment'

interface VisualizerStep {
  activeNode: string
  title: string
  description: string
  code: string
  codeLang: string
  arrowFlow?: { from: string; to: string }
}

interface Scenario {
  id: string
  name: string
  description: string
  steps: VisualizerStep[]
  nodes: { id: string; label: string; icon: any; desc: string }[]
  positions: Record<string, number>
}

// ── SCENARIOS ──────────────────────────────────────────────────────
const REQUEST_SCENARIO: Scenario = {
  id: 'req-flow',
  name: 'Ruta de Petición HTTP',
  description: 'Simula el viaje detallado de una petición HTTP GET /tienda/index.jsp desde el cliente hasta la ejecución del servlet dentro del contenedor de Tomcat.',
  nodes: [
    { id: 'client', label: 'Cliente', icon: Laptop, desc: 'Browser' },
    { id: 'connector', label: 'Connector', icon: Cpu, desc: 'HTTP Puerto 8080' },
    { id: 'engine', label: 'Engine', icon: Settings, desc: 'Motor Catalina' },
    { id: 'host', label: 'Host', icon: Network, desc: 'localhost' },
    { id: 'context', label: 'Context', icon: FolderClosed, desc: '/tienda' },
    { id: 'wrapper', label: 'Servlet', icon: Box, desc: 'Wrapper (Servlet)' }
  ],
  positions: {
    client: 5,
    connector: 23,
    engine: 41,
    host: 59,
    context: 77,
    wrapper: 95
  },
  steps: [
    {
      activeNode: 'client',
      title: 'Cliente: Envío de Solicitud',
      description: 'El cliente realiza una petición web digitando en su navegador la URL correspondiente. El navegador establece una conexión TCP y envía la petición HTTP GET.',
      code: 'GET http://localhost:8080/tienda/index.jsp HTTP/1.1\nHost: localhost:8080\nUser-Agent: Mozilla/5.0',
      codeLang: 'http'
    },
    {
      activeNode: 'connector',
      title: 'Tomcat Connector: Intercepción',
      description: 'El Connector (configurado en server.xml por el puerto 8080) intercepta la conexión TCP, lee los bytes de la petición HTTP, crea los objetos HttpRequest/HttpResponse y los delega al motor de servlet.',
      code: '<Connector port="8080"\n           protocol="HTTP/1.1"\n           connectionTimeout="20000"\n           redirectPort="8443" />',
      codeLang: 'xml',
      arrowFlow: { from: 'client', to: 'connector' }
    },
    {
      activeNode: 'engine',
      title: 'Engine (Catalina): Enrutamiento del Motor',
      description: 'El Engine principal recibe la petición del Connector, analiza el Host destino (localhost) y la redirige al Host virtual correspondiente.',
      code: '<Engine name="Catalina" defaultHost="localhost">\n  <!-- Define los hosts virtuales aquí -->\n</Engine>',
      codeLang: 'xml',
      arrowFlow: { from: 'connector', to: 'engine' }
    },
    {
      activeNode: 'host',
      title: 'Host (localhost): Selección de Servidor Virtual',
      description: 'El Host virtual mapea el nombre del dominio solicitado. Busca entre sus aplicaciones instaladas (Contexts) cuál coincide con el prefijo del path del recurso.',
      code: '<Host name="localhost"  appBase="webapps"\n      unpackWARs="true" autoDeploy="true">\n  <!-- Define contexts o mapeos automáticos -->\n</Host>',
      codeLang: 'xml',
      arrowFlow: { from: 'engine', to: 'host' }
    },
    {
      activeNode: 'context',
      title: 'Context (/tienda): Selección de Aplicación Web',
      description: 'El Context representa la aplicación web específica (mapeada a /tienda). Determina qué Servlet o recurso estático (JSP, HTML) debe responder a la petición basándose en la configuración de web.xml o anotaciones.',
      code: '<Context path="/tienda" docBase="tienda.war" reloadable="true">\n  <!-- Recursos específicos de la app, ej: pools de conexión -->\n</Context>',
      codeLang: 'xml',
      arrowFlow: { from: 'host', to: 'context' }
    },
    {
      activeNode: 'wrapper',
      title: 'Wrapper (Servlet): Ejecución y Respuesta',
      description: 'El Wrapper (un contenedor para cada servlet individual) ejecuta los filtros asignados y luego invoca el servlet final. El servlet procesa y escribe la respuesta que viaja de regreso al cliente.',
      code: '@WebServlet("/index.jsp")\npublic class HomeServlet extends HttpServlet {\n    protected void doGet(HttpServletRequest req, HttpServletResponse resp) \n            throws ServletException, IOException {\n        resp.getWriter().write("<html>Bienvenido a Tienda!</html>");\n    }\n}',
      codeLang: 'java',
      arrowFlow: { from: 'context', to: 'wrapper' }
    }
  ]
}

const DEPLOYMENT_SCENARIO: Scenario = {
  id: 'dep-flow',
  name: 'Ciclo de Despliegue de un WAR',
  description: 'Simula el ciclo completo desde que se copia un archivo empaquetado .war en el directorio "webapps" de Tomcat hasta que la aplicación se inicializa y se encuentra lista para recibir tráfico.',
  nodes: [
    { id: 'war', label: 'Archivo WAR', icon: Package, desc: 'app.war empaquetado' },
    { id: 'webapps', label: 'Carpeta webapps', icon: FolderClosed, desc: 'Directorio de Tomcat' },
    { id: 'deployer', label: 'Deployer', icon: Settings, desc: 'Detector del Host' },
    { id: 'extracted', label: 'Extracción', icon: FolderClosed, desc: 'Directorio app/' },
    { id: 'webxml', label: 'Configuración', icon: FileCode, desc: 'web.xml y clases' },
    { id: 'active', label: 'Activo', icon: CheckCircle, desc: 'App lista para tráfico' }
  ],
  positions: {
    war: 5,
    webapps: 23,
    deployer: 41,
    extracted: 59,
    webxml: 77,
    active: 95
  },
  steps: [
    {
      activeNode: 'war',
      title: 'Paso 1: Generación del Empaquetado WAR',
      description: 'El desarrollador compila el proyecto y genera un archivo Web Archive (.war) con toda la estructura de archivos JSP, clases Java, librerías y recursos de configuración.',
      code: '# Construcción del archivo con Maven o Gradle\n$ mvn package\n# Salida: target/mi-aplicacion.war (Estructura ZIP estándar para web)',
      codeLang: 'bash'
    },
    {
      activeNode: 'webapps',
      title: 'Paso 2: Copiado a Directorio webapps',
      description: 'El archivo WAR se coloca o se copia en la carpeta de despliegue principal de Tomcat (`webapps/`). También se puede realizar mediante la consola de administración.',
      code: '# Comando de despliegue\ncp target/mi-aplicacion.war /usr/local/tomcat/webapps/',
      codeLang: 'bash',
      arrowFlow: { from: 'war', to: 'webapps' }
    },
    {
      activeNode: 'deployer',
      title: 'Paso 3: Detección por Host Deployer',
      description: 'El Host de Tomcat corre un hilo en segundo plano vigilando modificaciones. Al ver el nuevo `.war`, decide iniciar el proceso de auto-despliegue basándose en la configuración `autoDeploy="true"`.',
      code: 'INFO: Deploying web application archive [/usr/local/tomcat/webapps/mi-aplicacion.war]\nINFO: Deployment of web application archive [/usr/local/tomcat/webapps/mi-aplicacion.war] has started',
      codeLang: 'text',
      arrowFlow: { from: 'webapps', to: 'deployer' }
    },
    {
      activeNode: 'extracted',
      title: 'Paso 4: Extracción y Estructuración',
      description: 'Tomcat crea una carpeta con el mismo nombre de la app (mi-aplicacion/) y extrae el contenido del archivo WAR. Esto permite lecturas de recursos más eficientes en tiempo de ejecución.',
      code: 'webapps/\n├── mi-aplicacion.war\n└── mi-aplicacion/\n    ├── WEB-INF/\n    │   ├── classes/\n    │   ├── lib/\n    │   └── web.xml\n    └── index.jsp',
      codeLang: 'text',
      arrowFlow: { from: 'deployer', to: 'extracted' }
    },
    {
      activeNode: 'webxml',
      title: 'Paso 5: Lectura de web.xml y Anotaciones',
      description: 'El cargador de clases (ClassLoader) de Tomcat lee el descriptor de despliegue `WEB-INF/web.xml` y escanea las anotaciones (como `@WebServlet`) para crear y mapear los servlets, filtros y listeners.',
      code: '<!-- Lectura de configuración de la app -->\n<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"\n         version="3.1">\n    <display-name>Aplicación Web Tienda</display-name>\n</web-app>',
      codeLang: 'xml',
      arrowFlow: { from: 'extracted', to: 'webxml' }
    },
    {
      activeNode: 'active',
      title: 'Paso 6: Inicialización de Contexto Completa',
      description: 'Tomcat inicializa los Listeners y llama a los métodos `init()` de los servlets configurados. La aplicación entra en estado activo y ya puede responder a peticiones HTTP a través del path `/mi-aplicacion`.',
      code: 'INFO: Deployment of web application archive [/usr/local/tomcat/webapps/mi-aplicacion.war] has finished in 1,245 ms\nSTATUS: ACTIVE - URL: http://localhost:8080/mi-aplicacion/',
      codeLang: 'text',
      arrowFlow: { from: 'webxml', to: 'active' }
    }
  ]
}

export default function TomcatVisualizer() {
  const [activeTab, setActiveTab] = useState<VisualizerMode>('request')
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const scenario = activeTab === 'request' ? REQUEST_SCENARIO : DEPLOYMENT_SCENARIO
  const currentStep = scenario.steps[currentStepIndex]

  // Manejar reproducción automática
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < scenario.steps.length - 1) {
            return prev + 1
          } else {
            setIsPlaying(false)
            return prev
          }
        })
      }, 3500)
    }
    return () => clearInterval(timer)
  }, [isPlaying, scenario.steps.length])

  // Reiniciar paso al cambiar de pestaña
  const handleTabChange = (mode: VisualizerMode) => {
    setActiveTab(mode)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  const handleNext = () => {
    if (currentStepIndex < scenario.steps.length - 1) {
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
      {/* Cabecera y Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--igf-border)] pb-4">
        <div>
          <h2 className="font-display text-base font-600 text-[var(--igf-ink)]">
            Visualizador Interactivo de Apache Tomcat
          </h2>
          <p className="text-xs text-[var(--igf-muted)] mt-1">
            Explora de manera visual cómo funciona la arquitectura interna de un servidor de aplicaciones Java.
          </p>
        </div>

        {/* Botones de Modo */}
        <div className="flex bg-[#0d1117] rounded-lg p-1 border border-[var(--igf-border)]">
          <button
            onClick={() => handleTabChange('request')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'request'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] border border-[var(--igf-cyan-dim)] font-600'
                : 'text-[var(--igf-muted)] hover:text-white border border-transparent'
            }`}
          >
            Ruta de Petición HTTP
          </button>
          <button
            onClick={() => handleTabChange('deployment')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'deployment'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] border border-[var(--igf-cyan-dim)] font-600'
                : 'text-[var(--igf-muted)] hover:text-white border border-transparent'
            }`}
          >
            Ciclo de Despliegue WAR
          </button>
        </div>
      </div>

      {/* Explicación Corta del Escenario */}
      <div className="bg-[#090d13] border border-[var(--igf-border)] rounded-lg p-4 flex gap-3 items-start">
        <Info size={16} className="text-[var(--igf-cyan)] shrink-0 mt-0.5" />
        <p className="text-xs text-gray-300 leading-relaxed">
          <span className="font-600 text-[var(--igf-ink)]">{scenario.name}: </span>
          {scenario.description}
        </p>
      </div>

      {/* Área del Diagrama (Nodos del Flujo) */}
      <div className="relative bg-[#0d1117] border border-[var(--igf-border)] rounded-xl py-12 px-4 md:px-8 overflow-hidden min-h-[140px] flex items-center justify-between">
        
        {/* Línea Base de Conexión */}
        <div className="absolute left-[8%] right-[8%] h-0.5 bg-[var(--igf-border)] top-1/2 -translate-y-1/2 z-0" />

        {/* Flujo de Animación (Flecha Móvil) */}
        <AnimatePresence mode="wait">
          {currentStep.arrowFlow && (
            <motion.div
              key={`${activeTab}-${currentStepIndex}`}
              className="absolute h-1 rounded-full bg-[var(--igf-cyan)] z-10 top-1/2 -translate-y-1/2"
              initial={{
                left: `${scenario.positions[currentStep.arrowFlow.from]}%`,
                right: `${100 - scenario.positions[currentStep.arrowFlow.to]}%`
              }}
              animate={{
                left: [
                  `${scenario.positions[currentStep.arrowFlow.from]}%`,
                  `${scenario.positions[currentStep.arrowFlow.to]}%`
                ],
                right: [
                  `${100 - scenario.positions[currentStep.arrowFlow.from]}%`,
                  `${100 - scenario.positions[currentStep.arrowFlow.to]}%`
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
                left: `${Math.min(scenario.positions[currentStep.arrowFlow.from], scenario.positions[currentStep.arrowFlow.to])}%`,
                width: `${Math.abs(scenario.positions[currentStep.arrowFlow.to] - scenario.positions[currentStep.arrowFlow.from])}%`
              }}
            />
          )}
        </AnimatePresence>

        {/* Nodos del Flujo */}
        {scenario.nodes.map(node => {
          const isActive = currentStep.activeNode === node.id
          const NodeIcon = node.icon
          const posPercent = scenario.positions[node.id]

          return (
            <div
              key={node.id}
              className="flex flex-col items-center z-20 relative select-none"
              style={{ width: '12%', left: `calc(${posPercent}% - 6%)`, position: 'absolute' }}
            >
              {/* Contenedor del Icono */}
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

              {/* Etiqueta del Nodo */}
              <span className={`text-[10px] md:text-xs font-sans mt-2 text-center truncate w-full ${isActive ? 'text-[var(--igf-ink)] font-600' : 'text-[var(--igf-muted)]'}`}>
                {node.label}
              </span>

              {/* Sub-descripción flotante o tooltip */}
              {isActive && (
                <div className="absolute top-16 bg-[#21262d] border border-[var(--igf-border)] text-[9px] text-gray-200 px-2 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap z-30 font-mono">
                  {node.desc}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Controles de la Simulación */}
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
            disabled={currentStepIndex === scenario.steps.length - 1}
            className="p-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-gray-300 hover:bg-[#21262d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Siguiente Paso"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-[var(--igf-border)] bg-[#161b22] text-gray-300 hover:bg-[#21262d] transition-colors"
            title="Reiniciar Simulación"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Indicador de Pasos */}
        <span className="text-xs font-mono text-[var(--igf-muted)]">
          Paso {currentStepIndex + 1} de {scenario.steps.length}
        </span>
      </div>

      {/* Sección Informativa: Detalle del Paso + Código Relacionado */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Detalle - 5 Cols */}
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
            <span className="text-[var(--igf-cyan)] font-600">{scenario.nodes.find(n => n.id === currentStep.activeNode)?.label}</span>
          </div>
        </div>

        {/* Código/Fichero - 7 Cols */}
        <div className="md:col-span-7 border border-[var(--igf-border)] rounded-xl p-4 flex flex-col gap-2 bg-[#0d1117]">
          <div className="flex justify-between items-center border-b border-[var(--igf-border)] pb-2">
            <span className="text-[10px] font-mono text-[var(--igf-muted)]">
              {activeTab === 'request' ? 'Configuración o Código Asociado' : 'Consola / Estructura'}
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
