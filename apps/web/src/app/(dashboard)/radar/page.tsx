import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { DollarSign, AlertTriangle, TrendingUp, Activity, Award, BarChart3, ArrowRight } from "lucide-react";

async function RadarContent({ organizationId }: { organizationId: string }) {
  const radarMetrics = [
    {
      id: "receita",
      nome: "Receita",
      valor: "R$ 127.450",
      variacao: "+15%",
      status: "excelente",
      icon: DollarSign,
      color: "border-green-900/30 bg-green-950/10",
      iconColor: "text-green-400",
    },
    {
      id: "risco",
      nome: "Risco",
      valor: "Baixo",
      variacao: "-5%",
      status: "estavel",
      icon: AlertTriangle,
      color: "border-blue-900/30 bg-blue-950/10",
      iconColor: "text-blue-400",
    },
    {
      id: "oportunidade",
      nome: "Oportunidade",
      valor: "3 novas",
      variacao: "+2",
      status: "crescendo",
      icon: TrendingUp,
      color: "border-purple-900/30 bg-purple-950/10",
      iconColor: "text-purple-400",
    },
    {
      id: "conversao",
      nome: "Conversão",
      valor: "4.2%",
      variacao: "+0.8%",
      status: "melhorando",
      icon: Activity,
      color: "border-cyan-900/30 bg-cyan-950/10",
      iconColor: "text-cyan-400",
    },
    {
      id: "escala",
      nome: "Escala",
      valor: "85%",
      variacao: "+10%",
      status: "expansao",
      icon: BarChart3,
      color: "border-emerald-900/30 bg-emerald-950/10",
      iconColor: "text-emerald-400",
    },
    {
      id: "produtividade",
      nome: "Produtividade",
      valor: "92%",
      variacao: "+5%",
      status: "alta",
      icon: Award,
      color: "border-yellow-900/30 bg-yellow-950/10",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="CEO Radar"
        description="Visão completa do negócio em um único painel."
      />

      {/* Radar Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {radarMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className={`p-6 rounded-xl border ${metric.color} hover:shadow-lg transition-all shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${metric.iconColor}`} />
                </div>
                <div className="text-right">
                  <p className={`text-xs font-medium ${metric.variacao.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{metric.variacao}</p>
                  <p className="text-xs text-zinc-500 mt-1">{metric.status}</p>
                </div>
              </div>
              <h3 className="font-semibold text-zinc-100 mb-1">{metric.nome}</h3>
              <p className="text-2xl font-bold text-zinc-100">{metric.valor}</p>
            </div>
          );
        })}
      </div>

      {/* Overall Health */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-zinc-100 mb-1">Saúde do Negócio: Excelente</h3>
            <p className="text-sm text-zinc-400">Todos os indicadores estão acima da média. Continue assim!</p>
          </div>
          <Button size="sm" variant="secondary" className="gap-2">
            Ver Detalhes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <h3 className="font-semibold text-zinc-100 mb-4">Ações Recomendadas</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <button className="p-4 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-all text-left">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span className="font-medium text-zinc-100">Aproveitar oportunidade</span>
            </div>
            <p className="text-xs text-zinc-400">Nova oportunidade detectada no nicho Y</p>
          </button>
          <button className="p-4 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-all text-left">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <span className="font-medium text-zinc-100">Revisar risco</span>
            </div>
            <p className="text-xs text-zinc-400">Produto X precisa de atenção</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default async function RadarPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <RadarContent organizationId={organizationId} />
    </Suspense>
  );
}
