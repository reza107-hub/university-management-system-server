import { Types } from 'mongoose';

export type TDepartment = {
  code: string;
  name: string;
  shortForm: string;
  program: Types.ObjectId;
  isDeleted: boolean;
};
