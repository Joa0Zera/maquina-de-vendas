import { z } from "zod";

export const trendFormSchema = z.object({
  title: z.string().min(2, "Título obrigatório").max(280),
  summary: z.string().max(8000).optional().or(z.literal("")),
  source: z.enum(["reddit", "tiktok", "manual"]),
  opportunityScore: z.coerce
    .number()
    .int("Score deve ser um número inteiro")
    .min(0, "Score deve ser positivo")
    .max(100, "Score máximo é 100")
    .optional(),
});

export type TrendFormInput = z.infer<typeof trendFormSchema>;

export const createTrendSchema = trendFormSchema;

export type CreateTrendInput = TrendFormInput;

export const updateTrendSchema = trendFormSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateTrendInput = z.infer<typeof updateTrendSchema>;
