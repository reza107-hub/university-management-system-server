import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdmissionRequestService } from "./adminRequest.service";


const getAllAdmissionRequest = catchAsync(async (req, res) => {
    const result = await AdmissionRequestService.getAllAdmissionRequestFromDB();
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  });
const postAdmissionRequest = catchAsync(async (req, res) => {
    const result = await AdmissionRequestService.postAdmissionRequestToDB(req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Admission request Successfully added',
      data: result,
    });
  });


  export const AdmissionRequestController = {
    getAllAdmissionRequest,
    postAdmissionRequest
  }