import { Button } from "@/components/ui/button";
import { db, products } from "@maquina/database";
import { eq } from "drizzle-orm";
import { listCaktoProducts } from "@/lib/cakto";
import { requireOrganization } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function syncCaktoProduct(formData: FormData) {
  "use server";

  const { organizationId } = await requireOrganization();

  const productId = formData.get("productId") as string;
  const caktoProductId = formData.get("caktoProductId") as string;

  if (!productId || !caktoProductId) {
    throw new Error("Product ID and Cakto Product ID are required");
  }

  await db
    .update(products)
    .set({
      caktoProductId,
      caktoSyncedAt: new Date(),
    })
    .where(eq(products.id, productId));

  revalidatePath("/integrations/cakto/products");
  redirect("/integrations/cakto/products");
}

export default async function CaktoProductsPage() {
  const { organizationId } = await requireOrganization();

  let caktoProducts: Array<{ id: string; name: string; price: number; status: string }> = [];
  let error: string | null = null;

  try {
    caktoProducts = await listCaktoProducts(organizationId);
  } catch (e) {
    error = "Falha ao carregar produtos da Cakto. Verifique as credenciais.";
  }

  const internalProducts = await db
    .select({
      id: products.id,
      title: products.title,
      caktoProductId: products.caktoProductId,
    })
    .from(products)
    .where(eq(products.organizationId, organizationId));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sincronizar Produtos Cakto</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Vincule seus produtos internos aos produtos da Cakto.
        </p>
      </div>

      {error && (
        <div className="border border-red-500/30 bg-red-500/10 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cakto Products */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold">Produtos Cakto</h2>
          {caktoProducts.length === 0 ? (
            <p className="text-sm text-zinc-400">Nenhum produto encontrado.</p>
          ) : (
            <div className="space-y-3">
              {caktoProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-zinc-900 rounded-lg border border-zinc-800"
                >
                  <p className="font-medium text-zinc-200">{product.name}</p>
                  <p className="text-sm text-zinc-400">
                    ID: {product.id} | R$ {product.price / 100}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Internal Products */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 space-y-4">
          <h2 className="text-lg font-semibold">Produtos Internos</h2>
          {internalProducts.length === 0 ? (
            <p className="text-sm text-zinc-400">Nenhum produto encontrado.</p>
          ) : (
            <div className="space-y-3">
              {internalProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-zinc-900 rounded-lg border border-zinc-800"
                >
                  <p className="font-medium text-zinc-200">{product.title}</p>
                  {product.caktoProductId ? (
                    <p className="text-sm text-green-400">
                      Sincronizado: {product.caktoProductId}
                    </p>
                  ) : (
                    <form action={syncCaktoProduct} className="mt-2">
                      <input type="hidden" name="productId" value={product.id} />
                      <select
                        name="caktoProductId"
                        required
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-sm text-zinc-200 mb-2"
                      >
                        <option value="">Selecione um produto Cakto</option>
                        {caktoProducts.map((cp) => (
                          <option key={cp.id} value={cp.id}>
                            {cp.name}
                          </option>
                        ))}
                      </select>
                      <Button type="submit" size="sm" variant="secondary" className="w-full">
                        Sincronizar
                      </Button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
