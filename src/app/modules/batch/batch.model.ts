import mongoose, { Schema } from 'mongoose';
import { TBatch } from './batch.interface';

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

const Batch = mongoose.model<TBatch>('batch', batchSchema);
export default Batch;
