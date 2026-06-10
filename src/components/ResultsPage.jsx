import { useEffect, useState } from 'react'
import { Trophy, Frown, RefreshCw, Home } from 'lucide-react'

export default function ResultsPage({ score, total, passThreshold, onRestart, onMenu }) {
  const passed = score.correct >= passThreshold
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const R = 54
  const C = 2 * Math.PI * R
  const offset = mounted ? C * (1 - score.correct / total) : C

  return (
    <div className="app-bg flex min-h-screen items-center justify-center px-6 py-16">
      <div className="animate-pop-in w-full max-w-md rounded-3xl border border-rose-100 bg-white/85 p-8 text-center shadow-2xl shadow-rose-200/50 backdrop-blur sm:p-10">
        <div
          className={`mx-auto grid h-20 w-20 place-items-center rounded-3xl ${
            passed ? 'bg-emerald-100' : 'bg-rose-100'
          }`}
        >
          {passed ? (
            <Trophy className="h-10 w-10 text-emerald-600" strokeWidth={1.7} />
          ) : (
            <Frown className="h-10 w-10 text-rose-500" strokeWidth={1.7} />
          )}
        </div>

        <h1
          className={`mt-6 font-display text-4xl font-semibold tracking-tight ${
            passed ? 'text-emerald-600' : 'text-rose-500'
          }`}
        >
          {passed ? 'Ai Trecut Examenul' : 'Ai Picat'}
        </h1>

        <p className="mt-2 text-stone-500">
          Ai nevoie de minim {passThreshold} raspunsuri corecte pentru a promova.
        </p>

        {/* Gauge circular cu scorul */}
        <div className="relative mx-auto mt-7 h-36 w-36">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r={R} fill="none" stroke="#fce7f3" strokeWidth="12" />
            <circle
              cx="64"
              cy="64"
              r={R}
              fill="none"
              stroke={passed ? '#10b981' : '#f43f5e'}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-semibold text-stone-800">
              {score.correct}
              <span className="text-2xl text-stone-400">/{total}</span>
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
              corecte
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 text-sm font-semibold">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-600">
            Corecte: {score.correct}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-rose-500">
            Gresite: {score.incorrect}
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onMenu}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-6 py-3.5 font-semibold text-stone-600 transition hover:border-pink-300 hover:text-pink-600"
          >
            <Home className="h-5 w-5" />
            Intoarce-te La Meniu
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="grad-primary inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-semibold text-white shadow-lg shadow-pink-500/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.99]"
          >
            <RefreshCw className="h-5 w-5" />
            Genereaza Test Nou
          </button>
        </div>
      </div>
    </div>
  )
}
