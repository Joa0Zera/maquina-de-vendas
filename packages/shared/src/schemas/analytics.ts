import { z } from "zod";

export const analyticsOverviewSchema = z.object({
  module: z.string(),
  data: z.object({
    products: z.number(),
    campaigns: z.number(),
    revenueCents: z.number(),
    conversionRate: z.number().nullable(),
  }),
});

export type AnalyticsOverview = z.infer<typeof analyticsOverviewSchema>["data"];
