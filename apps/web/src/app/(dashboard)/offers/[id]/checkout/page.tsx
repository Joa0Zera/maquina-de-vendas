import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOfferById } from "@/actions/checkout";
import { registerCheckoutAction } from "@/actions/checkout";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

const caktoStatusLabels: Record<string, string> = {
  inactive: "Inativo",
  active: "Ativo",
};

const caktoStatusColors: Record<string, string> = {
  inactive: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  active: "border-green-500/30 bg-green-500/10 text-green-400",
};

export default async function OfferCheckoutPage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id } = await params;
  const offer = await getOfferById(id, organizationId);

  if (!offer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Checkout Cakto</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {offer.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {offer.caktoStatus && (
            <Badge variant="default" className={caktoStatusColors[offer.caktoStatus]}>
              {caktoStatusLabels[offer.caktoStatus]}
            </Badge>
          )}
          <Link
            href={`/offers/${id}`}
            className="inline-flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 space-y-6">
        {offer.caktoCheckoutUrl ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Checkout Atual</h2>
              <p className="text-sm text-zinc-400 mb-4">
                Esta oferta já possui um checkout Cakto registrado.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <p className="text-sm text-zinc-300 mb-2">Product ID:</p>
                  <p className="text-sm text-zinc-400">{offer.caktoProductId}</p>
                </div>
                <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <p className="text-sm text-zinc-300 mb-2">URL do Checkout:</p>
                  <a
                    href={offer.caktoCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-400 hover:underline"
                  >
                    {offer.caktoCheckoutUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Registrar Novo Checkout</h2>
            <form action={registerCheckoutAction.bind(null, id)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caktoProductId">Cakto Product ID</Label>
                <Input
                  id="caktoProductId"
                  name="caktoProductId"
                  type="text"
                  placeholder="PROD-XXXXX"
                  required
                  className="bg-zinc-900 border-zinc-800"
                />
                <p className="text-xs text-zinc-400">
                  Cole o ID do produto do Cakto aqui.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="caktoCheckoutUrl">URL do Checkout</Label>
                <Input
                  id="caktoCheckoutUrl"
                  name="caktoCheckoutUrl"
                  type="url"
                  placeholder="https://checkout.cakto.com/..."
                  required
                  className="bg-zinc-900 border-zinc-800"
                />
                <p className="text-xs text-zinc-400">
                  Cole a URL do checkout do Cakto aqui.
                </p>
              </div>
              <Button type="submit" className="w-full">
                Registrar Checkout
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
