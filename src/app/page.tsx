"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy, 
  Target, 
  Brain, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Zap, 
  BookOpen, 
  TrendingUp,
  Crown,
  Timer,
  PenTool,
  BarChart3,
  ArrowRight,
  Play,
  Award,
  Flame,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  X
} from 'lucide-react'
import OnboardingFlow from '@/components/onboarding-flow'
import Dashboard from '@/components/dashboard'
import FocusMode from '@/components/focus-mode'
import FullscreenOverlay from '@/components/ui/fullscreen-overlay'

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [userPaid, setUserPaid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showFocusMode, setShowFocusMode] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const features = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Plano Personalizado",
      description: "Cronograma adaptado ao seu perfil, objetivos e tempo disponível"
    },
    {
      icon: <Trophy className="w-8 h-8 text-amber-600" />,
      title: "Sistema de Conquistas",
      description: "Acompanhe seu progresso com pontuações, rankings e medalhas"
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "Simulados Adaptativos",
      description: "Questões que se ajustam ao seu nível com explicações detalhadas"
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Modo Foco",
      description: "Ambiente otimizado com técnica Pomodoro e controle de distrações"
    },
    {
      icon: <PenTool className="w-8 h-8 text-red-600" />,
      title: "Correção de Redação",
      description: "Análise automática com feedback detalhado e sugestões de melhoria"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      title: "Relatórios Completos",
      description: "Estatísticas de desempenho e evolução por matéria e período"
    }
  ]

  const concursos = [
    { name: "ENEM", color: "bg-blue-600", students: "2.3M" },
    { name: "FATEC", color: "bg-green-600", students: "180K" },
    { name: "Concursos TJ", color: "bg-purple-600", students: "450K" },
    { name: "Polícia Militar", color: "bg-red-600", students: "320K" },
    { name: "Concursos Públicos", color: "bg-amber-600", students: "1.8M" },
    { name: "Vestibulares", color: "bg-pink-600", students: "890K" }
  ]

  const testimonials = [
    {
      name: "Ana Silva",
      exam: "ENEM 2024",
      score: "920 pontos",
      message: "Consegui minha vaga em Medicina na USP. O Gabarita foi fundamental na minha preparação.",
      avatar: "AS"
    },
    {
      name: "Carlos Santos",
      exam: "TJ-SP",
      score: "1º lugar",
      message: "Conquistei o primeiro lugar no concurso. A metodologia realmente funciona.",
      avatar: "CS"
    },
    {
      name: "Maria Oliveira",
      exam: "FATEC",
      score: "Aprovada",
      message: "O plano personalizado se encaixou perfeitamente na minha rotina de trabalho.",
      avatar: "MO"
    }
  ]

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      alert('Por favor, preencha email e senha')
      return
    }

    // Simular verificação de pagamento
    // Em um sistema real, isso seria uma verificação no backend
    const hasPayment = Math.random() > 0.5 // 50% chance de ter pagamento

    setUserPaid(hasPayment)
    setShowLogin(false)
    setShowDashboard(true)

    if (!hasPayment) {
      // Se não pagou, mostrar modal de pagamento após 2 segundos
      setTimeout(() => {
        setShowPaymentModal(true)
      }, 2000)
    }
  }

  const handlePaymentRequired = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentPlan = (planName: string) => {
    console.log('Plano selecionado:', planName)
    setUserPaid(true)
    setShowPaymentModal(false)
    alert(`Plano ${planName} ativado! Agora você tem acesso completo ao Gabarita.`)
  }

  const renderLoginModal = () => {
    if (!showLogin) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Gabarita</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowLogin(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
            <CardDescription>Acesse seu plano personalizado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              onClick={handleLogin}
            >
              Entrar
            </Button>

            <div className="text-center">
              <button
                className="text-blue-600 hover:text-blue-700 text-sm"
                onClick={() => {
                  setShowLogin(false)
                  setShowOnboarding(true)
                }}
              >
                Não tem conta? Cadastre-se
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

            <Button variant="outline" className="w-full py-3">
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

  const renderPaymentModal = () => {
    if (!showPaymentModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Gabarita</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowPaymentModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Escolha seu Plano</h2>
              <p className="text-gray-600">Para continuar usando o Gabarita, selecione um plano</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            <div className="text-center mt-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🛡️ Garantia de 7 dias
              </h3>
              <p className="text-gray-600">
                Não ficou satisfeito? Devolvemos 100% do seu dinheiro em até 7 dias, sem perguntas.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderFocusModeOverlay = () => (
    <FullscreenOverlay
      isOpen={showFocusMode}
      onClose={() => setShowFocusMode(false)}
    >
      <FocusMode onClose={() => setShowFocusMode(false)} />
    </FullscreenOverlay>
  )

  if (showDashboard) {
    return <Dashboard userPaid={userPaid} onPaymentRequired={handlePaymentRequired} />
  }

  if (showOnboarding) {
    return <OnboardingFlow />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Gabarita
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setShowLogin(true)}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Entrar
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowOnboarding(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
            <Trophy className="w-4 h-4 text-blue-700" />
            <span className="text-sm font-medium text-blue-800">Mais de 50.000 estudantes aprovados</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Prepare-se para
            <br />
            <span className="text-blue-600">Sua Aprovação</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma completa de preparação para concursos com metodologia personalizada, 
            acompanhamento detalhado e resultados comprovados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              onClick={() => setShowOnboarding(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Criar Meu Plano de Estudos
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              <Users className="w-5 h-5 mr-2" />
              Ver Casos de Sucesso
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => setShowFocusMode(true)}
            >
              <Timer className="w-5 h-5 mr-2" />
              Experimentar Modo Foco
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Aprovados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Taxa de Sucesso</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">2M+</div>
              <div className="text-gray-600">Questões</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">24/7</div>
              <div className="text-gray-600">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Concursos Disponíveis */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Concursos Disponíveis</h2>
            <p className="text-xl text-gray-600">Conteúdo especializado para cada tipo de prova</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {concursos.map((concurso, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${concurso.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900">{concurso.name}</h3>
                  <p className="text-sm text-gray-600">{concurso.students} estudantes</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Como Funciona</h2>
            <p className="text-xl text-gray-600">Metodologia comprovada para acelerar sua aprovação</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-gray-200 bg-white">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Acompanhe Sua Evolução</h2>
            <p className="text-xl text-gray-600">Dashboard completo para monitorar seu progresso</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">2.847</div>
                  <div className="text-blue-200">Pontos Acumulados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">87%</div>
                  <div className="text-blue-200">Taxa de Acerto</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">156h</div>
                  <div className="text-blue-200">Tempo de Estudo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">#3</div>
                  <div className="text-blue-200">Posição no Ranking</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progresso por Matéria
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Matemática</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Português</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>História</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Conquistas Recentes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Sequência de Ouro</div>
                        <div className="text-sm text-blue-200">7 dias consecutivos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Flame className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Expert em Matemática</div>
                        <div className="text-sm text-blue-200">90% de acertos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Casos de Sucesso</h2>
            <p className="text-xl text-gray-600">Estudantes que alcançaram seus objetivos</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.exam} • {testimonial.score}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.message}"</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comece Sua Jornada Rumo à Aprovação
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Junte-se a milhares de estudantes que já conquistaram seus objetivos. 
            Crie seu plano personalizado e dê o primeiro passo para o sucesso.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 font-bold"
              onClick={() => setShowOnboarding(true)}
            >
              <Trophy className="w-5 h-5 mr-2" />
              Criar Meu Plano Agora
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
              <Users className="w-5 h-5 mr-2" />
              Falar com Especialista
            </Button>
          </div>
          
          <div className="mt-8 text-sm opacity-75">
            ⭐ Avaliação 4.9/5 • Mais de 10.000 avaliações positivas
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Gabarita</span>
              </div>
              <p className="text-gray-400 mb-4">
                Plataforma completa de preparação para concursos com metodologia personalizada.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  📘
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  📷
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  🐦
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Plataforma</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Dashboard</a></li>
                <li><a href="#" className="hover:text-white">Simulados</a></li>
                <li><a href="#" className="hover:text-white">Plano de Estudos</a></li>
                <li><a href="#" className="hover:text-white">Ranking</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Concursos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">ENEM</a></li>
                <li><a href="#" className="hover:text-white">FATEC</a></li>
                <li><a href="#" className="hover:text-white">Concursos TJ</a></li>
                <li><a href="#" className="hover:text-white">Polícia Militar</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Gabarita. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modais */}
      {renderLoginModal()}
      {renderPaymentModal()}
      {renderFocusModeOverlay()}
    </div>
  )
}
