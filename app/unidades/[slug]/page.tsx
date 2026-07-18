import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import NextLink from 'next/link'
import { ArrowLeft, BookOpen, Clock, Activity, Settings, Layers, Coffee, Server, Database } from 'lucide-react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import QuizUnit, { Question } from '@/components/quiz-unit'
import PatternVisualizer from '@/components/pattern-visualizer'
import MvcVisualizer from '@/components/mvc-visualizer'
import TomcatVisualizer from '@/components/tomcat-visualizer'
import JspVisualizer from '@/components/jsp-visualizer'
import PersistenceVisualizer from '@/components/persistence-visualizer'


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
  /** Optional interactive visualizer rendered below the code block */
  visualizerComponent?: React.ComponentType
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
    description: `La arquitectura del software es la estructura de alto nivel de un sistema: define los componentes que lo forman, sus responsabilidades y las relaciones entre ellos. Una arquitectura bien diseñada reduce el costo de mantenimiento, facilita la escalabilidad y guía al equipo de desarrollo durante todo el ciclo de vida del proyecto.

Dos conceptos clave para evaluar la calidad estructural son el acoplamiento (grado de dependencia entre módulos) y la cohesión (grado en que los elementos de un módulo pertenecen lógicamente juntos). El objetivo es maximizar la cohesión interna de cada componente y minimizar el acoplamiento entre ellos, favoreciendo sistemas más robustos y fáciles de probar.

Los patrones de diseño GoF (Gang of Four) son soluciones reutilizables a problemas frecuentes de diseño orientado a objetos. Se clasifican en Creacionales (cómo crear objetos), Estructurales (cómo componer clases) y de Comportamiento (cómo interactúan los objetos). Ejemplos destacados son Singleton, Factory Method, Observer, Decorator y Strategy.

En cuanto a estilos arquitectónicos, la arquitectura en capas (presentación, lógica, datos) sigue siendo el estándar en aplicaciones empresariales Java EE. Los microservicios descomponen el sistema en servicios autónomos que se comunican a través de APIs, mejorando la escalabilidad independiente. La arquitectura basada en eventos (event-driven) utiliza productores y consumidores de mensajes desacoplados, ideal para sistemas de alta concurrencia.`,
    icon: Layers,
    complexity: 'Arquitectura y Componentes',
    duration: '3 Semanas',
    topics: [
      'Principios de la arquitectura de software: rol, atributos de calidad y decisiones de diseño.',
      'Acoplamiento bajo y alta cohesión: métricas y estrategias de refactorización.',
      'Patrones GoF — Creacionales: Singleton, Factory Method, Abstract Factory, Builder.',
      'Patrones GoF — Estructurales y de Comportamiento: Decorator, Adapter, Observer, Strategy.',
      'Estilos arquitectónicos: Capas, Microservicios, Event-Driven y arquitectura hexagonal.',
      'Principios SOLID y su relación con la mantenibilidad y testabilidad del software.'
    ],
    codeTitle: 'Ejemplos: Patrón Singleton y Patrón Observer (Java)',
    codeLang: 'java',
    code: `// ── PATRÓN SINGLETON (Creacional) ──────────────────────────────────
// Garantiza una única instancia global de la clase.
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {
        // Constructor privado: impide la creación externa
    }

    // Thread-safe con doble verificación de bloqueo
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}

// ── PATRÓN OBSERVER (Comportamiento) ───────────────────────────────
// Define dependencia uno-a-muchos; los observadores son notificados
// automáticamente cuando el sujeto cambia de estado.
import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(double price);
}

class StockMarket {
    private final List<Observer> observers = new ArrayList<>();
    private double price;

    public void attach(Observer o) { observers.add(o); }

    public void setPrice(double price) {
        this.price = price;
        notifyObservers();             // Dispara la notificación
    }

    private void notifyObservers() {
        for (Observer o : observers) o.update(price);
    }
}

class PriceDisplay implements Observer {
    @Override
    public void update(double price) {
        System.out.printf("[Display] Nuevo precio: $%.2f%n", price);
    }
}`,
    visualizerComponent: PatternVisualizer,
    quizQuestions: [
      {
        id: 1,
        question: 'En el contexto de la arquitectura del software, ¿qué significa tener un módulo con ALTA cohesión?',
        options: [
          'El módulo depende de muchos otros módulos para realizar sus funciones.',
          'Todos los elementos del módulo están estrechamente relacionados y trabajan hacia un único propósito bien definido.',
          'El módulo expone una gran cantidad de métodos públicos para que otros puedan usarlo.',
          'El módulo comparte su estado interno directamente con los módulos que lo invocan.'
        ],
        answerIndex: 1,
        explanation: 'Alta cohesión significa que los elementos de un módulo están lógicamente relacionados y colaboran para cumplir una única responsabilidad. Es un indicador de buen diseño, ya que facilita la comprensión, prueba y mantenimiento del módulo de forma aislada.'
      },
      {
        id: 2,
        question: '¿Cuál es el principal objetivo del Patrón de Diseño Singleton?',
        options: [
          'Crear familias de objetos relacionados sin especificar sus clases concretas.',
          'Separar la construcción de un objeto complejo de su representación final.',
          'Garantizar que una clase tenga una única instancia y proporcionar un punto de acceso global a ella.',
          'Definir el esqueleto de un algoritmo y permitir que las subclases redefinan ciertos pasos.'
        ],
        answerIndex: 2,
        explanation: 'El Singleton es un patrón Creacional que restringe la instanciación de una clase a un único objeto. Es útil para gestionar recursos compartidos como conexiones a bases de datos, archivos de configuración o caches globales.'
      },
      {
        id: 3,
        question: '¿Qué principio de SOLID establece que una clase debe tener una única razón para cambiar?',
        options: [
          'Open/Closed Principle (OCP)',
          'Liskov Substitution Principle (LSP)',
          'Interface Segregation Principle (ISP)',
          'Single Responsibility Principle (SRP)'
        ],
        answerIndex: 3,
        explanation: 'El Principio de Responsabilidad Única (SRP) indica que cada clase o módulo debe encargarse de una sola parte de la funcionalidad del sistema. Si una clase tiene múltiples responsabilidades, los cambios en una de ellas pueden afectar inesperadamente a las demás.'
      },
      {
        id: 4,
        question: 'En el Patrón Observer, ¿cuál es el rol del objeto llamado "Sujeto" (Subject)?',
        options: [
          'Recibir notificaciones de los observadores cuando ellos cambian de estado.',
          'Mantener el estado relevante y notificar a todos los observadores registrados cuando dicho estado cambia.',
          'Filtrar y transformar los eventos antes de enviarlos a la interfaz de usuario.',
          'Reemplazar al observador cuando este deja de estar disponible en el sistema.'
        ],
        answerIndex: 1,
        explanation: 'El Sujeto (o Publisher) es el objeto que posee el estado de interés. Mantiene una lista de Observadores y los notifica automáticamente cada vez que su estado cambia, implementando así la dependencia uno-a-muchos sin acoplamiento directo.'
      },
      {
        id: 5,
        question: '¿Cuál es la diferencia fundamental entre una arquitectura de microservicios y una arquitectura monolítica?',
        options: [
          'Los microservicios solo pueden ser escritos en lenguaje Java, mientras que los monolitos aceptan cualquier lenguaje.',
          'En una arquitectura monolítica toda la funcionalidad se despliega como una sola unidad, mientras que en microservicios cada función de negocio es un servicio independiente desplegado por separado.',
          'Los microservicios no pueden utilizar bases de datos relacionales, al contrario que los monolitos.',
          'La arquitectura monolítica siempre tiene mejor rendimiento que los microservicios en cualquier escenario de uso.'
        ],
        answerIndex: 1,
        explanation: 'Un monolito es una aplicación donde todos los componentes (UI, lógica de negocio, acceso a datos) están fuertemente integrados en un único artefacto desplegable. Los microservicios descomponen ese sistema en servicios pequeños y autónomos que se comunican mediante APIs, permitiendo despliegues, escalados y actualizaciones independientes por servicio.'
      }
    ]
  },
  'prog-web-java': {
    label: 'Unidad III',
    title: 'Programación Web en Java',
    subtitle: 'Diferentes arquitecturas para la programación y arquitectura de aplicaciones Web.',
    description: `La programación web en la plataforma Java se basa en una sólida arquitectura cliente-servidor, donde el servidor de aplicaciones gestiona los recursos y el ciclo de vida del software. En esta unidad, se introduce el desarrollo web empresarial utilizando tecnologías fundamentales como Java Servlets y JavaServer Pages (JSP), enmarcadas dentro de la especificación Jakarta EE (anteriormente Java EE).

El núcleo del diseño estructurado en esta unidad es el patrón Modelo-Vista-Controlador (MVC). El Controlador, implementado típicamente como un Java Servlet, intercepta las solicitudes del usuario, procesa los parámetros y determina qué acción ejecutar. El Modelo representa los datos y las reglas de negocio (utilizando clases Java estándar, Beans o patrones como DAO). La Vista, implementada mediante páginas JSP, se encarga únicamente de renderizar la respuesta HTML final.

Además del flujo básico de MVC, se analiza el ciclo de vida de un Servlet (compuesto por los métodos init(), service() y destroy()), la gestión de estado conversacional y de sesión a través del objeto HttpSession, y la capacidad de interceptar y filtrar peticiones utilizando filtros servlet (@WebFilter), indispensables para tareas transversales como seguridad, codificación de caracteres y logging.

La adopción de estas arquitecturas y la separación de responsabilidades (separation of concerns) previene la sobrecarga de lógica en la interfaz de usuario, evitando prácticas obsoletas como la mezcla de consultas SQL directas en páginas de presentación JSP, lo que garantiza el desarrollo de aplicaciones web mantenibles, escalables y testeables.`,
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
}`,
    visualizerComponent: MvcVisualizer,
    quizQuestions: [
      {
        id: 1,
        question: 'En una arquitectura web MVC con Java, ¿cuál es la responsabilidad del Servlet?',
        options: [
          'Almacenar permanentemente los datos en la base de datos.',
          'Actuar como controlador, interceptando peticiones, extrayendo parámetros y redirigiendo el flujo.',
          'Renderizar directamente el código HTML con estilos CSS en la pantalla del usuario.',
          'Definir los estilos visuales y la responsividad del sitio web.'
        ],
        answerIndex: 1,
        explanation: 'En el patrón MVC, el Servlet actúa como el Controlador. Es el encargado de recibir la solicitud HTTP del cliente, interactuar con el modelo (si es necesario) y delegar a la vista (JSP) la presentación del resultado.'
      },
      {
        id: 2,
        question: '¿Qué objeto de la API de Servlets permite compartir datos y mantener el estado entre diferentes solicitudes de un mismo usuario?',
        options: [
          'ServletConfig',
          'HttpServletRequest',
          'HttpSession',
          'ServletContext'
        ],
        answerIndex: 2,
        explanation: 'HttpSession representa la sesión del usuario en el servidor. Permite guardar atributos que persisten a lo largo de múltiples peticiones del mismo cliente durante su visita, a diferencia de HttpServletRequest que se destruye tras responder a una petición individual.'
      },
      {
        id: 3,
        question: '¿Qué método del ciclo de vida de un Servlet se ejecuta exactamente una vez cuando el contenedor web carga el Servlet por primera vez?',
        options: [
          'doGet()',
          'service()',
          'init()',
          'destroy()'
        ],
        answerIndex: 2,
        explanation: 'El método init() es llamado por el contenedor de servlets una sola vez tras instanciar la clase del Servlet. Se utiliza para inicializar recursos como conexiones a bases de datos o lectura de configuraciones.'
      },
      {
        id: 4,
        question: 'En un desarrollo web bajo MVC en Java, ¿dónde debería colocarse la lógica de negocio y las consultas SQL?',
        options: [
          'En scripts embebidos <% %> dentro de la página JSP.',
          'En el método init() del Servlet.',
          'En las clases del Modelo (como Java Beans o DAOs).',
          'Directamente en el navegador del cliente usando JavaScript.'
        ],
        answerIndex: 2,
        explanation: 'La lógica de negocio y acceso a datos pertenece enteramente a la capa de Modelo (Beans, DAOs, Entidades, etc.). Poner consultas de base de datos o lógica compleja en Servlets o JSPs acopla el código, reduce su mantenibilidad y viola el patrón MVC.'
      },
      {
        id: 5,
        question: '¿Cuál es la diferencia de comportamiento clave entre RequestDispatcher.forward() y HttpServletResponse.sendRedirect()?',
        options: [
          'forward() se ejecuta en el navegador del cliente; sendRedirect() se procesa en el servidor.',
          'forward() redirige de forma interna en el servidor sin cambiar la URL en el cliente; sendRedirect() devuelve una cabecera 302 forzando al navegador a hacer una nueva solicitud a una URL distinta.',
          'sendRedirect() no puede enviar datos a páginas del mismo dominio, mientras que forward() sí.',
          'No existe ninguna diferencia; ambos métodos realizan la misma redirección interna.'
        ],
        answerIndex: 1,
        explanation: 'El forward es una transferencia de control interna del servidor, transparente al cliente. En cambio, sendRedirect ordena al navegador (vía estado HTTP 302/303) a realizar una petición nueva, lo que actualiza la barra de direcciones del navegador y requiere una ida y vuelta completa.'
      }
    ]
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
           URIEncoding="UTF-8" />`,
    visualizerComponent: TomcatVisualizer,
    quizQuestions: [
      {
        id: 1,
        question: '¿Cuál es la diferencia fundamental entre un Servidor Web y un Servidor de Aplicaciones?',
        options: [
          'Un servidor web solo sirve contenido estático (HTML, CSS, imágenes), mientras que un servidor de aplicaciones puede generar contenido dinámico ejecutando lógica de negocio (servlets, EJB, etc.).',
          'Un servidor web es más rápido que un servidor de aplicaciones para cualquier tipo de recurso.',
          'El servidor de aplicaciones no requiere de un puerto HTTP para funcionar.',
          'Los servidores web solo funcionan en sistemas Linux y los servidores de aplicaciones en Windows.'
        ],
        answerIndex: 0,
        explanation: 'Los servidores web (como Apache HTTP Server o Nginx) están optimizados para servir archivos estáticos. Los servidores de aplicaciones (como Tomcat, GlassFish, WildFly) implementan especificaciones empresariales que permiten ejecutar código del lado del servidor para procesar datos dinámicos.'
      },
      {
        id: 2,
        question: 'En Apache Tomcat, ¿cuál es el propósito del archivo conf/server.xml?',
        options: [
          'Definir los nombres de usuario y contraseñas para ingresar al panel de administración (Manager App).',
          'Configurar la arquitectura y los recursos globales del servidor, como los puertos de escucha (Connectors), motores, hosts y pools de conexiones JDBC.',
          'Establecer la versión de Java Runtime Environment que usará el servidor.',
          'Almacenar el código fuente de los servlets compilados en tiempo de ejecución.'
        ],
        answerIndex: 1,
        explanation: 'server.xml es el archivo de configuración central de Tomcat. Permite definir puertos, protocolos, hosts virtuales (Host), motores de servlets (Engine) y conectores HTTP/AJP.'
      },
      {
        id: 3,
        question: '¿Para qué se utiliza la variable de entorno CATALINA_HOME en una instalación de Tomcat?',
        options: [
          'Para indicar la ruta del compilador de Java (javac).',
          'Para establecer el puerto por defecto en el que escuchará el conector HTTP.',
          'Para apuntar al directorio raíz de la instalación de Tomcat (donde residen los binarios y librerías comunes).',
          'Para guardar la contraseña del usuario administrador.'
        ],
        answerIndex: 2,
        explanation: 'CATALINA_HOME representa el directorio raíz de la instalación de Tomcat, sirviendo de referencia para localizar archivos ejecutables (bin/) y dependencias compartidas (lib/).'
      },
      {
        id: 4,
        question: 'Dentro de la estructura estándar de una aplicación web Java (.war), ¿dónde se ubican las librerías externas (.jar) de las que depende el proyecto?',
        options: [
          'Directamente en la raíz de la aplicación web.',
          'Dentro del directorio WEB-INF/lib/.',
          'En la carpeta WEB-INF/classes/.',
          'En el directorio META-INF/maven/.'
        ],
        answerIndex: 1,
        explanation: 'De acuerdo a la especificación de Servlet de Java, el directorio WEB-INF/lib/ está destinado a almacenar todas las librerías empaquetadas en archivos .jar requeridas por la aplicación en tiempo de ejecución.'
      },
      {
        id: 5,
        question: 'En la arquitectura interna de Tomcat, ¿qué componente representa a una aplicación web de forma individual en ejecución?',
        options: [
          'Connector',
          'Engine',
          'Host',
          'Context'
        ],
        answerIndex: 3,
        explanation: 'El componente Context representa a una aplicación web individual que corre en un host virtual determinado. Cada Context tiene su propio path y carga sus recursos de forma aislada.'
      }
    ]
  },
  'java-server-pages': {
    label: 'Unidad V',
    title: 'Java Server Pages',
    subtitle: 'Ciclo de vida, directivas, elementos sintácticos y objetos implícitos.',
    description: 'JavaServer Pages (JSP) es una tecnología que ayuda a los desarrolladores de software a crear páginas web dinámicas basadas en HTML y XML utilizando Java. Se analiza el ciclo de vida de una página JSP, que consiste en la traducción a un servlet, su compilación, inicialización, procesamiento de solicitudes mediante _jspService() y destrucción. Se abordan los objetos implícitos (request, response, session, out, etc.), directivas de página e inclusión, y el uso del Lenguaje de Expresiones (EL) y JSTL para evitar código Java embebido en la vista.',
    icon: BookOpen,
    complexity: 'JSP y Plantillas',
    duration: '2 Semanas',
    topics: [
      'Ciclo de vida de una página JSP (Traducción, Compilación, Ciclo de Servicio).',
      'Elementos Scripting: Scriptlets (<% %>), Expresiones (<%= %>) y Declaraciones (<%! %>).',
      'Directivas de JSP: page, include y taglib.',
      'Objetos implícitos: request, response, session, application, out, pageContext.',
      'Lenguaje de Expresiones (EL) y Biblioteca de Etiquetas Estándar (JSTL).'
    ],
    codeTitle: 'Ejemplo: Página JSP con JSTL y EL (JSP)',
    codeLang: 'jsp',
    code: `<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Lista de Estudiantes</title>
</head>
<body>
    <h2>Estudiantes Registrados</h2>
    <ul>
        <c:forEach var="estudiante" items="\${estudiantes}">
            <li>\${estudiante.nombre} - Nota: \${estudiante.nota}</li>
        </c:forEach>
    </ul>
</body>
</html>`,
    visualizerComponent: JspVisualizer,
    quizQuestions: [
      {
        id: 1,
        question: '¿Cuál es la primera fase del ciclo de vida de una página JSP en Tomcat?',
        options: [
          'Compilación del archivo .class',
          'Traducción del archivo .jsp a código fuente Java (.java) de un servlet',
          'Ejecución del método _jspService()',
          'Carga de la clase en memoria'
        ],
        answerIndex: 1,
        explanation: 'Antes de compilarse o ejecutarse, el motor Jasper de Tomcat debe traducir el archivo JSP a código fuente de Java (.java) que extiende de HttpJspBase, convirtiéndolo en un Servlet clásico.'
      },
      {
        id: 2,
        question: '¿Cuál es la diferencia sintáctica y funcional entre una Declaración (<%! %>) y un Scriptlet (<% %>) en JSP?',
        options: [
          'No hay diferencia, ambos se insertan dentro del método _jspService().',
          'La Declaración define variables y métodos a nivel de clase (miembros del servlet); el Scriptlet inserta código local dentro del método de servicio _jspService().',
          'El Scriptlet se ejecuta en el navegador del cliente; la Declaración en el servidor.',
          'La Declaración solo acepta variables estáticas y constantes.'
        ],
        answerIndex: 1,
        explanation: 'El código dentro de <%! %> define variables de instancia y métodos de la clase Servlet. En cambio, <% %> define variables locales y código procedimental que corre dentro del método _jspService() por cada petición.'
      },
      {
        id: 3,
        question: '¿Qué objeto implícito de JSP se utiliza para escribir contenido en el cuerpo de la respuesta HTTP?',
        options: [
          'response',
          'out',
          'writer',
          'print'
        ],
        answerIndex: 1,
        explanation: 'out es un objeto de la clase JspWriter provisto automáticamente por el contenedor para escribir contenido dinámico (caracteres) directamente en la respuesta enviada al cliente.'
      },
      {
        id: 4,
        question: '¿Qué directiva de JSP se utiliza para importar librerías de etiquetas personalizadas como JSTL?',
        options: [
          '<%@ page %>',
          '<%@ include %>',
          '<%@ taglib %>',
          '<%@ import %>'
        ],
        answerIndex: 2,
        explanation: 'La directiva <%@ taglib %> declara que la página JSP utiliza un conjunto de etiquetas personalizadas, especificando su URI única y el prefijo para usarlas (ej: prefix="c").'
      },
      {
        id: 5,
        question: '¿Por qué se considera una mala práctica abusar de los Scriptlets (<% %>) en proyectos modernos de Java Web?',
        options: [
          'Porque reducen la velocidad de red de las peticiones.',
          'Porque mezclan lógica de presentación (HTML) con lógica de control/negocio (Java), dificultando el mantenimiento y violando la separación de responsabilidades.',
          'Porque las JSPs modernas no soportan compilación si tienen código Java.',
          'Porque las variables declaradas en scriptlets ocupan demasiada memoria en la base de datos.'
        ],
        answerIndex: 1,
        explanation: 'Mezclar código Java en la vista (HTML) hace el código ilegible, propenso a errores y difícil de mantener. En su lugar, se promueve el uso de MVC, donde el controlador maneja la lógica y la vista JSP usa Lenguaje de Expresiones (EL) y JSTL.'
      }
    ]
  },
  'motor-persistencia': {
    label: 'Unidad VI',
    title: 'Motor de Persistencia',
    subtitle: 'Persistencia objeto-relacional (ORM) en Java EE utilizando Hibernate.',
    description: 'En esta unidad se introduce el concepto de motor de persistencia y el problema del desfase objeto-relacional (impedance mismatch) entre la programación orientada a objetos y las bases de datos relacionales. Se estudia la especificación JPA (Jakarta Persistence API) y Hibernate como proveedor. Se analizan las anotaciones básicas de mapeo (@Entity, @Table, @Id, @Column), las estrategias de generación de claves primarias y, en particular, el ciclo de vida de los estados de una entidad (Transient, Persistent, Detached, Removed) y las operaciones de sesión.',
    icon: Database,
    complexity: 'Hibernate y Bases de Datos',
    duration: '3 Semanas',
    topics: [
      'Concepto de persistencia y el desfase Objeto-Relacional (impedance mismatch).',
      'Arquitectura general de un motor de persistencia (JPA y Hibernate).',
      'Mapeo Objeto-Relacional básico: clases, atributos, llaves primarias y estrategias de generación.',
      'Estados de ciclo de vida de una entidad: Transient, Persistent, Detached y Removed.',
      'Operaciones fundamentales de la interfaz Session: persist, merge, remove, close y flush.'
    ],
    codeTitle: 'Ejemplo: Entidad de Persistencia en JPA / Hibernate (Java)',
    codeLang: 'java',
    code: `import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;

@Entity
@Table(name = "productos")
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;
    
    @Column(name = "precio")
    private Double precio;
    
    // Constructores, Getters y Setters
    public Producto() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
}`,
    visualizerComponent: PersistenceVisualizer,
    quizQuestions: [
      {
        id: 1,
        question: '¿Qué es el "desfase objeto-relacional" (impedance mismatch) en el desarrollo de software?',
        options: [
          'La diferencia de rendimiento entre un servidor web y un motor de base de datos.',
          'Las diferencias conceptuales y técnicas al intentar representar objetos de un lenguaje de programación (como Java) en tablas de una base de datos relacional.',
          'El retraso de tiempo (latencia) al enviar consultas SQL a través de la red.',
          'La incompatibilidad entre las versiones de Hibernate y el conector JDBC.'
        ],
        answerIndex: 1,
        explanation: 'El desfase objeto-relacional se produce porque el paradigma orientado a objetos (clases, herencia, encapsulamiento, polimorfismo) no coincide directamente con el paradigma relacional de las bases de datos (tablas, filas, claves foráneas, normalización).'
      },
      {
        id: 2,
        question: '¿Qué diferencia a la especificación JPA de Hibernate?',
        options: [
          'JPA es un framework de persistencia listo para usar; Hibernate es solo una guía teórica.',
          'JPA es un estándar o especificación (interfaces y reglas); Hibernate es un framework concreto que implementa dicha especificación (proveedor de persistencia).',
          'Hibernate solo funciona con bases de datos NoSQL; JPA solo con bases de datos relacionales.',
          'No hay diferencias, son dos nombres distintos creados por la misma compañía para el mismo producto.'
        ],
        answerIndex: 1,
        explanation: 'Jakarta Persistence (JPA) es la especificación oficial de Java para el mapeo objeto-relacional, definiendo interfaces como EntityManager. Hibernate es una de las implementaciones reales (proveedor de persistencia) más populares de esa especificación.'
      },
      {
        id: 3,
        question: 'Si creamos un objeto mediante "Product p = new Product()", ¿en qué estado del ciclo de vida de JPA se encuentra?',
        options: [
          'Persistent',
          'Detached',
          'Transient',
          'Removed'
        ],
        answerIndex: 2,
        explanation: 'Un objeto recién creado con "new" en Java que aún no ha sido asociado a ningún EntityManager o Session y no posee representación en la base de datos se encuentra en estado Transient (Transitorio).'
      },
      {
        id: 4,
        question: '¿Qué sucede con los cambios realizados en una entidad que se encuentra en estado "Persistent" cuando se confirma (commit) la transacción?',
        options: [
          'Se descartan si no llamamos manualmente a session.update() para cada atributo.',
          'Hibernate detecta automáticamente los cambios (dirty checking) y genera y ejecuta las sentencias SQL UPDATE necesarias en el commit/flush.',
          'La entidad pasa automáticamente a estado Transient para ahorrar memoria.',
          'Se produce un error de concurrencia y la base de datos se bloquea.'
        ],
        answerIndex: 1,
        explanation: 'Una de las grandes ventajas de Hibernate/JPA es que realiza "dirty checking" sobre entidades en estado Persistent. Al finalizar la transacción, el motor compara el estado actual con el original y actualiza de manera automática la base de datos.'
      },
      {
        id: 5,
        question: '¿Qué significa que un objeto se encuentra en estado "Detached"?',
        options: [
          'El objeto se ha eliminado de la base de datos física.',
          'El objeto posee una representación (ID) en la base de datos, pero ya no está asociado a una sesión activa de Hibernate, por lo que sus cambios no serán monitorizados.',
          'El objeto ha perdido todos sus atributos y su valor es null.',
          'El objeto está esperando una conexión TCP para sincronizarse.'
        ],
        answerIndex: 1,
        explanation: 'El estado Detached (Desconectado) indica que el objeto tiene identidad de base de datos (clave primaria) pero ya no pertenece al contexto de persistencia actual (por ejemplo, porque la sesión de Hibernate se cerró).'
      }
    ]
  }
}

export function generateStaticParams() {
  return [
    { slug: 'el-software' },
    { slug: 'arquitectura' },
    { slug: 'prog-web-java' },
    { slug: 'servidor-aplicaciones' },
    { slug: 'java-server-pages' },
    { slug: 'motor-persistencia' }
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

        {/* Pattern Visualizer Section (optional, per-unit) */}
        {unit.visualizerComponent && (
          <div className="mt-4">
            <unit.visualizerComponent />
          </div>
        )}

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
