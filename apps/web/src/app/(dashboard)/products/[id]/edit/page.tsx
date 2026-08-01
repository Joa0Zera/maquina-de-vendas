import { notFound } from "next/navigation";
import { ProductForm } from "@/components/products/product-form";
import { getProductById, productToFormValues } from "@/lib/products";
import { requireOrganization } from "@/lib/session";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const { organizationId } = await requireOrganization();
  const product = await getProductById(id, organizationId);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Editar produto</h1>
        <p className="text-sm text-zinc-400 mt-1">{product.title}</p>
      </div>
      <ProductForm
        mode="edit"
        productId={product.id}
        defaultValues={productToFormValues(product)}
      />
    </div>
  );
}
