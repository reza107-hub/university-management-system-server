import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { usersAdditionalInformationService } from './usersAdditionalInformation.service';

const getIsUserHasAdditionalInformation = catchAsync(async (req, res) => {
  const result =
    await usersAdditionalInformationService.getIsUserHasAdditionalInformationFromDB(
      req.query,
    );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Users Additional Information retrieved successfully',
    data: result,
  });
});

const getPresentUserHasAdditionalInformation = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result =
    await usersAdditionalInformationService.getPresentUserHasAdditionalInformationFromDB(
      email,
    );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Users Additional Information retrieved successfully',
    data: result,
  });
});

const postUserAdditionalInformation = catchAsync(async (req, res) => {
  const result =
    await usersAdditionalInformationService.postUserAdditionalInformationIntoDB(
      req.body,
    );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Information Added successfully',
    data: result,
  });
});

const updateUsersAdditionalInformation = catchAsync(async (req, res) => {
  const result =
    await usersAdditionalInformationService.updateUsersAdditionalInformationToDb(
      req.params.id,
      req.body,
    );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Information Updated successfully',
    data: result,
  });
});

export const UserAdditionalInformationController = {
  getIsUserHasAdditionalInformation,
  postUserAdditionalInformation,
  getPresentUserHasAdditionalInformation,
  updateUsersAdditionalInformation,
};
