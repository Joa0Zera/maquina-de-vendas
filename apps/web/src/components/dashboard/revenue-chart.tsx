"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

type TimeFilter = "today" | "7days" | "30days" | "90days";

interface RevenueData {
  date: string;
  revenue: number;
  sales: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [filter, setFilter] = useState<TimeFilter>("7days");

  const filters: { value: TimeFilter; label: string }[] = [
    { value: "today", label: "Hoje" },
    { value: "7days", label: "7 dias" },
    { value: "30days", label: "30 dias" },
    { value: "90days", label: "90 dias" },
  ];

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalSales = data.reduce((sum, d) => sum + d.sales, 0);

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <CardTitle>Gráfico de Receita</CardTitle>
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(f.value)}
                className={
                  filter === f.value
                    ? "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30"
                    : "text-zinc-400 hover:text-zinc-100"
                }
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <p className="text-sm text-zinc-400 mb-1">Receita Total</p>
              <p className="text-2xl font-bold text-green-400">
                R$ {(totalRevenue / 100).toFixed(2)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <p className="text-sm text-zinc-400 mb-1">Vendas Totais</p>
              <p className="text-2xl font-bold text-blue-400">{totalSales}</p>
            </div>
          </div>

          {/* Chart Placeholder - In a real implementation, this would use a charting library like recharts */}
          <div className="h-64 flex items-center justify-center border border-dashed border-zinc-800 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-zinc-700 mx-auto mb-2" />
              <p className="text-sm text-zinc-500">Gráfico de receita será implementado com biblioteca de gráficos</p>
              <p className="text-xs text-zinc-600 mt-1">Dados disponíveis: {data.length} períodos</p>
            </div>
          </div>

          {/* Data Table */}
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">Dados do período:</p>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {data.slice(0, 10).map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm p-2 rounded bg-zinc-900/50">
                  <span className="text-zinc-400">{d.date}</span>
                  <div className="flex gap-4">
                    <span className="text-green-400">R$ {(d.revenue / 100).toFixed(2)}</span>
                    <span className="text-blue-400">{d.sales} vendas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
