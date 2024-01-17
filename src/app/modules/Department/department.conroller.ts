import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { departmentServices } from "./department.service";

const createProgram = catchAsync(async (req, res) => {
    const result = await departmentServices.createDepartmentIntoDB(req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'department created successfully',
      data: result,
    });
  });

  export const departmentController = {
    createProgram
  }