import { db, products } from "@maquina/database";
import { productFormSchema } from "@maquina/shared";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { formToProductValues } from "@/lib/products";
import { getAuthContext } from "@/lib/session";

export async function GET() {
  const ctx = await getAuthContext();
  if (!ctx) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const data = await db
    .select()
    .from(products)
    .where(eq(products.organizationId, ctx.organizationId))
    .orderBy(desc(products.createdAt));

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const ctx = await getAuthContext();
  if (!ctx) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const parsed = productFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const values = formToProductValues(parsed.data);
    const [created] = await db
      .insert(products)
      .values({ ...values, organizationId: ctx.organizationId })
      .returning();

    return NextResponse.json({ data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug já em uso" }, { status: 409 });
  }
}
