import { z } from 'zod';

const AdmissionRequestValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    age: z.string(),
    programme: z.string(),
    department: z.string(),
    yearOfRegistration: z.string(),
  }),
});

export const adminRequestValidation = {
  AdmissionRequestValidationSchema,
};
