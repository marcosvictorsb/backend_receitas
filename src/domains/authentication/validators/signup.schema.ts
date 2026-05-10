import { z } from 'zod';

export const signUpBodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  login: z.string().trim().min(3).max(100),
  password: z.string().min(8).max(100)
});

export type SignUpBody = z.infer<typeof signUpBodySchema>;
