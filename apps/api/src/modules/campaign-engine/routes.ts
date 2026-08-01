import { db, campaigns } from "@maquina/database";
import { desc } from "drizzle-orm";
import { Hono } from "hono";

export const campaignEngineRoutes = new Hono();

campaignEngineRoutes.get("/", async (c) => {
  const data = await db.select().from(campaigns).orderBy(desc(campaigns.createdAt)).limit(50);
  return c.json({ module: "campaign_engine", data });
});
