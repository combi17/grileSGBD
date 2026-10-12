import questions from '../data/questions.json'
import sets from '../data/sets.json'

// Seturile sunt fixe (sets.json), ca progresul salvat sa ramana valid intre sesiuni.
const byId = new Map(questions.map((q) => [q.id, q]))

export const QUIZ_SETS = sets.map((s) => ({
  id: s.id,
  title: s.title,
  questions: s.questionIds.map((id) => byId.get(id)).filter(Boolean),
}))

export function passThresholdFor(size) {
  return Math.ceil(size / 2)
}

export function setsEqual(a, b) {
  if (a.size !== b.size) return false
  for (const x of a) if (!b.has(x)) return false
  return true
}

const STORAGE_KEY = 'sgbd-progres-chestionare'

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

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
