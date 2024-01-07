import { Types } from "mongoose";

export type TUserAdditionalInformation = {
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    presentAddress: string;
    permanentAddress: string;
    bloodGroup: string;
    userId: Types.ObjectId;
    name: string;
    email: string;
    image: string;
    isDeleted: boolean;
  }
  