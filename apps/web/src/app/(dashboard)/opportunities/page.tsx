import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { TrendingUp, Package, Globe, FileText, CreditCard, DollarSign, ArrowRight, Sparkles } from "lucide-react";

async function OpportunitiesContent({ organizationId }: { organizationId: string }) {
  const opportunities = [
    {
      id: "1",
      type: "Produto Promissor",
      name: "Produto X",
      description: "Taxa de conversão de 4.2% e ticket médio de R$ 497",
      potencial: "R$ 50.000",
      icon: Package,
      color: "border-green-900/30 bg-green-950/10",
      iconColor: "text-green-400",
    },
    {
      id: "2",
      type: "Nicho Crescendo",
      name: "Nicho Y",
      description: "Aumento de 300% nas buscas nos últimos 30 dias",
      potencial: "R$ 35.000",
      icon: TrendingUp,
      color: "border-blue-900/30 bg-blue-950/10",
      iconColor: "text-blue-400",
    },
    {
      id: "3",
      type: "Landing com Potencial",
      name: "Landing Z",
      description: "Taxa de conversão de 3.8% com tráfego orgânico",
      potencial: "R$ 25.000",
      icon: Globe,
      color: "border-purple-900/30 bg-purple-950/10",
      iconColor: "text-purple-400",
    },
    {
      id: "4",
      type: "Copy com Potencial",
      name: "Copy W",
      description: "CTR de 5.2% em testes A/B",
      potencial: "R$ 20.000",
      icon: FileText,
      color: "border-cyan-900/30 bg-cyan-950/10",
      iconColor: "text-cyan-400",
    },
    {
      id: "5",
      type: "Oferta com Potencial",
      name: "Oferta V",
      description: "Taxa de conversão de checkout de 12%",
      potencial: "R$ 18.000",
      icon: CreditCard,
      color: "border-emerald-900/30 bg-emerald-950/10",
      iconColor: "text-emerald-400",
    },
    {
      id: "6",
      type: "Checkout com Potencial",
      name: "Checkout U",
      description: "Taxa de abandono de apenas 25%",
      potencial: "R$ 15.000",
      icon: DollarSign,
      color: "border-yellow-900/30 bg-yellow-950/10",
      iconColor: "text-yellow-400",
    },
  ];

  const sortedOpportunities = opportunities.sort((a, b) => {
    const valueA = parseInt(a.potencial.replace(/[^0-9]/g, ''));
    const valueB = parseInt(b.potencial.replace(/[^0-9]/g, ''));
    return valueB - valueA;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Oportunidades"
        description="Oportunidades detectadas automaticamente ordenadas por potencial financeiro."
      />

      {/* Opportunities Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedOpportunities.map((opportunity, index) => {
          const Icon = opportunity.icon;
          return (
            <div
              key={opportunity.id}
              className={`p-6 rounded-xl border ${opportunity.color} hover:shadow-lg transition-all shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${opportunity.iconColor}`} />
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${opportunity.iconColor}`}>{opportunity.potencial}</p>
                  <p className="text-xs text-zinc-500 mt-1">potencial</p>
                </div>
              </div>
              <h3 className="font-semibold text-zinc-100 mb-1">{opportunity.type}</h3>
              <p className="text-sm text-zinc-400 mb-3">{opportunity.name}</p>
              <p className="text-xs text-zinc-500 mb-4">{opportunity.description}</p>
              <Button size="sm" variant="secondary" className="w-full">
                Aproveitar
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function OpportunitiesPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <OpportunitiesContent organizationId={organizationId} />
    </Suspense>
  );
}
