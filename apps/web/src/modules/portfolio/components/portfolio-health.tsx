"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, TrendingUp } from "lucide-react";
import type { PortfolioHealth } from "@/modules/portfolio/types/portfolio";

interface PortfolioHealthProps {
  health: PortfolioHealth;
}

const statusColors: Record<string, string> = {
  EXCELLENT: "text-green-400",
  GOOD: "text-blue-400",
  REGULAR: "text-yellow-400",
  CRITICAL: "text-red-400",
};

const statusLabels: Record<string, string> = {
  EXCELLENT: "Excelente",
  GOOD: "Bom",
  REGULAR: "Regular",
  CRITICAL: "Crítico",
};

export function PortfolioHealth({ health }: PortfolioHealthProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <Heart className="h-5 w-5" />
        Saúde do Portfólio
      </h2>
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Score do Portfólio</span>
                <span className="text-2xl font-bold">{health.score}/100</span>
              </div>
              <Progress value={health.score} className="h-2" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Status</span>
              <span className={`font-semibold ${statusColors[health.status]}`}>
                {statusLabels[health.status]}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{health.readyProjects}</p>
                <p className="text-xs text-zinc-400">Prontos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{health.buildingProjects}</p>
                <p className="text-xs text-zinc-400">Construindo</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">{health.pausedProjects}</p>
                <p className="text-xs text-zinc-400">Pausados</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
