import { z } from 'zod';

export const createRecipeBodySchema = z.object({
  name: z.string().trim().max(45).optional(),
  preparation_time_minutes: z.number().int().positive().optional(),
  servings: z.number().int().positive().optional(),
  preparation_method: z.array(z.string().trim().min(1)).min(1),
  ingredients: z.array(z.string().trim().min(1)).min(1),
  id_category: z.number().int().positive().optional()
});

export type CreateRecipeBody = z.infer<typeof createRecipeBodySchema>;
