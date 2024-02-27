import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TAdmission } from './admissionRequest.interface';
import Admission from './admissionRequest.model';
import { receiveEmail } from '../../utils/receiveEmail';

const getAllAdmissionRequestFromDB = async () => {
  const result = await Admission.find()
    .populate('program')
    .populate('department')
    .populate('userId');
  return result;
};

const getSingleAdmissionRequestFromDB = async (id: string) => {
  const result = await Admission.findById(id)
    .populate('program')
    .populate('department')
    .populate('userId');
  return result;
};

const postAdmissionRequestToDB = async (payload: TAdmission) => {
  const existingData = await Admission.findOne({ email: payload.email });
  if (existingData) {
    throw new AppError(httpStatus.FORBIDDEN, 'Already requested for admission');
  }

  const result = await Admission.create(payload);
  if (result) {
    await receiveEmail(
      `${result.email}`,
      'Admission Request Posted',
      `An Admission Requested From ${result.email}`,
    );
  }
  return result;
};
export const AdmissionRequestService = {
  getAllAdmissionRequestFromDB,
  postAdmissionRequestToDB,
  getSingleAdmissionRequestFromDB,
};
