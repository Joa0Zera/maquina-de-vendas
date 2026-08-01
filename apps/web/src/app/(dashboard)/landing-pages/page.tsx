import { Suspense } from "react";
import { OfferLandingList } from "@/components/landing-pages/offer-landing-list";
import { listOffersByOrganization } from "@/lib/offers";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

async function LandingPagesContent({ organizationId }: { organizationId: string }) {
  const offers = await listOffersByOrganization(organizationId);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Landing Pages"
        description="Gere landing pages automáticas a partir de suas ofertas."
        actions={
          <Link href="/offers">
            <Button>Ver Ofertas</Button>
          </Link>
        }
      />

      <OfferLandingList offers={offers} />
    </div>
  );
}

export default async function LandingPagesPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <LandingPagesContent organizationId={organizationId} />
    </Suspense>
  );
}
