import { db, products } from "@maquina/database";
import { productFormSchema } from "@maquina/shared";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "../../lib/z-validator.js";

export const productFactoryRoutes = new Hono();

productFactoryRoutes.get("/", async (c) => {
  const data = await db.select().from(products).orderBy(desc(products.createdAt)).limit(50);
  return c.json({ module: "product_factory", data });
});

productFactoryRoutes.post("/", zValidator("json", productFormSchema), async (c) => {
  const body = c.req.valid("json");
  const organizationId = c.req.header("x-organization-id");
  if (!organizationId) {
    return c.json({ error: "x-organization-id obrigatório" }, 400);
  }

  const [created] = await db
    .insert(products)
    .values({
      organizationId,
      title: body.title,
      slug: body.slug,
      description: body.description || null,
      priceCents: Math.round(body.price * 100),
      thumbnail: body.thumbnail || null,
      status: body.status,
      checkoutUrl: body.checkoutUrl || null,
    })
    .returning();

  return c.json({ data: created }, 201);
});

productFactoryRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);
  if (!row) return c.json({ error: "Produto não encontrado" }, 404);
  return c.json({ data: row });
});

export const offerRoutes = new Hono();

offerRoutes.get("/", async (c) => {
  return c.json({
    module: "product_factory",
    resource: "offers",
    data: [],
    message: "Offers CRUD em fase posterior",
  });
});
