import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TAdmission } from './admissionRequest.interface';
import Admission from './admissionRequest.model';
import { receiveEmail } from '../../utils/receiveEmail';

const getAllAdmissionRequestFromDB = async () => {
  const result = await Admission.find()
    .populate('program')
    .populate('department')
    .populate('userId')
    .populate('batch');
  return result;
};

const getSingleAdmissionRequestFromDB = async (id: string) => {
  const result = await Admission.findById(id)
    .populate('program')
    .populate('department')
    .populate('userId')
    .populate('batch');
  return result;
};

export const createAdmission = async (payload: TAdmission) => {
  try {
    const resultOfAdmission = await Admission.create(payload);
    if (resultOfAdmission) {
      await receiveEmail(
        resultOfAdmission.email,
        'Admission Request Posted',
        `An Admission Requested From ${resultOfAdmission.email}`,
      );
    }
  } catch (error) {
    throw new AppError(httpStatus.FORBIDDEN, 'Admission Request Failed');
  }
};
export const AdmissionRequestService = {
  getAllAdmissionRequestFromDB,
  getSingleAdmissionRequestFromDB,
};
