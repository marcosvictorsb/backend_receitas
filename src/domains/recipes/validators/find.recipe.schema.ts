import { z } from 'zod';

export const findRecipeQuerySchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'id deve ser um numero inteiro positivo')
    .optional(),
  id_user: z
    .string()
    .regex(/^\d+$/, 'id_user deve ser um numero inteiro positivo')
    .optional(),
  id_category: z
    .string()
    .regex(/^\d+$/, 'id_category deve ser um numero inteiro positivo')
    .optional(),
  name: z.string().trim().min(1).optional()
});

export type FindRecipeQuery = z.infer<typeof findRecipeQuerySchema>;
