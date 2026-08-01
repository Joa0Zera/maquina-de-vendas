import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LaunchScore } from "@/components/workspace/launch-score";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SmartLaunchAssistantProps {
  score: number;
  status: string;
  nextAction: {
    title: string;
    description: string;
    action: string;
    href: string;
    estimatedMinutes: number;
    impact: "Muito Alto" | "Alto" | "Médio" | "Baixo";
  };
  className?: string;
}

export function SmartLaunchAssistant({ score, status, nextAction, className }: SmartLaunchAssistantProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Muito Alto":
        return "text-green-400";
      case "Alto":
        return "text-blue-400";
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
      <CardHeader>
        <CardTitle className="text-base">Seu projeto está em</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LaunchScore score={score} status={status} />
        
        <div className="space-y-3 pt-2 border-t border-zinc-800">
          <div>
            <p className="text-sm font-medium text-zinc-100">Próxima ação recomendada</p>
            <p className="text-sm text-zinc-400 mt-1">{nextAction.title}</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className={getImpactColor(nextAction.impact)}>Impacto: {nextAction.impact}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-zinc-400">Tempo estimado: {nextAction.estimatedMinutes} minutos</span>
            </div>
          </div>
          
          <Link href={nextAction.href}>
            <Button className="w-full gap-2">
              Executar Agora
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
