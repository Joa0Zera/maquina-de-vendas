import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateLandingPageFromOfferAction } from "@/actions/landing-generator";

interface OfferLandingCardProps {
  offer: {
    id: string;
    name: string;
    headline: string | null;
    status: "draft" | "generating" | "ready" | "published" | "archived";
    createdAt: Date;
    productTitle: string;
  };
}

const statusLabels: Record<string, string> = {
  draft: "Rascunho",
  generating: "Gerando",
  ready: "Pronto",
  published: "Publicado",
  archived: "Arquivado",
};

const statusColors: Record<string, string> = {
  draft: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  generating: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  ready: "border-green-500/30 bg-green-500/10 text-green-400",
  published: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  archived: "border-gray-500/30 bg-gray-500/10 text-gray-400",
};

export function OfferLandingCard({ offer }: OfferLandingCardProps) {
  const timeAgo = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" }).format(
    Math.round((offer.createdAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    "day"
  );

  return (
    <Card className="group hover:border-zinc-700 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-medium line-clamp-1">
            {offer.name}
          </CardTitle>
          <Badge variant="default" className={statusColors[offer.status]}>
            {statusLabels[offer.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        {offer.headline && (
          <p className="text-sm text-zinc-400 line-clamp-2">{offer.headline}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-zinc-500">{timeAgo}</span>
          <span className="text-xs text-zinc-400">{offer.productTitle}</span>
        </div>
      </CardContent>
      <div className="pt-3 flex items-center justify-between border-t border-zinc-800 px-6 pb-6">
        <span className="text-xs text-zinc-500">Gerar Landing Page</span>
        <form action={generateLandingPageFromOfferAction.bind(null, offer.id)}>
          <Button type="submit" size="sm">
            Gerar Landing
          </Button>
        </form>
      </div>
    </Card>
  );
}
