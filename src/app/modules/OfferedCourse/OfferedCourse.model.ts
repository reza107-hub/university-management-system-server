import mongoose, { Schema } from 'mongoose';
import { TRoutine, TOfferedCourse } from './OfferedCourse.interface';

const routineSchema = new mongoose.Schema<TRoutine>({
  days: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistrationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SemesterRegistration',
    },
    academicSemesterId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    programId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'program',
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'department',
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'faculty',
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Section',
    },
    routine: [routineSchema],
  },
  {
    timestamps: true,
  },
);

export const OfferedCourse = mongoose.model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
