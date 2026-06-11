import questions from '../data/questions.json'
import sets from '../data/sets.json'

// Index rapid id -> intrebare
const byId = new Map(questions.map((q) => [q.id, q]))

// Chestionarele inghetate, cu intrebarile rezolvate din id-uri.
// Sursa de adevar este sets.json (hardcodat), deci ordinea si continutul
// sunt identice la orice refresh / pe orice calculator.
export const QUIZ_SETS = sets.map((s) => ({
  id: s.id,
  title: s.title,
  questions: s.questionIds.map((id) => byId.get(id)).filter(Boolean),
}))

// Pragul de promovare: jumatate din intrebari, rotunjit in sus.
export function passThresholdFor(size) {
  return Math.ceil(size / 2)
}

// Compara doua multimi (Set) pentru egalitate stricta.
export function setsEqual(a, b) {
  if (a.size !== b.size) return false
  for (const x of a) if (!b.has(x)) return false
  return true
}

// --- Progres salvat local (per calculator) ---
const STORAGE_KEY = 'sgbd-progres-chestionare'

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

// Salveaza rezultatul unui chestionar: { [setId]: { correct, total, passed } }
export function saveProgress(setId, result) {
  try {
    const all = loadProgress()
    all[setId] = result
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    return all
  } catch {
    return loadProgress()
  }
}
