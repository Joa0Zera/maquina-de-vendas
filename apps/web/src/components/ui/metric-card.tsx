import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  variation?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  variation,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "rounded-xl border border-zinc-800/80 bg-zinc-950/50 shadow-sm",
        "hover:shadow-lg hover:shadow-zinc-950/20 hover:border-zinc-700/80",
        "hover:-translate-y-0.5 hover:scale-[1.01]",
        "transition-all duration-200 ease-out",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            {variation && (
              <p
                className={cn(
                  "text-xs mt-1 font-medium",
                  variation.trend === "up" && "text-green-400",
                  variation.trend === "down" && "text-red-400",
                  variation.trend === "neutral" && "text-muted-foreground"
                )}
              >
                {variation.value}
              </p>
            )}
          </div>
          {Icon && (
            <div className="flex-shrink-0">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
