import { z } from "zod";

export const caktoWebhookSchema = z.object({
  secret: z.string(),
  event: z.literal("purchase_approved"),
  data: z.object({
    id: z.string(),
    refId: z.string().optional(),
    status: z.string(),
    amount: z.number(),
    baseAmount: z.number().optional(),
    paymentMethod: z.string().optional(),
    paidAt: z.string(),
    customer: z
      .object({
        email: z.string().email().optional(),
        name: z.string().optional(),
      })
      .optional(),
    product: z
      .object({
        id: z.string(),
        name: z.string().optional(),
        short_id: z.string().optional(),
      })
      .optional(),
    offer: z
      .object({
        id: z.string(),
        name: z.string().optional(),
        price: z.number().optional(),
      })
      .optional(),
    checkoutUrl: z.string().url().optional(),
  }),
});

export type CaktoWebhookPayload = z.infer<typeof caktoWebhookSchema>;
