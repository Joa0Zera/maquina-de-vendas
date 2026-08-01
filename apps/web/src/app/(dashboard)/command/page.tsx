import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { listProductsByOrganization } from "@/lib/products";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Globe, CreditCard, FileText, Image, Search, Users, DollarSign, BarChart3, Brain, Zap, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";

async function CommandContent({ organizationId }: { organizationId: string }) {
  const products = await listProductsByOrganization(organizationId);

  const blocks = [
    {
      id: "produtos",
      title: "Produtos",
      description: "Gerencie seus infoprodutos",
      icon: Package,
      color: "border-purple-700",
      bgColor: "bg-purple-500/10",
      count: products.length,
      status: "Ativo",
      lastUpdate: "Há 2 horas",
      link: "/products",
    },
    {
      id: "landing",
      title: "Landing Pages",
      description: "Páginas de vendas",
      icon: Globe,
      color: "border-blue-700",
      bgColor: "bg-blue-500/10",
      count: products.filter(p => p.status === "published").length,
      status: "Ativo",
      lastUpdate: "Há 1 hora",
      link: "/landing-pages",
    },
    {
      id: "checkout",
      title: "Checkouts",
      description: "Configurações de pagamento",
      icon: CreditCard,
      color: "border-green-700",
      bgColor: "bg-green-500/10",
      count: products.filter(p => p.checkoutUrl).length,
      status: "Ativo",
      lastUpdate: "Há 30 min",
      link: "/products",
    },
    {
      id: "copy",
      title: "Copy",
      description: "Materiais de venda",
      icon: FileText,
      color: "border-orange-700",
      bgColor: "bg-orange-500/10",
      count: products.length,
      status: "Ativo",
      lastUpdate: "Há 4 horas",
      link: "/products",
    },
    {
      id: "criativos",
      title: "Criativos",
      description: "Materiais de anúncio",
      icon: Image,
      color: "border-pink-700",
      bgColor: "bg-pink-500/10",
      count: 0,
      status: "Pendente",
      lastUpdate: "Há 1 dia",
      link: "/products",
    },
    {
      id: "pesquisa",
      title: "Pesquisa",
      description: "Tendências de mercado",
      icon: Search,
      color: "border-cyan-700",
      bgColor: "bg-cyan-500/10",
      count: 5,
      status: "Ativo",
      lastUpdate: "Há 6 horas",
      link: "/intelligence",
    },
    {
      id: "distribuicao",
      title: "Distribuição",
      description: "Canais de tráfego",
      icon: Users,
      color: "border-indigo-700",
      bgColor: "bg-indigo-500/10",
      count: 3,
      status: "Ativo",
      lastUpdate: "Há 3 horas",
      link: "/products",
    },
    {
      id: "receita",
      title: "Receita",
      description: "Métricas financeiras",
      icon: DollarSign,
      color: "border-emerald-700",
      bgColor: "bg-emerald-500/10",
      count: 1,
      status: "Ativo",
      lastUpdate: "Tempo real",
      link: "/revenue",
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "Análise de dados",
      icon: BarChart3,
      color: "border-violet-700",
      bgColor: "bg-violet-500/10",
      count: 1,
      status: "Ativo",
      lastUpdate: "Tempo real",
      link: "/analytics",
    },
    {
      id: "ia",
      title: "IA",
      description: "Inteligência artificial",
      icon: Brain,
      color: "border-rose-700",
      bgColor: "bg-rose-500/10",
      count: 12,
      status: "Ativo",
      lastUpdate: "Há 5 horas",
      link: "/ai",
    },
    {
      id: "automacoes",
      title: "Automações",
      description: "Fluxos automáticos",
      icon: Zap,
      color: "border-yellow-700",
      bgColor: "bg-yellow-500/10",
      count: 3,
      status: "Ativo",
      lastUpdate: "Há 12 horas",
      link: "/automations",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Comando"
        description="Visão completa de toda operação em tempo real."
        actions={
          <Button variant="secondary" size="sm" className="gap-2">
            <Clock className="h-4 w-4" />
            Atualizar
          </Button>
        }
      />

      {/* Command Blocks Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blocks.map((block) => {
          const Icon = block.icon;
          const isPending = block.status === "Pendente";
          return (
            <Link
              key={block.id}
              href={block.link}
              className="group p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${block.bgColor} border ${block.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                  isPending 
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" 
                    : "bg-green-500/10 text-green-400 border border-green-500/20"
                }`}>
                  {isPending ? <AlertCircle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                  {block.status}
                </div>
              </div>
              <h3 className="font-semibold text-zinc-100 mb-1">{block.title}</h3>
              <p className="text-sm text-zinc-400 mb-3">{block.description}</p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{block.count} itens</span>
                <span>{block.lastUpdate}</span>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 group-hover:bg-zinc-800">
                Abrir
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Total de Blocos</span>
            <Package className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">{blocks.length}</p>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Blocos Ativos</span>
            <CheckCircle className="h-5 w-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">{blocks.filter(b => b.status === "Ativo").length}</p>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Blocos Pendentes</span>
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">{blocks.filter(b => b.status === "Pendente").length}</p>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Última Atualização</span>
            <Clock className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-zinc-100">Tempo real</p>
        </div>
      </div>
    </div>
  );
}

export default async function CommandPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <CommandContent organizationId={organizationId} />
    </Suspense>
  );
}
