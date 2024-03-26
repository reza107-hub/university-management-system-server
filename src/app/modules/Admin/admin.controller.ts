import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const getAdminList = catchAsync(async (req, res) => {
  const result = await AdminService.getAdminListFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Admin list retrieved successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.createAdminIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Admin created successfully',
    data: result,
  });
});

const getUserIsAdmin = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await AdminService.getUserIsAdminFromDb(email);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Single Admin retrieved successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.deleteAdminFromDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Admin deleted successfully',
    data: result,
  });
});

const sendEmailToFaculty = catchAsync(async(req,res)=>{
  const result = await AdminService.sendEmailToFacultyService(req.body)
  sendResponse(res,{
    success: true,
    statusCode: 200,
    message: 'Email sent successfully',
    data:result
  })
})
export const AdminController = {
  getAdminList,
  createAdmin,
  getUserIsAdmin,
  deleteAdmin,
  sendEmailToFaculty
};
