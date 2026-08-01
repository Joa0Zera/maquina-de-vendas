import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Tag, TrendingUp, DollarSign, Clock, Users, FileText, Brain, ShoppingBag, Search, Globe, CreditCard, BarChart3, CheckCircle } from "lucide-react";

async function AutomationsContent({ organizationId }: { organizationId: string }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Automações"
        description="Configure fluxos automáticos para otimizar seus processos."
        actions={
          <Button className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Nova Automação
          </Button>
        }
      />

      {/* Automation Flow Visualization - n8n style */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Fluxo de Automação (n8n style)</h2>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4">
            {/* Trigger */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/20 flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-green-400" />
              </div>
              <span className="text-sm font-medium text-zinc-100">Trigger</span>
            </div>

            <ArrowRight className="h-6 w-6 text-zinc-600 flex-shrink-0" />

            {/* Pesquisa */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border-2 border-blue-500/20 flex items-center justify-center">
                <Search className="h-8 w-8 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-zinc-100">Pesquisa</span>
            </div>

            <ArrowRight className="h-6 w-6 text-zinc-600 flex-shrink-0" />

            {/* IA */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border-2 border-purple-500/20 flex items-center justify-center">
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-zinc-100">IA</span>
            </div>

            <ArrowRight className="h-6 w-6 text-zinc-600 flex-shrink-0" />

            {/* Copy */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 border-2 border-orange-500/20 flex items-center justify-center">
                <FileText className="h-8 w-8 text-orange-400" />
              </div>
              <span className="text-sm font-medium text-zinc-100">Copy</span>
            </div>

            <ArrowRight className="h-6 w-6 text-zinc-600 flex-shrink-0" />

            {/* Landing */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500/20 flex items-center justify-center">
                <Globe className="h-8 w-8 text-cyan-400" />
              </div>
              <span className="text-sm font-medium text-zinc-100">Landing</span>
            </div>

            <ArrowRight className="h-6 w-6 text-zinc-600 flex-shrink-0" />

            {/* Checkout */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-zinc-100">Checkout</span>
            </div>

            <ArrowRight className="h-6 w-6 text-zinc-600 flex-shrink-0" />

            {/* Distribuição */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-pink-500/10 border-2 border-pink-500/20 flex items-center justify-center">
                <Users className="h-8 w-8 text-pink-400" />
              </div>
              <span className="text-sm font-medium text-zinc-100">Distribuição</span>
            </div>

            <ArrowRight className="h-6 w-6 text-zinc-600 flex-shrink-0" />

            {/* Analytics */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border-2 border-indigo-500/20 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-indigo-400" />
              </div>
              <span className="text-sm font-medium text-zinc-100">Analytics</span>
            </div>

            <ArrowRight className="h-6 w-6 text-zinc-600 flex-shrink-0" />

            {/* Escala */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-violet-500/10 border-2 border-violet-500/20 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-violet-400" />
              </div>
              <span className="text-sm font-medium text-zinc-100">Escala</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Automations */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Automações Ativas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-sm font-medium text-zinc-100">Nova Venda → Email</span>
              </div>
              <span className="text-xs text-green-400">Ativo</span>
            </div>
            <p className="text-xs text-zinc-400">Disparado quando uma nova venda é realizada</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-sm font-medium text-zinc-100">Novo Lead → WhatsApp</span>
              </div>
              <span className="text-xs text-green-400">Ativo</span>
            </div>
            <p className="text-xs text-zinc-400">Disparado quando um novo lead é capturado</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-sm font-medium text-zinc-100">Produto Criado → IA</span>
              </div>
              <span className="text-xs text-green-400">Ativo</span>
            </div>
            <p className="text-xs text-zinc-400">Disparado quando um novo produto é criado</p>
          </div>
        </div>
      </div>

      {/* Available Triggers */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Gatilhos Disponíveis</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="h-5 w-5 text-green-400" />
              <h3 className="font-medium text-zinc-100">Nova Venda</h3>
            </div>
            <p className="text-sm text-zinc-400">Disparado quando uma nova venda é realizada</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-blue-400" />
              <h3 className="font-medium text-zinc-100">Novo Lead</h3>
            </div>
            <p className="text-sm text-zinc-400">Disparado quando um novo lead é capturado</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-purple-400" />
              <h3 className="font-medium text-zinc-100">Produto Criado</h3>
            </div>
            <p className="text-sm text-zinc-400">Disparado quando um novo produto é criado</p>
          </div>
        </div>
      </div>

      {/* Available Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Ações Disponíveis</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="h-5 w-5 text-blue-400" />
              <h3 className="font-medium text-zinc-100">Enviar Email</h3>
            </div>
            <p className="text-sm text-zinc-400">Envia email automático para o cliente</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="h-5 w-5 text-green-400" />
              <h3 className="font-medium text-zinc-100">Enviar WhatsApp</h3>
            </div>
            <p className="text-sm text-zinc-400">Envia mensagem automática via WhatsApp</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Tag className="h-5 w-5 text-orange-400" />
              <h3 className="font-medium text-zinc-100">Adicionar Tag</h3>
            </div>
            <p className="text-sm text-zinc-400">Adiciona tag ao cliente no CRM</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <h3 className="font-medium text-zinc-100">Gerar com IA</h3>
            </div>
            <p className="text-sm text-zinc-400">Gera conteúdo automaticamente com IA</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <h3 className="font-medium text-zinc-100">Atualizar Métricas</h3>
            </div>
            <p className="text-sm text-zinc-400">Atualiza métricas do dashboard</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:shadow-lg hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-pink-400" />
              <h3 className="font-medium text-zinc-100">Registrar Timeline</h3>
            </div>
            <p className="text-sm text-zinc-400">Registra evento na timeline do projeto</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
        <div className="flex items-start gap-3">
          <Brain className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-zinc-100 mb-1">Preparado para Integrações</h3>
            <p className="text-sm text-zinc-400">As automações estão preparadas para futuras integrações com ferramentas de email marketing, CRM, WhatsApp e outros serviços.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function AutomationsPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <AutomationsContent organizationId={organizationId} />
    </Suspense>
  );
}
