import { db, integrations, sales } from "@maquina/database";
import { desc } from "drizzle-orm";
import { Hono } from "hono";

export const integrationRoutes = new Hono();

integrationRoutes.get("/", async (c) => {
  const data = await db
    .select()
    .from(integrations)
    .orderBy(desc(integrations.createdAt))
    .limit(50);
  return c.json({ module: "checkout", resource: "integrations", data });
});

export const salesRoutes = new Hono();

salesRoutes.get("/", async (c) => {
  const data = await db.select().from(sales).orderBy(desc(sales.soldAt)).limit(50);
  return c.json({ module: "checkout", resource: "sales", data });
});

// Webhook endpoint reservado — implementação Cakto em fase posterior
salesRoutes.post("/webhooks/cakto", async (c) => {
  return c.json(
    {
      error: "Webhook Cakto ainda não implementado",
      hint: "Estrutura preparada em integrations + sales",
    },
    501,
  );
});
