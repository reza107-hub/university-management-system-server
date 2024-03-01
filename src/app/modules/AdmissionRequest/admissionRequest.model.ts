import { Schema, model } from 'mongoose';
import { TAdmission, TName } from './admissionRequest.interface';

const Name = new Schema<TName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const admissionSchema = new Schema<TAdmission>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    name: {
      type: Name,
      required: true,
    },
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
    program: { type: Schema.Types.ObjectId, required: true, ref: 'program' },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'department',
    },
    semester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SemesterRegistration',
    },
    batch: { type: Schema.Types.ObjectId, required: true, ref: 'batch' },
    yearOfRegistration: { type: String, required: true },
    nationality: { type: String, required: true },
    profileImage: { type: String, required: true },
    sscCertificate: { type: String, required: true },
    hscCertificate: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Admission = model<TAdmission>('admissionRequest', admissionSchema);

export default Admission;
