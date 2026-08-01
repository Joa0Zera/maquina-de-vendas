import { TrendCard } from "./trend-card";

interface TrendListProps {
  trends: Array<{
    id: string;
    title: string;
    summary: string | null;
    source: "reddit" | "tiktok" | "manual";
    opportunityScore: number | null;
    discoveredAt: Date;
  }>;
}

export function TrendList({ trends }: TrendListProps) {
  if (trends.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">Nenhuma tendência encontrada.</p>
        <p className="text-sm text-zinc-500 mt-2">
          Crie sua primeira tendência para começar a monitorar oportunidades.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {trends.map((trend) => (
        <TrendCard key={trend.id} trend={trend} />
      ))}
    </div>
  );
}
