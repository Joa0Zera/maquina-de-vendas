import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Globe, Cloud, CheckCircle, Clock, ExternalLink, Play, RefreshCw, Server, Zap } from "lucide-react";

async function DeployContent({ organizationId }: { organizationId: string }) {
  const deployments = [
    {
      id: "1",
      landing: "Ebook Ansiedade",
      projeto: "ebook-ansiedade",
      status: "deployed",
      deployUrl: "https://ebook-ansiedade.vercel.app",
      productionUrl: "https://ebook-ansiedade.com",
      lastDeploy: "há 2 horas",
      deployTime: "45s",
    },
    {
      id: "2",
      landing: "Curso Marketing",
      projeto: "curso-marketing",
      status: "building",
      deployUrl: null,
      productionUrl: null,
      lastDeploy: "há 5 minutos",
      deployTime: "em andamento",
    },
    {
      id: "3",
      landing: "Mentoria Digital",
      projeto: "mentoria-digital",
      status: "error",
      deployUrl: null,
      productionUrl: null,
      lastDeploy: "há 1 dia",
      deployTime: "erro",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "border-green-900/30 bg-green-950/10";
      case "building":
        return "border-blue-900/30 bg-blue-950/10";
      case "error":
        return "border-red-900/30 bg-red-950/10";
      default:
        return "border-zinc-800 bg-zinc-900";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
        return CheckCircle;
      case "building":
        return RefreshCw;
      case "error":
        return Server;
      default:
        return Server;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "deployed":
        return "Publicado";
      case "building":
        return "Construindo";
      case "error":
        return "Erro";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Deploy"
        description="Gerencie seus deploys na Vercel."
        actions={
          <Button className="gap-2">
            <Cloud className="h-4 w-4" />
            Novo Deploy
          </Button>
        }
      />

      {/* Deployments Grid */}
      <div className="grid gap-4">
        {deployments.map((deployment) => {
          const StatusIcon = getStatusIcon(deployment.status);
          return (
            <div
              key={deployment.id}
              className={`p-6 rounded-xl border ${getStatusColor(deployment.status)} hover:shadow-xl hover:border-zinc-700 transition-all shadow-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100">{deployment.landing}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusIcon className={`h-3 w-3 ${deployment.status === "deployed" ? "text-green-400" : deployment.status === "building" ? "text-blue-400" : "text-red-400"}`} />
                      <p className="text-xs text-zinc-400">{getStatusText(deployment.status)}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 mb-1">Tempo de deploy</p>
                  <p className="text-sm font-medium text-zinc-100">{deployment.deployTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Projeto</p>
                  <p className="text-sm text-zinc-100">{deployment.projeto}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Último deploy</p>
                  <p className="text-sm text-zinc-100">{deployment.lastDeploy}</p>
                </div>
              </div>

              {deployment.status === "deployed" && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Deploy URL</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-zinc-100 truncate">{deployment.deployUrl}</p>
                      <ExternalLink className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Produção</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-zinc-100 truncate">{deployment.productionUrl}</p>
                      <ExternalLink className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {deployment.status === "deployed" ? (
                  <>
                    <Button size="sm" variant="secondary" className="flex-1 gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Abrir
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </>
                ) : deployment.status === "building" ? (
                  <Button size="sm" variant="secondary" className="flex-1 gap-2" disabled>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Construindo...
                  </Button>
                ) : (
                  <>
                    <Button size="sm" className="flex-1 gap-2">
                      <Play className="h-4 w-4" />
                      Re-deploy
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-2">
                      <Zap className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-100 mb-4">Ações Rápidas</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="secondary" className="gap-2 justify-start">
            <Globe className="h-4 w-4" />
            Criar novo projeto
          </Button>
          <Button variant="secondary" className="gap-2 justify-start">
            <Cloud className="h-4 w-4" />
            Deploy manual
          </Button>
          <Button variant="secondary" className="gap-2 justify-start">
            <RefreshCw className="h-4 w-4" />
            Re-deploy todos
          </Button>
          <Button variant="secondary" className="gap-2 justify-start">
            <ExternalLink className="h-4 w-4" />
            Abrir Vercel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default async function DeployPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <DeployContent organizationId={organizationId} />
    </Suspense>
  );
}
