import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ShoppingCart, CheckCircle2, Target } from "lucide-react";

interface SmartInsightsProps {
  readyToSell: number;
  withoutCheckout: number;
  above90: number;
  opportunities: number;
}

export function SmartInsights({ readyToSell, withoutCheckout, above90, opportunities }: SmartInsightsProps) {
  const insights = [
    {
      icon: CheckCircle2,
      label: "Projetos prontos para vender",
      value: readyToSell,
      color: "text-green-400",
    },
    {
      icon: ShoppingCart,
      label: "Projetos sem checkout",
      value: withoutCheckout,
      color: "text-orange-400",
    },
    {
      icon: TrendingUp,
      label: "Projetos acima de 90 pontos",
      value: above90,
      color: "text-blue-400",
    },
    {
      icon: Target,
      label: "Oportunidades encontradas",
      value: opportunities,
      color: "text-purple-400",
    },
  ];

  return (
    <Card className="border-zinc-800 bg-zinc-950 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Você possui</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div key={insight.label} className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${insight.color}`} />
                <div>
                  <p className="text-2xl font-semibold">{insight.value}</p>
                  <p className="text-xs text-zinc-400">{insight.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
