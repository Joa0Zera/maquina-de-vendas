"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Package, TrendingUp, Clock, Activity, DollarSign, Award } from "lucide-react";

interface PortfolioDashboardProps {
  health: {
    totalProjects: number;
    readyProjects: number;
    buildingProjects: number;
    pausedProjects: number;
    averageScore: number;
    maxScore: number;
    minScore: number;
  };
}

export function PortfolioDashboard({ health }: PortfolioDashboardProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">Painel Executivo</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Projetos"
          value={health.totalProjects}
          icon={Package}
        />
        <MetricCard
          title="Projetos Prontos"
          value={health.readyProjects}
          icon={Award}
          className="text-green-400"
        />
        <MetricCard
          title="Construindo"
          value={health.buildingProjects}
          icon={Clock}
          className="text-blue-400"
        />
        <MetricCard
          title="Pausados"
          value={health.pausedProjects}
          icon={Activity}
          className="text-orange-400"
        />
        <MetricCard
          title="Score Médio"
          value={`${health.averageScore}/100`}
          icon={TrendingUp}
        />
        <MetricCard
          title="Score Máximo"
          value={`${health.maxScore}/100`}
          icon={Award}
          className="text-green-400"
        />
        <MetricCard
          title="Score Mínimo"
          value={`${health.minScore}/100`}
          icon={Activity}
          className="text-red-400"
        />
        <MetricCard
          title="Prontos para Escalar"
          value={health.readyProjects}
          icon={DollarSign}
          className="text-green-400"
        />
      </div>
    </div>
  );
}
