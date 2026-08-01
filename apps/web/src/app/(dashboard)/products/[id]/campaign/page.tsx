import { db, products, campaigns } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function ProductCampaignPage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id } = await params;

  // Fetch product
  const [product] = await db
    .select({
      id: products.id,
      title: products.title,
    })
    .from(products)
    .where(and(eq(products.id, id), eq(products.organizationId, organizationId)))
    .limit(1);

  if (!product) {
    notFound();
  }

  // Fetch campaign
  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(
      and(
        eq(campaigns.productId, id),
        eq(campaigns.organizationId, organizationId)
      )
    )
    .limit(1);

  if (!campaign) {
    return (
      <div className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Campanha</h1>
            <p className="text-sm text-zinc-400 mt-1">
              {product.title}
            </p>
          </div>
          <Link href={`/products/${id}`}>
            <Button variant="secondary">Voltar</Button>
          </Link>
        </div>

        <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 text-center">
          <p className="text-zinc-400 mb-4">Nenhuma campanha encontrada.</p>
          <Link href={`/products/${id}`}>
            <Button variant="default">Gerar Campanha</Button>
          </Link>
        </div>
      </div>
    );
  }

  const objective = campaign.objective as { objective: string } | null;
  const audiences = campaign.audiences as Array<{ name: string; reason: string }> | null;
  const interests = campaign.interests as string[] | null;
  const adSets = campaign.adSets as Array<{ name: string; focus: string }> | null;
  const creatives = campaign.creatives as Array<{ headline: string; primaryText: string; cta: string; creativeType: string }> | null;

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Campanha</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {product.title}
          </p>
        </div>
        <Link href={`/products/${id}`}>
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      {/* Campaign Info */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">Campanha</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Nome</p>
            <p className="text-sm text-zinc-200">{campaign.campaignName || "-"}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Objetivo</p>
            <p className="text-sm text-zinc-200">{objective?.objective || "-"}</p>
          </div>
        </div>
      </div>

      {/* Audiences */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">Públicos ({audiences?.length || 0})</h2>
        <div className="space-y-2">
          {audiences?.map((audience, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-zinc-900 rounded border border-zinc-800">
              <span className="text-sm text-zinc-200">{audience.name}</span>
              <Badge className="text-xs border-zinc-700 bg-zinc-800">
                {audience.reason}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">Interesses ({interests?.length || 0})</h2>
        <div className="flex flex-wrap gap-2">
          {interests?.map((interest, index) => (
            <Badge key={index} className="bg-zinc-900 border-zinc-800">
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      {/* Ad Sets */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">Conjuntos ({adSets?.length || 0})</h2>
        <div className="space-y-2">
          {adSets?.map((adSet, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-zinc-900 rounded border border-zinc-800">
              <span className="text-sm text-zinc-200">{adSet.name}</span>
              <Badge className="text-xs border-zinc-700 bg-zinc-800">
                {adSet.focus}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Creatives */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">Criativos ({creatives?.length || 0})</h2>
        <div className="grid gap-4">
          {creatives?.map((creative, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 space-y-3">
              <p className="text-sm font-semibold text-zinc-200">{creative.headline}</p>
              <p className="text-sm text-zinc-400">{creative.primaryText}</p>
              <div className="flex gap-2">
                <Badge className="text-xs border-zinc-700 bg-zinc-800">
                  CTA: {creative.cta}
                </Badge>
                <Badge className="text-xs border-zinc-700 bg-zinc-800">
                  {creative.creativeType}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
