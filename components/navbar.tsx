'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code2, Menu, X, ChevronDown, BookOpen, Layers, Settings, Coffee, Server, FileCode, Database, Network, Cpu } from 'lucide-react'

const UNITS = [
  {
    id: 'unidad-1',
    label: 'Unidad I',
    title: 'El Software y la Ingeniería del Software',
    icon: Settings,
    href: '/unidades/el-software',
    topics: ['Producto vs Proceso', 'Características de calidad', 'Crisis del software', 'Ciclos de vida'],
  },
  {
    id: 'unidad-2',
    label: 'Unidad II',
    title: 'Arquitectura del Software',
    icon: Layers,
    href: '/unidades/arquitectura',
    topics: ['Principios e importancia', 'Componentes', 'Patrones de diseño', 'Estilos arquitectónicos'],
  },
  {
    id: 'unidad-3',
    label: 'Unidad III',
    title: 'Programación Web en Java',
    icon: Coffee,
    href: '/unidades/prog-web-java',
    topics: ['Arquitecturas cliente-servidor', 'Servlets y JSP', 'Ciclo de petición/respuesta', 'MVC en Java'],
  },
  {
    id: 'unidad-4',
    label: 'Unidad IV',
    title: 'Servidor de Aplicaciones',
    icon: Server,
    href: '/unidades/servidor-aplicaciones',
    topics: ['Servidor web vs de aplicaciones', 'Instalación y Configuración', 'Tomcat server.xml', 'Despliegue WAR'],
  },
  {
    id: 'unidad-5',
    label: 'Unidad V',
    title: 'Java Server Pages',
    icon: FileCode,
    href: '/unidades/java-server-pages',
    topics: ['Ciclo de vida JSP', 'Scriptlets y Expresiones', 'Directivas y Objetos', 'EL y JSTL'],
  },
  {
    id: 'unidad-6',
    label: 'Unidad VI',
    title: 'Motor de Persistencia',
    icon: Database,
    href: '/unidades/motor-persistencia',
    topics: ['Persistencia y ORM', 'Hibernate y JPA', 'Ciclo de vida de entidades', 'Mapeo básico'],
  },
  {
    id: 'unidad-7',
    label: 'Unidad VII',
    title: 'Hibernate Avanzado',
    icon: Network,
    href: '/unidades/hibernate-avanzado',
    topics: ['Asociaciones ORM', 'ManyToMany y tablas unión', 'Estrategias LAZY/EAGER', 'Operaciones Cascade'],
  },
  {
    id: 'unidad-8',
    label: 'Unidad VIII',
    title: 'Framework Spring',
    icon: Cpu,
    href: '/unidades/framework-spring',
    topics: ['Inversión de Control (IoC)', 'Inyección de Dependencias', 'Scopes de Beans', 'Spring Web MVC'],
  },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--igf-border)] bg-[var(--igf-bg)]/90 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="IGF115-2016 — Inicio"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--igf-cyan)] text-[var(--igf-bg)]">
            <BookOpen size={16} strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <span className="block font-display text-sm font-700 text-[var(--igf-ink)] tracking-tight">
              IGF115-2016
            </span>
            <span className="block font-mono text-[10px] text-[var(--igf-muted)] tracking-widest uppercase">
              Ing. del Software
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-md text-sm font-sans transition-colors ${
              pathname === '/'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)]'
                : 'text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface)]'
            }`}
          >
            Inicio
          </Link>

          {/* Unidades dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-sans transition-colors ${
                pathname.startsWith('/unidades')
                  ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)]'
                  : 'text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface)]'
              }`}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              Unidades
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-[520px] rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-3 shadow-2xl">
                <div className="grid grid-cols-2 gap-2">
                  {UNITS.map((unit) => {
                    const Icon = unit.icon
                    return (
                      <Link
                        key={unit.id}
                        href={unit.href}
                        className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-[var(--igf-surface-alt)]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)]">
                          <Icon size={15} />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-widest">
                            {unit.label}
                          </p>
                          <p className="font-display text-sm font-600 text-[var(--igf-ink)] leading-tight">
                            {unit.title}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/editor"
            className={`px-3 py-1.5 rounded-md text-sm font-sans transition-colors ${
              pathname === '/editor'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)]'
                : 'text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface)]'
            }`}
          >
            Editor
          </Link>

          <Link
            href="/visualizaciones"
            className={`px-3 py-1.5 rounded-md text-sm font-sans transition-colors ${
              pathname === '/visualizaciones'
                ? 'bg-[var(--igf-cyan-dim)] text-[var(--igf-cyan)]'
                : 'text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface)]'
            }`}
          >
            Visualizaciones
          </Link>
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/editor"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[var(--igf-cyan)] px-4 py-1.5 text-sm font-sans font-600 text-[var(--igf-bg)] transition-opacity hover:opacity-90"
          >
            <Code2 size={14} />
            Abrir Editor
          </Link>
          <button
            className="flex md:hidden items-center justify-center h-9 w-9 rounded-md border border-[var(--igf-border)] text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--igf-border)] bg-[var(--igf-surface)] md:hidden">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface-alt)] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Inicio
            </Link>
            <p className="px-3 py-1 font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-widest mt-2">
              Unidades
            </p>
            {UNITS.map((unit) => {
              const Icon = unit.icon
              return (
                <Link
                  key={unit.id}
                  href={unit.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[var(--igf-muted)] hover:text-[var(--igf-ink)] hover:bg-[var(--igf-surface-alt)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={14} />
                  <span className="font-mono text-xs text-[var(--igf-muted)]">{unit.label}</span>
                  <span className="text-[var(--igf-ink)]">{unit.title}</span>
                </Link>
              )
            })}
            <Link
              href="/editor"
              className="mt-2 flex items-center gap-2 rounded-md bg-[var(--igf-cyan)] px-3 py-2 text-sm font-600 text-[var(--igf-bg)] transition-opacity hover:opacity-90"
              onClick={() => setMobileOpen(false)}
            >
              <Code2 size={14} />
              Abrir Editor de Código
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export { UNITS }
