import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import NextLink from 'next/link'
import { ArrowLeft, BookOpen, Clock, Activity, Settings, Layers, Coffee, Server } from 'lucide-react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import QuizUnit, { Question } from '@/components/quiz-unit'

interface UnitDetail {
  title: string
  label: string
  subtitle: string
  description: string
  icon: any
  complexity: string
  duration: string
  topics: string[]
  codeTitle: string
  codeLang: string
  code: string
  quizQuestions?: Question[]
}

const UNIT_DATA: Record<string, UnitDetail> = {
  'el-software': {
    label: 'Unidad I',
    title: 'El Software y la Ingeniería del Software',
    subtitle: 'Características del software como producto y como proceso.',
    description: 'En esta unidad se sientan las bases conceptuales de la ingeniería del software. Se analiza el software no solo como un programa ejecutable, sino como un producto completo que incluye documentación, configuración de datos y procedimientos. Se explican los modelos clásicos de ciclo de vida del software, tales como el modelo en cascada, el incremental y el espiral, y se aborda el origen histórico de la disciplina debido a la denominada "crisis del software".',
    icon: Settings,
    complexity: 'Fundamentos de IS',
    duration: '2 Semanas',
    topics: [
      'El software visto como producto frente a proceso de desarrollo.',
      'Características fundamentales del software: fiabilidad, mantenibilidad, eficiencia y facilidad de uso.',
      'Crisis del software: orígenes históricos y necesidad de un enfoque de ingeniería.',
      'Modelos clásicos de ciclo de vida del software (Cascada, Incremental, Espiral).',
      'Introducción a la garantía de calidad y métricas de software.'
    ],
    codeTitle: 'Ejemplo: Índice de Mantenibilidad (Python)',
    codeLang: 'python',
    code: `# Cálculo del Índice de Mantenibilidad (MI) simplificado
# MI = 171 - 5.2 * ln(HV) - 0.23 * CC - 16.2 * ln(LOC)
import math

def maintainability_index(halstead_volume, cyclomatic_complexity, loc):
    mi = 171 - 5.2 * math.log(halstead_volume) - 0.23 * cyclomatic_complexity - 16.2 * math.log(loc)
    # Escalar el resultado entre 0 y 100
    return round(max(0, min(100, mi)), 2)

# Ejemplo de uso: módulo con 500 volumen Halstead, complejidad 10 y 200 líneas de código
mi = maintainability_index(500, 10, 200)
print(f"Índice de Mantenibilidad: {mi}")
print(f"Calidad del código: {'Alta' if mi > 65 else 'Aceptable' if mi > 20 else 'Crítica'}")`,
    quizQuestions: [
      {
        id: 1,
        question: "¿Cuál es una característica que distingue al software de otros productos de ingeniería tradicionales como la construcción de un puente?",
        options: [
          "El software se desgasta físicamente con el uso debido al paso del tiempo.",
          "El software se desarrolla o se maqueta, no se manufactura en el sentido clásico.",
          "El software es inmune a los cambios en su entorno operativo.",
          "El software requiere materiales físicos de alta calidad para su correcto funcionamiento."
        ],
        answerIndex: 1,
        explanation: "El software no se desgasta por causas físicas directas sino que se deteriora a medida que sufre modificaciones (entropía de software). Además, se desarrolla de forma lógica y no se fabrica físicamente."
      },
      {
        id: 2,
        question: "¿Qué originó la denominada 'Crisis del Software' a finales de la década de 1960?",
        options: [
          "La falta de computadoras personales en el mercado doméstico.",
          "Un aumento súbito en el costo de los componentes de hardware.",
          "Proyectos que superaban presupuestos, plazos de entrega y producían software poco fiable.",
          "La prohibición gubernamental del desarrollo de sistemas operativos propietarios."
        ],
        answerIndex: 2,
        explanation: "La crisis del software ocurrió porque la potencia del hardware aumentó rápidamente pero las técnicas de programación no avanzaron al mismo ritmo, lo que causó proyectos fuera de presupuesto, retrasados e inestables."
      },
      {
        id: 3,
        question: "En el Modelo en Cascada (Waterfall), ¿cuándo se inicia una fase de desarrollo?",
        options: [
          "Simultáneamente con las demás fases para agilizar la entrega.",
          "Solo cuando la fase previa ha sido completada y validada.",
          "En cualquier momento, dependiendo de la disponibilidad del equipo.",
          "Después de haber desplegado una versión parcial utilizable por el cliente."
        ],
        answerIndex: 1,
        explanation: "El modelo en cascada es secuencial y lineal. Cada fase (requisitos, diseño, codificación, etc.) debe completarse y documentarse antes de avanzar a la siguiente."
      },
      {
        id: 4,
        question: "¿Cuál de los siguientes es un atributo de calidad interna del software según la ingeniería del software?",
        options: [
          "Precio de venta en el mercado de distribución.",
          "Facilidad de mantenimiento (Mantenibilidad).",
          "Número de usuarios simultáneos en la versión beta.",
          "El color predominante de la interfaz de usuario."
        ],
        answerIndex: 1,
        explanation: "La mantenibilidad es un atributo clave de calidad interna del software que indica la facilidad con la que el código puede ser modificado para corregir fallos, mejorar rendimiento o adaptarse a cambios."
      },
      {
        id: 5,
        question: "¿Qué representa el Índice de Mantenibilidad (Maintainability Index) en la calidad del software?",
        options: [
          "El tiempo exacto en horas que tomará corregir un error en producción.",
          "Una métrica compuesta (usualmente de 0 a 100) que estima qué tan fácil es modificar y mantener el código base.",
          "El número total de desarrolladores que han editado el archivo.",
          "El porcentaje de cobertura de pruebas unitarias que tiene el sistema."
        ],
        answerIndex: 1,
        explanation: "El Índice de Mantenibilidad es un valor numérico derivado de otras métricas (Líneas de Código, Complejidad Ciclomática y volumen Halstead) que ayuda a evaluar de forma rápida la mantenibilidad de un archivo o proyecto."
      }
    ]
  },
  'arquitectura': {
    label: 'Unidad II',
    title: 'Arquitectura del Software',
    subtitle: 'Características de la arquitectura, construcción de componentes y utilización de patrones.',
    description: 'Se analizan los principios fundamentales del diseño arquitectónico del software. Los estudiantes aprenden a descomponer sistemas complejos en componentes con alta cohesión y bajo acoplamiento. Se introducen estilos y patrones arquitectónicos comunes, como la arquitectura en capas, microservicios y MVC, que guían la organización global de un sistema de información.',
    icon: Layers,
    complexity: 'Arquitectura y Componentes',
    duration: '3 Semanas',
    topics: [
      'Principios de la arquitectura de software y su rol en el ciclo de vida.',
      'Acoplamiento y cohesión en la construcción de componentes.',
      'Patrones de diseño de software (Creacionales, Estructurales y de Comportamiento).',
      'Estilos arquitectónicos modernos frente a tradicionales.'
    ],
    codeTitle: 'Ejemplo: Patrón Singleton (Java)',
    codeLang: 'java',
    code: `public class DatabaseConnection {
    private static DatabaseConnection instance;

    private DatabaseConnection() {
        // Constructor privado para evitar instanciación externa
    }

    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}`
  },
  'prog-web-java': {
    label: 'Unidad III',
    title: 'Programación Web en Java',
    subtitle: 'Diferentes arquitecturas para la programación y arquitectura de aplicaciones Web.',
    description: 'Esta unidad introduce la infraestructura y patrones necesarios para construir aplicaciones web empresariales. Se examinan las tecnologías clave de la plataforma Java (Servlets, JSP, filtros) y cómo encajan en una arquitectura de tres capas usando el patrón Model-View-Controller (MVC) para separar la interfaz de usuario, la lógica de negocios y la persistencia de datos.',
    icon: Coffee,
    complexity: 'Arquitectura Web',
    duration: '3 Semanas',
    topics: [
      'Arquitecturas cliente-servidor y arquitectura web de múltiples capas.',
      'Protocolo HTTP: peticiones, respuestas y ciclo de vida de la solicitud.',
      'Java Servlets: manejo de peticiones GET/POST y control de sesiones.',
      'JavaServer Pages (JSP) y plantillas para la capa de presentación.',
      'Implementación del patrón Modelo-Vista-Controlador (MVC).'
    ],
    codeTitle: 'Ejemplo: Servlet Controlador en MVC (Java)',
    codeLang: 'java',
    code: `import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/controlador")
public class ControllerServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String action = request.getParameter("action");
        if ("listar".equals(action)) {
            // Lógica de modelo
            request.setAttribute("mensaje", "Lista de productos");
            request.getRequestDispatcher("/productos.jsp").forward(request, response);
        }
    }
}`
  },
  'servidor-aplicaciones': {
    label: 'Unidad IV',
    title: 'Servidor de Aplicaciones',
    subtitle: 'Qué es un servidor web y cómo configurar el servidor de aplicaciones Tomcat.',
    description: 'Los estudiantes aprenderán el funcionamiento de los servidores web y servidores de aplicaciones web. Se detalla el proceso de instalación, configuración y administración del contenedor de servlets Apache Tomcat, incluyendo la estructura de directorios de una aplicación web Java (.war) y la gestión del puerto de escucha y recursos.',
    icon: Server,
    complexity: 'Tomcat y Despliegue',
    duration: '3 Semanas',
    topics: [
      'Diferencias entre servidor web y servidor de aplicaciones.',
      'Arquitectura interna de Apache Tomcat y el archivo server.xml.',
      'Configuración de variables de entorno (JAVA_HOME, CATALINA_HOME).',
      'Estructura del directorio WEB-INF y despliegue de archivos WAR.'
    ],
    codeTitle: 'Ejemplo: Configuración Básica de Puerto en server.xml (XML)',
    codeLang: 'xml',
    code: `<!-- Configuración del puerto HTTP en Tomcat (conf/server.xml) -->
<Connector port="8080" 
           protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" 
           maxThreads="150"
           URIEncoding="UTF-8" />`
  }
}

export function generateStaticParams() {
  return [
    { slug: 'el-software' },
    { slug: 'arquitectura' },
    { slug: 'prog-web-java' },
    { slug: 'servidor-aplicaciones' }
  ]
}

// Para usar con el export estático en Next.js
export default async function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const unit = UNIT_DATA[slug]

  if (!unit) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--igf-bg)] text-[var(--igf-ink)]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="font-display text-2xl font-700 text-[var(--igf-red)]">Unidad no encontrada</h1>
          <p className="text-sm text-[var(--igf-muted)] mt-2">La unidad solicitada no existe en el plan de estudios.</p>
          <NextLink href="/" className="mt-4 text-xs font-mono text-[var(--igf-cyan)] hover:underline">
            Volver al inicio
          </NextLink>
        </main>
        <Footer />
      </div>
    )
  }

  const Icon = unit.icon
  const highlightedCode = hljs.highlight(unit.code, { language: unit.codeLang }).value

  return (
    <div className="flex min-h-screen flex-col bg-[var(--igf-bg)] text-[var(--igf-ink)]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Back Link */}
        <div>
          <NextLink
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--igf-muted)] hover:text-[var(--igf-cyan)] transition-colors"
          >
            <ArrowLeft size={12} />
            Volver a Unidades
          </NextLink>
        </div>

        {/* Hero Section */}
        <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-xl bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] shadow-inner">
            <Icon size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-full bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] px-2.5 py-0.5 font-mono text-[10px] font-700 tracking-wider uppercase">
                {unit.label}
              </span>
            </div>
            <h1 className="font-display text-2xl font-700 tracking-tight md:text-3xl">
              {unit.title}
            </h1>
            <p className="text-sm text-[var(--igf-muted)] mt-1 max-w-xl">
              {unit.subtitle}
            </p>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-4 flex items-center gap-3">
            <BookOpen size={16} className="text-[var(--igf-cyan)]" />
            <div className="text-left">
              <p className="text-[10px] font-mono text-[var(--igf-muted)] uppercase tracking-wider">Duración sugerida</p>
              <p className="text-xs font-sans font-600 text-gray-200">{unit.duration}</p>
            </div>
          </div>
          
          <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-4 flex items-center gap-3">
            <Activity size={16} className="text-[var(--igf-cyan)]" />
            <div className="text-left">
              <p className="text-[10px] font-mono text-[var(--igf-muted)] uppercase tracking-wider">Complejidad usual</p>
              <p className="text-xs font-sans font-600 text-gray-200">{unit.complexity}</p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-4 flex items-center gap-3">
            <Clock size={16} className="text-[var(--igf-cyan)]" />
            <div className="text-left">
              <p className="text-[10px] font-mono text-[var(--igf-muted)] uppercase tracking-wider">Autoevaluación</p>
              <p className="text-xs font-sans font-600 text-gray-200">Disponible en sección inferior</p>
            </div>
          </div>
        </div>

        {/* Content Structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Topics - 5 Cols */}
          <div className="md:col-span-5 rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 flex flex-col gap-4">
            <h2 className="font-display text-sm font-600 text-[var(--igf-ink)] border-b border-[var(--igf-border)] pb-2">
              Temario General
            </h2>
            <ul className="flex flex-col gap-3">
              {unit.topics.map((topic, index) => (
                <li key={index} className="flex gap-2 text-xs text-gray-300 leading-relaxed items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--igf-cyan)] mt-1.5 shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Description + Code - 7 Cols */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Description */}
            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 text-xs text-gray-300 leading-relaxed flex flex-col gap-3">
              <h2 className="font-display text-sm font-600 text-[var(--igf-ink)] border-b border-[var(--igf-border)] pb-2">
                Descripción Didáctica
              </h2>
              <p>{unit.description}</p>
            </div>

            {/* Code Block */}
            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-5 flex flex-col gap-3">
              <h2 className="font-display text-sm font-600 text-[var(--igf-ink)] border-b border-[var(--igf-border)] pb-2">
                {unit.codeTitle}
              </h2>
              <pre className="hljs rounded-lg p-4 overflow-x-auto text-[11px] font-mono bg-[#0d1117] border border-[var(--igf-border)] leading-relaxed">
                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              </pre>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        {unit.quizQuestions && unit.quizQuestions.length > 0 && (
          <div className="mt-4">
            <QuizUnit questions={unit.quizQuestions} unitLabel={unit.label} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
