import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface LaunchHealthProps {
  score: number;
  className?: string;
}

export function LaunchHealth({ score, className }: LaunchHealthProps) {
  const getHealthColor = (score: number) => {
    if (score >= 91) return "bg-green-400";
    if (score >= 76) return "bg-blue-400";
    if (score >= 51) return "bg-yellow-400";
    if (score >= 26) return "bg-orange-400";
    return "bg-red-400";
  };

  const getHealthLabel = (score: number) => {
    if (score >= 91) return "Excelente";
    if (score >= 76) return "Muito Bom";
    if (score >= 51) return "Bom";
    if (score >= 26) return "Regular";
    return "Ruim";
  };

  const getHealthTextColor = (score: number) => {
    if (score >= 91) return "text-green-400";
    if (score >= 76) return "text-blue-400";
    if (score >= 51) return "text-yellow-400";
    if (score >= 26) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Launch Health</span>
        <span className={cn("text-sm font-semibold", getHealthTextColor(score))}>
          {getHealthLabel(score)}
        </span>
      </div>
      <Progress value={score} max={100} className="h-2" />
      <div className="text-right">
        <span className="text-2xl font-bold tracking-tight">{score}%</span>
      </div>
    </div>
  );
}
