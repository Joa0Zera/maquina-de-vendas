import { db, products, trafficResearch } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function ProductTrafficPage({ params }: PageProps) {
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

  // Fetch traffic research
  const [research] = await db
    .select()
    .from(trafficResearch)
    .where(
      and(
        eq(trafficResearch.productId, id),
        eq(trafficResearch.organizationId, organizationId)
      )
    )
    .limit(1);

  if (!research) {
    return (
      <div className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Pesquisa de Tráfego</h1>
            <p className="text-sm text-zinc-400 mt-1">
              {product.title}
            </p>
          </div>
          <Link href={`/products/${id}`}>
            <Button variant="secondary">Voltar</Button>
          </Link>
        </div>

        <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 text-center">
          <p className="text-zinc-400 mb-4">Nenhuma pesquisa de tráfego encontrada.</p>
          <Link href={`/products/${id}`}>
            <Button variant="default">Gerar Pesquisa de Tráfego</Button>
          </Link>
        </div>
      </div>
    );
  }

  const keywords = research.keywords as string[];
  const communities = research.communities as Array<{ name: string; platform: string }>;
  const youtubeChannels = research.youtubeChannels as Array<{ name: string; topic: string }>;
  const competitors = research.competitors as Array<{ name: string; reason: string }>;
  const adAngles = research.adAngles as Array<{ headline: string; angle: string }>;

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pesquisa de Tráfego</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {product.title}
          </p>
        </div>
        <Link href={`/products/${id}`}>
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Keywords */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold">Keywords ({keywords.length})</h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <Badge key={index} className="bg-zinc-900 border-zinc-800">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* Communities */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold">Comunidades ({communities.length})</h2>
          <div className="space-y-2">
            {communities.map((community, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-zinc-900 rounded border border-zinc-800">
                <span className="text-sm text-zinc-200">{community.name}</span>
                <Badge className="text-xs border-zinc-700 bg-zinc-800">
                  {community.platform}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* YouTube Channels */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold">Canais do YouTube ({youtubeChannels.length})</h2>
          <div className="space-y-2">
            {youtubeChannels.map((channel, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-zinc-900 rounded border border-zinc-800">
                <span className="text-sm text-zinc-200">{channel.name}</span>
                <Badge className="text-xs border-zinc-700 bg-zinc-800">
                  {channel.topic}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Competitors */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold">Concorrentes ({competitors.length})</h2>
          <div className="space-y-2">
            {competitors.map((competitor, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-zinc-900 rounded border border-zinc-800">
                <span className="text-sm text-zinc-200">{competitor.name}</span>
                <Badge className="text-xs border-zinc-700 bg-zinc-800">
                  {competitor.reason}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ad Angles */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">Ângulos de Anúncio ({adAngles.length})</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {adAngles.map((ad, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 space-y-2">
              <p className="text-sm font-medium text-zinc-200">{ad.headline}</p>
              <Badge className="text-xs border-zinc-700 bg-zinc-800">
                {ad.angle}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
