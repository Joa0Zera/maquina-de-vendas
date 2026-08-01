"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import type { PortfolioHealth } from "@/modules/portfolio/types/portfolio";

interface PortfolioResumeProps {
  health: PortfolioHealth;
  topProjectName: string;
}

export function PortfolioResume({ health, topProjectName }: PortfolioResumeProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <Briefcase className="h-5 w-5" />
        Resumo do Portfólio
      </h2>
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-zinc-900">
              <p className="text-3xl font-bold">{health.totalProjects}</p>
              <p className="text-xs text-zinc-400 mt-1">Projetos</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-zinc-900">
              <p className="text-3xl font-bold text-green-400">{health.readyProjects}</p>
              <p className="text-xs text-zinc-400 mt-1">Prontos</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-zinc-900">
              <p className="text-3xl font-bold text-blue-400">{health.buildingProjects}</p>
              <p className="text-xs text-zinc-400 mt-1">Construindo</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-zinc-900">
              <p className="text-3xl font-bold text-orange-400">{health.pausedProjects}</p>
              <p className="text-xs text-zinc-400 mt-1">Pausados</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Score Médio</p>
                <p className="text-xl font-bold">{health.averageScore}/100</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-1">Próxima Melhor Ação</p>
                <p className="text-sm font-medium">{topProjectName || "Nenhum projeto"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
