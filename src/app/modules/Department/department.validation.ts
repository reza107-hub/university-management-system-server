import { z } from 'zod';

const departmentValidationSchema = z.object({
  body: z.object({
    code: z.string(),
    name: z.string(),
    shortForm: z.string(),
  }),
});

export const departmentValidation = {
  departmentValidationSchema,
};
