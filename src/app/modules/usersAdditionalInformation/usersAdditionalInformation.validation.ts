import { z } from "zod";

const UserAdditionalInformationValidationSchema = z.object({
  body: z.object({
    dateOfBirth: z.string(),
    gender: z.string(),
    contactNumber: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    bloodGroup: z.string(),
    userId: z.string(),
    name: z.string(),
    email: z.string().email(),
    image: z.string(),
    isDeleted: z.boolean().default(false),
  })
});

export const userAdditionalInformationValidation = {
  UserAdditionalInformationValidationSchema
}