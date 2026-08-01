import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, Funnel, Activity, Globe, CreditCard, FileText, Users, Brain, Download, FileDown } from "lucide-react";

async function ReportsContent({ organizationId }: { organizationId: string }) {
  const dashboards = [
    {
      id: "financeiro",
      title: "Financeiro",
      description: "Métricas financeiras completas",
      icon: DollarSign,
      color: "border-emerald-700",
      bgColor: "bg-emerald-500/10",
      link: "/revenue",
    },
    {
      id: "produtos",
      title: "Produtos",
      description: "Desempenho dos produtos",
      icon: Package,
      color: "border-purple-700",
      bgColor: "bg-purple-500/10",
      link: "/products",
    },
    {
      id: "funis",
      title: "Funis",
      description: "Análise de funis de vendas",
      icon: Funnel,
      color: "border-blue-700",
      bgColor: "bg-blue-500/10",
      link: "/analytics",
    },
    {
      id: "conversao",
      title: "Conversão",
      description: "Taxas de conversão",
      icon: Activity,
      color: "border-pink-700",
      bgColor: "bg-pink-500/10",
      link: "/analytics",
    },
    {
      id: "landing",
      title: "Landing",
      description: "Performance de landing pages",
      icon: Globe,
      color: "border-cyan-700",
      bgColor: "bg-cyan-500/10",
      link: "/landing-pages",
    },
    {
      id: "checkout",
      title: "Checkout",
      description: "Métricas de checkout",
      icon: CreditCard,
      color: "border-green-700",
      bgColor: "bg-green-500/10",
      link: "/products",
    },
    {
      id: "copy",
      title: "Copy",
      description: "Performance de copy",
      icon: FileText,
      color: "border-orange-700",
      bgColor: "bg-orange-500/10",
      link: "/products",
    },
    {
      id: "distribuicao",
      title: "Distribuição",
      description: "Canais de distribuição",
      icon: Users,
      color: "border-indigo-700",
      bgColor: "bg-indigo-500/10",
      link: "/products",
    },
    {
      id: "ia",
      title: "IA",
      description: "Métricas de IA",
      icon: Brain,
      color: "border-violet-700",
      bgColor: "bg-violet-500/10",
      link: "/ai",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Relatórios"
        description="Dashboards detalhados com exportação PDF e CSV."
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <FileDown className="h-4 w-4" />
              PDF
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              CSV
            </Button>
          </div>
        }
      />

      {/* Dashboards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboards.map((dashboard) => {
          const Icon = dashboard.icon;
          return (
            <div
              key={dashboard.id}
              className="group p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all cursor-pointer"
            >
              <div className={`p-3 rounded-lg ${dashboard.bgColor} border ${dashboard.color} mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">{dashboard.title}</h3>
              <p className="text-sm text-zinc-400 mb-4">{dashboard.description}</p>
              <Button variant="ghost" size="sm" className="w-full group-hover:bg-zinc-800">
                Abrir Dashboard
              </Button>
            </div>
          );
        })}
      </div>

      {/* Export Options */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <h2 className="text-lg font-semibold tracking-tight mb-4">Opções de Exportação</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <div className="flex items-center gap-2 mb-2">
              <FileDown className="h-5 w-5 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-100">PDF</span>
            </div>
            <p className="text-xs text-zinc-400">Exportar relatório em PDF</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <div className="flex items-center gap-2 mb-2">
              <Download className="h-5 w-5 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-100">CSV</span>
            </div>
            <p className="text-xs text-zinc-400">Exportar dados em CSV</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-100">Excel</span>
            </div>
            <p className="text-xs text-zinc-400">Exportar dados em Excel</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-100">Personalizado</span>
            </div>
            <p className="text-xs text-zinc-400">Criar relatório customizado</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ReportsPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <ReportsContent organizationId={organizationId} />
    </Suspense>
  );
}
