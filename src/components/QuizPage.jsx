import { useMemo, useState } from 'react'
import { Check, X, CheckCircle2, XCircle, ArrowRight, ChevronLeft } from 'lucide-react'
import CodeBlock from './CodeBlock'
import { setsEqual } from '../utils/quiz'

export default function QuizPage({ set, question, index, total, score, onAnswer, onNext, onExit }) {
  const [selected, setSelected] = useState(() => new Set())
  const [checked, setChecked] = useState(false)

  const correctIds = useMemo(
    () => new Set(question.options.filter((o) => o.isCorrect).map((o) => o.id)),
    [question]
  )
  const isCorrect = useMemo(
    () => checked && setsEqual(selected, correctIds),
    [checked, selected, correctIds]
  )

  function toggle(id) {
    if (checked) return
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function check() {
    if (selected.size === 0) return
    onAnswer(setsEqual(selected, correctIds))
    setChecked(true)
  }

  const isLast = index + 1 >= total
  const progress = ((index + 1) / total) * 100

  return (
    <div className="app-bg min-h-screen">
      <header className="sticky top-0 z-10 border-b border-rose-100/80 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-5 px-5 py-3.5">
          <button
            type="button"
            onClick={onExit}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-stone-200 bg-white/80 px-3 py-2 text-sm font-medium text-stone-500 transition hover:border-pink-300 hover:text-pink-600"
          >
            <ChevronLeft className="h-4 w-4" />
            Meniu
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-stone-500">
              <span className="font-semibold text-pink-500">{set.title}</span>
              {' · '}Intrebarea <span className="font-semibold text-stone-800">{index + 1}</span> / {total}
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-rose-100">
              <div
                className="grad-primary h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-rose-100 bg-white/80 px-3.5 py-2 text-sm font-semibold shadow-sm">
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Corecte: {score.correct}
            </span>
            <span className="h-4 w-px bg-stone-200" />
            <span className="inline-flex items-center gap-1.5 text-rose-500">
              <XCircle className="h-4 w-4" />
              Gresite: {score.incorrect}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8">
        <div className="animate-fade-up rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-xl shadow-rose-200/40 backdrop-blur sm:p-8">
          <h2 className="font-display text-2xl font-semibold leading-snug text-stone-800">
            {question.text}
          </h2>

          {question.code && <CodeBlock code={question.code} />}

          <p className="mt-5 mb-4 text-sm text-stone-400">
            Selecteaza una sau mai multe variante.
          </p>

          <div className="space-y-3">
            {question.options.map((o, i) => (
              <Option
                key={o.id}
                option={o}
                selected={selected.has(o.id)}
                checked={checked}
                delay={i * 55}
                onClick={() => toggle(o.id)}
              />
            ))}
          </div>

          <div className="mt-7">
            {!checked ? (
              <button
                type="button"
                onClick={check}
                disabled={selected.size === 0}
                className="grad-primary inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-semibold text-white transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                Verifica Raspunsul
              </button>
            ) : (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    isCorrect ? 'text-emerald-600' : 'text-rose-500'
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" /> Raspuns corect!
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" /> Raspuns gresit
                    </>
                  )}
                </span>
                <button
                  type="button"
                  onClick={onNext}
                  className="grad-primary inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-semibold text-white transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
                >
                  {isLast ? 'Vezi Rezultatele' : 'Urmatoarea Intrebare'}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function Option({ option, selected, checked, delay, onClick }) {
  const correct = option.isCorrect
  const multiline = option.text.includes('\n')

  let container =
    'border-stone-200 bg-white hover:border-pink-300 hover:bg-pink-50/60'
  let badge = 'border-stone-300 bg-white text-stone-500'
  let text = 'text-stone-700'
  let status = null

  if (!checked && selected) {
    container = 'border-pink-400 bg-pink-50 ring-1 ring-pink-300'
    badge = 'border-pink-500 bg-pink-500 text-white'
  } else if (checked) {
    if (correct) {
      container = 'border-emerald-400 bg-emerald-50'
      badge = 'border-emerald-500 bg-emerald-500 text-white'
      text = 'text-emerald-900'
      status = <Check className="h-5 w-5 text-emerald-500" />
    } else if (selected) {
      container = 'border-rose-400 bg-rose-50'
      badge = 'border-rose-500 bg-rose-500 text-white'
      text = 'text-rose-900'
      status = <X className="h-5 w-5 text-rose-500" />
    } else {
      container = 'border-stone-200 bg-white opacity-55'
      badge = 'border-stone-300 bg-white text-stone-400'
      text = 'text-stone-500'
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={checked}
      aria-pressed={selected}
      className={`animate-fade-up flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition duration-150 ${container} ${
        checked ? 'cursor-default' : 'cursor-pointer'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-sm font-semibold uppercase transition ${badge}`}
      >
        {option.id}
      </span>
      <span className={`flex-1 leading-relaxed ${text}`}>
        {multiline ? (
          <span className="block whitespace-pre-wrap font-mono text-[13px] leading-relaxed">
            {option.text}
          </span>
        ) : (
          option.text
        )}
      </span>
      {status && <span className="mt-0.5 shrink-0">{status}</span>}
    </button>
  )
}
