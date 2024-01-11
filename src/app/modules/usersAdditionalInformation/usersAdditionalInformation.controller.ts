import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { usersAdditionalInformationService } from "./usersAdditionalInformation.service";


const getIsUserHasAdditionalInformation = catchAsync(async (req, res) => {
    const result = await usersAdditionalInformationService.getIsUserHasAdditionalInformationFromDB();

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Users Additional Information retrieved successfully',
      data: result,
    });
});

const postUserAdditionalInformation = catchAsync(async (req, res) => {
    const result = await usersAdditionalInformationService.postUserAdditionalInformationIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Information Added successfully',
        data: result,
    });
});

export const UserAdditionalInformationController = {
    getIsUserHasAdditionalInformation,
    postUserAdditionalInformation
}