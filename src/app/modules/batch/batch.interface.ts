import { Types } from 'mongoose';

export type TBatch = {
  batchNumber: number;
  deptId: Types.ObjectId;
  isAdmissionGoing: boolean;
};
