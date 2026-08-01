import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listOffersByOrganization } from "@/lib/offers";
import { requireOrganization } from "@/lib/session";
import { generateEbookFromOfferAction } from "@/actions/ebooks";

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

export default async function EbooksPage() {
  const { organizationId } = await requireOrganization();
  const offers = await listOffersByOrganization(organizationId);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ebooks</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Gere ebooks a partir de suas ofertas.
          </p>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-lg divide-y divide-zinc-800 bg-zinc-950">
        {offers.length === 0 ? (
          <div className="p-8 text-center text-zinc-400">
            <p>Nenhuma oferta encontrada. Crie uma oferta primeiro.</p>
          </div>
        ) : (
          offers.map((offer) => (
            <div key={offer.id} className="p-6 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-zinc-200">{offer.name}</h3>
                  <Badge variant="default" className={statusColors[offer.status]}>
                    {statusLabels[offer.status]}
                  </Badge>
                </div>
                <p className="text-sm text-zinc-400 line-clamp-1">{offer.headline}</p>
              </div>
              <form action={generateEbookFromOfferAction.bind(null, offer.id)}>
                <Button type="submit" size="sm">
                  Gerar Ebook
                </Button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
