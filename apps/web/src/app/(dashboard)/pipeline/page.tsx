import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Search, User, FileText, Copy, Globe, CreditCard, BookOpen, Cloud, Server, MessageSquare, BarChart3, DollarSign, ArrowRight, CheckCircle, Clock, Play, Zap } from "lucide-react";

async function PipelineContent({ organizationId }: { organizationId: string }) {
  const pipelineSteps = [
    { id: "pesquisa", nome: "Pesquisa", icon: Search, status: "concluido", tempo: "2 dias" },
    { id: "avatar", nome: "Avatar", icon: User, status: "concluido", tempo: "1 dia" },
    { id: "oferta", nome: "Oferta", icon: FileText, status: "concluido", tempo: "1 dia" },
    { id: "copy", nome: "Copy", icon: Copy, status: "concluido", tempo: "2 dias" },
    { id: "landing", nome: "Landing", icon: Globe, status: "em_andamento", tempo: "3 dias" },
    { id: "checkout", nome: "Checkout", icon: CreditCard, status: "pendente", tempo: "1 dia" },
    { id: "gamma", nome: "Gamma Ebook", icon: BookOpen, status: "pendente", tempo: "2 dias" },
    { id: "vercel", nome: "Vercel", icon: Cloud, status: "pendente", tempo: "1 dia" },
    { id: "cakto", nome: "Cakto", icon: Server, status: "pendente", tempo: "1 dia" },
    { id: "distribuicao", nome: "Distribuição", icon: MessageSquare, status: "pendente", tempo: "7 dias" },
    { id: "analytics", nome: "Analytics", icon: BarChart3, status: "pendente", tempo: "contínuo" },
    { id: "venda", nome: "Venda", icon: DollarSign, status: "pendente", tempo: "contínuo" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido":
        return "border-green-900/30 bg-green-950/10";
      case "em_andamento":
        return "border-blue-900/30 bg-blue-950/10";
      case "pendente":
        return "border-zinc-800 bg-zinc-900";
      default:
        return "border-zinc-800 bg-zinc-900";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return CheckCircle;
      case "em_andamento":
        return Play;
      case "pendente":
        return Clock;
      default:
        return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "concluido":
        return "Concluído";
      case "em_andamento":
        return "Em andamento";
      case "pendente":
        return "Pendente";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Pipeline Completo"
        description="Visualize e execute todo o fluxo de criação e escala de infoprodutos."
        actions={
          <Button className="gap-2">
            <Zap className="h-4 w-4" />
            Executar Pipeline
          </Button>
        }
      />

      {/* Pipeline Visualization */}
      <div className="space-y-4">
        {pipelineSteps.map((step, index) => {
          const StatusIcon = getStatusIcon(step.status);
          const Icon = step.icon;
          return (
            <div key={step.id}>
              <div
                className={`p-4 rounded-xl border ${getStatusColor(step.status)} hover:shadow-lg hover:border-zinc-700 transition-all shadow-sm`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Icon className={`h-6 w-6 ${step.status === "concluido" ? "text-green-400" : step.status === "em_andamento" ? "text-blue-400" : "text-zinc-500"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-zinc-100">{step.nome}</h3>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-3 w-3 ${step.status === "concluido" ? "text-green-400" : step.status === "em_andamento" ? "text-blue-400" : "text-zinc-500"}`} />
                        <p className="text-xs text-zinc-400">{getStatusText(step.status)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400">Tempo estimado: {step.tempo}</p>
                  </div>
                  <div className="flex gap-2">
                    {step.status === "pendente" ? (
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Play className="h-4 w-4" />
                        Iniciar
                      </Button>
                    ) : step.status === "em_andamento" ? (
                      <Button size="sm" className="gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Continuar
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {index < pipelineSteps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="h-4 w-4 text-zinc-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Overview */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-100 mb-4">Progresso Geral</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Concluído</p>
            <p className="text-2xl font-bold text-green-400">4</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Em andamento</p>
            <p className="text-2xl font-bold text-blue-400">1</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Pendente</p>
            <p className="text-2xl font-bold text-zinc-400">7</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-1">Progresso</p>
            <p className="text-2xl font-bold text-purple-400">33%</p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-blue-500" style={{ width: "33%" }} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-100 mb-4">Ações Rápidas</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="secondary" className="gap-2 justify-start">
            <Zap className="h-4 w-4" />
            Executar tudo
          </Button>
          <Button variant="secondary" className="gap-2 justify-start">
            <Play className="h-4 w-4" />
            Continuar pipeline
          </Button>
          <Button variant="secondary" className="gap-2 justify-start">
            <Clock className="h-4 w-4" />
            Pausar execução
          </Button>
          <Button variant="secondary" className="gap-2 justify-start">
            <Search className="h-4 w-4" />
            Nova pesquisa
          </Button>
        </div>
      </div>
    </div>
  );
}

export default async function PipelinePage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <PipelineContent organizationId={organizationId} />
    </Suspense>
  );
}
