import { Types } from 'mongoose';

export type TName = {
  firstName: string;
  lastName: string;
};

export type TAdmission = {
  userId: Types.ObjectId;
  name: TName;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  presentGuardianName: string;
  presentGuardianContact: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: string;
  program: Types.ObjectId;
  department: Types.ObjectId;
  semester: Types.ObjectId;
  batch: number;
  yearOfRegistration: string;
  nationality: string;
  profileImage: string;
  sscCertificate: string;
  hscCertificate: string;
  isApproved: boolean;
};
