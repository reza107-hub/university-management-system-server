import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentService } from './student.service';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Student retrieved successfully',
    data: result,
  });
});
const creatingStudentWIthId = catchAsync(async (req, res) => {
  const result = await studentService.creatingStudentWIthIdIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Student registered successfully',
    data: result,
  });
});

const denyStudent = catchAsync(async (req, res) => {
  const result = await studentService.denyStudent(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Student denied successfully',
    data: result,
  });
});

//----------------------------------------------------------------
const creatingStudentWIthIdManually = catchAsync(async (req, res) => {
  const result = await studentService.creatingStudentManuallyWIthIdIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Student created successfully',
    data: result,
  });
});

export const studentController = {
  getAllStudent,
  creatingStudentWIthId,
  denyStudent,
  creatingStudentWIthIdManually
};
