import { db, launchEvents, products } from "@maquina/database";
import { and, eq, desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ productId: string }> };

export default async function LaunchTimelinePage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { productId } = await params;

  // Fetch product
  const [product] = await db
    .select({
      id: products.id,
      title: products.title,
    })
    .from(products)
    .where(and(eq(products.id, productId), eq(products.organizationId, organizationId)))
    .limit(1);

  if (!product) {
    notFound();
  }

  // Fetch launch events
  const events = await db
    .select()
    .from(launchEvents)
    .where(
      and(
        eq(launchEvents.productId, productId),
        eq(launchEvents.organizationId, organizationId)
      )
    )
    .orderBy(desc(launchEvents.createdAt));

  const eventTypeLabels: Record<string, string> = {
    PRODUCT_CREATED: "Produto Criado",
    TRAFFIC_CREATED: "Pesquisa de Tráfego Criada",
    COPY_CREATED: "Copy Criada",
    CAMPAIGN_CREATED: "Campanha Criada",
    OFFER_CREATED: "Oferta Criada",
    EBOOK_CREATED: "Ebook Criado",
    LANDING_CREATED: "Landing Page Criada",
    V0_CREATED: "V0 Criado",
    DEPLOY_CREATED: "Deploy Registrado",
    CHECKOUT_CREATED: "Checkout Criado",
    SALE_RECEIVED: "Venda Recebida",
  };

  const eventTypeColors: Record<string, string> = {
    PRODUCT_CREATED: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    TRAFFIC_CREATED: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    COPY_CREATED: "border-pink-500/30 bg-pink-500/10 text-pink-400",
    CAMPAIGN_CREATED: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    OFFER_CREATED: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    EBOOK_CREATED: "border-green-500/30 bg-green-500/10 text-green-400",
    LANDING_CREATED: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    V0_CREATED: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    DEPLOY_CREATED: "border-teal-500/30 bg-teal-500/10 text-teal-400",
    CHECKOUT_CREATED: "border-red-500/30 bg-red-500/10 text-red-400",
    SALE_RECEIVED: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Timeline do Lançamento</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {product.title}
          </p>
        </div>
        <Link href="/launches">
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 text-center">
          <p className="text-zinc-400">Nenhum evento de lançamento encontrado.</p>
        </div>
      ) : (
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-start gap-4 pb-4 border-b border-zinc-800 last:border-0 last:pb-0">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" className={eventTypeColors[event.eventType]}>
                    {eventTypeLabels[event.eventType] || event.eventType}
                  </Badge>
                  <span className="text-xs text-zinc-500">
                    {new Date(event.createdAt).toLocaleString("pt-BR")}
                  </span>
                </div>
                {event.description && (
                  <p className="text-sm text-zinc-300">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
