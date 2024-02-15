import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    minCredit: z.number().refine((value) => value >= 1.5 && value <= 10, {
      message: 'minCredit must be between 3 and 10',
    }),
    maxCredit: z.number().refine((value) => value >= 10 && value <= 23, {
      message: 'maxCredit must be between 10 and 23',
    }),
  }),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    minCredit: z
      .number()
      .refine((value) => value >= 1.5 && value <= 10, {
        message: 'minCredit must be between 3 and 10',
      })
      .optional(),
    maxCredit: z
      .number()
      .refine((value) => value >= 10 && value <= 23, {
        message: 'maxCredit must be between 10 and 23',
      })
      .optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
