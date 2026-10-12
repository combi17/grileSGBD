import { useState } from 'react'
import {
  QUIZ_SETS,
  passThresholdFor,
  loadProgress,
  saveProgress,
} from './utils/quiz'
import LandingPage from './components/LandingPage'
import QuizPage from './components/QuizPage'
import ResultsPage from './components/ResultsPage'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [activeSet, setActiveSet] = useState(null)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [progress, setProgress] = useState(() => loadProgress())

  function startSet(set) {
    setActiveSet(set)
    setIndex(0)
    setScore({ correct: 0, incorrect: 0 })
    setScreen('quiz')
  }

  function handleAnswer(isCorrect) {
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      incorrect: s.incorrect + (isCorrect ? 0 : 1),
    }))
  }

  function handleNext() {
    if (index + 1 < activeSet.questions.length) {
      setIndex((i) => i + 1)
    } else {
      const total = activeSet.questions.length
      const result = {
        correct: score.correct,
        total,
        passed: score.correct >= passThresholdFor(total),
      }
      setProgress(saveProgress(activeSet.id, result))
      setScreen('results')
    }
  }

  function backToMenu() {
    setScreen('landing')
  }

  if (screen === 'landing') {
    return (
      <LandingPage sets={QUIZ_SETS} progress={progress} onSelect={startSet} />
    )
  }

  if (screen === 'quiz') {
    return (
      <QuizPage
        key={index}
        set={activeSet}
        question={activeSet.questions[index]}
        index={index}
        total={activeSet.questions.length}
        score={score}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onExit={backToMenu}
      />
    )
  }

  const total = activeSet.questions.length
  return (
    <ResultsPage
      set={activeSet}
      score={score}
      total={total}
      passThreshold={passThresholdFor(total)}
      onRestart={() => startSet(activeSet)}
      onMenu={backToMenu}
    />
  )
}
