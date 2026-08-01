import { db, generatedAssets } from "@maquina/database";
import { desc } from "drizzle-orm";
import { Hono } from "hono";

export const generatedAssetsRoutes = new Hono();

generatedAssetsRoutes.get("/", async (c) => {
  const data = await db
    .select()
    .from(generatedAssets)
    .orderBy(desc(generatedAssets.createdAt))
    .limit(50);
  return c.json({ data });
});
