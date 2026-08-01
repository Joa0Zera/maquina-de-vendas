"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RefreshCw, Settings, Link as LinkIcon, Brain, Globe, Server, Database, TrendingUp, MessageSquare, Youtube, Workflow, Cloud } from "lucide-react";
import { AIStatus } from "@/components/dashboard/ai-status";

interface IntegrationStatus {
  name: string;
  connected: boolean;
  error?: string;
}

function IntegrationsContent() {
  const [statuses, setStatuses] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState<string | null>(null);

  const integrations = [
    {
      id: "gemini",
      name: "Gemini",
      icon: Brain,
      description: "Geração de conteúdo, análise de dados, automações",
      canTest: true,
    },
    {
      id: "cakto",
      name: "Cakto",
      icon: Server,
      description: "Pagamentos, checkouts, gestão de vendas",
      canTest: true,
    },
    {
      id: "gamma",
      name: "Gamma",
      icon: Globe,
      description: "Geração de ebooks, apresentações, documentos",
      canTest: false,
    },
    {
      id: "vercel",
      name: "Vercel",
      icon: Cloud,
      description: "Deploy de landing pages, hospedagem",
      canTest: false,
    },
    {
      id: "supabase",
      name: "Supabase",
      icon: Database,
      description: "Banco de dados, autenticação, storage",
      canTest: false,
    },
    {
      id: "google-trends",
      name: "Google Trends",
      icon: TrendingUp,
      description: "Tendências de pesquisa, análise de mercado",
      canTest: false,
    },
    {
      id: "reddit",
      name: "Reddit",
      icon: MessageSquare,
      description: "Pesquisa de nicho, análise de comunidade",
      canTest: false,
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: MessageSquare,
      description: "Ads, distribuição orgânica, grupos",
      canTest: false,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: MessageSquare,
      description: "Distribuição visual, stories, reels",
      canTest: false,
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: MessageSquare,
      description: "Vídeos curtos, distribuição viral",
      canTest: false,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      description: "Vídeos longos, canal, shorts",
      canTest: false,
    },
    {
      id: "n8n",
      name: "n8n",
      icon: Workflow,
      description: "Automações, workflows, integrações",
      canTest: false,
    },
  ];

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const response = await fetch("/api/status");
      const data = await response.json();
      setStatuses(data);
    } catch (error) {
      console.error("Failed to fetch integration statuses:", error);
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async (integrationId: string) => {
    setTesting(integrationId);
    try {
      const response = await fetch(`/api/integrations/${integrationId}/test`);
      const data = await response.json();
      setStatuses(prev => ({ ...prev, [integrationId]: data.connected }));
    } catch (error) {
      console.error(`Failed to test ${integrationId}:`, error);
      setStatuses(prev => ({ ...prev, [integrationId]: false }));
    } finally {
      setTesting(null);
    }
  };

  const getStatusColor = (connected: boolean) => {
    return connected ? "border-green-900/30 bg-green-950/10" : "border-zinc-800 bg-zinc-900";
  };

  const getStatusIcon = (connected: boolean) => {
    return connected ? CheckCircle : XCircle;
  };

  const getStatusText = (connected: boolean) => {
    return connected ? "Conectado" : "Não conectado";
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Integrações"
        description="Gerencie todas as suas integrações em um único lugar."
      />

      {/* AI Status Monitor */}
      <AIStatus />

      {/* Integrations Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => {
          const StatusIcon = getStatusIcon(statuses[integration.id] || false);
          const Icon = integration.icon;
          const isConnected = statuses[integration.id] || false;
          const isTesting = testing === integration.id;

          return (
            <div
              key={integration.id}
              className={`p-6 rounded-xl border ${getStatusColor(isConnected)} hover:shadow-xl hover:border-zinc-700 transition-all shadow-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100">{integration.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusIcon className={`h-3 w-3 ${isConnected ? "text-green-400" : "text-zinc-500"}`} />
                      <p className="text-xs text-zinc-400">{getStatusText(isConnected)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-400 mb-4">{integration.description}</p>

              <div className="flex gap-2">
                {integration.canTest ? (
                  <>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1 gap-2"
                      onClick={() => testConnection(integration.id)}
                      disabled={isTesting}
                    >
                      {isTesting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Testando...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4" />
                          Testar conexão
                        </>
                      )}
                    </Button>
                    {isConnected && (
                      <Button size="sm" variant="ghost" className="gap-2">
                        <Settings className="h-4 w-4" />
                      </Button>
                    )}
                  </>
                ) : (
                  <Button size="sm" variant="secondary" className="flex-1 gap-2" disabled>
                    <LinkIcon className="h-4 w-4" />
                    Em breve
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  return <IntegrationsContent />;
}
