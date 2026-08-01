import { db, products } from "@maquina/database";
import { productFormSchema } from "@maquina/shared";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { formToProductValues, getProductById } from "@/lib/products";
import { getAuthContext } from "@/lib/session";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const ctx = await getAuthContext();
  if (!ctx) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const product = await getProductById(id, ctx.organizationId);
  if (!product) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ data: product });
}

export async function PATCH(request: Request, { params }: Params) {
  const ctx = await getAuthContext();
  if (!ctx) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body: unknown = await request.json();
  const parsed = productFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const existing = await getProductById(id, ctx.organizationId);
  if (!existing) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }

  const values = formToProductValues(parsed.data);
  const [updated] = await db
    .update(products)
    .set(values)
    .where(and(eq(products.id, id), eq(products.organizationId, ctx.organizationId)))
    .returning();

  return NextResponse.json({ data: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  const ctx = await getAuthContext();
  if (!ctx) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  await db
    .delete(products)
    .where(and(eq(products.id, id), eq(products.organizationId, ctx.organizationId)));

  return NextResponse.json({ success: true });
}
