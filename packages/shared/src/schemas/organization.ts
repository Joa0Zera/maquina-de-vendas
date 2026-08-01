import { z } from "zod";
import { MEMBERSHIP_ROLES } from "../constants.js";

export const createOrganizationSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(64)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;

export const membershipRoleSchema = z.enum(MEMBERSHIP_ROLES);
