import { db, intelligenceReports, products } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function ProductIntelligencePage({ params }: PageProps) {
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

  // Fetch intelligence report
  const [report] = await db
    .select()
    .from(intelligenceReports)
    .where(
      and(
        eq(intelligenceReports.productId, id),
        eq(intelligenceReports.organizationId, organizationId)
      )
    )
    .limit(1);

  if (!report) {
    return (
      <div className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Inteligência</h1>
            <p className="text-sm text-zinc-400 mt-1">
              {product.title}
            </p>
          </div>
          <Link href={`/products/${id}`}>
            <Button variant="secondary">Voltar</Button>
          </Link>
        </div>

        <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 text-center">
          <p className="text-zinc-400 mb-4">Nenhum relatório de inteligência encontrado.</p>
          <Link href={`/products/${id}`}>
            <Button variant="default">Gerar Inteligência</Button>
          </Link>
        </div>
      </div>
    );
  }

  const strengths = report.strengths as string[];
  const weaknesses = report.weaknesses as string[];
  const bottlenecks = report.bottlenecks as string[];
  const opportunities = report.opportunities as string[];
  const recommendations = report.recommendations as string[];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inteligência</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {product.title}
          </p>
        </div>
        <Link href={`/products/${id}`}>
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      {/* Score */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">Score de Inteligência:</span>
          <span className={`text-3xl font-bold ${getScoreColor(report.score)}`}>
            {report.score} / 100
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Strengths */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold text-green-400">Pontos Fortes</h2>
          {strengths.length === 0 ? (
            <p className="text-sm text-zinc-400">Nenhum ponto forte identificado.</p>
          ) : (
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="text-sm text-zinc-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Weaknesses */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">Pontos Fracos</h2>
          {weaknesses.length === 0 ? (
            <p className="text-sm text-zinc-400">Nenhum ponto fraco identificado.</p>
          ) : (
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="text-sm text-zinc-300 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  {weakness}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottlenecks */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold text-orange-400">Gargalos</h2>
          {bottlenecks.length === 0 ? (
            <p className="text-sm text-zinc-400">Nenhum gargalo identificado.</p>
          ) : (
            <ul className="space-y-2">
              {bottlenecks.map((bottleneck, index) => (
                <li key={index} className="text-sm text-zinc-300 flex items-start gap-2">
                  <Badge className="mt-0.5 bg-orange-500/10 border-orange-500/30 text-orange-400">
                    {index + 1}
                  </Badge>
                  {bottleneck}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Opportunities */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">Oportunidades</h2>
          {opportunities.length === 0 ? (
            <p className="text-sm text-zinc-400">Nenhuma oportunidade identificada.</p>
          ) : (
            <ul className="space-y-2">
              {opportunities.map((opportunity, index) => (
                <li key={index} className="text-sm text-zinc-300 flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">→</span>
                  {opportunity}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold text-purple-400">Recomendações</h2>
        {recommendations.length === 0 ? (
          <p className="text-sm text-zinc-400">Nenhuma recomendação.</p>
        ) : (
          <ol className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm text-zinc-300 flex items-start gap-3">
                <Badge className="mt-0.5 bg-purple-500/10 border-purple-500/30 text-purple-400">
                  {index + 1}
                </Badge>
                {recommendation}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
