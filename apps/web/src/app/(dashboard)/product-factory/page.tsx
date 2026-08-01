import { TrendProductList } from "@/components/product-factory/trend-product-list";
import { listTrendsByOrganization } from "@/lib/trends";
import { requireOrganization } from "@/lib/session";

export default async function ProductFactoryPage() {
  const { organizationId } = await requireOrganization();
  const trends = await listTrendsByOrganization(organizationId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Product Factory</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Transforme tendências em produtos vendáveis.
        </p>
      </div>

      <TrendProductList trends={trends} />
    </div>
  );
}
