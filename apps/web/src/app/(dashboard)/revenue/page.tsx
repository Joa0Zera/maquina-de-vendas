import { Suspense } from "react";
import { getOrganizationMetrics } from "@/lib/products";
import { getCaktoMetrics, hasCaktoIntegration, getRevenueData, getFeaturedProducts } from "@/lib/cakto";
import { requireOrganization } from "@/lib/session";
import { formatCurrencyFromCents } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { FeaturedProducts } from "@/components/dashboard/featured-products";
import { DollarSign, ShoppingBag, CreditCard, Package, TrendingUp, BarChart3, Filter, Globe, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function RevenueContent({ organizationId }: { organizationId: string }) {
  const [metrics, caktoMetrics, hasCakto, revenueData, featuredProducts, revenueData7d, revenueData30d, revenueData90d] = await Promise.all([
    getOrganizationMetrics(organizationId),
    getCaktoMetrics(organizationId),
    hasCaktoIntegration(organizationId),
    getRevenueData(organizationId, 30),
    getFeaturedProducts(organizationId),
    getRevenueData(organizationId, 7),
    getRevenueData(organizationId, 30),
    getRevenueData(organizationId, 90),
  ]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Receita"
        description="Visão completa de todas as métricas financeiras."
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              CSV
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              Excel
            </Button>
          </div>
        }
      />

      {!hasCakto ? (
        <div className="p-12 rounded-xl border border-zinc-800 bg-zinc-950/50 text-center">
          <DollarSign className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">Integração Cakto necessária</h3>
          <p className="text-zinc-400 mb-6">Conecte sua conta Cakto para visualizar métricas de receita detalhadas.</p>
          <Link href="/settings/integrations/cakto">
            <Button>Conectar Cakto</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Metrics Grid - First Row */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Receita Hoje</span>
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {formatCurrencyFromCents(caktoMetrics.revenueToday)}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Hoje</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Receita 7 dias</span>
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {formatCurrencyFromCents(revenueData7d.reduce((sum, d) => sum + d.revenue, 0))}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Últimos 7 dias</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Receita 30 dias</span>
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {formatCurrencyFromCents(revenueData30d.reduce((sum, d) => sum + d.revenue, 0))}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Últimos 30 dias</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Receita 90 dias</span>
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {formatCurrencyFromCents(revenueData90d.reduce((sum, d) => sum + d.revenue, 0))}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Últimos 90 dias</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Receita Total</span>
                <DollarSign className="h-5 w-5 text-cyan-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {formatCurrencyFromCents(metrics.revenueCents)}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Total acumulado</p>
            </div>
          </div>

          {/* Metrics Grid - Second Row */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Vendas Hoje</span>
                <ShoppingBag className="h-5 w-5 text-orange-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {caktoMetrics.salesToday}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Vendas hoje</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Vendas Totais</span>
                <ShoppingBag className="h-5 w-5 text-indigo-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {metrics.salesCount}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Vendas totais</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Ticket Médio</span>
                <CreditCard className="h-5 w-5 text-pink-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {formatCurrencyFromCents(caktoMetrics.averageTicket)}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Por venda</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Conversão</span>
                <TrendingUp className="h-5 w-5 text-rose-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {metrics.conversionRate ? `${(metrics.conversionRate * 100).toFixed(1)}%` : "0%"}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Taxa de conversão</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm cursor-default">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Produtos Ativos</span>
                <Package className="h-5 w-5 text-violet-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {caktoMetrics.productsCount}
              </p>
              <p className="text-xs text-zinc-500 mt-2">Na Cakto</p>
            </div>
          </div>

          {/* Revenue Chart with Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Evolução de Receita</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Linha
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Área
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Barras
                </Button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="ghost" size="sm">Hoje</Button>
              <Button variant="ghost" size="sm">7 dias</Button>
              <Button variant="ghost" size="sm">30 dias</Button>
              <Button variant="ghost" size="sm">90 dias</Button>
              <Button variant="ghost" size="sm">12 meses</Button>
              <Button variant="ghost" size="sm">Personalizado</Button>
            </div>
            <RevenueChart data={revenueData} />
          </div>

          {/* Top Products */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Top Produtos</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Package className="h-6 w-6 text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-zinc-100 truncate">{product.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-green-400">{formatCurrencyFromCents(product.revenue)}</p>
                        <p className="text-sm text-zinc-400">{product.sales} vendas</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Checkouts */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Top Checkouts</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-6 w-6 text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-zinc-100 truncate">{product.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-green-400">{formatCurrencyFromCents(product.revenue)}</p>
                        <p className="text-sm text-zinc-400">{product.sales} vendas</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Landing Pages */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Top Landing Pages</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-zinc-100 truncate">{product.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-green-400">{formatCurrencyFromCents(product.revenue)}</p>
                        <p className="text-sm text-zinc-400">{product.sales} vendas</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Ofertas */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Top Ofertas</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-zinc-100 truncate">{product.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-green-400">{formatCurrencyFromCents(product.revenue)}</p>
                        <p className="text-sm text-zinc-400">{product.sales} vendas</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Funis */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Top Funis</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-zinc-100 truncate">{product.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-green-400">{formatCurrencyFromCents(product.revenue)}</p>
                        <p className="text-sm text-zinc-400">{product.sales} vendas</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Table */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Detalhamento</h2>
            <div className="rounded-xl border border-zinc-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900/80 text-zinc-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Produto</th>
                    <th className="px-6 py-3 text-left font-medium">Receita</th>
                    <th className="px-6 py-3 text-left font-medium">Vendas</th>
                    <th className="px-6 py-3 text-left font-medium">Ticket Médio</th>
                  </tr>
                </thead>
                <tbody>
                  {featuredProducts.slice(0, 10).map((product) => (
                    <tr key={product.id} className="border-t border-zinc-800/80 hover:bg-zinc-900/30">
                      <td className="px-6 py-3 font-medium">{product.name}</td>
                      <td className="px-6 py-3 text-green-400">{formatCurrencyFromCents(product.revenue)}</td>
                      <td className="px-6 py-3">{product.sales}</td>
                      <td className="px-6 py-3">{formatCurrencyFromCents(product.averageTicket)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default async function RevenuePage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <RevenueContent organizationId={organizationId} />
    </Suspense>
  );
}
