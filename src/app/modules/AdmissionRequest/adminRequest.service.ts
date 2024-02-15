import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TAdmission } from './adminRequest.interface';
import Admission from './adminRequest.model';
import { FilterQuery } from 'mongoose';

const getAllAdmissionRequestFromDB = async (query: FilterQuery<TAdmission>) => {
  const result = await Admission.find(query)
    .populate('program')
    .populate('department')
    .populate('userId');
  return result;
};

const postAdmissionRequestToDB = async (data: TAdmission) => {
  const existingData = await Admission.findOne({ email: data.email });
  if (existingData) {
    throw new AppError(httpStatus.FORBIDDEN, 'Already requested for admission');
  }
  const result = await Admission.create(data);
  return result;
};
export const AdmissionRequestService = {
  getAllAdmissionRequestFromDB,
  postAdmissionRequestToDB,
};
