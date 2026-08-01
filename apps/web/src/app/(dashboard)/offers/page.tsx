import { Suspense } from "react";
import { OfferList } from "@/components/offers/offer-list";
import { listOffersByOrganization } from "@/lib/offers";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

async function OffersContent({ organizationId }: { organizationId: string }) {
  const offers = await listOffersByOrganization(organizationId);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Ofertas"
        description="Gerencie suas ofertas geradas automaticamente."
        actions={
          <Link href="/product-factory">
            <Button>Product Factory</Button>
          </Link>
        }
      />

      <OfferList offers={offers} />
    </div>
  );
}

export default async function OffersPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <OffersContent organizationId={organizationId} />
    </Suspense>
  );
}
