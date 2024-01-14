import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { programServices } from "./program.service";

const createProgram = catchAsync(async (req, res) => {
    const result = await programServices.createProgramIntoDB(req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Program created successfully',
      data: result,
    });
  });
const getAllProgram = catchAsync(async (req, res) => {
    const result = await programServices.getAllProgramsFromDB();
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Program retrieve successfully',
      data: result,
    });
  });

  export const programControllers = {
    createProgram,
    getAllProgram
  }