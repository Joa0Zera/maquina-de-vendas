import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Activity, BarChart3, ArrowRight, Percent, Users, CreditCard, Globe } from "lucide-react";

async function PerformanceContent({ organizationId }: { organizationId: string }) {
  const performanceMetrics = [
    {
      id: "receita",
      nome: "Receita",
      valor: "R$ 127.450",
      variacao: "+15%",
      icon: DollarSign,
      color: "border-green-900/30 bg-green-950/10",
      iconColor: "text-green-400",
    },
    {
      id: "lucro",
      nome: "Lucro",
      valor: "R$ 85.200",
      variacao: "+12%",
      icon: TrendingUp,
      color: "border-blue-900/30 bg-blue-950/10",
      iconColor: "text-blue-400",
    },
    {
      id: "conversao",
      nome: "Conversão",
      valor: "4.2%",
      variacao: "+0.8%",
      icon: Activity,
      color: "border-purple-900/30 bg-purple-950/10",
      iconColor: "text-purple-400",
    },
    {
      id: "roi",
      nome: "ROI",
      valor: "320%",
      variacao: "+25%",
      icon: Percent,
      color: "border-cyan-900/30 bg-cyan-950/10",
      iconColor: "text-cyan-400",
    },
    {
      id: "cac",
      nome: "CAC",
      valor: "R$ 47",
      variacao: "-8%",
      icon: Users,
      color: "border-emerald-900/30 bg-emerald-950/10",
      iconColor: "text-emerald-400",
    },
    {
      id: "ltv",
      nome: "LTV",
      valor: "R$ 1.250",
      variacao: "+18%",
      icon: CreditCard,
      color: "border-yellow-900/30 bg-yellow-950/10",
      iconColor: "text-yellow-400",
    },
    {
      id: "ticket",
      nome: "Ticket Médio",
      valor: "R$ 497",
      variacao: "+5%",
      icon: DollarSign,
      color: "border-orange-900/30 bg-orange-950/10",
      iconColor: "text-orange-400",
    },
    {
      id: "funis",
      nome: "Funis",
      valor: "12",
      variacao: "+2",
      icon: BarChart3,
      color: "border-pink-900/30 bg-pink-950/10",
      iconColor: "text-pink-400",
    },
    {
      id: "landing",
      nome: "Landing Pages",
      valor: "8",
      variacao: "+1",
      icon: Globe,
      color: "border-indigo-900/30 bg-indigo-950/10",
      iconColor: "text-indigo-400",
    },
    {
      id: "checkout",
      nome: "Checkouts",
      valor: "6",
      variacao: "+1",
      icon: CreditCard,
      color: "border-rose-900/30 bg-rose-950/10",
      iconColor: "text-rose-400",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Performance"
        description="Todas as métricas do seu negócio em um único painel."
      />

      {/* Performance Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className={`p-4 rounded-xl border ${metric.color} hover:shadow-lg transition-all shadow-sm`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 ${metric.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${metric.variacao.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{metric.variacao}</p>
                </div>
              </div>
              <h3 className="font-semibold text-zinc-100 mb-1">{metric.nome}</h3>
              <p className="text-xl font-bold text-zinc-100">{metric.valor}</p>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-zinc-100 mb-1">Performance Geral: Excelente</h3>
            <p className="text-sm text-zinc-400">Todas as métricas estão acima da média. Continue assim!</p>
          </div>
          <Button size="sm" variant="secondary" className="gap-2">
            Ver Relatório
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default async function PerformancePage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <PerformanceContent organizationId={organizationId} />
    </Suspense>
  );
}
