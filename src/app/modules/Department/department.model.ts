import mongoose, { Schema } from 'mongoose';
import { TDepartment } from './department.interface';

const departmentSchema = new Schema<TDepartment>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    shortForm: {
      type: String,
      required: true,
      unique: true,
    },
    program: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'program',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Department = mongoose.model<TDepartment>('department', departmentSchema);

export default Department;
