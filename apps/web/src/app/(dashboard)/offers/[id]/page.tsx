import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOfferById } from "@/lib/offers";
import { publishToCaktoAction } from "@/actions/checkout";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

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

const caktoStatusLabels: Record<string, string> = {
  inactive: "Inativo",
  active: "Ativo",
};

const caktoStatusColors: Record<string, string> = {
  inactive: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  active: "border-green-500/30 bg-green-500/10 text-green-400",
};

export default async function OfferDetailPage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id } = await params;
  const offer = await getOfferById(id, organizationId);

  if (!offer) {
    notFound();
  }

  const copy = offer.copy as {
    targetAudience?: string;
    problem?: string;
    desiredOutcome?: string;
    ebookStructure?: string[];
    trendId?: string;
    trendTitle?: string;
  } || {};

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{offer.name}</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {offer.headline}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="default" className={statusColors[offer.status]}>
            {statusLabels[offer.status]}
          </Badge>
          {offer.caktoStatus && (
            <Badge variant="default" className={caktoStatusColors[offer.caktoStatus]}>
              Cakto: {caktoStatusLabels[offer.caktoStatus]}
            </Badge>
          )}
          <Link
            href="/offers"
            className="inline-flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!offer.caktoOfferId && (
          <form action={publishToCaktoAction.bind(null, id)}>
            <Button type="submit" variant="default">
              Publicar na Cakto
            </Button>
          </form>
        )}
        <Link href={`/offers/${id}/checkout`}>
          <Button variant="secondary">
            Registrar Checkout
          </Button>
        </Link>
        {offer.caktoCheckoutUrl && (
          <a
            href={offer.caktoCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default">
              Abrir Checkout
            </Button>
          </a>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-2">Produto</h2>
            <p className="text-sm text-zinc-400">{offer.productTitle}</p>
          </div>

          {copy.targetAudience && (
            <div>
              <h2 className="text-lg font-medium mb-2">Público-Alvo</h2>
              <p className="text-sm text-zinc-400">{copy.targetAudience}</p>
            </div>
          )}

          {copy.problem && (
            <div>
              <h2 className="text-lg font-medium mb-2">Problema</h2>
              <p className="text-sm text-zinc-400">{copy.problem}</p>
            </div>
          )}

          {copy.desiredOutcome && (
            <div>
              <h2 className="text-lg font-medium mb-2">Resultado Desejado</h2>
              <p className="text-sm text-zinc-400">{copy.desiredOutcome}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {copy.trendTitle && (
            <div>
              <h2 className="text-lg font-medium mb-2">Tendência Origem</h2>
              <p className="text-sm text-zinc-400">{copy.trendTitle}</p>
            </div>
          )}

          {copy.ebookStructure && copy.ebookStructure.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-2">Estrutura do Ebook</h2>
              <ul className="text-sm text-zinc-400 space-y-1">
                {copy.ebookStructure.map((chapter, index) => (
                  <li key={index}>{index + 1}. {chapter}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
