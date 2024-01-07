import { z } from 'zod';


const adminValidationSchema = z.object({
   body:z.object({
    userId: z.string(),
    image: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    gender: z.string(),
    dateOfBirth: z.string(),
    contactNumber: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    isDeleted: z.boolean().default(false),
   })
});


export const adminValidation = {
    adminValidationSchema
  };
  
