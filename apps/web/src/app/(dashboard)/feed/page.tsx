import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { DollarSign, Package, Search, Brain, Zap, FileText, TrendingUp, Clock, ArrowRight } from "lucide-react";

async function FeedContent({ organizationId }: { organizationId: string }) {
  const feedItems = [
    {
      id: "1",
      tipo: "venda",
      titulo: "Nova venda realizada",
      descricao: "Produto X - R$ 497",
      tempo: "há 5 minutos",
      icon: DollarSign,
      color: "border-green-900/30 bg-green-950/10",
      iconColor: "text-green-400",
    },
    {
      id: "2",
      tipo: "alteracao",
      titulo: "Landing atualizada",
      descricao: "Landing Y - nova headline",
      tempo: "há 15 minutos",
      icon: FileText,
      color: "border-blue-900/30 bg-blue-950/10",
      iconColor: "text-blue-400",
    },
    {
      id: "3",
      tipo: "produto",
      titulo: "Novo produto criado",
      descricao: "Produto Z - em desenvolvimento",
      tempo: "há 1 hora",
      icon: Package,
      color: "border-purple-900/30 bg-purple-950/10",
      iconColor: "text-purple-400",
    },
    {
      id: "4",
      tipo: "pesquisa",
      titulo: "Pesquisa concluída",
      descricao: "Nicho W - validado",
      tempo: "há 2 horas",
      icon: Search,
      color: "border-cyan-900/30 bg-cyan-950/10",
      iconColor: "text-cyan-400",
    },
    {
      id: "5",
      tipo: "ia",
      titulo: "IA executada",
      descricao: "Copy gerada para Produto X",
      tempo: "há 3 horas",
      icon: Brain,
      color: "border-pink-900/30 bg-pink-950/10",
      iconColor: "text-pink-400",
    },
    {
      id: "6",
      tipo: "automacao",
      titulo: "Automação ativada",
      descricao: "Follow-up automático configurado",
      tempo: "há 4 horas",
      icon: Zap,
      color: "border-yellow-900/30 bg-yellow-950/10",
      iconColor: "text-yellow-400",
    },
    {
      id: "7",
      tipo: "projeto",
      titulo: "Projeto atualizado",
      descricao: "Missão A - 65% concluído",
      tempo: "há 5 horas",
      icon: TrendingUp,
      color: "border-emerald-900/30 bg-emerald-950/10",
      iconColor: "text-emerald-400",
    },
    {
      id: "8",
      tipo: "venda",
      titulo: "Nova venda realizada",
      descricao: "Produto Y - R$ 997",
      tempo: "há 6 horas",
      icon: DollarSign,
      color: "border-green-900/30 bg-green-950/10",
      iconColor: "text-green-400",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Feed Executivo"
        description="Acompanhe todas as atividades do seu negócio em tempo real."
      />

      {/* Feed Timeline */}
      <div className="space-y-4">
        {feedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border ${item.color} hover:shadow-lg transition-all shadow-sm`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-zinc-100">{item.titulo}</h3>
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.tempo}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-400">{item.descricao}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900">
        <h3 className="font-semibold text-zinc-100 mb-4">Resumo do Dia</h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="p-4 rounded-lg border border-green-900/30 bg-green-950/10">
            <p className="text-xs text-zinc-500 mb-1">Vendas</p>
            <p className="text-2xl font-bold text-green-400">{feedItems.filter(i => i.tipo === "venda").length}</p>
          </div>
          <div className="p-4 rounded-lg border border-blue-900/30 bg-blue-950/10">
            <p className="text-xs text-zinc-500 mb-1">Alterações</p>
            <p className="text-2xl font-bold text-blue-400">{feedItems.filter(i => i.tipo === "alteracao").length}</p>
          </div>
          <div className="p-4 rounded-lg border border-purple-900/30 bg-purple-950/10">
            <p className="text-xs text-zinc-500 mb-1">IA Executada</p>
            <p className="text-2xl font-bold text-purple-400">{feedItems.filter(i => i.tipo === "ia").length}</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <p className="text-xs text-zinc-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-zinc-100">{feedItems.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function FeedPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <FeedContent organizationId={organizationId} />
    </Suspense>
  );
}
