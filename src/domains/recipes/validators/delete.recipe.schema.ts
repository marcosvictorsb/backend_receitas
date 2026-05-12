import { z } from 'zod';

export const deleteRecipeParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id deve ser um numero inteiro positivo')
});

export type DeleteRecipeParams = z.infer<typeof deleteRecipeParamsSchema>;
