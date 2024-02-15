import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.enum(['user', 'student', 'faculty', 'admin']).default('user'),
    hasAdditionalInfo: z.boolean().default(false),
    isDeleted: z.boolean().default(false),
  }),
});

const contactValidationSchema = z.object({
  body:z.object({
      email:z.string({required_error:"Email is required!!",invalid_type_error:"Invalid email"}).email(),
      subject:z.string({required_error:"Subject is required!!",invalid_type_error:"Invalid Subject"}),
      message:z.string({required_error:"Message is required!!",invalid_type_error:"Invalid Message"})
  })
})

export const userValidation = {
  userValidationSchema,
  contactValidationSchema
};
