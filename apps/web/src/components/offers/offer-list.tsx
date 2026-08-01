import { OfferCard } from "./offer-card";

interface OfferListProps {
  offers: Array<{
    id: string;
    name: string;
    headline: string | null;
    status: "draft" | "generating" | "ready" | "published" | "archived";
    createdAt: Date;
    productTitle: string;
  }>;
}

export function OfferList({ offers }: OfferListProps) {
  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">Nenhuma oferta encontrada.</p>
        <p className="text-sm text-zinc-500 mt-2">
          Vá ao Product Factory para gerar produtos a partir de tendências.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
