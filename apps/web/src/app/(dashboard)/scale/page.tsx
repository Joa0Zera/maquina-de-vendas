import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Package, FileText, Globe, CreditCard, TrendingUp, Award, ArrowRight, Trophy } from "lucide-react";

async function ScaleContent({ organizationId }: { organizationId: string }) {
  const rankings = [
    {
      id: "1",
      type: "Top Produtos",
      items: [
        { name: "Produto X", receita: "R$ 50.000", crescimento: "+200%" },
        { name: "Produto Y", receita: "R$ 35.000", crescimento: "+150%" },
        { name: "Produto Z", receita: "R$ 25.000", crescimento: "+100%" },
      ],
      icon: Package,
      color: "border-green-900/30 bg-green-950/10",
      iconColor: "text-green-400",
    },
    {
      id: "2",
      type: "Top Ofertas",
      items: [
        { name: "Oferta W", receita: "R$ 45.000", crescimento: "+180%" },
        { name: "Oferta V", receita: "R$ 30.000", crescimento: "+120%" },
        { name: "Oferta U", receita: "R$ 20.000", crescimento: "+80%" },
      ],
      icon: FileText,
      color: "border-blue-900/30 bg-blue-950/10",
      iconColor: "text-blue-400",
    },
    {
      id: "3",
      type: "Top Landing Pages",
      items: [
        { name: "Landing A", receita: "R$ 40.000", crescimento: "+170%" },
        { name: "Landing B", receita: "R$ 28.000", crescimento: "+110%" },
        { name: "Landing C", receita: "R$ 18.000", crescimento: "+70%" },
      ],
      icon: Globe,
      color: "border-purple-900/30 bg-purple-950/10",
      iconColor: "text-purple-400",
    },
    {
      id: "4",
      type: "Top Checkouts",
      items: [
        { name: "Checkout 1", receita: "R$ 38.000", crescimento: "+160%" },
        { name: "Checkout 2", receita: "R$ 25.000", crescimento: "+100%" },
        { name: "Checkout 3", receita: "R$ 15.000", crescimento: "+60%" },
      ],
      icon: CreditCard,
      color: "border-cyan-900/30 bg-cyan-950/10",
      iconColor: "text-cyan-400",
    },
    {
      id: "5",
      type: "Top Campanhas",
      items: [
        { name: "Campanha Alpha", receita: "R$ 35.000", crescimento: "+150%" },
        { name: "Campanha Beta", receita: "R$ 22.000", crescimento: "+90%" },
        { name: "Campanha Gamma", receita: "R$ 12.000", crescimento: "+50%" },
      ],
      icon: TrendingUp,
      color: "border-emerald-900/30 bg-emerald-950/10",
      iconColor: "text-emerald-400",
    },
    {
      id: "6",
      type: "Top Funis",
      items: [
        { name: "Funil Principal", receita: "R$ 42.000", crescimento: "+175%" },
        { name: "Funil Secundário", receita: "R$ 27.000", crescimento: "+115%" },
        { name: "Funil Terciário", receita: "R$ 17.000", crescimento: "+75%" },
      ],
      icon: Award,
      color: "border-yellow-900/30 bg-yellow-950/10",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Painel de Escala"
        description="Ranking automático dos melhores performers."
      />

      {/* Rankings Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rankings.map((ranking) => {
          const Icon = ranking.icon;
          return (
            <div
              key={ranking.id}
              className={`p-6 rounded-xl border ${ranking.color} hover:shadow-lg transition-all shadow-sm`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${ranking.iconColor}`} />
                </div>
                <h3 className="font-semibold text-zinc-100">{ranking.type}</h3>
              </div>
              
              <div className="space-y-3">
                {ranking.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? "bg-yellow-500 text-yellow-950" : index === 1 ? "bg-zinc-400 text-zinc-950" : "bg-orange-700 text-orange-100"
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm text-zinc-100">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-zinc-100">{item.receita}</p>
                      <p className="text-xs text-green-400">{item.crescimento}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Performer */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-zinc-100 mb-1">Top Performer: Produto X</h3>
            <p className="text-sm text-zinc-400">R$ 50.000 em receita com +200% de crescimento nos últimos 30 dias.</p>
          </div>
          <Button size="sm" variant="secondary">
            Ver Detalhes
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default async function ScalePage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <ScaleContent organizationId={organizationId} />
    </Suspense>
  );
}
