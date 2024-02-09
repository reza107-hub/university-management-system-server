/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TAdmin } from './admin.interface';
import Admin from './admin.model';
import User from '../User/user.model';

const getAdminListFromDB = async () => {
  const result = await Admin.find({ isDeleted: false }).populate('userId');
  return result;
};

const createAdminIntoDB = async (playLoad: TAdmin) => {
  const {
    userId: { _id: userId },
    _id,
    ...newObject
  } = playLoad;

  const data = { userId, ...newObject };

  const existingAdmin = await Admin.findOne({ userId });
  if (existingAdmin) {
    throw new AppError(httpStatus.FORBIDDEN, 'Admin Already exists');
  }
  const result = await Admin.create(data);
  await User.findByIdAndUpdate(userId, { role: 'admin' });
  return result;
};

const getUserIsAdminFromDb = async (email: string) => {
  const result = await Admin.findOne({ email });
  if (!result) {
    return false;
  }
  if (result?.isDeleted === true) {
    return false;
  }
  return true;
};

const deleteAdminFromDb = async (playLoad: TAdmin) => {
  const { _id, userId } = playLoad;
  const id = userId?._id;
  const result = await Admin.findByIdAndDelete(_id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin delete not successful');
  } else {
    await User.findByIdAndUpdate(id, { role: 'user' });
  }
  return result;
};

export const AdminService = {
  getAdminListFromDB,
  createAdminIntoDB,
  getUserIsAdminFromDb,
  deleteAdminFromDb,
};
