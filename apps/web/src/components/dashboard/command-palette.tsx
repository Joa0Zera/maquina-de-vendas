"use client";

import { useState, useEffect } from "react";
import { Search, Package, Globe, CreditCard, FileText, Brain, BarChart3, Zap, Folder, CheckSquare, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const searchItems = [
  { id: "projetos", label: "Projetos", icon: Package, href: "/products", category: "Geral" },
  { id: "produtos", label: "Produtos", icon: Package, href: "/products", category: "Geral" },
  { id: "landing", label: "Landing Pages", icon: Globe, href: "/landing-pages", category: "Geral" },
  { id: "checkout", label: "Checkouts", icon: CreditCard, href: "/products", category: "Geral" },
  { id: "copy", label: "Copy", icon: FileText, href: "/products", category: "Geral" },
  { id: "ia", label: "IA", icon: Brain, href: "/ai", category: "Geral" },
  { id: "pesquisa", label: "Pesquisa", icon: Search, href: "/intelligence", category: "Geral" },
  { id: "receita", label: "Receita", icon: BarChart3, href: "/revenue", category: "Financeiro" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics", category: "Financeiro" },
  { id: "automacoes", label: "Automações", icon: Zap, href: "/automations", category: "Operações" },
  { id: "arquivos", label: "Arquivos", icon: Folder, href: "/files", category: "Operações" },
  { id: "relatorios", label: "Relatórios", icon: FileText, href: "/reports", category: "Operações" },
  { id: "checklist", label: "Checklist", icon: CheckSquare, href: "/execution", category: "Operações" },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const filteredItems = searchItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[25vh] bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-800">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar projetos, produtos, landing pages, checkouts, copy, IA, pesquisa, receita, analytics, automações, arquivos, relatórios, checklist..."
              className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 text-zinc-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">Nenhum resultado encontrado</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        index === selectedIndex
                          ? "bg-zinc-800 text-zinc-100"
                          : "hover:bg-zinc-800/50 text-zinc-400"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <div className="flex-1">
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-800 rounded">↑↓</kbd>
                <span>Navegar</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-800 rounded">↵</kbd>
                <span>Abrir</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-800 rounded">ESC</kbd>
                <span>Fechar</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
