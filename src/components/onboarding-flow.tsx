"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Sparkles,
  PartyPopper,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Award,
  CheckCircle,
  ArrowRight,
  CreditCard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface OnboardingData {
  answers: string[]
}

interface LoginData {
  email: string
  password: string
  confirmPassword: string
  name: string
}

interface StudyPlan {
  hoursPerDay: number
  daysPerWeek: number
  totalWeeksToGoal: number
  totalHours: number
  goalDate: string
  weeklyHours: number
  monthlyHours: number
}

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showAuth, setShowAuth] = useState(false)
  const [showPlan, setShowPlan] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  
  const [data, setData] = useState<OnboardingData>({
    answers: []
  })

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })

  const questions = [
    {
      id: 1,
      question: "O que mais te atrapalha na hora de estudar?",
      options: [
        "Procrastinação",
        "Falta de motivação", 
        "Falta de tempo",
        "Cansaço ou falta de energia"
      ]
    },
    {
      id: 2,
      question: "Qual seu maior objetivo com os estudos?",
      options: [
        "Passar em um concurso público",
        "Entrar em faculdade (ENEM/FATEC)",
        "Melhorar desempenho geral",
        "Desenvolver habilidades específicas"
      ]
    },
    {
      id: 3,
      question: "Quantas horas pretende estudar por dia?",
      options: [
        "Menos de 1 hora",
        "1 a 2 horas",
        "2 a 4 horas",
        "Mais de 4 horas"
      ]
    },
    {
      id: 4,
      question: "Quantos dias por semana pretende estudar?",
      options: [
        "1 a 2 dias",
        "3 a 4 dias",
        "5 a 6 dias",
        "Todos os dias"
      ]
    },
    {
      id: 5,
      question: "Qual a sua maior dificuldade em manter o foco?",
      options: [
        "Distrações do celular",
        "Falta de organização",
        "Cansaço mental",
        "Outros"
      ]
    },
    {
      id: 6,
      question: "Qual seu nível de conhecimento atual nas matérias que quer estudar?",
      options: [
        "Básico",
        "Intermediário",
        "Avançado",
        "Mistura de níveis"
      ]
    },
    {
      id: 7,
      question: "Como prefere aprender?",
      options: [
        "Resumindo em tópicos",
        "Assistindo videoaulas",
        "Fazendo exercícios e simulados",
        "Leituras detalhadas"
      ]
    },
    {
      id: 8,
      question: "Você prefere estudar sozinho ou com orientação?",
      options: [
        "Sozinho",
        "Com mentor ou professor",
        "Alternando entre os dois"
      ]
    },
    {
      id: 9,
      question: "Você já tentou algum método de estudo antes?",
      options: [
        "Sim, e funcionou bem",
        "Sim, mas não deu certo",
        "Não, nunca tentei métodos específicos"
      ]
    },
    {
      id: 10,
      question: "Qual é seu principal motivador para estudar?",
      options: [
        "Carreira profissional",
        "Aprovação em concurso",
        "Desenvolvimento pessoal",
        "Pressão familiar ou social"
      ]
    },
    {
      id: 11,
      question: "Qual tipo de conteúdo você prefere no estudo?",
      options: [
        "Teórico/explicativo",
        "Prático/exercícios",
        "Misturado"
      ]
    },
    {
      id: 12,
      question: "Qual é o seu nível de disciplina nos estudos?",
      options: [
        "Muito disciplinado",
        "Médio",
        "Preciso de incentivo"
      ]
    },
    {
      id: 13,
      question: "Você costuma estudar com interrupções frequentes?",
      options: [
        "Sim, muitas vezes",
        "Às vezes",
        "Raramente"
      ]
    },
    {
      id: 14,
      question: "Como se sente em relação ao tempo de estudo disponível?",
      options: [
        "Suficiente",
        "Limitado",
        "Muito pouco"
      ]
    },
    {
      id: 15,
      question: "Você prefere estudar de manhã, tarde ou noite?",
      options: [
        "Manhã",
        "Tarde",
        "Noite",
        "Variável"
      ]
    },
    {
      id: 16,
      question: "Qual sua meta de aprovação?",
      options: [
        "Curto prazo (menos de 6 meses)",
        "Médio prazo (6 a 12 meses)",
        "Longo prazo (mais de 12 meses)"
      ]
    },
    {
      id: 17,
      question: "Você gostaria de receber dicas de estudo personalizadas?",
      options: [
        "Sim, sempre",
        "Apenas algumas vezes",
        "Não"
      ]
    },
    {
      id: 18,
      question: "Você se sente motivado a completar planos de estudo?",
      options: [
        "Muito motivado",
        "Às vezes motivado",
        "Preciso de acompanhamento"
      ]
    },
    {
      id: 19,
      question: "Você tem interesse em simulados e correções automáticas?",
      options: [
        "Sim, quero todos",
        "Só alguns",
        "Não"
      ]
    },
    {
      id: 20,
      question: "Qual concurso você deseja focar inicialmente?",
      options: [
        "ENEM",
        "FATEC",
        "TJ",
        "PM",
        "Outro"
      ]
    }
  ]

  const totalSteps = questions.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const motivationalMessages = [
    "Estamos criando seu plano personalizado...",
    "87% dos usuários com perfil similar obtiveram aprovação",
    "Seu cronograma está sendo otimizado para seus objetivos",
    "Identificando as melhores estratégias para você",
    "Preparando conteúdo adaptado ao seu nível"
  ]

  const calculateStudyPlan = (): StudyPlan => {
    const hoursAnswer = data.answers[2] // "Quantas horas pretende estudar por dia?"
    const daysAnswer = data.answers[3] // "Quantos dias por semana pretende estudar?"
    const goalAnswer = data.answers[15] // "Qual sua meta de aprovação?"

    // Converter respostas em números
    let hoursPerDay = 2
    if (hoursAnswer === "Menos de 1 hora") hoursPerDay = 0.5
    else if (hoursAnswer === "1 a 2 horas") hoursPerDay = 1.5
    else if (hoursAnswer === "2 a 4 horas") hoursPerDay = 3
    else if (hoursAnswer === "Mais de 4 horas") hoursPerDay = 5

    let daysPerWeek = 5
    if (daysAnswer === "1 a 2 dias") daysPerWeek = 1.5
    else if (daysAnswer === "3 a 4 dias") daysPerWeek = 3.5
    else if (daysAnswer === "5 a 6 dias") daysPerWeek = 5.5
    else if (daysAnswer === "Todos os dias") daysPerWeek = 7

    let totalWeeksToGoal = 26 // 6 meses padrão
    if (goalAnswer === "Curto prazo (menos de 6 meses)") totalWeeksToGoal = 20
    else if (goalAnswer === "Médio prazo (6 a 12 meses)") totalWeeksToGoal = 39
    else if (goalAnswer === "Longo prazo (mais de 12 meses)") totalWeeksToGoal = 52

    const weeklyHours = hoursPerDay * daysPerWeek
    const monthlyHours = weeklyHours * 4.33
    const totalHours = weeklyHours * totalWeeksToGoal

    // Calcular data do objetivo
    const today = new Date()
    const goalDate = new Date(today.getTime() + (totalWeeksToGoal * 7 * 24 * 60 * 60 * 1000))
    const goalDateString = goalDate.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    })

    return {
      hoursPerDay,
      daysPerWeek,
      totalWeeksToGoal,
      totalHours,
      goalDate: goalDateString,
      weeklyHours,
      monthlyHours
    }
  }

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleContinue = () => {
    if (!selectedAnswer) return

    const newAnswers = [...data.answers]
    newAnswers[currentStep] = selectedAnswer
    setData({ answers: newAnswers })

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedAnswer(null)
    } else {
      // Mostrar celebração
      setShowCelebration(true)
      setTimeout(() => {
        setShowCelebration(false)
        setShowAuth(true)
      }, 2000)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setSelectedAnswer(data.answers[currentStep - 1] || null)
    }
  }

  const handleAuth = () => {
    // Validação básica
    if (authMode === 'register') {
      if (!loginData.name || !loginData.email || !loginData.password || !loginData.confirmPassword) {
        alert('Por favor, preencha todos os campos')
        return
      }
      if (loginData.password !== loginData.confirmPassword) {
        alert('As senhas não coincidem')
        return
      }
    } else {
      if (!loginData.email || !loginData.password) {
        alert('Por favor, preencha email e senha')
        return
      }
    }

    // Simular autenticação bem-sucedida
    console.log('Dados do formulário:', data)
    console.log('Dados de login:', loginData)
    
    // Mostrar plano de estudo
    setShowAuth(false)
    setShowPlan(true)
  }

  const handleGoogleAuth = () => {
    // Simular autenticação com Google
    console.log('Autenticação com Google')
    setShowAuth(false)
    setShowPlan(true)
  }

  const handlePaymentPlan = (planName: string) => {
    // Simular seleção de plano e redirecionar para simulados
    console.log('Plano selecionado:', planName)
    
    // Redirecionar para página de simulados
    window.location.href = '/simulados'
  }

  const renderCelebration = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="text-8xl animate-bounce">🎉</div>
          <h2 className="text-4xl font-bold text-green-800">Parabéns!</h2>
          <p className="text-xl text-green-700">Seu perfil foi criado com sucesso!</p>
          <div className="flex justify-center space-x-4 text-4xl">
            <span className="animate-pulse">🎊</span>
            <span className="animate-bounce">✨</span>
            <span className="animate-pulse">🎉</span>
          </div>
        </div>
      </div>
    )
  }

  const renderPaymentScreen = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Gabarita</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Escolha seu Plano</h1>
            <p className="text-gray-600">Selecione o plano ideal para sua jornada de aprovação</p>
          </div>

          {/* Planos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Plano Semanal */}
            <Card className="relative border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Semanal</CardTitle>
                <CardDescription>Experimente por 1 semana</CardDescription>
                <div className="text-3xl font-bold text-blue-600">R$ 14,90</div>
                <div className="text-sm text-gray-500">por semana</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Acesso completo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Simulados ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Correção automática
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Modo foco
                  </li>
                </ul>
                <Button 
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePaymentPlan('Semanal')}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            {/* Plano Mensal */}
            <Card className="relative border-2 border-blue-300 hover:border-blue-400 transition-all duration-200">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Mais Popular
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Mensal</CardTitle>
                <CardDescription>Ideal para foco constante</CardDescription>
                <div className="text-3xl font-bold text-blue-600">R$ 19,90</div>
                <div className="text-sm text-gray-500">por mês</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Acesso completo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Simulados ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Correção automática
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Modo foco
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Relatórios detalhados
                  </li>
                </ul>
                <Button 
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePaymentPlan('Mensal')}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            {/* Plano Anual */}
            <Card className="relative border-2 border-green-300 hover:border-green-400 transition-all duration-200">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Melhor Custo
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Anual</CardTitle>
                <CardDescription>Economia máxima</CardDescription>
                <div className="text-3xl font-bold text-green-600">R$ 9,90</div>
                <div className="text-sm text-gray-500">por mês</div>
                <div className="text-xs text-green-600 font-medium">R$ 118,80 cobrado anualmente</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Acesso completo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Simulados ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Correção automática
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Modo foco
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Relatórios detalhados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Suporte prioritário
                  </li>
                </ul>
                <Button 
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                  onClick={() => handlePaymentPlan('Anual')}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            {/* Plano Vitalício */}
            <Card className="relative border-2 border-purple-300 hover:border-purple-400 transition-all duration-200">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Oferta Especial
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Vitalício</CardTitle>
                <CardDescription>Pagamento único via PIX</CardDescription>
                <div className="text-3xl font-bold text-purple-600">R$ 99,00</div>
                <div className="text-sm text-gray-500">pagamento único</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Acesso vitalício
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Simulados ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Correção automática
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Modo foco
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Relatórios detalhados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Suporte prioritário
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Atualizações gratuitas
                  </li>
                </ul>
                <Button 
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                  onClick={() => handlePaymentPlan('Vitalício')}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Garantia */}
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🛡️ Garantia de 7 dias
            </h3>
            <p className="text-gray-600">
              Não ficou satisfeito? Devolvemos 100% do seu dinheiro em até 7 dias, sem perguntas.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderStudyPlan = () => {
    const plan = calculateStudyPlan()
    const totalMonths = Math.ceil(plan.totalWeeksToGoal / 4.33)
    
    // Dados para o gráfico de curva de aprendizado - apenas 3 períodos
    const learningCurveData = [
      {
        period: "Início",
        withGabarita: 25,
        withoutGabarita: 15
      },
      {
        period: "Em Andamento", 
        withGabarita: 65,
        withoutGabarita: 35
      },
      {
        period: "Finalizando",
        withGabarita: 95,
        withoutGabarita: 55
      }
    ]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Gabarita</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seu Plano de Estudo Personalizado</h1>
            <p className="text-gray-600">Baseado no seu perfil, criamos o plano ideal para sua aprovação</p>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Horas por dia</p>
                    <p className="text-2xl font-bold">{plan.hoursPerDay}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Dias por semana</p>
                    <p className="text-2xl font-bold">{plan.daysPerWeek}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Horas semanais</p>
                    <p className="text-2xl font-bold">{plan.weeklyHours.toFixed(1)}h</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Total de horas</p>
                    <p className="text-2xl font-bold">{plan.totalHours.toFixed(0)}h</p>
                  </div>
                  <Target className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Curva de Aprendizado - Mobile Otimizada */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Curva de Aprendizado - Sua Evolução
              </CardTitle>
              <CardDescription>
                Comparação: sua evolução com Gabarita vs. estudando sozinho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                {/* Legenda */}
                <div className="flex justify-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                    <span className="text-sm font-medium text-gray-700">Com Gabarita</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded"></div>
                    <span className="text-sm font-medium text-gray-700">Sem Gabarita</span>
                  </div>
                </div>
                
                {/* Gráfico Mobile-First com Scroll Horizontal */}
                <div className="overflow-x-auto">
                  <div className="min-w-[400px] h-64 bg-white rounded-lg p-4 border relative">
                    {/* Eixo Y */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>
                    
                    {/* Área do gráfico */}
                    <div className="ml-8 h-full relative">
                      {/* Linhas de grade */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[0, 25, 50, 75, 100].map((value) => (
                          <div key={value} className="border-t border-gray-200 w-full"></div>
                        ))}
                      </div>
                      
                      {/* Linha do gráfico */}
                      <div className="relative h-full flex items-end justify-between px-4">
                        {learningCurveData.map((data, index) => (
                          <div key={data.period} className="flex flex-col items-center relative flex-1">
                            {/* Linha conectando pontos - Com Gabarita */}
                            {index > 0 && (
                              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                <line
                                  x1="0"
                                  y1={`${100 - learningCurveData[index-1].withGabarita}%`}
                                  x2="100%"
                                  y2={`${100 - data.withGabarita}%`}
                                  stroke="#3B82F6"
                                  strokeWidth="3"
                                  className="drop-shadow-sm"
                                />
                              </svg>
                            )}
                            
                            {/* Linha conectando pontos - Sem Gabarita */}
                            {index > 0 && (
                              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                <line
                                  x1="0"
                                  y1={`${100 - learningCurveData[index-1].withoutGabarita}%`}
                                  x2="100%"
                                  y2={`${100 - data.withoutGabarita}%`}
                                  stroke="#6B7280"
                                  strokeWidth="3"
                                  className="drop-shadow-sm"
                                />
                              </svg>
                            )}
                            
                            {/* Ponto com Gabarita */}
                            <div 
                              className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full border-2 border-white shadow-lg relative z-10"
                              style={{ 
                                marginBottom: `${(data.withGabarita / 100) * 200}px`,
                                position: 'absolute',
                                bottom: '20px'
                              }}
                              title={`${data.period}: ${data.withGabarita}% com Gabarita`}
                            ></div>
                            
                            {/* Ponto sem Gabarita */}
                            <div 
                              className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full border-2 border-white shadow-lg relative z-10"
                              style={{ 
                                marginBottom: `${(data.withoutGabarita / 100) * 200}px`,
                                position: 'absolute',
                                bottom: '20px'
                              }}
                              title={`${data.period}: ${data.withoutGabarita}% sem Gabarita`}
                            ></div>
                            
                            {/* Label do período */}
                            <span className="text-xs text-gray-600 mt-2 text-center">{data.period}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Insights */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Com Gabarita</h4>
                    <p className="text-blue-700 text-sm">
                      Evolução acelerada com método personalizado, simulados adaptativos e correção inteligente.
                      Aprovação estimada em {totalMonths} meses.
                    </p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Sem Gabarita</h4>
                    <p className="text-gray-700 text-sm">
                      Evolução linear tradicional, sem personalização nem feedback inteligente.
                      Tempo de aprovação pode ser 2x maior.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projeção de Meta */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600" />
                Projeção da sua Meta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Data prevista para atingir seu objetivo
                  </h3>
                  <p className="text-3xl font-bold text-blue-600 mb-4">{plan.goalDate}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-gray-600">Semanas de estudo</p>
                      <p className="text-xl font-bold text-gray-900">{plan.totalWeeksToGoal}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Horas mensais</p>
                      <p className="text-xl font-bold text-gray-900">{plan.monthlyHours.toFixed(0)}h</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Dedicação total</p>
                      <p className="text-xl font-bold text-gray-900">{plan.totalHours.toFixed(0)}h</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico Visual Simples */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Distribuição Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day, index) => {
                  const isStudyDay = index < plan.daysPerWeek
                  return (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-20 text-sm font-medium text-gray-700">{day}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        {isStudyDay && (
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full flex items-center justify-center"
                            style={{ width: `${(plan.hoursPerDay / 8) * 100}%` }}
                          >
                            <span className="text-white text-xs font-medium">
                              {plan.hoursPerDay}h
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="w-16 text-right">
                        {isStudyDay ? (
                          <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full ml-auto" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Botão de Ação */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold"
              onClick={() => {
                setShowPlan(false)
                setShowPayment(true)
              }}
            >
              Começar a Estudar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-gray-600 mt-4">
              Acesse simulados, correções automáticas, modo foco e muito mais!
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderAuthScreen = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Gabarita</span>
            </div>
            <CardTitle className="text-2xl">
              {authMode === 'login' ? 'Entrar na sua conta' : 'Criar sua conta'}
            </CardTitle>
            <CardDescription>
              {authMode === 'login' 
                ? 'Acesse seu plano personalizado' 
                : 'Para visualizar seu plano personalizado'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={loginData.name}
                    onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={loginData.confirmPassword}
                    onChange={(e) => setLoginData({ ...loginData, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
            )}

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              onClick={handleAuth}
            >
              {authMode === 'login' ? 'Entrar' : 'Criar Conta e Ver Meu Plano'}
            </Button>

            <div className="text-center">
              <button
                className="text-blue-600 hover:text-blue-700 text-sm"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              >
                {authMode === 'login' 
                  ? 'Não tem conta? Cadastre-se' 
                  : 'Já tem conta? Faça login'
                }
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full py-3"
              onClick={handleGoogleAuth}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showCelebration) {
    return renderCelebration()
  }

  if (showPayment) {
    return renderPaymentScreen()
  }

  if (showPlan) {
    return renderStudyPlan()
  }

  if (showAuth) {
    return renderAuthScreen()
  }

  const currentQuestion = questions[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-lg mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-blue-600">Gabarita</span>
            </div>
            <div className="text-sm font-medium text-gray-600">
              {Math.round(progress)}%
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-6 border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-300 focus:outline-none ${
                    selectedAnswer === option
                      ? 'border-blue-500 bg-blue-50/80 backdrop-blur-sm shadow-lg ring-2 ring-blue-200 transform scale-[1.02]'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:backdrop-blur-sm hover:shadow-md'
                  }`}
                >
                  <span className="text-gray-800 font-medium">{option}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-6">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}
          
          <Button
            onClick={handleContinue}
            disabled={!selectedAnswer}
            className={`flex-1 ${
              selectedAnswer 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === totalSteps - 1 ? 'Finalizar' : 'Continuar'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Motivational Message */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 text-sm font-medium text-center">
            <Sparkles className="w-4 h-4 inline mr-2" />
            {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
          </p>
        </div>
      </div>
    </div>
  )
}