import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';

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
  const result = await userService.getUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Retrieved successfully',
    data: result,
  });
});

const getPresentUser = catchAsync(async (req, res) => {
  const result = await userService.getPresentUserFromDB(req.params.email);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Present User Retrieved successfully',
    data: result,
  });
});
const sendContactEmail = catchAsync(async (req, res) => {
  const { email, subject, message } = req.body;
  const result = await userService.sendContactEmailService(
    email,
    subject,
    message,
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Email sent successfully',
    data: result,
  });
});

export const userController = {
  getUsers,
  createUser,
  getPresentUser,
  sendContactEmail,
};
