import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { TrendingUp, AlertTriangle, Package, Activity, ArrowRight, Sparkles, Target } from "lucide-react";

async function InsightsContent({ organizationId }: { organizationId: string }) {
  const insights = [
    {
      id: "maior-oportunidade",
      title: "Maior Oportunidade",
      description: "Produto X tem potencial de crescimento de 300% nos próximos 30 dias",
      icon: TrendingUp,
      color: "border-green-900/30 bg-green-950/10",
      iconColor: "text-green-400",
    },
    {
      id: "maior-risco",
      title: "Maior Risco",
      description: "Produto Y está perdendo 15% de conversão semanal",
      icon: AlertTriangle,
      color: "border-red-900/30 bg-red-950/10",
      iconColor: "text-red-400",
    },
    {
      id: "produto-promissor",
      title: "Produto Mais Promissor",
      description: "Produto Z tem ticket médio de R$ 497 e taxa de conversão de 4.2%",
      icon: Package,
      color: "border-blue-900/30 bg-blue-950/10",
      iconColor: "text-blue-400",
    },
    {
      id: "produto-atencao",
      title: "Produto que Precisa Atenção",
      description: "Produto W tem landing page com taxa de rejeição de 85%",
      icon: Activity,
      color: "border-yellow-900/30 bg-yellow-950/10",
      iconColor: "text-yellow-400",
    },
    {
      id: "maior-crescimento",
      title: "Maior Crescimento",
      description: "Produto V cresceu 200% em receita na última semana",
      icon: Sparkles,
      color: "border-purple-900/30 bg-purple-950/10",
      iconColor: "text-purple-400",
    },
    {
      id: "maior-queda",
      title: "Maior Queda",
      description: "Produto U teve queda de 40% em vendas nos últimos 7 dias",
      icon: Target,
      color: "border-orange-900/30 bg-orange-950/10",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Insights"
        description="Insights automáticos gerados pela IA."
      />

      {/* Insights Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.id}
              className={`p-6 rounded-xl border ${insight.color} hover:shadow-lg transition-all shadow-sm`}
            >
              <div className={`w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${insight.iconColor}`} />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">{insight.title}</h3>
              <p className="text-sm text-zinc-400 mb-4">{insight.description}</p>
              <button className="text-sm text-zinc-300 hover:text-zinc-100 flex items-center gap-2 transition-colors">
                Ver detalhes
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function InsightsPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <InsightsContent organizationId={organizationId} />
    </Suspense>
  );
}
