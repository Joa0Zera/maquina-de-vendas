"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import type { NichoDistribution } from "@/modules/portfolio/types/portfolio";

interface SmartOpportunitiesProps {
  distribution: NichoDistribution[];
}

export function SmartOpportunities({ distribution }: SmartOpportunitiesProps) {
  if (!distribution || distribution.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Oportunidades
        </h2>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="p-6">
            <p className="text-center text-zinc-400">Nenhum projeto encontrado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalProjects = distribution.reduce((sum, d) => sum + d.count, 0);
  
  const suggestions: string[] = [];
  
  if (distribution.length > 0) {
    const topNicho = distribution[0];
    if (topNicho && topNicho.percentage > 50) {
      suggestions.push(`Você tem ${topNicho.percentage}% dos projetos em ${topNicho.nicho}. Considere diversificar.`);
    }
  }
  
  const hasEducation = distribution.some(d => d.nicho === "Educação");
  const hasIdiomas = distribution.some(d => d.nicho === "Idiomas");
  
  if (!hasEducation) {
    suggestions.push("Considere criar produtos em Educação.");
  }
  if (!hasIdiomas) {
    suggestions.push("Considere criar produtos em Idiomas.");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <Lightbulb className="h-5 w-5" />
        Oportunidades
      </h2>
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-400 mb-3">Você possui:</p>
              <div className="space-y-2">
                {distribution.map((d) => (
                  <div key={d.nicho} className="flex items-center justify-between">
                    <span className="text-sm">{d.nicho}</span>
                    <span className="text-sm font-medium">{d.count} projetos</span>
                  </div>
                ))}
              </div>
            </div>
            {suggestions.length > 0 && (
              <div className="pt-4 border-t border-zinc-800">
                <p className="text-sm text-zinc-400 mb-2">Sugestão:</p>
                <p className="text-sm">{suggestions[0]}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
