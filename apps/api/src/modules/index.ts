import { MODULE_DEFINITIONS } from "@maquina/shared";
import { Hono } from "hono";
import { generatedAssetsRoutes } from "./assets/routes.js";
import { analyticsRoutes } from "./analytics/routes.js";
import { campaignEngineRoutes } from "./campaign-engine/routes.js";
import { integrationRoutes, salesRoutes } from "./checkout/routes.js";
import { landingGeneratorRoutes } from "./landing-generator/routes.js";
import { offerRoutes, productFactoryRoutes } from "./product-factory/routes.js";
import { trendEngineRoutes } from "./trend-engine/routes.js";

export const modulesMetaRoutes = new Hono();

modulesMetaRoutes.get("/", (c) => {
  return c.json({
    platform: "infoproduct_os",
    modules: MODULE_DEFINITIONS,
  });
});

export function registerModuleRoutes(app: Hono) {
  app.route("/modules", modulesMetaRoutes);
  app.route("/trends", trendEngineRoutes);
  app.route("/products", productFactoryRoutes);
  app.route("/offers", offerRoutes);
  app.route("/landing-pages", landingGeneratorRoutes);
  app.route("/campaigns", campaignEngineRoutes);
  app.route("/integrations", integrationRoutes);
  app.route("/sales", salesRoutes);
  app.route("/assets", generatedAssetsRoutes);
  app.route("/analytics", analyticsRoutes);
}
