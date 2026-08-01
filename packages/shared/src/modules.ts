import type { PlatformModule } from "./constants.js";

export type ModuleDefinition = {
  id: PlatformModule;
  name: string;
  description: string;
  apiPrefix: string;
  dashboardPath: string;
  plannedCapabilities: string[];
};

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  {
    id: "trend_engine",
    name: "Trend Engine",
    description: "Descoberta de tendências no Reddit e TikTok, análise de oportunidade e pesquisa viral.",
    apiPrefix: "/trends",
    dashboardPath: "/trends",
    plannedCapabilities: ["reddit_discovery", "tiktok_discovery", "opportunity_scoring"],
  },
  {
    id: "product_factory",
    name: "Product Factory",
    description: "Geração de ebook, oferta, copy, posicionamento, estrutura e sugestões de preço.",
    apiPrefix: "/products",
    dashboardPath: "/products",
    plannedCapabilities: ["ebook_generation", "offer_generation", "positioning", "pricing"],
  },
  {
    id: "landing_generator",
    name: "Landing Generator",
    description: "Landing pages de alta conversão com seções IA, CTA, VSL e depoimentos.",
    apiPrefix: "/landing-pages",
    dashboardPath: "/landing-pages",
    plannedCapabilities: ["section_generation", "deploy_structure", "vsl_blocks"],
  },
  {
    id: "campaign_engine",
    name: "Campaign Engine",
    description: "Ângulos, criativos, hooks, ideias de campanha e variações para teste.",
    apiPrefix: "/campaigns",
    dashboardPath: "/campaigns",
    plannedCapabilities: ["ad_angles", "hooks", "creative_variations"],
  },
  {
    id: "checkout",
    name: "Checkout",
    description: "Integração Cakto, publicação de produto, checkout e webhooks de venda.",
    apiPrefix: "/integrations",
    dashboardPath: "/checkout",
    plannedCapabilities: ["cakto_integration", "checkout_creation", "sales_webhooks"],
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Receita, conversão, performance de produtos e tracking de campanhas.",
    apiPrefix: "/analytics",
    dashboardPath: "/analytics",
    plannedCapabilities: ["revenue_metrics", "conversion_metrics", "campaign_tracking"],
  },
];

export function getModuleById(id: PlatformModule): ModuleDefinition | undefined {
  return MODULE_DEFINITIONS.find((m) => m.id === id);
}
