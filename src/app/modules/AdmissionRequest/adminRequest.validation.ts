import { z } from "zod";

const AdmissionRequestValidationSchema = z.object({
  body:z.object({
    firstName: z.string(),
  lastName: z.string(),
  fatherName: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  presentGuardianName: z.string(),
  presentGuardianContact: z.string(),
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
  yearOfRegistration: z.string(),
  nationality: z.string(),
  profileImage: z.string(),
  sscCertificate: z.string(),
  hscCertificate: z.string(),
  })
});

export const adminRequestValidation = {
    AdmissionRequestValidationSchema

}

