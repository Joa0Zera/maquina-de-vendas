import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Package, Globe, CreditCard, FileText, Search, AlertTriangle, AlertCircle, Bell, ArrowRight } from "lucide-react";

async function AlertsContent({ organizationId }: { organizationId: string }) {
  const alerts = [
    { id: "1", type: "Produto parado", message: "Produto X está parado há 30 dias", priority: "Alta", icon: Package, color: "border-red-900/30 bg-red-950/10" },
    { id: "2", type: "Landing sem conversão", message: "Landing Y tem taxa de conversão abaixo de 1%", priority: "Alta", icon: Globe, color: "border-red-900/30 bg-red-950/10" },
    { id: "3", type: "Checkout sem vendas", message: "Checkout Z não gerou vendas nos últimos 7 dias", priority: "Média", icon: CreditCard, color: "border-orange-900/30 bg-orange-950/10" },
    { id: "4", type: "Oferta sem validação", message: "Oferta W precisa ser validada", priority: "Alta", icon: FileText, color: "border-red-900/30 bg-red-950/10" },
    { id: "5", type: "Pesquisa incompleta", message: "Pesquisa de mercado está incompleta", priority: "Baixa", icon: Search, color: "border-yellow-900/30 bg-yellow-950/10" },
    { id: "6", type: "Copy pendente", message: "Copy do produto V está pendente", priority: "Média", icon: FileText, color: "border-orange-900/30 bg-orange-950/10" },
  ];

  const highPriority = alerts.filter(a => a.priority === "Alta");
  const mediumPriority = alerts.filter(a => a.priority === "Média");
  const lowPriority = alerts.filter(a => a.priority === "Baixa");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Central de Alertas"
        description="Alertas automáticos organizados por prioridade."
        actions={
          <Button variant="secondary" size="sm" className="gap-2">
            <Bell className="h-4 w-4" />
            Configurar Notificações
          </Button>
        }
      />

      {/* Priority Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-xl border border-red-900/30 bg-red-950/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-zinc-100">Alta Prioridade</span>
          </div>
          <p className="text-3xl font-bold text-red-400">{highPriority.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-orange-900/30 bg-orange-950/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-orange-400" />
            <span className="text-sm font-medium text-zinc-100">Média Prioridade</span>
          </div>
          <p className="text-3xl font-bold text-orange-400">{mediumPriority.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-yellow-900/30 bg-yellow-950/10">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-medium text-zinc-100">Baixa Prioridade</span>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{lowPriority.length}</p>
        </div>
      </div>

      {/* Alta Prioridade */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Alta Prioridade</h2>
        <div className="space-y-3">
          {highPriority.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${alert.color} hover:shadow-lg transition-all`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-zinc-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-zinc-100">{alert.type}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{alert.message}</p>
                  </div>
                </div>
                <Button size="sm" variant="secondary">Ver Detalhes</Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Média Prioridade */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Média Prioridade</h2>
        <div className="space-y-3">
          {mediumPriority.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${alert.color} hover:shadow-lg transition-all`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-zinc-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-zinc-100">{alert.type}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{alert.message}</p>
                  </div>
                </div>
                <Button size="sm" variant="secondary">Ver Detalhes</Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Baixa Prioridade */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Baixa Prioridade</h2>
        <div className="space-y-3">
          {lowPriority.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${alert.color} hover:shadow-lg transition-all`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-zinc-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-zinc-100">{alert.type}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{alert.message}</p>
                  </div>
                </div>
                <Button size="sm" variant="secondary">Ver Detalhes</Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default async function AlertsPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <AlertsContent organizationId={organizationId} />
    </Suspense>
  );
}
