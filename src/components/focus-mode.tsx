"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Brain,
  Coffee,
  Timer,
  Target,
  Zap,
  BookOpen,
  CheckCircle,
  Clock,
  X
} from 'lucide-react'

interface PomodoroSettings {
  focusTime: number
  shortBreak: number
  longBreak: number
  longBreakInterval: number
}

interface StudySession {
  subject: string
  duration: number
  completed: boolean
}

interface FocusModeProps {
  onClose?: () => void
}

export default function FocusMode({ onClose }: FocusModeProps) {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isBreak, setIsBreak] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [currentSubject, setCurrentSubject] = useState('Matemática')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  const [settings, setSettings] = useState<PomodoroSettings>({
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4
  })

  const audioRef = useRef<HTMLAudioElement>(null)

  const subjects = [
    'Matemática', 'Português', 'História', 'Geografia', 
    'Física', 'Química', 'Biologia', 'Redação'
  ]

  const backgroundSounds = [
    { name: 'Chuva', url: '/sounds/rain.mp3' },
    { name: 'Floresta', url: '/sounds/forest.mp3' },
    { name: 'Café', url: '/sounds/cafe.mp3' },
    { name: 'Ondas', url: '/sounds/waves.mp3' }
  ]

  const todaySessions: StudySession[] = [
    { subject: 'Matemática', duration: 25, completed: true },
    { subject: 'Português', duration: 25, completed: true },
    { subject: 'História', duration: 25, completed: false },
    { subject: 'Geografia', duration: 25, completed: false },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleSessionComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isPaused, timeLeft])

  const handleSessionComplete = () => {
    setIsActive(false)
    setIsPaused(false)
    
    if (!isBreak) {
      setCompletedSessions(prev => prev + 1)
      // Determine break type
      const isLongBreak = (completedSessions + 1) % settings.longBreakInterval === 0
      setIsBreak(true)
      setTimeLeft(isLongBreak ? settings.longBreak * 60 : settings.shortBreak * 60)
    } else {
      setIsBreak(false)
      setTimeLeft(settings.focusTime * 60)
    }
    
    // Play notification sound
    playNotificationSound()
  }

  const playNotificationSound = () => {
    const audio = new Audio('/sounds/notification.mp3')
    audio.play().catch(e => console.log('Could not play notification sound'))
  }

  const toggleTimer = () => {
    if (isActive) {
      setIsPaused(!isPaused)
    } else {
      setIsActive(true)
      setIsPaused(false)
    }
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsPaused(false)
    setTimeLeft(isBreak ? settings.shortBreak * 60 : settings.focusTime * 60)
  }

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsMusicPlaying(!isMusicPlaying)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    const totalTime = isBreak 
      ? (completedSessions % settings.longBreakInterval === 0 ? settings.longBreak : settings.shortBreak) * 60
      : settings.focusTime * 60
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  const getMotivationalMessage = () => {
    if (isBreak) {
      return "Hora do descanso! Relaxe e recarregue as energias 🌟"
    }
    
    const messages = [
      "Foco total! Você está indo muito bem! 🚀",
      "Cada minuto conta para sua aprovação! 💪",
      "Mantenha a concentração, você consegue! ⭐",
      "Sua dedicação vai fazer a diferença! 🎯",
      "Continue assim, o sucesso está chegando! 🏆"
    ]
    
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-blue-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Modo Foco</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Técnica Pomodoro para máxima produtividade
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMusic}
            >
              {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Fechar modo foco"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardContent className="p-8 text-center">
                {/* Current Session Info */}
                <div className="mb-6">
                  <Badge className={`mb-2 ${
                    isBreak 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}>
                    {isBreak ? (
                      <>
                        <Coffee className="w-3 h-3 mr-1" />
                        {completedSessions % settings.longBreakInterval === 0 ? 'Pausa Longa' : 'Pausa Curta'}
                      </>
                    ) : (
                      <>
                        <Brain className="w-3 h-3 mr-1" />
                        Estudando {currentSubject}
                      </>
                    )}
                  </Badge>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Sessão {completedSessions + 1} • {getMotivationalMessage()}
                  </div>
                </div>

                {/* Timer Display */}
                <div className="relative mb-8">
                  <div className="w-64 h-64 mx-auto relative">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={isBreak ? "#10b981" : "#3b82f6"}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                        className="transition-all duration-1000 ease-in-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {Math.round(getProgressPercentage())}% concluído
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={toggleTimer}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8"
                  >
                    {isActive && !isPaused ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        {isActive ? 'Continuar' : 'Iniciar'}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={resetTimer}
                    className={isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''}
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reiniciar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Subject Selection */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Matéria de Estudo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {subjects.map((subject) => (
                    <Button
                      key={subject}
                      variant={currentSubject === subject ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentSubject(subject)}
                      className={`${
                        currentSubject === subject 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                          : isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''
                      }`}
                    >
                      {subject}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Progress */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Progresso de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{completedSessions}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    sessões concluídas
                  </div>
                </div>
                
                <div className="space-y-2">
                  {todaySessions.map((session, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        session.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {session.completed && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{session.subject}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {session.duration} min
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">156h</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total este mês
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">7</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Dias consecutivos
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Meta diária</span>
                    <span>4/6 sessões</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background Sounds */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Sons Ambiente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {backgroundSounds.map((sound) => (
                    <Button
                      key={sound.name}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.src = sound.url
                          audioRef.current.play()
                          setIsMusicPlaying(true)
                        }
                      }}
                    >
                      {sound.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} loop />
    </div>
  )
}