import { db, organicDistribution, products } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function ProductOrganicPage({ params }: PageProps) {
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

  // Fetch organic distribution
  const [distribution] = await db
    .select()
    .from(organicDistribution)
    .where(
      and(
        eq(organicDistribution.productId, id),
        eq(organicDistribution.organizationId, organizationId)
      )
    )
    .limit(1);

  if (!distribution) {
    return (
      <div className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Distribuição Orgânica</h1>
            <p className="text-sm text-zinc-400 mt-1">
              {product.title}
            </p>
          </div>
          <Link href={`/products/${id}`}>
            <Button variant="secondary">Voltar</Button>
          </Link>
        </div>

        <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 text-center">
          <p className="text-zinc-400 mb-4">Nenhuma distribuição orgânica encontrada.</p>
          <Link href={`/products/${id}`}>
            <Button variant="default">Gerar Distribuição Orgânica</Button>
          </Link>
        </div>
      </div>
    );
  }

  const facebookGroups = distribution.facebookGroups as any[];
  const whatsappGroups = distribution.whatsappGroups as any[];
  const telegramGroups = distribution.telegramGroups as any[];
  const discordCommunities = distribution.discordCommunities as any[];
  const hashtags = distribution.hashtags as string[];
  const forums = distribution.forums as any[];

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Distribuição Orgânica</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {product.title}
          </p>
        </div>
        <Link href={`/products/${id}`}>
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      {/* Facebook Groups */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold text-zinc-200">Grupos Facebook ({facebookGroups.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400">Grupo</th>
                <th className="text-left py-3 px-4 text-zinc-400">Categoria</th>
                <th className="text-left py-3 px-4 text-zinc-400">Membros</th>
                <th className="text-left py-3 px-4 text-zinc-400">Score</th>
                <th className="text-left py-3 px-4 text-zinc-400">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {facebookGroups.map((group, index) => (
                <tr key={index} className="border-b border-zinc-800 last:border-0">
                  <td className="py-3 px-4 text-zinc-300">{group.name}</td>
                  <td className="py-3 px-4 text-zinc-300">{group.category}</td>
                  <td className="py-3 px-4 text-zinc-300">{group.members.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <Badge className={group.score >= 80 ? "bg-green-500/10 border-green-500/30 text-green-400" : group.score >= 60 ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : "bg-red-500/10 border-red-500/30 text-red-400"}>
                      {group.score}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{group.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WhatsApp Groups */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold text-zinc-200">Grupos WhatsApp ({whatsappGroups.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400">Grupo</th>
                <th className="text-left py-3 px-4 text-zinc-400">Participantes</th>
                <th className="text-left py-3 px-4 text-zinc-400">Score</th>
                <th className="text-left py-3 px-4 text-zinc-400">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {whatsappGroups.map((group, index) => (
                <tr key={index} className="border-b border-zinc-800 last:border-0">
                  <td className="py-3 px-4 text-zinc-300">{group.name}</td>
                  <td className="py-3 px-4 text-zinc-300">{group.members.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <Badge className={group.score >= 80 ? "bg-green-500/10 border-green-500/30 text-green-400" : group.score >= 60 ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : "bg-red-500/10 border-red-500/30 text-red-400"}>
                      {group.score}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{group.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Telegram Groups */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold text-zinc-200">Canais Telegram ({telegramGroups.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400">Canal</th>
                <th className="text-left py-3 px-4 text-zinc-400">Categoria</th>
                <th className="text-left py-3 px-4 text-zinc-400">Score</th>
              </tr>
            </thead>
            <tbody>
              {telegramGroups.map((group, index) => (
                <tr key={index} className="border-b border-zinc-800 last:border-0">
                  <td className="py-3 px-4 text-zinc-300">{group.name}</td>
                  <td className="py-3 px-4 text-zinc-300">{group.category}</td>
                  <td className="py-3 px-4">
                    <Badge className={group.score >= 80 ? "bg-green-500/10 border-green-500/30 text-green-400" : group.score >= 60 ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : "bg-red-500/10 border-red-500/30 text-red-400"}>
                      {group.score}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discord Communities */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold text-zinc-200">Comunidades Discord ({discordCommunities.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400">Comunidade</th>
                <th className="text-left py-3 px-4 text-zinc-400">Categoria</th>
                <th className="text-left py-3 px-4 text-zinc-400">Score</th>
              </tr>
            </thead>
            <tbody>
              {discordCommunities.map((community, index) => (
                <tr key={index} className="border-b border-zinc-800 last:border-0">
                  <td className="py-3 px-4 text-zinc-300">{community.name}</td>
                  <td className="py-3 px-4 text-zinc-300">{community.category}</td>
                  <td className="py-3 px-4">
                    <Badge className={community.score >= 80 ? "bg-green-500/10 border-green-500/30 text-green-400" : community.score >= 60 ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : "bg-red-500/10 border-red-500/30 text-red-400"}>
                      {community.score}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hashtags */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold text-zinc-200">Hashtags ({hashtags.length})</h2>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, index) => (
            <Badge key={index} className="text-zinc-300">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Forums */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold text-zinc-200">Fóruns ({forums.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400">Nome</th>
                <th className="text-left py-3 px-4 text-zinc-400">Tema</th>
                <th className="text-left py-3 px-4 text-zinc-400">Score</th>
              </tr>
            </thead>
            <tbody>
              {forums.map((forum, index) => (
                <tr key={index} className="border-b border-zinc-800 last:border-0">
                  <td className="py-3 px-4 text-zinc-300">{forum.name}</td>
                  <td className="py-3 px-4 text-zinc-300">{forum.topic}</td>
                  <td className="py-3 px-4">
                    <Badge className={forum.score >= 80 ? "bg-green-500/10 border-green-500/30 text-green-400" : forum.score >= 60 ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : "bg-red-500/10 border-red-500/30 text-red-400"}>
                      {forum.score}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
