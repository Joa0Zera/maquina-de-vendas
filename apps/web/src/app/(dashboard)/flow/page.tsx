import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Search, User, FileText, Globe, CreditCard, Copy, Image, Share2, BarChart3, TrendingUp, ArrowRight, CheckCircle, Circle } from "lucide-react";

async function FlowContent({ organizationId }: { organizationId: string }) {
  const flowSteps = [
    { id: "1", nome: "Pesquisa", icon: Search, status: "concluido", descricao: "Pesquisa de mercado e validação de nicho" },
    { id: "2", nome: "Avatar", icon: User, status: "concluido", descricao: "Definição do público-alvo ideal" },
    { id: "3", nome: "Oferta", icon: FileText, status: "concluido", descricao: "Criação da oferta irresistível" },
    { id: "4", nome: "Landing", icon: Globe, status: "em_progresso", descricao: "Página de vendas de alta conversão" },
    { id: "5", nome: "Checkout", icon: CreditCard, status: "pendente", descricao: "Configuração do pagamento" },
    { id: "6", nome: "Copy", icon: Copy, status: "pendente", descricao: "Copywriting persuasivo" },
    { id: "7", nome: "Criativos", icon: Image, status: "pendente", descricao: "Materiais de marketing" },
    { id: "8", nome: "Distribuição", icon: Share2, status: "pendente", descricao: "Canais de distribuição" },
    { id: "9", nome: "Analytics", icon: BarChart3, status: "pendente", descricao: "Análise de dados e métricas" },
    { id: "10", nome: "Escala", icon: TrendingUp, status: "pendente", descricao: "Escala e otimização" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido":
        return "border-green-500 bg-green-500/10";
      case "em_progresso":
        return "border-blue-500 bg-blue-500/10";
      case "pendente":
        return "border-zinc-700 bg-zinc-800";
      default:
        return "border-zinc-700 bg-zinc-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return CheckCircle;
      case "em_progresso":
        return Circle;
      case "pendente":
        return Circle;
      default:
        return Circle;
    }
  };

  const getProgressPercentage = () => {
    const completed = flowSteps.filter(s => s.status === "concluido").length;
    const inProgress = flowSteps.filter(s => s.status === "em_progresso").length;
    return Math.round(((completed + inProgress * 0.5) / flowSteps.length) * 100);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Fluxo Visual"
        description="Visualização completa do processo de criação e escala."
      />

      {/* Progress Overview */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">Progresso Geral</h3>
            <p className="text-sm text-zinc-400">{flowSteps.filter(s => s.status === "concluido").length} de {flowSteps.length} etapas concluídas</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-zinc-100">{getProgressPercentage()}%</p>
            <p className="text-xs text-zinc-500">completo</p>
          </div>
        </div>
        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Flow Steps */}
      <div className="space-y-4">
        {flowSteps.map((step, index) => {
          const Icon = step.icon;
          const StatusIcon = getStatusIcon(step.status);
          const isLast = index === flowSteps.length - 1;
          
          return (
            <div key={step.id} className="relative">
              <div
                className={`p-4 rounded-xl border ${getStatusColor(step.status)} hover:shadow-lg transition-all shadow-sm`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${getStatusColor(step.status)} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${step.status === "concluido" ? "text-green-400" : step.status === "em_progresso" ? "text-blue-400" : "text-zinc-400"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-zinc-100">{step.nome}</h3>
                      <StatusIcon className={`h-4 w-4 ${step.status === "concluido" ? "text-green-400" : step.status === "em_progresso" ? "text-blue-400" : "text-zinc-500"}`} />
                    </div>
                    <p className="text-sm text-zinc-400">{step.descricao}</p>
                  </div>
                  {step.status === "pendente" && (
                    <Button size="sm" variant="secondary" className="gap-2">
                      Iniciar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                  {step.status === "em_progresso" && (
                    <Button size="sm" className="gap-2">
                      Continuar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                  {step.status === "concluido" && (
                    <Button size="sm" variant="ghost" className="gap-2">
                      Ver
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              {!isLast && (
                <div className="flex justify-center py-2">
                  <div className={`w-0.5 h-8 ${index < flowSteps.findIndex(s => s.status === "em_progresso") ? "bg-green-500" : "bg-zinc-700"}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900">
        <h3 className="font-semibold text-zinc-100 mb-4">Resumo do Fluxo</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-lg border border-green-900/30 bg-green-950/10">
            <p className="text-xs text-zinc-500 mb-1">Concluídas</p>
            <p className="text-2xl font-bold text-green-400">{flowSteps.filter(s => s.status === "concluido").length}</p>
          </div>
          <div className="p-4 rounded-lg border border-blue-900/30 bg-blue-950/10">
            <p className="text-xs text-zinc-500 mb-1">Em Progresso</p>
            <p className="text-2xl font-bold text-blue-400">{flowSteps.filter(s => s.status === "em_progresso").length}</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <p className="text-xs text-zinc-500 mb-1">Pendentes</p>
            <p className="text-2xl font-bold text-zinc-100">{flowSteps.filter(s => s.status === "pendente").length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function FlowPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <FlowContent organizationId={organizationId} />
    </Suspense>
  );
}
