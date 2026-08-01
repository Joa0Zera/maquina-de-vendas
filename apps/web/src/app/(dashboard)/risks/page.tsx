import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Package, Globe, CreditCard, Search, FileText, AlertTriangle, TrendingDown, Brain, CheckCircle, ArrowRight } from "lucide-react";

async function RisksContent({ organizationId }: { organizationId: string }) {
  const risks = [
    {
      id: "1",
      type: "Produto Parado",
      name: "Produto X",
      description: "Parado há 30 dias sem atividade",
      risco: "Alto",
      impacto: "R$ -10.000",
      sugestaoIA: "Reativar com nova oferta ou descartar",
      icon: Package,
      color: "border-red-900/30 bg-red-950/10",
      iconColor: "text-red-400",
    },
    {
      id: "2",
      type: "Landing sem Conversão",
      name: "Landing Y",
      description: "Taxa de conversão abaixo de 1%",
      risco: "Alto",
      impacto: "R$ -5.000",
      sugestaoIA: "Testar nova headline ou oferta",
      icon: Globe,
      color: "border-red-900/30 bg-red-950/10",
      iconColor: "text-red-400",
    },
    {
      id: "3",
      type: "Checkout sem Venda",
      name: "Checkout Z",
      description: "Sem vendas nos últimos 7 dias",
      risco: "Médio",
      impacto: "R$ -3.000",
      sugestaoIA: "Revisar preço ou oferta",
      icon: CreditCard,
      color: "border-orange-900/30 bg-orange-950/10",
      iconColor: "text-orange-400",
    },
    {
      id: "4",
      type: "Pesquisa Incompleta",
      name: "Pesquisa W",
      description: "Dados insuficientes para decisão",
      risco: "Médio",
      impacto: "R$ -2.000",
      sugestaoIA: "Completar pesquisa com IA",
      icon: Search,
      color: "border-orange-900/30 bg-orange-950/10",
      iconColor: "text-orange-400",
    },
    {
      id: "5",
      type: "Copy Incompleta",
      name: "Copy V",
      description: "Copy pendente de revisão",
      risco: "Baixo",
      impacto: "R$ -1.000",
      sugestaoIA: "Gerar copy completa com IA",
      icon: FileText,
      color: "border-yellow-900/30 bg-yellow-950/10",
      iconColor: "text-yellow-400",
    },
    {
      id: "6",
      type: "Oferta sem Validação",
      name: "Oferta U",
      description: "Oferta não validada com público",
      risco: "Alto",
      impacto: "R$ -8.000",
      sugestaoIA: "Criar teste de validação",
      icon: TrendingDown,
      color: "border-red-900/30 bg-red-950/10",
      iconColor: "text-red-400",
    },
  ];

  const sortedRisks = risks.sort((a, b) => {
    const riskOrder: Record<string, number> = { "Alto": 1, "Médio": 2, "Baixo": 3 };
    return (riskOrder[a.risco] || 99) - (riskOrder[b.risco] || 99);
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Riscos"
        description="Riscos detectados automaticamente com sugestões de resolução."
      />

      {/* Risks Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedRisks.map((risk) => {
          const Icon = risk.icon;
          return (
            <div
              key={risk.id}
              className={`p-6 rounded-xl border ${risk.color} hover:shadow-lg transition-all shadow-sm`}
            >
              <div className={`w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${risk.iconColor}`} />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-1">{risk.type}</h3>
              <p className="text-sm text-zinc-400 mb-2">{risk.name}</p>
              <p className="text-xs text-zinc-500 mb-4">{risk.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Risco</span>
                  <span className={`font-medium ${risk.risco === "Alto" ? "text-red-400" : risk.risco === "Médio" ? "text-orange-400" : "text-yellow-400"}`}>{risk.risco}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Impacto</span>
                  <span className="font-medium text-red-400">{risk.impacto}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/50 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="h-4 w-4 text-purple-400" />
                  <span className="text-xs text-zinc-500">Sugestão IA</span>
                </div>
                <p className="text-xs text-zinc-300">{risk.sugestaoIA}</p>
              </div>

              <Button size="sm" className="w-full gap-2">
                <CheckCircle className="h-4 w-4" />
                Resolver
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function RisksPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <RisksContent organizationId={organizationId} />
    </Suspense>
  );
}
