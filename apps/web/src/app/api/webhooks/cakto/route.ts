import { db, products, sales } from "@maquina/database";
import { caktoWebhookSchema } from "@maquina/shared";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.CAKTO_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook não configurado" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = caktoWebhookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload inválido", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  if (payload.secret !== secret) {
    return NextResponse.json({ error: "Secret inválido" }, { status: 401 });
  }

  if (payload.data.status !== "paid") {
    return NextResponse.json({ ignored: true, reason: "status_not_paid" });
  }

  const checkoutUrl = payload.data.checkoutUrl;
  if (!checkoutUrl) {
    return NextResponse.json({ error: "checkoutUrl ausente no payload" }, { status: 400 });
  }

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.checkoutUrl, checkoutUrl))
    .limit(1);

  if (!product) {
    return NextResponse.json(
      { error: "Produto não encontrado para este checkoutUrl" },
      { status: 404 },
    );
  }

  const [existing] = await db
    .select()
    .from(sales)
    .where(eq(sales.externalSaleId, payload.data.id))
    .limit(1);

  if (existing) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const amountCents = Math.round(payload.data.amount * 100);

  await db.insert(sales).values({
    organizationId: product.organizationId,
    productId: product.id,
    externalSaleId: payload.data.id,
    caktoProductId: payload.data.product?.id ?? null,
    amountCents,
    currency: "BRL",
    status: "approved",
    buyerEmail: payload.data.customer?.email ?? null,
    metadata: payload.data,
    soldAt: new Date(payload.data.paidAt),
  });

  return NextResponse.json({ ok: true });
}
