"use client";

import { useState } from "react";
import { Plus, Package, FileText, Globe, Copy, Users, Search, X, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      label: "Criar Projeto",
      icon: Package,
      href: "/products/new",
      description: "Criar um novo projeto do zero",
    },
    {
      label: "Criar Produto",
      icon: Package,
      href: "/products/new",
      description: "Criar um novo produto",
    },
    {
      label: "Criar Oferta",
      icon: FileText,
      href: "/offers/new",
      description: "Criar uma nova oferta",
    },
    {
      label: "Criar Landing",
      icon: Globe,
      href: "/landing-pages/new",
      description: "Gerar uma nova landing page",
    },
    {
      label: "Criar Checkout",
      icon: CreditCard,
      href: "/checkouts/new",
      description: "Criar um novo checkout",
    },
    {
      label: "Criar Copy",
      icon: Copy,
      href: "/copy/new",
      description: "Criar materiais de copy",
    },
    {
      label: "Nova Pesquisa",
      icon: Search,
      href: "/trends",
      description: "Pesquisar tendências do mercado",
    },
    {
      label: "Nova Distribuição",
      icon: Users,
      href: "/organic/new",
      description: "Configurar distribuição orgânica",
    },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-md mx-4 p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-zinc-100">Ações Rápidas</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Actions Grid */}
            <div className="grid gap-2">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all"
                  >
                    <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-zinc-100">{action.label}</p>
                      <p className="text-sm text-zinc-500">{action.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
