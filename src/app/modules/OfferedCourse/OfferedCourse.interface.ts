import { Types } from 'mongoose';

export type TDays = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
export type TRoutine = {
  days: TDays;
  startTime: string;
  endTime: string;
};

export type TOfferedCourse = {
  semesterRegistrationId: Types.ObjectId;
  academicSemesterId: Types.ObjectId;
  programId: Types.ObjectId;
  departmentId: Types.ObjectId;
  courseId: Types.ObjectId;
  facultyId: Types.ObjectId;
  sectionId: Types.ObjectId;
  routine: TRoutine[]
};

export type TSchedule = {
  days: TDays;
  startTime: string;
  endTime: string;
};
