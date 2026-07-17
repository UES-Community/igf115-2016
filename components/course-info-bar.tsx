import { GraduationCap, Clock, Users, BookMarked } from 'lucide-react'

const INFO_ITEMS = [
  { icon: GraduationCap, label: 'Materia', value: 'Ingeniería del Software' },
  { icon: BookMarked, label: 'Código', value: 'IGF115-2016' },
  { icon: Clock, label: 'Ciclo', value: '2016 — Semestral' },
  { icon: Users, label: 'Área', value: 'Programación & Algoritmos' },
]

export default function CourseInfoBar() {
  return (
    <div className="border-b border-[var(--igf-border)] bg-[var(--igf-surface)]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap items-center divide-x divide-[var(--igf-border)]">
          {INFO_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-2.5 px-4 py-3 first:pl-0 last:pr-0"
              >
                <Icon size={14} className="shrink-0 text-[var(--igf-cyan)]" />
                <div className="leading-tight">
                  <p className="font-mono text-[10px] text-[var(--igf-muted)] uppercase tracking-widest">
                    {item.label}
                  </p>
                  <p className="font-sans text-xs font-500 text-[var(--igf-ink)]">{item.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
