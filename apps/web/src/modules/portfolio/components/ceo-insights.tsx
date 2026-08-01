"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import type { PortfolioInsights } from "@/modules/portfolio/types/portfolio";

interface CEOInsightsProps {
  insights: PortfolioInsights;
}

export function CEOInsights({ insights }: CEOInsightsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <Brain className="h-5 w-5" />
        Insights
      </h2>
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-400 mb-3">Hoje existem:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-2xl font-bold text-green-400">{insights.readyToSell}</p>
                  <p className="text-xs text-zinc-400">Prontos para vender</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <p className="text-2xl font-bold text-blue-400">{insights.almostReady}</p>
                  <p className="text-xs text-zinc-400">Quase prontos</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <p className="text-2xl font-bold text-orange-400">{insights.abandoned}</p>
                  <p className="text-xs text-zinc-400">Abandonados</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <p className="text-2xl font-bold text-purple-400">{insights.excellent}</p>
                  <p className="text-xs text-zinc-400">Excelentes</p>
                </div>
              </div>
            </div>
            {insights.recommendations.length > 0 && (
              <div className="pt-4 border-t border-zinc-800">
                <p className="text-sm text-zinc-400 mb-2">Recomendações:</p>
                <ul className="space-y-2">
                  {insights.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
