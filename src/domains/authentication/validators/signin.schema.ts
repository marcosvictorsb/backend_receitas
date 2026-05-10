import { z } from 'zod';

export const signInBodySchema = z.object({
  login: z.string().trim().min(3).max(100),
  password: z.string().min(8).max(100)
});

export type SignInBody = z.infer<typeof signInBodySchema>;
