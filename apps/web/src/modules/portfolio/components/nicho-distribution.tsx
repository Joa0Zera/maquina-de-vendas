"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import type { NichoDistribution } from "@/modules/portfolio/types/portfolio";

interface NichoDistributionProps {
  distribution: NichoDistribution[];
}

export function NichoDistribution({ distribution }: NichoDistributionProps) {
  if (!distribution || distribution.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Distribuição por Nicho
        </h2>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="p-6">
            <p className="text-center text-zinc-400 py-8">Nenhum projeto encontrado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const maxCount = Math.max(...distribution.map(d => d.count), 1);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Distribuição por Nicho
      </h2>
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-6">
          <div className="space-y-3">
            {distribution.map((d) => {
              const percentage = (d.count / maxCount) * 100;
              return (
                <div key={d.nicho}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{d.nicho}</span>
                    <span className="text-sm text-zinc-400">{d.count} ({d.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
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
