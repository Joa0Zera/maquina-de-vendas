"use server";

import { db, products } from "@maquina/database";
import { productFormSchema } from "@maquina/shared";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  formToProductValues,
  getProductById,
} from "@/lib/products";
import { requireOrganization } from "@/lib/session";

export async function createProductAction(formData: FormData) {
  const { organizationId } = await requireOrganization();

  const parsed = productFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    thumbnail: formData.get("thumbnail"),
    status: formData.get("status"),
    checkoutUrl: formData.get("checkoutUrl"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const values = formToProductValues(parsed.data);

  try {
    const [created] = await db
      .insert(products)
      .values({ ...values, organizationId })
      .returning();

    revalidatePath("/products");
    revalidatePath("/");
    if (created) redirect(`/products/${created.id}/edit`);
  } catch {
    return { error: { slug: ["Este slug já está em uso."] } };
  }

  return { error: { _form: ["Não foi possível criar o produto."] } };
}

export async function updateProductAction(id: string, formData: FormData) {
  const { organizationId } = await requireOrganization();

  const parsed = productFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    thumbnail: formData.get("thumbnail"),
    status: formData.get("status"),
    checkoutUrl: formData.get("checkoutUrl"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const existing = await getProductById(id, organizationId);
  if (!existing) {
    return { error: { _form: ["Produto não encontrado."] } };
  }

  const values = formToProductValues(parsed.data);

  try {
    await db
      .update(products)
      .set(values)
      .where(and(eq(products.id, id), eq(products.organizationId, organizationId)));
  } catch {
    return { error: { slug: ["Este slug já está em uso."] } };
  }

  revalidatePath("/products");
  revalidatePath(`/products/${id}/edit`);
  revalidatePath(`/p/${values.slug}`);
  revalidatePath("/");

  return { success: true };
}

export async function deleteProductAction(id: string) {
  const { organizationId } = await requireOrganization();

  await db
    .delete(products)
    .where(and(eq(products.id, id), eq(products.organizationId, organizationId)));

  revalidatePath("/products");
  revalidatePath("/");
  redirect("/products");
}
