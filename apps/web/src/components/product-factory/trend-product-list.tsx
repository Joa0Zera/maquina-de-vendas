import { TrendProductCard } from "./trend-product-card";

interface TrendProductListProps {
  trends: Array<{
    id: string;
    title: string;
    summary: string | null;
    source: "reddit" | "tiktok" | "manual";
    opportunityScore: number | null;
    discoveredAt: Date;
  }>;
}

export function TrendProductList({ trends }: TrendProductListProps) {
  if (trends.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">Nenhuma tendência encontrada.</p>
        <p className="text-sm text-zinc-500 mt-2">
          Importe tendências do Reddit para começar a gerar produtos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {trends.map((trend) => (
        <TrendProductCard key={trend.id} trend={trend} />
      ))}
    </div>
  );
}
