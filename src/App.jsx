import { useState } from 'react'
import questions from './data/questions.json'
import { getRandomQuestions } from './utils/quiz'
import LandingPage from './components/LandingPage'
import QuizPage from './components/QuizPage'
import ResultsPage from './components/ResultsPage'

const TEST_SIZE = 20
const PASS_THRESHOLD = 10

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [test, setTest] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })

  function startTest() {
    setTest(getRandomQuestions(questions, TEST_SIZE))
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
    if (index + 1 < test.length) setIndex((i) => i + 1)
    else setScreen('results')
  }

  if (screen === 'landing') {
    return (
      <LandingPage
        totalQuestions={questions.length}
        testSize={TEST_SIZE}
        onStart={startTest}
      />
    )
  }

  if (screen === 'quiz') {
    return (
      <QuizPage
        key={index}
        question={test[index]}
        index={index}
        total={test.length}
        score={score}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    )
  }

  return (
    <ResultsPage
      score={score}
      total={test.length}
      passThreshold={PASS_THRESHOLD}
      onRestart={startTest}
      onMenu={() => setScreen('landing')}
    />
  )
}
