import { Schema, model } from "mongoose";
import { TStudent } from "./student.interface";

const studentSchema = new Schema<TStudent>(
    {
      name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
      father: {
        name: { type: String, required: true },
        occupation: { type: String, required: true },
      },
      mother: {
        name: { type: String, required: true },
        occupation: { type: String, required: true },
      },
      presentGuardian: {
        name: { type: String, required: true },
        contact: { type: String, required: true },
      },
      dateOfBirth: { type: String, required: true },
      gender: { type: String, required: true },
      contactNumber: { type: String, required: true },
      email: { type: String, required: true,unique: true },
      presentAddress: { type: String, required: true },
      permanentAddress: { type: String, required: true },
      bloodGroup: { type: String, required: true },
      age: { type: String, required: true },
      programme: { type: String, required: true },
      department: { type: String, required: true },
      batchNumber: { type: Number, required: true },
      nationality: { type: String, required: true },
      yearOfRegistration: { type: String, required: true },
      image: { type: String, required: true },
      sscCertificate: { type: String, required: true },
      hscCertificate: { type: String, required: true },
      createdAt: { type: String, required: true },
      updatedAt: { type: String, required: true },
      userId: { type: Schema.Types.ObjectId, required: true , ref: "User" },
      studentId: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  const Student = model<TStudent>('Student', studentSchema);
  
  export default Student;