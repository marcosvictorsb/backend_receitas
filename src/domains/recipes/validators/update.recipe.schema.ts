import { z } from 'zod';

export const updateRecipeParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id deve ser um numero inteiro positivo')
});

export const updateRecipeBodySchema = z
  .object({
    name: z.string().trim().max(45).optional(),
    preparation_time_minutes: z.number().int().positive().optional(),
    servings: z.number().int().positive().optional(),
    preparation_method: z.array(z.string().trim().min(1)).min(1).optional(),
    ingredients: z.array(z.string().trim().min(1)).min(1).optional(),
    id_category: z.number().int().positive().optional()
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'Informe ao menos um campo para atualizar'
  });

export type UpdateRecipeBody = z.infer<typeof updateRecipeBodySchema>;
export type UpdateRecipeParams = z.infer<typeof updateRecipeParamsSchema>;
