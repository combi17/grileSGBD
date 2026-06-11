import { GraduationCap, Database, ListChecks, Check, RotateCcw, ChevronRight } from 'lucide-react'

export default function LandingPage({ sets, progress, onSelect }) {
  const totalQuestions = sets.reduce((n, s) => n + s.questions.length, 0)
  const doneCount = sets.filter((s) => progress[s.id]).length

  return (
    <div className="app-bg min-h-screen px-6 py-14">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div
          className="animate-fade-up grid h-20 w-20 place-items-center rounded-3xl border border-rose-200/70 bg-white/70 backdrop-blur"
          style={{ animationDelay: '0ms' }}
        >
          <GraduationCap className="h-10 w-10 text-pink-500" strokeWidth={1.7} />
        </div>

        <p
          className="animate-fade-up mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-pink-500"
          style={{ animationDelay: '80ms' }}
        >
          Quiz SGBD Oracle
        </p>

        <h1
          className="animate-fade-up mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-stone-800 sm:text-6xl"
          style={{ animationDelay: '140ms' }}
        >
          Pregatire Examen SGBD
        </h1>

        <p
          className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-stone-500"
          style={{ animationDelay: '210ms' }}
        >
          Alege un chestionar din lista. Fiecare chestionar contine grile unice —
          nu se repeta intre ele. Mult succes!
        </p>

        <div
          className="animate-fade-up mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-stone-500"
          style={{ animationDelay: '290ms' }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white/60 px-3.5 py-1.5">
            <Database className="h-4 w-4 text-pink-400" />
            {totalQuestions} de grile
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white/60 px-3.5 py-1.5">
            <ListChecks className="h-4 w-4 text-pink-400" />
            {sets.length} chestionare
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white/60 px-3.5 py-1.5">
            <Check className="h-4 w-4 text-emerald-500" />
            {doneCount} / {sets.length} facute
          </span>
        </div>
      </div>

      <div
        className="animate-fade-up mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2"
        style={{ animationDelay: '370ms' }}
      >
        {sets.map((set) => (
          <SetCard
            key={set.id}
            set={set}
            result={progress[set.id]}
            onClick={() => onSelect(set)}
          />
        ))}
      </div>
    </div>
  )
}

function SetCard({ set, result, onClick }) {
  const done = Boolean(result)
  const passed = done && result.passed

  let ring = 'border-stone-200 hover:border-pink-300'
  let numBox = 'border-stone-200 bg-stone-50 text-stone-500'
  if (done) {
    ring = passed
      ? 'border-emerald-200 hover:border-emerald-300'
      : 'border-rose-200 hover:border-rose-300'
    numBox = passed
      ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
      : 'border-rose-200 bg-rose-50 text-rose-500'
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-4 rounded-2xl border bg-white/80 p-4 text-left backdrop-blur transition hover:-translate-y-0.5 ${ring}`}
    >
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border font-display text-xl font-semibold ${numBox}`}
      >
        {set.id}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-stone-800">{set.title}</span>
        <span className="block text-sm text-stone-400">
          {set.questions.length} grile
        </span>
      </span>

      {done ? (
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
            passed
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-500'
          }`}
        >
          {passed ? <Check className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
          {result.correct}/{result.total}
        </span>
      ) : (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-pink-50 px-3 py-1.5 text-sm font-semibold text-pink-500">
          Start
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      )}
    </button>
  )
}
