// Extrage `count` intrebari unice, alese aleator (amestec Fisher-Yates).
export function getRandomQuestions(all, count) {
  const arr = [...all]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, Math.min(count, arr.length))
}

// Compara doua multimi (Set) pentru egalitate stricta.
export function setsEqual(a, b) {
  if (a.size !== b.size) return false
  for (const x of a) if (!b.has(x)) return false
  return true
}
