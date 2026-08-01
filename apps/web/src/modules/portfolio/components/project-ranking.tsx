"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ProjectRanking } from "@/modules/portfolio/types/portfolio";

interface ProjectRankingProps {
  rankings: ProjectRanking[];
}

const priorityColors: Record<string, string> = {
  ALTA: "bg-red-500/10 text-red-400 border-red-500/30",
  MÉDIA: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  BAIXA: "bg-green-500/10 text-green-400 border-green-500/30",
};

const statusColors: Record<string, string> = {
  ready: "bg-green-500/10 text-green-400 border-green-500/30",
  building: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  paused: "bg-gray-500/10 text-gray-400 border-gray-500/30",
};

export function ProjectRanking({ rankings }: ProjectRankingProps) {
  if (!rankings || rankings.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Ranking de Projetos
        </h2>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="p-6">
            <p className="text-center text-zinc-400">Nenhum projeto encontrado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <Trophy className="h-5 w-5" />
        Ranking de Projetos
      </h2>
      <div className="space-y-3">
        {rankings.slice(0, 5).map((project) => {
          const priorityColor = priorityColors[project.priority] || priorityColors["BAIXA"];
          const statusColor = statusColors[project.status] || statusColors["paused"];
          return (
            <Card key={project.projectId} className="hover:border-zinc-700 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-sm font-bold">
                      {project.position}
                    </div>
                    <div>
                      <p className="font-medium">{project.productName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="default" className={statusColor}>
                          {project.status}
                        </Badge>
                        <Badge variant="default" className={priorityColor}>
                          {project.priority}
                        </Badge>
                        <span className="text-sm text-zinc-400">{project.score}/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm text-zinc-400">{project.nextAction}</p>
                    </div>
                    <Link href={project.nextActionHref || "#"}>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
