import { Types } from 'mongoose';

export type TStudent = {
  admissionRequestId: Types.ObjectId;
  studentId: string;
  waiver: number;
};
