import { db, products, copyAssets } from "@maquina/database";
import { and, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireOrganization } from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function ProductCopyPage({ params }: PageProps) {
  const { organizationId } = await requireOrganization();
  const { id } = await params;

  // Fetch product
  const [product] = await db
    .select({
      id: products.id,
      title: products.title,
    })
    .from(products)
    .where(and(eq(products.id, id), eq(products.organizationId, organizationId)))
    .limit(1);

  if (!product) {
    notFound();
  }

  // Fetch copy assets
  const [copy] = await db
    .select()
    .from(copyAssets)
    .where(
      and(
        eq(copyAssets.productId, id),
        eq(copyAssets.organizationId, organizationId)
      )
    )
    .limit(1);

  if (!copy) {
    return (
      <div className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Copy Assets</h1>
            <p className="text-sm text-zinc-400 mt-1">
              {product.title}
            </p>
          </div>
          <Link href={`/products/${id}`}>
            <Button variant="secondary">Voltar</Button>
          </Link>
        </div>

        <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950 text-center">
          <p className="text-zinc-400 mb-4">Nenhum copy asset encontrado.</p>
          <Link href={`/products/${id}`}>
            <Button variant="default">Gerar Copy</Button>
          </Link>
        </div>
      </div>
    );
  }

  const headlines = copy.headlines as Array<{ headline: string; type: string }>;
  const adCopies = copy.adCopies as Array<{ headline: string; primaryText: string; cta: string }>;
  const ugcScripts = copy.ugcScripts as Array<{ hook: string; problem: string; solution: string; cta: string }>;
  const ctas = copy.ctas as string[];
  const emailSequence = copy.emailSequence as Array<{ subject: string; body: string }>;

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Copy Assets</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {product.title}
          </p>
        </div>
        <Link href={`/products/${id}`}>
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      {/* Headlines */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">Headlines ({headlines.length})</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {headlines.map((item, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 space-y-2">
              <p className="text-sm font-medium text-zinc-200">{item.headline}</p>
              <Badge className="text-xs border-zinc-700 bg-zinc-800">
                {item.type}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Copies */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">Ad Copies ({adCopies.length})</h2>
        <div className="grid gap-4">
          {adCopies.map((ad, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 space-y-3">
              <p className="text-sm font-semibold text-zinc-200">{ad.headline}</p>
              <p className="text-sm text-zinc-400">{ad.primaryText}</p>
              <Badge className="text-xs border-zinc-700 bg-zinc-800">
                CTA: {ad.cta}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* UGC Scripts */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">UGC Scripts ({ugcScripts.length})</h2>
        <div className="grid gap-4">
          {ugcScripts.map((script, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 space-y-3">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Hook</p>
                <p className="text-sm text-zinc-200">{script.hook}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Problem</p>
                <p className="text-sm text-zinc-200">{script.problem}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Solution</p>
                <p className="text-sm text-zinc-200">{script.solution}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">CTA</p>
                <p className="text-sm text-zinc-200">{script.cta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">CTAs ({ctas.length})</h2>
        <div className="flex flex-wrap gap-2">
          {ctas.map((cta, index) => (
            <Badge key={index} className="bg-zinc-900 border-zinc-800">
              {cta}
            </Badge>
          ))}
        </div>
      </div>

      {/* Email Sequence */}
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
        <h2 className="text-lg font-semibold">Email Sequence ({emailSequence.length})</h2>
        <div className="grid gap-4">
          {emailSequence.map((email, index) => (
            <div key={index} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 space-y-3">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Subject</p>
                <p className="text-sm font-medium text-zinc-200">{email.subject}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Body</p>
                <p className="text-sm text-zinc-400 whitespace-pre-wrap">{email.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
