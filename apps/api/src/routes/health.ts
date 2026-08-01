import { healthResponseSchema } from "@maquina/shared";
import { Hono } from "hono";

const VERSION = "0.1.0";

export const healthRoutes = new Hono();

healthRoutes.get("/", (c) => {
  const payload = healthResponseSchema.parse({
    status: "ok",
    service: "maquina-infoproduct-api",
    version: VERSION,
    timestamp: new Date().toISOString(),
  });
  return c.json(payload);
});
