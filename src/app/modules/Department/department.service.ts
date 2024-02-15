import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TDepartment } from './department.interface';
import Department from './department.model';
import { searchByNameInDB } from '../../utils/searchByname';

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

const getDepartmentFromDB = async (// eslint-disable-next-line @typescript-eslint/no-explicit-any
query: Record<string, any>) => {
  const departments = Department.find({ isDeleted: false })

  const search = searchByNameInDB(query)

  const result = await departments.find(search).populate(
    'program',
  );
  return result;
};

const deleteDepartmentFromDb = async (id: string) => {
  const result = await Department.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.FORBIDDEN, 'Department does not exists');
  }
  return result;
};

export const departmentServices = {
  createDepartmentIntoDB,
  getDepartmentFromDB,
  deleteDepartmentFromDb,
};
