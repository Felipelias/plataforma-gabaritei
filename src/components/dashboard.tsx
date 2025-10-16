"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Play,
  PauseCircle,
  RotateCcw,
  Settings,
  User,
  LogOut,
  Calendar,
  BarChart3,
  FileText,
  Zap,
  Star,
  Bell,
  ChevronRight
} from 'lucide-react'

interface DashboardProps {
  userPaid: boolean
  onPaymentRequired: () => void
}

export default function Dashboard({ userPaid, onPaymentRequired }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [focusMode, setFocusMode] = useState(false)
  const [focusTime, setFocusTime] = useState(25 * 60) // 25 minutos em segundos
  const [isRunning, setIsRunning] = useState(false)

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
    weeklyProgress: 15
  }

  const handleActionClick = (action: string) => {
    if (!userPaid) {
      onPaymentRequired()
      return
    }
    
    // Executar ação se usuário pagou
    console.log(`Executando ação: ${action}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Boas-vindas e estatísticas principais */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Olá, {userData.name}! 👋</h2>
        <p className="text-blue-100 mb-4">Continue sua jornada rumo à aprovação</p>
        
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
              <span>{userData.weeklyProgress}h / {userData.weeklyGoal}h</span>
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
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleActionClick('simulado')}>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Fazer Simulado</h3>
            <p className="text-sm text-gray-600">Teste seus conhecimentos</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleActionClick('redacao')}>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Escrever Redação</h3>
            <p className="text-sm text-gray-600">Pratique sua escrita</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleActionClick('foco')}>
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Modo Foco</h3>
            <p className="text-sm text-gray-600">Concentre-se nos estudos</p>
          </CardContent>
        </Card>
      </div>

      {/* Conquistas recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Conquistas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-medium">Sequência de 7 dias!</p>
                <p className="text-sm text-gray-600">Continue assim para manter o ritmo</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium">12 simulados completos</p>
                <p className="text-sm text-gray-600">Você está no caminho certo!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderFocusMode = () => (
    <div className="max-w-md mx-auto">
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-purple-600" />
            Modo Foco
          </CardTitle>
          <CardDescription>Técnica Pomodoro para máxima concentração</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-bold text-purple-600">
            {formatTime(focusTime)}
          </div>
          
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className={isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
            >
              {isRunning ? <PauseCircle className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? 'Pausar' : 'Iniciar'}
            </Button>
            
            <Button variant="outline" onClick={() => setFocusTime(25 * 60)}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetar
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <Button variant="outline" size="sm" onClick={() => setFocusTime(15 * 60)}>
              15 min
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFocusTime(25 * 60)}>
              25 min
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFocusTime(45 * 60)}>
              45 min
            </Button>
          </div>
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
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((day, index) => {
              const hours = [2, 3, 1.5, 2.5, 3, 1, 2][index]
              return (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{day}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${(hours / 4) * 100}%` }}
                    />
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
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'simulados' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleActionClick('simulados')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Simulados
            </Button>
            <Button
              variant={activeTab === 'redacoes' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleActionClick('redacoes')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Redações
            </Button>
            <Button
              variant={activeTab === 'foco' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('foco')}
            >
              <Zap className="w-4 h-4 mr-2" />
              Modo Foco
            </Button>
            <Button
              variant={activeTab === 'estatisticas' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('estatisticas')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Estatísticas
            </Button>
            <Button
              variant={activeTab === 'plano' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleActionClick('plano')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Plano de Estudo
            </Button>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'foco' && renderFocusMode()}
            {activeTab === 'estatisticas' && renderStats()}
          </div>
        </div>
      </div>
    </div>
  )
}