import { Schema, model } from 'mongoose';
import { TStudent } from './student.interface';

const studentSchema = new Schema<TStudent>(
  {
    admissionRequestId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'admissionRequest',
      unique: true,
    },
    studentId: { type: String, unique: true },
    waiver: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Student = model<TStudent>('students', studentSchema);

export default Student;
