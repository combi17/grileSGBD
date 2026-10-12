// Imparte grilele din questions.json in chestionare fixe si scrie src/data/sets.json.
// Foloseste un seed fix, deci rezultatul e reproductibil. Re-rularea cu alt seed
// schimba seturile si invalideaza progresul salvat local.
//
//   node scripts/generate-sets.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const SET_COUNT = 11
const SEED = 0x56bd2026

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const questions = JSON.parse(
  readFileSync(join(root, 'src/data/questions.json'), 'utf8')
)

const rand = mulberry32(SEED)
const ids = questions.map((q) => q.id)
for (let i = ids.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1))
  ;[ids[i], ids[j]] = [ids[j], ids[i]]
}

const base = Math.floor(ids.length / SET_COUNT)
const extra = ids.length % SET_COUNT

const sets = []
let cursor = 0
for (let s = 0; s < SET_COUNT; s++) {
  const size = base + (s < extra ? 1 : 0)
  const questionIds = ids.slice(cursor, cursor + size).sort((a, b) => a - b)
  cursor += size
  sets.push({
    id: s + 1,
    title: `Chestionar ${s + 1}`,
    questionIds,
  })
}

writeFileSync(
  join(root, 'src/data/sets.json'),
  JSON.stringify(sets, null, 2) + '\n'
)

console.log(`Generat ${sets.length} chestionare din ${ids.length} grile:`)
sets.forEach((s) => console.log(`  ${s.title}: ${s.questionIds.length} grile`))
