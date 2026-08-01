import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Target, Calendar, TrendingUp, DollarSign, Award, Clock, ArrowRight } from "lucide-react";

async function GoalsContent({ organizationId }: { organizationId: string }) {
  const goals = [
    { id: "diaria", label: "Meta Diária", current: 8500, target: 10000, remaining: 1500, days: 1, projection: 10000 },
    { id: "semanal", label: "Meta Semanal", current: 45000, target: 70000, remaining: 25000, days: 4, projection: 78750 },
    { id: "mensal", label: "Meta Mensal", current: 127450, target: 200000, remaining: 72550, days: 18, projection: 241416 },
    { id: "anual", label: "Meta Anual", current: 1450000, target: 2400000, remaining: 950000, days: 210, projection: 2871428 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Painel de Metas"
        description="Acompanhamento de metas diárias, semanais, mensais e anuais."
      />

      {/* Goals Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {goals.map((goal) => {
          const percentage = Math.round((goal.current / goal.target) * 100);
          const isOnTrack = percentage >= (100 - (goal.days / 365) * 100);
          return (
            <div
              key={goal.id}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${isOnTrack ? "bg-green-500/10" : "bg-yellow-500/10"} flex items-center justify-center`}>
                    <Target className={`h-5 w-5 ${isOnTrack ? "text-green-400" : "text-yellow-400"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100">{goal.label}</h3>
                    <p className="text-xs text-zinc-500">{goal.days} dias restantes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${isOnTrack ? "text-green-400" : "text-yellow-400"}`}>{percentage}%</p>
                  <p className="text-xs text-zinc-400 mt-1">concluído</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Receita atual</span>
                  <span className="text-zinc-100 font-medium">R$ {(goal.current / 100).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Meta</span>
                  <span className="text-zinc-100 font-medium">R$ {(goal.target / 100).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Restante</span>
                  <span className="text-zinc-100 font-medium">R$ {(goal.remaining / 100).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Projeção</span>
                  <span className={`font-medium ${isOnTrack ? "text-green-400" : "text-yellow-400"}`}>R$ {(goal.projection / 100).toLocaleString('pt-BR')}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${isOnTrack ? "bg-green-500" : "bg-yellow-500"}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-zinc-100 mb-1">Excelente Progresso!</h3>
            <p className="text-sm text-zinc-400">Você está acima da meta em 3 de 4 períodos. Continue assim!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function GoalsPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <GoalsContent organizationId={organizationId} />
    </Suspense>
  );
}
