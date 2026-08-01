import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, AlertCircle, CheckCircle, Package, FileText, Globe, CreditCard, Image, TrendingUp, CheckSquare } from "lucide-react";

async function ExecutionContent({ organizationId }: { organizationId: string }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Painel de Execução"
        description="Acompanhe tarefas pendentes e prazos."
        actions={
          <Button variant="secondary" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Hoje
          </Button>
        }
      />

      {/* Time Filters */}
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">Hoje</Button>
        <Button variant="ghost" size="sm">Esta Semana</Button>
        <Button variant="ghost" size="sm">Este Mês</Button>
        <Button variant="ghost" size="sm">Próximos 90 dias</Button>
      </div>

      {/* Today's Tasks */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Hoje</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-sm font-medium text-zinc-100">Pendências</span>
            </div>
            <p className="text-3xl font-bold text-zinc-100">5</p>
            <p className="text-xs text-zinc-500 mt-1">Tarefas pendentes</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium text-zinc-100">Checklists</span>
            </div>
            <p className="text-3xl font-bold text-zinc-100">3</p>
            <p className="text-xs text-zinc-500 mt-1">Checklists ativos</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-orange-400" />
              <span className="text-sm font-medium text-zinc-100">Atrasados</span>
            </div>
            <p className="text-3xl font-bold text-zinc-100">2</p>
            <p className="text-xs text-zinc-500 mt-1">Projetos atrasados</p>
          </div>
        </div>
      </div>

      {/* Pending Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Itens Pendentes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium text-zinc-100">Landing Pendente</span>
            </div>
            <p className="text-2xl font-bold text-zinc-100">2</p>
            <p className="text-xs text-zinc-500 mt-1">Landing pages</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-medium text-zinc-100">Copy Pendente</span>
            </div>
            <p className="text-2xl font-bold text-zinc-100">3</p>
            <p className="text-xs text-zinc-500 mt-1">Copies</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium text-zinc-100">Checkout Pendente</span>
            </div>
            <p className="text-2xl font-bold text-zinc-100">1</p>
            <p className="text-xs text-zinc-500 mt-1">Checkouts</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Image className="h-5 w-5 text-pink-400" />
              <span className="text-sm font-medium text-zinc-100">Criativos Pendentes</span>
            </div>
            <p className="text-2xl font-bold text-zinc-100">4</p>
            <p className="text-xs text-zinc-500 mt-1">Criativos</p>
          </div>
        </div>
      </div>

      {/* Task Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Detalhes das Tarefas</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <CheckSquare className="h-6 w-6 text-zinc-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-zinc-100">Criar Landing Page</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                  <span>Prioridade: Alta</span>
                  <span>Score: 85/100</span>
                  <span>Tempo estimado: 30 min</span>
                </div>
              </div>
            </div>
            <Button size="sm">Continuar</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <CheckSquare className="h-6 w-6 text-zinc-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-zinc-100">Gerar Copy</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                  <span>Prioridade: Média</span>
                  <span>Score: 70/100</span>
                  <span>Tempo estimado: 45 min</span>
                </div>
              </div>
            </div>
            <Button size="sm">Continuar</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <CheckSquare className="h-6 w-6 text-zinc-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-zinc-100">Criar Criativos</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                  <span>Prioridade: Baixa</span>
                  <span>Score: 60/100</span>
                  <span>Tempo estimado: 1 hora</span>
                </div>
              </div>
            </div>
            <Button size="sm">Continuar</Button>
          </div>
        </div>
      </div>

      {/* This Week */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Esta Semana</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-sm font-medium text-zinc-100">Pendências</span>
            </div>
            <p className="text-3xl font-bold text-zinc-100">12</p>
            <p className="text-xs text-zinc-500 mt-1">Tarefas pendentes</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium text-zinc-100">Checklists</span>
            </div>
            <p className="text-3xl font-bold text-zinc-100">8</p>
            <p className="text-xs text-zinc-500 mt-1">Checklists ativos</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-orange-400" />
              <span className="text-sm font-medium text-zinc-100">Atrasados</span>
            </div>
            <p className="text-3xl font-bold text-zinc-100">5</p>
            <p className="text-xs text-zinc-500 mt-1">Projetos atrasados</p>
          </div>
        </div>
      </div>

      {/* This Month */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Este Mês</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-sm font-medium text-zinc-100">Pendências</span>
            </div>
            <p className="text-3xl font-bold text-zinc-100">45</p>
            <p className="text-xs text-zinc-500 mt-1">Tarefas pendentes</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium text-zinc-100">Checklists</span>
            </div>
            <p className="text-3xl font-bold text-zinc-100">28</p>
            <p className="text-xs text-zinc-500 mt-1">Checklists ativos</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-medium text-zinc-100">Progresso</span>
            </div>
            <p className="text-3xl font-bold text-zinc-100">67%</p>
            <p className="text-xs text-zinc-500 mt-1">Taxa de conclusão</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ExecutionPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <ExecutionContent organizationId={organizationId} />
    </Suspense>
  );
}
