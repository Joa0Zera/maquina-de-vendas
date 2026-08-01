import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendSource } from "@maquina/database";

interface TrendProductCardProps {
  trend: {
    id: string;
    title: string;
    summary: string | null;
    source: TrendSource;
    opportunityScore: number | null;
    discoveredAt: Date;
  };
}

const sourceLabels: Record<TrendSource, string> = {
  reddit: "Reddit",
  tiktok: "TikTok",
  manual: "Manual",
};

const sourceColors: Record<TrendSource, string> = {
  reddit: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  tiktok: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  manual: "border-blue-500/30 bg-blue-500/10 text-blue-400",
};

export function TrendProductCard({ trend }: TrendProductCardProps) {
  const discoveredDate = new Date(trend.discoveredAt);
  const timeAgo = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" }).format(
    Math.round((discoveredDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    "day"
  );

  return (
    <Card className="group hover:border-zinc-700 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-medium line-clamp-2">
            {trend.title}
          </CardTitle>
          <Badge variant="default" className={sourceColors[trend.source]}>
            {sourceLabels[trend.source]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        {trend.summary && (
          <p className="text-sm text-zinc-400 line-clamp-3">{trend.summary}</p>
        )}
        {trend.opportunityScore !== null && (
          <div className="mt-3">
            <Badge variant="default" className="text-xs border-zinc-700 bg-zinc-900 text-zinc-400">
              Score: {trend.opportunityScore}/100
            </Badge>
          </div>
        )}
      </CardContent>
      <div className="pt-3 flex items-center justify-between border-t border-zinc-800 px-6 pb-6">
        <span className="text-xs text-zinc-500">{timeAgo}</span>
        <Button type="button" size="sm" variant="secondary" disabled>
          Em breve
        </Button>
      </div>
    </Card>
  );
}
