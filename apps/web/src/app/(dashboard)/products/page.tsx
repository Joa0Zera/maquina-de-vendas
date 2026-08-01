import { Suspense } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listProductsByOrganization } from "@/lib/products";
import { requireOrganization } from "@/lib/session";
import { formatCurrencyFromCents } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { Package, ArrowRight, Edit, DollarSign, ShoppingBag, Activity, Clock, User, FileText, Tag, CheckSquare, Folder, MessageSquare } from "lucide-react";

async function ProductsContent({ organizationId }: { organizationId: string }) {
  const items = await listProductsByOrganization(organizationId);

  // Group products by status for Kanban columns
  const columns = [
    { id: "draft", label: "Ideia", color: "border-zinc-700" },
    { id: "building", label: "Pesquisa", color: "border-blue-700" },
    { id: "validating", label: "Produto", color: "border-yellow-700" },
    { id: "published", label: "Oferta", color: "border-green-700" },
    { id: "scaling", label: "Landing", color: "border-purple-700" },
    { id: "published", label: "Checkout", color: "border-cyan-700" },
    { id: "building", label: "Copy", color: "border-orange-700" },
    { id: "validating", label: "Validação", color: "border-pink-700" },
    { id: "published", label: "Tráfego", color: "border-emerald-700" },
    { id: "scaling", label: "Escala", color: "border-indigo-700" },
  ];

  const getProductsByStatus = (status: string) => {
    return items.filter(p => p.status === status);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="CRM de Lançamentos"
        description="Visão Kanban completa de todos os lançamentos."
        actions={
          <Link href="/products/new">
            <Button>Novo Lançamento</Button>
          </Link>
        }
      />

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {columns.map((column) => {
          const columnItems = getProductsByStatus(column.id);
          return (
            <div key={column.id} className="flex-shrink-0 w-72 sm:w-80">
              <div className={`p-4 rounded-xl border ${column.color} bg-zinc-950/50`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-zinc-100">{column.label}</h3>
                  <Badge variant="default" className="text-xs">
                    {columnItems.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {columnItems.length === 0 ? (
                    <div className="p-8 rounded-lg border border-dashed border-zinc-800 text-center">
                      <Package className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                      <p className="text-sm text-zinc-500 mb-4">Nenhum lançamento nesta coluna</p>
                      <Link href="/products/new">
                        <Button size="sm">Criar Lançamento</Button>
                      </Link>
                    </div>
                  ) : (
                    columnItems.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 rounded-lg border border-zinc-800 bg-zinc-900 hover:shadow-lg hover:border-zinc-700 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                            <Package className="h-6 w-6 text-zinc-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-zinc-100 truncate">{product.title}</h4>
                            <p className="text-sm text-zinc-400">{formatCurrencyFromCents(product.priceCents)}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500 mb-3">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            <span>R$ 0,00</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ShoppingBag className="h-3 w-3" />
                            <span>0 vendas</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            <span>0%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckSquare className="h-3 w-3" />
                            <span>--/100</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/products/${product.id}`} className="flex-1">
                            <Button variant="ghost" size="sm" className="w-full">
                              Abrir
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/products/${product.id}/edit`}>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <ProductsContent organizationId={organizationId} />
    </Suspense>
  );
}
