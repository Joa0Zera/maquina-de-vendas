import { Suspense } from "react";
import { requireOrganization } from "@/lib/session";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { FileText, Lightbulb, Search, Folder, Clock, ArrowRight, CheckCircle, Circle } from "lucide-react";

async function MemoryContent({ organizationId }: { organizationId: string }) {
  const projectMemories = [
    {
      id: "1",
      projeto: "Produto X",
      resumo: "Infoproduto sobre marketing digital com foco em iniciantes",
      decisoes: [
        { id: "1", texto: "Preço definido em R$ 497", data: "10/06" },
        { id: "2", texto: "Nicho: Marketing Digital", data: "11/06" },
        { id: "3", texto: "Avatar: Iniciantes em marketing", data: "12/06" },
      ],
      pesquisas: [
        { id: "1", texto: "Validação de nicho", status: "concluida" },
        { id: "2", texto: "Análise de concorrência", status: "concluida" },
      ],
      insights: [
        { id: "1", texto: "Público busca resultados rápidos" },
        { id: "2", texto: "Preço competitivo no mercado" },
      ],
      arquivos: [
        { id: "1", nome: "Pesquisa de mercado.pdf", tipo: "pdf" },
        { id: "2", nome: "Copy final.docx", tipo: "doc" },
      ],
      resultados: [
        { id: "1", texto: "127 vendas no primeiro mês" },
        { id: "2", texto: "Conversão de 4.2%" },
      ],
      timeline: [
        { data: "10/06", evento: "Início do projeto" },
        { data: "12/06", evento: "Pesquisa concluída" },
        { data: "15/06", evento: "Landing criada" },
        { data: "18/06", evento: "Primeira venda" },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Memória do Negócio"
        description="Centralize todas as informações de cada projeto."
      />

      {/* Project Memories */}
      <div className="space-y-6">
        {projectMemories.map((memory) => (
          <div key={memory.id} className="p-6 rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-zinc-100">{memory.projeto}</h3>
              <Button size="sm" variant="secondary" className="gap-2">
                Ver Projeto
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Resumo */}
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <h4 className="font-semibold text-zinc-100">Resumo</h4>
                </div>
                <p className="text-sm text-zinc-400">{memory.resumo}</p>
              </div>

              {/* Decisões */}
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <h4 className="font-semibold text-zinc-100">Decisões Tomadas</h4>
                </div>
                <div className="space-y-2">
                  {memory.decisoes.map((decisao) => (
                    <div key={decisao.id} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-300">{decisao.texto}</span>
                      <span className="text-xs text-zinc-500">{decisao.data}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pesquisas */}
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-5 w-5 text-purple-400" />
                  <h4 className="font-semibold text-zinc-100">Pesquisas</h4>
                </div>
                <div className="space-y-2">
                  {memory.pesquisas.map((pesquisa) => (
                    <div key={pesquisa.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-4 h-4 rounded ${pesquisa.status === "concluida" ? "bg-green-500" : "bg-zinc-700"}`} />
                      <span className="text-zinc-300">{pesquisa.texto}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <h4 className="font-semibold text-zinc-100">Insights</h4>
                </div>
                <div className="space-y-2">
                  {memory.insights.map((insight) => (
                    <div key={insight.id} className="text-sm text-zinc-300">
                      • {insight.texto}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arquivos */}
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2 mb-3">
                  <Folder className="h-5 w-5 text-cyan-400" />
                  <h4 className="font-semibold text-zinc-100">Arquivos</h4>
                </div>
                <div className="space-y-2">
                  {memory.arquivos.map((arquivo) => (
                    <div key={arquivo.id} className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-zinc-400" />
                      </div>
                      <span className="text-zinc-300">{arquivo.nome}</span>
                      <span className="text-xs text-zinc-500 uppercase">{arquivo.tipo}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resultados */}
              <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <h4 className="font-semibold text-zinc-100">Resultados</h4>
                </div>
                <div className="space-y-2">
                  {memory.resultados.map((resultado) => (
                    <div key={resultado.id} className="text-sm text-zinc-300">
                      • {resultado.texto}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-6 p-4 rounded-lg border border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-orange-400" />
                <h4 className="font-semibold text-zinc-100">Linha do Tempo</h4>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {memory.timeline.map((event, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
                  >
                    <p className="text-xs text-zinc-400">{event.data}</p>
                    <p className="text-xs text-zinc-100">{event.evento}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function MemoryPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <MemoryContent organizationId={organizationId} />
    </Suspense>
  );
}
