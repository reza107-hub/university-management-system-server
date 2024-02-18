import { z } from 'zod';

const UserAdditionalInformationValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    name: z.string(),
    email: z.string().email(),
    image: z.string(),
    dateOfBirth: z.string(),
    gender: z.string(),
    contactNumber: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    bloodGroup: z.string(),
    isDeleted: z.boolean().default(false),
  }),
});

export const userAdditionalInformationValidation = {
  UserAdditionalInformationValidationSchema,
};
