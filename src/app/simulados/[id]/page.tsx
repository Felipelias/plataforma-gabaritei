// src/app/simulados/[id]/page.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Play, ChevronRight } from "lucide-react";

type Questao = {
  id: number;
  enunciado: string;
  alternativas: string[];
  correta?: string; // só para mock / calculo local
  resposta?: string | null;
};

const DEFAULT_TIMES: Record<string, number> = {
  // segundos
  enem: 5 * 3600 + 30 * 60, // 5h30
  fatec: 3 * 3600,
  tj: 4 * 3600,
  pf: 4 * 3600 + 30 * 60,
  personalizado: 60 * 45, // 45min por default no personalizado
};

function formatTime(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Mock de questões por simulado (substitua por chamada à API)
const MOCK_QUESTOES: Record<string, Questao[]> = {
  enem: [
    { id: 1, enunciado: "ENEM - Questão 1: ...", alternativas: ["A", "B", "C", "D"], correta: "A" },
    { id: 2, enunciado: "ENEM - Questão 2: ...", alternativas: ["A", "B", "C", "D"], correta: "C" },
  ],
  fatec: [
    { id: 1, enunciado: "FATEC - Questão 1: ...", alternativas: ["A", "B", "C", "D"], correta: "B" },
  ],
  tj: [
    { id: 1, enunciado: "TJ - Questão 1: ...", alternativas: ["A", "B", "C", "D"], correta: "D" },
  ],
  personalizado: [
    { id: 1, enunciado: "Personalizado - Questão 1: ...", alternativas: ["A", "B", "C", "D"], correta: "B" },
  ],
};

export default function SimuladoIdPage() {
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const simId = id ?? "personalizado";

  const initialTime = DEFAULT_TIMES[simId] ?? 60 * 60; // fallback 1h
  const storageKey = `simulado-${simId}`;

  const [questoes, setQuestoes] = useState<Questao[]>(() => MOCK_QUESTOES[simId] ?? []);
  const [tempoRestante, setTempoRestante] = useState<number>(initialTime);
  const [iniciado, setIniciado] = useState(false);

  const intervalRef = useRef<number | null>(null);

  // carrega progresso salvo
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.tempo != null) setTempoRestante(parsed.tempo);
        if (Array.isArray(parsed.questoes)) setQuestoes(parsed.questoes);
        if (parsed.iniciado) setIniciado(true);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simId]);

  // salva no localStorage sempre que muda
  useEffect(() => {
    const payload = { tempo: tempoRestante, questoes, iniciado };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [tempoRestante, questoes, iniciado, storageKey]);

  // Timer
  useEffect(() => {
    if (!iniciado) return;
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setTempoRestante((t) => {
        if (t <= 1) {
          window.clearInterval(intervalRef.current!);
          intervalRef.current = null;
          // tempo estourou -> auto enviar
          handleEnviar(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iniciado]);

  function handleResposta(qid: number, resposta: string) {
    setQuestoes((prev) => prev.map((q) => (q.id === qid ? { ...q, resposta } : q)));
  }

  function handleIniciar() {
    setIniciado(true);
  }

  function handleEnviar(automatic = false) {
    // calcula acertos usando propriedade `correta` do mock
    const total = questoes.length;
    const corretas = questoes.reduce((acc, q) => (q.resposta && q.resposta === q.correta ? acc + 1 : acc), 0);

    // limpa progresso local (você pode optar por salvar histórico)
    localStorage.removeItem(storageKey);
    setIniciado(false);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // redirecionar ou mostrar resultado — por enquanto mostra alert
    alert(
      `${automatic ? "Tempo esgotado! " : ""}Você finalizou o simulado "${simId.toUpperCase()}".\n` +
        `Acertos: ${corretas} / ${total} (${Math.round((corretas / Math.max(1, total)) * 100)}%)`
    );

    // exemplo: você pode redirecionar para uma página de resultado:
    // router.push(`/simulados/${simId}/resultado`);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Simulado: {simId?.toString().toUpperCase()}</h1>
          <p className="text-sm text-gray-600">Boa sorte! Lembre-se de salvar suas respostas.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">Tempo restante</div>
          <div className="font-mono bg-black text-white px-3 py-1 rounded">{formatTime(tempoRestante)}</div>
        </div>
      </div>

      {!iniciado ? (
        <Card className="mb-6">
          <CardContent className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <p className="font-medium">Duração sugerida: {formatTime(initialTime)}</p>
              <p className="text-sm text-gray-600">Ao iniciar o simulado o cronômetro começará a contar.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleIniciar} className="flex items-center">
                <Play className="w-4 h-4 mr-2" /> Iniciar Simulado
              </Button>
              <Link href="/simulados">
                <Button variant="ghost">Voltar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Lista de questões */}
      <div className="space-y-4">
        {questoes.map((q, idx) => (
          <Card key={q.id}>
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium mb-2">
                    {idx + 1}. {q.enunciado}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.alternativas.map((alt) => (
                      <label
                        key={alt}
                        className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                          q.resposta === alt ? "border-blue-500 bg-blue-50" : "border-transparent"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={q.resposta === alt}
                          onChange={() => handleResposta(q.id, alt)}
                        />
                        <span>{alt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-400 ml-4">
                  <div>Q{q.id}</div>
                  <div className="mt-2">{q.resposta ? <span className="text-green-600">Respondida</span> : <span>—</span>}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rodapé com ações */}
      <div className="flex justify-between items-center mt-6">
        <Link href="/simulados">
          <Button variant="ghost">← Voltar para Simulados</Button>
        </Link>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            // salvar manualmente (já salva automaticamente via effect)
            localStorage.setItem(storageKey, JSON.stringify({ tempo: tempoRestante, questoes, iniciado }));
            alert("Progresso salvo localmente.");
          }}>
            Salvar Progresso
          </Button>

          <Button onClick={() => handleEnviar(false)} className="bg-green-600">
            Enviar Simulado
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
