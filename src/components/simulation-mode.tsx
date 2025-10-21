"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  CheckCircle,
  XCircle,
  Brain,
  Target,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Trophy,
  Zap,
  BookOpen,
  Timer,
  Star,
  TrendingUp,
  Award,
  Lightbulb,
  X
} from 'lucide-react'

interface Question {
  id: number
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  timeLimit: number
}

interface SimulationResult {
  correct: number
  total: number
  timeSpent: number
  subjectPerformance: { [key: string]: { correct: number; total: number } }
}

interface SimulationModeProps {
  onExit?: () => void
  title?: string
  description?: string
}

export default function SimulationMode({ onExit, title, description }: SimulationModeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [simulationStarted, setSimulationStarted] = useState(false)
  const [totalTime, setTotalTime] = useState(0)

  const questions: Question[] = [
    {
      id: 1,
      subject: "Matemática",
      difficulty: "medium",
      question: "Se x + 2y = 10 e 2x - y = 5, qual é o valor de x?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "Resolvendo o sistema de equações: Da segunda equação: y = 2x - 5. Substituindo na primeira: x + 2(2x - 5) = 10, então x + 4x - 10 = 10, logo 5x = 20, portanto x = 4.",
      timeLimit: 180
    },
    {
      id: 2,
      subject: "Português",
      difficulty: "easy",
      question: "Qual é a função sintática da palavra 'rapidamente' na frase: 'O carro passou rapidamente pela rua'?",
      options: ["Sujeito", "Predicado", "Adjunto adverbial", "Objeto direto"],
      correctAnswer: 2,
      explanation: "'Rapidamente' é um advérbio de modo que modifica o verbo 'passou', exercendo a função de adjunto adverbial de modo.",
      timeLimit: 120
    },
    {
      id: 3,
      subject: "História",
      difficulty: "hard",
      question: "A Revolução Industrial teve início em qual país e século?",
      options: ["França, século XVII", "Inglaterra, século XVIII", "Alemanha, século XIX", "Estados Unidos, século XVIII"],
      correctAnswer: 1,
      explanation: "A Revolução Industrial começou na Inglaterra no século XVIII (por volta de 1760), devido a fatores como disponibilidade de carvão, capital acumulado e inovações tecnológicas.",
      timeLimit: 150
    },
    {
      id: 4,
      subject: "Geografia",
      difficulty: "medium",
      question: "Qual é o maior bioma brasileiro em extensão territorial?",
      options: ["Mata Atlântica", "Cerrado", "Amazônia", "Caatinga"],
      correctAnswer: 2,
      explanation: "A Amazônia é o maior bioma brasileiro, ocupando cerca de 49,29% do território nacional, seguida pelo Cerrado com aproximadamente 23,92%.",
      timeLimit: 90
    },
    {
      id: 5,
      subject: "Física",
      difficulty: "hard",
      question: "Um objeto é lançado verticalmente para cima com velocidade inicial de 20 m/s. Considerando g = 10 m/s², qual a altura máxima atingida?",
      options: ["10 m", "15 m", "20 m", "25 m"],
      correctAnswer: 2,
      explanation: "Usando a equação v² = v₀² - 2gh, onde v = 0 (no ponto mais alto): 0 = 20² - 2(10)h, então 400 = 20h, logo h = 20 m.",
      timeLimit: 200
    }
  ]

  useEffect(() => {
    if (simulationStarted && timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && simulationStarted && !isFinished) {
      handleNextQuestion()
    }
  }, [timeLeft, simulationStarted, isFinished])

  useEffect(() => {
    if (simulationStarted && !isFinished) {
      setTotalTime(prev => prev + 1)
    }
  }, [timeLeft])

  const startSimulation = () => {
    setSimulationStarted(true)
    setAnswers(new Array(questions.length).fill(null))
    setTimeLeft(questions[0].timeLimit)
    setTotalTime(0)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(questions[currentQuestion + 1].timeLimit)
      setShowExplanation(false)
    } else {
      setIsFinished(true)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
      setTimeLeft(questions[currentQuestion - 1].timeLimit)
      setShowExplanation(false)
    }
  }

  const calculateResults = (): SimulationResult => {
    let correct = 0
    const subjectPerformance: { [key: string]: { correct: number; total: number } } = {}

    questions.forEach((question, index) => {
      const subject = question.subject
      if (!subjectPerformance[subject]) {
        subjectPerformance[subject] = { correct: 0, total: 0 }
      }
      subjectPerformance[subject].total++

      if (answers[index] === question.correctAnswer) {
        correct++
        subjectPerformance[subject].correct++
      }
    })

    return {
      correct,
      total: questions.length,
      timeSpent: totalTime,
      subjectPerformance
    }
  }

  const restartSimulation = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setTimeLeft(0)
    setIsFinished(false)
    setShowExplanation(false)
    setSimulationStarted(false)
    setTotalTime(0)
  }

  const handleExit = () => {
    restartSimulation()
    onExit?.()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const simulationTitle = title ?? 'Simulado ENEM'
  const simulationDescription = description ?? 'Teste seus conhecimentos com questões selecionadas'

  if (!simulationStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          {onExit && (
            <div className="flex justify-end mb-4">
              <Button variant="ghost" onClick={handleExit} aria-label="Fechar simulado">
                <X className="w-4 h-4 mr-2" />
                Fechar
              </Button>
            </div>
          )}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl">{simulationTitle}</CardTitle>
              <CardDescription className="text-lg">
                {simulationDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-blue-600">{questions.length}</div>
                  <div className="text-sm text-gray-600">Questões</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Timer className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-green-600">~15 min</div>
                  <div className="text-sm text-gray-600">Duração estimada</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-purple-600">Misto</div>
                  <div className="text-sm text-gray-600">Dificuldade</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Matérias incluídas:</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(questions.map(q => q.subject))).map(subject => (
                    <Badge key={subject} variant="outline" className="px-3 py-1">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Dicas importantes:</span>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Cada questão tem tempo limite individual</li>
                  <li>• Você pode voltar para questões anteriores</li>
                  <li>• Explicações detalhadas serão mostradas no final</li>
                  <li>• Seus resultados serão salvos no seu histórico</li>
                </ul>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6"
                onClick={startSimulation}
              >
                <Brain className="w-5 h-5 mr-2" />
                Iniciar Simulado
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const results = calculateResults()
    const percentage = Math.round((results.correct / results.total) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          {onExit && (
            <div className="flex justify-end mb-4">
              <Button variant="ghost" onClick={handleExit} aria-label="Fechar simulado">
                <X className="w-4 h-4 mr-2" />
                Fechar
              </Button>
            </div>
          )}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl">Simulado Concluído!</CardTitle>
              <CardDescription className="text-lg">
                Veja seu desempenho detalhado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Results */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
                  <div className="text-sm text-gray-600">Taxa de Acerto</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{results.correct}/{results.total}</div>
                  <div className="text-sm text-gray-600">Acertos</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{formatTime(results.timeSpent)}</div>
                  <div className="text-sm text-gray-600">Tempo Total</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">+{results.correct * 10}</div>
                  <div className="text-sm text-gray-600">Pontos Ganhos</div>
                </div>
              </div>

              {/* Subject Performance */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Desempenho por Matéria
                </h3>
                <div className="space-y-3">
                  {Object.entries(results.subjectPerformance).map(([subject, performance]) => {
                    const subjectPercentage = Math.round((performance.correct / performance.total) * 100)
                    return (
                      <div key={subject} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{subject}</span>
                          <span className="text-sm text-gray-600">
                            {performance.correct}/{performance.total} ({subjectPercentage}%)
                          </span>
                        </div>
                        <Progress value={subjectPercentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Question Review */}
              <div>
                <h3 className="font-bold text-lg mb-4">Revisão das Questões</h3>
                <div className="space-y-3">
                  {questions.map((question, index) => {
                    const isCorrect = answers[index] === question.correctAnswer
                    return (
                      <div key={question.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <XCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Questão {index + 1} - {question.subject}</div>
                          <div className="text-sm text-gray-600 truncate">{question.question}</div>
                        </div>
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={restartSimulation}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Fazer Novamente
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Ver Explicações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {onExit && (
          <div className="flex justify-end mb-4">
            <Button variant="ghost" onClick={handleExit} aria-label="Fechar simulado">
              <X className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        )}
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline">
                Questão {currentQuestion + 1} de {questions.length}
              </Badge>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty}
              </Badge>
              <Badge variant="outline">{question.subject}</Badge>
            </div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Clock className="w-5 h-5" />
              <span className={timeLeft <= 30 ? 'text-red-500' : 'text-gray-700'}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedAnswer === index 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-700">
                    {String.fromCharCode(65 + index)}) {option}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}