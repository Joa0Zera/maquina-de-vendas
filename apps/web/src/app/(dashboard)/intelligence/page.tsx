import { Suspense } from "react";
import { ImportTrendsButton } from "@/components/trends/import-trends-button";
import { TrendList } from "@/components/trends/trend-list";
import { listTrendsByOrganization } from "@/lib/trends";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Lightbulb, Search, MessageSquare, Sparkles, BarChart3, CheckSquare, Users, User, Globe } from "lucide-react";

async function IntelligenceContent({ organizationId }: { organizationId: string }) {
  const trends = await listTrendsByOrganization(organizationId);

  const sections = [
    {
      id: "google-trends",
      title: "Google Trends",
      description: "Analise tendências de busca no Google",
      icon: BarChart3,
      color: "border-red-700",
      bgColor: "bg-red-500/10",
      link: "/trends",
    },
    {
      id: "reddit",
      title: "Reddit",
      description: "Monitore discussões relevantes no Reddit",
      icon: MessageSquare,
      color: "border-orange-700",
      bgColor: "bg-orange-500/10",
      link: "/trends",
    },
    {
      id: "youtube",
      title: "YouTube",
      description: "Analise tendências no YouTube",
      icon: TrendingUp,
      color: "border-red-700",
      bgColor: "bg-red-500/10",
      link: "/trends",
    },
    {
      id: "facebook",
      title: "Facebook",
      description: "Monitore tendências no Facebook",
      icon: Users,
      color: "border-blue-700",
      bgColor: "bg-blue-500/10",
      link: "/trends",
    },
    {
      id: "instagram",
      title: "Instagram",
      description: "Analise tendências no Instagram",
      icon: Globe,
      color: "border-pink-700",
      bgColor: "bg-pink-500/10",
      link: "/trends",
    },
    {
      id: "tiktok",
      title: "TikTok",
      description: "Descubra tendências do TikTok",
      icon: TrendingUp,
      color: "border-cyan-700",
      bgColor: "bg-cyan-500/10",
      link: "/trends",
      count: trends.length,
    },
    {
      id: "comunidades",
      title: "Comunidades",
      description: "Analise comunidades relevantes",
      icon: Users,
      color: "border-purple-700",
      bgColor: "bg-purple-500/10",
      link: "/trends",
    },
    {
      id: "concorrencia",
      title: "Concorrência",
      description: "Analise seus concorrentes no mercado",
      icon: Users,
      color: "border-pink-700",
      bgColor: "bg-pink-500/10",
      link: "/trends",
    },
    {
      id: "insights",
      title: "Insights IA",
      description: "Análises inteligentes do seu portfólio",
      icon: Lightbulb,
      color: "border-yellow-700",
      bgColor: "bg-yellow-500/10",
      link: "/portfolio",
    },
    {
      id: "pesquisa",
      title: "Pesquisa de Mercado",
      description: "Analise tendências e oportunidades no mercado",
      icon: Search,
      color: "border-blue-700",
      bgColor: "bg-blue-500/10",
      link: "/trends",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Pesquisa"
        description="Unifique Google Trends, Reddit, YouTube, Facebook, Instagram, TikTok, Comunidades, Concorrência e Insights IA em uma única página."
        actions={
          <div className="flex items-center gap-3">
            <ImportTrendsButton />
            <Link href="/trends/new">
              <Button>Nova Pesquisa</Button>
            </Link>
          </div>
        }
      />

      {/* Intelligence Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              href={section.link}
              className="group p-4 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${section.bgColor} border ${section.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-100 mb-1 group-hover:text-zinc-200 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{section.description}</p>
                  {section.count !== undefined && (
                    <p className="text-xs text-zinc-500 mt-2">{section.count} itens</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {trends.length === 0 && (
        <div className="p-12 rounded-xl border border-zinc-800 bg-zinc-950/50 text-center">
          <Brain className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">Nenhuma tendência encontrada</h3>
          <p className="text-zinc-400 mb-6">Comece pesquisando tendências do mercado para descobrir oportunidades.</p>
          <Link href="/trends/new">
            <Button>Nova Pesquisa</Button>
          </Link>
        </div>
      )}

      {/* Recent Trends */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Tendências Recentes</h2>
        <TrendList trends={trends.slice(0, 5)} />
      </div>
    </div>
  );
}

export default async function IntelligencePage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <IntelligenceContent organizationId={organizationId} />
    </Suspense>
  );
}
