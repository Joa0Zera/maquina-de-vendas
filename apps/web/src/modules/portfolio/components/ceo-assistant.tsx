"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { DailyTask } from "@/modules/portfolio/types/portfolio";

interface CEOAssistantProps {
  topTask: DailyTask | null;
}

const impactColors: Record<string, string> = {
  "Muito Alto": "bg-red-500/10 text-red-400 border-red-500/30",
  "Alto": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  "Médio": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  "Baixo": "bg-green-500/10 text-green-400 border-green-500/30",
};

export function CEOAssistant({ topTask }: CEOAssistantProps) {
  if (!topTask) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Sun className="h-5 w-5" />
          Bom dia
        </h2>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="p-6">
            <p className="text-zinc-400">Todos os projetos estão concluídos. Parabéns!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const impactColor = impactColors[topTask.impact] || impactColors["Médio"];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <Sun className="h-5 w-5" />
        Bom dia
      </h2>
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Hoje recomendamos:</p>
              <p className="text-xl font-semibold">{topTask.title}</p>
              <p className="text-sm text-zinc-400 mt-1">Projeto: {topTask.projectName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Tempo estimado:</p>
                <p className="font-medium">{topTask.estimatedMinutes} minutos</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Impacto:</p>
                <Badge variant="default" className={impactColor}>
                  {topTask.impact}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Prioridade:</p>
              <p className="font-medium text-red-400">Máxima</p>
            </div>
            <Link href={topTask.href || "#"}>
              <Button className="w-full">
                {topTask.action}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
