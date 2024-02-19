import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdmissionRequestService } from './admissionRequest.service';

const getAllAdmissionRequest = catchAsync(async (req, res) => {
  const result = await AdmissionRequestService.getAllAdmissionRequestFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Admission retrieved successfully',
    data: result,
  });
});

const getSingleAdmissionRequest = catchAsync(async (req, res) => {
  const result = await AdmissionRequestService.getSingleAdmissionRequestFromDB(
    req.params.id,
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Admission retrieved successfully',
    data: result,
  });
});

const postAdmissionRequest = catchAsync(async (req, res) => {
  const result = await AdmissionRequestService.postAdmissionRequestToDB(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Admission request Successfully added',
    data: result,
  });
});

export const AdmissionRequestController = {
  getAllAdmissionRequest,
  postAdmissionRequest,
  getSingleAdmissionRequest,
};
