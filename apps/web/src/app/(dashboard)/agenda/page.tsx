import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Target, Zap, ArrowRight, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

async function AgendaContent({ organizationId }: { organizationId: string }) {
  const todayTasks = [
    { id: "1", title: "Criar Landing Page", priority: "Alta", impacto: "Alto", tempo: "30 min", impactoFinanceiro: "R$ 5.000", status: "pending" },
    { id: "2", title: "Gerar Copy", priority: "Média", impacto: "Médio", tempo: "45 min", impactoFinanceiro: "R$ 3.000", status: "pending" },
    { id: "3", title: "Criar Criativos", priority: "Baixa", impacto: "Baixo", tempo: "1 hora", impactoFinanceiro: "R$ 2.000", status: "pending" },
  ];

  const weekTasks = [
    { id: "4", title: "Validar Oferta", priority: "Alta", impacto: "Alto", tempo: "2 horas", impactoFinanceiro: "R$ 10.000", status: "pending" },
    { id: "5", title: "Configurar Checkout", priority: "Média", impacto: "Alto", tempo: "1 hora", impactoFinanceiro: "R$ 8.000", status: "pending" },
    { id: "6", title: "Pesquisa de Mercado", priority: "Alta", impacto: "Médio", tempo: "3 horas", impactoFinanceiro: "R$ 5.000", status: "pending" },
  ];

  const monthTasks = [
    { id: "7", title: "Lançar Produto", priority: "Alta", impacto: "Alto", tempo: "1 dia", impactoFinanceiro: "R$ 50.000", status: "pending" },
    { id: "8", title: "Escalar Tráfego", priority: "Média", impacto: "Alto", tempo: "2 dias", impactoFinanceiro: "R$ 30.000", status: "pending" },
    { id: "9", title: "Otimizar Funil", priority: "Baixa", impacto: "Médio", tempo: "1 dia", impactoFinanceiro: "R$ 15.000", status: "pending" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Agenda IA"
        description="Agenda inteligente com priorização automática."
        actions={
          <Button className="gap-2">
            <Zap className="h-4 w-4" />
            Nova Tarefa
          </Button>
        }
      />

      {/* Hoje */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-zinc-400" />
          <h2 className="text-lg font-semibold tracking-tight">Hoje</h2>
          <span className="text-sm text-zinc-500">({todayTasks.length} tarefas)</span>
        </div>
        <div className="space-y-3">
          {todayTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-zinc-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-zinc-100">{task.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                    <span>Prioridade: {task.priority}</span>
                    <span>Impacto: {task.impacto}</span>
                    <span>Tempo: {task.tempo}</span>
                  </div>
                </div>
              </div>
              <Button size="sm">Executar</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Esta Semana */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-zinc-400" />
          <h2 className="text-lg font-semibold tracking-tight">Esta Semana</h2>
          <span className="text-sm text-zinc-500">({weekTasks.length} tarefas)</span>
        </div>
        <div className="space-y-3">
          {weekTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-zinc-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-zinc-100">{task.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                    <span>Prioridade: {task.priority}</span>
                    <span>Impacto: {task.impacto}</span>
                    <span>Tempo: {task.tempo}</span>
                  </div>
                </div>
              </div>
              <Button size="sm">Executar</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Próximos 30 dias */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-zinc-400" />
          <h2 className="text-lg font-semibold tracking-tight">Próximos 30 dias</h2>
          <span className="text-sm text-zinc-500">({monthTasks.length} tarefas)</span>
        </div>
        <div className="space-y-3">
          {monthTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-zinc-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-zinc-100">{task.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                    <span>Prioridade: {task.priority}</span>
                    <span>Impacto: {task.impacto}</span>
                    <span>Tempo: {task.tempo}</span>
                  </div>
                </div>
              </div>
              <Button size="sm">Executar</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function AgendaPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <AgendaContent organizationId={organizationId} />
    </Suspense>
  );
}
