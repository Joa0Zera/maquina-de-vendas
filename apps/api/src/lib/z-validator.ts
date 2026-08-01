import type { ValidationTargets } from "hono";
import { validator } from "hono/validator";
import type { ZodSchema } from "zod";

export function zValidator<T extends ZodSchema, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T,
) {
  return validator(target, (value, c) => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      return c.json(
        {
          error: "Dados inválidos",
          details: parsed.error.flatten(),
        },
        400,
      );
    }
    return parsed.data;
  });
}
