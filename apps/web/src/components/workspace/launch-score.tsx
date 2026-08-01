import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface LaunchScoreProps {
  score: number;
  status: string;
  className?: string;
}

export function LaunchScore({ score, status, className }: LaunchScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-400";
    if (score >= 50) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-end justify-between">
        <span className="text-4xl font-bold tracking-tight">{score}</span>
        <span className="text-sm text-zinc-400 mb-1">/ 100</span>
      </div>
      
      <Progress value={score} max={100} className="h-2" />
      
      <div className="flex items-center justify-between">
        <span className={cn("text-sm font-semibold", getScoreColor(score))}>
          {status}
        </span>
        <span className="text-xs text-zinc-500">
          {score >= 80 ? "Excelente" : score >= 50 ? "Bom" : "Precisa melhorar"}
        </span>
      </div>
    </div>
  );
}
