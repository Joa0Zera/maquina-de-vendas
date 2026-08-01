import { db, organizations } from "@maquina/database";
import { createOrganizationSchema } from "@maquina/shared";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "../lib/z-validator.js";

export const organizationRoutes = new Hono();

organizationRoutes.get("/", async (c) => {
  const rows = await db.select().from(organizations).limit(50);
  return c.json({ data: rows });
});

organizationRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const [row] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.slug, slug))
    .limit(1);

  if (!row) {
    return c.json({ error: "Organização não encontrada" }, 404);
  }

  return c.json({ data: row });
});

organizationRoutes.post("/", zValidator("json", createOrganizationSchema), async (c) => {
  const body = c.req.valid("json");

  const [created] = await db
    .insert(organizations)
    .values({
      name: body.name,
      slug: body.slug,
    })
    .returning();

  return c.json({ data: created }, 201);
});
