import mongoose, { Schema } from 'mongoose';
import { TProgram } from './Program.interface';

const programSchema = new Schema<TProgram>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    shortName: {
      type: String,
      required: true,
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

const Program = mongoose.model<TProgram>('program', programSchema);
export default Program;
