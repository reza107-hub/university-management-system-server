import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";


const getAdminList = catchAsync(async (req, res) => {
    const result = await AdminService.getAdminListFromDB();
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  });

  export const AdminController = {
    getAdminList
  }