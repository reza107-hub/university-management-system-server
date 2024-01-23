import { z } from 'zod';

const programValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'required' }).trim(),
    shortName: z.string({ required_error: 'required' }),
    isDeleted: z.boolean().optional(),
  }),
});

export const ProgramValidation = {
  programValidationSchema,
};
