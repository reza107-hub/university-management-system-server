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

export const userController = {
  getUsers,
  createUser
}