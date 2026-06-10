import { GraduationCap, Play, Database, ListChecks } from 'lucide-react'

export default function LandingPage({ totalQuestions, testSize, onStart }) {
  return (
    <div className="app-bg flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex max-w-xl flex-col items-center">
        <div
          className="animate-fade-up grid h-20 w-20 place-items-center rounded-3xl border border-rose-200/70 bg-white/70 shadow-lg shadow-rose-200/50 backdrop-blur"
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
          className="animate-fade-up mt-5 text-lg leading-relaxed text-stone-500"
          style={{ animationDelay: '210ms' }}
        >
          Genereaza un test aleatoriu si exerseaza grile de SQL si PL/SQL,
          intr-un stil de scoala de soferi. Mult succes!
        </p>

        <button
          type="button"
          onClick={onStart}
          className="animate-fade-up grad-primary mt-9 inline-flex items-center gap-2.5 rounded-2xl px-9 py-4 text-lg font-semibold text-white shadow-xl shadow-pink-500/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-pink-500/40 active:translate-y-0 active:scale-[0.98]"
          style={{ animationDelay: '290ms' }}
        >
          <Play className="h-5 w-5 fill-current" />
          START
        </button>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-stone-500"
          style={{ animationDelay: '370ms' }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white/60 px-3.5 py-1.5">
            <Database className="h-4 w-4 text-pink-400" />
            {totalQuestions} de grile
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white/60 px-3.5 py-1.5">
            <ListChecks className="h-4 w-4 text-pink-400" />
            {testSize} intrebari pe test
          </span>
        </div>
      </div>
    </div>
  )
}
