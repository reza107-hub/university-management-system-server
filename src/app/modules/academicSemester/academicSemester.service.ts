import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { searchByNameInDB } from '../../utils/searchByname';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const query = { year: payload.year, name: payload.name };
  const existingAcademicSemester = await AcademicSemester.findOne(query);
  if (existingAcademicSemester) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This academic semester is already exist in same year',
    );
  }
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async (// eslint-disable-next-line @typescript-eslint/no-explicit-any
query: Record<string, any>) => {
  const academicSemesters = AcademicSemester.find();
  const search = searchByNameInDB(query)

const result = await academicSemesters.find(search)
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
