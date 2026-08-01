"use client";

import { APP_NAME } from "@maquina/shared";
import { Search, Plus, Bell, Building2, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface HeaderProps {
  userName?: string;
}

export function Header({ userName }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-950/95 px-4 sm:px-8 backdrop-blur">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden h-9 w-9 p-0"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight">{APP_NAME}</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar projetos, produtos, ofertas, landing pages, copy, checkouts..."
              className="w-full h-9 pl-10 pr-4 rounded-lg border border-zinc-800 bg-zinc-900 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent"
              onFocus={() => setSearchOpen(true)}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium text-zinc-500 bg-zinc-900 border border-zinc-800">
              <span>⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* New Action Button */}
          <Button size="sm" className="gap-2 hidden sm:flex">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nova Ação</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* Organization */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900">
            <Building2 className="h-4 w-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">Organização</span>
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="hidden sm:inline text-sm text-zinc-400">{userName}</span>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl p-4 animate-in fade-in slide-in-from-top-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar projetos, produtos, ofertas, landing pages, copy, checkouts, relatórios, pesquisa..."
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-zinc-800 bg-zinc-900 text-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent"
                autoFocus
              />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Sugestões</p>
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar projetos</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar produtos</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar ofertas</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar landing pages</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar copy</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar checkouts</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar receita</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar arquivos</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar relatórios</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar pesquisa</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors">
                  <span className="text-sm">Buscar IA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
