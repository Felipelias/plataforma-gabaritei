// src/app/simulados/materia/[materia]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SimuladoMateriaPage() {
  const { materia } = useParams() as { materia?: string };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold capitalize mb-3">{materia} — Simulados</h1>
      <p className="text-gray-600 mb-6">Escolha um simulado focado em {materia}.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/simulados/materia/${materia}/simulado-1`}>
          <Button className="w-full">Simulado rápido (20 questões)</Button>
        </Link>

        <Link href={`/simulados/materia/${materia}/simulado-2`}>
          <Button className="w-full" variant="outline">Simulado completo (50 questões)</Button>
        </Link>
      </div>

      <div className="mt-6">
        <Link href="/simulados">
          <Button variant="ghost">Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
