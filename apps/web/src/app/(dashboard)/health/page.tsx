import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { DollarSign, Activity, Package, Globe, CreditCard, FileText, Search, Users, Heart, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

async function HealthContent({ organizationId }: { organizationId: string }) {
  const healthIndicators = [
    { id: "receita", label: "Receita", score: 85, status: "Excelente", icon: DollarSign, color: "text-green-400" },
    { id: "conversao", label: "Conversão", score: 72, status: "Bom", icon: Activity, color: "text-blue-400" },
    { id: "produtos", label: "Produtos Ativos", score: 90, status: "Excelente", icon: Package, color: "text-green-400" },
    { id: "landing", label: "Landing", score: 65, status: "Atenção", icon: Globe, color: "text-yellow-400" },
    { id: "checkout", label: "Checkout", score: 78, status: "Bom", icon: CreditCard, color: "text-blue-400" },
    { id: "copy", label: "Copy", score: 55, status: "Atenção", icon: FileText, color: "text-yellow-400" },
    { id: "pesquisa", label: "Pesquisa", score: 40, status: "Crítico", icon: Search, color: "text-red-400" },
    { id: "distribuicao", label: "Distribuição", score: 68, status: "Bom", icon: Users, color: "text-blue-400" },
  ];

  const overallScore = Math.round(healthIndicators.reduce((sum, item) => sum + item.score, 0) / healthIndicators.length);
  const overallStatus = overallScore >= 80 ? "Excelente" : overallScore >= 60 ? "Bom" : overallScore >= 40 ? "Atenção" : "Crítico";
  const overallColor = overallScore >= 80 ? "text-green-400" : overallScore >= 60 ? "text-blue-400" : overallScore >= 40 ? "text-yellow-400" : "text-red-400";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Painel de Saúde"
        description="Health Score geral do negócio."
      />

      {/* Overall Health Score */}
      <div className="p-8 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Health Score Geral</h2>
            <p className="text-sm text-zinc-400">Média de todos os indicadores</p>
          </div>
          <div className="text-right">
            <p className={`text-5xl font-bold ${overallColor}`}>{overallScore}</p>
            <p className={`text-sm font-medium ${overallColor} mt-1`}>{overallStatus}</p>
          </div>
        </div>
      </div>

      {/* Health Indicators */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {healthIndicators.map((indicator) => {
          const Icon = indicator.icon;
          const statusColor = indicator.status === "Excelente" ? "text-green-400" : indicator.status === "Bom" ? "text-blue-400" : indicator.status === "Atenção" ? "text-yellow-400" : "text-red-400";
          return (
            <div
              key={indicator.id}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-6 w-6 ${indicator.color}`} />
                <span className={`text-sm font-medium ${statusColor}`}>{indicator.status}</span>
              </div>
              <h3 className="text-sm text-zinc-400 mb-2">{indicator.label}</h3>
              <p className="text-3xl font-bold text-zinc-100">{indicator.score}</p>
              <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${indicator.score >= 80 ? "bg-green-500" : indicator.score >= 60 ? "bg-blue-500" : indicator.score >= 40 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${indicator.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Legend */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-100 mb-4">Legenda de Status</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-sm font-medium text-zinc-100">Excelente</p>
              <p className="text-xs text-zinc-500">80-100 pontos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm font-medium text-zinc-100">Bom</p>
              <p className="text-xs text-zinc-500">60-79 pontos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-sm font-medium text-zinc-100">Atenção</p>
              <p className="text-xs text-zinc-500">40-59 pontos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-sm font-medium text-zinc-100">Crítico</p>
              <p className="text-xs text-zinc-500">0-39 pontos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function HealthPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <HealthContent organizationId={organizationId} />
    </Suspense>
  );
}
