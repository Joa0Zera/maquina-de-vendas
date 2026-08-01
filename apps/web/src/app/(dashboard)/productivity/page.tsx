import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Package, FileText, Globe, CreditCard, DollarSign, Calendar, TrendingUp, Award } from "lucide-react";

async function ProductivityContent({ organizationId }: { organizationId: string }) {
  const stats = [
    { id: "projetos-concluidos", label: "Projetos Concluídos", value: "24", icon: Award, color: "text-green-400" },
    { id: "produtos-criados", label: "Produtos Criados", value: "18", icon: Package, color: "text-blue-400" },
    { id: "ofertas-criadas", label: "Ofertas Criadas", value: "15", icon: FileText, color: "text-purple-400" },
    { id: "landings-criadas", label: "Landings Criadas", value: "12", icon: Globe, color: "text-cyan-400" },
    { id: "checkouts-criados", label: "Checkouts Criados", value: "10", icon: CreditCard, color: "text-emerald-400" },
    { id: "receita-gerada", label: "Receita Gerada", value: "R$ 127.450", icon: DollarSign, color: "text-yellow-400" },
    { id: "dias-consecutivos", label: "Dias Consecutivos", value: "45", icon: Calendar, color: "text-orange-400" },
    { id: "taxa-crescimento", label: "Taxa de Crescimento", value: "+23%", icon: TrendingUp, color: "text-pink-400" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Produtividade"
        description="Estatísticas de uso e desempenho."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-zinc-100">{stat.value}</p>
              <p className="text-sm text-zinc-400 mt-2">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Achievement Section */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-zinc-100 mb-1">Excelente Progresso!</h3>
            <p className="text-sm text-zinc-400">Você está no top 10% dos usuários mais produtivos da plataforma.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ProductivityPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <ProductivityContent organizationId={organizationId} />
    </Suspense>
  );
}
