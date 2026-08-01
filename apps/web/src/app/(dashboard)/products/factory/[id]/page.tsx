import { db, launchEvents, products } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { requireOrganization } from "@/lib/session";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

type PageProps = { params: Promise<{ id: string }> };

async function FactoryLogsContent({ productId, organizationId }: { productId: string; organizationId: string }) {
  const [product] = await db
    .select()
    .from(products)
    .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)))
    .limit(1);

  if (!product) {
    notFound();
  }

  const events = await db
    .select()
    .from(launchEvents)
    .where(and(eq(launchEvents.productId, productId), eq(launchEvents.organizationId, organizationId)))
    .orderBy(launchEvents.createdAt);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEventLabel = (eventType: string) => {
    const labels: Record<string, string> = {
      PROJECT_CREATED: "Projeto criado",
      PRODUCT_CREATED: "Produto criado",
      OFFER_CREATED: "Oferta criada",
      EBOOK_CREATED: "Ebook gerado",
      LANDING_CREATED: "Landing criada",
      COPY_CREATED: "Copy gerada",
      ORGANIC_CREATED: "Distribuição criada",
      INTELLIGENCE_CREATED: "Inteligência gerada",
    };
    return labels[eventType] || eventType;
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Logs do Projeto</h1>
        <p className="text-sm text-zinc-400 mt-1">{product.title}</p>
      </div>
      
      <Card className="border-zinc-800 bg-zinc-950 shadow-sm">
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-sm text-zinc-400">Nenhum evento registrado.</p>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-zinc-500" />
                  <span className="text-sm text-zinc-400">{formatTime(event.createdAt)}</span>
                  <span className="text-sm font-medium">{getEventLabel(event.eventType)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default async function FactoryLogsPage({ params }: PageProps) {
  const { id } = await params;
  const { organizationId } = await requireOrganization();

  return <FactoryLogsContent productId={id} organizationId={organizationId} />;
}
