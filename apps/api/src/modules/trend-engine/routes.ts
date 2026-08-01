import { db, trends } from "@maquina/database";
import { desc } from "drizzle-orm";
import { Hono } from "hono";

export const trendEngineRoutes = new Hono();

trendEngineRoutes.get("/", async (c) => {
  const data = await db.select().from(trends).orderBy(desc(trends.discoveredAt)).limit(50);
  return c.json({ module: "trend_engine", data });
});
