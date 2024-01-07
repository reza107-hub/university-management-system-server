import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service"

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User created successfully',
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.getUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});
const getIsUserAdminOrNot = catchAsync(async (req, res) => {
  const email = req.params.email
  const result = await userService.getIsUserAdminOrNotFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});
const makeStudent = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await userService.makeStudentIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});
const makingAdmin = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body
  const result = await userService.makingAdminIntoDB(body,id);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});
const removeAdmin = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await userService.removeAdminFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

export const userController = {
  getUsers,
  getIsUserAdminOrNot,
  makeStudent,
  makingAdmin,
  removeAdmin,
  createUser
}