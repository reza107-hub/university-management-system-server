import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyService } from './faculty.service';


const getFacultyList = catchAsync(async (req, res) => {
  const result = await FacultyService.getFacultyListFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Faculty list retrieved successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const result = await FacultyService.createFacultyIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Faculty created successfully',
    data: result,
  });
});

// const getUserIsAdmin = catchAsync(async (req, res) => {
//   const email = req.params.email;
//   const result = await AdminService.getUserIsAdminFromDb(email);

//   sendResponse(res, {
//     success: true,
//     statusCode: 201,
//     message: 'Single Admin retrieved successfully',
//     data: result,
//   });
// });

const deleteFaculty = catchAsync(async (req, res) => {
  const result = await FacultyService.deleteFacultyFromDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

export const FacultyController = {
  getFacultyList,
  createFaculty,
  deleteFaculty

};
