import { z } from 'zod';



const facultyValidationSchema = z.object({
   body:z.object({
    image: z.string(),
    name: z.string(),
    email: z.string().email(),
    gender: z.string(),
    dateOfBirth: z.string(),
    contactNumber: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    bloodGroup: z.string(),
    isDeleted: z.boolean().default(false),
   })
});


export const FacultyValidation = {
   facultyValidationSchema
  };

