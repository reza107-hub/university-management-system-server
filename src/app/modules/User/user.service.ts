import User from './user.model';
import { TUser } from './user.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { searchByNameInDB } from '../../utils/searchByname';

import { receiveEmail } from '../../utils/receiveEmail';

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

const sendContactEmailService = async (
  email: string,
  subject: string,
  message: string,
) => {
  console.log({ email, subject, message });
  await receiveEmail(email, subject, message);
};

export const userService = {
  getUsersFromDB,
  createUserIntoDB,
  getPresentUserFromDB,
  sendContactEmailService,
};
