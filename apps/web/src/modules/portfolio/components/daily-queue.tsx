"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListTodo, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import type { DailyTask } from "@/modules/portfolio/types/portfolio";

interface DailyQueueProps {
  tasks: DailyTask[];
}

const impactColors: Record<string, string> = {
  "Muito Alto": "bg-red-500/10 text-red-400 border-red-500/30",
  "Alto": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  "Médio": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  "Baixo": "bg-green-500/10 text-green-400 border-green-500/30",
};

export function DailyQueue({ tasks }: DailyQueueProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <ListTodo className="h-5 w-5" />
          Fila de Tarefas
        </h2>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="p-4">
            <p className="text-center text-zinc-400 py-8">Nenhuma tarefa pendente</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <ListTodo className="h-5 w-5" />
        Fila de Tarefas
      </h2>
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-4">
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task, index) => {
              const impactColor = impactColors[task.impact] || impactColors["Médio"];
              return (
                <div key={task.id} className="flex items-start gap-4 p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{task.title}</p>
                    <p className="text-sm text-zinc-400 truncate">{task.projectName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm text-zinc-400">
                      <Clock className="h-3 w-3" />
                      {task.estimatedMinutes}m
                    </div>
                    <Badge variant="default" className={impactColor}>
                      {task.impact}
                    </Badge>
                    <Link href={task.href || "#"}>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
