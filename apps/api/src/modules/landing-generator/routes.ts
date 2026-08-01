import { db, landingPages } from "@maquina/database";
import { desc } from "drizzle-orm";
import { Hono } from "hono";

export const landingGeneratorRoutes = new Hono();

landingGeneratorRoutes.get("/", async (c) => {
  const data = await db
    .select()
    .from(landingPages)
    .orderBy(desc(landingPages.createdAt))
    .limit(50);
  return c.json({ module: "landing_generator", data });
});
