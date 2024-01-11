import { Types } from "mongoose";

export type TUserAdditionalInformation = {
  userId: Types.ObjectId;
  name: string;
  email: string;
  image: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: string;
  isDeleted: boolean;
};
