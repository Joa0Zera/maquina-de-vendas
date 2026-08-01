import { Suspense } from "react";
import { ImportTrendsButton } from "@/components/trends/import-trends-button";
import { TrendList } from "@/components/trends/trend-list";
import { listTrendsByOrganization } from "@/lib/trends";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

async function TrendsContent({ organizationId }: { organizationId: string }) {
  const trends = await listTrendsByOrganization(organizationId);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PageHeader
        title="Inteligência"
        description="Descubra e monitore tendências do Reddit e TikTok."
        actions={
          <div className="flex items-center gap-3">
            <ImportTrendsButton />
            <Link href="/trends/new">
              <Button>Nova tendência</Button>
            </Link>
          </div>
        }
      />

      <TrendList trends={trends} />
    </div>
  );
}

export default async function TrendsPage() {
  const { organizationId } = await requireOrganization();

  return (
    <Suspense fallback={<div className="text-zinc-400">Carregando...</div>}>
      <TrendsContent organizationId={organizationId} />
    </Suspense>
  );
}
