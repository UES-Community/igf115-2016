'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, RefreshCw, ArrowRight, HelpCircle } from 'lucide-react'

export interface Question {
  id: number
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

interface QuizUnitProps {
  questions: Question[]
  unitLabel: string
}

export default function QuizUnit({ questions, unitLabel }: QuizUnitProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const currentQuestion = questions[currentIdx]

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return
    setSelectedOption(idx)
  }

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return
    setIsSubmitted(true)
    if (selectedOption === currentQuestion.answerIndex) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1)
      setSelectedOption(null)
      setIsSubmitted(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handleReset = () => {
    setCurrentIdx(0)
    setSelectedOption(null)
    setIsSubmitted(false)
    setScore(0)
    setQuizComplete(false)
  }

  return (
    <div className="rounded-xl border border-[var(--igf-border)] bg-[var(--igf-surface)] p-6 md:p-8 shadow-xl">
      <div className="flex items-center justify-between border-b border-[var(--igf-border)] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="text-[var(--igf-cyan)]" size={18} />
          <h3 className="font-display text-base font-600 text-[var(--igf-ink)]">
            Autoevaluación Interactiva
          </h3>
        </div>
        <span className="font-mono text-xs text-[var(--igf-muted)] uppercase tracking-wider">
          {unitLabel} — Pregunta {quizComplete ? questions.length : currentIdx + 1}/{questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!quizComplete ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-sans text-sm font-600 text-[var(--igf-ink)] leading-relaxed">
              {currentQuestion.question}
            </h4>

            <div className="flex flex-col gap-2 mt-2">
              {currentQuestion.options.map((option, idx) => {
                let buttonStyle = "border-[var(--igf-border)] bg-[var(--igf-surface-alt)] text-gray-300 hover:bg-[var(--igf-border)]"
                let checkIcon = null

                if (selectedOption === idx) {
                  buttonStyle = "border-[var(--igf-cyan)] bg-[var(--igf-cyan-dim)]/20 text-[var(--igf-cyan)]"
                }

                if (isSubmitted) {
                  if (idx === currentQuestion.answerIndex) {
                    buttonStyle = "border-[var(--igf-green)] bg-[oklch(0.25_0.07_145)]/20 text-[var(--igf-green)] font-500"
                    checkIcon = <CheckCircle2 size={16} className="text-[var(--igf-green)] shrink-0" />
                  } else if (selectedOption === idx) {
                    buttonStyle = "border-[var(--igf-red)] bg-[oklch(0.22_0.08_25)]/20 text-[var(--igf-red)]"
                    checkIcon = <XCircle size={16} className="text-[var(--igf-red)] shrink-0" />
                  } else {
                    buttonStyle = "border-[var(--igf-border)] bg-[var(--igf-surface)] opacity-50 text-[var(--igf-muted)]"
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex items-center justify-between text-left text-xs p-3.5 rounded-lg border transition-all duration-200 ${buttonStyle} ${!isSubmitted ? 'cursor-pointer' : ''}`}
                  >
                    <span>{option}</span>
                    {checkIcon}
                  </button>
                )
              })}
            </div>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-lg bg-[var(--igf-surface-alt)] border border-[var(--igf-border)] text-xs leading-relaxed text-gray-300"
              >
                <p className="font-600 mb-1 flex items-center gap-1.5" style={{ color: selectedOption === currentQuestion.answerIndex ? 'var(--igf-green)' : 'var(--igf-red)' }}>
                  {selectedOption === currentQuestion.answerIndex ? '¡Correcto!' : 'Incorrecto'}
                </p>
                <p>{currentQuestion.explanation}</p>
              </motion.div>
            )}

            <div className="flex justify-end gap-3 mt-6 border-t border-[var(--igf-border)] pt-4">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="px-4 py-2 rounded-lg text-xs font-600 bg-[var(--igf-cyan)] text-[var(--igf-bg)] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Enviar respuesta
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-600 bg-[var(--igf-cyan)] text-[var(--igf-bg)] transition-opacity hover:opacity-90 cursor-pointer"
                >
                  {currentIdx === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                  <ArrowRight size={12} />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-6"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--igf-cyan-dim)]/20 text-[var(--igf-cyan)] mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="font-display text-lg font-600 text-[var(--igf-ink)]">
              ¡Quiz Completado!
            </h4>
            <p className="text-sm text-[var(--igf-muted)] mt-1 max-w-xs">
              Has respondido correctamente {score} de {questions.length} preguntas.
            </p>
            <div className="mt-4 font-mono text-xl font-700 text-[var(--igf-cyan)]">
              {Math.round((score / questions.length) * 100)}% de aciertos
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 mt-8 px-4 py-2 rounded-lg text-xs font-600 border border-[var(--igf-border)] text-gray-200 hover:bg-[var(--igf-surface-alt)] transition-colors cursor-pointer"
            >
              <RefreshCw size={12} /> Volver a intentar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
