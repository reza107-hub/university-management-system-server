import { Types } from 'mongoose';


export type TBatch = {
  batchNumber: number;
  deptId: Types.ObjectId;
  isAdmissionGoing: boolean;
};

export type TSection = {
  name: string; // 50 A or 50
  student_ids: string[];
  batchId: Types.ObjectId;
  capacity: number;
};
