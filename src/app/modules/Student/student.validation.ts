import { z } from 'zod';

const studentValidationSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    father: z.object({
      name: z.string(),
      occupation: z.string(),
    }),
    mother: z.object({
      name: z.string(),
      occupation: z.string(),
    }),
    presentGuardian: z.object({
      name: z.string(),
      contact: z.string(),
    }),
    dateOfBirth: z.string(),
    gender: z.string(),
    contactNumber: z.string(),
    email: z.string().email(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    bloodGroup: z.string(),
    age: z.string(),
    programme: z.string(),
    department: z.string(),
    batchNumber: z.number().int().positive(),
    nationality: z.string(),
    yearOfRegistration: z.string(),
    image: z.string(),
    sscCertificate: z.string(),
    hscCertificate: z.string(),
    userId: z.string(),
    studentId: z.string(),
  })
});

export const studentValidation = {
  studentValidationSchema
};
