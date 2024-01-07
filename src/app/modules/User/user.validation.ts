import { z } from 'zod';

const userValidationSchema = z.object({
 body: z.object({
  email: z.string().email(),
  role: z.string(),
  isDeleted: z.boolean().default(false),
  hasAdditionalInfo: z.boolean(),
 })

});

export const userValidation = {
    userValidationSchema
}