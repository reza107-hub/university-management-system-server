import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.string(),
    hasAdditionalInfo: z.boolean().default(false),
    isDeleted: z.boolean().default(false),
  }),
});

export const userValidation = {
    userValidationSchema
}