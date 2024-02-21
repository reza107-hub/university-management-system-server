import { Types } from 'mongoose';

export type TCourse = {
  title: string;
  code: string;
  credits: number;
  isDeleted?: boolean;
};

//----------------------------------------------------------------
export type TCourseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
