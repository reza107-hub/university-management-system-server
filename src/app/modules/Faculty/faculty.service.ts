/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';

import User from '../User/user.model';
import Faculty from './faculty.model';
import { TFaculty } from './faculty.interface';

const getFacultyListFromDB = async () => {
  const result = await Faculty.find({ isDeleted: false }).populate('userId');
  return result;
};

const createFacultyIntoDB = async (playLoad: TFaculty) => {
  const {
    userId: { _id: userId },
    _id,
    ...newObject
  } = playLoad;

  const data = { userId, ...newObject };

  const existingFaculty = await Faculty.findOne({ userId });
  if (existingFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'Faculty Already exists');
  }
  const result = await Faculty.create(data);
  await User.findByIdAndUpdate(userId, { role: 'faculty' });
  return result;
};

// const getUserIsAdminFromDb = async (email: string) => {
//   const result = await Admin.findOne({ email });
//   if (!result) {
//     return false;
//   }
//   if (result?.isDeleted === true) {
//     return false;
//   }
//   return true;
// };

const deleteFacultyFromDb = async (playLoad: TFaculty) => {
  const { _id, userId } = playLoad;
  const id = userId?._id;
  const result = await Faculty.findByIdAndDelete(_id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty delete not successful');
  } else {
    await User.findByIdAndUpdate(id, { role: 'user' });
  }
  return result;
};

export const FacultyService = {
  getFacultyListFromDB,
  createFacultyIntoDB,
  deleteFacultyFromDb

};
