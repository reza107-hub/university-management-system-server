import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TDepartment } from './department.interface';
import Department from './department.model';

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const { name, code } = payload;
  const existingDepartmentName = await Department.findOne({ name });
  if (existingDepartmentName) {
    throw new AppError(httpStatus.FORBIDDEN, 'Department Already exists');
  }
  const existingDepartmentCode = await Department.findOne({ code });
  if (existingDepartmentCode) {
    throw new AppError(httpStatus.FORBIDDEN, 'Department Already exists');
  }
  const result = await Department.create(payload);
  return result;
};

const getDepartmentFromDB = async () => {
  const result = await Department.find({ isDeleted: false }).populate(
    'program',
  );
  return result;
};

export const departmentServices = {
  createDepartmentIntoDB,
  getDepartmentFromDB,
};
