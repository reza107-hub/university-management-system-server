import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.enum(['user', 'student', 'faculty', 'admin']).default('user'),
    hasAdditionalInfo: z.boolean().default(false),
    isDeleted: z.boolean().default(false),
  }),
});

export const userValidation = {
  userValidationSchema,
};
