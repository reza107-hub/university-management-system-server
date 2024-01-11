import { Types } from 'mongoose';

export type TAdmin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  userId: Types.ObjectId;
  name: string;
  email: string;
  image: string;
  role: string;
  gender: string;
  dateOfBirth: string;
  contactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: string;
  isDeleted: boolean;
};
