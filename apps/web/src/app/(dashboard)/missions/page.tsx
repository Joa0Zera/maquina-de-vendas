import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Target, Clock, DollarSign, TrendingUp, CheckCircle, ArrowRight, Play, Pause, Circle, Brain, Activity, BarChart3, Calendar, Zap } from "lucide-react";

async function MissionsContent({ organizationId }: { organizationId: string }) {
  const missions = [
    {
      id: "1",
      nome: "Validar Oferta Ansiedade",
      objetivo: "Validar nova oferta de R$ 497 com público-alvo",
      status: "em_progresso",
      progresso: 65,
      receita: "R$ 15.000",
      conversao: "4.2%",
      roi: "3.2x",
      scoreIA: 85,
      tempoRestante: "5 dias",
      proximaAcao: "Otimizar copy da landing",
      checklist: [
        { id: "1", texto: "Criar landing page", concluido: true },
        { id: "2", texto: "Configurar checkout", concluido: true },
        { id: "3", texto: "Gerar tráfego teste", concluido: true },
        { id: "4", texto: "Analisar conversão", concluido: false },
        { id: "5", texto: "Otimizar oferta", concluido: false },
      ],
      timeline: [
        { data: "12/06", evento: "Início da missão" },
        { data: "13/06", evento: "Landing criada" },
        { data: "14/06", evento: "Checkout configurado" },
        { data: "15/06", evento: "Tráfego iniciado" },
      ],
    },
    {
      id: "2",
      nome: "Criar Ebook Marketing",
      objetivo: "Desenvolver novo infoproduto sobre marketing digital",
      status: "pendente",
      progresso: 20,
      receita: "R$ 50.000",
      conversao: "0%",
      roi: "0x",
      scoreIA: 92,
      tempoRestante: "14 dias",
      proximaAcao: "Definir avatar do cliente",
      checklist: [
        { id: "1", texto: "Pesquisar mercado", concluido: true },
        { id: "2", texto: "Definir avatar", concluido: false },
        { id: "3", texto: "Criar estrutura", concluido: false },
        { id: "4", texto: "Gravar conteúdo", concluido: false },
        { id: "5", texto: "Editar e masterizar", concluido: false },
      ],
      timeline: [
        { data: "10/06", evento: "Início da missão" },
        { data: "11/06", evento: "Pesquisa concluída" },
      ],
    },
    {
      id: "3",
      nome: "Escalar Campanha Facebook",
      objetivo: "Aumentar escala de campanha de Facebook Ads",
      status: "concluida",
      progresso: 100,
      receita: "R$ 30.000",
      conversao: "5.8%",
      roi: "4.5x",
      scoreIA: 78,
      tempoRestante: "0 dias",
      proximaAcao: "Missão concluída",
      checklist: [
        { id: "1", texto: "Analisar dados", concluido: true },
        { id: "2", texto: "Otimizar criativos", concluido: true },
        { id: "3", texto: "Aumentar orçamento", concluido: true },
        { id: "4", texto: "Monitorar performance", concluido: true },
      ],
      timeline: [
        { data: "05/06", evento: "Início da missão" },
        { data: "07/06", evento: "Otimização concluída" },
        { data: "09/06", evento: "Escala iniciada" },
        { data: "11/06", evento: "Missão concluída" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_progresso":
        return "border-blue-900/30 bg-blue-950/10";
      case "pendente":
        return "border-yellow-900/30 bg-yellow-950/10";
      case "concluida":
        return "border-green-900/30 bg-green-950/10";
      default:
        return "border-zinc-800 bg-zinc-900";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "em_progresso":
        return Play;
      case "pendente":
        return Clock;
      case "concluida":
        return CheckCircle;
      default:
        return Circle;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "em_progresso":
        return "Em Progresso";
      case "pendente":
        return "Pendente";
      case "concluida":
        return "Concluída";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Missões"
        description="Gerencie suas missões de lançamento e acompanhe o progresso."
        actions={
          <Button className="gap-2">
            <Target className="h-4 w-4" />
            Nova Missão
          </Button>
        }
      />

      {/* Missions Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {missions.map((mission) => {
          const StatusIcon = getStatusIcon(mission.status);
          return (
            <div
              key={mission.id}
              className={`p-6 rounded-xl border ${getStatusColor(mission.status)} hover:shadow-xl hover:border-zinc-700 transition-all shadow-sm`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center`}>
                      <StatusIcon className={`h-6 w-6 ${mission.status === "em_progresso" ? "text-blue-400" : mission.status === "pendente" ? "text-yellow-400" : "text-green-400"}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">{mission.nome}</h3>
                      <p className="text-xs text-zinc-400">{getStatusText(mission.status)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-300">{mission.objetivo}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 mb-1">Score IA</p>
                  <p className="text-2xl font-bold text-purple-400">{mission.scoreIA}/100</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-1">Receita</p>
                  <p className="text-sm font-bold text-green-400">{mission.receita}</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-1">Conversão</p>
                  <p className="text-sm font-bold text-blue-400">{mission.conversao}</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-1">ROI</p>
                  <p className="text-sm font-bold text-purple-400">{mission.roi}</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-1">Tempo</p>
                  <p className="text-sm font-bold text-orange-400">{mission.tempoRestante}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-zinc-400">Progresso</span>
                  <span className="text-zinc-100 font-medium">{mission.progresso}%</span>
                </div>
                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${mission.status === "em_progresso" ? "bg-blue-500" : mission.status === "pendente" ? "bg-yellow-500" : "bg-green-500"}`}
                    style={{ width: `${mission.progresso}%` }}
                  />
                </div>
              </div>

              {/* Próxima Ação */}
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <p className="text-xs text-zinc-500">Próxima Ação</p>
                </div>
                <p className="text-sm font-medium text-zinc-100">{mission.proximaAcao}</p>
              </div>

              {/* Checklist */}
              <div className="mb-4">
                <p className="text-sm font-medium text-zinc-100 mb-2">Checklist</p>
                <div className="space-y-2">
                  {mission.checklist.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border ${item.concluido ? "bg-green-500 border-green-500" : "border-zinc-600"} flex items-center justify-center`}>
                        {item.concluido && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                      <span className={`text-sm ${item.concluido ? "text-zinc-400 line-through" : "text-zinc-100"}`}>{item.texto}</span>
                    </div>
                  ))}
                  {mission.checklist.length > 3 && (
                    <p className="text-xs text-zinc-500">+{mission.checklist.length - 3} tarefas restantes</p>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-4">
                <p className="text-sm font-medium text-zinc-100 mb-2">Timeline</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {mission.timeline.map((event, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800"
                    >
                      <p className="text-xs text-zinc-400">{event.data}</p>
                      <p className="text-xs text-zinc-100">{event.evento}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Abrir Missão
                </Button>
                <Button size="sm" variant="secondary" className="gap-2">
                  <Play className="h-4 w-4" />
                  Executar
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function MissionsPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <MissionsContent organizationId={organizationId} />
    </Suspense>
  );
}
