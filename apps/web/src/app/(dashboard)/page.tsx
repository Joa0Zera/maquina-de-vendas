import { Suspense } from "react";
import { getOrganizationMetrics } from "@/lib/products";
import { listProductsByOrganization } from "@/lib/products";
import { getSmartNextAction, getProjectScore, getProjectStatus } from "@/lib/launch-assistant";
import { requireOrganization } from "@/lib/session";
import { formatCurrencyFromCents } from "@/lib/utils";
import { getCaktoMetrics, hasCaktoIntegration, getRevenueData, getFeaturedProducts } from "@/lib/cakto";
import { PortfolioEngine } from "@/modules/portfolio/lib/portfolio-engine";
import type { DailyTask } from "@/modules/portfolio/types/portfolio";
import Link from "next/link";
import { LoadingCard } from "@/components/ui/loading-card";
import { MetricCard } from "@/components/ui/metric-card";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { SmartLaunchAssistant } from "@/components/launch/smart-launch-assistant";
import { SmartInsights } from "@/components/launch/smart-insights";
import { PortfolioDashboard } from "@/modules/portfolio/components/portfolio-dashboard";
import { ProjectRanking } from "@/modules/portfolio/components/project-ranking";
import { CEOAssistant } from "@/modules/portfolio/components/ceo-assistant";
import { DailyQueue } from "@/modules/portfolio/components/daily-queue";
import { PortfolioHealth } from "@/modules/portfolio/components/portfolio-health";
import { SmartOpportunities } from "@/modules/portfolio/components/smart-opportunities";
import { NichoDistribution } from "@/modules/portfolio/components/nicho-distribution";
import { SmartTimeline } from "@/modules/portfolio/components/smart-timeline";
import { ContinueWorking } from "@/modules/portfolio/components/continue-working";
import { CEOInsights } from "@/modules/portfolio/components/ceo-insights";
import { PortfolioResume } from "@/modules/portfolio/components/portfolio-resume";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { FeaturedProducts } from "@/components/dashboard/featured-products";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Package, DollarSign, Activity, CreditCard, AlertTriangle, Brain, FileText, Search, Globe, User, Copy, Image, Users, BarChart3 } from "lucide-react";

async function DashboardContent({ organizationId }: { organizationId: string }) {
  // Mock role for adaptive dashboard - in production this would come from user profile
  const userRole = "ceo"; // Options: ceo, gestor, copywriter, trafego, produto, pesquisa
  const [metrics, products, portfolioHealth, rankings, dailyQueue, insights, nichoDistribution, timeline, caktoMetrics, hasCakto, revenueData, featuredProducts, revenueData7d, revenueData30d, revenueData90d] = await Promise.all([
    getOrganizationMetrics(organizationId),
    listProductsByOrganization(organizationId),
    PortfolioEngine.getPortfolioHealth(organizationId),
    PortfolioEngine.getProjectsRanking(organizationId),
    PortfolioEngine.getDailyQueue(organizationId),
    PortfolioEngine.getPortfolioInsights(organizationId),
    PortfolioEngine.getNichoDistribution(organizationId),
    PortfolioEngine.getSmartTimeline(organizationId),
    getCaktoMetrics(organizationId),
    hasCaktoIntegration(organizationId),
    getRevenueData(organizationId, 30),
    getFeaturedProducts(organizationId),
    getRevenueData(organizationId, 7),
    getRevenueData(organizationId, 30),
    getRevenueData(organizationId, 90),
  ]);

  // Get current date in Portuguese
  const now = new Date();
  const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const formattedDate = `${day} de ${month}`;

  const recentProjects = products.slice(0, 5);

  // Calculate insights
  const readyToSell = products.filter(p => p.status === "published" && p.checkoutUrl).length;
  const withoutCheckout = products.filter(p => p.status === "published" && !p.checkoutUrl).length;
  const above90 = 0; // Would need to calculate scores for all products
  const opportunities = products.filter(p => p.status === "draft").length;

  // Get the project with highest incomplete score for assistant
  const incompleteProjects = products.filter(p => p.status !== "published" || !p.checkoutUrl);
  const assistantProject = incompleteProjects.length > 0 
    ? incompleteProjects[0] 
    : (products.length > 0 ? products[0] : null);

  let assistantData = null;
  if (assistantProject) {
    const [score, nextAction] = await Promise.all([
      getProjectScore(assistantProject.id, organizationId),
      getSmartNextAction(assistantProject.id, organizationId),
    ]);
    const status = await getProjectStatus(score);
    
    if (nextAction) {
      assistantData = {
        project: assistantProject,
        score,
        status,
        nextAction,
      };
    }
  }

  const topTask: DailyTask | null = dailyQueue.length > 0 ? dailyQueue[0] ?? null : null;
  const topProject = rankings.length > 0 ? rankings[0] ?? null : null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* CEO Orchestrator - Bloco Superior */}
      <div className="p-8 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 hover:shadow-xl hover:border-zinc-700 transition-all shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Bom dia, João 👋
            </h1>
            <p className="text-sm text-zinc-400 mt-2">{formattedDate}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">CEO Orchestrator</p>
            <p className="text-sm font-medium text-zinc-100">Sistema Operacional</p>
          </div>
        </div>
        
        {/* Hoje, Meta, Receita, Produto em foco, Missão do dia */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <p className="text-xs text-zinc-500 mb-1">Hoje</p>
            <p className="text-2xl font-bold text-zinc-100">{formatCurrencyFromCents(revenueData7d.reduce((sum, d) => sum + (d as any).value, 0) / 7)}</p>
            <p className="text-xs text-green-400 mt-1">+12%</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <p className="text-xs text-zinc-500 mb-1">Meta</p>
            <p className="text-2xl font-bold text-zinc-100">{formatCurrencyFromCents(revenueData30d.reduce((sum, d) => sum + (d as any).value, 0))}</p>
            <p className="text-xs text-blue-400 mt-1">67%</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <p className="text-xs text-zinc-500 mb-1">Receita</p>
            <p className="text-2xl font-bold text-zinc-100">{formatCurrencyFromCents(revenueData30d.reduce((sum, d) => sum + (d as any).value, 0))}</p>
            <p className="text-xs text-purple-400 mt-1">+15%</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <p className="text-xs text-zinc-500 mb-1">Produto em Foco</p>
            <p className="text-lg font-bold text-zinc-100 truncate">Ebook Ansiedade</p>
            <p className="text-xs text-cyan-400 mt-1">Score: 85</p>
          </div>
          <div className="p-4 rounded-lg border border-blue-900/30 bg-blue-950/10">
            <p className="text-xs text-blue-400 mb-1">Missão do Dia</p>
            <p className="text-lg font-bold text-zinc-100">Validar Oferta</p>
            <p className="text-xs text-zinc-400 mt-1">65% concluído</p>
          </div>
        </div>
      </div>

      {/* Bloco Central - Pipeline */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-100 mb-4">Pipeline</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { etapa: "Pesquisa", status: "concluído", icon: Search },
            { etapa: "Produto", status: "concluído", icon: Package },
            { etapa: "Oferta", status: "concluído", icon: FileText },
            { etapa: "Landing", status: "em andamento", icon: Globe },
            { etapa: "Checkout", status: "pendente", icon: CreditCard },
            { etapa: "Distribuição", status: "pendente", icon: Users },
            { etapa: "Analytics", status: "pendente", icon: BarChart3 },
            { etapa: "Venda", status: "pendente", icon: DollarSign },
          ].map((item, index) => {
            const Icon = item.icon;
            const statusColor = item.status === "concluído" ? "text-green-400" : item.status === "em andamento" ? "text-blue-400" : "text-zinc-500";
            const bgColor = item.status === "concluído" ? "border-green-900/30 bg-green-950/10" : item.status === "em andamento" ? "border-blue-900/30 bg-blue-950/10" : "border-zinc-800 bg-zinc-900";
            return (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${bgColor} hover:border-zinc-700 transition-all cursor-pointer`}>
                <Icon className={`h-5 w-5 ${statusColor}`} />
                <span className="text-sm text-zinc-100 flex-1">{item.etapa}</span>
                <span className={`text-xs ${statusColor}`}>{item.status}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bloco Inferior - Timeline, Atividades, IA, Pendências */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Timeline */}
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">Timeline</h2>
          <div className="space-y-3">
            {[
              { evento: "Nova venda: Ebook Ansiedade - R$ 497", tempo: "há 5 minutos", icon: DollarSign, color: "text-green-400" },
              { evento: "Landing atualizada: Produto X", tempo: "há 2 horas", icon: Globe, color: "text-blue-400" },
              { evento: "Checkout configurado: Produto Y", tempo: "há 3 horas", icon: CreditCard, color: "text-emerald-400" },
              { evento: "Pesquisa concluída: Nicho Z", tempo: "há 1 dia", icon: Search, color: "text-cyan-400" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-900">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-100">{item.evento}</p>
                  </div>
                  <p className="text-xs text-zinc-500">{item.tempo}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* IA */}
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-6 w-6 text-purple-400" />
            <h2 className="text-lg font-semibold text-zinc-100">IA</h2>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-purple-900/30 bg-purple-950/10">
              <p className="text-sm font-medium text-zinc-100 mb-1">O nicho ansiedade cresceu 27%</p>
              <p className="text-xs text-zinc-400">Oportunidade de expansão</p>
            </div>
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
              <p className="text-sm font-medium text-zinc-100 mb-1">Landing Z com conversão de 4.2%</p>
              <p className="text-xs text-zinc-400">Pronto para escalar</p>
            </div>
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
              <p className="text-sm font-medium text-zinc-100 mb-1">Produto X sem vendas há 7 dias</p>
              <p className="text-xs text-zinc-400">Requer atenção</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pendências */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-100 mb-4">Pendências</h2>
        <div className="space-y-3">
          {dailyQueue.slice(0, 3).map((task, index) => (
            <div key={task.id} className="flex items-center gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-all">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-zinc-400">{index + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-100">{task.title}</p>
                <p className="text-xs text-zinc-500">Prioridade: {task.priority}</p>
              </div>
              <Button size="sm" variant="secondary">Executar</Button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default async function OverviewPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    }>
      <DashboardContent organizationId={organizationId} />
    </Suspense>
  );
}
