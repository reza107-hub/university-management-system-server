import { z } from 'zod';

const AdmissionRequestValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    yearOfRegistration: z.string(),
  }),
});

export const adminRequestValidation = {
  AdmissionRequestValidationSchema,
};
