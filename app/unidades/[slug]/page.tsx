import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from '@/components/link' // Wait, does @/components/link exist? No, Next.js Link is imported from 'next/link'
import NextLink from 'next/link'
import { ArrowLeft, BookOpen, Clock, Activity, Code2, Layers, GitBranch, Binary, Zap, Network } from 'lucide-react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

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
}

const UNIT_DATA: Record<string, UnitDetail> = {
  fundamentos: {
    label: 'Unidad I',
    title: 'Fundamentos de Programación',
    subtitle: 'Conceptos clave, recursividad y control de flujo.',
    description: 'En esta unidad se sientan las bases teóricas de la programación estructurada y funcional, con especial énfasis en el concepto de recursión, que es fundamental para el diseño posterior de estructuras de datos no lineales.',
    icon: Code2,
    complexity: 'O(1) — O(n)',
    duration: '2 Semanas',
    topics: [
      'Variables, constantes y tipos de datos primitivos.',
      'Estructuras de control selectivas (if, switch) y repetitivas (for, while).',
      'Funciones: paso de parámetros por valor y por referencia.',
      'Recursividad simple y recursividad mutua o cruzada.',
      'Análisis de la pila de llamadas (Call Stack) en procesos recursivos.'
    ],
    codeTitle: 'Ejemplo: Fibonacci Recursivo vs Iterativo (C++)',
    codeLang: 'cpp',
    code: `// Cálculo recursivo de la serie de Fibonacci con análisis de llamadas
#include <iostream>

int fibonacci(int n) {
    if (n <= 1) {
        return n; // Caso base
    }
    // Llamada recursiva doble
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int n = 6;
    std::cout << "Fibonacci de " << n << " es: " << fibonacci(n) << std::endl;
    return 0;
}`
  },
  lineales: {
    label: 'Unidad II',
    title: 'Estructuras de Datos Lineales',
    subtitle: 'Pilas, colas y listas enlazadas en memoria.',
    description: 'Estudio de las estructuras donde los elementos se organizan de forma secuencial, uno detrás de otro. Se analiza la diferencia entre la representación estática (arreglos) y dinámica (nodos enlazados).',
    icon: Layers,
    complexity: 'O(1) — O(n)',
    duration: '3 Semanas',
    topics: [
      'Arreglos y matrices: Direccionamiento físico en memoria.',
      'Pilas (Stacks): Operaciones Push, Pop, Peek (LIFO).',
      'Colas (Queues): Operaciones Enqueue, Dequeue (FIFO).',
      'Colas circulares y colas de prioridad.',
      'Listas enlazadas simples, dobles y circulares.'
    ],
    codeTitle: 'Ejemplo: Implementación de un Nodo para Lista Simple (JavaScript)',
    codeLang: 'javascript',
    code: `// Nodo de una lista enlazada
class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null; // Enlace al siguiente nodo
  }
}

class ListaEnlazada {
  constructor() {
    this.cabeza = null;
  }

  insertarAlInicio(valor) {
    const nuevo = new Nodo(valor);
    nuevo.siguiente = this.cabeza;
    this.cabeza = nuevo;
  }
}`
  },
  'no-lineales': {
    label: 'Unidad III',
    title: 'Estructuras de Datos No Lineales',
    subtitle: 'Árboles binarios, AVL y organización jerárquica.',
    description: 'Estudio de las estructuras de datos con relaciones jerárquicas o ramificadas. Se hace foco en los árboles binarios de búsqueda y los mecanismos de balanceo para garantizar búsquedas en tiempo logarítmico.',
    icon: GitBranch,
    complexity: 'O(log n) — O(n)',
    duration: '3 Semanas',
    topics: [
      'Árboles generales y terminología (raíz, hojas, altura, nivel).',
      'Árboles Binarios de Búsqueda (BST): Inserción, eliminación y búsquedas.',
      'Recorridos de árboles: Preorden, Inorden y Postorden.',
      'Árboles balanceados: Árboles AVL (Rotaciones simples y dobles).',
      'Montículos (Heaps) y Tries (Árboles de prefijos).'
    ],
    codeTitle: 'Ejemplo: Inserción en un Árbol Binario de Búsqueda (C++)',
    codeLang: 'cpp',
    code: `struct Nodo {
    int dato;
    Nodo* izquierdo;
    Nodo* derecho;
    Nodo(int val) : dato(val), izquierdo(nullptr), derecho(nullptr) {}
};

Nodo* insertar(Nodo* raiz, int dato) {
    if (raiz == nullptr) {
        return new Nodo(dato);
    }
    if (dato < raiz->dato) {
        raiz->izquierdo = insertar(raiz->izquierdo, dato);
    } else {
        raiz->derecho = insertar(raiz->derecho, dato);
    }
    return raiz;
}`
  },
  grafos: {
    label: 'Unidad IV',
    title: 'Grafos y Algoritmos de Redes',
    subtitle: 'Representación de relaciones y caminos óptimos.',
    description: 'Modelado de sistemas complejos y redes mediante vértices y aristas. Se analizan las diferentes representaciones en memoria y los algoritmos fundamentales de exploración y optimización de rutas.',
    icon: Network,
    complexity: 'O(V + E) — O(V²)',
    duration: '3 Semanas',
    topics: [
      'Conceptos fundamentales: Vértices, aristas, grafos dirigidos y no dirigidos.',
      'Representación: Matriz de adyacencia y Lista de adyacencia.',
      'Exploración de grafos: Búsqueda en Anchura (BFS) y en Profundidad (DFS).',
      'Algoritmos de caminos mínimos: Dijkstra, Bellman-Ford y Floyd-Warshall.',
      'Árbol de Expansión Mínima (MST): Algoritmos de Prim y Kruskal.'
    ],
    codeTitle: 'Ejemplo: Exploración BFS usando Lista de Adyacencia (JavaScript)',
    codeLang: 'javascript',
    code: `// Búsqueda en Anchura (BFS) para un Grafo
function bfs(grafo, nodoInicio) {
  const visitados = new Set();
  const cola = [nodoInicio];
  visitados.add(nodoInicio);

  while (cola.length > 0) {
    const actual = cola.shift();
    console.log("Visitando nodo:", actual);

    for (const vecino of grafo[actual]) {
      if (!visitados.has(vecino)) {
        visitados.add(vecino);
        cola.push(vecino);
      }
    }
  }
}`
  },
  ordenamiento: {
    label: 'Unidad V',
    title: 'Algoritmos de Ordenamiento',
    subtitle: 'Métodos iterativos, recursivos y ordenamientos lineales.',
    description: 'Clasificación y análisis de algoritmos para ordenar colecciones de datos. Se estudian comparativamente métodos sencillos frente a métodos avanzados de tipo "divide y vencerás".',
    icon: Binary,
    complexity: 'O(n log n) — O(n²)',
    duration: '2 Semanas',
    topics: [
      'Ordenamientos simples: Burbuja (Bubble), Inserción (Insertion) y Selección (Selection).',
      'Ordenamiento rápido (Quick Sort): Selección de pivote y particionamiento.',
      'Ordenamiento por mezcla (Merge Sort): Fusión recursiva.',
      'Ordenamiento por montículos (Heap Sort).',
      'Algoritmos no comparativos: Counting Sort, Radix Sort.'
    ],
    codeTitle: 'Ejemplo: Partición y Quick Sort (C++)',
    codeLang: 'cpp',
    code: `void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int particion(int arr[], int bajo, int alto) {
    int pivote = arr[alto];
    int i = (bajo - 1);
    for (int j = bajo; j <= alto - 1; j++) {
        if (arr[j] < pivote) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[alto]);
    return (i + 1);
}

void quickSort(int arr[], int bajo, int alto) {
    if (bajo < alto) {
        int pi = particion(arr, bajo, alto);
        quickSort(arr, bajo, pi - 1);
        quickSort(arr, pi + 1, alto);
    }
}`
  },
  complejidad: {
    label: 'Unidad VI',
    title: 'Análisis de Complejidad y Optimización',
    subtitle: 'Notación Big-O, algoritmos Greedy y programación dinámica.',
    description: 'Formalización del análisis asintótico de algoritmos para estimar su consumo de tiempo y memoria. Introducción a estrategias de diseño algorítmico avanzadas.',
    icon: Zap,
    complexity: 'Análisis Asintótico',
    duration: '2 Semanas',
    topics: [
      'Análisis de algoritmos: Tiempo de ejecución en el mejor, peor y promedio caso.',
      'Notación Big-O (asintótica superior), Omega (Ω) y Theta (Θ).',
      'Resolución de recurrencias matemáticas (Teorema Maestro).',
      'Técnicas de diseño: Algoritmos Voraces (Greedy).',
      'Programación Dinámica: Memoización y Tabulación.'
    ],
    codeTitle: 'Ejemplo: Memoización en Fibonacci (JavaScript)',
    codeLang: 'javascript',
    code: `// Cálculo de Fibonacci optimizado con Memoización (O(n) tiempo, O(n) espacio)
const memo = {};

function fibonacciMemo(n) {
  if (n <= 1) return n;
  if (n in memo) return memo[n];
  
  memo[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
  return memo[n];
}

console.log("Fibonacci de 50:", fibonacciMemo(50));`
  }
}

export function generateStaticParams() {
  return [
    { slug: 'fundamentos' },
    { slug: 'lineales' },
    { slug: 'no-lineales' },
    { slug: 'grafos' },
    { slug: 'ordenamiento' },
    { slug: 'complejidad' }
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
              <p className="text-[10px] font-mono text-[var(--igf-muted)] uppercase tracking-wider">Visualizaciones</p>
              <p className="text-xs font-sans font-600 text-gray-200">Disponibles en el visualizador</p>
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
      </main>

      <Footer />
    </div>
  )
}
