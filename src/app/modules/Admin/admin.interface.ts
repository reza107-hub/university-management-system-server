import { Types } from "mongoose";

export type TAdmin = {
    userId: Types.ObjectId;
    image: string;
    name: string;
    email: string;
    role: string;
    gender: string;
    dateOfBirth: string;
    contactNumber: string;
    presentAddress: string;
    permanentAddress: string;
    isDeleted: boolean;
  };