import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ContextualRecommendationProps {
  title: string;
  description: string;
  action: string;
  href: string;
  estimatedMinutes: number;
  impact: "Alto" | "Médio" | "Baixo";
  className?: string;
}

export function ContextualRecommendation({
  title,
  description,
  action,
  href,
  estimatedMinutes,
  impact,
  className,
}: ContextualRecommendationProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Alto":
        return "text-green-400";
      case "Médio":
        return "text-yellow-400";
      case "Baixo":
        return "text-zinc-400";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <Card className={cn("border-zinc-800 bg-zinc-950 shadow-sm", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-zinc-100">Próxima recomendação</p>
            <p className="text-sm text-zinc-400 mt-1">{title}</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className={getImpactColor(impact)}>Impacto: {impact}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-zinc-400">Tempo: {estimatedMinutes} minutos</span>
            </div>
          </div>
          
          <Link href={href}>
            <Button size="sm" className="w-full gap-2">
              {action}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
