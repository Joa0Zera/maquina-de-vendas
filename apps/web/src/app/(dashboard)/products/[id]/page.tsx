import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { db, copyAssets, intelligenceReports, offers, organicDistribution, products, trafficResearch } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { generateTrafficResearchAction } from "@/actions/traffic";
import { generateCopyAssetsAction } from "@/actions/copy";
import { generateIntelligenceReportAction } from "@/actions/intelligence";
import { generateOrganicDistributionAction } from "@/actions/organic-distribution";
import { requireOrganization } from "@/lib/session";
import { getSmartNextAction } from "@/lib/launch-assistant";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/ui/status-badge";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { MetricCard } from "@/components/ui/metric-card";
import { EmptyState } from "@/components/ui/empty-state";
import { CheckCircle2, Circle, Package, FileText, Globe, CreditCard, Copy, Users, Brain, TrendingUp, Settings } from "lucide-react";
import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar";
import { LaunchScore } from "@/components/workspace/launch-score";
import { ProjectChecklist } from "@/components/workspace/project-checklist";
import { ContextualRecommendation } from "@/components/launch/contextual-recommendation";

type PageProps = { params: Promise<{ id: string; tab?: string }> };

async function ProductDetailContent({ id, organizationId, tab }: { id: string; organizationId: string; tab?: string }) {
  // Fetch product
  const [product] = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      priceCents: products.priceCents,
      status: products.status,
      slug: products.slug,
      checkoutUrl: products.checkoutUrl,
    })
    .from(products)
    .where(and(eq(products.id, id), eq(products.organizationId, organizationId)))
    .limit(1);

  if (!product) {
    notFound();
  }

  // Fetch all related data in parallel
  const [research, copy, organic, intelligence, offerList] = await Promise.all([
    db
      .select()
      .from(trafficResearch)
      .where(
        and(
          eq(trafficResearch.productId, id),
          eq(trafficResearch.organizationId, organizationId)
        )
      )
      .limit(1),
    db
      .select()
      .from(copyAssets)
      .where(
        and(
          eq(copyAssets.productId, id),
          eq(copyAssets.organizationId, organizationId)
        )
      )
      .limit(1),
    db
      .select()
      .from(organicDistribution)
      .where(
        and(
          eq(organicDistribution.productId, id),
          eq(organicDistribution.organizationId, organizationId)
        )
      )
      .limit(1),
    db
      .select()
      .from(intelligenceReports)
      .where(
        and(
          eq(intelligenceReports.productId, id),
          eq(intelligenceReports.organizationId, organizationId)
        )
      )
      .limit(1),
    db
      .select()
      .from(offers)
      .where(
        and(
          eq(offers.productId, id),
          eq(offers.organizationId, organizationId)
        )
      )
      .limit(1),
  ]);

  const offer = offerList[0];
  const intelligenceData = intelligence[0];

  // Calculate score
  const score = intelligenceData?.score || 0;
  const scoreStatus = score >= 80 ? "READY" : score >= 50 ? "BUILDING" : "DRAFT";

  // Get next action for contextual recommendation
  const nextAction = await getSmartNextAction(id, organizationId);

  // Determine next action
  let nextActionLabel = "";
  let nextActionHref = "";
  let nextActionForm = null;

  if (!research) {
    nextActionLabel = "Gerar Pesquisa de Tráfego";
    nextActionForm = generateTrafficResearchAction.bind(null, id);
  } else if (!copy) {
    nextActionLabel = "Gerar Copy";
    nextActionForm = generateCopyAssetsAction.bind(null, id);
  } else if (!organic) {
    nextActionLabel = "Gerar Distribuição Orgânica";
    nextActionForm = generateOrganicDistributionAction.bind(null, id);
  } else if (!intelligence) {
    nextActionLabel = "Gerar Inteligência";
    nextActionForm = generateIntelligenceReportAction.bind(null, id);
  } else if (!offer) {
    nextActionLabel = "Criar Oferta";
    nextActionHref = `/product-factory`;
  } else if (!product.checkoutUrl) {
    nextActionLabel = "Configurar Checkout";
    nextActionHref = `/products/${id}/edit`;
  } else {
    nextActionLabel = "Ver Landing Page";
    nextActionHref = `/p/${product.slug}`;
  }

  const activeTab = tab || "resumo";

  return (
    <div className="flex h-screen overflow-hidden">
      <WorkspaceSidebar productId={id} productName={product.title} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
          {activeTab === "resumo" && (
            <div className="space-y-6">
              {/* Project Resume */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 bg-zinc-950/50">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-zinc-500">Projeto</p>
                    <p className="text-sm font-medium">{product.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Status</p>
                    <StatusBadge status={product.status === "published" ? "PUBLISHED" : "DRAFT"} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Score</p>
                    <p className="text-sm font-semibold">{score}/100</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Próxima ação</p>
                    <p className="text-sm text-zinc-400">{nextAction?.title || "Nenhuma"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Tempo restante</p>
                  <p className="text-sm font-medium">{nextAction?.estimatedMinutes || 0} min</p>
                </div>
              </div>

              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">{product.title}</h1>
                  <p className="text-sm text-zinc-400 mt-1">R$ {(product.priceCents / 100).toFixed(2)}</p>
                </div>
                <StatusBadge status={product.status === "published" ? "PUBLISHED" : "DRAFT"} />
              </div>

              {/* Metrics */}
              <div className="grid gap-4 md:grid-cols-3">
                <DashboardCard
                  title="Score do Projeto"
                  description="Avaliação completa do projeto"
                  status={<LaunchScore score={score} status={scoreStatus} />}
                />
                <DashboardCard
                  title="Status"
                  description="Estado atual do projeto"
                  status={<StatusBadge status={product.status === "published" ? "PUBLISHED" : "DRAFT"} />}
                />
                <DashboardCard
                  title="Próxima Ação"
                  description="Ação recomendada para avançar"
                  action={
                    nextActionForm ? (
                      <form action={nextActionForm}>
                        <Button type="submit" size="sm">
                          {nextActionLabel}
                        </Button>
                      </form>
                    ) : (
                      <Link href={nextActionHref}>
                        <Button size="sm">{nextActionLabel}</Button>
                      </Link>
                    )
                  }
                />
              </div>

              {/* Contextual Recommendation */}
              {nextAction && (
                <ContextualRecommendation
                  title={nextAction.title}
                  description={nextAction.description}
                  action={nextAction.action}
                  href={nextAction.href}
                  estimatedMinutes={nextAction.estimatedMinutes}
                  impact={nextAction.impact === "Muito Alto" ? "Alto" : nextAction.impact}
                />
              )}

              {/* Checklist */}
              <ProjectChecklist
                productId={id}
                items={[
                  {
                    id: "produto",
                    label: "Produto",
                    description: "Configurações básicas do produto",
                    completed: product.status === "published",
                    icon: Package,
                    action: { label: "Configurar", href: `/products/${id}/edit` },
                  },
                  {
                    id: "oferta",
                    label: "Oferta",
                    description: "Oferta de vendas gerada",
                    completed: !!offer,
                    icon: FileText,
                    action: offer 
                      ? { label: "Ver", href: `/offers/${offer.id}` }
                      : { label: "Criar", href: "/product-factory" },
                  },
                  {
                    id: "landing",
                    label: "Landing",
                    description: "Página de vendas pública",
                    completed: product.status === "published",
                    icon: Globe,
                    action: product.status === "published" 
                      ? { label: "Abrir", href: `/p/${product.slug}` }
                      : undefined,
                  },
                  {
                    id: "checkout",
                    label: "Checkout",
                    description: "URL de checkout configurada",
                    completed: !!product.checkoutUrl,
                    icon: CreditCard,
                    action: !product.checkoutUrl 
                      ? { label: "Configurar", href: `/products/${id}/edit` }
                      : undefined,
                  },
                  {
                    id: "copy",
                    label: "Copy",
                    description: "Assets de copywriting",
                    completed: !!copy,
                    icon: Copy,
                    action: copy 
                      ? { label: "Ver", href: `/products/${id}/copy` }
                      : research 
                      ? { label: "Gerar", href: "#" }
                      : undefined,
                  },
                  {
                    id: "distribuicao",
                    label: "Distribuição",
                    description: "Canais de distribuição orgânica",
                    completed: !!organic,
                    icon: Users,
                    action: organic 
                      ? { label: "Ver", href: `/products/${id}/organic` }
                      : copy 
                      ? { label: "Gerar", href: "#" }
                      : undefined,
                  },
                  {
                    id: "inteligencia",
                    label: "Inteligência",
                    description: "Relatório de inteligência",
                    completed: !!intelligence,
                    icon: Brain,
                    action: intelligence 
                      ? { label: "Ver", href: `/products/${id}/intelligence` }
                      : { label: "Gerar", href: "#" },
                  },
                ]}
              />
            </div>
          )}

          {activeTab === "produto" && (
            <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950 shadow-sm space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Descrição</h3>
                <p className="text-sm text-zinc-400">{product.description || "Sem descrição"}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Preço</h3>
                  <p className="text-sm text-zinc-400">R$ {(product.priceCents / 100).toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Status</h3>
                  <StatusBadge status={product.status === "published" ? "PUBLISHED" : "DRAFT"} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Slug</h3>
                  <p className="text-sm text-zinc-400">{product.slug}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Checkout URL</h3>
                  <p className="text-sm text-zinc-400">{product.checkoutUrl || "Não configurado"}</p>
                </div>
              </div>
              <div className="pt-4">
                <Link href={`/products/${id}/edit`}>
                  <Button>Editar Produto</Button>
                </Link>
              </div>
            </div>
          )}

          {activeTab === "oferta" && (
            offer ? (
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950 shadow-sm space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">{offer.name}</h3>
                  <p className="text-sm text-zinc-400">{offer.headline}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Status</h3>
                  <StatusBadge status={offer.status === "published" ? "PUBLISHED" : offer.status === "ready" ? "READY" : "DRAFT"} />
                </div>
                <div className="pt-4">
                  <Link href={`/offers/${offer.id}`}>
                    <Button>Ver Oferta</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Package}
                title="Nenhuma oferta criada"
                description="Crie uma oferta para começar a vender este produto."
                action={{ label: "Criar Oferta", href: "/product-factory" }}
              />
            )
          )}

          {activeTab === "landing" && (
            product.status === "published" ? (
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950 shadow-sm space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Landing Page</h3>
                  <p className="text-sm text-zinc-400">Sua landing page está publicada.</p>
                </div>
                <div className="pt-4">
                  <Link href={`/p/${product.slug}`} target="_blank">
                    <Button>Abrir Landing Page</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Globe}
                title="Landing Page não publicada"
                description="Publique o produto para ativar a landing page."
                action={{ label: "Editar Produto", href: `/products/${id}/edit` }}
              />
            )
          )}

          {activeTab === "checkout" && (
            product.checkoutUrl ? (
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950 shadow-sm space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Checkout Configurado</h3>
                  <p className="text-sm text-zinc-400">{product.checkoutUrl}</p>
                </div>
                <div className="pt-4">
                  <a href={product.checkoutUrl} target="_blank" rel="noopener noreferrer">
                    <Button>Abrir Checkout</Button>
                  </a>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={CreditCard}
                title="Checkout não configurado"
                description="Configure a URL do checkout para começar a vender."
                action={{ label: "Editar Produto", href: `/products/${id}/edit` }}
              />
            )
          )}

          {activeTab === "copy" && (
            copy ? (
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950 shadow-sm space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Copy Assets</h3>
                  <p className="text-sm text-zinc-400">Assets de copywriting gerados com sucesso.</p>
                </div>
                <div className="pt-4">
                  <Link href={`/products/${id}/copy`}>
                    <Button>Ver Copy</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Copy}
                title="Copy não gerada"
                description="Gere os assets de copywriting para este produto."
                action={research ? { label: "Gerar Copy", href: "#" } : undefined}
              />
            )
          )}

          {activeTab === "distribuicao" && (
            organic ? (
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950 shadow-sm space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Distribuição Orgânica</h3>
                  <p className="text-sm text-zinc-400">Canais de distribuição configurados.</p>
                </div>
                <div className="pt-4">
                  <Link href={`/products/${id}/organic`}>
                    <Button>Ver Distribuição</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="Distribuição não configurada"
                description="Configure os canais de distribuição orgânica."
                action={copy ? { label: "Gerar Distribuição", href: "#" } : undefined}
              />
            )
          )}

          {activeTab === "inteligencia" && (
            intelligence ? (
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950 shadow-sm space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Relatório de Inteligência</h3>
                  <p className="text-sm text-zinc-400">Score: {intelligenceData?.score || 0}/100</p>
                </div>
                <div className="pt-4">
                  <Link href={`/products/${id}/intelligence`}>
                    <Button>Ver Inteligência</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Brain}
                title="Inteligência não gerada"
                description="Gere o relatório de inteligência para este produto."
                action={{ label: "Gerar Inteligência", href: "#" }}
              />
            )
          )}

          {activeTab === "configuracoes" && (
            <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950 shadow-sm space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Configurações do Projeto</h3>
                <p className="text-sm text-zinc-400">Configure as opções avançadas do projeto.</p>
              </div>
              <div className="pt-4">
                <Link href={`/products/${id}/edit`}>
                  <Button>Editar Configurações</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id, tab } = await params;

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <ProductDetailContent id={id} organizationId={organizationId} tab={tab} />
    </Suspense>
  );
}
