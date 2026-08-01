export const APP_NAME = "Máquina de Vendas";
export const APP_TAGLINE = "Sistema operacional de infoprodutos com IA";

export const MEMBERSHIP_ROLES = ["owner", "admin", "member"] as const;
export type MembershipRole = (typeof MEMBERSHIP_ROLES)[number];

export const PLATFORM_MODULES = [
  "trend_engine",
  "product_factory",
  "landing_generator",
  "campaign_engine",
  "checkout",
  "analytics",
] as const;
export type PlatformModule = (typeof PLATFORM_MODULES)[number];

export const TREND_SOURCES = ["reddit", "tiktok", "manual"] as const;
export type TrendSource = (typeof TREND_SOURCES)[number];

export const PRODUCT_TYPES = ["ebook", "course", "bundle", "template", "other"] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

export const INTEGRATION_PROVIDERS = ["cakto"] as const;
export type IntegrationProvider = (typeof INTEGRATION_PROVIDERS)[number];
