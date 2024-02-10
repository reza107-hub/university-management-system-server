import User from '../User/user.model';
import { TUserAdditionalInformation } from './usersAdditionalInformation.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import usersAdditionalInformationModel from './usersAdditionalInformation.model';
import { searchByNameInDB } from '../../utils/searchByname';

const getIsUserHasAdditionalInformationFromDB = async (// eslint-disable-next-line @typescript-eslint/no-explicit-any
query: Record<string, any>) => {
  const result1 = usersAdditionalInformationModel.find()
   
    const search = searchByNameInDB(query)
    const result = await result1.find(search).populate('userId');
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

export const usersAdditionalInformationService = {
  getIsUserHasAdditionalInformationFromDB,
  postUserAdditionalInformationIntoDB,
  getPresentUserHasAdditionalInformationFromDB,
};
