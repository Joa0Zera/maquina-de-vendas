import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Play, Clock, AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Zap, Target, CheckCircle } from "lucide-react";

async function DecisionContent({ organizationId }: { organizationId: string }) {
  const decisions = [
    {
      id: "agora",
      title: "O que fazer agora",
      description: "Ações imediatas com maior impacto",
      icon: Play,
      color: "border-green-900/30 bg-green-950/10",
      iconColor: "text-green-400",
      items: [
        { title: "Criar Landing Page", impacto: "R$ 5.000", tempo: "30 min" },
        { title: "Validar Oferta", impacto: "R$ 10.000", tempo: "2 horas" },
      ],
    },
    {
      id: "esperar",
      title: "O que pode esperar",
      description: "Ações importantes mas não urgentes",
      icon: Clock,
      color: "border-blue-900/30 bg-blue-950/10",
      iconColor: "text-blue-400",
      items: [
        { title: "Otimizar Funil", impacto: "R$ 15.000", tempo: "1 dia" },
        { title: "Criar Criativos", impacto: "R$ 2.000", tempo: "1 hora" },
      ],
    },
    {
      id: "atencao",
      title: "O que precisa atenção",
      description: "Áreas que requerem monitoramento",
      icon: AlertTriangle,
      color: "border-yellow-900/30 bg-yellow-950/10",
      iconColor: "text-yellow-400",
      items: [
        { title: "Produto X parado", impacto: "R$ 0", tempo: "-" },
        { title: "Landing Y com baixa conversão", impacto: "R$ -500", tempo: "-" },
      ],
    },
    {
      id: "crescendo",
      title: "O que está crescendo",
      description: "Áreas com desempenho positivo",
      icon: TrendingUp,
      color: "border-emerald-900/30 bg-emerald-950/10",
      iconColor: "text-emerald-400",
      items: [
        { title: "Produto Z +200%", impacto: "R$ 20.000", tempo: "-" },
        { title: "Oferta W +150%", impacto: "R$ 15.000", tempo: "-" },
      ],
    },
    {
      id: "caindo",
      title: "O que está caindo",
      description: "Áreas com desempenho negativo",
      icon: TrendingDown,
      color: "border-red-900/30 bg-red-950/10",
      iconColor: "text-red-400",
      items: [
        { title: "Produto U -40%", impacto: "R$ -8.000", tempo: "-" },
        { title: "Funil V -25%", impacto: "R$ -5.000", tempo: "-" },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Decisões"
        description="O que fazer agora, o que pode esperar, o que precisa atenção."
      />

      {/* Decision Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decisions.map((decision) => {
          const Icon = decision.icon;
          return (
            <div
              key={decision.id}
              className={`p-6 rounded-xl border ${decision.color} hover:shadow-lg transition-all shadow-sm`}
            >
              <div className={`w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${decision.iconColor}`} />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-1">{decision.title}</h3>
              <p className="text-sm text-zinc-400 mb-4">{decision.description}</p>
              <div className="space-y-2">
                {decision.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50"
                  >
                    <span className="text-sm text-zinc-100">{item.title}</span>
                    <div className="text-right">
                      <p className={`text-xs font-medium ${item.impacto.startsWith("R$ -") ? "text-red-400" : "text-green-400"}`}>{item.impacto}</p>
                      <p className="text-xs text-zinc-500">{item.tempo}</p>
                    </div>
              </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function DecisionPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <DecisionContent organizationId={organizationId} />
    </Suspense>
  );
}
