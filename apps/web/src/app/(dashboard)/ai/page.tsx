import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, Search, User, FileText, Globe, Copy, Image, Mail, MessageSquare, MessageCircle, HelpCircle, Sparkles, Target } from "lucide-react";

async function AIContent({ organizationId }: { organizationId: string }) {
  const sections = [
    {
      id: "pesquisa",
      title: "IA Pesquisa",
      description: "Gere pesquisas de mercado automatizadas",
      icon: Search,
      color: "border-blue-700",
      bgColor: "bg-blue-500/10",
      link: "/trends",
    },
    {
      id: "avatar",
      title: "IA Avatar",
      description: "Crie avatares para seus produtos",
      icon: User,
      color: "border-purple-700",
      bgColor: "bg-purple-500/10",
      link: "/products",
    },
    {
      id: "headline",
      title: "IA Headlines",
      description: "Crie headlines de alta conversão",
      icon: FileText,
      color: "border-green-700",
      bgColor: "bg-green-500/10",
      link: "/copy",
    },
    {
      id: "oferta",
      title: "IA Oferta",
      description: "Gere ofertas irresistíveis com IA",
      icon: Sparkles,
      color: "border-yellow-700",
      bgColor: "bg-yellow-500/10",
      link: "/offers",
    },
    {
      id: "landing",
      title: "IA Landing",
      description: "Crie landing pages otimizadas",
      icon: Globe,
      color: "border-cyan-700",
      bgColor: "bg-cyan-500/10",
      link: "/landing-pages",
    },
    {
      id: "copy",
      title: "IA Copy",
      description: "Gere copy completa para seus produtos",
      icon: Copy,
      color: "border-orange-700",
      bgColor: "bg-orange-500/10",
      link: "/copy",
    },
    {
      id: "criativos",
      title: "IA Criativos",
      description: "Gere criativos para anúncios",
      icon: Image,
      color: "border-pink-700",
      bgColor: "bg-pink-500/10",
      link: "/products",
    },
    {
      id: "emails",
      title: "IA Email",
      description: "Crie sequências de email",
      icon: Mail,
      color: "border-red-700",
      bgColor: "bg-red-500/10",
      link: "/products",
    },
    {
      id: "whatsapp",
      title: "IA WhatsApp",
      description: "Gere scripts para WhatsApp",
      icon: MessageSquare,
      color: "border-emerald-700",
      bgColor: "bg-emerald-500/10",
      link: "/products",
    },
    {
      id: "objecoes",
      title: "IA Objeções",
      description: "Responda objeções com IA",
      icon: MessageCircle,
      color: "border-violet-700",
      bgColor: "bg-violet-500/10",
      link: "/products",
    },
    {
      id: "faq",
      title: "IA FAQ",
      description: "Gere FAQs automáticos",
      icon: HelpCircle,
      color: "border-rose-700",
      bgColor: "bg-rose-500/10",
      link: "/products",
    },
    {
      id: "estrategia",
      title: "IA Estratégia",
      description: "Desenvolva estratégias com IA",
      icon: Target,
      color: "border-indigo-700",
      bgColor: "bg-indigo-500/10",
      link: "/intelligence",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="IA Executiva"
        description="Central de IA para todas as suas necessidades de criação e estratégia."
        actions={
          <Button className="gap-2">
            <Brain className="h-4 w-4" />
            Nova Geração
          </Button>
        }
      />

      {/* AI Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              href={section.link}
              className="group p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all"
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
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Ações Rápidas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="secondary" className="gap-2 h-auto py-4 flex-col">
            <FileText className="h-6 w-6" />
            <span className="text-sm">Gerar Copy</span>
          </Button>
          <Button variant="secondary" className="gap-2 h-auto py-4 flex-col">
            <Globe className="h-6 w-6" />
            <span className="text-sm">Criar Landing</span>
          </Button>
          <Button variant="secondary" className="gap-2 h-auto py-4 flex-col">
            <Image className="h-6 w-6" />
            <span className="text-sm">Criar Criativos</span>
          </Button>
          <Button variant="secondary" className="gap-2 h-auto py-4 flex-col">
            <Mail className="h-6 w-6" />
            <span className="text-sm">Criar Emails</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default async function AIPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <AIContent organizationId={organizationId} />
    </Suspense>
  );
}
