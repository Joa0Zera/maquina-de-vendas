"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ProjectRanking } from "@/modules/portfolio/types/portfolio";

interface ContinueWorkingProps {
  projects: ProjectRanking[];
}

export function ContinueWorking({ projects }: ContinueWorkingProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Play className="h-5 w-5" />
          Continuar Trabalhando
        </h2>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="p-6">
            <p className="text-center text-zinc-400">Nenhum projeto encontrado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const buildingProjects = projects.filter(p => p.status === "building");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <Play className="h-5 w-5" />
        Continuar Trabalhando
      </h2>
      <div className="space-y-3">
        {buildingProjects.slice(0, 3).map((project) => (
          <Card key={project.projectId} className="hover:border-zinc-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{project.productName}</p>
                    <p className="text-sm text-zinc-400">{project.nextAction}</p>
                  </div>
                </div>
                <Link href={project.nextActionHref || "#"}>
                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Continuar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        {buildingProjects.length === 0 && (
          <Card className="border-zinc-800 bg-zinc-950">
            <CardContent className="p-6">
              <p className="text-center text-zinc-400">Nenhum projeto em construção</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
