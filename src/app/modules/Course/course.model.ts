import { Schema, model } from 'mongoose';
import { TCourse, TCourseFaculty } from './course.interface';

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  code: {
    type: String,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Course = model<TCourse>('Course', courseSchema);

//-------------------------------------------------------------

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
