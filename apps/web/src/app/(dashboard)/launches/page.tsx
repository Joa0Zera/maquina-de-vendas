import { Suspense } from "react";
import { LaunchCard } from "@/components/launches/launch-card";
import { getExecutiveDashboardMetrics, listLaunchesByOrganization } from "@/lib/launches";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Rocket } from "lucide-react";

async function LaunchesContent({ organizationId }: { organizationId: string }) {
  const [launches, executiveMetrics] = await Promise.all([
    listLaunchesByOrganization(organizationId),
    getExecutiveDashboardMetrics(organizationId),
  ]);

  // Calculate metrics
  const totalProducts = launches.length;
  const readyProducts = launches.filter((l) => l.commercialStatus === "READY").length;
  const buildingProducts = launches.filter((l) => l.commercialStatus === "BUILDING").length;
  const sellingProducts = launches.filter((l) => l.commercialStatus === "SELLING").length;
  const pausedProducts = launches.filter((l) => l.commercialStatus === "PAUSED").length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Centro de Lançamentos"
        description="Acompanhe o status de lançamento dos seus produtos."
      />

      {/* Executive Dashboard */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
        <MetricCard title="Total Produtos" value={executiveMetrics.totalProducts} />
        <MetricCard title="Prontos" value={executiveMetrics.readyProducts} className="text-green-400" />
        <MetricCard title="Vendendo" value={executiveMetrics.sellingProducts} className="text-blue-400" />
        <MetricCard title="Receita Total" value={`R$ ${(executiveMetrics.totalRevenue / 100).toFixed(2)}`} />
        <MetricCard title="Vendas Totais" value={executiveMetrics.totalSales} />
        <MetricCard title="Checkouts" value={executiveMetrics.totalCheckouts} />
        <MetricCard title="Visitas" value={executiveMetrics.totalVisits} />
      </div>

      {/* Intelligence Dashboard */}
      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard title="Score Médio" value={executiveMetrics.averageLaunchScore} />
        <MetricCard title="Prontos para Escalar" value={executiveMetrics.productsReadyToScale} className="text-green-400" />
        <MetricCard title="Com Gargalos" value={executiveMetrics.productsWithBottlenecks} className="text-red-400" />
        <MetricCard title="Sem Deploy" value={executiveMetrics.productsMissingDeploy} className="text-orange-400" />
        <MetricCard title="Sem Checkout" value={executiveMetrics.productsMissingCheckout} className="text-orange-400" />
      </div>

      {/* Organic Reach Dashboard */}
      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard title="Grupos Facebook" value={executiveMetrics.totalFacebookGroups} />
        <MetricCard title="Grupos WhatsApp" value={executiveMetrics.totalWhatsAppGroups} />
        <MetricCard title="Canais Telegram" value={executiveMetrics.totalTelegramGroups} />
        <MetricCard title="Comunidades Discord" value={executiveMetrics.totalDiscordCommunities} />
        <MetricCard title="Hashtags" value={executiveMetrics.totalHashtags} />
      </div>

      {/* Launch Status Metrics */}
      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard title="Total Produtos" value={totalProducts} />
        <MetricCard title="Prontos" value={readyProducts} className="text-green-400" />
        <MetricCard title="Em Construção" value={buildingProducts} className="text-yellow-400" />
        <MetricCard title="Vendendo" value={sellingProducts} className="text-blue-400" />
        <MetricCard title="Pausados" value={pausedProducts} className="text-red-400" />
      </div>

      {launches.length === 0 ? (
        <EmptyState
          icon={Rocket}
          title="Nenhum lançamento encontrado"
          description="Crie uma oferta primeiro para começar a acompanhar seus lançamentos."
          action={{ label: "Ver Ofertas", href: "/offers" }}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {launches.map((launch) => (
            <LaunchCard key={launch.offerId} launch={launch} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function LaunchesPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <LaunchesContent organizationId={organizationId} />
    </Suspense>
  );
}
