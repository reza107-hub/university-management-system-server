import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BatchServices } from "./batch.service";


const createBatch = catchAsync(async (req, res) => {
    const result = await BatchServices.createBatchIntoDB(req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Batch created successfully',
      data: result,
    });
  });
const getAllBatch = catchAsync(async (req, res) => {
    const result = await BatchServices.getAllBatchFromDB();
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Batch retrieve successfully',
      data: result,
    });
  });

  export const BatchControllers = {
    createBatch,
    getAllBatch
  }