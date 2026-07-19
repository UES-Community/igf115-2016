'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Copy, Check, Terminal, FileCode2 } from 'lucide-react'

const TEMPLATES = {
  javascript: [
    {
      name: 'Patrón MVC (Model-View-Controller)',
      code: `// Implementación del Patrón MVC (Model-View-Controller)
class TaskModel {
  constructor() {
    this.tasks = [];
  }
  addTask(title) {
    const task = { id: Date.now(), title, completed: false };
    this.tasks.push(task);
    console.log(\`[Model] Tarea agregada: "\${title}"\`);
    return task;
  }
  getTasks() {
    return this.tasks;
  }
}

class TaskView {
  render(tasks) {
    console.log("--- [View] Renderizando lista de tareas ---");
    tasks.forEach((t, i) => console.log(\`  \${i + 1}. [\${t.completed ? "X" : " "}] \${t.title}\`));
    console.log("------------------------------------------");
  }
}

class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  handleAddTask(title) {
    console.log(\`[Controller] Procesando petición para agregar: "\${title}"\`);
    this.model.addTask(title);
    this.view.render(this.model.getTasks());
  }
}

// Ejecución MVC
const model = new TaskModel();
const view = new TaskView();
const controller = new TaskController(model, view);

controller.handleAddTask("Diseñar arquitectura en capas");
controller.handleAddTask("Configurar servidor Tomcat");
`
    },
    {
      name: 'Patrón Singleton',
      code: `// Implementación del Patrón Singleton (Conexión a Base de Datos)
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      console.log("[Singleton] Retornando instancia existente de la base de datos.");
      return DatabaseConnection.instance;
    }
    this.connectionString = "jdbc:postgresql://localhost:5432/igf115_db";
    this.status = "CONNECTED";
    console.log(\`[Singleton] Nueva conexión establecida a \${this.connectionString}\`);
    DatabaseConnection.instance = this;
  }

  query(sql) {
    console.log(\`[DB Query] Ejecutando SQL: "\${sql}"\`);
  }
}

// Prueba Singleton
const db1 = new DatabaseConnection();
db1.query("SELECT * FROM usuarios");

const db2 = new DatabaseConnection();
console.log("¿db1 === db2?", db1 === db2);
`
    },
    {
      name: 'Patrón Observer',
      code: `// Implementación del Patrón Observer (Manejador de Eventos)
class EventManager {
  constructor() {
    this.listeners = {};
  }
  subscribe(eventType, listener) {
    if (!this.listeners[eventType]) this.listeners[eventType] = [];
    this.listeners[eventType].push(listener);
    console.log(\`[Observer] Suscriptor añadido para evento '\${eventType}'\`);
  }
  notify(eventType, data) {
    console.log(\`[Observer] Notificando evento '\${eventType}'...\`);
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach(l => l(data));
    }
  }
}

const events = new EventManager();
events.subscribe("user_registered", (user) => console.log(\`  -> EmailService: Enviando correo a \${user.email}\`));
events.subscribe("user_registered", (user) => console.log(\`  -> AuditLog: Registrado alta de \${user.username}\`));

events.notify("user_registered", { username: "carlos_ues", email: "carlos@ues.edu.sv" });
`
    }
  ],
  python: [
    {
      name: 'Patrón Factory Method',
      code: `# Implementación del Patrón Factory Method en Python
from abc import ABC, abstractmethod

class Notification(ABC):
    @abstractmethod
    def send(self, message: str):
        pass

class EmailNotification(Notification):
    def send(self, message: str):
        print(f"[Email] Enviando correo: {message}")

class SMSNotification(Notification):
    def send(self, message: str):
        print(f"[SMS] Enviando mensaje de texto: {message}")

class NotificationFactory:
    @staticmethod
    def create_notification(channel: str) -> Notification:
        if channel == "email":
            return EmailNotification()
        elif channel == "sms":
            return SMSNotification()
        raise ValueError(f"Canal desconocido: {channel}")

# Prueba Factory Method
notifier = NotificationFactory.create_notification("email")
notifier.send("Bienvenido a la plataforma IGF115")
`
    },
    {
      name: 'Mapeo ORM Entidad',
      code: `# Simulación de Mapeo de Entidad ORM (Persistencia)
class StudentEntity:
    def __init__(self, carnet: str, nombre: str, carrera: str):
        self.carnet = carnet
        self.nombre = nombre
        self.carrera = carrera
        self._persisted = False

    def save(self):
        # Simulación de sesión Hibernate/JPA
        self._persisted = True
        print(f"[ORM Persistence] Entidad '{self.nombre}' guardada con Carnet '{self.carnet}'")

    def __repr__(self):
        status = "PERSISTED" if self._persisted else "TRANSIENT"
        return f"<Student {self.carnet}: {self.nombre} [{status}]>"

# Simulación Ciclo de Vida ORM
estudiante = StudentEntity("EE16001", "Eduardo Escalante", "Ingeniería de Sistemas")
print("Estado inicial:", estudiante)
estudiante.save()
print("Estado final:", estudiante)
`
    }
  ],
  cpp: [
    {
      name: 'Patrón Singleton C++',
      code: `// Implementación del Patrón Singleton en C++
#include <iostream>
#include <string>

class ApplicationConfig {
private:
    std::string envName;
    static ApplicationConfig* instance;

    ApplicationConfig() : envName("Production (Tomcat Server)") {
        std::cout << "[Singleton C++] Configuración inicializada para " << envName << std::endl;
    }

public:
    static ApplicationConfig* getInstance() {
        if (instance == nullptr) {
            instance = new ApplicationConfig();
        }
        return instance;
    }

    std::string getEnv() const { return envName; }
};

ApplicationConfig* ApplicationConfig::instance = nullptr;

int main() {
    ApplicationConfig* cfg1 = ApplicationConfig::getInstance();
    std::cout << "Config 1 Entorno: " << cfg1->getEnv() << std::endl;

    ApplicationConfig* cfg2 = ApplicationConfig::getInstance();
    std::cout << "Misma instancia: " << (cfg1 == cfg2 ? "SI" : "NO") << std::endl;
    return 0;
}
`
    },
    {
      name: 'Patrón Observer C++',
      code: `// Implementación del Patrón Observer en C++
#include <iostream>
#include <vector>
#include <string>

class IObserver {
public:
    virtual void update(const std::string& message) = 0;
};

class ConcreteObserver : public IObserver {
private:
    std::string name;
public:
    ConcreteObserver(std::string n) : name(n) {}
    void update(const std::string& message) override {
        std::cout << "[Observer C++] " << name << " recibió notificación: " << message << std::endl;
    }
};

int main() {
    ConcreteObserver obs1("ServicioAuditoria");
    ConcreteObserver obs2("ServicioNotificaciones");

    std::vector<IObserver*> observers = { &obs1, &obs2 };
    std::string event = "Despliegue exitoso en Tomcat";

    for (auto obs : observers) {
        obs->update(event);
    }
    return 0;
}
`
    }
  ]
}

type LangType = 'javascript' | 'python' | 'cpp'

export default function EditorPage() {
  const [lang, setLang] = useState<LangType>('javascript')
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0)
  const [code, setCode] = useState(TEMPLATES.javascript[0].code)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'Consola lista. Haz clic en "Ejecutar Código" para ver los resultados (JS).'
  ])
  const [copied, setCopied] = useState(false)

  const handleLangChange = (newLang: LangType) => {
    setLang(newLang)
    setSelectedTemplateIndex(0)
    setCode(TEMPLATES[newLang][0].code)
    if (newLang === 'javascript') {
      setConsoleLogs(['Consola lista. Ejecuta tu código de Javascript aquí.'])
    } else {
      setConsoleLogs([
        `Código de ${newLang === 'python' ? 'Python' : 'C++'} configurado.`,
        'Nota: La ejecución directa en navegador solo está disponible para JavaScript.',
        'Puedes copiar este código e inspeccionar su estructura, o correrlo localmente.'
      ])
    }
  }

  const handleTemplateChange = (index: number) => {
    setSelectedTemplateIndex(index)
    setCode(TEMPLATES[lang][index].code)
    if (lang !== 'javascript') {
      setConsoleLogs([
        `Ejemplo de ${lang === 'python' ? 'Python' : 'C++'} cargado: "${TEMPLATES[lang][index].name}".`,
        'La ejecución interactiva está disponible únicamente para JavaScript.'
      ])
    } else {
      setConsoleLogs(['Listo para ejecutar.'])
    }
  }

  const runCode = () => {
    if (lang !== 'javascript') {
      setConsoleLogs([
        `No se puede ejecutar ${lang === 'python' ? 'Python' : 'C++'} directamente en el navegador.`,
        'Usa JavaScript si quieres probar la ejecución interactiva.',
        'O copia el código para compilarlo/ejecutarlo en tu computadora.'
      ])
      return
    }

    setConsoleLogs([])
    const logs: string[] = []
    
    // Capturar logs de consola
    const originalLog = console.log
    const originalError = console.error
    
    console.log = (...args: any[]) => {
      const formattedArgs = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2)
          } catch {
            return String(arg)
          }
        }
        return String(arg)
      })
      logs.push(formattedArgs.join(' '))
      originalLog(...args)
    }

    console.error = (...args: any[]) => {
      logs.push(`🔴 Error: ${args.join(' ')}`)
      originalError(...args)
    }

    try {
      // Usar Function en lugar de eval directo para aislar levemente el scope
      const userFunc = new Function(code)
      userFunc()
      if (logs.length === 0) {
        logs.push('El código se ejecutó correctamente sin imprimir mensajes en consola.')
      }
    } catch (err: any) {
      logs.push(`🔴 Excepción: ${err.message}`)
    } finally {
      // Restaurar consolas
      console.log = originalLog
      console.error = originalError
      setConsoleLogs(logs)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--igf-bg)] text-[var(--igf-ink)]">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between border-b border-[var(--igf-border)] pb-5">
          <div>
            <span className="font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-widest">
              Área de Práctica
            </span>
            <h1 className="font-display text-2xl font-700 tracking-tight md:text-3xl">
              Editor de Código Interactivo
            </h1>
          </div>
          <p className="text-sm text-[var(--igf-muted)] max-w-md">
            Escribe, modifica y prueba patrones de diseño y conceptos de Ingeniería del Software. JavaScript se ejecuta en tiempo real en tu navegador.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
          {/* Sidebar / Selector - 3 Cols */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-4 flex flex-col gap-4">
              <div>
                <label className="block font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-wider mb-2">
                  1. Lenguaje de Programación
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[var(--igf-bg)] p-1 rounded-lg border border-[var(--igf-border)]">
                  {(['javascript', 'python', 'cpp'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLangChange(l)}
                      className={`py-1.5 px-2 rounded-md text-xs font-mono capitalize transition-all ${
                        lang === l
                          ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)] font-600'
                          : 'text-[var(--igf-muted)] hover:text-[var(--igf-ink)]'
                      }`}
                    >
                      {l === 'cpp' ? 'C++' : l === 'javascript' ? 'JS' : l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-wider mb-2">
                  2. Plantillas Disponibles
                </label>
                <div className="flex flex-col gap-1.5">
                  {TEMPLATES[lang].map((template, idx) => (
                    <button
                      key={template.name}
                      onClick={() => handleTemplateChange(idx)}
                      className={`flex items-center gap-2.5 w-full text-left p-2.5 rounded-lg border transition-all text-xs font-sans ${
                        selectedTemplateIndex === idx
                          ? 'border-[var(--igf-cyan)] bg-[var(--igf-surface-alt)] text-[var(--igf-ink)]'
                          : 'border-[var(--igf-border)] text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface-alt)]'
                      }`}
                    >
                      <FileCode2 size={14} className={selectedTemplateIndex === idx ? 'text-[var(--igf-cyan)]' : ''} />
                      <span className="font-500">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-4 flex flex-col gap-2.5 text-xs text-[var(--igf-muted)] leading-relaxed">
              <span className="font-mono text-[10px] text-[var(--igf-cyan)] uppercase tracking-wider">
                Consejo
              </span>
              <p>
                Puedes usar el editor para experimentar con patrones y principios de arquitectura. Intenta modificar la plantilla de Patrones de Diseño o la simulación MVC para añadir nuevos eventos o métodos.
              </p>
            </div>
          </div>

          {/* Editor and Terminal - 9 Cols */}
          <div className="lg:col-span-9 flex flex-col gap-4 min-h-[500px]">
            {/* Editor Container */}
            <div className="flex-1 flex flex-col rounded-xl border border-[var(--igf-border)] bg-[#1e1e1e] overflow-hidden shadow-xl">
              {/* Editor Bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#2d2d2d] bg-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[var(--igf-red)]" />
                  <span className="h-3 w-3 rounded-full bg-[var(--igf-amber)]" />
                  <span className="h-3 w-3 rounded-full bg-[var(--igf-green)]" />
                  <span className="ml-2 font-mono text-xs text-gray-400 capitalize">
                    main.{lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : 'cpp'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-sans text-gray-400 hover:text-white hover:bg-[#2d2d2d] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-[var(--igf-green)]" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copiar
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={runCode}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--igf-cyan)] text-[var(--igf-bg)] text-xs font-sans font-600 transition-opacity hover:opacity-90 shadow-md"
                  >
                    <Play size={12} fill="currentColor" />
                    Ejecutar Código
                  </button>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 min-h-[350px]">
                <Editor
                  height="100%"
                  language={lang === 'cpp' ? 'cpp' : lang}
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  options={{
                    fontSize: 14,
                    fontFamily: "var(--font-ibm-mono), monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            {/* Virtual Console */}
            <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-4 flex flex-col gap-2 shadow-lg h-44">
              <div className="flex items-center justify-between border-b border-[var(--igf-border)] pb-2 mb-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--igf-muted)]">
                  <Terminal size={14} />
                  <span>Salida de Consola</span>
                </div>
                <button
                  onClick={() => setConsoleLogs(['Consola limpia.'])}
                  className="flex items-center gap-1 text-[10px] font-mono text-[var(--igf-muted)] hover:text-[var(--igf-ink)] transition-colors"
                  title="Limpiar Consola"
                >
                  <RotateCcw size={10} />
                  Limpiar
                </button>
              </div>

              {/* Logs */}
              <div className="flex-1 font-mono text-xs overflow-y-auto flex flex-col gap-1.5 pr-2">
                {consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`whitespace-pre-wrap leading-relaxed ${
                      log.startsWith('🔴')
                        ? 'text-[var(--igf-red)]'
                        : log.startsWith('Consola') || log.startsWith('Código') || log.startsWith('Ejemplo') || log.startsWith('Salida')
                        ? 'text-[var(--igf-muted)]'
                        : 'text-gray-200'
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
