import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { studentService } from "./student.service";


const getAllStudent = catchAsync(async (req, res) => {
    const result = await studentService.getAllStudentFromDB();
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  });
const creatingStudentWIthId = catchAsync(async (req, res) => {
    const result = await studentService.creatingStudentWIthIdIntoDB(req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  });


  export const studentController = {
    getAllStudent,
    creatingStudentWIthId
  }