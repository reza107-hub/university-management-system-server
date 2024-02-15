import { ObjectId } from 'mongodb';
import User from './user.model';
import { TUser } from './user.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { searchByNameInDB } from '../../utils/searchByname';

const createUserIntoDB = async (user: TUser) => {
  const query = { email: user.email };
  const existingUser = await User.findOne(query);
  if (existingUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'User Already exists');
  }
  const result = await User.create(user);
  return result;
};

const getUsersFromDB = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any>,
) => {
  const users = User.find();

  const search = searchByNameInDB(query);
  const result = await users.find(search);

  return result;
};

const getPresentUserFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const makeStudentIntoDB = async (id: string) => {
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: 'student',
    },
  };
  const result = await User.findByIdAndUpdate(filter, updateDoc);
  return result;
};

export const userService = {
  getUsersFromDB,
  makeStudentIntoDB,
  createUserIntoDB,
  getPresentUserFromDB,
};
