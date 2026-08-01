"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  FileText,
  Globe,
  CreditCard,
  Copy,
  Users,
  Brain,
  ArrowLeft,
  BarChart3,
  Clock,
  Folder,
  User,
  Image,
  Search,
  DollarSign,
  CheckSquare,
  Settings
} from "lucide-react";

const workspaceNav = [
  { id: "resumo", label: "Missão", icon: LayoutDashboard, href: "" },
  { id: "pesquisa", label: "Pesquisa", icon: Search, href: "#pesquisa" },
  { id: "avatar", label: "Avatar", icon: User, href: "#avatar" },
  { id: "produto", label: "Produto", icon: Package, href: "#produto" },
  { id: "oferta", label: "Oferta", icon: FileText, href: "#oferta" },
  { id: "landing", label: "Landing", icon: Globe, href: "#landing" },
  { id: "checkout", label: "Checkout", icon: CreditCard, href: "#checkout" },
  { id: "copy", label: "Copy", icon: Copy, href: "#copy" },
  { id: "criativos", label: "Criativos", icon: Image, href: "#criativos" },
  { id: "organic", label: "Distribuição", icon: Users, href: "#organic" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "#analytics" },
  { id: "receita", label: "Receita", icon: DollarSign, href: "#receita" },
  { id: "timeline", label: "Timeline", icon: Clock, href: "#timeline" },
  { id: "checklist", label: "Checklist", icon: CheckSquare, href: "#checklist" },
  { id: "files", label: "Arquivos", icon: Folder, href: "#files" },
  { id: "ia", label: "IA", icon: Brain, href: "#ia" },
  { id: "configuracoes", label: "Configurações", icon: Settings, href: "#configuracoes" },
];

interface WorkspaceSidebarProps {
  productId: string;
  productName: string;
}

export function WorkspaceSidebar({ productId, productName }: WorkspaceSidebarProps) {
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop() || "resumo";

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 p-4 flex flex-col h-screen sticky top-0">
      {/* Back Button */}
      <Link
        href="/products"
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar aos Projetos
      </Link>

      {/* Project Name */}
      <div className="mb-6 px-2">
        <h2 className="text-sm font-semibold text-zinc-100 line-clamp-2">{productName}</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {workspaceNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <Link
              key={item.id}
              href={`/products/${productId}/${item.id === "resumo" ? "" : item.id}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                isActive
                  ? "bg-zinc-800 text-zinc-100 font-medium"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
