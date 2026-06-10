import { Database } from 'lucide-react'
import questions from './data/questions.json'

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pink-100 p-6 text-center text-gray-800">
      <div className="mb-4 flex items-center gap-3">
        <Database className="h-8 w-8 text-pink-400" />
        <h1 className="text-3xl font-semibold">Pregatire Examen SGBD</h1>
      </div>
      <p className="text-gray-600">
        Setup initial gata. {questions.length} grile incarcate din{' '}
        <code className="rounded bg-white/70 px-1.5 py-0.5 text-sm text-pink-600">
          src/data/questions.json
        </code>
      </p>
    </div>
  )
}

export default App
