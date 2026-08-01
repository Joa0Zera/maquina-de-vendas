import { z } from "zod";

export const PRODUCT_STATUSES = ["draft", "published", "archived"] as const;

export const productFormSchema = z.object({
  title: z.string().min(2, "Título obrigatório").max(160),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens"),
  description: z.string().max(8000).optional().or(z.literal("")),
  price: z.coerce.number().min(0, "Preço inválido"),
  thumbnail: z
    .string()
    .optional()
    .refine((v) => !v || z.string().url().safeParse(v).success, "URL inválida"),
  status: z.enum(PRODUCT_STATUSES).default("draft"),
  checkoutUrl: z
    .string()
    .optional()
    .refine((v) => !v || z.string().url().safeParse(v).success, "URL de checkout inválida"),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;

export const createProductSchema = productFormSchema;

export type CreateProductInput = ProductFormInput;

export const updateProductSchema = productFormSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
