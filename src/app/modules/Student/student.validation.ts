import { z } from 'zod';

const studentValidationSchema = z.object({
  body: z.object({
    waiver: z.number().refine((value) => value >= 0 && value <= 100, {
      message: 'Waiver must be between 0 and 100',
    }),
  }),
});

export const studentValidation = {
  studentValidationSchema,
};
