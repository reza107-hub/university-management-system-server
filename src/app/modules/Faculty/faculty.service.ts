/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';

import User from '../User/user.model';
import Faculty from './faculty.model';
import { TFaculty } from './faculty.interface';
import { searchByNameInDB } from '../../utils/searchByname';

const getFacultyListFromDB = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any>,
) => {
  const faculties = Faculty.find();
  const search = searchByNameInDB(query);
  const result = await faculties
    .find(search)
    .populate('userId')
    .populate('userAdditionalInfoId')
    .populate('departmentId');
  return result;
};

const createFacultyIntoDB = async (playLoad: TFaculty) => {
  const { userId } = playLoad;
  const existingFaculty = await Faculty.findOne({ userId });
  if (existingFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'Faculty Already exists');
  }
  const result = await Faculty.create(playLoad);
  await User.findByIdAndUpdate(userId, { role: 'faculty' });
  return result;
};

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
  deleteFacultyFromDb,
};
