"use server";

import { db, trends } from "@maquina/database";
import { trendFormSchema } from "@maquina/shared";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  formToTrendValues,
  getTrendById,
} from "@/lib/trends";
import { requireOrganization } from "@/lib/session";

export async function createTrendAction(formData: FormData) {
  const { organizationId } = await requireOrganization();

  const parsed = trendFormSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    source: formData.get("source"),
    opportunityScore: formData.get("opportunityScore"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const values = formToTrendValues(parsed.data);

  try {
    const [created] = await db
      .insert(trends)
      .values({ ...values, organizationId })
      .returning();

    revalidatePath("/trends");
    revalidatePath("/");
    if (created) redirect(`/trends/${created.id}/edit`);
  } catch {
    return { error: { _form: ["Não foi possível criar a tendência."] } };
  }

  return { error: { _form: ["Não foi possível criar a tendência."] } };
}

export async function updateTrendAction(id: string, formData: FormData) {
  const { organizationId } = await requireOrganization();

  const parsed = trendFormSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    source: formData.get("source"),
    opportunityScore: formData.get("opportunityScore"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const existing = await getTrendById(id, organizationId);
  if (!existing) {
    return { error: { _form: ["Tendência não encontrada."] } };
  }

  const values = formToTrendValues(parsed.data);

  try {
    await db
      .update(trends)
      .set(values)
      .where(and(eq(trends.id, id), eq(trends.organizationId, organizationId)));
  } catch {
    return { error: { _form: ["Não foi possível atualizar a tendência."] } };
  }

  revalidatePath("/trends");
  revalidatePath(`/trends/${id}/edit`);
  revalidatePath("/");

  return { success: true };
}

export async function deleteTrendAction(id: string) {
  const { organizationId } = await requireOrganization();

  await db
    .delete(trends)
    .where(and(eq(trends.id, id), eq(trends.organizationId, organizationId)));

  revalidatePath("/trends");
  revalidatePath("/");
  redirect("/trends");
}
