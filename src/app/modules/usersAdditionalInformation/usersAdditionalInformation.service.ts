import User from '../User/user.model';
import { TUserAdditionalInformation } from './usersAdditionalInformation.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import usersAdditionalInformationModel from './usersAdditionalInformation.model';

const getIsUserHasAdditionalInformationFromDB = async () => {
  const result = await usersAdditionalInformationModel
    .find()
    .populate('userId');
  return result;
};

const getPresentUserHasAdditionalInformationFromDB = async (email: string) => {
  const result = await usersAdditionalInformationModel
    .findOne({ email })
    .populate('userId');
  return result;
};

const postUserAdditionalInformationIntoDB = async (
  data: TUserAdditionalInformation,
) => {
  const existingData = await usersAdditionalInformationModel.findOne({
    userId: data.userId,
  });
  if (existingData) {
    throw new AppError(httpStatus.FORBIDDEN, 'Already Exists');
  }
  const result = await usersAdditionalInformationModel.create(data);

  await User.findByIdAndUpdate(data.userId, { hasAdditionalInfo: true });

  return result;
};

const updateUsersAdditionalInformationToDb = async (
  id: string,
  payload: TUserAdditionalInformation,
) => {
  const result = await usersAdditionalInformationModel.findByIdAndUpdate(
    id,
    payload,
  );

  return result;
};

export const usersAdditionalInformationService = {
  getIsUserHasAdditionalInformationFromDB,
  postUserAdditionalInformationIntoDB,
  getPresentUserHasAdditionalInformationFromDB,
  updateUsersAdditionalInformationToDb,
};
