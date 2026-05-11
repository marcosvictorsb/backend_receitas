import { z } from 'zod';

export const createRecipeBodySchema = z.object({
  name: z.string().trim().max(45).optional(),
  preparation_time_minutes: z.number().int().positive().optional(),
  servings: z.number().int().positive().optional(),
  preparation_method: z.string().trim().min(1),
  ingredients: z.string().trim().optional(),
  id_category: z.number().int().positive().optional(),
  id_user: z.number().int().positive()
});

export type CreateRecipeBody = z.infer<typeof createRecipeBodySchema>;
