import { Schema, model } from "mongoose";
import { TAdmission } from "./adminRequest.interface";

const admissionSchema = new Schema<TAdmission>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    presentGuardianName: { type: String, required: true },
    presentGuardianContact: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    age: { type: String, required: true },
    programme: { type: String, required: true },
    department: { type: String, required: true },
    yearOfRegistration: { type: String, required: true },
    nationality: { type: String, required: true },
    profileImage: { type: String, required: true },
    sscCertificate: { type: String, required: true },
    hscCertificate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Admission = model<TAdmission>("admissionRequest", admissionSchema);
//admissionRequestCollection

export default Admission;
