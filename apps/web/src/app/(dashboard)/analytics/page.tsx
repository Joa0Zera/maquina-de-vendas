import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, MousePointer, CreditCard, TrendingUp, DollarSign, Target, ArrowUp, ArrowDown } from "lucide-react";

async function AnalyticsContent({ organizationId }: { organizationId: string }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Analytics"
        description="Acompanhe métricas detalhadas do seu negócio."
        actions={
          <Button variant="secondary" size="sm" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Exportar
          </Button>
        }
      />

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-400">Visitantes</span>
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">12,450</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400">+12.5%</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-400">CTR</span>
            <MousePointer className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">3.2%</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400">+0.8%</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-400">Conversão</span>
            <Target className="h-5 w-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">2.8%</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowDown className="h-4 w-4 text-red-400" />
            <span className="text-xs text-red-400">-0.3%</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-400">Ticket Médio</span>
            <CreditCard className="h-5 w-5 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">R$ 297</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400">+5.2%</span>
          </div>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-400">Receita</span>
            <DollarSign className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">R$ 45.230</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400">+18.7%</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-400">Lucro</span>
            <TrendingUp className="h-5 w-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">R$ 32.450</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400">+22.3%</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-400">ROI</span>
            <Target className="h-5 w-5 text-violet-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">3.2x</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400">+0.5x</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-400">Upsell</span>
            <TrendingUp className="h-5 w-5 text-pink-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">15%</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400">+2.1%</span>
          </div>
        </div>
      </div>

      {/* Products Performance */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Performance dos Produtos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
            <h3 className="font-medium text-zinc-100 mb-4">Produtos Crescendo</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Produto A</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-400">+45%</span>
                  <ArrowUp className="h-4 w-4 text-green-400" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Produto B</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-400">+32%</span>
                  <ArrowUp className="h-4 w-4 text-green-400" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Produto C</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-400">+28%</span>
                  <ArrowUp className="h-4 w-4 text-green-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
            <h3 className="font-medium text-zinc-100 mb-4">Produtos Caindo</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Produto D</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-red-400">-12%</span>
                  <ArrowDown className="h-4 w-4 text-red-400" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Produto E</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-red-400">-8%</span>
                  <ArrowDown className="h-4 w-4 text-red-400" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Produto F</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-red-400">-5%</span>
                  <ArrowDown className="h-4 w-4 text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Period Comparison */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Comparação de Períodos</h2>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-zinc-400 mb-2">Este Mês</p>
              <p className="text-2xl font-bold text-zinc-100">R$ 45.230</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-2">Mês Passado</p>
              <p className="text-2xl font-bold text-zinc-100">R$ 38.100</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-2">Variação</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-green-400">+18.7%</p>
                <ArrowUp className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function AnalyticsPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <AnalyticsContent organizationId={organizationId} />
    </Suspense>
  );
}
