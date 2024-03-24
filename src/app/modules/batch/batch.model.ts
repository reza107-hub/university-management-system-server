import mongoose, { Schema } from 'mongoose';
import { TBatch, TSection } from './batch.interface';

const batchSchema = new Schema<TBatch>(
  {
    batchNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    deptId: { type: Schema.Types.ObjectId, ref: 'department' },
    isAdmissionGoing: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const sectionSchema = new Schema<TSection>(
  {
    batchId: { type: Schema.Types.ObjectId, ref: 'batch' },
    capacity: { type: Number, default: 1 },
    name: { type: String, required: true },
    student_ids: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

export const SectionModel = mongoose.model<TSection>('Section', sectionSchema);
const Batch = mongoose.model<TBatch>('batch', batchSchema);
export default Batch;
