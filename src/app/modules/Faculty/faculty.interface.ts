import { Types } from 'mongoose';

export type TFaculty = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  name: string;
  userId: Types.ObjectId;
  userAdditionalInfoId: Types.ObjectId;
  departmentId: Types.ObjectId;
  designation: string;
};
