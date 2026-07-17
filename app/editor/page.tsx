'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Copy, Check, Terminal, FileCode2 } from 'lucide-react'

const TEMPLATES = {
  javascript: [
    {
      name: 'Pila (Stack)',
      code: `// Implementación de una Pila (Stack) usando un Arreglo
class Stack {
  constructor() {
    this.items = [];
  }

  // Insertar elemento en la pila
  push(element) {
    this.items.push(element);
    console.log("Push: " + element);
  }

  // Retirar elemento de la pila
  pop() {
    if (this.isEmpty()) {
      console.log("Pila vacía (Underflow)");
      return null;
    }
    const removed = this.items.pop();
    console.log("Pop: " + removed);
    return removed;
  }

  // Ver elemento superior
  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  print() {
    console.log("Pila actual: " + this.items.join(" -> "));
  }
}

// Ejecución de prueba
const miPila = new Stack();
miPila.push(10);
miPila.push(20);
miPila.push(30);
miPila.print();
console.log("Elemento superior (peek): " + miPila.peek());
miPila.pop();
miPila.print();
`
    },
    {
      name: 'Cola (Queue)',
      code: `// Implementación de una Cola (Queue) usando un Arreglo
class Queue {
  constructor() {
    this.items = [];
  }

  // Insertar elemento al final de la cola
  enqueue(element) {
    this.items.push(element);
    console.log("Enqueue: " + element);
  }

  // Retirar elemento del inicio de la cola
  dequeue() {
    if (this.isEmpty()) {
      console.log("Cola vacía (Underflow)");
      return null;
    }
    const removed = this.items.shift();
    console.log("Dequeue: " + removed);
    return removed;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  print() {
    console.log("Cola actual: " + this.items.join(" -> "));
  }
}

// Ejecución de prueba
const miCola = new Queue();
miCola.enqueue("Cliente A");
miCola.enqueue("Cliente B");
miCola.enqueue("Cliente C");
miCola.print();
miCola.dequeue();
miCola.print();
`
    },
    {
      name: 'Recursión (Factorial)',
      code: `// Función recursiva para calcular el factorial
function factorial(n) {
  if (n === 0 || n === 1) {
    console.log("Caso base alcanzado: n = " + n + " => Retorna 1");
    return 1;
  }
  console.log("Llamada recursiva: factorial(" + n + ") = " + n + " * factorial(" + (n - 1) + ")");
  const res = n * factorial(n - 1);
  return res;
}

// Ejecución de prueba
const numero = 5;
console.log("Calculando factorial de " + numero + "...");
const resultado = factorial(numero);
console.log("El factorial de " + numero + " es: " + resultado);
`
    }
  ],
  python: [
    {
      name: 'Pila (Stack)',
      code: `# Implementación de una Pila en Python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)
        print(f"Push: {item}")

    def pop(self):
        if self.is_empty():
            print("Pila vacía (Underflow)")
            return None
        removed = self.items.pop()
        print(f"Pop: {removed}")
        return removed

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0

    def __str__(self):
        return " -> ".join(map(str, self.items))

# Ejecución de prueba
pila = Stack()
pila.push(10)
pila.push(20)
print("Pila actual:", pila)
pila.pop()
print("Pila actual:", pila)
`
    },
    {
      name: 'Búsqueda Binaria',
      code: `# Algoritmo de Búsqueda Binaria
def busqueda_binaria(arreglo, objetivo):
    izquierda = 0
    derecha = len(arreglo) - 1

    while izquierda <= derecha:
        medio = (izquierda + derecha) // 2
        print(f"Buscando en rango [{izquierda}, {derecha}], Medio: {medio} (Valor: {arreglo[medio]})")
        
        if arreglo[medio] == objetivo:
            return medio
        elif arreglo[medio] < objetivo:
            izquierda = medio + 1
        else:
            derecha = medio - 1
            
    return -1

# Arreglo ordenado
datos = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
buscado = 23
print(f"Buscar {buscado} en {datos}")
indice = busqueda_binaria(datos, buscado)
print(f"Elemento encontrado en el índice: {indice}")
`
    }
  ],
  cpp: [
    {
      name: 'Pila (Stack) STL',
      code: `// Implementación de Pila con STL en C++
#include <iostream>
#include <stack>

int main() {
    std::stack<int> pila;

    std::cout << "Insertando elementos (Push):" << std::endl;
    pila.push(10);
    std::cout << "Push: 10" << std::endl;
    pila.push(20);
    std::cout << "Push: 20" << std::endl;
    pila.push(30);
    std::cout << "Push: 30" << std::endl;

    std::cout << "\\nElemento superior (top): " << pila.top() << std::endl;

    std::cout << "\\nRetirando elementos (Pop):" << std::endl;
    while (!pila.empty()) {
        std::cout << "Pop: " << pila.top() << std::endl;
        pila.pop();
    }

    return 0;
}
`
    },
    {
      name: 'Bubble Sort',
      code: `// Algoritmo de Ordenamiento Burbuja en C++
#include <iostream>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // Intercambio
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr)/sizeof(arr[0]);
    
    std::cout << "Arreglo original: ";
    for (int i=0; i<n; i++) std::cout << arr[i] << " ";
    std::cout << std::endl;
    
    bubbleSort(arr, n);
    
    std::cout << "Arreglo ordenado: ";
    for (int i=0; i<n; i++) std::cout << arr[i] << " ";
    std::cout << std::endl;
    
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
            Escribe, modifica y prueba implementaciones de estructuras de datos. JavaScript se ejecuta en tiempo real en tu navegador.
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
                Puedes usar el editor para resolver las guías de laboratorio. Intenta modificar el código base de la pila para añadir un método `size()` o un método `clear()`.
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
