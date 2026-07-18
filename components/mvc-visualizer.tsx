'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Laptop, Server, Database, Settings, Play, Pause, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'

interface Step {
  activeNode: 'client' | 'tomcat' | 'servlet' | 'model' | 'jsp'
  title: string
  description: string
  code: string
  codeLang: string
  arrowFlow?: { from: 'client' | 'tomcat' | 'servlet' | 'model' | 'jsp'; to: 'client' | 'tomcat' | 'servlet' | 'model' | 'jsp' }
}

interface Scenario {
  id: string
  name: string
  description: string
  steps: Step[]
}

const SCENARIOS: Scenario[] = [
  {
    id: 'get-productos',
    name: 'GET /productos (Consulta)',
    description: 'Simula el flujo completo de una petición GET para listar productos utilizando un Servlet como controlador, consultando un Modelo (DAO) y renderizando el resultado en una vista JSP.',
    steps: [
      {
        activeNode: 'client',
        title: 'Inicio: Petición del Cliente',
        description: 'El usuario desea consultar la lista de productos y navega a la URL correspondiente en su navegador. El navegador prepara y envía una solicitud HTTP GET.',
        code: '// Navegador inicia la petición\nGET http://localhost:8080/tienda/productos HTTP/1.1\nHost: localhost:8080\nAccept: text/html',
        codeLang: 'http'
      },
      {
        activeNode: 'tomcat',
        title: 'Fase 1: Intercepción en Tomcat',
        description: 'El contenedor de servlets (Tomcat) recibe la petición HTTP por el puerto 8080, procesa las cabeceras de la solicitud y busca qué recurso coincide con el patrón de la URL.',
        code: '// Tomcat parseando petición...\nURL Solicitada: /productos\nMétodo: GET\nBuscando mapping en web.xml o anotaciones...',
        codeLang: 'text',
        arrowFlow: { from: 'client', to: 'tomcat' }
      },
      {
        activeNode: 'servlet',
        title: 'Fase 2: Ejecución del Servlet (Controlador)',
        description: 'Tomcat mapea la petición a ProductServlet y ejecuta su método doGet(). El Servlet extrae parámetros del request y coordina el flujo de negocio.',
        code: '@WebServlet("/productos")\npublic class ProductServlet extends HttpServlet {\n    protected void doGet(HttpServletRequest request, HttpServletResponse response) \n            throws ServletException, IOException {\n        // El controlador comienza a procesar...',
        codeLang: 'java',
        arrowFlow: { from: 'tomcat', to: 'servlet' }
      },
      {
        activeNode: 'model',
        title: 'Fase 3: Consulta al Modelo (Base de Datos)',
        description: 'El Servlet invoca a la clase de lógica de negocio o acceso a datos (ProductDAO) para recuperar la lista de productos de la base de datos.',
        code: '// Llamada a la capa de persistencia (Modelo)\nProductDAO productDAO = new ProductDAO();\nList<Product> lista = productDAO.obtenerTodos();\n\n// Los datos se retornan en formato de objetos Java (POJOs)',
        codeLang: 'java',
        arrowFlow: { from: 'servlet', to: 'model' }
      },
      {
        activeNode: 'jsp',
        title: 'Fase 4: Redirección Interna (Forward) a JSP (Vista)',
        description: 'El Servlet adjunta la lista de productos al objeto Request como un atributo. Posteriormente, delega la presentación a la vista JSP usando RequestDispatcher.forward().',
        code: '// Guardar datos en el request\nrequest.setAttribute("productos", lista);\n\n// Redirección interna (sin cambiar la URL en el cliente)\nrequest.getRequestDispatcher("/WEB-INF/productos.jsp")\n       .forward(request, response);',
        codeLang: 'java',
        arrowFlow: { from: 'servlet', to: 'jsp' }
      },
      {
        activeNode: 'client',
        title: 'Fase 5: Renderizado y Respuesta HTTP',
        description: 'La página JSP procesa dinámicamente los datos mediante JSTL/EL generando código HTML puro. Tomcat toma este HTML, construye la respuesta HTTP 200 OK y la envía al navegador.',
        code: 'HTTP/1.1 200 OK\nContent-Type: text/html;charset=UTF-8\n\n<!DOCTYPE html>\n<html>\n  <body>\n    <!-- Tabla HTML con los productos generada en el servidor -->\n  </body>\n</html>',
        codeLang: 'html',
        arrowFlow: { from: 'jsp', to: 'client' }
      }
    ]
  },
  {
    id: 'post-agregar',
    name: 'POST /agregar (Acción y Redirección)',
    description: 'Muestra la correcta implementación del patrón Post-Redirect-Get (PRG) en Java Web: procesar datos en un POST y forzar al navegador a redirigirse mediante GET para evitar reenvíos duplicados.',
    steps: [
      {
        activeNode: 'client',
        title: 'Inicio: Envío de Formulario POST',
        description: 'El usuario hace clic en "Agregar al Carrito". El navegador realiza una petición HTTP POST enviando en el cuerpo el ID del producto y la cantidad.',
        code: 'POST http://localhost:8080/tienda/carrito HTTP/1.1\nContent-Type: application/x-www-form-urlencoded\n\nproductoId=105&cantidad=1',
        codeLang: 'http'
      },
      {
        activeNode: 'tomcat',
        title: 'Fase 1: Enrutamiento de Tomcat',
        description: 'Tomcat intercepta el POST, extrae los parámetros codificados del cuerpo del mensaje y delega la ejecución al método doPost() del CartServlet.',
        code: '// Tomcat enruta la petición POST\nServlet Mapeado: CartServlet\nMétodo Ejecutado: doPost()\nParámetros extraídos: productoId=105, cantidad=1',
        codeLang: 'text',
        arrowFlow: { from: 'client', to: 'tomcat' }
      },
      {
        activeNode: 'servlet',
        title: 'Fase 2: Procesamiento del Servlet',
        description: 'El Servlet procesa el POST leyendo los parámetros, obtiene la sesión HTTP del cliente y coordina la modificación del estado.',
        code: 'protected void doPost(HttpServletRequest request, HttpServletResponse response) {\n    int prodId = Integer.parseInt(request.getParameter("productoId"));\n    int cant = Integer.parseInt(request.getParameter("cantidad"));\n    HttpSession session = request.getSession();\n    // ...',
        codeLang: 'java',
        arrowFlow: { from: 'tomcat', to: 'servlet' }
      },
      {
        activeNode: 'model',
        title: 'Fase 3: Modificación del Modelo',
        description: 'El Servlet recupera el carrito de compras de la sesión (o base de datos) e interactúa con el Modelo para añadir el producto seleccionado.',
        code: '// Obtener carrito de la sesión e interactuar con el Modelo\nCarrito carrito = (Carrito) session.getAttribute("carrito");\nif (carrito == null) {\n    carrito = new Carrito();\n}\ncarrito.agregarItem(prodId, cant);\nsession.setAttribute("carrito", carrito);',
        codeLang: 'java',
        arrowFlow: { from: 'servlet', to: 'model' }
      },
      {
        activeNode: 'client',
        title: 'Fase 4: Redirección del Cliente (sendRedirect)',
        description: 'Para implementar Post-Redirect-Get (PRG), el Servlet NO hace forward a una JSP directamente. En su lugar, envía una cabecera de redirección 302 para indicarle al navegador que solicite la vista usando GET.',
        code: '// Envía cabecera HTTP 302 al navegador\nresponse.sendRedirect(request.getContextPath() + "/ver-carrito");\n\n// El navegador recibirá esto y cambiará su URL a /ver-carrito',
        codeLang: 'java',
        arrowFlow: { from: 'servlet', to: 'client' }
      },
      {
        activeNode: 'jsp',
        title: 'Fase 5: Nueva Petición GET y Vista',
        description: 'El navegador realiza de forma transparente una petición HTTP GET /ver-carrito. Tomcat la enruta al servlet correspondiente, el cual ahora sí realiza un forward hacia la JSP para renderizar el carrito actualizado.',
        code: 'GET /tienda/ver-carrito HTTP/1.1\n\n<!-- Tomcat enruta a JSP y genera HTML del carrito actualizado -->\nHTTP/1.1 200 OK\nContent-Type: text/html',
        codeLang: 'html',
        arrowFlow: { from: 'client', to: 'jsp' }
      }
    ]
  },
  {
    id: 'filtro-seguridad',
    name: 'GET /admin/panel (Seguridad con Filtro)',
    description: 'Simula el uso de Filtros en Java Web para interceptar peticiones entrantes. Verifica si hay sesión antes de que la petición llegue al Servlet administrador, denegando acceso si el usuario no está autenticado.',
    steps: [
      {
        activeNode: 'client',
        title: 'Inicio: Acceso a Ruta Protegida',
        description: 'El usuario intenta ingresar directamente a una zona de administración digitando la URL `/admin/dashboard`.',
        code: 'GET http://localhost:8080/tienda/admin/dashboard HTTP/1.1',
        codeLang: 'http'
      },
      {
        activeNode: 'tomcat',
        title: 'Fase 1: Intercepción en Tomcat',
        description: 'Tomcat recibe la petición. En lugar de ir directo al Servlet, verifica la cadena de filtros configurada en el servidor y detecta que `/admin/*` requiere pasar primero por un filtro.',
        code: '// Tomcat detecta filtro mapeado a la URL /admin/*\nFiltro encontrado: AuthFilter\nEjecutando doFilter() en el filtro antes del Servlet...',
        codeLang: 'text',
        arrowFlow: { from: 'client', to: 'tomcat' }
      },
      {
        activeNode: 'servlet',
        title: 'Fase 2: Filtro de Seguridad (AuthFilter)',
        description: 'El AuthFilter intercepta la petición. Examina si existe una sesión activa y si el rol del usuario contiene los permisos necesarios.',
        code: 'public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {\n    HttpServletRequest req = (HttpServletRequest) request;\n    HttpSession session = req.getSession(false); // No crea nueva sesión\n    // ...',
        codeLang: 'java',
        arrowFlow: { from: 'tomcat', to: 'servlet' }
      },
      {
        activeNode: 'client',
        title: 'Fase 3: Acceso Denegado e instrucción 302',
        description: 'El filtro detecta que session == null (usuario no logueado). Aborta la cadena de ejecución (no llama a chain.doFilter) y responde inmediatamente ordenando una redirección al login.',
        code: 'if (session == null || session.getAttribute("usuario") == null) {\n    HttpServletResponse res = (HttpServletResponse) response;\n    // Redirigir a login y cortar el flujo\n    res.sendRedirect(req.getContextPath() + "/login.jsp");\n}',
        codeLang: 'java',
        arrowFlow: { from: 'servlet', to: 'client' }
      },
      {
        activeNode: 'jsp',
        title: 'Fase 4: Carga de la Pantalla de Login',
        description: 'El navegador cambia su URL a `/login.jsp` y solicita este recurso. Tomcat procesa la página JSP pública y sirve el formulario de autenticación.',
        code: 'GET /tienda/login.jsp HTTP/1.1\n\n<!-- Servidor responde el formulario de login -->\nHTTP/1.1 200 OK\nContent-Type: text/html',
        codeLang: 'html',
        arrowFlow: { from: 'client', to: 'jsp' }
      }
    ]
  }
]

const NODES = [
  { id: 'client', label: 'Navegador', icon: Laptop, desc: 'Cliente (Browser)' },
  { id: 'tomcat', label: 'Tomcat', icon: Server, desc: 'Contenedor Web' },
  { id: 'servlet', label: 'Servlet', icon: Settings, desc: 'Controlador' },
  { id: 'model', label: 'Modelo', icon: Database, desc: 'Java Beans / DB' },
  { id: 'jsp', label: 'Vista JSP', icon: Coffee, desc: 'Presentación' }
]

const NODE_POSITIONS: Record<string, number> = {
  client: 10,
  tomcat: 30,
  servlet: 50,
  model: 70,
  jsp: 90
}

export default function MvcVisualizer() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const scenario = SCENARIOS[selectedScenarioIndex]
  const step = scenario.steps[currentStepIndex]

  // Reset steps when scenario changes
  const handleScenarioChange = (idx: number) => {
    setSelectedScenarioIndex(idx)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  // Next / Prev actions
  const handleNext = () => {
    if (currentStepIndex < scenario.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      setIsPlaying(false) // Stop at the end
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleReset = () => {
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  // Auto-play effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentStepIndex < scenario.steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1)
        } else {
          setIsPlaying(false)
        }
      }, 4000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStepIndex, scenario.steps.length])

  return (
    <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 md:p-6 shadow-xl flex flex-col gap-6">
      {/* Title Header */}
      <div className="flex flex-col gap-1 border-b border-[var(--igf-border)] pb-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-[oklch(0.27_0.07_70)] text-[var(--igf-amber)] flex items-center justify-center">
            <Coffee size={14} />
          </div>
          <h3 className="font-display text-sm font-600 text-[var(--igf-ink)]">
            Simulador Interactivo: Ciclo de Peticiones y Arquitectura MVC
          </h3>
        </div>
        <p className="text-xs text-[var(--igf-muted)] leading-relaxed mt-1">
          Visualiza el recorrido y procesamiento de las peticiones HTTP paso a paso dentro del contenedor web Apache Tomcat, los Servlets, las JSPs y la base de datos.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-1 bg-[var(--igf-bg)] p-1 rounded-lg border border-[var(--igf-border)]">
        {SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => handleScenarioChange(idx)}
            className={`flex-1 min-w-[120px] text-center py-1.5 px-3 rounded-md text-[11px] font-mono transition-all ${
              selectedScenarioIndex === idx
                ? 'bg-[oklch(0.27_0.07_70)] text-[var(--igf-amber)] font-600 shadow-sm border border-[oklch(0.40_0.09_70)]'
                : 'text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface-alt)] border border-transparent'
            }`}
          >
            {sc.name}
          </button>
        ))}
      </div>

      {/* Scenario Brief */}
      <div className="bg-[var(--igf-surface-alt)] border border-[var(--igf-border)] rounded-lg p-4 text-xs text-gray-300 leading-relaxed">
        <p>{scenario.description}</p>
      </div>

      {/* Simulation Diagram Area */}
      <div className="relative border border-[var(--igf-border)] bg-[var(--igf-bg)] rounded-xl py-12 px-2 overflow-hidden min-h-[220px] flex items-center">
        {/* Connection Path Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {/* Base inactive connection line */}
          <line
            x1="10%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="var(--igf-border)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />

          {/* Animated active path line */}
          {step.arrowFlow && (
            <g>
              <motion.path
                d={`M ${NODE_POSITIONS[step.arrowFlow.from]}% 50% L ${NODE_POSITIONS[step.arrowFlow.to]}% 50%`}
                stroke="var(--igf-amber)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                key={`${selectedScenarioIndex}-${currentStepIndex}`}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />

              {/* Moving particle */}
              <motion.circle
                r="6"
                fill="var(--igf-amber)"
                initial={{ cx: `${NODE_POSITIONS[step.arrowFlow.from]}%` }}
                animate={{
                  cx: [`${NODE_POSITIONS[step.arrowFlow.from]}%`, `${NODE_POSITIONS[step.arrowFlow.to]}%`]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.0,
                  ease: 'easeInOut'
                }}
                style={{ cy: '50%' }}
              />
            </g>
          )}
        </svg>

        {/* Nodes Grid */}
        <div className="w-full grid grid-cols-5 relative z-10">
          {NODES.map((node) => {
            const IconComponent = node.icon
            const isActive = step.activeNode === node.id

            return (
              <div key={node.id} className="flex flex-col items-center text-center px-1">
                {/* Node Box */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1.0,
                    boxShadow: isActive
                      ? '0 0 20px oklch(0.80 0.15 70 / 0.4), inset 0 0 10px oklch(0.80 0.15 70 / 0.2)'
                      : 'none',
                    borderColor: isActive ? 'var(--igf-amber)' : 'var(--igf-border)'
                  }}
                  transition={{ duration: 0.3 }}
                  className={`h-12 w-12 md:h-16 md:w-16 rounded-xl border flex items-center justify-center transition-colors bg-[var(--igf-surface)] relative ${
                    isActive ? 'bg-[var(--igf-surface-alt)]' : ''
                  }`}
                >
                  <IconComponent
                    size={22}
                    className={`transition-colors duration-300 ${
                      isActive ? 'text-[var(--igf-amber)]' : 'text-[var(--igf-muted)]'
                    }`}
                  />
                  {isActive && (
                    <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-[var(--igf-amber)] rounded-full flex items-center justify-center border-2 border-[var(--igf-bg)]">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--igf-amber)] opacity-75"></span>
                    </span>
                  )}
                </motion.div>

                {/* Node Labels */}
                <span
                  className={`mt-3 text-[10px] md:text-xs font-sans font-600 block transition-colors duration-300 ${
                    isActive ? 'text-[var(--igf-ink)] font-700' : 'text-[var(--igf-muted)]'
                  }`}
                >
                  {node.label}
                </span>
                <span className="text-[8px] md:text-[9px] font-mono text-[var(--igf-muted)] hidden sm:block mt-0.5">
                  {node.desc}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Simulator Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--igf-surface-alt)] border border-[var(--igf-border)] rounded-lg p-3">
        {/* Step Indicator */}
        <div className="text-xs font-mono text-[var(--igf-muted)]">
          Paso <span className="text-[var(--igf-amber)] font-700">{currentStepIndex + 1}</span> de <span className="text-[var(--igf-ink)]">{scenario.steps.length}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReset}
            title="Reiniciar Simulación"
            className="p-2 rounded-lg bg-[var(--igf-bg)] border border-[var(--igf-border)] text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface)] transition-all cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-2 rounded-lg bg-[var(--igf-bg)] border border-[var(--igf-border)] text-[var(--igf-muted)] hover:text-[var(--igf-ink)] disabled:opacity-40 disabled:hover:text-[var(--igf-muted)] disabled:hover:bg-[var(--igf-bg)] transition-all cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-600 transition-all shadow-md cursor-pointer ${
              isPlaying
                ? 'bg-[var(--igf-red)] text-white hover:bg-opacity-90'
                : 'bg-[var(--igf-amber)] text-[var(--igf-bg)] hover:bg-opacity-90 font-700'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={12} fill="currentColor" /> Pausar
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" /> Auto-reproducir
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === scenario.steps.length - 1}
            className="p-2 rounded-lg bg-[var(--igf-bg)] border border-[var(--igf-border)] text-[var(--igf-muted)] hover:text-[var(--igf-ink)] disabled:opacity-40 disabled:hover:text-[var(--igf-muted)] disabled:hover:bg-[var(--igf-bg)] transition-all cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Step Info Panel & Code Viewer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedScenarioIndex}-${currentStepIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch"
        >
          {/* Text Description */}
          <div className="md:col-span-5 rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface-alt)] p-4 flex flex-col gap-2">
            <span className="font-mono text-[9px] text-[var(--igf-amber)] font-600 uppercase tracking-widest">
              {step.title}
            </span>
            <p className="text-xs text-gray-300 leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Formatted Code Block */}
          <div className="md:col-span-7 rounded-xl border border-[var(--igf-border)] bg-[#0d1117] overflow-hidden flex flex-col h-full">
            <div className="bg-[#161b22] px-4 py-2 border-b border-[var(--igf-border)] flex items-center justify-between">
              <span className="font-mono text-[9px] text-[var(--igf-muted)] uppercase tracking-wider">
                {step.codeLang === 'java' ? 'Java Code' : step.codeLang === 'http' ? 'HTTP Request/Response' : 'Server Logs'}
              </span>
              <span className="h-2 w-2 rounded-full bg-[var(--igf-amber)]" />
            </div>
            <pre className="p-4 overflow-x-auto text-[10px] font-mono text-gray-300 leading-relaxed flex-1 whitespace-pre-wrap">
              <code>{step.code}</code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
