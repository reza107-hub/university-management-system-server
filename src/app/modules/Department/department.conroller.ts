import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { departmentServices } from './department.service';

const createProgram = catchAsync(async (req, res) => {
  const result = await departmentServices.createDepartmentIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'department created successfully',
    data: result,
  });
});

const getDepartment = catchAsync(async (req, res) => {
  const result = await departmentServices.getDepartmentFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'department created successfully',
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req, res) => {
  const result = await departmentServices.deleteDepartmentFromDb(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'department deleted successfully',
    data: result,
  });
});

export const departmentController = {
  createProgram,
  getDepartment,
  deleteDepartment,
};
