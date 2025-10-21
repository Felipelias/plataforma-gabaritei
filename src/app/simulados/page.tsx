"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import FocusMode from "@/components/focus-mode"
import SimulationMode from "@/components/simulation-mode"
import FullscreenOverlay from "@/components/ui/fullscreen-overlay"
import {
  Trophy,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Play,
  Settings,
  User,
  LogOut,
  Calendar,
  BarChart3,
  FileText,
  Zap,
  Star,
  Bell,
  Home,
  Brain,
  Timer,
  PenTool,
  Shield,
  Landmark,
  Scale,
  Building2,
  Gavel,
  Flame,
  Leaf,
  ChevronRight
} from "lucide-react"

const simulados = [
  {
    id: "personalizado",
    nome: "Simulado Personalizado",
    descricao: "Monte seu próprio simulado de estudos",
    cor: "bg-gray-600",
    icone: <Brain className="w-6 h-6 text-white" />,
  },
  {
    id: "enem",
    nome: "ENEM",
    descricao: "Exame Nacional do Ensino Médio",
    cor: "bg-blue-600",
    icone: <BookOpen className="w-6 h-6 text-white" />,
  },
  {
    id: "fatec",
    nome: "FATEC",
    descricao: "Vestibular das Fatecs",
    cor: "bg-green-600",
    icone: <Brain className="w-6 h-6 text-white" />,
  },
  {
    id: "tj",
    nome: "Concursos TJ",
    descricao: "Tribunal de Justiça",
    cor: "bg-purple-600",
    icone: <Award className="w-6 h-6 text-white" />,
  },
  {
    id: "pf",
    nome: "Polícia Federal (PF)",
    descricao: "Prestígio e altos salários",
    cor: "bg-indigo-600",
    icone: <Shield className="w-6 h-6 text-white" />,
  },
  {
    id: "prf",
    nome: "Polícia Rodoviária Federal (PRF)",
    descricao: "Alta visibilidade e estabilidade",
    cor: "bg-yellow-600",
    icone: <Shield className="w-6 h-6 text-white" />,
  },
  {
    id: "receita",
    nome: "Receita Federal",
    descricao: "Salários altos e estabilidade",
    cor: "bg-emerald-600",
    icone: <Landmark className="w-6 h-6 text-white" />,
  },
  {
    id: "inss",
    nome: "INSS",
    descricao: "Muitas vagas e acesso fácil",
    cor: "bg-teal-600",
    icone: <Scale className="w-6 h-6 text-white" />,
  },
  {
    id: "bancos",
    nome: "Banco do Brasil / Caixa / BNDES",
    descricao: "Benefícios e estabilidade",
    cor: "bg-cyan-600",
    icone: <Building2 className="w-6 h-6 text-white" />,
  },
  {
    id: "pcivil",
    nome: "Polícia Civil",
    descricao: "Renovação constante de efetivo",
    cor: "bg-red-600",
    icone: <Gavel className="w-6 h-6 text-white" />,
  },
  {
    id: "pm",
    nome: "Polícia Militar / Bombeiros",
    descricao: "Vocação pública e alta oferta",
    cor: "bg-orange-600",
    icone: <Flame className="w-6 h-6 text-white" />,
  },
  {
    id: "senado",
    nome: "Senado / Câmara dos Deputados",
    descricao: "Salários altíssimos e raros editais",
    cor: "bg-pink-600",
    icone: <Award className="w-6 h-6 text-white" />,
  },
  {
    id: "agencias",
    nome: "ANVISA / ANEEL / IBAMA / ICMBio",
    descricao: "Importância crescente pós-pandemia",
    cor: "bg-lime-600",
    icone: <Leaf className="w-6 h-6 text-white" />,
  },
]

const materias = [
  "Matemática",
  "Português",
  "História",
  "Geografia",
  "Física",
  "Química",
  "Biologia",
  "Inglês",
]

type SimulationOption = {
  id: string
  nome: string
  descricao: string
}

export default function SimuladosPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showFocusMode, setShowFocusMode] = useState(false)
  const [showSimulation, setShowSimulation] = useState(false)
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationOption | null>(null)

  // Dados simulados do usuário
  const userData = {
    name: "João Silva",
    level: 15,
    points: 2450,
    streak: 7,
    studyHours: 45.5,
    completedSimulations: 12,
    correctAnswers: 78,
    weeklyGoal: 20,
    weeklyProgress: 15,
  }

  const openSimulation = (simulation: SimulationOption) => {
    setSelectedSimulation(simulation)
    setShowSimulation(true)
  }

  const openSubjectSimulation = (subject: string) => {
    openSimulation({
      id: `materia-${subject.toLowerCase()}`,
      nome: `Simulado de ${subject}`,
      descricao: `Questões focadas em ${subject}`,
    })
  }

  const closeSimulation = () => {
    setShowSimulation(false)
    setSelectedSimulation(null)
  }

  const renderSimulationOverlay = () => (
    <FullscreenOverlay
      isOpen={Boolean(showSimulation && selectedSimulation)}
      onClose={closeSimulation}
    >
      {selectedSimulation && (
        <SimulationMode
          onExit={closeSimulation}
          title={selectedSimulation.nome}
          description={selectedSimulation.descricao}
        />
      )}
    </FullscreenOverlay>
  )

  const renderFocusOverlay = () => (
    <FullscreenOverlay
      isOpen={showFocusMode}
      onClose={() => setShowFocusMode(false)}
    >
      <FocusMode onClose={() => setShowFocusMode(false)} />
    </FullscreenOverlay>
  )

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Boas-vindas e estatísticas principais */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Gabarita! 🎉</h2>
        <p className="text-blue-100 mb-4">Sua jornada de estudos começa agora</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userData.level}</div>
            <div className="text-blue-100 text-sm">Nível</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userData.points}</div>
            <div className="text-blue-100 text-sm">Pontos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userData.streak}</div>
            <div className="text-blue-100 text-sm">Dias seguidos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userData.studyHours}h</div>
            <div className="text-blue-100 text-sm">Estudadas</div>
          </div>
        </div>
      </div>

      {/* Meta semanal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Meta Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso desta semana</span>
              <span>
                {userData.weeklyProgress}h / {userData.weeklyGoal}h
              </span>
            </div>
            <Progress value={(userData.weeklyProgress / userData.weeklyGoal) * 100} className="h-2" />
            <p className="text-sm text-gray-600">
              Faltam {userData.weeklyGoal - userData.weeklyProgress}h para atingir sua meta!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ações rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("simulados")}>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Fazer Simulado</h3>
            <p className="text-sm text-gray-600">Teste seus conhecimentos</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("redacoes")}>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Escrever Redação</h3>
            <p className="text-sm text-gray-600">Pratique sua escrita</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => {
            setActiveTab("foco")
            setShowFocusMode(true)
          }}
        >
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Modo Foco</h3>
            <p className="text-sm text-gray-600">Concentre-se nos estudos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSimulados = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Simulados Disponíveis</h2>
        <p className="text-gray-600">Escolha o simulado ideal para seu objetivo</p>
      </div>

      {/* CARROSSEL */}
      <Carousel className="w-full max-w-6xl mx-auto mb-10">
        <CarouselContent>
          {simulados.map((sim) => (
            <CarouselItem key={sim.id} className="md:basis-1/3 lg:basis-1/4">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${sim.cor} rounded-lg flex items-center justify-center`}>{sim.icone}</div>
                    <div>
                      <CardTitle>{sim.nome}</CardTitle>
                      <CardDescription>{sim.descricao}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Exemplo de meta rápida — você pode customizar por sim */}
                    <div className="flex justify-between text-sm">
                      <span>Questões disponíveis</span>
                      <span className="font-medium">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Simulados completos</span>
                      <span className="font-medium">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tempo médio</span>
                      <span className="font-medium">—</span>
                    </div>

                    <Button
                      className="w-full mt-2"
                      onClick={() =>
                        openSimulation({ id: sim.id, nome: sim.nome, descricao: sim.descricao })
                      }
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Simulado
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* SIMULADOS POR MATÉRIA */}
      <Card>
        <CardHeader>
          <CardTitle>Simulados por Matéria</CardTitle>
          <CardDescription>Foque em áreas específicas do conhecimento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {materias.map((materia) => (
              <Button
                key={materia}
                variant="outline"
                className="h-16 flex flex-col"
                onClick={() => openSubjectSimulation(materia)}
              >
                <span className="font-medium">{materia}</span>
                <span className="text-xs text-gray-500">200+ questões</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRedacoes = () => (
    <div className="space-y-6">
      {/* ... (mantive seu conteúdo de redações como estava) */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Redações e Correções</h2>
        <p className="text-gray-600">Pratique sua escrita com correção automática inteligente</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-blue-600" />
              Nova Redação
            </CardTitle>
            <CardDescription>Escreva uma redação sobre um tema atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Tema da Semana</h4>
                <p className="text-blue-800 text-sm">
                  "O impacto das redes sociais na formação da opinião pública no Brasil"
                </p>
              </div>
              <Button className="w-full">
                <PenTool className="w-4 h-4 mr-2" />
                Começar a Escrever
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              Minhas Redações
            </CardTitle>
            <CardDescription>Acompanhe suas redações e correções</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Redação sobre Educação</p>
                  <p className="text-xs text-gray-500">Enviada há 2 dias</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">8.5/10</p>
                  <p className="text-xs text-gray-500">Corrigida</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Ver Todas as Redações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dicas de Redação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Estrutura</h4>
              <p className="text-yellow-800 text-sm">Introdução, desenvolvimento e conclusão bem definidos</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Argumentação</h4>
              <p className="text-blue-800 text-sm">Use dados, exemplos e citações</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Proposta</h4>
              <p className="text-green-800 text-sm">Apresente soluções viáveis</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderFocusMode = () => (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Zap className="w-6 h-6 text-purple-600" />
            Ative o modo foco completo
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Concentre-se com ciclos Pomodoro, sons ambiente e estatísticas de produtividade em tempo real.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3 text-left">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-purple-600 mb-1">Ciclos inteligentes</h4>
              <p className="text-sm text-gray-600">Sessões automáticas com ajustes para pausas curtas e longas.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-purple-600 mb-1">Ambiente relaxante</h4>
              <p className="text-sm text-gray-600">Selecione trilhas sonoras e modos de iluminação para estudar melhor.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-purple-600 mb-1">Insights imediatos</h4>
              <p className="text-sm text-gray-600">Acompanhe sessões concluídas, matérias e metas de estudo diárias.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
              size="lg"
              onClick={() => setShowFocusMode(true)}
            >
              <Timer className="w-5 h-5 mr-2" />
              Abrir Modo Foco
            </Button>
            <Button variant="outline" size="lg" className="px-8" onClick={() => setActiveTab("dashboard")}>
              <Home className="w-5 h-5 mr-2" />
              Voltar para o painel
            </Button>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Dica: combine o modo foco com simulados rápidos para reforçar o conteúdo estudado em cada sessão.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const renderStats = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Estatísticas Gerais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{userData.studyHours}h</div>
              <div className="text-sm text-gray-600">Horas estudadas</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{userData.completedSimulations}</div>
              <div className="text-sm text-gray-600">Simulados feitos</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{userData.correctAnswers}%</div>
              <div className="text-sm text-gray-600">Taxa de acerto</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{userData.streak}</div>
              <div className="text-sm text-gray-600">Dias consecutivos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evolução Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map((day, index) => {
              const hours = [2, 3, 1.5, 2.5, 3, 1, 2][index]
              return (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{day}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${(hours / 4) * 100}%` }} />
                  </div>
                  <div className="w-12 text-sm text-gray-600">{hours}h</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Gabarita</span>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-2">
            <Button variant={activeTab === "dashboard" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("dashboard")}>
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant={activeTab === "simulados" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("simulados")}>
              <BookOpen className="w-4 h-4 mr-2" />
              Simulados
            </Button>
            <Button variant={activeTab === "redacoes" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("redacoes")}>
              <FileText className="w-4 h-4 mr-2" />
              Redações
            </Button>
            <Button variant={activeTab === "foco" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("foco")}>
              <Zap className="w-4 h-4 mr-2" />
              Modo Foco
            </Button>
            <Button variant={activeTab === "estatisticas" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("estatisticas")}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Estatísticas
            </Button>
            <Button variant={activeTab === "plano" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("plano")}>
              <Calendar className="w-4 h-4 mr-2" />
              Plano de Estudo
            </Button>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "simulados" && renderSimulados()}
            {activeTab === "redacoes" && renderRedacoes()}
            {activeTab === "foco" && renderFocusMode()}
            {activeTab === "estatisticas" && renderStats()}
            {activeTab === "plano" && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Plano de Estudo</h2>
                <p className="text-gray-600 mb-6">Seu plano personalizado será exibido aqui</p>
                <Button onClick={() => (window.location.href = "/")}>Voltar ao Início</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {renderSimulationOverlay()}
      {renderFocusOverlay()}
    </div>
  )
}
