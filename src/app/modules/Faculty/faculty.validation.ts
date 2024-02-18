import { z } from 'zod';

const facultyValidationSchema = z.object({
  body: z.object({
    userId: z.string(), 
    userAdditionalInfoId: z.string(),
    departmentId: z.string(), 
    designation: z.string(),
  }),
});

export const FacultyValidation = {
  facultyValidationSchema,
};
